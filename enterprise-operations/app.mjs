import {inspect,resolve} from './journal.mjs';
import {addBillingLine,readBillingLines} from './billing-lines.mjs';
import {Operations} from './operations.mjs?v=flow5';
import {contracts} from './contracts.mjs';
import {adapter,validateConfig} from './sdk-adapter.mjs';
const el=id=>document.getElementById(id),node=(tag,t)=>{const n=document.createElement(tag);n.textContent=t;return n;};
const names={terminateEnterprise:'契約を終了',restoreEnterprise:'契約を再開',reverseBankPayment:'入金記録を訂正',createEnterprise:'企業登録・初期管理者を招待',createEnterpriseInvitation:'登録済み企業の担当者を招待',editEnterprise:'企業情報・支払方法を変更',changeEnterpriseUsage:'試用・有料の切替',saveBillingDraft:'請求明細・金額を入力',issueBilling:'請求書を発行',markBillingPaid:'銀行振込の入金を記録'};
let client,ops,generation=0,requestId=crypto.randomUUID(),sessionIdentity=null,sessionToken=null,viewReady=false;
const choices = document.querySelectorAll('[data-action]');
for (const button of choices) {
 button.onclick = () => {
   if (!viewReady || ops.busy || ops.unknown) return;
   const action = button.dataset.action;
   el('notice').textContent='';
   if (el('task').hidden || el('action').value !== action) {
     el('action').value = action;
     el('action').dispatchEvent(new Event('change'));
   }
   for (const choice of choices) choice.setAttribute('aria-expanded',String(choice === button));
   el('task-title').textContent = names[action];
   el('submit').disabled=Boolean(el('field-lines')?.disabled);
   el('submit').textContent = action === 'createEnterprise' ? '企業を登録して招待コードを発行' : names[action];
   el('task').hidden = false;
   el('task-title').focus();
 };
}
const selectionKey=id=>'operator-selection:'+id;
function rememberSelection(){if(!ops.identity||!el('field-billingMonthId'))return;const action=el('action').value;if(action!=='issueBilling'){sessionStorage.removeItem(selectionKey(ops.identity));return;}sessionStorage.setItem(selectionKey(ops.identity),JSON.stringify({action,billingMonthId:el('field-billingMonthId')?.value||null}));}
function restoreSelection(){if(!ops.identity)return;try{const saved=JSON.parse(sessionStorage.getItem(selectionKey(ops.identity))||'null');if(saved?.action==='issueBilling'&&ops.bills.some(b=>b.billingMonthId===saved.billingMonthId)){if(el('action').value!==saved.action)return;fields();el('field-billingMonthId').value=saved.billingMonthId;preferredMethod();}}catch{}el('confirm').checked=false;}

