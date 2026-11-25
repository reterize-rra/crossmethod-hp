const storageKey='juniku.zoom.flow.v1';
export function zoomBrowserFlow({storage,post,navigate,now=()=>Date.now()}){
 let busy=false;
 return {
  async begin(ticket){if(busy)return;busy=true;try{
   if(!/^[0-9a-f]{64}$/.test(ticket??''))throw Error('INVALID_TICKET');
   const verifier=Array.from(crypto.getRandomValues(new Uint8Array(32)),x=>x.toString(16).padStart(2,'0')).join('');
   const hash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(verifier))),x=>x.toString(16).padStart(2,'0')).join('');
   const result=await post({action:'begin',ticket,verifierHash:hash});const target=new URL(result.authorizationUrl);
   const state=target.searchParams.get('state');if(target.origin!=='https://zoom.us'||target.pathname!=='/oauth/authorize'||target.username||target.password||! /^[a-f0-9]{64}$/.test(state??''))throw Error('INVALID_DESTINATION');
   storage.setItem(storageKey,JSON.stringify({state,verifier,expires:now()+600000}));navigate(target.href);
  }finally{busy=false;}},
  async finish(params){if(busy)return;busy=true;try{
   for(const key of ['state','code','error'])if(params.getAll(key).length>1)throw Error('INVALID_CALLBACK');
   const raw=storage.getItem(storageKey);if(!raw)throw Error('START_AGAIN');const flow=JSON.parse(raw);
   if(flow.expires<=now()||flow.state!==params.get('state'))throw Error('START_AGAIN');
   // Once sent, do not blindly retry an uncertain provider token exchange.
   storage.removeItem(storageKey);
   const result=await post({action:'finish',state:flow.state,verifier:flow.verifier,code:params.get('code'),error:params.get('error')});
   if(result.connected!==true)throw Error('NOT_CONNECTED');return {connected:true};
  }finally{busy=false;}}
 };
}
