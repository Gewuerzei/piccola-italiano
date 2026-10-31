/* Piccola Italiano v0.15 · one-step lessons, lasting course records and mixed review. */
'use strict';

function autoHomePanel(){
  const active=autoStore().active, recommendation=autoRecommendation();
  const lesson=active?autoLesson(active.lessonId):recommendation.lesson;
  const count=active?Math.min(AUTO_TURN_LIMIT,active.answers.length+(active.phase==='feedback'?0:1)):0;
  const resume=active&&active.phase!=='intro';
  return `<section class="auto-home" aria-labelledby="auto-home-title">
    <span class="eyebrow">BENVENUTO, PIETRO · UN PASSO ALLA VOLTA</span>
    <h1 id="auto-home-title">今天，跟着 Piccola 学。</h1>
    <p class="auto-home-intro">一次一句。遇到卡住的地方，我们就换个例子再来。</p>
    <div class="auto-home-lesson"><span>${resume?'接着上次继续':'接下来学'}</span><strong>${esc(lesson?.title||'从一句意大利语开始')}</strong><p>${esc(resume?`上次停在第 ${Math.max(1,count)} 题，已经保存的回答会保留。`:recommendation.reason||'先看一个例子，再一步步自己用出来。')}</p></div>
    <div class="auto-home-actions"><button type="button" class="btn auto-main-button" data-action="auto-open">${active?'继续学习 →':'开始自动学习 →'}</button><button type="button" class="auto-home-link" data-action="auto-catalog">查看课程路线</button></div>
    <p class="auto-home-note">每轮 ${AUTO_TURN_LIMIT} 题 · 可暂停续做 · 按回答调整练习</p>
  </section>`;
}

function autoTopbar(catalog){
  return `<div class="auto-topbar"><button type="button" class="auto-text-button" data-action="${catalog?'auto-back':'auto-pause'}">${catalog?'← 返回学习':'← 暂停，回首页'}</button>${catalog?'':`<button type="button" class="auto-text-button" data-action="auto-catalog">课程路线</button>`}</div>`;
}

function autoPronounTable(){
  return `<table class="auto-pronoun-table"><caption>看被代替的名词</caption><thead><tr><th scope="col">名词</th><th scope="col">单数</th><th scope="col">复数</th></tr></thead><tbody><tr><th scope="row">阳性</th><td lang="it">lo</td><td lang="it">li</td></tr><tr><th scope="row">阴性</th><td lang="it">la</td><td lang="it">le</td></tr></tbody></table>`;
}

function autoSpeakControl(kind,id){
  if(!autoSpeechText(kind,id))return '';
  return `<div class="auto-audio"><button type="button" class="auto-text-button auto-speak-button" data-action="auto-speak" data-kind="${esc(kind)}" data-id="${esc(id)}" aria-label="${kind==='lesson'?'朗读这句意大利语例句':'朗读这道题的意大利语参考表达'}"><span aria-hidden="true">▶</span> ${kind==='lesson'?'听例句':'听这句'}</button><small>系统意大利语朗读 · 不计成绩</small></div>`;
}

function autoReviewSourceLessons(session){
  const ids=Array.isArray(session.reviewIds)?session.reviewIds:session.answers.map(answer=>answer.questionId);
  return [...new Set(ids.map(id=>autoQuestion(id)?.lessonId).filter(Boolean))].map(autoLesson).filter(Boolean);
}

