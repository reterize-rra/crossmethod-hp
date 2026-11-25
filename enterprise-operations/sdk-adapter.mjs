import {PortalError} from './controller.mjs';
export {validateConfig} from './config-policy.mjs';
export function adapter(client,baseUrl){return {baseUrl,
 async aal(){const r=await client.auth.mfa.getAuthenticatorAssuranceLevel();if(r.error)throw new PortalError('login_required');return r.data.currentLevel;},
 async call(name,body){const r=await client.functions.invoke(name,{body});if(r.error){const status=r.error.context?.status;if(status===403){let b;try{b=await r.error.context.clone().json();}catch{}if(b?.success===false&&b.message==='この操作には直前の追加認証が必要です。'){const e=new PortalError('mfa_required');e.preconditionRejected=true;throw e;}}throw new PortalError(status===401?'login_required':status===403?'forbidden':'request_failed');}return r.data;}
};}
