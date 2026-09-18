(function(){
'use strict';

const SUPABASE_URL='https://lztxpjsuzqvtgyasfnyj.supabase.co';
const SUPABASE_KEY='sb_publishable_7bv5GR0-ksXJn91sRHV0Mg_k4nblIGI';
const client=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY,{
  auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:'implicit'}
});

const $=s=>document.querySelector(s);
const $$=s=>Array.from(document.querySelectorAll(s));
const clone=v=>JSON.parse(JSON.stringify(v??{}));
const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const num=v=>v===''||v==null?null:Number(v);

let cfg={},programmeCatalog=[],courseCatalog=[],termCatalog=[],curriculumCtx=null,docCtx=null;
let activeTab='tqf3',activeAiSection='curriculum',aiSuggestions=[],aiDecisions=[];

function say(msg,kind='info'){
  const el=$('#status'); if(!el)return;
  el.textContent=msg; el.className='status '+(kind==='info'?'':kind);
}
function setBadge(elOrSel,text,kind='info'){
  const el=typeof elOrSel==='string'?$(elOrSel):elOrSel;if(!el)return;
  el.textContent=text||'—';el.className='badge '+kind;
}
function kind(s){
  s=String(s||'').toUpperCase();
  if(/VERIFIED|CONTROLLED|ACTIVE|PUBLIC_PUBLISHED|APPROVED/.test(s))return'ok';
  if(/DRAFT|WORKING|UNDER_REVIEW|UNVERIFIED|CANDIDATE|SOURCE_OBSERVED/.test(s))return'warn';
  if(/INSUFFICIENT|CONFLICT|REJECTED|BLOCK/.test(s))return'danger';
  return'info';
}
function courseArgs(){
  return{
    p_programme_code:$('#programme-select').value,
    p_course_code:$('#course-select').value,
    p_academic_year:$('#year-select').value,
    p_term_code:$('#term-select').value
  };
}
function option(value,label,selected=false){return '<option value="'+esc(value)+'"'+(selected?' selected':'')+'>'+esc(label)+'</option>';}

function setTab(name){
  activeTab=name;
  $$('.tab').forEach(x=>x.classList.toggle('active',x.dataset.tab===name));
  $$('.panel').forEach(x=>x.hidden=x.id!=='panel-'+name);
  activeAiSection=name==='tqf3'?'curriculum':name;
  renderAiRail();
  if(name==='overview')renderReadiness();
}

async function loadInitialCatalogs(){
  say('กำลังโหลดหลักสูตรและภาคการศึกษา…');
  const [p,t]=await Promise.all([
    client.rpc('hepe_fast_tqf_programme_catalog'),
    client.rpc('hepe_fast_tqf_term_catalog')
  ]);
  if(p.error)throw p.error;if(t.error)throw t.error;
  programmeCatalog=Array.isArray(p.data)?p.data:[];
  termCatalog=Array.isArray(t.data)?t.data:[];
  renderProgrammeOptions();
  renderYearOptions();
  await loadCourses();
}

function renderProgrammeOptions(){
  const sel=$('#programme-select');
  const preferred=cfg.programme_code||programmeCatalog[0]?.programme_code||'';
  sel.innerHTML=programmeCatalog.map(p=>option(
    p.programme_code,
    p.title_th+(p.curriculum_version_label?' — '+p.curriculum_version_label:''),
    p.programme_code===preferred
  )).join('');
  if(!sel.value&&programmeCatalog[0])sel.value=programmeCatalog[0].programme_code;
  const p=programmeCatalog.find(x=>x.programme_code===sel.value);
  $('#programme-meta').textContent=p?('Curriculum: '+(p.curriculum_version_label||p.curriculum_version_code||'—')+' · '+p.course_count+' รายวิชา'):'';
}

function renderYearOptions(){
  const years=[...new Set(termCatalog.map(x=>x.academic_year))];
  const pref=cfg.academic_year||years[0]||'';
  $('#year-select').innerHTML=years.map(y=>option(y,'ปีการศึกษา '+y,y===pref)).join('');
  if(!$('#year-select').value&&years[0])$('#year-select').value=years[0];
  renderTermOptions();
}
function renderTermOptions(){
  const y=$('#year-select').value;
  const list=termCatalog.filter(x=>x.academic_year===y);
  const pref=cfg.term_code||list[0]?.term_code||'';
  $('#term-select').innerHTML=list.map(t=>option(t.term_code,t.term_label||('ภาค '+t.term_code+'/'+t.academic_year),t.term_code===pref)).join('');
  if(!$('#term-select').value&&list[0])$('#term-select').value=list[0].term_code;
  const t=list.find(x=>x.term_code===$('#term-select').value);
  $('#term-meta').textContent=t?((t.status||'')+(t.source_reference?' · '+t.source_reference:'')):'';
}

async function loadCourses(){
  const p=$('#programme-select').value;
  const y=$('#year-select').value||null;
  const term=$('#term-select').value||null;
  if(!p)return;
  say('กำลังโหลดรายวิชาในหลักสูตร…');
  const {data,error}=await client.rpc('hepe_fast_tqf_course_catalog',{
    p_programme_code:p,p_academic_year:y,p_term_code:term
  });
  if(error)throw error;
  courseCatalog=Array.isArray(data)?data:[];
  const preferred=cfg.course_code||$('#course-select').value||'HED2503';
  $('#course-select').innerHTML=courseCatalog.map(c=>{
    const marker=c.offering?.course_offering_id?' ✓':'';
    return option(c.course_code,c.course_code+' — '+c.title_th+marker,c.course_code===preferred);
  }).join('');
  if(!$('#course-select').value&&courseCatalog[0])$('#course-select').value=courseCatalog[0].course_code;
  renderSelectorMeta();
  await loadSelectedCourse();
}
function renderSelectorMeta(){
  const p=programmeCatalog.find(x=>x.programme_code===$('#programme-select').value);
  if(p)$('#programme-meta').textContent='Curriculum: '+(p.curriculum_version_label||p.curriculum_version_code||'—')+' · '+p.course_count+' รายวิชา';
}

