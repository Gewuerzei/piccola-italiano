/* Piccola Italiano v0.12 · Read-only Romance language bridges. */
'use strict';
const BRIDGE_EXAMPLES=[
 {id:'night',title:'夜晚',origin:'Latin noctem (accusative of nox)',pattern:'拉丁语 -ct- 在常见继承词中形成意大利语 -tt-，西班牙语 -ch-；法语有自己的复杂演变。',forms:[['la','古典拉丁语','noctem','/ˈnɔk.tɛm/',false],['it-IT','意大利语','notte','/ˈnɔt.te/',true],['es-ES','西班牙语','noche','/ˈno.tʃe/',true],['fr-FR','法语','nuit','/nɥi/',true]],warning:'现代词来自历史拉丁语变体的各自演变，不能把现代意大利语当成法语的祖先。',source:'https://en.wiktionary.org/wiki/noctem#Latin'},
 {id:'eight',title:'数字八',origin:'Latin octō',pattern:'octō → otto、ocho、huit，显示同源词的辅音和元音演变并不相同。',forms:[['la','古典拉丁语','octō','/ˈok.toː/',false],['it-IT','意大利语','otto','/ˈɔt.to/',true],['es-ES','西班牙语','ocho','/ˈo.tʃo/',true],['fr-FR','法语','huit','/ɥit/',true]],warning:'这些对应是历史演变的例子，不代表任何包含ct的外来词都会自动遵守相同规则。',source:'https://en.wiktionary.org/wiki/octo#Latin'},
 {id:'milk',title:'牛奶',origin:'Latin lactem (accusative of lac)',pattern:'lactem → latte、leche、lait，展示相近词根在不同罗曼语中的不同结果。',forms:[['la','古典拉丁语','lactem','/ˈlak.tɛm/',false],['it-IT','意大利语','latte','/ˈlat.te/',true],['es-ES','西班牙语','leche','/ˈle.tʃe/',true],['fr-FR','法语','lait','/lɛ/',true]],warning:'音标为教学用标准变体的宽式转写，不等于各地口音完全相同。',source:'https://en.wiktionary.org/wiki/lactem#Latin'},
 {id:'necessity',title:'必须和需要',origin:'Italian bisogna / Spanish hay que / French il faut',pattern:'三种语言都有表示一般必要性的结构，但它们不是词对词的同一套语法。',forms:[['it-IT','意大利语','Bisogna studiare.','',true],['es-ES','西班牙语','Hay que estudiar.','',true],['fr-FR','法语','Il faut étudier.','',true]],warning:'这些是功能相近的现代句子，并非三个句子互为同源词；不能从词形直接推导用法。',source:'https://www.treccani.it/vocabolario/bisognare/'}
];
function bridgePanel(){
 return "<section class='card bridge-promo'><div><span class='eyebrow'>PONTI TRA LE LINGUE · v0.12</span><h3>🌉 语言之间的桥梁</h3><p>从拉丁语走向意大利语、西班牙语和法语。听见差别，也理解不能直接套用的语法。</p></div><button class='btn primary' data-action='bridge-open'>进入比较语言实验室 →</button></section>";
}
function bridgeView(){
 const active=BRIDGE_EXAMPLES.find(x=>x.id===ui.bridgeId)||BRIDGE_EXAMPLES[0];
 const nav=BRIDGE_EXAMPLES.map(x=>"<button data-action='bridge-focus' data-id='"+esc(x.id)+"' aria-pressed='"+(x.id===active.id?"true":"false")+"'>"+esc(x.title)+"</button>").join('');
 const forms=active.forms.map(x=>"<div class='bridge-form'><span>"+esc(x[1])+"</span><strong lang='"+esc(x[0])+"'>"+esc(x[2])+"</strong>"+(x[3]?"<code>"+esc(x[3])+"</code>":"<small>句法比较 · 不标单词IPA</small>")+(x[4]?"<button class='btn secondary small' data-action='bridge-speak' data-id='"+esc(active.id)+"' data-lang='"+esc(x[0])+"'>▶ 发音</button>":"<small>重建读音，无录音</small>")+"</div>").join('');
 return "<section class='bridge-shell'><header class='bridge-hero'><button class='btn secondary small' data-action='bridge-close'>← 返回首页</button><span class='eyebrow'>LINGUISTICA COMPARATA</span><h1>🌉 语言之间的桥梁</h1><p>拉丁语是历史线索，不是学习意大利语的额外必修课。可以随时自由探索。</p></header><div class='bridge-tabs'>"+nav+"</div><article class='card bridge-detail'><span class='eyebrow'>"+esc(active.origin)+"</span><h2>"+esc(active.title)+"</h2><div class='bridge-forms'>"+forms+"</div><h3>历史与结构</h3><p>"+esc(active.pattern)+"</p><p class='bridge-warning'>⚑ "+esc(active.warning)+"</p><p class='bridge-source'>资料入口：<a href='"+esc(active.source)+"' target='_blank' rel='noopener noreferrer'>查看词源或语法资料 ↗</a>。这是外部参考入口，并非已完成的逐项学术来源审定。</p></article></section>";
}
function bridgeAction(name,btn){
 switch(name){
 case 'bridge-open':ui.bridgeOpen=true;ui.bridgeId='night';ui.pathwayOpen=false;ui.placementOpen=false;ui.tab='home';render();return true;
 case 'bridge-close':ui.bridgeOpen=false;render();return true;
 case 'bridge-focus':if(BRIDGE_EXAMPLES.some(x=>x.id===btn.dataset.id)){ui.bridgeId=btn.dataset.id;render()}return true;
 case 'bridge-speak':{
  const example=BRIDGE_EXAMPLES.find(x=>x.id===btn.dataset.id);
  const form=example?.forms.find(x=>x[0]===btn.dataset.lang&&x[4]);
  if(!form)return true;
  if(!('speechSynthesis' in window)||!window.SpeechSynthesisUtterance){toast('此设备不支持语音合成');return true}
  const voices=window.speechSynthesis.getVoices(),lang=form[0].toLowerCase();
  const voice=voices.find(v=>v.lang.toLowerCase()===lang)||voices.find(v=>v.lang.toLowerCase().split('-')[0]===lang.split('-')[0]);
  if(!voice){toast('设备尚未安装'+form[1]+'语音');return true}
  window.speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(form[2]);utterance.voice=voice;utterance.lang=voice.lang;utterance.rate=.85;window.speechSynthesis.speak(utterance);return true;
 }
 default:return false;
 }
}