const notify=code=>{if(code==='stale_identity')return;el('notice').textContent=({login_required:'ログインを確認してください。',mfa_required:'登録済み認証アプリで追加認証してください。',forbidden:'運営権限を確認できません。',operation_pending:'処理中または結果不明のため停止しています。台帳を確認してください。',state_changed:'請求の状態が変わりました。再取得してください。'}[code]||'結果を確認できません。繰り返し実行せず、台帳と操作結果を確認してください。');};
function records() {
 const list = el('records');
 list.replaceChildren();
 for (const company of ops.enterprises) {
   const row = node('article','');
   row.append(node('strong',company.legalName || company.enterpriseName),
     node('p',[company.enterpriseCode,company.industryCategory,company.primaryWorktypeCategory].filter(Boolean).join(' ／ ')),
     node('p',[(company.usageType==='paid'?'有料':'試用'),company.contractStartedOn,
       ({active:'契約中',terminated:'契約終了',deleted:'削除済み'})[company.contractStatus]].filter(Boolean).join(' ／ ')),
     node('p',`契約人数 ${company.contractedUserCapacity??'—'}名 ／ 支払方法 ${methodLabel(company.feePaymentMethod)}`));
   if(company.contractStatus==='active'){
     const edit=node('button','企業情報を編集');edit.type='button';
     edit.onclick=()=>{
       if(!viewReady || ops.busy || ops.unknown)return;
       document.querySelector('[data-action="editEnterprise"]').click();
       el('field-enterpriseId').value=company.enterpriseId;fillProfile();
     };
     row.append(edit);
   }
   list.append(row);
 }
 if (!ops.enterprises.length) list.append(node('p','登録済みの企業はありません。'));
 renderBills();
}
function renderBills(){
 const query=el('bill-search').value.trim().toLocaleLowerCase();
 const status=el('bill-status').value;
 const ledger=el('bill-records');ledger.replaceChildren();
 for(const bill of ops.bills){
   if(status && bill.status!==status)continue;
   if(query && ![bill.enterpriseName,bill.billingMonth,bill.invoiceNumber].some(v=>String(v??'').toLocaleLowerCase().includes(query)))continue;
   const detail=node('details','');
   detail.append(node('summary',[bill.enterpriseName,bill.billingMonth,bill.invoiceNumber,
     ({draft:'下書き',unpaid:'未入金',paid:'入金済み'})[bill.status]||bill.status,
     Number(bill.totalAmount).toLocaleString('ja-JP')+'円'].filter(Boolean).join(' ／ ')));
   for(const line of bill.lines||[])detail.append(node('p',line.itemLabel+(line.included?'':'（請求対象外）')+' ／ 数量 '+line.quantity+' ／ 税抜 '+Number(line.amountExTax).toLocaleString('ja-JP')+'円'));
   const yen=n=>Number(n).toLocaleString('ja-JP')+'円';
   detail.append(node('p','税抜 '+yen(bill.subtotalExTax??0)+' ／ 税 '+yen(bill.taxAmount??0)+' ／ 合計 '+yen(bill.totalAmount)));
   if(bill.paymentMethod)detail.append(node('p',methodLabel(bill.paymentMethod)));
   const action=bill.status==='draft'?'issueBilling':bill.paymentMethod==='bank'?({unpaid:'markBillingPaid',paid:'reverseBankPayment'})[bill.status]:null;
   if(action){
     const button=node('button',names[action]);button.type='button';
     button.onclick=()=>{
       if(!viewReady||ops.busy||ops.unknown)return;
       document.querySelector('[data-action="'+action+'"]').click();
       el('field-billingMonthId').value=bill.billingMonthId;
       el('field-billingMonthId').dispatchEvent(new Event('change',{bubbles:true}));
       el('confirm').checked=false;
     };
     detail.append(button);
   }
   ledger.append(detail);
 }
 if(!ledger.childElementCount)ledger.append(node('p','該当する請求はありません。'));
}
function methodLabel(method){return ({bank:'銀行振込',card:'カード'})[method]||'未設定';}
function fillProfile(){
 const selected=ops.enterprises.find(x=>x.enterpriseId===el('field-enterpriseId').value);
 if(!selected)return;
 for(const key of Object.keys(contracts.editEnterprise)){
   if(key!=='enterpriseId' && key!=='clientRequestId')el('field-'+key).value=String((key==='paymentMethod'?selected.feePaymentMethod:selected[key])??'');
 }
 el('field-enterpriseId').dataset.version=selected.updatedAt;
 el('field-enterpriseId').dataset.revision=String(selected.feePaymentMethodRevision);
}
function billOptions(action){
 if(action==='reverseBankPayment')return ops.bills.filter(b=>b.status==='paid'&&b.paymentMethod==='bank');
 return ops.bills.filter(b=>action==='issueBilling'?b.status==='draft':b.status==='unpaid'&&b.paymentMethod==='bank');
}
function preferredMethod(){
 const bill=ops.bills.find(x=>x.billingMonthId===el('field-billingMonthId').value);
 const company=ops.enterprises.find(x=>x.enterpriseId===bill?.enterpriseId);
 el('field-paymentMethod').value=company?.feePaymentMethod||'';
}
function fields(){el('fields').replaceChildren();el('confirm').checked=false;const schema=contracts[el('action').value];for(const [key,f] of Object.entries(schema)){if(key==='clientRequestId')continue;const label=node('label',f.label),input=document.createElement(f.kind==='enum'||f.kind==='boolean'||['enterpriseId','billingMonthId'].includes(key)?'select':f.kind==='lines'?'fieldset':'input');input.id='field-'+key;input.dataset.kind=f.kind;
 if(f.kind==='lines'){input.append(node('legend','請求明細（人数・税・合計はサーバー計算）'));addBillingLine(input);const add=node('button','明細を追加');add.type='button';add.onclick=()=>addBillingLine(input);input.append(add);label.append(input);el('fields').append(label);continue;}
 if(input.tagName==='SELECT'){const entries=f.kind==='boolean'?[['true','有効'],['false','無効']]:f.kind==='enum'?f.choices.map(x=>[x,key==='inviteKind'?({employee:'従業員',role_holder:'役割担当者',system_admin:'企業管理者'}[x]||x):key==='paymentMethod'?methodLabel(x):key==='usageType'?({trial:'試用',paid:'有料'}[x]||x):key==='entityCode'?({healthy_food:'健康食の販売法人',meguri_usage_fee:'利用料の運営法人'}[x]||x):x]):key==='enterpriseId'?ops.enterprises.filter(x=>x.contractStatus===(el('action').value==='restoreEnterprise'?'terminated':'active')).map(x=>[x.enterpriseId,x.legalName||x.enterpriseName]):billOptions(el('action').value).map(x=>[x.billingMonthId,`${x.enterpriseName||''} ${x.invoiceNumber||'下書き'} ${x.status} ${x.totalAmount}円`]);for(const [v,t] of entries){const o=node('option',t);o.value=v;input.append(o);}}
 else{input.type=key==='billingMonth'?'month':f.kind==='date'?'date':f.kind==='timestamp'?'datetime-local':f.kind==='integer'?'number':key.toLowerCase().includes('email')?'email':'text';if(f.min!==undefined)input.min=f.min;if(f.max!==undefined)input.max=f.max;if(f.maxLength)input.maxLength=f.maxLength;if(f.default!==undefined)input.value=f.default;}
 input.required=!f.optional;label.append(input);
 if(key==='contractedUserCapacity') label.append(node('small','契約上の人数を記録します。招待人数の上限には使いません。'));
 if(key==='usageType'||key==='initialAdminName'||key==='enterpriseId')el('fields').append(node('h3',({usageType:'企業・契約情報',initialAdminName:'初期管理者',enterpriseId:'対象企業'})[key]));
 el('fields').append(label);}
 const action=el('action').value;
 if(action==='saveBillingDraft'){
   const loadDraft=()=>{
     const lines=el('field-lines');
     const bill=ops.bills.find(b=>b.enterpriseId===el('field-enterpriseId').value&&b.billingMonth?.slice(0,7)===el('field-billingMonth').value);
     lines.dataset.version=bill?.updatedAt||'';
     lines.querySelectorAll('[data-billing-line]').forEach(row=>row.remove());
     for(const line of bill?.lines?.length?bill.lines:[{}])addBillingLine(lines,line);
     lines.disabled=Boolean(bill&&bill.status!=='draft');
     el('confirm').checked=false;
     el('submit').disabled=lines.disabled;
     if(lines.disabled)el('notice').textContent='この月の請求書は発行済みです。請求台帳で内容を確認できます。';
   };
   el('field-billingMonth').onchange=loadDraft;
   el('field-enterpriseId').onchange=loadDraft;
 }
 if(action==='editEnterprise'){fillProfile();el('field-enterpriseId').onchange=fillProfile;}
 if(action==='issueBilling'){preferredMethod();el('field-billingMonthId').onchange=preferredMethod;}
 if(action==='createEnterprise')el('field-paymentMethod').selectedIndex=-1;
}
function clearSensitiveView(){
 viewReady=false;el('bill-search').value='';el('bill-status').value='';el('bill-records').replaceChildren();el('records').replaceChildren();el('fields').replaceChildren();el('result').replaceChildren();
 el('confirm').checked=false;el('submit').disabled=true;el('action').disabled=true;
 el('pending-result').textContent='';el('resolve-confirm').checked=false;el('resolve-pending').disabled=true;
}
async function refresh(){
 const g=generation;rememberSelection();
 try{
  await ops.refresh();if(g!==generation)return;
  records();fields();restoreSelection();viewReady=true;
  el('submit').disabled=ops.busy||ops.unknown;el('action').disabled=ops.busy||ops.unknown;
 }catch(error){
  if(g===generation&&error.code!=='stale_identity'){
   clearSensitiveView();
  }
  throw error;
 }
}
async function sessionChanged(session){const id=session?.user?.id||null,token=session?.access_token||null;if(id&&id===sessionIdentity&&token===sessionToken&&!el('operations').hidden)return;sessionIdentity=id;sessionToken=token;viewReady=false;const g=++generation;ops.setIdentity(session?.user?.id||null);el('task').hidden=true;for(const button of choices)button.setAttribute('aria-expanded','false');el('login').hidden=!!session;el('logout').hidden=!session;el('mfa').hidden=true;el('operations').hidden=true;el('records').replaceChildren();el('fields').replaceChildren();el('result').textContent='';el('pending-result').textContent='';el('resolve-confirm').checked=false;el('resolve-pending').disabled=true;el('notice').textContent='';if(!session)return;try{const a=await client.auth.mfa.getAuthenticatorAssuranceLevel();if(g!==generation)return;if(a.error)throw Error();if(a.data.currentLevel!=='aal2'){const fs=await client.auth.mfa.listFactors();if(g!==generation)return;el('factor').replaceChildren();for(const f of fs.data.totp.filter(x=>x.status==='verified')){const o=node('option',f.friendly_name||'認証アプリ');o.value=f.id;el('factor').append(o);}el('mfa').hidden=false;notify('mfa_required');return;}await refresh();if(g===generation)el('operations').hidden=false;}catch(e){if(g===generation){notify(e.code||'read_failed');if(!el('operations').hidden||!el('login').hidden)return;if(el('notice').textContent.includes('結果を確認できません'))el('notice').textContent='管理画面の読込みに失敗しました。ページを再読み込みしてください。';}}}
try{const r=await fetch('config.json',{cache:'no-store'});const cfg=validateConfig(await r.json());client=globalThis.supabase.createClient(cfg.supabaseUrl,cfg.anonKey,{auth:{persistSession:true,storage:sessionStorage,storageKey:'enterprise-operations-auth-v1',detectSessionInUrl:false}});for(let i=0;i<sessionStorage.length;i++){const key=sessionStorage.key(i);if(key?.startsWith('operator-pending:')&&!localStorage.getItem(key))localStorage.setItem(key,sessionStorage.getItem(key));}ops=new Operations(adapter(client,cfg.supabaseUrl),localStorage);for(const [v,t] of Object.entries(names)){const o=node('option',t);o.value=v;el('action').append(o);}client.auth.onAuthStateChange((event,session)=>{if(event==='TOKEN_REFRESHED'&&session?.user?.id===ops.identity)return;setTimeout(()=>void sessionChanged(session),0);});await sessionChanged((await client.auth.getSession()).data.session);
 el('login-form').onsubmit=async e=>{e.preventDefault();const password=el('password').value;el('password').value='';const r=await client.auth.signInWithPassword({email:el('email').value,password});if(r.error)notify('login_required');};
 el('mfa-form').onsubmit=async e=>{e.preventDefault();const code=el('code').value;el('code').value='';const r=await client.auth.mfa.challengeAndVerify({factorId:el('factor').value,code});if(r.error)notify('mfa_required');};
 el('inspect-pending').onclick=async()=>{try{const p=await inspect(ops);el('pending-result').textContent=({executed:'監査と現在状態で実行済みを確認しました。',rejected_before_write:'変更前の追加認証拒否と現在の下書きを確認しました。',unconfirmed:'サーバーに完了記録がありません。保留を解決すると、この操作番号での遅延実行を停止し、最終結果を照合します。',closed:'未実行で終了した操作です。',unresolved:'成否を確定できません。保留を維持します。'}[p.state]);el('resolve-pending').disabled=p.state==='unresolved';}catch{el('pending-result').textContent='対象情報不足または照合不能です。保留を維持します。';el('resolve-pending').disabled=true;}};el('resolve-pending').onclick=async()=>{try{const proof=await resolve(ops,el('resolve-confirm').checked);el('pending-result').textContent=proof.state==='executed'?'実行済みです。台帳を確認してください。':'未実行を確認しました。必要に応じて操作をやり直してください。';el('submit').disabled=false;el('action').disabled=false;await refresh();}catch{el('pending-result').textContent='保留を解除できません。再送せず照合してください。';}};
 el('reauth').onclick=async()=>{try{const fs=await client.auth.mfa.listFactors();if(fs.error)throw Error();el('factor').replaceChildren();for(const f of fs.data.totp.filter(x=>x.status==='verified')){const o=node('option',f.friendly_name||'認証アプリ');o.value=f.id;el('factor').append(o);}el('mfa').hidden=false;notify('mfa_required');}catch{notify('login_required');}};
 el('bill-search').oninput=()=>{if(viewReady)renderBills();};el('bill-status').onchange=el('bill-search').oninput;
 el('fields').oninput=()=>{el('confirm').checked=false;};el('fields').onchange=()=>{el('confirm').checked=false;rememberSelection();};
 el('action').onchange=()=>{if(ops.busy||ops.unknown)return;requestId=crypto.randomUUID();fields();rememberSelection();};el('refresh').onclick=()=>refresh().catch(e=>notify(e.code));
 el('command').onsubmit=async e=>{e.preventDefault();if(!el('confirm').checked)return;const body={action:el('action').value};for(const [key,f] of Object.entries(contracts[body.action])){if(key==='clientRequestId'){body[key]=requestId;continue;}if(f.kind==='lines'){body[key]=readBillingLines(el('field-'+key));continue;}let v=el('field-'+key).value;if(v===''&&f.optional)continue;body[key]=key==='billingMonth'?v+'-01':f.kind==='boolean'?v==='true':f.kind==='integer'?Number(v):f.kind==='timestamp'?new Date(v).toISOString():v;}if(body.action==='saveBillingDraft')body.expectedUpdatedAt=el('field-lines').dataset.version||null;if(body.action==='editEnterprise'){body.expectedUpdatedAt=el('field-enterpriseId').dataset.version;body.expectedRevision=Number(el('field-enterpriseId').dataset.revision);}
 const g=generation;el('submit').disabled=true;el('action').disabled=true;el('refresh').disabled=true;try{const receipt=await ops.execute(body);if(g!==generation)return;el('result').replaceChildren(node('p','操作を受け付けました。最新の台帳を確認してください。'));const invitation=receipt?.initialAdministratorInvitation || (receipt?.inviteCode?receipt:null);if(invitation){const label=node('label','招待コード（担当者が確認済みの相手へ安全に案内）'),v=document.createElement('input');v.readOnly=true;v.value=invitation.inviteCode;label.append(v);el('result').append(label,node('p','外部メールは自動送信していません。招待の有効期限：'+invitation.expiresAt));}el('task').hidden=true;for(const button of choices)button.setAttribute('aria-expanded','false');requestId=crypto.randomUUID();await refresh();}catch(e){if(g===generation){if(['login_required','mfa_required','forbidden','invalid_response'].includes(e.code))clearSensitiveView();notify(e.code);}}finally{if(g===generation){el('submit').disabled=!viewReady||ops.busy||ops.unknown;el('action').disabled=!viewReady||ops.busy||ops.unknown;el('refresh').disabled=ops.busy;}}};
 el('logout').onclick=async()=>{if(ops.identity)sessionStorage.removeItem(selectionKey(ops.identity));await sessionChanged(null);try{await client.auth.signOut({scope:'local'});}finally{sessionStorage.removeItem('enterprise-operations-auth-v1');el('email').value='';el('password').value='';el('code').value='';el('factor').replaceChildren();}};
}catch(e){notify(e.code);el('login-form').querySelector('button').disabled=true;}