async function loadSelectedCourse(){
  const p=$('#programme-select').value,c=$('#course-select').value;
  if(!p||!c)return;
  say('กำลังดึงข้อมูลหลักสูตรและเอกสารรายวิชา…');
  const cc=await client.rpc('hepe_fast_tqf_curriculum_context',{p_programme_code:p,p_course_code:c});
  if(cc.error)throw cc.error;
  curriculumCtx=cc.data;
  docCtx=null;
  const args=courseArgs();
  const d=await client.rpc('hepe_fast_tqf_portal_context_by_code',args);
  if(!d.error)docCtx=d.data;
  renderCourseContext();
  renderTqf3();
  renderTqf5();
  renderVerification();
  renderReadiness();
  renderAiRail();
  say(d.error?'โหลดข้อมูลหลักสูตรแล้ว แต่ยังไม่พบ Course Offering ในปี/ภาคนี้':'พร้อมกรอกและบันทึก Draft','ok');
}

function renderCourseContext(){
  const c=curriculumCtx?.course||{},p=curriculumCtx?.programme||{},cv=curriculumCtx?.curriculum||{},d=curriculumCtx?.description;
  $('#course-title').textContent=(c.course_code||'')+' · '+(c.title_th||'');
  $('#course-subtitle').textContent=(c.title_en||'')+(c.credit_value!=null?' · '+c.credit_value+' หน่วยกิต':'');
  $('#curriculum-title').textContent=p.title_th||'—';
  $('#curriculum-version').textContent=cv.version_label||cv.version_code||'—';
  $('#canonical-desc').value=d?.description_th||'';
  $('#canonical-desc-en').value=d?.description_en||'';
  $('#desc-provenance').innerHTML='';
  if(d){
    setBadge(makeSpan('#desc-provenance'),d.verification_status||'UNKNOWN',kind(d.verification_status));
    setBadge(makeSpan('#desc-provenance'),d.authority_status||'UNKNOWN',kind(d.authority_status));
    if(d.source_reference)setBadge(makeSpan('#desc-provenance'),'Source: '+d.source_reference,'info');
    $('#desc-locator').textContent=d.source_locator||'ไม่ระบุตำแหน่งแหล่งข้อมูล';
  }else{
    setBadge(makeSpan('#desc-provenance'),'ยังไม่มีคำอธิบายในฐานข้อมูล','danger');
    $('#desc-locator').textContent='ต้องเพิ่มหลักฐานคำอธิบายรายวิชา';
  }
  const offering=docCtx?.course?.course_offering_id;
  $('#offering-note').hidden=!!offering;
  $('#save-tqf3').disabled=!offering;
  $('#save-tqf5').disabled=!offering;
  $('#save-verification-note').disabled=!offering;
  $('#course-offering-id').textContent=offering||'—';
  $('#course-plo-source').textContent=(curriculumCtx?.course_plo_mappings||[]).length
    ?'พบ canonical course→PLO mapping '+curriculumCtx.course_plo_mappings.length+' รายการ'
    :'ยังไม่พบ canonical course→PLO mapping ใน runtime — ห้ามสร้าง mapping แทนโดยอัตโนมัติ';
}
function makeSpan(parentSel){const s=document.createElement('span');$(parentSel).appendChild(s);return s;}

