/* Piccola Italiano v0.14 · one-step automatic lesson views. */
'use strict';

function autoHomePanel(){
  const store=autoStore(), active=store.active, recommendation=autoRecommendation();
  const lesson=active?autoLesson(active.lessonId):recommendation.lesson;
  const count=active?Math.min(AUTO_TURN_LIMIT,active.answers.length+(active.phase==='feedback'?0:1)):0;
  const resume=active&&active.phase!=='intro';
  return `<section class="auto-home" aria-labelledby="auto-home-title">
    <span class="eyebrow">BENVENUTO, PIETRO · UN PASSO ALLA VOLTA</span>
    <h1 id="auto-home-title">今天，跟着 Piccola 学。</h1>
    <p class="auto-home-intro">一次一句。遇到卡住的地方，我们就换个例子再来。</p>
    <div class="auto-home-lesson"><span>${resume?'接着上次继续':'接下来学'}</span><strong>${esc(lesson?.title||'直接宾语代词 lo / la / li / le')}</strong><p>${esc(resume?`上次停在第 ${Math.max(1,count)} 题，已经保存的回答会保留。`:recommendation.reason||'先看一个例子，再一步步自己用出来。')}</p></div>
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

function autoIntroView(session,lesson){
  return `<section class="card auto-lesson-card"><span class="eyebrow">PICCOLA TI ACCOMPAGNA · 小课 ${esc(lesson.order)} / ${AUTO_LESSONS.length}</span>
    <h1 id="auto-heading" tabindex="-1">${esc(lesson.title)}</h1><p class="auto-goal">${esc(lesson.goal)}</p>
    <div class="auto-explanation">${lesson.explanation.map(line=>`<p>${esc(line)}</p>`).join('')}</div>
    ${lesson.order===1?autoPronounTable():''}
    <div class="auto-example"><span>先看一句</span><p lang="it">${esc(lesson.example.it)}</p><small>${esc(lesson.example.zh)}</small></div>
    <div class="auto-primary-row"><button type="button" class="btn primary auto-wide-button" data-action="auto-begin">懂了，试一题 →</button></div>
    <p class="auto-fineprint">不必一次答对。需要时可以看提示，或先跳过。</p>
  </section>`;
}

function autoQuestionView(session,lesson){
  const question=autoCurrent(session);
  if(!question)return `<section class="card auto-lesson-card"><h1 id="auto-heading" tabindex="-1">这道题暂时无法显示</h1><p class="auto-goal">先回首页保留进度，再重新进入课程。</p><button type="button" class="btn primary" data-action="auto-pause">回首页</button></section>`;
  const feedback=session.phase==='feedback';
  const answered=session.answers.length;
  const index=Math.min(AUTO_TURN_LIMIT,answered+(feedback?0:1));
  const last=feedback?session.answers[answered-1]:null;
  const taskName=question.type==='choice'?'选一选':question.level===3?'写出一句话':'补上代词';
  const progress=Math.min(100,answered/AUTO_TURN_LIMIT*100);
  let interaction='';
  if(feedback&&last){
    const title=last.skipped?'先看懂这句':last.correct?(last.hinted?'借助提示答对了':'对，就是这样。'):'看一眼，再换一句试试。';
    interaction=`<section class="auto-feedback ${last.correct?'is-correct':'is-repair'}" aria-labelledby="auto-feedback-title"><h2 id="auto-feedback-title">${esc(title)}</h2>${last.skipped?'':`<p class="auto-your-answer">你的回答：<span lang="it">${esc(last.answer)}</span></p>`}<p class="auto-correct-answer" lang="it">${esc(question.answerLabel)}</p><p>${esc(question.explanation)}</p>${last.hinted?'<small>这题记作辅助练习，之后再试一次不看提示。</small>':''}</section>
      <div class="auto-primary-row"><button type="button" class="btn primary auto-wide-button" data-action="auto-next" data-id="${esc(question.id)}">${answered>=AUTO_TURN_LIMIT?'看看这一轮 →':'下一题 →'}</button></div>`;
  }else{
    const hint=session.hintShown?`<div class="auto-hint" role="note"><strong>一点提示</strong><p>${esc(question.hint)}</p><small>这一题会记作辅助练习。</small></div>`:'';
    const scaffold=session.scaffold?`<div class="auto-scaffold"><strong>先借一句例子</strong><p lang="it">${esc(lesson.example.it)}</p><small>${esc(lesson.example.zh)}</small></div>`:'';
    const answers=question.type==='choice'?`<div class="auto-choices" role="group" aria-label="选择答案">${question.choices.map((choice,i)=>`<button type="button" class="auto-choice" data-action="auto-choice" data-id="${esc(question.id)}" data-choice="${i}"><span class="auto-choice-letter" aria-hidden="true">${'ABCD'[i]||i+1}</span><span lang="it">${esc(choice)}</span></button>`).join('')}</div>`:`<form id="auto-answer-form" data-id="${esc(question.id)}" class="auto-answer-form"><label for="auto-answer">${question.level===3?'写出完整句子':'写出空缺的代词'}</label><input id="auto-answer" name="answer" value="${esc(session.draft||'')}" type="text" lang="it" maxlength="200" placeholder="${question.level===3?'Scrivi la frase…':'lo, la, li o le…'}" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" enterkeyhint="done" aria-describedby="auto-answer-help" /><p id="auto-answer-help" class="auto-input-help">${question.level===3?'按题目要求改写，保留原来的意思。':'只填一个代词，不用重写整句。'}</p><button type="submit" class="btn primary auto-wide-button">确认答案 →</button></form>`;
    interaction=`${scaffold}${hint}${answers}<div class="auto-help-actions">${session.hintShown?'':`<button type="button" class="auto-text-button" data-action="auto-hint" data-id="${esc(question.id)}">给我一点提示</button>`}<button type="button" class="auto-text-button" data-action="auto-skip" data-id="${esc(question.id)}">先跳过</button></div>`;
  }
  return `<section class="card auto-lesson-card"><div class="auto-question-meta"><span>${esc(lesson.title)}</span><span>第 ${index} / ${AUTO_TURN_LIMIT} 题</span></div><div class="auto-progress" role="progressbar" aria-label="本轮进度" aria-valuemin="0" aria-valuemax="${AUTO_TURN_LIMIT}" aria-valuenow="${answered}"><span style="width:${progress}%"></span></div><span class="eyebrow">${esc(taskName)}</span><h1 id="auto-heading" tabindex="-1" class="auto-question-text">${esc(question.prompt)}</h1>${interaction}</section>`;
}