function autoIntroView(session,lesson){
  const mixed=autoIsReview(session);
  const ordered=AUTO_LESSONS.slice().sort((a,b)=>a.order-b.order);
  const position=ordered.findIndex(item=>item.id===lesson.id)+1;
  const sources=mixed?autoReviewSourceLessons(session):[];
  const example=lesson.example?.it?`<div class="auto-example"><span>先看一句</span><p lang="it">${esc(lesson.example.it)}</p><small>${esc(lesson.example.zh||'')}</small>${autoSpeakControl('lesson',lesson.id)}</div>`:'';
  return `<section class="card auto-lesson-card"><span class="eyebrow">${mixed?'RIPASSO MIRATO · 混合复习':`PICCOLA TI ACCOMPAGNA · 小课 ${position} / ${AUTO_LESSONS.length}`}</span>
    <h1 id="auto-heading" tabindex="-1">${esc(lesson.title)}</h1><p class="auto-goal">${esc(lesson.goal)}</p>
    <div class="auto-explanation">${(lesson.explanation||[]).map(line=>`<p>${esc(line)}</p>`).join('')}</div>
    ${lesson.id==='auto-objects-forms'?autoPronounTable():''}
    ${sources.length?`<div class="auto-review-topics"><span>本轮回顾的课程</span><ul>${sources.map(source=>`<li>${esc(source.title)}</li>`).join('')}</ul></div>`:''}
    ${example}<div class="auto-primary-row"><button type="button" class="btn primary auto-wide-button" data-action="auto-begin">${mixed?'开始回顾 →':'懂了，试一题 →'}</button></div>
    <p class="auto-fineprint">${mixed?'这轮记录复习表现，不会把整节课程标记为完成。':'不必一次答对。需要时可以看提示，或先跳过。'}</p>
  </section>`;
}

function autoQuestionView(session,lesson){
  const question=autoCurrent(session);
  if(!question)return `<section class="card auto-lesson-card"><h1 id="auto-heading" tabindex="-1">这道题暂时无法显示</h1><p class="auto-goal">先回首页保留进度，再重新进入课程。</p><button type="button" class="btn primary" data-action="auto-pause">回首页</button></section>`;
  const mixed=autoIsReview(session), sourceLesson=autoLesson(question.lessonId)||lesson;
  const feedback=session.phase==='feedback', answered=session.answers.length;
  const index=Math.min(AUTO_TURN_LIMIT,answered+(feedback?0:1));
  const last=feedback?session.answers[answered-1]:null;
  const taskName=question.taskLabel||(question.type==='choice'?'选出合适表达':question.level===3?'写出一句话':'补全表达');
  const inputLabel=question.inputLabel||(question.level===3?'按要求写出句子':'写出空缺的词或短语');
  const placeholder=question.placeholder||(question.level===3?'Scrivi la frase…':'Scrivi qui…');
  const progress=Math.min(100,answered/AUTO_TURN_LIMIT*100);
  let interaction='';
  if(feedback&&last){
    const title=last.skipped?'先看懂这句':last.correct?(last.hinted?'借助提示答对了':'对，就是这样。'):'看一眼，再换一句试试。';
    interaction=`<section class="auto-feedback ${last.correct?'is-correct':'is-repair'}" aria-labelledby="auto-feedback-title"><h2 id="auto-feedback-title">${esc(title)}</h2>${last.skipped?'':`<p class="auto-your-answer">你的回答：<span lang="it">${esc(last.answer)}</span></p>`}<p class="auto-correct-answer" lang="it">${esc(question.answerLabel)}</p><p>${esc(question.explanation)}</p>${autoSpeakControl('question',question.id)}${last.hinted?'<small>这题记作辅助练习，之后再试一次不看提示。</small>':''}</section>
      <div class="auto-primary-row"><button type="button" class="btn primary auto-wide-button" data-action="auto-next" data-id="${esc(question.id)}">${answered>=AUTO_TURN_LIMIT?'看看这一轮 →':'下一题 →'}</button></div>`;
  }else{
    const hint=session.hintShown?`<div class="auto-hint" role="note"><strong>一点提示</strong><p>${esc(question.hint)}</p><small>这一题会记作辅助练习。</small></div>`:'';
    const scaffold=session.scaffold&&sourceLesson.example?.it?`<div class="auto-scaffold"><strong>先借一句例子</strong><p lang="it">${esc(sourceLesson.example.it)}</p><small>${esc(sourceLesson.example.zh||'')}</small>${autoSpeakControl('lesson',sourceLesson.id)}</div>`:'';
    const answers=question.type==='choice'?`<div class="auto-choices" role="group" aria-label="选择答案">${question.choices.map((choice,i)=>`<button type="button" class="auto-choice" data-action="auto-choice" data-id="${esc(question.id)}" data-choice="${i}"><span class="auto-choice-letter" aria-hidden="true">${'ABCD'[i]||i+1}</span><span lang="it">${esc(choice)}</span></button>`).join('')}</div>`:`<form id="auto-answer-form" data-id="${esc(question.id)}" class="auto-answer-form"><label for="auto-answer">${esc(inputLabel)}</label><input id="auto-answer" name="answer" value="${esc(session.draft||'')}" type="text" lang="it" maxlength="200" placeholder="${esc(placeholder)}" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" enterkeyhint="done" aria-describedby="auto-answer-help" /><p id="auto-answer-help" class="auto-input-help">按上面的要求作答；卡住时可以先看提示。</p><button type="submit" class="btn primary auto-wide-button">确认答案 →</button></form>`;
    interaction=`${scaffold}${hint}${answers}<div class="auto-help-actions">${session.hintShown?'':`<button type="button" class="auto-text-button" data-action="auto-hint" data-id="${esc(question.id)}">给我一点提示</button>`}<button type="button" class="auto-text-button" data-action="auto-skip" data-id="${esc(question.id)}">先跳过</button></div>`;
  }
  return `<section class="card auto-lesson-card"><div class="auto-question-meta"><span>${esc(lesson.title)}</span><span>第 ${index} / ${AUTO_TURN_LIMIT} 题</span></div><div class="auto-progress" role="progressbar" aria-label="本轮进度" aria-valuemin="0" aria-valuemax="${AUTO_TURN_LIMIT}" aria-valuenow="${answered}"><span style="width:${progress}%"></span></div>${mixed?`<p class="auto-review-source">来自：${esc(sourceLesson.title)}</p>`:''}<span class="eyebrow">${esc(taskName)}</span><h1 id="auto-heading" tabindex="-1" class="auto-question-text">${esc(question.prompt)}</h1>${interaction}</section>`;
}