/* ---------- TQF3 ---------- */
function baseForm(){
  const fs=docCtx?.tqf3?.content?.form_sections||{};
  return{
    objectives:fs.objectives||'',
    clos:Array.isArray(fs.clos)&&fs.clos.length?fs.clos:[
      {code:'CLO1',description:'',plo:''},
      {code:'CLO2',description:'',plo:''},
      {code:'CLO3',description:'',plo:''},
      {code:'CLO4',description:'',plo:''}
    ],
    weekly_plan:Array.isArray(fs.weekly_plan)&&fs.weekly_plan.length?fs.weekly_plan:Array.from({length:15},(_,i)=>({
      week:i+1,topic:'',clo:'',plo:'',activities:'',lecture_hours:0,practice_hours:0,self_hours:0,assessment:'',resources:''
    })),
    assessment_items:Array.isArray(fs.assessment_items)&&fs.assessment_items.length?fs.assessment_items:[
      {item:'',method:'',weight:0,clos:'',evidence:''}
    ],
    resources:fs.resources||fs.learning_resources||'',
    improvement_notes:fs.improvement_notes||'',
    ai_decisions:Array.isArray(fs.ai_decisions)?fs.ai_decisions:[]
  };
}
function renderTqf3(){
  const f=baseForm(),d=docCtx?.tqf3;
  aiDecisions=clone(f.ai_decisions||[]);
  $('#t3-objectives').value=f.objectives;
  $('#t3-clo-body').innerHTML=f.clos.map((x,i)=>cloRow(x,i)).join('');
  $('#weekly-body').innerHTML=f.weekly_plan.map((x,i)=>weekRow(x,i)).join('');
  $('#assessment-body').innerHTML=f.assessment_items.map((x,i)=>assessmentRow(x,i)).join('');
  $('#t3-resources').value=f.resources;
  $('#t3-improvement').value=f.improvement_notes;
  setBadge('#tqf3-status',d?.lifecycle_status||'ยังไม่มี',kind(d?.lifecycle_status));
  $('#tqf3-version').textContent=d?.current_version_no??'—';
  $('#tqf3-meta').textContent=d?('Record '+d.record_id+' · Version '+d.current_version_no+' · '+d.version_status):'ยังไม่มี Working Draft';
  bindDynamicButtons();
  updateAssessmentTotal();
}
function cloRow(x,i){
  return '<tr>'+
    '<td><input class="t3-clo-code" data-row="'+i+'" value="'+esc(x.code||'')+'"></td>'+
    '<td><textarea class="t3-clo-desc" data-row="'+i+'" placeholder="ผลลัพธ์การเรียนรู้ที่วัดได้">'+esc(x.description||'')+'</textarea></td>'+
    '<td><input class="t3-clo-plo" data-row="'+i+'" value="'+esc(x.plo||'')+'" placeholder="เช่น PLO2, PLO5"></td>'+
    '<td><button class="btn small ai clo-ai" data-row="'+i+'">AI วิเคราะห์</button> <button class="icon-btn danger delete-clo" data-row="'+i+'">ลบ</button></td>'+
  '</tr>';
}
function weekRow(x,i){
  return '<tr>'+
    '<td class="week-no">'+esc(x.week??i+1)+'</td>'+
    '<td><textarea class="wk-topic" data-row="'+i+'">'+esc(x.topic||'')+'</textarea></td>'+
    '<td><input class="wk-clo" data-row="'+i+'" value="'+esc(x.clo||'')+'"></td>'+
    '<td><input class="wk-plo" data-row="'+i+'" value="'+esc(x.plo||'')+'"></td>'+
    '<td><textarea class="wk-act" data-row="'+i+'">'+esc(x.activities||'')+'</textarea></td>'+
    '<td><input class="wk-lec" data-row="'+i+'" type="number" min="0" step=".5" value="'+Number(x.lecture_hours||0)+'"><input class="wk-prac" data-row="'+i+'" type="number" min="0" step=".5" value="'+Number(x.practice_hours||0)+'"><input class="wk-self" data-row="'+i+'" type="number" min="0" step=".5" value="'+Number(x.self_hours||0)+'"></td>'+
    '<td><textarea class="wk-assess" data-row="'+i+'">'+esc(x.assessment||'')+'</textarea></td>'+
    '<td><textarea class="wk-res" data-row="'+i+'">'+esc(x.resources||'')+'</textarea></td>'+
    '<td><button class="btn small ai week-ai" data-row="'+i+'">AI</button> <button class="icon-btn duplicate-week" data-row="'+i+'">คัดลอก</button> <button class="icon-btn danger delete-week" data-row="'+i+'">ลบ</button></td>'+
  '</tr>';
}
function assessmentRow(x,i){
  return '<tr>'+
    '<td><input class="as-item" data-row="'+i+'" value="'+esc(x.item||'')+'"></td>'+
    '<td><input class="as-method" data-row="'+i+'" value="'+esc(x.method||'')+'"></td>'+
    '<td><input class="as-weight" data-row="'+i+'" type="number" min="0" max="100" step=".01" value="'+Number(x.weight||0)+'"></td>'+
    '<td><input class="as-clo" data-row="'+i+'" value="'+esc(x.clos||'')+'"></td>'+
    '<td><textarea class="as-evidence" data-row="'+i+'">'+esc(x.evidence||'')+'</textarea></td>'+
    '<td><button class="btn small ai assess-ai" data-row="'+i+'">AI</button> <button class="icon-btn danger delete-assessment" data-row="'+i+'">ลบ</button></td>'+
  '</tr>';
}
function bindDynamicButtons(){
  $$('.clo-ai').forEach(b=>b.onclick=()=>runSectionAi('clo',Number(b.dataset.row)));
  $$('.week-ai').forEach(b=>b.onclick=()=>runSectionAi('weekly',Number(b.dataset.row)));
  $$('.assess-ai').forEach(b=>b.onclick=()=>runSectionAi('assessment',Number(b.dataset.row)));
  $$('.delete-clo').forEach(b=>b.onclick=()=>deleteRow('clo',Number(b.dataset.row)));
  $$('.delete-week').forEach(b=>b.onclick=()=>deleteRow('week',Number(b.dataset.row)));
  $$('.duplicate-week').forEach(b=>b.onclick=()=>duplicateWeek(Number(b.dataset.row)));
  $$('.delete-assessment').forEach(b=>b.onclick=()=>deleteRow('assessment',Number(b.dataset.row)));
  $$('.as-weight').forEach(x=>x.oninput=updateAssessmentTotal);
}
function collectClos(){return $$('.t3-clo-code').map((el,i)=>({code:el.value.trim()||('CLO'+(i+1)),description:$('.t3-clo-desc[data-row="'+i+'"]')?.value.trim()||'',plo:$('.t3-clo-plo[data-row="'+i+'"]')?.value.trim()||''}));}
function collectWeeks(){return $$('.wk-topic').map((el,i)=>({week:i+1,topic:el.value.trim(),clo:$('.wk-clo[data-row="'+i+'"]')?.value.trim()||'',plo:$('.wk-plo[data-row="'+i+'"]')?.value.trim()||'',activities:$('.wk-act[data-row="'+i+'"]')?.value.trim()||'',lecture_hours:Number($('.wk-lec[data-row="'+i+'"]')?.value||0),practice_hours:Number($('.wk-prac[data-row="'+i+'"]')?.value||0),self_hours:Number($('.wk-self[data-row="'+i+'"]')?.value||0),assessment:$('.wk-assess[data-row="'+i+'"]')?.value.trim()||'',resources:$('.wk-res[data-row="'+i+'"]')?.value.trim()||''}));}
function collectAssessments(){return $$('.as-item').map((el,i)=>({item:el.value.trim(),method:$('.as-method[data-row="'+i+'"]')?.value.trim()||'',weight:Number($('.as-weight[data-row="'+i+'"]')?.value||0),clos:$('.as-clo[data-row="'+i+'"]')?.value.trim()||'',evidence:$('.as-evidence[data-row="'+i+'"]')?.value.trim()||''}));}
function collectTqf3(){
  const base=clone(docCtx?.tqf3?.content||{});
  base.course_code=curriculumCtx?.course?.course_code||$('#course-select').value;
  base.curriculum_snapshot={
    programme_code:curriculumCtx?.programme?.programme_code,
    curriculum_version_code:curriculumCtx?.curriculum?.version_code,
    curriculum_course_id:curriculumCtx?.course?.curriculum_course_id,
    description_version_id:curriculumCtx?.description?.course_description_version_id||null,
    description_authority_status:curriculumCtx?.description?.authority_status||null,
    description_verification_status:curriculumCtx?.description?.verification_status||null
  };
  base.form_sections={
    objectives:$('#t3-objectives').value.trim(),
    clos:collectClos(),
    weekly_plan:collectWeeks(),
    assessment_items:collectAssessments(),
    resources:$('#t3-resources').value.trim(),
    improvement_notes:$('#t3-improvement').value.trim(),
    ai_decisions:aiDecisions,
    ui_version:'v26'
  };
  return base;
}
function deleteRow(type,i){
  if(type==='clo'){const a=collectClos();a.splice(i,1);$('#t3-clo-body').innerHTML=a.map((x,j)=>cloRow(x,j)).join('');}
  if(type==='week'){const a=collectWeeks();a.splice(i,1);a.forEach((x,j)=>x.week=j+1);$('#weekly-body').innerHTML=a.map((x,j)=>weekRow(x,j)).join('');}
  if(type==='assessment'){const a=collectAssessments();a.splice(i,1);$('#assessment-body').innerHTML=a.map((x,j)=>assessmentRow(x,j)).join('');}
  bindDynamicButtons();updateAssessmentTotal();renderReadiness();
}
function duplicateWeek(i){const a=collectWeeks();a.splice(i+1,0,clone(a[i]));a.forEach((x,j)=>x.week=j+1);$('#weekly-body').innerHTML=a.map((x,j)=>weekRow(x,j)).join('');bindDynamicButtons();}
function addWeek(){const a=collectWeeks();a.push({week:a.length+1,topic:'',clo:'',plo:'',activities:'',lecture_hours:0,practice_hours:0,self_hours:0,assessment:'',resources:''});$('#weekly-body').innerHTML=a.map((x,j)=>weekRow(x,j)).join('');bindDynamicButtons();}
function addClo(){const a=collectClos();a.push({code:'CLO'+(a.length+1),description:'',plo:''});$('#t3-clo-body').innerHTML=a.map((x,j)=>cloRow(x,j)).join('');bindDynamicButtons();}
function addAssessment(){const a=collectAssessments();a.push({item:'',method:'',weight:0,clos:'',evidence:''});$('#assessment-body').innerHTML=a.map((x,j)=>assessmentRow(x,j)).join('');bindDynamicButtons();updateAssessmentTotal();}
function updateAssessmentTotal(){const total=collectAssessments().reduce((s,x)=>s+Number(x.weight||0),0);$('#assessment-total').textContent=total.toFixed(2)+'%';setBadge('#assessment-total-badge',Math.abs(total-100)<.01?'ครบ 100%':'รวม '+total.toFixed(2)+'%',Math.abs(total-100)<.01?'ok':'warn');}

