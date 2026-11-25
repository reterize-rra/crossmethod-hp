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
   const rows = [];
   const seen = new Set();
   let cursor = {};
   while (true) {
     const result = await this.api.call('enterprise-registry', {action:'enterprises', limit:100, ...cursor});
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
   const bills = [];
   const billCursors = new Set();
   let billCursor = {};
   for (;;) {
     const result = await this.api.call('enterprise-registry',{action:'billing', limit:200, ...billCursor});
     this.current(g);
     if (read !== this.readSequence) throw new PortalError('stale_identity');
     if (result?.success !== true || !Array.isArray(result.data?.billingMonths)) throw new PortalError('invalid_response');
     bills.push(...result.data.billingMonths);
     const next = result.data.nextCursor;
     if (!next) break;
     if (!next.beforeMonth || !next.beforeId || billCursors.has(next.beforeId)) throw new PortalError('invalid_response');
     billCursors.add(next.beforeId);
     billCursor = {beforeMonth:next.beforeMonth, beforeId:next.beforeId};
   }
   this.enterprises=rows;this.bills=bills;return this;
  }catch(error){
   // A rejected current read invalidates visible business data, never the durable journal.
   if(g===this.generation&&read===this.readSequence){this.enterprises=[];this.bills=[];}
   throw error;
  }
 }

 async execute(body) {
   const actions = ['createEnterprise','editEnterprise','createEnterpriseInvitation','changeEnterpriseUsage',
     'saveBillingDraft','issueBilling','markBillingPaid','terminateEnterprise','restoreEnterprise','reverseBankPayment'];
   if (!actions.includes(body.action)) throw new PortalError('forbidden');
   if (this.busy || this.unknown) throw new PortalError('operation_pending');
   const generation = this.generation;
   const key = 'operator-pending:' + this.identity;
   this.busy = true;
   try {
     return await navigator.locks.request(key, async () => {
       await this.verify(generation);
       if (this.journal.getItem(key)) {
         this.unknown = true;
         throw new PortalError('operation_pending');
       }
       if (['issueBilling','markBillingPaid','reverseBankPayment'].includes(body.action)) {
         const selected = this.bills.find(b => b.billingMonthId === body.billingMonthId);
         if (!selected) throw new PortalError('state_changed');
         await this.refresh();
         const current = this.bills.find(b => b.billingMonthId === body.billingMonthId);
         if (!current || current.updatedAt !== selected.updatedAt || current.totalAmount !== selected.totalAmount ||
             (body.action === 'issueBilling' ? current.status !== 'draft' : current.status !== (body.action==='reverseBankPayment'?'paid':'unpaid') || current.paymentMethod !== 'bank')) {
           throw new PortalError('state_changed');
         }
         body = {...body, expectedUpdatedAt:current.updatedAt};
       }
       const operationId = crypto.randomUUID();
       const pending = {schema:3, localId:operationId, action:body.action, startedAt:new Date().toISOString()};
       this.journal.setItem(key,JSON.stringify(pending));
       try {
         const result = await this.api.call('enterprise-registry',{...body,operationId});
         this.current(generation);
         if (result?.success !== true) throw new PortalError('operation_unknown');
         this.journal.removeItem(key);
         return result.data;
       } catch (error) {
         if (generation === this.generation) this.unknown = true;
         throw error;
       }
     });
   } finally {
     if (generation === this.generation) this.busy = false;
   }
 }
}