function autoReviewSummary(run){
  const groups=new Map();
  for(const answer of run.answers){
    const question=autoQuestion(answer.questionId), lesson=question&&autoLesson(question.lessonId);
    if(!lesson)continue;
    if(!groups.has(lesson.id))groups.set(lesson.id,{title:lesson.title,unaided:0,needsPractice:0,focusLabels:new Set()});
    const group=groups.get(lesson.id);
    if(answer.correct&&!answer.hinted&&!answer.skipped)group.unaided++;
    else{
      group.needsPractice++;
      group.focusLabels.add(lesson.focusLabels?.[question.focus]||(['lo','la','li','le'].includes(question.focus)?'代词 '+question.focus:question.taskLabel||'这组表达'));
    }
  }
  return `<section class="auto-review-summary"><h2>本轮回顾的知识点</h2><ul>${[...groups.values()].map(group=>`<li><strong>${esc(group.title)}</strong><span>${group.unaided} 题独立答对${group.needsPractice?` · ${group.needsPractice} 题待巩固`:''}</span>${group.focusLabels.size?`<small>下次多练：${esc([...group.focusLabels].join('、'))}</small>`:''}</li>`).join('')}</ul><p>待巩固包括借助提示、答错和跳过的题；下次仍可继续练。</p></section>`;
}