/* ---------- TQF5 ---------- */
const grades=['A','B+','B','C+','C','D+','D','F','W/I'];
function renderTqf5(){
  const p=clone(docCtx?.tqf5?.payload||{}),d=docCtx?.tqf5;
  p.general_information=p.general_information||{};p.results=p.results||{};p.evaluation=p.evaluation||{};p.plan_actual=p.plan_actual||{};p.issues=p.issues||{};
  $('#registered-students').value=p.general_information.registered_students??'';
  $('#students-at-end').value=p.general_information.students_at_end??'';
  $('#t5-plan-actual').value=p.plan_actual.summary||'';
  const gm=new Map((p.results.grade_distribution||[]).map(x=>[x.grade,x]));
  $('#grade-body').innerHTML=grades.map(g=>{const x=gm.get(g)||{count:0,percent:0};return'<tr><td><b>'+g+'</b></td><td><input class="grade-count" data-grade="'+g+'" type="number" min="0" value="'+Number(x.count||0)+'"></td><td><input class="grade-percent" data-grade="'+g+'" type="number" min="0" max="100" step=".01" value="'+Number(x.percent||0)+'"></td></tr>';}).join('');
  const cl=p.results.clo_attainment||collectClos().map(x=>({clo:x.code,target_percent:80,attainment_percent:0}));
  $('#clo-body').innerHTML=cl.map((x,i)=>'<tr><td><input class="clo-code" data-row="'+i+'" value="'+esc(x.clo||'')+'"></td><td><input class="clo-target" data-row="'+i+'" type="number" value="'+Number(x.target_percent||0)+'"></td><td><input class="clo-attain" data-row="'+i+'" type="number" value="'+Number(x.attainment_percent||0)+'"></td></tr>').join('');
  $('#t5-problems').value=(p.issues.course_problems||[]).join('\n');
  $('#improvement-plan').value=(p.improvement_plan||[]).map(x=>(x.action||'')+' | '+(x.target_term||'')).join('\n');
  setBadge('#tqf5-status',d?.lifecycle_status||'ยังไม่มี',kind(d?.lifecycle_status));
}
function collectTqf5(){
  const base=clone(docCtx?.tqf5?.payload||{});base.general_information=base.general_information||{};
  base.general_information.course_code=$('#course-select').value;base.general_information.academic_year=$('#year-select').value;base.general_information.term_code=$('#term-select').value;
  base.general_information.registered_students=num($('#registered-students').value);base.general_information.students_at_end=num($('#students-at-end').value);
  base.plan_actual={summary:$('#t5-plan-actual').value.trim(),source_status:'WORKING_SOURCE'};
  base.results=base.results||{};
  base.results.grade_distribution=$$('.grade-count').map(el=>({grade:el.dataset.grade,count:Number(el.value||0),percent:Number($('.grade-percent[data-grade="'+CSS.escape(el.dataset.grade)+'"]')?.value||0)}));
  base.results.clo_attainment=$$('.clo-code').map((el,i)=>({clo:el.value.trim(),target_percent:Number($('.clo-target[data-row="'+i+'"]')?.value||0),attainment_percent:Number($('.clo-attain[data-row="'+i+'"]')?.value||0)}));
  base.issues=base.issues||{};base.issues.course_problems=$('#t5-problems').value.split('\n').map(x=>x.trim()).filter(Boolean);
  base.improvement_plan=$('#improvement-plan').value.split('\n').map(x=>x.trim()).filter(Boolean).map(line=>{const [a,...r]=line.split('|');return{action:a.trim(),target_term:r.join('|').trim()||null};});
  base.ai_decisions=aiDecisions.filter(x=>x.document==='TQF5');
  return base;
}

