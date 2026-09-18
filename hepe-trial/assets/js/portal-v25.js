(function(){
'use strict';

const SUPABASE_URL='https://lztxpjsuzqvtgyasfnyj.supabase.co';
const SUPABASE_KEY='sb_publishable_7bv5GR0-ksXJn91sRHV0Mg_k4nblIGI';
const client=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY,{
  auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:'implicit'}
});
const $=s=>document.querySelector(s);
const $$=s=>Array.from(document.querySelectorAll(s));
let cfg=null,ctx=null,activeTab='tqf3';

function say(msg,kind='info'){
  const el=$('#status'); if(!el)return;
  el.textContent=msg; el.className='status '+(kind==='info'?'':kind);
}
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
function numOrNull(v){return v===''||v==null?null:Number(v);}
function badgeKind(s){
  s=String(s||'').toUpperCase();
  if(['VERIFIED','PUBLIC_PUBLISHED','FINAL','CONTROLLED','APPROVED'].some(x=>s.includes(x)))return 'ok';
  if(['INSUFFICIENT','REQUIRES_ACTION','DRAFT','UNDER_REVIEW','UNVERIFIED'].some(x=>s.includes(x)))return 'warn';
  return 'info';
}
function setBadge(id,text,kind){const el=$(id);if(!el)return;el.textContent=text||'—';el.className='badge '+(kind||badgeKind(text));}
function fmt(v){if(!v)return '—';try{return new Date(v).toLocaleString('th-TH',{dateStyle:'medium',timeStyle:'short'});}catch{return v;}}
function deepClone(v){return JSON.parse(JSON.stringify(v||{}));}
function courseArgs(){return {
  p_programme_code:$('#programme-code').value.trim(),
  p_course_code:$('#course-code').value.trim().toUpperCase(),
  p_academic_year:$('#academic-year').value.trim(),
  p_term_code:$('#term-code').value.trim()
};}
function setTab(name){
  activeTab=name;
  $$('.tab').forEach(x=>x.classList.toggle('active',x.dataset.tab===name));
  $$('.panel').forEach(x=>x.hidden=x.id!=='panel-'+name);
  renderAiForTab();
}
function renderCourse(){
  const c=ctx?.course||{};
  $('#course-summary').textContent=c.course_code?`${c.course_code} · ${c.course_title_th||''} · ${c.academic_year}/${c.term_code}`:'ยังไม่ได้โหลดรายวิชา';
  $('#course-offering-id').textContent=c.course_offering_id||'—';
  setBadge('#offering-status',c.offering_status||'—');
  setBadge('#source-status',c.source_status||'—');
}

