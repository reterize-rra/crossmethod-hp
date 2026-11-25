import {publicKey} from './review-config.js';
const base='https://hcbgkupuwykljajspgje.supabase.co';
const panel=document.querySelector('#panel'),status=document.querySelector('#status');
const fmt=new Intl.DateTimeFormat('ja-JP',{timeZone:'Asia/Tokyo',month:'long',day:'numeric',weekday:'short',hour:'2-digit',minute:'2-digit'});
const fragment=location.hash.slice(1);
if(fragment)history.replaceState({invite:fragment},'',location.pathname);
const invite=fragment||history.state?.invite;
const key='marketplace-host-session';
let bearer=sessionStorage.getItem(key),busy=false;
function element(tag,text,parent=panel){const el=document.createElement(tag);el.textContent=text;parent.append(el);return el;}
function field(label,type,value=''){
 const el=element('input','',element('label',label));el.type=type;el.value=value;return el;
}
function button(label,run){
 const b=element('button',label);b.type='button';b.onclick=async()=>{
  if(busy)return;busy=true;b.disabled=true;status.textContent='';
  try{await run();}catch(e){status.textContent=e.message;}finally{busy=false;b.disabled=false;}
 };return b;
}
async function api(action,fields={},path='juniku-marketplace-booking'){
 const res=await fetch(base+'/functions/v1/'+path,{method:'POST',headers:{'Content-Type':'application/json',...(bearer&&!invite?{Authorization:'Bearer '+bearer}:{})},body:JSON.stringify({action,...fields})});
 const data=await res.json();
 if(!res.ok){
  if(res.status===401&&!invite){bearer=null;sessionStorage.removeItem(key);login();}
  throw Error(data.error==='CONNECT_ZOOM'?'先に主催者のZoomを連携してください。':res.status===401?'審査用アカウントでログインしてください。':'操作を完了できませんでした。ページを開き直して最新の状態を確認してください。');
 }return data;
}
function link(label,url){const a=element('a',label);a.href=url;return a;}
function choices(slots,multiple,minutes){
 const box=element('fieldset','');element('legend','候補日時（日本時間）',box);
 return slots.map(t=>{const l=element('label','',box),i=element('input','',l);i.type=multiple?'checkbox':'radio';i.name='slot';i.value=t;
 const end=new Date(Date.parse(t)+minutes*60000).toLocaleTimeString('ja-JP',{timeZone:'Asia/Tokyo',hour:'2-digit',minute:'2-digit'});
 l.append(' '+fmt.format(new Date(t))+'〜'+end);return i;});
}
function slots(){
 const today=new Date(Date.now()+9*3600000).toISOString().slice(0,10),start=Date.parse(today+'T00:00:00+09:00');
 return Array.from({length:6},(_,i)=>new Date(start+(1+Math.floor(i/2))*86400000+(i%2?15:10)*3600000).toISOString());
}
function login(){
 panel.replaceChildren();element('h2','主催者ログイン');
 const mail=field('審査用メールアドレス','email'),pass=field('パスワード','password');pass.autocomplete='current-password';
 button('ログイン',async()=>{
 const r=await fetch(base+'/auth/v1/token?grant_type=password',{method:'POST',headers:{apikey:publicKey,'Content-Type':'application/json'},body:JSON.stringify({email:mail.value.trim(),password:pass.value})});
 pass.value='';if(!r.ok)throw Error('メールアドレスとパスワードを確認してください。');
 bearer=(await r.json()).access_token;sessionStorage.setItem(key,bearer);await host();
 });
}
async function host(){
 if(!bearer){login();return;}
 const {invite:r}=await api('host');panel.replaceChildren();element('h2',r?r.title:'予約案内を作成');
 if(!r){
 const z=await api('status',{},'juniku-marketplace-zoom');
 if(z.state==='disconnect_pending'){element('p','Zoom連携を解除しています。「最新の状態を表示」で確認できます。');}
 else if(z.state!=='connected'){button('Zoomと連携する',async()=>{const x=await api('issue',{},'juniku-marketplace-zoom');location.assign(x.browserUrl);});}
 else{
 const title=field('会議名','text','オンライン相談');const select=element('select','',element('label','所要時間 '));
 for(const n of [30,45,60])element('option',n+'分',select).value=n;
 const draw=()=>{panel.querySelector('fieldset')?.remove();panel.querySelector('[data-create]')?.remove();const list=choices(slots(),true,+select.value);
 button('予約リンクを作成',async()=>{const times=list.filter(i=>i.checked).map(i=>i.value);if(times.length<2)throw Error('変更用を含め、候補日時を2つ以上選んでください。');await api('issue',{title:title.value,minutes:+select.value,slots:times});await host();}).dataset.create='1';};select.onchange=draw;draw();
 button('Zoom連携を解除',async()=>{
  if(!confirm('この主催者のZoom連携を解除しますか？'))return;
  await api('disconnect',{},'juniku-marketplace-zoom');
  await host();
 });
 }
 }else if(r.phase==='open'){
 const u=new URL('./',location.href);u.hash=r.id;const a=link('予約者用リンクを開く',u.href);a.target='_blank';a.rel='noopener';
 button('予約リンクをコピー',async()=>{await navigator.clipboard.writeText(u.href);status.textContent='コピーしました。';});
 }else if(r.phase==='booked'){
 element('p','予約日時　'+fmt.format(new Date(r.start))+'（日本時間）');const opt=choices(r.slots.filter(t=>t!==r.start),false,r.minutes);
 button('日時を変更する',async()=>{const t=opt.find(i=>i.checked);if(!t)throw Error('変更先を選んでください。');await api('move',{id:r.id,revision:r.revision,start:t.value});await host();status.textContent='日時を変更しました。';});
 button('予約をキャンセル',async()=>{if(!confirm('この予約とZoom会議をキャンセルしますか？'))return;await api('cancel',{id:r.id,revision:r.revision});await host();status.textContent='キャンセルしました。';});
 }else{element('p','予約の処理結果を確認しています。');}
 button('最新の状態を表示',host);button('ログアウト',()=>{sessionStorage.removeItem(key);bearer=null;login();});
}
async function guest(){
 const storage='review-receipt-'+invite;
 let receipt=sessionStorage.getItem(storage);if(!receipt){receipt=Array.from(crypto.getRandomValues(new Uint8Array(32)),x=>x.toString(16).padStart(2,'0')).join('');sessionStorage.setItem(storage,receipt);}
 const showReceipt=async()=>{const r=await api('receipt',{id:invite,receipt});panel.replaceChildren();if(r.phase==='closed'){element('h2','予約はキャンセルされました');return;}
 if(r.phase!=='booked'){element('p','予約の状態を確認しています。');return;}element('h2','予約が確定しました');element('p',fmt.format(new Date(r.start))+'（日本時間）');link('Zoom会議に参加する',r.joinUrl);};
 if(sessionStorage.getItem(storage+'-sent')){await showReceipt();return;}
 const r=await api('availability',{id:invite});panel.replaceChildren();element('h2',r.title);if(!r.slots.length){element('p','現在選べる枠はありません。');return;}
 element('p','所要時間 '+r.minutes+'分');const items=choices(r.slots,false,r.minutes);
 button('予約を確定する',async()=>{const i=items.find(i=>i.checked);if(!i)throw Error('ご希望の日時を選んでください。');await api('book',{id:invite,receipt,start:i.value});sessionStorage.setItem(storage+'-sent','1');await showReceipt();});
}
(invite?guest():host()).catch(e=>status.textContent=e.message);
