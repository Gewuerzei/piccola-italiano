/* Piccola Italiano v0.11 · Explainable, read-only study route. */
'use strict';
function pathwayData(){
 const history=state.placement?.history||[];
 const latest=history.length?history[history.length-1]:null;
 const evidence=latest&&typeof placementSummary==='function'?placementSummary(latest):null;
 const progress=state.progress||{};
 const map=new Map(CURRICULUM_NODES.map(n=>[n.id,n]));
 return {evidence,items:CURRICULUM_NODES.map(n=>{
  const skills=n.dimensions.filter(x=>['reading','grammar','lexicon'].includes(x));
  const samples=skills.map(k=>({k,stat:evidence?.[k]})).filter(x=>x.stat?.observed>0);
  const weak=samples.find(x=>x.stat.correct/x.stat.observed<0.75);
  const prereqs=n.prereq.map(id=>map.get(id)).filter(Boolean);
  const unreviewed=prereqs.filter(p=>!p.contentRefs.some(id=>(progress[id]?.repetitions||0)>=2));
  const practiced=n.contentRefs.some(id=>(progress[id]?.repetitions||0)>=2);
  const score=(n.utility==='A'?30:n.utility==='B'?17:8)+(weak?18:0)+(n.layer<=2?7:0)-unreviewed.length*8-(practiced?12:0);
  const reasons=[n.utility==='A'?'高实用价值':'拓展知识'];
  if(weak)reasons.push('最近小测该方向答题较困难，样本有限');
  else if(!samples.length)reasons.push('相关能力尚未测量');
  if(unreviewed.length)reasons.push('建议核对先修：'+unreviewed.map(p=>p.title).join('、'));
  return {node:n,score,reasons,prereqs:unreviewed};
 }).sort((a,b)=>b.score-a.score||a.node.layer-b.node.layer)};
}
function pathwayPanel(){
 return "<section class='card pathway-promo'><div><span class='eyebrow'>PERCORSO PERSONALE</span><h3>🧭 今天学什么？</h3><p>从先修知识、实际用途与有限的测评证据出发，解释每条建议。</p></div><button class='btn primary' data-action='pathway-open'>查看学习路线 →</button></section>";
}
function pathwayView(){
 const data=pathwayData();
 const cards=data.items.slice(0,5).map((x,i)=>"<article class='card pathway-card'><span class='eyebrow'>建议 "+(i+1)+" · L"+x.node.layer+"</span><h3>"+esc(x.node.title)+"</h3><p>"+esc(x.node.italian)+"</p><p>"+esc(x.node.why)+"</p><div class='pathway-reasons'>"+x.reasons.map(r=>"<small>• "+esc(r)+"</small>").join("")+"</div><button class='btn secondary small' data-action='pathway-node' data-id='"+esc(x.node.id)+"'>查看知识与先修 ↗</button></article>").join('');
 return "<section class='pathway-shell'><div class='pathway-hero'><button class='btn secondary small' data-action='pathway-close'>← 返回首页</button><span class='eyebrow'>SCUOLA DI PICCOLA</span><h1>🧭 个人学习路线</h1><p>"+(data.evidence?'已参考最近一轮有限测评结果。':'尚无完成的测评，先根据实用性与先修知识建议。')+" 这不是CEFR等级诊断，口语与听力未测量。</p></div><div class='pathway-tools'><button class='btn secondary small' data-action='pathway-placement'>能力定位 ↗</button><button class='btn secondary small' data-action='pathway-map'>完整知识地图 ↗</button></div><div class='pathway-grid'>"+cards+"</div><p class='muted'>建议顺序为启发式排序，不会修改旧学习成绩、复习安排或进度。</p></section>";
}
function pathwayAction(name,btn){
 switch(name){
 case 'pathway-open':ui.pathwayOpen=true;ui.placementOpen=false;ui.tab='home';render();return true;
 case 'pathway-close':ui.pathwayOpen=false;render();return true;
 case 'pathway-placement':ui.pathwayOpen=false;placementAction('placement-open',btn);return true;
 case 'pathway-map':ui.pathwayOpen=false;curriculumAction('curriculum-open',btn);return true;
 case 'pathway-node':
  if(!CURRICULUM_NODES.some(n=>n.id===btn.dataset.id))return true;
  ui.pathwayOpen=false;curriculumAction('curriculum-open',btn);
  curriculumAction('curriculum-focus',{dataset:{id:btn.dataset.id}});return true;
 default:return false;
 }
}