/* ---------- TQF3 ---------- */
function getTqf3Form(){
  const content=ctx?.tqf3?.content||{};
  const f=content.form_sections||{};
  const fallbackRubrics=(content.source_supported_content?.rubrics||[]).join('\n');
  return {
    course_description:f.course_description||'',
    objectives:f.objectives||'',
    clos:Array.isArray(f.clos)&&f.clos.length?f.clos:[
      {code:'CLO1',description:'',plo:''},
      {code:'CLO2',description:'',plo:''},
      {code:'CLO3',description:'',plo:''},
      {code:'CLO4',description:'',plo:''}
    ],
    teaching_methods:f.teaching_methods||'',
    learning_schedule:f.learning_schedule||'',
    formative_percent:f.formative_percent??60,
    summative_percent:f.summative_percent??40,
    assessment_details:f.assessment_details||content.source_supported_content?.assessment_structure||'',
    rubrics:f.rubrics||fallbackRubrics,
    learning_resources:f.learning_resources||'',
    improvement_notes:f.improvement_notes||''
  };
}
function cloRowsTqf3(clos){
  return clos.map((x,i)=>`<tr>
    <td><input class="t3-clo-code" data-row="${i}" value="${esc(x.code||'')}"></td>
    <td><textarea class="t3-clo-desc" data-row="${i}" placeholder="เขียนผลลัพธ์การเรียนรู้ที่วัดได้">${esc(x.description||'')}</textarea></td>
    <td><input class="t3-clo-plo" data-row="${i}" value="${esc(x.plo||'')}" placeholder="เช่น PLO2, PLO5"></td>
  </tr>`).join('');
}
function renderTqf3(){
  const d=ctx?.tqf3, f=getTqf3Form();
  setBadge('#tqf3-status',d?.lifecycle_status||'ยังไม่มี');
  $('#tqf3-version').textContent=d?.current_version_no??'—';
  $('#tqf3-meta').textContent=d?`Record ${d.record_id} · Version ${d.current_version_no} · ${d.version_status}`:'ยังไม่มี working draft';
  $('#t3-course-description').value=f.course_description;
  $('#t3-objectives').value=f.objectives;
  $('#t3-clo-body').innerHTML=cloRowsTqf3(f.clos);
  $('#t3-teaching-methods').value=f.teaching_methods;
  $('#t3-learning-schedule').value=f.learning_schedule;
  $('#t3-formative').value=f.formative_percent;
  $('#t3-summative').value=f.summative_percent;
  $('#t3-assessment-details').value=f.assessment_details;
  $('#t3-rubrics').value=f.rubrics;
  $('#t3-resources').value=f.learning_resources;
  $('#t3-improvement').value=f.improvement_notes;
  $('#t3-json').value=JSON.stringify(d?.content||{},null,2);
}
function collectTqf3(){
  const base=deepClone(ctx?.tqf3?.content||{});
  base.course_code=ctx?.course?.course_code||$('#course-code').value.trim().toUpperCase();
  base.form_sections={
    course_description:$('#t3-course-description').value.trim(),
    objectives:$('#t3-objectives').value.trim(),
    clos:$$('.t3-clo-code').map((el,i)=>({
      code:el.value.trim()||`CLO${i+1}`,
      description:$(".t3-clo-desc[data-row='"+i+"']")?.value.trim()||'',
      plo:$(".t3-clo-plo[data-row='"+i+"']")?.value.trim()||''
    })),
    teaching_methods:$('#t3-teaching-methods').value.trim(),
    learning_schedule:$('#t3-learning-schedule').value.trim(),
    formative_percent:Number($('#t3-formative').value||0),
    summative_percent:Number($('#t3-summative').value||0),
    assessment_details:$('#t3-assessment-details').value.trim(),
    rubrics:$('#t3-rubrics').value.trim(),
    learning_resources:$('#t3-resources').value.trim(),
    improvement_notes:$('#t3-improvement').value.trim(),
    ui_source:'HEPE Fast TQF Portal v25'
  };
  return base;
}