/* ---------- Verification ---------- */
const evidenceChecks=[
  ['committee_order','คำสั่ง/หลักฐานแต่งตั้งคณะกรรมการ'],['minutes','รายงานประชุม/บันทึกการทวนสอบ'],['attendance','รายชื่อผู้เข้าร่วม'],
  ['sampling','รายการและวิธีสุ่มชิ้นงาน'],['artifacts','ตัวอย่างข้อสอบ/ชิ้นงาน'],['rescoring','หลักฐานตรวจ/ให้คะแนนซ้ำ'],['comparison','ผลเปรียบเทียบผู้ตรวจ'],['signed_decision','มติ/ข้อสรุปที่ลงนามหรือ controlled approval']
];
function renderVerification(){
  const v=docCtx?.verification;setBadge('#verification-status',v?.status||'ยังไม่มี',kind(v?.status));$('#verification-id').textContent=v?.verification_record_id||'—';$('#verification-note').value=v?.finding_summary||'';
  $('#verification-checklist').innerHTML=evidenceChecks.map(([id,label])=>'<label class="check-row"><span><input type="checkbox" class="vcheck" data-id="'+id+'" style="width:auto"> '+esc(label)+'</span><span class="badge info">Evidence</span></label>').join('');
  const a=$('#verification-actions');a.innerHTML='';
  if(!v){a.innerHTML='<button class="btn primary" id="create-verification">สร้างรายการทวนสอบ</button>';$('#create-verification').onclick=createVerification;}
  else if(v.status==='DRAFT')a.innerHTML='<button class="btn primary" data-state="IN_REVIEW">เริ่มทวนสอบ</button>';
  else if(v.status==='IN_REVIEW')a.innerHTML='<button class="btn" data-state="REQUIRES_ACTION">ส่งกลับแก้ไข</button><button class="btn accent" data-state="INSUFFICIENT_EVIDENCE">หลักฐานไม่เพียงพอ</button><button class="btn" disabled>VERIFIED เมื่อ Evidence Gate ผ่าน</button>';
  else if(v.status==='REQUIRES_ACTION'||v.status==='INSUFFICIENT_EVIDENCE')a.innerHTML='<button class="btn primary" data-state="IN_REVIEW">เปิดทวนสอบอีกครั้ง</button><button class="btn" disabled>VERIFIED เมื่อ Evidence Gate ผ่าน</button>';
  a.querySelectorAll('[data-state]').forEach(b=>b.onclick=()=>transitionVerification(b.dataset.state));
}
function verificationNote(){
  const have=$$('.vcheck').filter(x=>x.checked).map(x=>evidenceChecks.find(c=>c[0]===x.dataset.id)?.[1]).filter(Boolean);
  const miss=$$('.vcheck').filter(x=>!x.checked).map(x=>evidenceChecks.find(c=>c[0]===x.dataset.id)?.[1]).filter(Boolean);
  return ($('#verification-note').value.trim()+'\n\n[Evidence checklist]\nมี: '+(have.join('; ')||'ยังไม่มีรายการที่ยืนยัน')+'\nขาด: '+(miss.join('; ')||'ไม่พบรายการที่ขาด')).trim();
}