function autoSummaryView(run){
  const lesson=autoLesson(run.lessonId), stats=autoStats(run), next=autoRecommendation(), mixed=autoIsReview(run);
  const nonSkipped=run.answers.filter(answer=>!answer.skipped).length;
  const recognition=run.answers.filter(answer=>answer.correct&&!answer.hinted&&!answer.skipped&&autoQuestion(answer.questionId)?.evidence==='recognition').length;
  const message=nonSkipped===0?'这次先看了例子。下次我们从一题开始。':stats.unaided===0?'你已经试过这一组句子。接下来多给一点支撑，再把它用出来。':`这一轮有 ${stats.unaided} 题，是你不看提示自己答对的。`;
  return `<section class="card auto-lesson-card auto-summary"><span class="auto-summary-mark" aria-hidden="true">✓</span><span class="eyebrow">${mixed?'RIPASSO MIRATO':'UN PASSO IN PIÙ'}</span><h1 id="auto-heading" tabindex="-1">这一轮先到这里。</h1><p class="auto-goal">${esc(lesson?.title||'自动学习')}</p><p class="auto-summary-message">${esc(message)}</p><dl class="auto-evidence-counts"><div><dt>识别题独立答对</dt><dd>${recognition}</dd></div><div><dt>填空／改写独立答对</dt><dd>${stats.controlled}</dd></div></dl><p class="auto-summary-detail">辅助练习 ${stats.helped} 题 · 跳过 ${stats.skipped} 题</p>${mixed?autoReviewSummary(run):''}<div class="auto-next-up"><span>接下来</span><h2>${esc(next.lesson?.title||'再巩固一轮')}</h2><p>${esc(next.reason||'换一些句子，继续巩固。')}</p></div><div class="auto-primary-row"><button type="button" class="btn primary auto-wide-button" data-action="auto-continue">继续学习 →</button></div><button type="button" class="auto-text-button auto-finish-button" data-action="auto-pause">今天先到这里</button><p class="auto-fineprint">书面题只检查给定形式的填空与改写；自由表达、听力和口语还没有测量。${mixed?'混合复习只保留本轮记录，不标记整节课程完成。':''}</p></section>`;
}