/* ---------- TQF5 ---------- */
const grades=['A','B+','B','C+','C','D+','D','F','W/I'];
function gradeRows(payload){
  const map=new Map((payload?.results?.grade_distribution||[]).map(x=>[x.grade,x]));
  return grades.map(g=>{
    const x=map.get(g)||{grade:g,count:0,percent:0};
    return `<tr><td><strong>${esc(g)}</strong></td><td><input class="grade-count" data-grade="${esc(g)}" type="number" min="0" value="${Number(x.count||0)}"></td><td><input class="grade-percent" data-grade="${esc(g)}" type="number" min="0" max="100" step="0.01" value="${Number(x.percent||0)}"></td></tr>`;
  }).join('');
}
function cloRowsTqf5(payload){
  const rows=payload?.results?.clo_attainment||[];
  const data=rows.length?rows:[
    {clo:'CLO1',target_percent:80,attainment_percent:0},
    {clo:'CLO2',target_percent:80,attainment_percent:0},
    {clo:'CLO3',target_percent:80,attainment_percent:0},
    {clo:'CLO4',target_percent:80,attainment_percent:0}
  ];
  return data.map((x,i)=>`<tr>
    <td><input class="clo-code" data-row="${i}" value="${esc(x.clo||'')}"></td>
    <td><input class="clo-target" data-row="${i}" type="number" min="0" max="100" step="0.01" value="${Number(x.target_percent||0)}"></td>
    <td><input class="clo-attain" data-row="${i}" type="number" min="0" max="100" step="0.01" value="${Number(x.attainment_percent||0)}"></td>
  </tr>`).join('');
}
function renderTqf5(){
  const d=ctx?.tqf5;
  const p=deepClone(d?.payload||{});
  p.general_information=p.general_information||{};
  p.evaluation=p.evaluation||{};
  p.results=p.results||{};
  setBadge('#tqf5-status',d?.lifecycle_status||'ยังไม่มี');
  $('#tqf5-snapshot').textContent=d?.snapshot_id||'—';
  $('#registered-students').value=p.general_information.registered_students??'';
  $('#students-at-end').value=p.general_information.students_at_end??'';
  $('#t5-plan-actual').value=p.plan_actual?.summary||'';
  $('#t5-problems').value=(p.issues?.course_problems||[]).join('\n');
  $('#classroom-mean').value=p.evaluation.classroom_mean??'';
  $('#independent-mean').value=p.evaluation.independent_mean??'';
  $('#teaching-mean').value=p.evaluation.teaching_evaluation_mean??'';
  $('#grade-body').innerHTML=gradeRows(p);
  $('#clo-body').innerHTML=cloRowsTqf5(p);
  $('#improvement-plan').value=(p.improvement_plan||[]).map(x=>`${x.action||''} | ${x.target_term||''}`).join('\n');
  $('#t5-json').value=JSON.stringify(p,null,2);
}
function collectTqf5(){
  const base=deepClone(ctx?.tqf5?.payload||{});
  base.general_information=base.general_information||{};
  base.general_information.course_code=ctx?.course?.course_code||$('#course-code').value.trim().toUpperCase();
  base.general_information.academic_year=ctx?.course?.academic_year||$('#academic-year').value.trim();
  base.general_information.term_code=ctx?.course?.term_code||$('#term-code').value.trim();
  base.general_information.registered_students=numOrNull($('#registered-students').value);
  base.general_information.students_at_end=numOrNull($('#students-at-end').value);

  base.plan_actual=base.plan_actual||{};
  base.plan_actual.summary=$('#t5-plan-actual').value.trim();
  base.plan_actual.source_status='WORKING_SOURCE';

  base.results=base.results||{};
  base.results.grade_distribution=$$('.grade-count').map(el=>{
    const grade=el.dataset.grade;
    const p=$(".grade-percent[data-grade='"+CSS.escape(grade)+"']");
    return {grade,count:Number(el.value||0),percent:Number(p?.value||0)};
  });
  base.results.clo_attainment=$$('.clo-code').map((el,i)=>({
    clo:el.value.trim()||`CLO${i+1}`,
    target_percent:Number($(".clo-target[data-row='"+i+"']")?.value||0),
    attainment_percent:Number($(".clo-attain[data-row='"+i+"']")?.value||0)
  }));

  base.evaluation=base.evaluation||{};
  base.evaluation.classroom_mean=numOrNull($('#classroom-mean').value);
  base.evaluation.independent_mean=numOrNull($('#independent-mean').value);
  base.evaluation.teaching_evaluation_mean=numOrNull($('#teaching-mean').value);
  base.evaluation.source_status='UNVERIFIED_WORKING_SOURCE';

  base.issues=base.issues||{};
  base.issues.course_problems=$('#t5-problems').value.split('\n').map(x=>x.trim()).filter(Boolean);
  base.improvement_plan=$('#improvement-plan').value.split('\n').map(x=>x.trim()).filter(Boolean).map(line=>{
    const [action,...rest]=line.split('|');
    return {action:action.trim(),target_term:rest.join('|').trim()||null};
  });
  return base;
}