/* ---------- AI / Smart QA ---------- */
function sectionData(section,row){
  if(section==='curriculum')return curriculumCtx;
  if(section==='clo')return row!=null?collectClos()[row]:collectClos();
  if(section==='weekly')return row!=null?collectWeeks()[row]:collectWeeks();
  if(section==='assessment')return row!=null?collectAssessments()[row]:collectAssessments();
  if(section==='tqf5')return collectTqf5();
  if(section==='verification')return{status:docCtx?.verification?.status,note:$('#verification-note').value,checked:$$('.vcheck').filter(x=>x.checked).map(x=>x.dataset.id)};
  return readinessState();
}
function analyze(section,row){
  const out=[];
  if(section==='curriculum'){
    const d=curriculumCtx?.description;
    if(!d)out.push(sug('desc-missing','ยังไม่มีคำอธิบายรายวิชาในฐานหลักสูตร','ควรเพิ่มแหล่งหลักฐานก่อนใช้ข้อมูลนี้ใน มคอ.3'));
    else if(d.authority_status!=='AUTHORITATIVE'&&d.authority_status!=='VERIFIED')out.push(sug('desc-authority','คำอธิบายยังไม่ใช่ authoritative source','ใช้เป็นข้อมูลฐานปัจจุบันได้ตามสถานะ แต่ไม่ควรอ้างว่าเป็นข้อความจากเล่มหลักสูตรโดยตรงจนกว่าจะยืนยัน provenance'));
    if(!(curriculumCtx?.course_plo_mappings||[]).length)out.push(sug('plo-map-missing','ยังไม่มี canonical course→PLO mapping','ให้ผู้ใช้กรอก working mapping ได้ แต่ต้องแยกจาก canonical mapping และไม่ให้ AI สร้างแทน'));
  }
  if(section==='clo'){
    const rows=row!=null?[collectClos()[row]]:collectClos();
    rows.forEach((x,i)=>{
      if(!x.description)out.push(sug('clo-empty-'+i,(x.code||'CLO')+' ยังไม่มีข้อความ','เขียนผลลัพธ์การเรียนรู้ที่สังเกตหรือวัดได้'));
      if(x.description&&!/(อธิบาย|วิเคราะห์|ประเมิน|ออกแบบ|ประยุกต์|สาธิต|ปฏิบัติ|สร้าง|เลือก|เสนอ|เปรียบเทียบ|ให้คำปรึกษา)/.test(x.description))out.push(sug('clo-verb-'+i,(x.code||'CLO')+' อาจยังไม่ชัดด้านพฤติกรรม','พิจารณาใช้คำกริยาที่วัดได้และระบุขอบเขต/บริบท'));
      if(!x.plo)out.push(sug('clo-plo-'+i,(x.code||'CLO')+' ยังไม่ระบุ PLO','เชื่อมโยง PLO เฉพาะเมื่อมีเหตุผลจากหลักสูตรหรือการออกแบบรายวิชา'));
    });
  }
  if(section==='weekly'){
    const rows=row!=null?[collectWeeks()[row]]:collectWeeks();
    rows.forEach((x,i)=>{
      const n=row!=null?row+1:x.week;
      if(x.topic&&!x.clo)out.push(sug('wk-clo-'+n,'สัปดาห์ '+n+' มีหัวข้อแต่ยังไม่มี CLO','ระบุ CLO ที่กิจกรรมสัปดาห์นี้สนับสนุน'));
      if(x.clo&&!x.activities)out.push(sug('wk-act-'+n,'สัปดาห์ '+n+' มี CLO แต่ยังไม่มีกิจกรรม','เพิ่มกิจกรรมที่ทำให้ผู้เรียนแสดงพฤติกรรมตาม CLO'));
      if(x.clo&&!x.assessment)out.push(sug('wk-assess-'+n,'สัปดาห์ '+n+' มี CLO แต่ยังไม่มีการวัด/หลักฐาน','เพิ่ม assessment/evidence ที่สอดคล้องกับ CLO'));
      if(x.topic&&!x.resources)out.push(sug('wk-res-'+n,'สัปดาห์ '+n+' ยังไม่ระบุสื่อ/แหล่งเรียนรู้','เพิ่มสื่อหรือแหล่งเรียนรู้ที่ใช้จริง'));
    });
    if(!rows.some(x=>x.topic))out.push(sug('wk-empty','แผนรายสัปดาห์ยังว่าง','เริ่มจากหัวข้อหลักของรายวิชาแล้วกระจาย CLO และกิจกรรมตามลำดับการเรียนรู้'));
  }
  if(section==='assessment'){
    const rows=collectAssessments(),total=rows.reduce((s,x)=>s+Number(x.weight||0),0);
    if(Math.abs(total-100)>.01)out.push(sug('as-total','สัดส่วนการประเมินรวม '+total.toFixed(2)+'%','ปรับรายการประเมินให้รวม 100%'));
    rows.forEach((x,i)=>{if(x.item&&!x.clos)out.push(sug('as-clo-'+i,'รายการประเมิน '+(x.item||i+1)+' ยังไม่เชื่อม CLO','ระบุ CLO ที่รายการนี้ใช้เป็นหลักฐาน'));if(x.item&&!x.evidence)out.push(sug('as-ev-'+i,'รายการประเมิน '+x.item+' ยังไม่ระบุหลักฐาน/เกณฑ์','เพิ่มหลักฐานหรือ rubric ที่ใช้ตัดสินผล'));});
  }
  if(section==='tqf5'){
    const p=collectTqf5(),sum=p.results.grade_distribution.reduce((s,x)=>s+Number(x.percent||0),0);
    if(Math.abs(sum-100)>.5)out.push(sug('t5-grade','ร้อยละเกรดรวม '+sum.toFixed(2)+'%','ตรวจจำนวนและร้อยละให้รวมประมาณ 100%'));
    const t3=new Set(collectClos().map(x=>x.code));const t5=new Set(p.results.clo_attainment.map(x=>x.clo));const miss=[...t3].filter(x=>!t5.has(x));if(miss.length)out.push(sug('t5-clo','มคอ.5 ยังไม่มีผลของ '+miss.join(', '),'ควรมีผล CLO ทุกข้อที่ใช้จริงใน มคอ.3 หรืออธิบายเหตุผล'));
    if(!p.plan_actual.summary)out.push(sug('t5-plan','ยังไม่มี Plan→Actual summary','ระบุสิ่งที่ดำเนินการจริงและความแตกต่างจาก มคอ.3'));
    if(!(p.improvement_plan||[]).length)out.push(sug('t5-cqi','ยังไม่มีแผน CQI','เชื่อมปัญหาหรือผลที่ต่ำกว่าเป้าหมายกับ action รอบถัดไป'));
  }
  if(section==='verification'){
    const checked=$$('.vcheck').filter(x=>x.checked).length;if(checked<evidenceChecks.length)out.push(sug('v-evidence','หลักฐานยังครบ '+checked+'/'+evidenceChecks.length,'คงสถานะไม่ VERIFIED จนกว่าจะมีหลักฐานจริงครบตาม gate'));
  }
  return out.length?out:[sug('ok','ไม่พบช่องว่างสำคัญจาก Smart QA รอบนี้','ยังควรให้ผู้รับผิดชอบตรวจเนื้อหาทางวิชาการและหลักฐานก่อนส่ง')];
}
function sug(id,title,message){return{id,title,message,status:'SUGGESTED'};}
function runSectionAi(section,row=null){
  activeAiSection=section;aiSuggestions=analyze(section,row);renderAiRail();
}
function renderAiRail(){
  const labels={curriculum:'ข้อมูลหลักสูตร',clo:'CLO–PLO',weekly:'แผนรายสัปดาห์',assessment:'การประเมิน',tqf5:'มคอ.5',verification:'ทวนสอบ',overview:'Readiness'};
  $('#ai-context').textContent=labels[activeAiSection]||activeAiSection;
  const list=$('#ai-suggestions');
  list.innerHTML=aiSuggestions.length?aiSuggestions.map((s,i)=>'<div class="suggestion '+(s.status==='ACCEPTED'?'accepted':s.status==='REJECTED'?'rejected':'')+'"><div class="title">'+esc(s.title)+'</div><textarea class="suggestion-text" data-i="'+i+'">'+esc(s.message)+'</textarea><div class="actions"><button class="btn small good sug-accept" data-i="'+i+'">รับข้อเสนอ</button><button class="btn small sug-edit" data-i="'+i+'">แก้ไขแล้วรับ</button><button class="btn small sug-reject" data-i="'+i+'">ไม่ใช้</button></div></div>').join(''):'<div class="help">กด AI ช่วยวิเคราะห์ในแต่ละหมวด</div>';
  $$('.sug-accept').forEach(b=>b.onclick=()=>decideSuggestion(Number(b.dataset.i),'ACCEPTED'));
  $$('.sug-edit').forEach(b=>b.onclick=()=>decideSuggestion(Number(b.dataset.i),'EDITED_AND_ACCEPTED'));
  $$('.sug-reject').forEach(b=>b.onclick=()=>decideSuggestion(Number(b.dataset.i),'REJECTED'));
  const r=readinessState();$('#ai-readiness-score').textContent=r.score+'%';
}
function decideSuggestion(i,decision){
  const s=aiSuggestions[i];if(!s)return;
  s.status=decision;
  const text=$('.suggestion-text[data-i="'+i+'"]')?.value||s.message;
  aiDecisions.push({document:activeTab==='tqf5'?'TQF5':'TQF3',section:activeAiSection,suggestion_id:s.id,decision,text,decided_at:new Date().toISOString()});
  renderAiRail();renderReadiness();
}
function aiPrompt(){
  const section=activeAiSection,data=sectionData(section);
  return 'คุณเป็นผู้ช่วยวิเคราะห์ระบบ มคอ. ภายใต้หลัก Evidence-First และ Human-in-the-Loop\n'+
    'บริบท: '+(curriculumCtx?.programme?.title_th||'')+' / '+(curriculumCtx?.course?.course_code||'')+' '+(curriculumCtx?.course?.title_th||'')+'\n'+
    'ส่วนที่วิเคราะห์: '+section+'\n\n'+
    'โปรด 1) ตรวจความครบถ้วน 2) ตรวจ CLO-PLO-กิจกรรม-การประเมิน 3) ห้ามแต่งข้อมูล 4) เสนอข้อความหรือ action เป็นตัวเลือก 5) ระบุสิ่งที่ต้องให้ผู้ใช้ตัดสินใจ\n\nข้อมูล:\n'+JSON.stringify(data,null,2);
}
async function openChatGPT(){
  const p=aiPrompt();$('#ai-prompt').value=p;try{await navigator.clipboard.writeText(p);say('คัดลอก Prompt แล้ว เปิด ChatGPT และวางด้วย Ctrl+V','ok');}catch{}
  window.open('https://chatgpt.com/','_blank','noopener');
}

