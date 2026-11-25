import {PortalError} from './controller.mjs';
export const PROJECT='uxsdddejthdpoxghuzca';
export const ENTRY='https://www.tsunagari-jp.com/enterprise-operations/'; // proposed, not published
export const SUPABASE=`https://${PROJECT}.supabase.co`;
export function validateConfig(c,href=globalThis.location?.href){
 const fail=()=>{throw new PortalError('configuration_unavailable');};
 if(!c||Array.isArray(c)||c.schema!==1||c.enabled!==true||c.mode!=='production'||c.project!==PROJECT||c.entryUrl!==ENTRY||c.supabaseUrl!==SUPABASE||typeof c.anonKey!=='string')fail();
 if(Object.keys(c).some(k=>!['schema','enabled','mode','project','entryUrl','supabaseUrl','anonKey'].includes(k)))fail();
 let u;try{u=new URL(href);}catch{fail();}
 if(u.origin!==new URL(ENTRY).origin||u.pathname!==new URL(ENTRY).pathname||u.hash||u.username||u.password)fail();
 if([...u.searchParams].length>1||[...u.searchParams].some(([k,v])=>k!=='result'||!['success','cancel'].includes(v)))fail();
 if(c.anonKey.startsWith('sb_publishable_')){if(!/^sb_publishable_[A-Za-z0-9_-]{20,}$/.test(c.anonKey))fail();}
 else {
  try{const parts=c.anonKey.split('.');if(parts.length!==3)fail();const p=JSON.parse(atob(parts[1].replace(/-/g,'+').replace(/_/g,'/')));if(p.role!=='anon'||p.ref!==PROJECT||p.iss!=='supabase'||!Number.isFinite(p.exp)||p.exp*1000<=Date.now())fail();}catch{fail();}
 }
 return Object.freeze({...c});
}