/* ---------- Verification ---------- */
const checks=[
  ['committee_order','คำสั่ง/หลักฐานแต่งตั้งคณะกรรมการ'],
  ['minutes','รายงานประชุม/บันทึกการทวนสอบ'],
  ['attendance','รายชื่อผู้เข้าร่วม'],
  ['sampling','รายการและวิธีสุ่มชิ้นงาน'],
  ['artifacts','ตัวอย่างข้อสอบ/ชิ้นงานนักศึกษา'],
  ['rescoring','หลักฐานตรวจซ้ำ/ให้คะแนนซ้ำ'],
  ['reviewer_compare','ผลเปรียบเทียบผู้ตรวจ'],
  ['signed_decision','ข้อสรุป/มติที่ลงนามหรือมี controlled approval']
];
function renderVerification(){
  const v=ctx?.verification;
  setBadge('#verification-status',v?.status||'ยังไม่มี');
  $('#verification-id').textContent=v?.verification_record_id||'—';
  $('#verification-updated').textContent=fmt(v?.updated_at);
  $('#verification-note').value=v?.finding_summary||'';
  $('#verification-checklist').innerHTML=checks.map(([id,label])=>`<label class="check-item"><input type="checkbox" class="vcheck" data-id="${id}"><span><strong>${esc(label)}</strong><br><span class="help">ติ๊กเฉพาะเมื่อมีหลักฐานจริงและตรวจแล้ว</span></span></label>`).join('');
  const actions=$('#verification-actions'); actions.innerHTML='';
  if(!v){
    actions.innerHTML='<button class="btn primary" id="create-verification">สร้างรายการทวนสอบ</button>';
    $('#create-verification').onclick=createVerification; return;
  }
  if(v.status==='DRAFT'){
    actions.innerHTML='<button class="btn primary" data-state="IN_REVIEW">เริ่มทวนสอบ</button>';
  }else if(v.status==='IN_REVIEW'){
    actions.innerHTML='<button class="btn" data-state="REQUIRES_ACTION">ส่งกลับแก้ไข</button><button class="btn accent" data-state="INSUFFICIENT_EVIDENCE">หลักฐานไม่เพียงพอ</button><button class="btn" disabled>VERIFIED เมื่อ evidence gate ผ่าน</button>';
  }else if(v.status==='REQUIRES_ACTION'||v.status==='INSUFFICIENT_EVIDENCE'){
    actions.innerHTML='<button class="btn primary" data-state="IN_REVIEW">เปิดทวนสอบอีกครั้ง</button><button class="btn" disabled>VERIFIED เมื่อ evidence gate ผ่าน</button>';
  }
  actions.querySelectorAll('[data-state]').forEach(b=>b.onclick=()=>transitionVerification(b.dataset.state));
}
function composeVerificationNote(){
  const checked=$$('.vcheck').filter(x=>x.checked).map(x=>checks.find(c=>c[0]===x.dataset.id)?.[1]).filter(Boolean);
  const missing=$$('.vcheck').filter(x=>!x.checked).map(x=>checks.find(c=>c[0]===x.dataset.id)?.[1]).filter(Boolean);
  const note=$('#verification-note').value.trim();
  return [
    note,
    '',
    '[Fast Portal Evidence Checklist]',
    'มีหลักฐานแล้ว: '+(checked.length?checked.join('; '):'ยังไม่มีรายการที่ยืนยัน'),
    'ยังขาด: '+(missing.length?missing.join('; '):'ไม่พบรายการที่ขาดจาก checklist')
  ].join('\n').trim();
}