/* ---------- Readiness / consistency ---------- */
function readinessState(){
  const checks=[];const add=(name,ok,detail)=>checks.push({name,ok,detail});
  const d=curriculumCtx?.description;add('ข้อมูลหลักสูตร',!!curriculumCtx,'โหลด programme/course context');
  add('คำอธิบายรายวิชา',!!d?.description_th,d?((d.verification_status||'')+' / '+(d.authority_status||'')):'ยังไม่มี');
  const clos=collectClos();add('CLO',clos.length>=3&&clos.every(x=>x.description),'CLO '+clos.filter(x=>x.description).length+'/'+clos.length+' มีข้อความ');
  const weeks=collectWeeks(),filled=weeks.filter(x=>x.topic).length;add('แผนรายสัปดาห์',filled>0,'มีหัวข้อ '+filled+'/'+weeks.length+' สัปดาห์');
  const assessments=collectAssessments(),total=assessments.reduce((s,x)=>s+Number(x.weight||0),0);add('การประเมิน',Math.abs(total-100)<.01,'รวม '+total.toFixed(2)+'%');
  const t5=collectTqf5(),t3Codes=new Set(clos.map(x=>x.code)),t5Codes=new Set((t5.results?.clo_attainment||[]).map(x=>x.clo));const mismatch=[...t3Codes].filter(x=>!t5Codes.has(x));add('มคอ.3 ↔ มคอ.5 CLO',mismatch.length===0,mismatch.length?'ขาด '+mismatch.join(', '):'สอดคล้อง');
  const v=docCtx?.verification;add('ทวนสอบ',v?.status==='VERIFIED',v?.status||'ยังไม่มี');
  const resolved=aiDecisions.filter(x=>/ACCEPTED|REJECTED/.test(x.decision)).length;add('AI decisions',true,'บันทึกการตัดสินใจ '+resolved+' รายการ');
  const score=Math.round(checks.filter(x=>x.ok).length/checks.length*100);
  return{score,checks};
}
function renderReadiness(){
  const r=readinessState();$('#readiness-ring').style.setProperty('--p',r.score);$('#readiness-score').textContent=r.score+'%';
  $('#readiness-list').innerHTML=r.checks.map(x=>'<div class="check-row"><span>'+esc(x.name)+'<div class="help">'+esc(x.detail)+'</div></span><span class="badge '+(x.ok?'ok':'warn')+'">'+(x.ok?'ผ่าน':'ตรวจต่อ')+'</span></div>').join('');
  $('#consistency-list').innerHTML=r.checks.filter(x=>/มคอ\.3|การประเมิน|CLO|ทวนสอบ/.test(x.name)).map(x=>'<div class="check-row"><span>'+esc(x.name)+'</span><span class="badge '+(x.ok?'ok':'warn')+'">'+esc(x.detail)+'</span></div>').join('');
}

