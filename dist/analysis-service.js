import {projects} from './data.js';
// UI-independent boundary. Replace the adapter with a server endpoint for real AI.
// Never ship provider credentials to this static application.
export async function analyzePhoto({imageData,templateId='lamp',dimensions={}}, {adapter}={}){
 if(typeof imageData!=='string'||!imageData.startsWith('data:image/'))throw new Error('画像を追加してください。');
 if(adapter)return adapter({imageData,templateId,dimensions});
 const template=projects.find(p=>p.id===templateId);if(!template)throw new Error('サンプルを選択してください。');
 return {mode:'mock',templateId,dimensions,features:templateId==='lamp'?['円筒形のカバー','すき間のある透かし模様','かぎ針編みを想定']:['平らな編み地','かぎ針編みを想定'],candidates:template.techniques.filter(id=>!['chain','finish','slip'].includes(id)),recommended:templateId==='lamp'?'filet':template.techniques[1],reason:templateId==='lamp'?'方眼編みはマスの数を確認しやすく、長編みと鎖編みの繰り返しを練習できるためです。':'同じ編み方を繰り返す構成で、目数と幅を確かめながら進めやすいためです。',notice:'サンプル結果です。写真の内容は解析していません。選んだ練習作品のデータを表示しています。',uncertainty:'写真だけでは針の号数、糸の太さ、目数、段数、内部構造は確定できません。'};
}
export async function prepareImage(file){
 if(!file||!['image/jpeg','image/png','image/webp'].includes(file.type))throw new Error('JPEG・PNG・WebPの画像を選んでください。HEICはJPEGに変換してください。');
 if(file.size>10*1024*1024)throw new Error('画像は10MB以下にしてください。');
 const bitmap=await createImageBitmap(file).catch(()=>{throw new Error('画像を読み込めませんでした。別の画像を選んでください。');});
 try{const scale=Math.min(1,1000/Math.max(bitmap.width,bitmap.height));const canvas=document.createElement('canvas');canvas.width=Math.round(bitmap.width*scale);canvas.height=Math.round(bitmap.height*scale);const ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(bitmap,0,0,canvas.width,canvas.height);return canvas.toDataURL('image/jpeg',.78);}finally{bitmap.close();}
}