/* ---------- Smart/AI analysis ---------- */
function analyzeTqf3(){
  const d=collectTqf3().form_sections, issues=[], good=[];
  const required=[
    ['คำอธิบายรายวิชา',d.course_description],
    ['วัตถุประสงค์',d.objectives],
    ['วิธีจัดการเรียนรู้',d.teaching_methods],
    ['แผน/ตารางการเรียนรู้',d.learning_schedule],
    ['รายละเอียดการประเมิน',d.assessment_details],
    ['เกณฑ์/Rubric',d.rubrics]
  ];
  required.forEach(([n,v])=>(v?good:issues).push((v?'✓ ':'• ')+n+(v?' มีข้อมูล':' ยังว่าง')));
  const validClos=d.clos.filter(x=>x.description);
  if(validClos.length>=3)good.push(`✓ CLO มีข้อมูล ${validClos.length} ข้อ`); else issues.push('• CLO ควรมีอย่างน้อย 3 ข้อที่เขียนเป็นพฤติกรรมวัดได้');
  if(validClos.some(x=>!x.plo))issues.push('• CLO บางข้อยังไม่ระบุ PLO ที่เชื่อมโยง');
  const total=Number(d.formative_percent||0)+Number(d.summative_percent||0);
  if(total===100)good.push('✓ สัดส่วนการประเมินรวม 100%'); else issues.push(`• สัดส่วนการประเมินรวม ${total}% ควรเป็น 100%`);
  const score=Math.max(0,Math.min(100,Math.round((good.length/(good.length+issues.length||1))*100)));
  return {score,good,issues};
}
function analyzeTqf5(){
  const p=collectTqf5(),issues=[],good=[];
  const reg=p.general_information.registered_students,end=p.general_information.students_at_end;
  if(reg!=null&&end!=null){good.push('✓ มีจำนวนนักศึกษา');if(end>reg)issues.push('• จำนวนนักศึกษาปลายภาคมากกว่าจำนวนลงทะเบียน');}
  else issues.push('• กรอกจำนวนนักศึกษาลงทะเบียนและปลายภาค');
  const gradePct=(p.results.grade_distribution||[]).reduce((s,x)=>s+Number(x.percent||0),0);
  if(Math.abs(gradePct-100)<=0.5)good.push('✓ ร้อยละเกรดรวมประมาณ 100%'); else issues.push(`• ร้อยละเกรดรวม ${gradePct.toFixed(2)}% ควรตรวจสอบ`);
  const clos=p.results.clo_attainment||[];
  if(clos.length&&clos.some(x=>x.attainment_percent>0))good.push('✓ มีผล CLO attainment'); else issues.push('• ยังไม่มีผล CLO attainment');
  if(p.plan_actual?.summary)good.push('✓ มีสรุปแผนเทียบผลจริง'); else issues.push('• ควรอธิบายสิ่งที่ดำเนินการจริงแตกต่างจากแผนหรือไม่');
  if((p.issues?.course_problems||[]).length)good.push('✓ มีปัญหา/อุปสรรค'); else issues.push('• ควรบันทึกปัญหา/อุปสรรคหรือระบุว่าไม่พบ');
  if((p.improvement_plan||[]).length)good.push('✓ มีแผนปรับปรุง'); else issues.push('• ควรมีแผนปรับปรุงรอบถัดไป');
  const score=Math.max(0,Math.min(100,Math.round((good.length/(good.length+issues.length||1))*100)));
  return {score,good,issues};
}
function analyzeVerification(){
  const checked=$$('.vcheck').filter(x=>x.checked).length, total=checks.length;
  const issues=[],good=[];
  if(checked)good.push(`✓ ยืนยันหลักฐานแล้ว ${checked}/${total} รายการ`);
  if(checked<total)issues.push(`• ยังขาดหลักฐาน ${total-checked} รายการตาม checklist`);
  if($('#verification-note').value.trim().length>40)good.push('✓ มีข้อค้นพบ/ข้อสรุป'); else issues.push('• ควรเขียนข้อค้นพบและเหตุผลให้ชัดเจน');
  if(ctx?.verification?.status==='VERIFIED')good.push('✓ สถานะ VERIFIED'); else issues.push('• สถานะยังไม่ VERIFIED ซึ่งถูกต้องหากหลักฐานยังไม่ครบ');
  return {score:Math.round((checked/total)*80+(($('#verification-note').value.trim().length>40)?20:0)),good,issues};
}
function runAnalysis(){
  let a=activeTab==='tqf3'?analyzeTqf3():activeTab==='tqf5'?analyzeTqf5():activeTab==='verification'?analyzeVerification():{score:0,good:[],issues:['เลือกแท็บ มคอ.3 / มคอ.5 / ทวนสอบก่อน']};
  $('#ai-score').textContent=a.score+'%';
  $('#ai-output').textContent=[
    'สิ่งที่พร้อม',
    ...(a.good.length?a.good:['• ยังไม่มีรายการที่ผ่าน']),
    '',
    'ประเด็นที่ควรแก้ก่อนส่ง',
    ...(a.issues.length?a.issues:['✓ ไม่พบช่องว่างสำคัญจากการตรวจเบื้องต้น']),
    '',
    'หมายเหตุ: นี่เป็น Smart QA ใน browser ไม่ใช่การยืนยันเชิงวิชาการหรือหลักฐานแทนผู้รับผิดชอบ'
  ].join('\n');
}
function currentPrompt(){
  const c=ctx?.course||{};
  let payload,title;
  if(activeTab==='tqf3'){title='มคอ.3';payload=collectTqf3().form_sections;}
  else if(activeTab==='tqf5'){title='มคอ.5';payload=collectTqf5();}
  else if(activeTab==='verification'){
    title='ทวนสอบ';payload={status:ctx?.verification?.status,note:$('#verification-note').value,checked_evidence:$$('.vcheck').filter(x=>x.checked).map(x=>checks.find(c=>c[0]===x.dataset.id)?.[1])};
  }else{title='ภาพรวม';payload={course:c};}
  return `คุณเป็นผู้ช่วยวิเคราะห์เอกสาร มคอ. ของหลักสูตรศึกษาศาสตรบัณฑิต สาขาสุขศึกษาและพลศึกษา
โปรดวิเคราะห์ ${title} ของรายวิชา ${c.course_code||''} ${c.course_title_th||''} ปีการศึกษา ${c.academic_year||''} ภาค ${c.term_code||''}

ข้อกำหนด:
1) ห้ามแต่งข้อมูลที่ไม่มี
2) แยก "ข้อมูลที่มี" / "ข้อมูลที่ขาด" / "ข้อเสนอแก้ไข"
3) ตรวจความสอดคล้องของ CLO-PLO-กิจกรรม-การประเมิน
4) ช่วยปรับถ้อยคำภาษาไทยเชิงวิชาการให้กระชับ
5) ถ้าเป็น มคอ.5 ให้ตรวจผลจริง ปัญหา และ CQI
6) ถ้าเป็นทวนสอบ ให้ยึดหลัก Evidence-First และห้ามสรุป VERIFIED หากหลักฐานไม่ครบ
7) เสนอข้อความที่สามารถนำกลับไปวางในแบบฟอร์มได้

ข้อมูลปัจจุบัน:
${JSON.stringify(payload,null,2)}`;
}
async function sendToChatGPT(){
  const prompt=currentPrompt();
  try{await navigator.clipboard.writeText(prompt);say('คัดลอกข้อมูลสำหรับ AI แล้ว กำลังเปิด ChatGPT — วางด้วย Ctrl+V','ok');}
  catch{say('ไม่สามารถคัดลอกอัตโนมัติ กรุณาใช้ปุ่มดู Prompt แล้วคัดลอกเอง','warn');$('#ai-prompt').value=prompt;}
  $('#ai-prompt').value=prompt;
  window.open('https://chatgpt.com/','_blank','noopener');
}
function renderAiForTab(){
  const labels={tqf3:'มคอ.3',tqf5:'มคอ.5',verification:'ทวนสอบ',overview:'ภาพรวม'};
  $('#ai-context').textContent=labels[activeTab]||activeTab;
  $('#ai-output').textContent='กด “วิเคราะห์ความครบถ้วน” เพื่อเริ่มตรวจเอกสาร';
  $('#ai-score').textContent='—';
}

