export class PortalError extends Error { constructor(code) { super(code); this.code=code; } }
export function checkoutDestination(raw) {
  let u; try { u=new URL(raw); } catch { throw new PortalError('unsafe_checkout'); }
  if(u.protocol!=='https:' || u.hostname!=='checkout.stripe.com' || u.port || u.username || u.password || !u.pathname.startsWith('/c/pay/')) throw new PortalError('unsafe_checkout');
  return u.href;
}
export class BillingPortal {
  constructor(api,navigate,onChange=()=>{}) {this.api=api;this.navigate=navigate;this.onChange=onChange;this.epoch=0;this.request=0;this.identity=null;this.documentGeneration=0;this.document=null;this.state=this.empty();}
  empty(){return {memberships:[],enterpriseId:null,bills:[],selectedId:null,loading:false,paying:false,unknown:false,error:null};}
  emit(){this.onChange(this.state);}
  clearDocument(){this.documentGeneration++;this.document=null;}
  setIdentity(id){if(id===this.identity)return;this.clearDocument();this.epoch++;this.request++;this.identity=id;this.state=this.empty();this.emit();}
  async verify(){if(!this.identity)throw new PortalError('login_required'); const aal=await this.api.aal();if(aal!=='aal2')throw new PortalError('mfa_required');}
  current(epoch){if(epoch!==this.epoch)throw new PortalError('stale_identity');}
  async bootstrap(){const epoch=this.epoch;await this.verify();this.current(epoch);const result=await this.api.call('get-session-bootstrap',{});this.current(epoch);
    const s=result?.session;if(result?.success!==true || !s || s.profile?.userId!==this.identity || !Array.isArray(s.memberships))throw new PortalError('invalid_response');
    this.state.memberships=s.memberships.filter(m=>m.verificationStatus==='verified' && Array.isArray(m.permissions) && m.permissions.includes('billing'));
    this.emit();return this.state.memberships;
  }
  async selectEnterprise(id){this.clearDocument();if(this.state.paying)throw new PortalError('payment_in_progress');if(!this.state.memberships.some(m=>m.enterpriseId===id))throw new PortalError('company_denied');this.request++;this.state={...this.state,enterpriseId:id,bills:[],selectedId:null,error:null,unknown:false};this.emit();return this.refresh();}
  async refresh({explicit=false}={}){const epoch=this.epoch;const request=++this.request;const enterpriseId=this.state.enterpriseId;if(!enterpriseId)throw new PortalError('company_required');this.state.loading=true;this.emit();
    try{await this.verify();this.current(epoch);const r=await this.api.call('enterprise-admin-query',{action:'billing',enterpriseId});this.current(epoch);if(request!==this.request)return;
      if(r?.success!==true || r.data?.enterpriseId!==enterpriseId || !Array.isArray(r.data?.billingMonths))throw new PortalError('invalid_response');
      this.state.bills=r.data.billingMonths;if(explicit)this.state.unknown=false;this.state.error=null;
    }catch(e){if(epoch===this.epoch && request===this.request){this.state.bills=[];this.state.error=e.code||'read_failed';}throw e;}
    finally{if(epoch===this.epoch && request===this.request){this.state.loading=false;this.emit();}}
  }
  selectBill(id){this.clearDocument();if(this.state.paying)throw new PortalError('payment_in_progress');if(!this.state.bills.some(b=>b.billingMonthId===id))throw new PortalError('bill_denied');this.state.selectedId=id;this.emit();}
  async pay(){if(this.state.paying || this.state.unknown)return;const id=this.state.selectedId;const bill=this.state.bills.find(b=>b.billingMonthId===id);if(!bill || bill.status!=='unpaid' || bill.paymentMethod!=='card')throw new PortalError('not_payable');
    const epoch=this.epoch;const enterpriseId=this.state.enterpriseId;this.state.paying=true;this.state.error=null;this.emit();
    try {await this.verify();this.current(epoch);const c=await this.api.call('enterprise-admin-query',{action:'billing',enterpriseId});this.current(epoch);if(c?.success!==true || c.data?.enterpriseId!==enterpriseId || !Array.isArray(c.data?.billingMonths))throw new PortalError('company_denied');const fresh=c.data.billingMonths.find(x=>x.billingMonthId===id);if(!fresh || fresh.status!=='unpaid' || fresh.paymentMethod!=='card')throw new PortalError('not_payable');
      const r=await this.api.call('create-meguri-payment',{billingMonthId:id,clientRequestId:`billing:${id}`,sourceChannel:'web'});this.current(epoch);
      if(r?.success!==true)throw new PortalError('payment_result_unknown');
      if(r.checkoutUrl){const url=checkoutDestination(r.checkoutUrl);this.current(epoch);this.navigate(url,{userId:this.identity,enterpriseId,billingMonthId:id});}
      else await this.refresh();
    }catch(e){if(epoch===this.epoch){this.state.error=e.code||'payment_result_unknown';this.state.unknown=!['login_required','mfa_required','company_denied','forbidden'].includes(e.code);}throw e;}
    finally{if(epoch===this.epoch){this.state.paying=false;this.emit();}}
  }
  async documentFor(kind){
    if(!['invoice','receipt'].includes(kind))throw new PortalError('document_denied');
    this.clearDocument();const seq=this.documentGeneration,epoch=this.epoch,enterpriseId=this.state.enterpriseId,id=this.state.selectedId;
    const bill=this.state.bills.find(b=>b.billingMonthId===id);
    if(!bill || bill.status==='draft' || (kind==='receipt' && bill.status!=='paid'))throw new PortalError('document_denied');
    await this.verify();this.current(epoch);
    const r=await this.api.call('enterprise-admin-query',{action:'billingDocument',enterpriseId,billingMonthId:id,documentKind:kind});this.current(epoch);
    if(seq!==this.documentGeneration || enterpriseId!==this.state.enterpriseId || id!==this.state.selectedId)throw new PortalError('stale_identity');
    if(r?.success!==true || typeof r.data?.signedUrl!=='string')throw new PortalError('document_unavailable');
    const u=new URL(r.data.signedUrl),base=new URL(this.api.baseUrl);
    if(u.origin!==base.origin || !u.pathname.startsWith('/storage/v1/object/sign/enterprise-billing/') || u.username || u.password || u.hash)throw new PortalError('document_denied');
    // Short-lived URL remains in memory only, never sessionStorage or logs.
    this.document={url:u.href,kind};return this.document;
  }
  async returned(pending){if(!pending || pending.userId!==this.identity)throw new PortalError('return_identity_mismatch');await this.bootstrap();await this.selectEnterprise(pending.enterpriseId);this.selectBill(pending.billingMonthId);}
}
