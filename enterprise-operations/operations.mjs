import {merchantInput,merchantReceiptMatches} from './merchant-profile.mjs';
import {PortalError} from './controller.mjs';
export class Operations {
 constructor(api,journal=null){this.api=api;this.journal=journal;this.identity=null;this.generation=0;this.readSequence=0;this.busy=false;this.unknown=false;this.enterprises=[];this.bills=[];}
 setIdentity(id){if(id===this.identity)return;this.identity=id;this.generation++;this.readSequence++;this.busy=false;this.unknown=!!(id&&this.journal?.getItem("operator-pending:"+id));this.enterprises=[];this.bills=[];}
 async verify(g){if(!this.identity)throw new PortalError('login_required');if(await this.api.aal()!=='aal2')throw new PortalError('mfa_required');this.current(g);}
 current(g){if(g!==this.generation)throw new PortalError('stale_identity');}
 async refresh(){
  const g=this.generation,read=++this.readSequence;
  try{
   await this.verify(g);
   const controls=await this.api.call('operator-admin-query',{action:'controls'});this.current(g);
   if(controls?.success!==true)throw new PortalError('forbidden');
   const rows = [];
   const seen = new Set();
   let cursor = {};
   while (true) {
     const result = await this.api.call('operator-admin-query', {action:'enterprises', contractStatus:'active', limit:100, ...cursor});
     this.current(g);
     if (read !== this.readSequence) throw new PortalError('stale_identity');
     if (result?.success !== true || !Array.isArray(result.data?.enterprises)) throw new PortalError('invalid_response');
     rows.push(...result.data.enterprises);
     const next = result.data.nextCursor;
     if (!next) break;
     if (!next.beforeCreatedAt || !next.beforeId || seen.has(next.beforeId)) throw new PortalError('invalid_response');
     seen.add(next.beforeId);
     cursor = {beforeCreatedAt:next.beforeCreatedAt, beforeId:next.beforeId};
   }
   this.enterprises=rows;this.bills=[];return this;
  }catch(error){
   // A rejected current read invalidates visible business data, never the durable journal.
   if(g===this.generation&&read===this.readSequence){this.enterprises=[];this.bills=[];}
   throw error;
  }
 }

 async execute(body){if(body?.action==='setMerchantProfile')body=merchantInput(body);if(this.busy||this.unknown)throw new PortalError('operation_pending');if(!['createEnterprise','createEnterpriseInvitation'].includes(body.action))throw new PortalError('forbidden');const g=this.generation;this.busy=true;let sent=false;let journalRecord;try{await this.verify(g);if(['issueBilling','markBillingPaid'].includes(body.action)){await this.refresh();this.current(g);const bill=this.bills.find(b=>b.billingMonthId===body.billingMonthId);if(!bill || (body.action==='issueBilling'?bill.status!=='draft':bill.status!=='unpaid'||bill.paymentMethod!=='bank'))throw new PortalError('state_changed');}const bill=this.bills.find(b=>b.billingMonthId===body.billingMonthId);journalRecord={schema:2,localId:crypto.randomUUID(),action:body.action,enterpriseId:body.enterpriseId||bill?.enterpriseId||null,billingMonthId:body.billingMonthId||null,requestId:body.clientRequestId||null,startedAt:new Date().toISOString(),paymentMethod:body.paymentMethod||null,before:bill?{status:bill.status,totalAmount:bill.totalAmount,paymentMethod:bill.paymentMethod||null}:null,status:"unresolved"};this.journal?.setItem("operator-pending:"+this.identity,JSON.stringify(journalRecord));sent=true;const result=await this.api.call('operator-admin-command',body);this.current(g);if(result?.success!==true)throw new PortalError('operation_unknown');if(body.action==='setMerchantProfile'&&!merchantReceiptMatches(body,result.data))throw new PortalError('operation_unknown');this.journal?.removeItem("operator-pending:"+this.identity);return result.data;}catch(e){if(g===this.generation&&['login_required','mfa_required','forbidden','invalid_response'].includes(e.code)){this.enterprises=[];this.bills=[];}if(g===this.generation&&sent){if(e.preconditionRejected===true&&e.code==='mfa_required'){journalRecord.rejection='recent_mfa_before_write';this.journal?.setItem('operator-pending:'+this.identity,JSON.stringify(journalRecord));}this.unknown=true;}throw e;}finally{if(g===this.generation)this.busy=false;}}
}
