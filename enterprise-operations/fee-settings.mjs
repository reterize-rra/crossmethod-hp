import {merchantReceiptMatches} from './merchant-profile.mjs';

const purpose='meguri_usage_fee';
export function feeSettings(el,getOps,visible){
  const seller=el('fee-seller'),bank=el('fee-bank'),message=el('fee-message'),current=el('fee-current');
  let epoch=0,readVersion=0;
  function reset(){
    epoch++;
    seller.reset();
    bank.reset();
    for(const detail of el('fee-panel').querySelectorAll('details'))detail.open=false;
    current.textContent='';
    message.textContent='';
  }
  async function read(){
    const version=++readVersion,context=epoch;
    current.textContent='登録状況を確認中…';
    try{
      const result=await getOps().api.call('operator-admin-query',{action:'bankAccounts'});
      if(!visible()||epoch!==context||readVersion!==version)return;
      if(!result?.success||!Array.isArray(result.data?.accounts))throw Error();
      const account=result.data.accounts.find(row=>row.paymentPurpose===purpose);
      current.textContent=account
        ? '登録済み：'+[account.merchantLegalName,account.bankName,account.branchName,account.accountType,'末尾 '+account.accountNumberLast4,account.accountHolder].join(' ／ ')
        : '利用料の振込先は未登録です。初回は販売者、振込先の順に保存してください。';
    }catch{
      if(epoch===context&&version===readVersion)current.textContent='登録状況を取得できませんでした。一覧を更新してください。';
    }
  }
  async function save(event){
    event.preventDefault();
    const form=event.currentTarget,ops=getOps(),context=epoch;
    if(!visible()||ops.busy||ops.unknown||!form.reportValidity())return;
    const input=Object.fromEntries(Array.from(new FormData(form),([k,v])=>[k,String(v).trim()]));
    const isSeller=form===seller;
    const body=isSeller?{...input,action:'setMerchantProfile',entityCode:purpose,active:true}
                       :{...input,action:'setBankAccount',paymentPurpose:purpose};
    if(isSeller&&!body.statementDescriptor)delete body.statementDescriptor;
    ops.busy=true;
    const identity=ops.generation;
    const buttons=[seller,bank].map(f=>f.querySelector('button'));
    buttons.forEach(b=>b.disabled=true);
    try{
      await ops.verify(identity);
      if(!visible()||context!==epoch)return;
      const result=await ops.api.call('operator-admin-command',body);
      if(context!==epoch)return;
      const r=result?.data;
      const matches=isSeller?merchantReceiptMatches(body,r):r?.active===true&&r.paymentPurpose===purpose
        &&r.bankName===body.bankName&&r.branchName===body.branchName&&r.accountType===body.accountType
        &&r.accountHolder===body.accountHolder&&r.accountNumberLast4===body.accountNumber.slice(-4);
      if(!result?.success||!matches)throw Error();
      form.reset();
      form.closest('details').open=false;
      if(isSeller)bank.closest('details').open=true;
      message.textContent=isSeller?'販売者を保存しました。次に振込先を登録してください。':'利用料の振込先を保存しました。';
      await read();
    }catch(error){
      if(context===epoch)message.textContent=error.code==='mfa_required'||error.code==='forbidden'
        ? '管理設定で追加認証を更新し、運営権限を確認してください。'
        : '保存結果を確認できません。一覧を更新して登録状況を確認してください。振込先の登録には有効な販売者が必要です。';
    }finally{
      if(identity===ops.generation)ops.busy=false;
      buttons.forEach(b=>b.disabled=false);
    }
  }
  bank.oninput=e=>{if(e.target.type!=='checkbox')bank.querySelector('[type=checkbox]').checked=false;};
  seller.onsubmit=bank.onsubmit=save;
  return {read,reset};
}