/* ---------- Save / workflow ---------- */
async function saveTqf3(){
  if(!docCtx?.course?.course_offering_id)throw new Error('ยังไม่พบ Course Offering สำหรับปี/ภาคนี้ จึงยังบันทึก มคอ.3 ไม่ได้');
  say('กำลังบันทึก มคอ.3 Working Version…');
  const {data,error}=await client.rpc('hepe_save_tqf3_working_version_by_code',{...courseArgs(),p_content:collectTqf3(),p_source_status:'LATEST_WORKING_CONFIRMED'});if(error)throw error;
  say('บันทึก มคอ.3 สำเร็จ — Version '+data.version_no,'ok');await loadSelectedCourse();
}
async function saveTqf5(){
  if(!docCtx?.course?.course_offering_id)throw new Error('ยังไม่พบ Course Offering สำหรับปี/ภาคนี้');
  const {data,error}=await client.rpc('hepe_create_tqf5_working_draft_by_code',{...courseArgs(),p_payload:collectTqf5(),p_source_reference:'HEPE Fast TQF Portal v26 / structured form / NON-PRODUCTION'});if(error)throw error;
  say('บันทึก มคอ.5 Draft สำเร็จ — '+data.result_snapshot_id,'ok');await loadSelectedCourse();
}
async function createVerification(){const {data,error}=await client.rpc('hepe_ensure_verification_draft_by_code',courseArgs());if(error)throw error;say(data.created?'สร้างรายการทวนสอบแล้ว':'มีรายการอยู่แล้ว','ok');await loadSelectedCourse();}
async function saveVerificationNote(){if(!docCtx?.verification?.verification_record_id)return createVerification();const {error}=await client.rpc('hepe_save_verification_note',{p_verification_record_id:docCtx.verification.verification_record_id,p_finding_summary:verificationNote()});if(error)throw error;say('บันทึกทวนสอบแล้ว','ok');await loadSelectedCourse();}
async function transitionVerification(status){const {error}=await client.rpc('hepe_review_course_verification',{p_verification_record_id:docCtx.verification.verification_record_id,p_new_status:status,p_finding_summary:verificationNote()});if(error)throw error;say('เปลี่ยนสถานะเป็น '+status,'ok');await loadSelectedCourse();}

/* ---------- Auth ---------- */
async function loginMagic(e){e.preventDefault();const email=$('#login-email').value.trim();const {error}=await client.auth.signInWithOtp({email,options:{shouldCreateUser:false,emailRedirectTo:'https://kasemch.github.io/hepe-trial/'}});if(error)throw error;say('ส่ง Magic Link แล้ว กรุณาเปิดอีเมลฉบับล่าสุด','ok');}
async function loginPassword(){const email=$('#login-email').value.trim(),password=$('#login-password').value;if(!email||!password)throw new Error('กรุณากรอกอีเมลและรหัสผ่าน');const {error}=await client.auth.signInWithPassword({email,password});if(error)throw error;}
async function logout(){await client.auth.signOut();location.reload();}

function bindStatic(){
  $$('.tab').forEach(b=>b.onclick=()=>setTab(b.dataset.tab));
  $('#programme-select').onchange=()=>{cfg.course_code='';loadCourses().catch(e=>say(e.message,'danger'));};
  $('#year-select').onchange=()=>{renderTermOptions();loadCourses().catch(e=>say(e.message,'danger'));};
  $('#term-select').onchange=()=>loadCourses().catch(e=>say(e.message,'danger'));
  $('#course-select').onchange=()=>loadSelectedCourse().catch(e=>say(e.message,'danger'));
  $('#reload-course').onclick=()=>loadSelectedCourse().catch(e=>say(e.message,'danger'));
  $('#add-clo').onclick=addClo;$('#add-week').onclick=addWeek;$('#add-assessment').onclick=addAssessment;
  $('#save-tqf3').onclick=()=>saveTqf3().catch(e=>say(e.message,'danger'));$('#save-tqf5').onclick=()=>saveTqf5().catch(e=>say(e.message,'danger'));$('#save-verification-note').onclick=()=>saveVerificationNote().catch(e=>say(e.message,'danger'));
  $$('.ai-section').forEach(b=>b.onclick=()=>runSectionAi(b.dataset.section));
  $('#ai-chatgpt').onclick=()=>openChatGPT().catch(e=>say(e.message,'danger'));$('#ai-show-prompt').onclick=()=>{$('#ai-prompt-wrap').hidden=!$('#ai-prompt-wrap').hidden;$('#ai-prompt').value=aiPrompt();};
  $('#print-form').onclick=()=>window.print();$('#logout').onclick=()=>logout().catch(e=>say(e.message,'danger'));
  $('#login-form').addEventListener('submit',e=>loginMagic(e).catch(x=>say(x.message,'danger')));$('#password-login').onclick=()=>loginPassword().catch(x=>say(x.message,'danger'));
}

async function boot(){
  cfg=await fetch('./config/state.json?v=26',{cache:'no-store'}).then(r=>r.json()).catch(()=>({}));
  const {data:{session}}=await client.auth.getSession();
  $('#login-view').hidden=!!session;$('#app-view').hidden=!session;
  bindStatic();
  if(!session){say('กรุณา Login เพื่อใช้งาน HEPE Fast TQF Portal','warn');return;}
  $('#identity').textContent=session.user.email||'Authenticated';
  await loadInitialCatalogs();
}
client.auth.onAuthStateChange((event,session)=>{if(event==='SIGNED_IN'&&session)setTimeout(()=>boot().catch(e=>say(e.message,'danger')),0);});
boot().catch(e=>say(e.message||String(e),'danger'));
})();