/* ---------- IO ---------- */
async function loadCourse(){
  say('กำลังโหลดข้อมูลรายวิชา…');
  const {data,error}=await client.rpc('hepe_fast_tqf_portal_context_by_code',courseArgs());
  if(error)throw error;
  ctx=data; renderAll(); say('โหลดข้อมูลแล้ว พร้อมกรอกแบบฟอร์ม','ok');
}
function renderAll(){renderCourse();renderTqf3();renderTqf5();renderVerification();renderAiForTab();}
async function saveTqf3(){
  const content=collectTqf3();
  say('กำลังบันทึก มคอ.3 Working Draft…');
  const {data,error}=await client.rpc('hepe_save_tqf3_working_version_by_code',{...courseArgs(),p_content:content,p_source_status:'LATEST_WORKING_CONFIRMED'});
  if(error)throw error;
  say(`บันทึก มคอ.3 สำเร็จ — Version ${data.version_no}`,'ok');await loadCourse();
}
async function saveTqf5(){
  const payload=collectTqf5();
  say('กำลังบันทึก มคอ.5 Draft…');
  const {data,error}=await client.rpc('hepe_create_tqf5_working_draft_by_code',{...courseArgs(),p_payload:payload,p_source_reference:'Fast TQF Portal v25 / structured form / NON-PRODUCTION'});
  if(error)throw error;
  say(`บันทึก มคอ.5 สำเร็จ — Snapshot ${data.result_snapshot_id}`,'ok');await loadCourse();
}
async function createVerification(){
  say('กำลังสร้างรายการทวนสอบ…');
  const {data,error}=await client.rpc('hepe_ensure_verification_draft_by_code',courseArgs());
  if(error)throw error;
  say(data.created?'สร้างรายการทวนสอบแล้ว':'มีรายการทวนสอบอยู่แล้ว','ok');await loadCourse();
}
async function saveVerificationNote(){
  if(!ctx?.verification?.verification_record_id)return createVerification();
  say('กำลังบันทึกข้อความทวนสอบ…');
  const {error}=await client.rpc('hepe_save_verification_note',{p_verification_record_id:ctx.verification.verification_record_id,p_finding_summary:composeVerificationNote()});
  if(error)throw error;
  say('บันทึกข้อความทวนสอบแล้ว','ok');await loadCourse();
}
async function transitionVerification(newStatus){
  if(!ctx?.verification?.verification_record_id)throw new Error('ยังไม่มีรายการทวนสอบ');
  const {error}=await client.rpc('hepe_review_course_verification',{p_verification_record_id:ctx.verification.verification_record_id,p_new_status:newStatus,p_finding_summary:composeVerificationNote()});
  if(error)throw error;
  say(`สถานะทวนสอบเปลี่ยนเป็น ${newStatus}`,'ok');await loadCourse();
}

