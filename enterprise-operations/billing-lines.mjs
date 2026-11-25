// Explicit prices remain operator input. Existing server owns headcount, tax and totals.
export function addBillingLine(parent,line={}){
 const row=document.createElement('fieldset');row.dataset.billingLine='true';
 const fields=[['included','請求に含める','checkbox'],['itemCode','項目コード','text'],['itemLabel','項目名','text'],['pricingType','計算方式','select'],['quantity','固定数量（人数単価はサーバーの有効人数）','number'],['unitPriceExTax','税抜単価','number']];
 for(const [key,title,type] of fields){const label=document.createElement('label');label.textContent=title;const i=document.createElement(type==='select'?'select':'input');i.dataset.field=key;if(type==='select'){for(const [v,t]of[['fixed','固定額'],['per_user','有効人数×単価']]){const o=document.createElement('option');o.value=v;o.textContent=t;i.append(o);}}else{i.type=type;i.required=true;if(type==='number'){i.min='0';i.step='1';}}if(key==='included'){i.required=false;i.checked=line.included!==false;}
 else if(key==='quantity')i.value=String(line.quantity??1);
 else if(line[key]!=null)i.value=String(line[key]);
 if(key==='itemCode'){i.pattern='[A-Za-z0-9_\\-]+';i.maxLength=50;i.title='半角英数字、ハイフン、アンダースコア';}
 label.append(i);row.append(label);}
 const remove=document.createElement('button');remove.type='button';remove.textContent='この明細を外す';remove.onclick=()=>row.remove();row.append(remove);parent.append(row);
}
export function readBillingLines(parent){return [...parent.querySelectorAll('[data-billing-line]')].map(row=>{const value=k=>row.querySelector('[data-field="'+k+'"]').value;return {itemCode:value('itemCode'),itemLabel:value('itemLabel'),pricingType:value('pricingType'),quantity:Number(value('quantity')),unitPriceExTax:Number(value('unitPriceExTax')),included:row.querySelector('[data-field="included"]').checked};});}
