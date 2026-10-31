# Piccola · 内容作者契约

纯课程内容任务从这里开始，再读分配到的 COURSE_BLUEPRINT 单元与一节现有示例。无需通读 app.js、历史版本或旧活动。课程作者只修改分配的 `course-*.js` 内容文件；教学行为、状态与界面由独立任务处理。

## 固定输入与输出

每个单元沿用 `COURSE_UNITS` 的稳定 ID、先修、知识图引用和目标。微课 ID 为 `auto-` 加去掉 `it-` 的单元 ID，已发布的 ID 不改名或复用成别的题。初始一课 12 题：4 个具名学习点 × 3 个题目档位。可以继续扩大题池，但保留每个学习点在各档位的覆盖。

| 对象 | 必需字段与规则 |
| --- | --- |
| lesson | `id, unitId, title, goal, explanation[], example:{it,zh}, order, focusLabels`；order 沿目录顺序，focusLabels 恰好四个具名学习点 |
| question | `id, lessonId, level, type, prompt, answers[], answerLabel, explanation, hint, focus, evidence` |
| choice | 2–5 个有区别的选项；规范化后恰好一个正确选项；`evidence:'recognition'` |
| text | 明确指定填词、词序或改写规则；允许所有符合要求的合理答案；`evidence:'controlled_production'` |
| 展示字段 | 文本题写清 `taskLabel, inputLabel, placeholder`；缺省时界面提供通用提示 |
| 朗读字段 | `speech` 是完成后的纯意大利语句子或词组，不含中文、空格题下划线、箭头或说明；示例和答后才出现朗读 |

`focus` 使用 ASCII 字母、数字、连字符或下划线，例如 `recipient`、`to_him`。同一课各题使用完全一致的四个 key。混合复习用 lessonId + focus 区分不同课中同名学习点。不要把正确答案通过作答前的学习点标签泄露给用户。

## 判分约定

- `answers` 是用户应填的内容；`answerLabel` 是反馈中展示的完整表达。填一个词的题，答案表只放那个词。
- 原创题目先确定目标和合理答案，再写题干。对于多个合理词序、同义词或情态代词位置，明确约束或列入可接受答案。
- 当前规范化忽略大小写、多余空白、句末 `.?!`、非数字逗号，并统一直/弯撇号；保留词序、词语和重音。`è/e`、`sì/si`、是否有 `non` 仍不同。
- 每个保存答案最多 200 字符。超长段落不使用当前单行输入题型。
- 不要求“自由描述一段经历”却只接受一个样板句。开放任务需要另外定义评价方式；受限改写不证明自由表达能力。
- level 1–3 表示本课练习支撑的变化，不是 CEFR，也不是学习者能力等级。
- hints 可以给方向，但不要只是把该题答案原样重发；例句与自动支撑会计为辅助证据。

## 内容文件结构

沿用现有文件的块作用域和小型构造器，最终生成标准对象。数据层只做三件事：

```js
AUTO_LESSONS.push(...lessons);
AUTO_QUESTIONS.push(...questions);
for (const lesson of lessons) {
  const unit = COURSE_UNITS.find(unit => unit.id === lesson.unitId);
  unit.status = 'ready';
  unit.lessonIds = [lesson.id];
}
```

只操作分配的单元，所有对应题目齐备后才标 ready。不要接触 `state`、DOM、网络、存储或导航。现有内容文件内扩课不需增加脚本标签；新内容文件才由集成者更新 index.html 和 sw.js 资源表。

## 检查与交付

运行 `node scripts/check.cjs content`，检查语法、ID、引用、先修无环、题型、答案、档位覆盖和朗读文本。命令只装载内容及校验函数，不启动应用或访问学习数据。

再做一次语言审校：意大利语是否自然正确、中文是否忠实、指定答案是否符合题干、是否漏掉合理变体、干扰项是否有另一正确答案。自动检查不能代替语法和语义判断；有疑问时核对可靠的语法来源。

交付只说明新增单元、课/题数量、语言疑点和检查结果。不要顺手改界面、存储或增加新玩法。对现有任务类型的纯内容增补，无需人工重查所有旧模块；若发现引擎确有不足，明确提成独立修改。
