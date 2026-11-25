import {zoomBrowserFlow} from './controller.js';
const initial=new URL(location.href),ticket=initial.hash.slice(1),params=initial.searchParams;
// Remove sensitive URL pieces before any request; this page must have no analytics.
history.replaceState(null,'',initial.pathname);
const message=document.getElementById('message'),button=document.getElementById('continue');
try{
 const configured=document.querySelector('meta[name="zoom-api"]').content;
 const api=new URL(configured);if(api.protocol!=='https:'||api.username||api.password||api.hash||api.search)throw Error();
 const post=async body=>{const response=await fetch(api.href,{method:'POST',credentials:'omit',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(30000)});if(!response.ok)throw Error();return response.json();};
 const flow=zoomBrowserFlow({storage:sessionStorage,post,navigate:url=>location.replace(url)});
 if(params.has('code')||params.has('error')){message.textContent='Zoomとの連携を確認しています。';button.hidden=true;await flow.finish(params);message.textContent='Zoomとの連携が完了しました。JUN-IKUへ戻ってください。';}
 else if(/^[a-f0-9]{64}$/.test(ticket)){message.textContent='この端末のJUN-IKUから開始した連携を続けます。';button.disabled=false;button.addEventListener('click',async()=>{button.disabled=true;try{await flow.begin(ticket);}catch{message.textContent='連携を開始できませんでした。JUN-IKUからやり直してください。';}});}
 else{message.textContent='JUN-IKUのZoom連携画面から開始してください。';}
}catch{message.textContent='連携を完了できませんでした。JUN-IKUへ戻り、接続状況を確認してください。';button.disabled=true;}