function autoCatalogView(){
  const store=autoStore(), active=store.active, records=autoLessonRecords();
  const ready=COURSE_UNITS.filter(unit=>unit.status==='ready');
  const lessonRecords=Object.keys(records).filter(id=>autoLesson(id)&&id!=='auto-mixed-review');
  const layerNames=['','基础骨架','生活自主','连贯组织','逻辑精度','语言探索'];
  const next=autoRecommendation().lesson;
  const focusLayer=COURSE_UNITS.find(unit=>unit.id===(active&&!autoIsReview(active)?autoLesson(active.lessonId)?.unitId:next?.unitId))?.layer||1;
  const statuses=new Map(AUTO_LESSONS.map(lesson=>[lesson.id,autoLessonStatus(lesson.id)]));
  const canReview=autoReviewAvailable();
  const reviewEntry=`<section class="auto-review-entry"><div><h2>回顾容易卡住的地方</h2><p>${active?'先完成当前这轮，再把学过的知识放在一起练。':canReview?'从已练内容中挑选句子，集中练一轮；复习记录与整课记录分开。':lessonRecords.length?'最近的记录暂时没有需要集中补练的学习点；可以继续路线，或选一课回顾。':'有足够的练习记录后，这里会为你挑选值得回顾的句子。'}</p></div>${canReview&&!active?'<button type="button" class="btn secondary" data-action="auto-review">开始混合复习 →</button>':''}</section>`;
  const layers=[1,2,3,4,5].map(layer=>{
    const units=COURSE_UNITS.filter(unit=>unit.layer===layer);
    const available=units.filter(unit=>unit.status==='ready').length;
    const practiced=units.filter(unit=>unit.lessonIds.some(id=>statuses.get(id)?.practiced)).length;
    return `<details class="auto-catalog-group" ${layer===focusLayer?'open':''}><summary><span><small>L${layer}</small> ${esc(layerNames[layer])}</span><span>${available} / ${units.length} 可学${practiced?` · ${practiced} 练过`:''}</span></summary><ol class="auto-unit-list">${units.map(unit=>{
      const lessons=unit.lessonIds.map(autoLesson).filter(Boolean);
      const first=lessons[0];
      const hasContent=unit.status==='ready'&&!!first;
      const practicedUnit=lessons.length>0&&lessons.every(lesson=>statuses.get(lesson.id)?.practiced);
      const due=lessons.some(lesson=>statuses.get(lesson.id)?.due);
      const current=!!active&&lessons.some(lesson=>lesson.id===active.lessonId);
      const status=current?'正在学习':practicedUnit?'练过':hasContent?'可学习':'待编写';
      const prereqs=unit.prereq.map(id=>COURSE_UNITS.find(item=>item.id===id)?.title).filter(Boolean);
      const action=hasContent?(current?'<button type="button" class="btn secondary" data-action="auto-back">继续 →</button>':active?'<span class="auto-course-action-note">先继续当前课</span>':lessons.map(lesson=>`<button type="button" class="btn secondary" data-action="auto-lesson" data-id="${esc(lesson.id)}" aria-label="${esc((statuses.get(lesson.id)?.practiced?'再次练习：':'开始学习：')+lesson.title)}">${statuses.get(lesson.id)?.practiced?'再练':'开始'} →</button>`).join('')):'';
      return `<li class="auto-course-row ${current?'is-current':''}"><div class="auto-course-copy"><div class="auto-unit-heading"><h3>${esc(unit.title)}</h3><span class="auto-status ${hasContent?'is-ready':''} ${practicedUnit?'is-practiced':''}">${status}</span>${due&&!current?'<span class="auto-status is-due">可回顾</span>':''}</div><p>${esc(unit.objective)}</p><small>${unit.track==='explore'?'可选探索':'意大利语主线'}${prereqs.length?' · 推荐先修：'+esc(prereqs.join('、')):' · 起点单元'}</small></div>${action?`<div class="auto-course-action">${action}</div>`:''}</li>`;
    }).join('')}</ol></details>`;
  }).join('');
  return `${autoTopbar(true)}<section class="auto-catalog-head"><span class="eyebrow">IL PERCORSO · 课程路线</span><h1 id="auto-heading" tabindex="-1">先看清整条路。</h1><p>从基础句子，到表达经历与组织想法。按路线继续，也可以打开一节已开放的小课。</p><div class="auto-catalog-counts"><span><strong>${ready.length} / ${COURSE_UNITS.length}</strong> 单元已开放</span><span><strong>${lessonRecords.length}</strong> 节课有学习记录</span></div><p class="auto-record-note">“练过”表示留下过课程记录，不代表已经熟练掌握。</p>${active?'<button type="button" class="btn primary" data-action="auto-back">继续当前这轮 →</button>':''}</section>${reviewEntry}<h2 class="auto-catalog-label">课程目录</h2><p class="auto-catalog-note">L1–L5 表示内容层次。先修关系用于安排顺序；待编写单元会继续补齐。</p>${layers}`;
}

function autoView(){
  if(ui.autoCatalog)return `<div class="auto-shell auto-catalog">${autoCatalogView()}</div>`;
  const active=autoStore().active;
  let body='';
  if(active){
    const lesson=autoLesson(active.lessonId);
    if(lesson)body=active.phase==='intro'?autoIntroView(active,lesson):autoQuestionView(active,lesson);
  }else{
    const last=autoLastRun();
    if(last)body=autoSummaryView(last);
  }
  if(!body)body=`<section class="card auto-lesson-card"><span class="eyebrow">COMINCIAMO</span><h1 id="auto-heading" tabindex="-1">从一句开始。</h1><p class="auto-goal">Piccola 会先讲一个小规则，再根据你的回答安排下一题。</p><button type="button" class="btn primary auto-wide-button" data-action="auto-open">开始自动学习 →</button></section>`;
  return `<div class="auto-shell">${autoTopbar(false)}${body}</div>`;
}