/* ---------- Auth ---------- */
async function loginMagic(e){
  e.preventDefault();const email=$('#login-email').value.trim();say('กำลังส่ง Magic Link…');
  const {error}=await client.auth.signInWithOtp({email,options:{shouldCreateUser:false,emailRedirectTo:'https://kasemch.github.io/hepe-trial/'}});
  if(error)throw error;say('ส่ง Magic Link แล้ว กรุณาเปิดอีเมลฉบับล่าสุด','ok');
}
async function loginPassword(){
  const email=$('#login-email').value.trim(),password=$('#login-password').value;
  if(!email||!password)throw new Error('กรุณากรอกอีเมลและรหัสผ่าน');
  const {error}=await client.auth.signInWithPassword({email,password});if(error)throw error;
}
async function logout(){await client.auth.signOut();location.reload();}
async function boot(){
  cfg=await fetch('./config/state.json?v=25',{cache:'no-store'}).then(r=>r.json()).catch(()=>({}));
  $('#programme-code').value=cfg.programme_code||'25510071103503';
  $('#course-code').value=cfg.course_code||'HED2503';
  $('#academic-year').value=cfg.academic_year||'2569';
  $('#term-code').value=cfg.term_code||'1';
  const {data:{session}}=await client.auth.getSession();
  $('#login-view').hidden=!!session;$('#app-view').hidden=!session;
  if(!session){say('กรุณา Login เพื่อกรอก มคอ.3 / มคอ.5 / ทวนสอบ','warn');return;}
  $('#identity').textContent=session.user.email||'Authenticated';
  await loadCourse();
}

/* ---------- Events ---------- */
$$('.tab').forEach(b=>b.onclick=()=>setTab(b.dataset.tab));
$('#load-course').onclick=()=>loadCourse().catch(e=>say(e.message,'danger'));
$('#save-tqf3').onclick=()=>saveTqf3().catch(e=>say(e.message,'danger'));
$('#save-tqf5').onclick=()=>saveTqf5().catch(e=>say(e.message,'danger'));
$('#save-verification-note').onclick=()=>saveVerificationNote().catch(e=>say(e.message,'danger'));
$('#logout').onclick=()=>logout().catch(e=>say(e.message,'danger'));
$('#login-form').addEventListener('submit',e=>loginMagic(e).catch(x=>say(x.message,'danger')));
$('#password-login').onclick=()=>loginPassword().catch(x=>say(x.message,'danger'));
$('#ai-analyze').onclick=runAnalysis;
$('#ai-chatgpt').onclick=()=>sendToChatGPT().catch(e=>say(e.message,'danger'));
$('#ai-show-prompt').onclick=()=>{$('#ai-prompt-wrap').hidden=!$('#ai-prompt-wrap').hidden;$('#ai-prompt').value=currentPrompt();};
$('#print-form').onclick=()=>window.print();

client.auth.onAuthStateChange((event,session)=>{if(event==='SIGNED_IN'&&session)setTimeout(()=>boot().catch(e=>say(e.message,'danger')),0);});
boot().catch(e=>say(e.message||String(e),'danger'));
})();