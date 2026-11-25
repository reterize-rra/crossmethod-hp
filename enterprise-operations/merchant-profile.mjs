import {PortalError} from './controller.mjs';
const fields=['action','entityCode','legalName','publicBusinessName','supportEmail','statementDescriptor','active'];
export function merchantInput(body){
 const fail=()=>{throw new PortalError('invalid_input');};
 if(!body||typeof body!=='object'||Array.isArray(body)||Object.keys(body).some(k=>!fields.includes(k)))fail();
 if(body.action!=='setMerchantProfile'||!['healthy_food','meguri_usage_fee'].includes(body.entityCode)||typeof body.active!=='boolean')fail();
 for(const k of ['legalName','publicBusinessName'])if(typeof body[k]!=='string'||!body[k].trim()||body[k].trim().length>200)fail();
 if(typeof body.supportEmail!=='string'||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.supportEmail.trim()))fail();
 if(body.statementDescriptor!==undefined&&(typeof body.statementDescriptor!=='string'||body.statementDescriptor.trim().length>22))fail();
 return Object.freeze({...body});
}
export function merchantReceiptMatches(body,r){
 return !!r&&typeof r==='object'&&!Array.isArray(r)&&r.entityCode===body.entityCode
 &&r.legalName===body.legalName.trim()&&r.publicBusinessName===body.publicBusinessName.trim()
 &&r.supportEmail===body.supportEmail.trim().toLowerCase()&&r.active===body.active
 &&r.stripeAccountCode===(body.entityCode==='healthy_food'?'healthy_food':'meguri')
 &&typeof r.merchantEntityId==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(r.merchantEntityId);
}