function autoSummaryView(run){
  const lesson=autoLesson(run.lessonId), stats=autoStats(run), next=autoRecommendation();
  const nonSkipped=run.answers.filter(answer=>!answer.skipped).length;
  const message=nonSkipped===0?'这次先看了例子。下次我们从一题开始。':stats.unaided===0?'你已经试过这一组句子。接下来多给一点支撑，再把它用出来。':`这一轮有 ${stats.unaided} 题，是你不看提示自己答对的。`;
  const details=`${stats.controlled} 道填空或改写独立答对 · ${stats.helped} 题用了提示 · ${stats.skipped} 题跳过`;
  return `<section class="card auto-lesson-card auto-summary"><span class="auto-summary-mark" aria-hidden="true">✓</span><span class="eyebrow">UN PASSO IN PIÙ</span><h1 id="auto-heading" tabindex="-1">这一轮先到这里。</h1><p class="auto-goal">${esc(lesson?.title||'自动学习')}</p><p class="auto-summary-message">${esc(message)}</p><p class="auto-summary-detail">${esc(details)}</p><div class="auto-next-up"><span>接下来</span><h2>${esc(next.lesson?.title||'再巩固一轮')}</h2><p>${esc(next.reason||'换一些句子，继续巩固。')}</p></div><div class="auto-primary-row"><button type="button" class="btn primary auto-wide-button" data-action="auto-continue">继续学习 →</button></div><button type="button" class="auto-text-button auto-finish-button" data-action="auto-pause">今天先到这里</button><p class="auto-fineprint">这是本轮文字练习的记录；听力和口语还没有测量。</p></section>`;
}

function autoCatalogView(){
  const active=autoStore().active;
  const ready=COURSE_UNITS.filter(unit=>unit.status==='ready');
  const layerNames=['','基础骨架','生活自主','连贯组织','逻辑精度','语言探索'];
  const readyCards=ready.map(unit=>{
    const lesson=autoLesson(unit.lessonIds[0]);
    if(!lesson)return '';
    return `<article class="auto-ready-card"><span class="auto-status is-ready">现在可学</span><h2>${esc(lesson.title)}</h2><p>${esc(lesson.goal)}</p>${active?`<span class="auto-ready-paused">${active.lessonId===lesson.id?'正在学习这节课':'先继续当前课程'}</span>`:`<button type="button" class="btn secondary" data-action="auto-lesson" data-id="${esc(lesson.id)}">学这一课 →</button>`}</article>`;
  }).join('');
  const layers=[1,2,3,4,5].map(layer=>{
    const units=COURSE_UNITS.filter(unit=>unit.layer===layer);
    return `<details class="auto-catalog-group"><summary><span><small>L${layer}</small> ${esc(layerNames[layer])}</span><span>${units.length} 个单元</span></summary><ol class="auto-unit-list">${units.map(unit=>{
      const prereqs=unit.prereq.map(id=>COURSE_UNITS.find(item=>item.id===id)?.title).filter(Boolean);
      return `<li><div class="auto-unit-heading"><h3>${esc(unit.title)}</h3><span class="auto-status ${unit.status==='ready'?'is-ready':''}">${unit.status==='ready'?'现在可学':'待编写'}</span></div><p>${esc(unit.objective)}</p><small>${unit.track==='explore'?'可选探索':'意大利语主线'}${prereqs.length?' · 先修：'+esc(prereqs.join('、')):' · 起点单元'}</small></li>`;
    }).join('')}</ol></details>`;
  }).join('');
  return `${autoTopbar(true)}<section class="auto-catalog-head"><span class="eyebrow">IL PERCORSO · 课程路线</span><h1 id="auto-heading" tabindex="-1">先看清整条路。</h1><p>${COURSE_UNITS.length} 个课程单元已经排好结构；目前 ${ready.length} 个单元有可用自动课。其余单元会按这条路线逐批补齐。</p>${active?'<button type="button" class="btn primary" data-action="auto-back">先继续当前课程 →</button>':''}</section><div class="auto-ready-grid">${readyCards}</div><h2 class="auto-catalog-label">完整目录</h2><p class="auto-catalog-note">先修关系帮助安排顺序；可以直接体验已开放的小课。L1–L5 表示内容层次。</p>${layers}`;
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
