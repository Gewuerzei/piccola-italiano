/* Piccola Italiano v0.13 · Optional read-only transfer practice. */
'use strict';
const TRANSFER_TASKS=[
 {id:'octo',title:'从 noctem 推理 octō',prompt:'已知拉丁语 noctem 对应意大利语 notte。拉丁语 octō 在意大利语中常见的继承形式是什么？',choices:['otto','ocho','octo'],correct:0,explain:'意大利语 otto 与 noctem → notte 都能展示继承词中的 -ct- → -tt-。ocho 是西班牙语；octo 在意大利语中不是这个常用数词。',caution:'这是一组历史词汇的音变对应，不是适用于所有新词、借词的机械替换。',bridge:'eight'},
 {id:'lactem',title:'再推理 lactem',prompt:'在相同的继承词对照中，拉丁语 lactem 的意大利语常用词是？',choices:['latte','leche','lait'],correct:0,explain:'latte 是意大利语；leche 是西班牙语；lait 是法语。三者是各自演变的同源词。',caution:'音变规则描述历史趋势，不保证从古典拉丁语拼写直接推算出现代词形。',bridge:'milk'},
 {id:'necessity',title:'相似功能不等于相同结构',prompt:'意大利语 Bisogna studiare. 对应的自然西班牙语一般必要性表达是哪一个？',choices:['Hay que estudiar.','Es necesario que estudias.','Bisogna estudiar.'],correct:0,explain:'Hay que + 不定式是西班牙语中常用的无人称必要性结构。其他选项分别混淆了虚拟式搭配或混用意大利语词形。',caution:'语义相似不代表可以逐词替换；不同语言的动词、语气和句法规则各自成立。',bridge:'necessity'},
 {id:'false-friend',title:'辨认假朋友',prompt:'意大利语 camera 和英语 camera 最常见的日常含义是否相同？',choices:['不同：意大利语通常指房间，英语通常指照相机','完全相同，都只指照相机','完全相同，都只指房间'],correct:0,explain:'意大利语 camera 常指房间，英语 camera 常指相机。意大利语表达相机通常用 macchina fotografica 或 fotocamera。',caution:'两词有历史关联，但现代常用义已经分化；不要仅凭拼写猜含义。',bridge:null},
 {id:'condition',title:'条件与时间',prompt:'Se domani piove, resto a casa. 这句意大利语里的 se 表达什么？',choices:['条件：如果明天下雨','原因：因为明天下雨','让步：虽然明天下雨'],correct:0,explain:'se 引入条件；perché 常表达原因，anche se 可表达让步。',caution:'不能因为英语 if 和意大利语 se 在此功能相近，就认为它们在所有从句和时态里一一对应。',bridge:null},
 {id:'latin-recording',title:'识别历史发音证据',prompt:'网页展示古典拉丁语 noctem 的重建IPA。下面哪种说法更准确？',choices:['这是语言学重建的发音表示，不是古代真实录音','这证明所有罗马人都这样发音','这是从现代意大利语直接录下来的古典拉丁语'],correct:0,explain:'古典拉丁语发音来自文献、诗律、拼写和比较语言学等证据的重建，不存在来自古罗马的声音录音。',caution:'重建模型具有证据基础，但不代表每个时代、地区、阶层发音完全相同。',bridge:'night'}
];
function transferPanel(){return "<section class='card transfer-promo'><div><span class='eyebrow'>LABORATORIO DI TRASFERIMENTO</span><h3>🧪 迁移能力实验室</h3><p>6道原创题，试试能不能把学过的规则用于新情境，并识别不能直接套用的地方。</p></div><button class='btn primary' data-action='transfer-open'>开始迁移练习 →</button></section>"}
function transferView(){
 const task=TRANSFER_TASKS[ui.transferIndex]||TRANSFER_TASKS[0],selected=ui.transferAnswer;
 const answers=task.choices.map((c,i)=>"<button class='transfer-choice' data-action='transfer-answer' data-id='"+i+"' "+(selected!==null?"disabled":"")+">"+esc(c)+"</button>").join('');
 return "<section class='transfer-shell'><header class='transfer-hero'><button class='btn secondary small' data-action='transfer-close'>← 返回首页</button><span class='eyebrow'>LABORATORIO · "+(ui.transferIndex+1)+"/"+TRANSFER_TASKS.length+"</span><h1>🧪 语言迁移实验室</h1><p>本轮仅在页面内保留答案，不写入个人成绩或掌握状态。</p></header><article class='card transfer-task'><h2>"+esc(task.title)+"</h2><p>"+esc(task.prompt)+"</p><div class='transfer-choices'>"+answers+"</div>"+(selected===null?"":("<div class='transfer-feedback'><strong>"+(selected===task.correct?"✓ 这次判断正确":"↻ 这次还需要核对")+"</strong><p>"+esc(task.explain)+"</p><p>⚑ "+esc(task.caution)+"</p>"+(task.bridge?"<button class='btn secondary small' data-action='transfer-bridge' data-id='"+esc(task.bridge)+"'>查看相关语言桥梁 ↗</button>":"")+"</div>"))+"<div class='transfer-controls'><button class='btn secondary small' data-action='transfer-next'>"+(ui.transferIndex===TRANSFER_TASKS.length-1?"重新开始":"下一题 →")+"</button><small>可跳题；跳题不算答错。</small></div></article></section>";
}
function transferAction(name,btn){
 switch(name){
 case 'transfer-open':ui.transferOpen=true;ui.transferIndex=0;ui.transferAnswer=null;ui.bridgeOpen=false;ui.pathwayOpen=false;ui.placementOpen=false;ui.tab='home';render();return true;
 case 'transfer-close':ui.transferOpen=false;render();return true;
 case 'transfer-answer':if(ui.transferAnswer===null){const answer=Number(btn.dataset.id);if(Number.isInteger(answer)&&answer>=0&&answer<TRANSFER_TASKS[ui.transferIndex].choices.length){ui.transferAnswer=answer;render()}}return true;
 case 'transfer-next':ui.transferIndex=(ui.transferIndex+1)%TRANSFER_TASKS.length;ui.transferAnswer=null;render();return true;
 case 'transfer-bridge':if(!BRIDGE_EXAMPLES.some(x=>x.id===btn.dataset.id))return true;ui.transferOpen=false;ui.bridgeOpen=true;ui.bridgeId=btn.dataset.id;render();return true;
 default:return false;
 }
}
