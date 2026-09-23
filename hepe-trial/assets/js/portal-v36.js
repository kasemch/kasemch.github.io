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
let versionHistory=[],evidenceWorkspace=null,cqiContext=null,dashboardCtx=null,evidenceQueueCtx=null;
let courseResponsibilityCtx=null,programmeResponsibilityCtx=null,templateReviewCtx=null,templateReviewLoaded=false,currentTqf3Preview=null;
let activeTab='tqf3',activeAiSection='curriculum',aiSuggestions=[],aiDecisions=[];
let saveTimer=null,staticBound=false,aiUndoStack=[],aiSectionRuns={},aiSectionSuggestionCache={},reviewQueueIndex=0,reviewQueueFilter='ALL',reuseLineage=[],changeRationales=[];

function say(msg,kind='info'){
  const el=$('#status'); if(!el)return;
  el.textContent=msg; el.className='status '+(kind==='info'?'':kind);
}

function friendlyError(err){
  const m=String(err?.message||err||'เกิดข้อผิดพลาด');
  const map=[
    ['AUTH_REQUIRED','กรุณาเข้าสู่ระบบใหม่'],
    ['INSUFFICIENT_AUTHORITY','บัญชีนี้ไม่มีสิทธิ์สำหรับรายการที่เลือก'],
    ['PROGRAMME_AUTHORITY_REQUIRED','ต้องใช้สิทธิ์ระดับหลักสูตรเพื่อดูข้อมูลนี้'],
    ['AUTHORITATIVE_EXPORT_NOT_ALLOWED_FOR_CURRENT_PREVIEW','ยังอนุมัติ Controlled Export ไม่ได้ เพราะ Preview ปัจจุบันเป็น DRAFT / UNVERIFIED'],
    ['COURSE_OUT_OF_SCOPE','รายวิชานี้อยู่นอกขอบเขต HED/PED ของระบบ'],
    ['COURSE_OFFERING_NOT_FOUND','ยังไม่พบ Course Offering สำหรับปี/ภาคที่เลือก'],
    ['INVALID_SHA256_FORMAT','SHA-256 ต้องเป็นเลขฐาน 16 จำนวน 64 ตัวอักษร']
  ];
  const hit=map.find(([k])=>m.includes(k));
  return hit?hit[1]:m;
}
function setBusy(on,label='กำลังโหลดข้อมูล…'){
  const app=$('#app-view');
  if(app)app.setAttribute('aria-busy',on?'true':'false');
  if(on)say(label,'info');
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
  $$('.tab').forEach(x=>{
    const active=x.dataset.tab===name;
    x.classList.toggle('active',active);
    x.setAttribute('aria-selected',active?'true':'false');
    x.tabIndex=active?0:-1;
  });
  $$('.panel').forEach(x=>x.hidden=x.id!=='panel-'+name);
  activeAiSection=name==='tqf3'?'curriculum':name;
  renderAiRail();
  if(name==='overview'){
    renderReadiness();
    loadTemplateReview().catch(e=>say(friendlyError(e),'danger'));
  }
  if(name==='dashboard')loadDashboard().catch(e=>say(friendlyError(e),'danger'));
  enhanceAccessibility();
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
  $('#programme-meta').textContent=p?('Curriculum: '+(p.curriculum_version_label||p.curriculum_version_code||'—')+' · '+p.course_count+' รายวิชา HED/PED ที่อยู่ในขอบเขตระบบ'):'';
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
  if(p)$('#programme-meta').textContent='Curriculum: '+(p.curriculum_version_label||p.curriculum_version_code||'—')+' · '+p.course_count+' รายวิชา HED/PED ที่อยู่ในขอบเขตระบบ';
}

async function loadSelectedCourse(){
  const p=$('#programme-select').value,c=$('#course-select').value;
  if(!p||!c)return;
  setBusy(true,'กำลังดึงข้อมูลหลักสูตร เอกสาร หลักฐาน และความรับผิดชอบรายวิชา…');
  try{
    const args=courseArgs();
    const [cc,d,vh,ew,cqi,resp]=await Promise.all([
      client.rpc('hepe_fast_tqf_curriculum_context',{p_programme_code:p,p_course_code:c}),
      client.rpc('hepe_fast_tqf_portal_context_by_code',args),
      client.rpc('hepe_fast_tqf_version_history_by_code',{...args,p_limit:10}),
      client.rpc('hepe_fast_tqf_evidence_workspace_by_code',args),
      client.rpc('hepe_fast_tqf_cqi_context_by_code',args),
      client.rpc('hepe_fast_tqf_course_responsibility_by_code',args)
    ]);
    if(cc.error)throw cc.error;
    curriculumCtx=cc.data;
    docCtx=d.error?null:d.data;
    versionHistory=vh.error?[]:(Array.isArray(vh.data)?vh.data:[]);
    evidenceWorkspace=ew.error?null:ew.data;
    cqiContext=cqi.error?null:cqi.data;
    courseResponsibilityCtx=resp.error?null:resp.data;
    renderCourseContext();
    renderCourseResponsibility();
    renderTqf3();
    renderTqf5();
    renderVerification();
    renderEvidenceWorkspace();
    renderVersionCompare();
    renderCqiCarryForward();
    renderReadiness();
    await loadTqf3HumanReviewState();
    renderAiRail();
    ensureV33Ui();
    offerLocalRecovery();
    enhanceAccessibility();
    say(d.error?'โหลดข้อมูลหลักสูตรแล้ว แต่ยังไม่พบ Course Offering ในปี/ภาคนี้':'พร้อมกรอกและบันทึก Draft','ok');
  } finally {
    const app=$('#app-view');if(app)app.setAttribute('aria-busy','false');
  }
}

function renderCourseContext(){
  const c=curriculumCtx?.course||{},p=curriculumCtx?.programme||{},cv=curriculumCtx?.curriculum||{},d=curriculumCtx?.description;
  const workingDesc=
    docCtx?.tqf3?.content?.form_sections?.course_description ||
    docCtx?.tqf3?.content?.source_supported_content?.course_description ||
    docCtx?.tqf3?.content?.course_description ||
    '';
  $('#course-title').textContent=(c.course_code||'')+' · '+(c.title_th||'');
  $('#course-subtitle').textContent=(c.title_en||'')+(c.credit_value!=null?' · '+c.credit_value+' หน่วยกิต':'');
  $('#curriculum-title').textContent=p.title_th||'—';
  $('#curriculum-version').textContent=cv.version_label||cv.version_code||'—';
  $('#canonical-desc').value=d?.description_th||workingDesc||'';
  $('#canonical-desc-en').value=d?.description_en||'';
  $('#desc-provenance').innerHTML='';
  if(d){
    setBadge(makeSpan('#desc-provenance'),'CURRICULUM DESCRIPTION','ok');
    setBadge(makeSpan('#desc-provenance'),d.verification_status||'UNKNOWN',kind(d.verification_status));
    setBadge(makeSpan('#desc-provenance'),d.authority_status||'UNKNOWN',kind(d.authority_status));
    if(d.source_reference)setBadge(makeSpan('#desc-provenance'),'Curriculum source connected','ok');
    $('#desc-locator').textContent=(d.source_locator||'ไม่ระบุตำแหน่งแหล่งข้อมูล')+(d.source_reference?' · '+d.source_reference:'');
  }else if(workingDesc){
    setBadge(makeSpan('#desc-provenance'),'WORKING FALLBACK — NON-CANONICAL','warn');
    $('#desc-locator').textContent='ใช้ข้อความจาก Working TQF3 ชั่วคราว โดยยังต้องยืนยันจากเล่มหลักสูตรก่อนถือเป็น canonical description';
  }else if(c.course_code==='HED3701'){
    setBadge(makeSpan('#desc-provenance'),'MISSING CANONICAL DESCRIPTION','warn');
    $('#desc-locator').textContent='HED3701 เป็นรายวิชาเดียวใน scope ปัจจุบันที่ยังไม่มีคำอธิบายที่รับเข้า course_description_versions; ห้ามให้ AI สร้างแทนข้อมูลหลักสูตร';
  }else{
    setBadge(makeSpan('#desc-provenance'),'NEEDS CURRICULUM-SOURCE IMPORT','warn');
    $('#desc-locator').textContent='ยังไม่พบข้อความจากแหล่งหลักสูตรที่ยืนยันได้ ระบบจะไม่สร้างคำอธิบายแทนด้วย AI';
  }
  if($('#source-title'))$('#source-title').textContent=d?.source_reference||'—';
  if($('#source-locator'))$('#source-locator').textContent=d?.source_locator||'—';
  if($('#source-verification'))$('#source-verification').textContent=d?.verification_status||'—';
  if($('#source-authority'))$('#source-authority').textContent=d?.authority_status||'—';
  const offering=docCtx?.course?.course_offering_id;
  $('#offering-note').hidden=!!offering;
  $('#save-tqf3').disabled=!offering;
  $('#save-tqf5').disabled=!offering;
  $('#save-verification-note').disabled=!offering;
  $('#course-offering-id').textContent=offering||'—';
  const canonicalMappings=curriculumCtx?.course_plo_mappings||[];
  const workingMappings=curriculumCtx?.working_clo_plo_mappings||[];
  const sourceBoundPlos=curriculumCtx?.source_bound_programme_plos||[];
  const programmeReviewedCount=workingMappings.filter(x=>x.governance_status==='PROGRAMME_REVIEWED').length;
  const workingCount=workingMappings.filter(x=>x.governance_status==='WORKING').length;
  const proposedCount=workingMappings.filter(x=>x.governance_status==='PROPOSED').length;
  $('#course-plo-source').textContent=canonicalMappings.length
    ?'พบ canonical course→PLO mapping '+canonicalMappings.length+' รายการ'
    :workingMappings.length
      ?programmeReviewedCount===workingMappings.length
        ?'ยังไม่มี canonical course→PLO mapping · working CLO→PLO/I-R-M ผ่าน Programme Review ครบ '+programmeReviewedCount+'/'+workingMappings.length+' รายการ'
        :workingCount
          ?'ยังไม่มี canonical course→PLO mapping · '+workingCount+' รายการอยู่ WORKING และรอ Programme Review'
          :'ยังไม่มี canonical course→PLO mapping · '+proposedCount+' รายการเป็น PROPOSED และรอ Human Academic Review'
      :sourceBoundPlos.length
        ?'พบ PLO จากแหล่งหลักสูตร '+sourceBoundPlos.length+' ข้อ แต่ยังไม่มี course→PLO mapping ที่ผ่านการทบทวน'
        :'ยังไม่พบ canonical course→PLO mapping ใน runtime — ห้ามสร้าง mapping แทนโดยอัตโนมัติ';
  if(curriculumCtx?.credit_pattern?.raw_credit_notation){
    const creditEl=$('#course-credit');
    if(creditEl) creditEl.textContent=curriculumCtx.credit_pattern.raw_credit_notation+
      (curriculumCtx.credit_pattern.verification_status?' · '+curriculumCtx.credit_pattern.verification_status:'');
  }
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
    plo_matrix:fs.plo_matrix||{},
    ai_decisions:Array.isArray(fs.ai_decisions)?fs.ai_decisions:[]
  };
}
function renderCourseResponsibility(){
  const host=$('#course-responsibility-list'),state=$('#course-responsibility-state'),src=$('#course-responsibility-source');
  if(!host||!state)return;
  const rows=courseResponsibilityCtx?.records||[];
  const named=rows.filter(x=>x.display_as_responsible_person);
  const pending=rows.filter(x=>!x.academic_person_id&&(x.team_state==='ROSTER_PENDING'||x.responsibility_type==='ROSTER_PENDING'));
  if(named.length){
    setBadge(state,'CONTROLLED '+named.length,'ok');
    host.innerHTML=named.map(x=>'<div class="responsibility-person"><span><strong>'+esc((x.academic_position_th?x.academic_position_th+' ':'')+(x.person_name_th||''))+'</strong><span class="help">'+esc(x.responsibility_type||'')+'</span></span><span class="meta">'+esc(x.verification_status||'')+'</span></div>').join('')+
      (pending.length?'<div class="notice warn">ยังมี roster บางส่วนรอยืนยัน ไม่เติมชื่อแทนโดยการอนุมาน</div>':'');
    const sources=[...new Set(named.map(x=>x.source_document_id).filter(Boolean))];
    if(src)src.textContent='Controlled source: '+(sources.join(', ')||'—');
  }else if(pending.length){
    setBadge(state,'ROSTER PENDING','warn');
    host.innerHTML='<div class="notice warn">มี controlled responsibility record แบบ roster pending แต่ยังไม่มีชื่อบุคคลที่ยืนยันได้</div>';
    if(src)src.textContent='ระบบจะไม่อนุมานชื่อผู้สอนจากเอกสารหรือความจำ';
  }else{
    setBadge(state,'NO CONTROLLED RECORD','info');
    host.innerHTML='<div>ยังไม่มี controlled responsibility record สำหรับปี/ภาคที่เลือก</div>';
    if(src)src.textContent='ไม่เติมชื่อผู้สอนจาก historical/sample source โดยอัตโนมัติ';
  }
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
  renderCloPloMatrix(f.plo_matrix||{});
  renderWeeklyCoverage();
}
function cloRow(x,i){
  return '<tr>'+
    '<td><input class="t3-clo-code" data-row="'+i+'" value="'+esc(x.code||'')+'"></td>'+
    '<td><textarea class="t3-clo-desc" data-row="'+i+'" placeholder="ผลลัพธ์การเรียนรู้ที่วัดได้">'+esc(x.description||'')+'</textarea>'+aiQuickButtons('clo','.t3-clo-desc[data-row="'+i+'"]',i,['write','check','refine','align'])+'</td>'+
    '<td><input class="t3-clo-plo" data-row="'+i+'" value="'+esc(x.plo||'')+'" placeholder="เช่น PLO2, PLO5"></td>'+
    '<td><button type="button" class="btn small ai clo-ai" data-row="'+i+'">AI วิเคราะห์</button> <button class="icon-btn danger delete-clo" data-row="'+i+'">ลบ</button></td>'+
  '</tr>';
}
function weekRow(x,i){
  return '<tr>'+
    '<td class="week-no">'+esc(x.week??i+1)+'</td>'+
    '<td><textarea class="wk-topic" data-row="'+i+'">'+esc(x.topic||'')+'</textarea></td>'+
    '<td><input class="wk-clo" data-row="'+i+'" value="'+esc(x.clo||'')+'"></td>'+
    '<td><input class="wk-plo" data-row="'+i+'" value="'+esc(x.plo||'')+'"></td>'+
    '<td><textarea class="wk-act" data-row="'+i+'">'+esc(x.activities||'')+'</textarea>'+aiQuickButtons('weekly','.wk-act[data-row="'+i+'"]',i,['write','check','refine','align'])+'</td>'+
    '<td><input class="wk-lec" data-row="'+i+'" type="number" min="0" step=".5" value="'+Number(x.lecture_hours||0)+'"><input class="wk-prac" data-row="'+i+'" type="number" min="0" step=".5" value="'+Number(x.practice_hours||0)+'"><input class="wk-self" data-row="'+i+'" type="number" min="0" step=".5" value="'+Number(x.self_hours||0)+'"></td>'+
    '<td><textarea class="wk-assess" data-row="'+i+'">'+esc(x.assessment||'')+'</textarea></td>'+
    '<td><textarea class="wk-res" data-row="'+i+'">'+esc(x.resources||'')+'</textarea></td>'+
    '<td><button type="button" class="btn small ai week-ai" data-row="'+i+'">AI</button> <button class="icon-btn duplicate-week" data-row="'+i+'">คัดลอก</button> <button class="icon-btn danger delete-week" data-row="'+i+'">ลบ</button></td>'+
  '</tr>';
}
function assessmentRow(x,i){
  return '<tr>'+
    '<td><input class="as-item" data-row="'+i+'" value="'+esc(x.item||'')+'"></td>'+
    '<td><input class="as-method" data-row="'+i+'" value="'+esc(x.method||'')+'"></td>'+
    '<td><input class="as-weight" data-row="'+i+'" type="number" min="0" max="100" step=".01" value="'+Number(x.weight||0)+'"></td>'+
    '<td><input class="as-clo" data-row="'+i+'" value="'+esc(x.clos||'')+'"></td>'+
    '<td><textarea class="as-evidence" data-row="'+i+'">'+esc(x.evidence||'')+'</textarea>'+aiQuickButtons('assessment','.as-evidence[data-row="'+i+'"]',i,['write','check','refine','align'])+'</td>'+
    '<td><button type="button" class="btn small ai assess-ai" data-row="'+i+'">AI</button> <button class="icon-btn danger delete-assessment" data-row="'+i+'">ลบ</button></td>'+
  '</tr>';
}
function bindDynamicButtons(){
  $$('.clo-ai').forEach(b=>b.onclick=()=>runSectionAi('clo',Number(b.dataset.row),b));
  $$('.week-ai').forEach(b=>b.onclick=()=>runSectionAi('weekly',Number(b.dataset.row),b));
  $$('.assess-ai').forEach(b=>b.onclick=()=>runSectionAi('assessment',Number(b.dataset.row),b));
  $$('.delete-clo').forEach(b=>b.onclick=()=>deleteRow('clo',Number(b.dataset.row)));
  $$('.delete-week').forEach(b=>b.onclick=()=>deleteRow('week',Number(b.dataset.row)));
  $$('.duplicate-week').forEach(b=>b.onclick=()=>duplicateWeek(Number(b.dataset.row)));
  $$('.delete-assessment').forEach(b=>b.onclick=()=>deleteRow('assessment',Number(b.dataset.row)));
  $$('.as-weight').forEach(x=>x.oninput=()=>{updateAssessmentTotal();renderWeeklyCoverage();});
  $$('.t3-clo-code,.t3-clo-desc,.t3-clo-plo').forEach(x=>x.addEventListener('input',()=>{renderCloPloMatrix(collectPloMatrix());renderWeeklyCoverage();}));
  $$('.wk-topic,.wk-clo,.wk-plo,.wk-assess').forEach(x=>x.addEventListener('input',renderWeeklyCoverage));
  bindAiFieldButtons();
}
function collectClos(){return $$('.t3-clo-code').map((el,i)=>({code:el.value.trim()||('CLO'+(i+1)),description:$('.t3-clo-desc[data-row="'+i+'"]')?.value.trim()||'',plo:$('.t3-clo-plo[data-row="'+i+'"]')?.value.trim()||''}));}
function collectWeeks(){return $$('.wk-topic').map((el,i)=>({week:i+1,topic:el.value.trim(),clo:$('.wk-clo[data-row="'+i+'"]')?.value.trim()||'',plo:$('.wk-plo[data-row="'+i+'"]')?.value.trim()||'',activities:$('.wk-act[data-row="'+i+'"]')?.value.trim()||'',lecture_hours:Number($('.wk-lec[data-row="'+i+'"]')?.value||0),practice_hours:Number($('.wk-prac[data-row="'+i+'"]')?.value||0),self_hours:Number($('.wk-self[data-row="'+i+'"]')?.value||0),assessment:$('.wk-assess[data-row="'+i+'"]')?.value.trim()||'',resources:$('.wk-res[data-row="'+i+'"]')?.value.trim()||''}));}
function collectAssessments(){return $$('.as-item').map((el,i)=>({item:el.value.trim(),method:$('.as-method[data-row="'+i+'"]')?.value.trim()||'',weight:Number($('.as-weight[data-row="'+i+'"]')?.value||0),clos:$('.as-clo[data-row="'+i+'"]')?.value.trim()||'',evidence:$('.as-evidence[data-row="'+i+'"]')?.value.trim()||''}));}

function matrixKey(clo,plo){return clo+'::'+plo;}
function collectPloMatrix(){
  const out={};
  $$('.irm-cell').forEach(el=>{
    if(el.value)out[matrixKey(el.dataset.clo,el.dataset.plo)]=el.value;
  });
  return out;
}
function renderCloPloMatrix(seed=null){
  const host=$('#clo-plo-matrix');if(!host)return;
  const clos=collectClos();
  const canonicalPlos=(curriculumCtx?.programme_plos||[]).filter(x=>x.statement_th||x.statement_en);
  const sourceBoundPlos=curriculumCtx?.source_bound_programme_plos||[];
  const ploRows=canonicalPlos.length?canonicalPlos:sourceBoundPlos;
  const plos=ploRows.map(x=>x.code).filter(Boolean);
  const proposed=curriculumCtx?.working_clo_plo_mappings||[];
  const proposedSeed={};
  proposed.forEach(x=>{ if(x.clo_code&&x.plo_code&&x.irm_level) proposedSeed[matrixKey(x.clo_code.replace(/^HED2503-CLO-P0?/,'CLO'),x.plo_code)]=x.irm_level; });
  const current=seed&&Object.keys(seed).length?seed:
    Object.keys(collectPloMatrix()).length?collectPloMatrix():proposedSeed;
  const canonical=curriculumCtx?.course_plo_mappings||[];
  const reviewedMappings=proposed.filter(x=>x.governance_status==='PROGRAMME_REVIEWED').length;
  const workingMappingsCount=proposed.filter(x=>x.governance_status==='WORKING').length;
  setBadge('#canonical-mapping-state',
    canonical.length
      ?'Canonical mapping: '+canonical.length+' รายการ'
      :proposed.length
        ?reviewedMappings===proposed.length
          ?'Programme Reviewed: '+reviewedMappings+'/'+proposed.length+' · ยังไม่ใช่ canonical mapping'
          :workingMappingsCount
            ?'Working: '+workingMappingsCount+' รายการ · รอ Programme Review'
            :'Proposed: '+proposed.length+' รายการ · รอ Human Review'
        :ploRows.length
          ?'PLO source-bound: '+ploRows.length+' ข้อ · ยังไม่มี canonical mapping'
          :'Canonical mapping: ไม่พบใน runtime',
    canonical.length||reviewedMappings===proposed.length?'ok':proposed.length?'warn':'info'
  );
  if(!clos.length||!plos.length){
    host.innerHTML='<div class="help">ยังไม่มี CLO หรือ PLO สำหรับสร้าง matrix</div>';return;
  }
  host.innerHTML='<table class="matrix-table"><thead><tr><th>CLO</th>'+
    plos.map(p=>'<th>'+esc(p)+'</th>').join('')+
    '</tr></thead><tbody>'+
    clos.map(c=>'<tr><td><b>'+esc(c.code)+'</b><div class="help">'+esc((c.description||'').slice(0,80))+'</div></td>'+
      plos.map(p=>{
        const val=current[matrixKey(c.code,p)]||'';
        const can=canonical.find(x=>x.plo_code===p);
        return '<td><select class="irm-cell" data-clo="'+esc(c.code)+'" data-plo="'+esc(p)+'">'+
          option('','—',val==='')+option('I','I',val==='I')+option('R','R',val==='R')+option('M','M',val==='M')+
          '</select>'+(can?'<div class="help">Canonical: '+esc(can.irm_level||'mapped')+'</div>':'')+'</td>';
      }).join('')+'</tr>'
    ).join('')+
    '</tbody></table>';
  renderWorkingMappingReview();
  $$('.irm-cell').forEach(el=>el.onchange=()=>{
    syncCloPloTextFromMatrix();
    scheduleLocalSave();
    renderWeeklyCoverage();
  });
}

function normalizedWorkingCloCode(code){
  return String(code||'').replace(/^HED2503-CLO-P0?/,'CLO');
}
function ensureMappingReviewPanel(){
  let panel=$('#working-mapping-review-panel');
  if(panel)return panel;
  const matrix=$('#clo-plo-matrix');
  if(!matrix)return null;
  panel=document.createElement('div');
  panel.id='working-mapping-review-panel';
  panel.className='working-mapping-review-panel';
  matrix.after(panel);
  return panel;
}
async function runWorkingMappingReview(mappingId,action){
  const rows=curriculumCtx?.working_clo_plo_mappings||[];
  const row=rows.find(x=>x.working_mapping_proposal_id===mappingId);
  if(!row)return;
  const label=action==='ACCEPT_WORKING'?'รับ candidate นี้เป็น Working':
    action==='PROGRAMME_REVIEW'?'ยืนยัน Programme Review':
    action==='REJECT'?'Reject candidate':'ดำเนินการ';
  if(!window.confirm(label+'\n\n'+normalizedWorkingCloCode(row.clo_code)+' → '+row.plo_code+' · '+row.irm_level+'\n'+(row.rationale||'')))return;
  setBusy(true,'กำลังบันทึก Human Review…');
  const {error}=await client.rpc('hepe_review_working_mapping',{
    p_working_mapping_proposal_id:mappingId,
    p_action:action,
    p_irm_level:null,
    p_rationale:null
  });
  if(error){setBusy(false);say(friendlyError(error),'danger');return;}
  say('บันทึก Human Review แล้ว กำลังโหลดสถานะล่าสุด…','ok');
  setTimeout(()=>window.location.reload(),450);
}
async function programmeReviewAllWorkingMappings(){
  const rows=(curriculumCtx?.working_clo_plo_mappings||[]).filter(x=>x.governance_status==='WORKING');
  if(!rows.length){say('ไม่มีรายการ WORKING ที่รอ Programme Review','info');return;}
  const summary=rows.map(x=>normalizedWorkingCloCode(x.clo_code)+' → '+x.plo_code+' · '+(x.irm_level||'—')).join('\n');
  if(!window.confirm('Programme Review ทั้ง '+rows.length+' รายการ\n\n'+summary+'\n\nการยืนยันนี้เป็นการตัดสินใจทางวิชาการผ่าน authority gate ของคุณ'))return;
  setBusy(true,'กำลัง Programme Review '+rows.length+' รายการ…');
  const failed=[];
  for(const row of rows){
    const {error}=await client.rpc('hepe_review_working_mapping',{
      p_working_mapping_proposal_id:row.working_mapping_proposal_id,
      p_action:'PROGRAMME_REVIEW',
      p_irm_level:null,
      p_rationale:null
    });
    if(error) failed.push({id:row.working_mapping_proposal_id,message:friendlyError(error)});
  }
  setBusy(false);
  if(failed.length){
    say('Programme Review สำเร็จบางส่วน '+(rows.length-failed.length)+'/'+rows.length+' รายการ · '+failed[0].message,'danger');
  }else{
    say('Programme Review สำเร็จครบ '+rows.length+' รายการ','ok');
  }
  setTimeout(()=>window.location.reload(),650);
}

function renderWorkingMappingReview(){
  const panel=ensureMappingReviewPanel();if(!panel)return;
  const rows=curriculumCtx?.working_clo_plo_mappings||[];
  if(!rows.length){
    panel.innerHTML='<div class="notice info">ยังไม่มี working CLO→PLO/I-R-M candidate สำหรับ Human Review</div>';
    return;
  }
  const reviewed=rows.filter(x=>x.governance_status==='PROGRAMME_REVIEWED').length;
  const workingCount=rows.filter(x=>x.governance_status==='WORKING').length;
  panel.innerHTML=
    '<div class="form-section-header"><div><h4>Human Review · Working CLO→PLO/I-R-M</h4>'+
    '<div class="help">การกดปุ่มด้านล่างเป็นการตัดสินใจทางวิชาการผ่าน authority gate จริง ไม่ใช่การอนุมัติอัตโนมัติของ AI</div></div>'+
    '<span class="badge '+(reviewed===rows.length?'ok':'warn')+'">'+reviewed+'/'+rows.length+' Programme Reviewed</span></div>'+
    (workingCount?'<div class="mapping-review-actions"><button id="programme-review-all" class="mapping-review-action">Programme Review ทั้ง '+workingCount+' รายการ</button></div>':'')+
    '<div class="mapping-review-list">'+rows.map(x=>{
      const status=x.governance_status||'PROPOSED';
      const buttons=status==='PROPOSED'
        ?'<button class="mapping-review-action" data-id="'+esc(x.working_mapping_proposal_id)+'" data-action="ACCEPT_WORKING">รับเป็น Working</button>'+
         '<button class="mapping-review-action secondary" data-id="'+esc(x.working_mapping_proposal_id)+'" data-action="REJECT">Reject</button>'
        :status==='WORKING'
          ?'<button class="mapping-review-action" data-id="'+esc(x.working_mapping_proposal_id)+'" data-action="PROGRAMME_REVIEW">Programme Review</button>'+
           '<button class="mapping-review-action secondary" data-id="'+esc(x.working_mapping_proposal_id)+'" data-action="REJECT">Reject</button>'
          :'';
      return '<div class="mapping-review-card"><div><strong>'+esc(normalizedWorkingCloCode(x.clo_code))+' → '+esc(x.plo_code)+' · '+esc(x.irm_level||'—')+'</strong> '+
        '<span class="badge '+(status==='PROGRAMME_REVIEWED'?'ok':'warn')+'">'+esc(status)+'</span></div>'+
        '<div class="help">'+esc(x.rationale||'')+'</div>'+
        (buttons?'<div class="mapping-review-actions">'+buttons+'</div>':'')+
        '</div>';
    }).join('')+'</div>';
  const allBtn=$('#programme-review-all');
  if(allBtn) allBtn.onclick=()=>programmeReviewAllWorkingMappings().catch(e=>say(friendlyError(e),'danger'));
  $$('.mapping-review-action').filter(btn=>btn.id!=='programme-review-all').forEach(btn=>btn.onclick=()=>runWorkingMappingReview(btn.dataset.id,btn.dataset.action));
}

function syncCloPloTextFromMatrix(){
  const clos=collectClos();
  clos.forEach((c,i)=>{
    const mapped=$$('.irm-cell').filter(el=>el.dataset.clo===c.code&&el.value).map(el=>el.dataset.plo);
    const field=$('.t3-clo-plo[data-row="'+i+'"]');
    if(field&&mapped.length)field.value=mapped.join(', ');
  });
}
function renderWeeklyCoverage(){
  const host=$('#weekly-coverage');if(!host)return;
  const clos=collectClos().map(x=>x.code).filter(Boolean);
  const weeks=collectWeeks();
  if(!clos.length){host.innerHTML='';return;}
  host.innerHTML=clos.map(code=>{
    const taught=weeks.filter(w=>(w.clo||'').split(/[,;\s]+/).includes(code)).length;
    const assessed=weeks.filter(w=>(w.clo||'').split(/[,;\s]+/).includes(code)&&w.assessment).length;
    const cls=taught>0&&assessed>0?'ok':taught>0?'warn':'danger';
    return '<div class="coverage-chip '+cls+'"><strong>'+esc(code)+'</strong><span>สอน '+taught+' · มีหลักฐาน '+assessed+'</span></div>';
  }).join('');
}
function bulkApplyWeeks(overwrite=false){
  const start=Math.max(1,Number($('#bulk-week-start').value||1));
  const end=Math.max(start,Number($('#bulk-week-end').value||start));
  const clo=$('#bulk-week-clo').value.trim(),plo=$('#bulk-week-plo').value.trim();
  for(let i=start-1;i<end;i++){
    const c=$('.wk-clo[data-row="'+i+'"]'),p=$('.wk-plo[data-row="'+i+'"]');
    if(c&&clo&&(overwrite||!c.value.trim()))c.value=clo;
    if(p&&plo&&(overwrite||!p.value.trim()))p.value=plo;
  }
  renderWeeklyCoverage();scheduleLocalSave();
}
function syncTqf5FromTqf3(){
  const existing=new Map($$('.clo-code').map((el,i)=>[el.value.trim(),{
    clo:el.value.trim(),
    target_percent:Number($('.clo-target[data-row="'+i+'"]')?.value||80),
    attainment_percent:Number($('.clo-attain[data-row="'+i+'"]')?.value||0)
  }]));
  const rows=collectClos().map(c=>existing.get(c.code)||{clo:c.code,target_percent:80,attainment_percent:0});
  $('#clo-body').innerHTML=rows.map((x,i)=>'<tr><td><input class="clo-code" data-row="'+i+'" value="'+esc(x.clo||'')+'"></td><td><input class="clo-target" data-row="'+i+'" type="number" value="'+Number(x.target_percent||0)+'"></td><td><input class="clo-attain" data-row="'+i+'" type="number" value="'+Number(x.attainment_percent||0)+'"></td></tr>').join('');
  say('Sync CLO จาก มคอ.3 แล้ว โดยรักษาค่าผลเดิมที่มีรหัส CLO ตรงกัน','ok');
  scheduleLocalSave();renderReadiness();renderTqf5PlanBaseline();
}
function renderTqf5PlanBaseline(){
  const el=$('#tqf5-plan-baseline');if(!el)return;
  const clos=collectClos(),weeks=collectWeeks(),as=collectAssessments();
  const total=as.reduce((sum,x)=>sum+Number(x.weight||0),0);
  el.innerHTML='<strong>Baseline จาก มคอ.3</strong> · CLO '+clos.length+' ข้อ · แผนรายสัปดาห์ '+weeks.filter(x=>x.topic).length+'/'+weeks.length+' แถว · Assessment '+as.length+' รายการ · น้ำหนักรวม '+total.toFixed(2)+'%';
}

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
    plo_matrix:collectPloMatrix(),
    ai_decisions:aiDecisions,
    reuse_lineage:reuseLineage,
    change_rationales:changeRationales,
    ui_version:'v36'
  };
  return base;
}
function deleteRow(type,i){
  if(type==='clo'){const a=collectClos();a.splice(i,1);$('#t3-clo-body').innerHTML=a.map((x,j)=>cloRow(x,j)).join('');}
  if(type==='week'){const a=collectWeeks();a.splice(i,1);a.forEach((x,j)=>x.week=j+1);$('#weekly-body').innerHTML=a.map((x,j)=>weekRow(x,j)).join('');}
  if(type==='assessment'){const a=collectAssessments();a.splice(i,1);$('#assessment-body').innerHTML=a.map((x,j)=>assessmentRow(x,j)).join('');}
  bindDynamicButtons();updateAssessmentTotal();renderCloPloMatrix();renderWeeklyCoverage();renderReadiness();
}
function duplicateWeek(i){const a=collectWeeks();a.splice(i+1,0,clone(a[i]));a.forEach((x,j)=>x.week=j+1);$('#weekly-body').innerHTML=a.map((x,j)=>weekRow(x,j)).join('');bindDynamicButtons();renderWeeklyCoverage();}
function addWeek(){const a=collectWeeks();a.push({week:a.length+1,topic:'',clo:'',plo:'',activities:'',lecture_hours:0,practice_hours:0,self_hours:0,assessment:'',resources:''});$('#weekly-body').innerHTML=a.map((x,j)=>weekRow(x,j)).join('');bindDynamicButtons();renderWeeklyCoverage();}
function addClo(){const a=collectClos();a.push({code:'CLO'+(a.length+1),description:'',plo:''});$('#t3-clo-body').innerHTML=a.map((x,j)=>cloRow(x,j)).join('');bindDynamicButtons();renderCloPloMatrix();renderWeeklyCoverage();}
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
  renderTqf5PlanBaseline();
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
    if(!d){
      if(curriculumCtx?.course?.course_code==='HED3701') out.push(sug('desc-field-route','HED3701 ใช้เส้นทาง มคอ.4/6','ไม่สร้างคำอธิบายรายวิชาด้วย AI ให้ใช้ข้อมูลและแบบฟอร์มจาก field-practicum source เมื่อพัฒนา มคอ.4/6'));
      else out.push(sug('desc-missing','ยังไม่พบคำอธิบายจาก Curriculum Source Registry','ให้ตรวจหรือ import จากเล่มหลักสูตรก่อนใช้ โดยห้าม AI สร้างข้อความแทนต้นฉบับ'));
    } else if(d.authority_status==='CURRICULUM_BOOK_SOURCE_OBSERVED'){
      out.push(sug('desc-source-ok','พบคำอธิบายจากเล่มหลักสูตรแล้ว','ระบบดึงข้อความจาก Curriculum Book Source พร้อม provenance แล้ว ใช้เป็นข้อมูลฐานได้ตามสถานะ SOURCE_TEXT_EXTRACTED; การอนุมัติทางสถาบันยังเป็นคนละขั้นตอน'));
    } else if(d.authority_status!=='AUTHORITATIVE'&&d.authority_status!=='VERIFIED'){
      out.push(sug('desc-authority','คำอธิบายมีแหล่งที่มาแต่ authority ยังต้องตรวจ','ใช้ตาม provenance ที่แสดง และอย่ายกระดับเป็น institutional approval โดยอัตโนมัติ'));
    }
    if(!(curriculumCtx?.course_plo_mappings||[]).length)out.push(sug('plo-map-missing','ยังไม่มี canonical course→PLO mapping','ให้ผู้ใช้กรอก working mapping ได้ แต่ต้องแยกจาก canonical mapping และไม่ให้ AI สร้างแทน'));
  }
  if(section==='clo'){
    const rows=row!=null?[collectClos()[row]]:collectClos();
    rows.forEach((x,i)=>{
      if(!x.description)out.push(sug('clo-empty-'+i,(x.code||'CLO')+' ยังไม่มีข้อความ','เขียนผลลัพธ์การเรียนรู้ที่สังเกตหรือวัดได้',{target:'.t3-clo-desc[data-row="'+(row!=null?row:i)+'"]'}));
      if(x.description&&!/(อธิบาย|วิเคราะห์|ประเมิน|ออกแบบ|ประยุกต์|สาธิต|ปฏิบัติ|สร้าง|เลือก|เสนอ|เปรียบเทียบ|ให้คำปรึกษา)/.test(x.description))out.push(sug('clo-verb-'+i,(x.code||'CLO')+' อาจยังไม่ชัดด้านพฤติกรรม','พิจารณาใช้คำกริยาที่วัดได้และระบุขอบเขต/บริบท'));
      if(!x.plo)out.push(sug('clo-plo-'+i,(x.code||'CLO')+' ยังไม่ระบุ PLO','เชื่อมโยง PLO เฉพาะเมื่อมีเหตุผลจากหลักสูตรหรือการออกแบบรายวิชา',{target:'.t3-clo-plo[data-row="'+(row!=null?row:i)+'"]'}));
    });
  }
  if(section==='weekly'){
    const rows=row!=null?[collectWeeks()[row]]:collectWeeks();
    rows.forEach((x,i)=>{
      const n=row!=null?row+1:x.week;
      if(x.topic&&!x.clo)out.push(sug('wk-clo-'+n,'สัปดาห์ '+n+' มีหัวข้อแต่ยังไม่มี CLO','ระบุ CLO ที่กิจกรรมสัปดาห์นี้สนับสนุน',{target:'.wk-clo[data-row="'+(n-1)+'"]'}));
      if(x.clo&&!x.activities)out.push(sug('wk-act-'+n,'สัปดาห์ '+n+' มี CLO แต่ยังไม่มีกิจกรรม','เพิ่มกิจกรรมที่ทำให้ผู้เรียนแสดงพฤติกรรมตาม CLO',{target:'.wk-act[data-row="'+(n-1)+'"]'}));
      if(x.clo&&!x.assessment)out.push(sug('wk-assess-'+n,'สัปดาห์ '+n+' มี CLO แต่ยังไม่มีการวัด/หลักฐาน','เพิ่ม assessment/evidence ที่สอดคล้องกับ CLO',{target:'.wk-assess[data-row="'+(n-1)+'"]'}));
      if(x.topic&&!x.resources)out.push(sug('wk-res-'+n,'สัปดาห์ '+n+' ยังไม่ระบุสื่อ/แหล่งเรียนรู้','เพิ่มสื่อหรือแหล่งเรียนรู้ที่ใช้จริง'));
    });
    if(!rows.some(x=>x.topic))out.push(sug('wk-empty','แผนรายสัปดาห์ยังว่าง','เริ่มจากหัวข้อหลักของรายวิชาแล้วกระจาย CLO และกิจกรรมตามลำดับการเรียนรู้'));
  }
  if(section==='assessment'){
    const rows=collectAssessments(),total=rows.reduce((s,x)=>s+Number(x.weight||0),0);
    if(Math.abs(total-100)>.01)out.push(sug('as-total','สัดส่วนการประเมินรวม '+total.toFixed(2)+'%','ปรับรายการประเมินให้รวม 100%'));
    rows.forEach((x,i)=>{if(x.item&&!x.clos)out.push(sug('as-clo-'+i,'รายการประเมิน '+(x.item||i+1)+' ยังไม่เชื่อม CLO','ระบุ CLO ที่รายการนี้ใช้เป็นหลักฐาน',{target:'.as-clo[data-row="'+i+'"]'}));if(x.item&&!x.evidence)out.push(sug('as-ev-'+i,'รายการประเมิน '+x.item+' ยังไม่ระบุหลักฐาน/เกณฑ์','เพิ่มหลักฐานหรือ rubric ที่ใช้ตัดสินผล',{target:'.as-evidence[data-row="'+i+'"]'}));});
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
function inferSeverity(id,title){
  const x=(id+' '+title).toLowerCase();
  if(/missing|empty|ไม่พบ|ยังไม่มี|หลักฐานไม่เพียงพอ|รวม .*%/.test(x))return'BLOCKING';
  if(/weak|authority|อาจ|ยังไม่ชัด|candidate|ควร/.test(x))return'WARNING';
  return'SUGGESTION';
}
function sug(id,title,message,opts={}){
  return{
    id,title,message,status:'SUGGESTED',
    severity:opts.severity||inferSeverity(id,title),
    why:opts.why||'ประเด็นนี้อาจกระทบความครบถ้วน ความสอดคล้อง หรือความสามารถในการตรวจสอบย้อนกลับของเอกสาร',
    action:opts.action||message,
    target:opts.target||null,
    action_type:opts.action_type||'CHECK',
    context_ref:opts.context_ref||null
  };
}
function severityRank(sev){return sev==='BLOCKING'?0:sev==='WARNING'?1:sev==='SUGGESTION'?2:3;}
function sortAiSuggestions(list){return (list||[]).slice().sort((a,b)=>severityRank(a.severity)-severityRank(b.severity));}
function fieldValue(target){const el=$(target);return el?.value?.trim?.()||'';}
function courseDescriptionKeywords(){
  const text=(curriculumCtx?.description?.description_th||'').replace(/[(),.]/g,' ').split(/\s+/).map(x=>x.trim()).filter(Boolean);
  const stop=new Set(['และ','หรือ','การ','ของ','ที่','ใน','เพื่อ','โดย','จาก','กับ','เป็น','ผู้เรียน','นักศึกษา','รายวิชา','อย่าง','รวมทั้ง']);
  const words=text.filter(x=>x.length>=3&&!stop.has(x));
  const phrases=[];
  for(let i=0;i<words.length-1;i++){
    if(words[i].length>=4&&words[i+1].length>=4)phrases.push(words[i]+' '+words[i+1]);
  }
  return [...new Set([...phrases,...words])].slice(0,10);
}
function sourceAwareCloScaffold(){
  const terms=courseDescriptionKeywords();
  const topic=terms.length?terms.slice(0,4).join(' / '):'[สาระจากคำอธิบายรายวิชา]';
  return 'ให้นักศึกษาสามารถ [คำกริยาที่วัดได้] '+topic+' ใน [บริบทการเรียนรู้] โดยแสดง [พฤติกรรม/ผลงานที่สังเกตได้]';
}
function sourceAwareWeeklyScaffold(row){
  const w=collectWeeks()[row]||{},clo=w.clo||'[CLO]',topic=w.topic||'[หัวข้อที่ผู้ใช้กำหนด]';
  return 'กิจกรรมสำหรับ “'+topic+'”: ให้ผู้เรียน [ลงมือปฏิบัติ/วิเคราะห์/อภิปรายตามบริบทจริง] เพื่อแสดงพฤติกรรมตาม '+clo+' และเก็บหลักฐาน [ชิ้นงาน/การสังเกต/แบบประเมินที่ใช้จริง]';
}
function sourceAwareAssessmentScaffold(row){
  const a=collectAssessments()[row]||{},method=a.method||'[วิธีประเมินที่กำหนด]',clos=a.clos||'[CLO]';
  return 'หลักฐานจาก '+method+' ที่เชื่อม '+clos+' · ระบุ [ชิ้นงาน/พฤติกรรม/คำตอบที่ตรวจได้] + [เกณฑ์/rubric ที่ใช้งานจริง]';
}
function actualTqf5Problems(){
  return ($('#t5-problems')?.value||'').split('\n').map(x=>x.trim()).filter(Boolean);
}
function cqiScaffoldFromActual(){
  const p=actualTqf5Problems();
  if(!p.length)return null;
  return p.slice(0,3).map((x,i)=>(i+1)+'. ประเด็นจริง: '+x+' | แนวทางปรับปรุงรอบถัดไป: [ผู้ใช้ระบุ] | ช่วงเวลา: [ระบุ] | ตัวชี้วัดติดตาม: [ระบุ]').join('\n');
}
function linkedEvidenceSummary(){
  const linked=evidenceWorkspace?.linked_evidence||[];
  if(!linked.length)return null;
  return linked.slice(0,5).map(x=>(x.title||x.evidence_code||'Evidence')+' ['+(x.evidence_type_code||'')+']'+(x.source_reference?' · '+x.source_reference:'')).join('; ');
}
function weeklySequenceHint(row){
  const weeks=collectWeeks(),cur=weeks[row]||{},prev=weeks[row-1],next=weeks[row+1];
  const parts=[];
  if(prev?.topic)parts.push('ก่อนหน้า: '+prev.topic);
  if(cur?.topic)parts.push('ปัจจุบัน: '+cur.topic);
  if(next?.topic)parts.push('ถัดไป: '+next.topic);
  return parts.length?parts.join(' · '):'ยังไม่มีหัวข้อรอบข้างเพียงพอสำหรับตรวจลำดับ';
}
function assessmentConsistencyHint(row){
  const a=collectAssessments()[row]||{};
  const gaps=[];
  if(a.item&&!a.method)gaps.push('ยังไม่ระบุวิธีประเมิน');
  if(a.item&&!a.clos)gaps.push('ยังไม่เชื่อม CLO');
  if(a.item&&!a.evidence)gaps.push('ยังไม่ระบุ evidence/rubric');
  if(Number(a.weight||0)<=0)gaps.push('น้ำหนักยังเป็น 0');
  return gaps.length?gaps.join(' · '):'รายการนี้มี method/CLO/evidence/weight ครบในระดับโครงสร้าง';
}
function cqiFollowUpHint(){
  const p=actualTqf5Problems(),plan=$('#improvement-plan')?.value.trim()||'';
  if(!p.length)return'ยังไม่มีปัญหาจริงที่ใช้เป็นฐาน CQI';
  if(!plan)return'พบปัญหา '+p.length+' รายการ แต่ยังไม่มี CQI plan';
  return'มีปัญหา '+p.length+' รายการและมี CQI working text แล้ว ควรตรวจ one-to-one linkage';
}
function fieldSuggestion(section,action,target,row=null){
  const value=fieldValue(target),ctx=sectionData(section,row);
  const common={target,action_type:action.toUpperCase(),context_ref:{section,row,target}};
  const mk=(id,title,message,opts={})=>sug(id,title,message,{...common,...opts});

  if(action==='check'){
    const found=sortAiSuggestions(analyze(section,row).filter(x=>!x.target||x.target===target));
    return found.length?found:[mk('field-check-ok','ยังไม่พบช่องว่างสำคัญในช่องนี้','ตรวจสอบความถูกต้องทางวิชาการและหลักฐานอีกครั้งก่อนส่ง',{severity:'SUGGESTION'})];
  }

  if(section==='clo'){
    if(action==='write')return[mk('field-write-clo','ร่าง CLO แบบวัดได้',
      value||sourceAwareCloScaffold(),
      {severity:'SUGGESTION',why:'CLO ควรระบุพฤติกรรมที่สังเกตหรือประเมินได้ โดยยังต้องให้ผู้ใช้เติมสาระจริงจากรายวิชา'})];
    if(action==='refine')return[mk('field-refine-clo','ปรับ CLO ให้ชัดขึ้น',
      value||'เติมข้อความ CLO ก่อน แล้วใช้กรอบ: คำกริยาที่วัดได้ + เนื้อหา/ทักษะ + บริบท + เกณฑ์',
      {severity:value?'WARNING':'BLOCKING',why:'ระบบจะไม่สร้างสาระรายวิชาที่ไม่มีหลักฐาน แต่ช่วยจัดโครงข้อความให้ชัดเจนได้'})];
    if(action==='align')return sortAiSuggestions(analyze('clo',row));
  }
  if(section==='weekly'){
    const week=collectWeeks()[row]||{};
    if(action==='write')return[mk('field-write-week','ร่างกิจกรรมให้สอดคล้องกับ CLO',
      value||sourceAwareWeeklyScaffold(row),
      {severity:'SUGGESTION',why:'ใช้ CLO และข้อมูลสัปดาห์ที่ผู้ใช้กรอกเป็นบริบท โดยยังไม่สมมติวิธีสอนจริง'})];
    if(action==='refine')return[mk('field-refine-week','ปรับกิจกรรมให้ตรวจสอบได้',
      value||'ระบุว่า “ผู้เรียนทำอะไร” “เพื่อ CLO ใด” และ “มีหลักฐานอะไร”',
      {severity:value?'WARNING':'BLOCKING'})];
    if(action==='align')return[mk('field-align-week','ตรวจลำดับและความสอดคล้องรายสัปดาห์',weeklySequenceHint(row)+' · ตรวจต่อว่า Topic → CLO → Activity → Evidence เชื่อมกัน',{severity:'WARNING',why:'ใช้เฉพาะหัวข้อสัปดาห์ที่ผู้ใช้กรอกแล้ว ไม่สร้างลำดับเนื้อหาใหม่'})].concat(sortAiSuggestions(analyze('weekly',row)));
  }
  if(section==='assessment'){
    const a=collectAssessments()[row]||{};
    if(action==='write')return[mk('field-write-assessment','ร่างหลักฐาน/เกณฑ์การประเมิน',
      value||sourceAwareAssessmentScaffold(row),
      {severity:'SUGGESTION',why:'ช่วยจัดรูปแบบ evidence–criterion โดยไม่สร้างคะแนนหรือ rubric ที่ไม่ได้กำหนดจริง'})];
    if(action==='refine')return[mk('field-refine-assessment','ปรับหลักฐานให้ตรวจสอบย้อนกลับได้',
      value||'ระบุหลักฐานที่ใช้จริง + เกณฑ์/rubric + CLO ที่รายการนี้สนับสนุน',
      {severity:value?'WARNING':'BLOCKING'})];
    if(action==='align')return[mk('field-align-assessment','ตรวจ consistency ของรายการประเมิน',assessmentConsistencyHint(row),{severity:assessmentConsistencyHint(row).includes('ครบ')?'SUGGESTION':'WARNING',why:'ตรวจโครงสร้าง method–CLO–evidence–weight จากค่าที่ผู้ใช้กรอก'})].concat(sortAiSuggestions(analyze('assessment',row)));
  }
  if(section==='tqf5'){
    if(target==='#t5-problems'){
      return[mk('field-write-t5-problem','โครงบันทึกปัญหาที่เกิดขึ้นจริง',
        value||'[ปัญหาที่เกิดขึ้นจริง] → [หลักฐาน/ข้อมูลที่พบ] → [ผลกระทบต่อการเรียนรู้หรือการดำเนินงาน]',
        {severity:'SUGGESTION',why:'ห้ามสร้างเหตุการณ์ขึ้นเอง ผู้ใช้ต้องแทน placeholder ด้วยสิ่งที่เกิดขึ้นจริง'})];
    }
    if(target==='#improvement-plan'){
      const scaffold=cqiScaffoldFromActual();
      if(!scaffold)return[mk('field-cqi-no-source','ยังไม่พบปัญหาที่เกิดขึ้นจริงสำหรับสร้าง CQI','กรอก “ปัญหา/ประเด็นที่พบ” จากผลจริงก่อน แล้วจึงให้ AI ช่วยจัดโครง CQI',{severity:'BLOCKING',why:'CQI ต้องย้อนกลับไปยังปัญหาหรือผลจริง ห้ามสร้างประเด็นขึ้นเอง'})];
      return[mk('field-write-cqi','โครง CQI จากปัญหาที่ผู้ใช้กรอกจริง',value||scaffold,{severity:'SUGGESTION',why:'ข้อเสนอใช้เฉพาะข้อความปัญหาที่มีอยู่ใน Working TQF5 และเว้นส่วนการตัดสินใจให้ผู้ใช้',action:'สถานะติดตาม: '+cqiFollowUpHint()})];
    }
    if(target==='#t5-plan-actual'){
      return[mk('field-write-planactual','โครง Plan → Actual',
        value||'แผนเดิม: [สิ่งที่วางไว้] · ดำเนินการจริง: [สิ่งที่เกิดขึ้นจริง] · ความแตกต่าง: [ถ้ามี] · เหตุผล/หลักฐาน: [แหล่งข้อมูล]',
        {severity:'SUGGESTION'})];
    }
    return sortAiSuggestions(analyze('tqf5',null));
  }
  if(section==='verification'){
    const evidence=linkedEvidenceSummary();
    if(!evidence)return[mk('field-verification-no-linked','ยังไม่มี linked controlled evidence สำหรับร่างข้อค้นพบ','ลงทะเบียน candidate ได้ แต่การร่างข้อค้นพบเชิงยืนยันควรอิง linked/admitted evidence เท่านั้น',{severity:'BLOCKING',why:'Candidate evidence ยังไม่ใช่ admitted/linked evidence'})];
    return[mk('field-write-verification','โครงข้อค้นพบจาก linked evidence',
      value||('หลักฐานที่เชื่อมแล้ว: '+evidence+' · ข้อค้นพบที่หลักฐานรองรับ: [ผู้ใช้สรุป] · ช่องว่าง: [ถ้ามี] · สถานะ: [ยังไม่สรุป VERIFIED หาก Evidence Gate ไม่ผ่าน]'),
      {severity:'SUGGESTION',why:'ข้อความฐานมาจาก linked controlled evidence เท่านั้น; การตีความและสถานะสุดท้ายเป็นการตัดสินใจของผู้ใช้'})];
  }
  if(section==='overview'){
    return[mk('field-write-overview','โครงข้อความสำหรับส่วนนี้',
      value||'[ข้อมูล/ทรัพยากรที่ใช้จริง] → [เหตุผลที่เกี่ยวข้อง] → [แนวทางปรับปรุงที่มีที่มา]',
      {severity:'SUGGESTION'})];
  }
  return sortAiSuggestions(analyze(section,row));
}
function runFieldAi(button){
  const section=button.dataset.section,action=button.dataset.action,target=button.dataset.target,row=button.dataset.row===''||button.dataset.row==null?null:Number(button.dataset.row);
  activeAiSection=section;
  aiSuggestions=sortAiSuggestions(fieldSuggestion(section,action,target,row));
  aiSectionRuns[section]={at:new Date().toISOString(),count:aiSuggestions.length,row,action,target};
  aiSectionSuggestionCache[section]=aiSuggestions;
  renderAiRail();
  renderInlineAi(section,row,button);
  const panel=findInlinePanel(section,button);
  if(panel){panel.dataset.fieldTarget=target;panel.dataset.actionType=action.toUpperCase();}
}
function aiFieldStatus(target){
  const v=fieldValue(target);
  if(!v)return{label:'ว่าง',kind:'info'};
  const accepted=aiDecisions.some(x=>x.target===target&&['ACCEPTED','EDITED_AND_ACCEPTED'].includes(x.decision));
  if(accepted)return{label:'ตรวจแล้ว',kind:'ok'};
  return{label:'ยังไม่ตรวจ',kind:'warn'};
}
function aiQuickButtons(section,target,row=null,actions=['write','check','refine']){
  const label={write:'ช่วยเขียน',check:'ตรวจ',refine:'ปรับข้อความ',align:'ตรวจความสอดคล้อง'};
  const visible=fieldValue(target)?(actions.includes('check')?'check':actions[0]):(actions.includes('write')?'write':actions[0]);
  const more=actions.filter(x=>x!==visible),st=aiFieldStatus(target);
  const main='<button type="button" class="btn tiny ai ai-field ai-field-primary" data-section="'+esc(section)+'" data-action="'+visible+'" data-target="'+esc(target)+'" data-row="'+(row==null?'':row)+'">'+label[visible]+'</button>';
  const status='<span class="badge '+st.kind+' ai-field-state" data-ai-field-state="'+esc(target)+'">'+st.label+'</span>';
  if(!more.length)return '<span class="ai-field-actions compact">'+main+status+'</span>';
  const menu='<details class="ai-field-menu"><summary class="btn tiny">AI เพิ่มเติม</summary><div class="ai-field-menu-pop">'+more.map(x=>'<button type="button" class="btn tiny ai ai-field" data-section="'+esc(section)+'" data-action="'+x+'" data-target="'+esc(target)+'" data-row="'+(row==null?'':row)+'">'+label[x]+'</button>').join('')+'</div></details>';
  return '<span class="ai-field-actions compact">'+main+status+menu+'</span>';
}

function refreshAiFieldStates(){
  $$('[data-ai-field-state]').forEach(el=>{
    const st=aiFieldStatus(el.dataset.aiFieldState);
    setBadge(el,st.label,st.kind);
  });
}
function bindAiFieldButtons(){
  $$('.ai-field-menu').forEach(menu=>menu.addEventListener('toggle',()=>{
    if(!menu.open)return;
    $$('.ai-field-menu').forEach(other=>{if(other!==menu)other.open=false;});
  }));
  $$('.ai-field').forEach(b=>b.onclick=()=>{
    const menu=b.closest('details.ai-field-menu');
    runFieldAi(b);
    if(menu)menu.open=false;
    refreshAiFieldStates();
  });
}
function inlineContextHtml(section,row,target){
  const c=curriculumCtx?.course||{},d=curriculumCtx?.description||{};
  let specific='';
  if(section==='clo'){const x=collectClos()[row??0]||{};specific='CLO: '+(x.code||'—')+' · '+(x.description||'ยังไม่มีข้อความ')+' · PLO: '+(x.plo||'—');}
  if(section==='weekly'){const x=collectWeeks()[row??0]||{};specific='Week '+(x.week||'—')+' · Topic: '+(x.topic||'—')+' · CLO: '+(x.clo||'—')+' · PLO: '+(x.plo||'—');}
  if(section==='assessment'){const x=collectAssessments()[row??0]||{};specific='Assessment: '+(x.item||'—')+' · CLO: '+(x.clos||'—')+' · Weight: '+Number(x.weight||0)+'%';}
  if(section==='tqf5')specific='TQF5 source: '+(docCtx?.tqf5?.source_status||'UNVERIFIED / NO RECORD');
  if(section==='verification')specific='Verification: '+(docCtx?.verification?.status||'NO RECORD')+' · Linked evidence '+((evidenceWorkspace?.linked_evidence||[]).length)+' · Candidates '+((evidenceWorkspace?.candidates||[]).length);
  return '<div><b>รายวิชา:</b> '+esc((c.course_code||'')+' '+(c.title_th||''))+'</div>'+
    '<div><b>Course description source:</b> '+esc(d.source_reference||'—')+'</div>'+
    '<div><b>Locator:</b> '+esc(d.source_locator||'—')+'</div>'+
    '<div><b>Authority:</b> '+esc(d.authority_status||'—')+'</div>'+
    (specific?'<div><b>บริบทส่วนนี้:</b> '+esc(specific)+'</div>':'')+
    (target?'<div><b>Target:</b> '+esc(target)+'</div>':'');
}
function ensureInlineV33(panel){
  if(!panel||panel.dataset.v33Enhanced==='true')return;
  panel.dataset.v33Enhanced='true';
  const head=panel.querySelector('.ai-inline-head');
  if(head){
    const tools=document.createElement('div');
    tools.className='ai-inline-v33-tools';
    tools.innerHTML='<button type="button" class="btn tiny ai-gap-toggle">Gap-first</button><button type="button" class="btn tiny ai-next-gap">ไปจุดถัดไป</button>';
    head.appendChild(tools);
  }
  const selected=panel.querySelector('.ai-inline-selected-wrap');
  if(selected){
    const diff=document.createElement('div');diff.className='ai-diff-preview';diff.innerHTML='<div class="help">Diff preview จะแสดงเมื่อเลือกข้อเสนอ</div>';selected.after(diff);
    const ctx=document.createElement('details');ctx.className='ai-context-mini';ctx.innerHTML='<summary>บริบทที่ AI ใช้</summary><div class="ai-context-mini-body"></div>';diff.after(ctx);
  }
  panel.querySelector('.ai-gap-toggle')?.addEventListener('click',()=>{panel.dataset.showAll=panel.dataset.showAll==='true'?'false':'true';renderInlineAi(panel.dataset.section,panel.dataset.row===''?null:Number(panel.dataset.row),null,panel,Number(panel.dataset.selectedIndex||0));});
  panel.querySelector('.ai-next-gap')?.addEventListener('click',()=>goToNextGap(panel.dataset.target||null));
}
function filteredInlineSuggestions(section,panel){
  const all=sortAiSuggestions(inlineSuggestionList(section));
  const gaps=all.filter(x=>x.severity==='BLOCKING'||x.severity==='WARNING');
  if(panel?.dataset.showAll==='true'||!gaps.length)return all;
  return gaps;
}
function simpleDiffHtml(oldText,newText){
  const a=String(oldText||'').split(/(\s+)/),b=String(newText||'').split(/(\s+)/);
  let p=0;while(p<a.length&&p<b.length&&a[p]===b[p])p++;
  let sa=a.length-1,sb=b.length-1;while(sa>=p&&sb>=p&&a[sa]===b[sb]){sa--;sb--;}
  const pre=esc(a.slice(0,p).join('')),oldMid=esc(a.slice(p,sa+1).join('')),newMid=esc(b.slice(p,sb+1).join('')),post=esc(a.slice(sa+1).join(''));
  return '<div class="diff-line"><small>เดิม</small><div>'+pre+(oldMid?'<del>'+oldMid+'</del>':'')+post+'</div></div>'+
    '<div class="diff-line"><small>เสนอ</small><div>'+pre+(newMid?'<ins>'+newMid+'</ins>':'')+post+'</div></div>';
}
function renderInlineDiff(panel){
  const diff=panel.querySelector('.ai-diff-preview');if(!diff)return;
  const ta=panel.querySelector('[data-ai-inline-selected]'),target=panel.dataset.target?$(panel.dataset.target):null;
  const oldText=target?.value||'',newText=ta?.value||'';
  diff.innerHTML=panel.dataset.target?simpleDiffHtml(oldText,newText):'<div class="help">ข้อเสนอนี้ไม่มี target field จึงไม่มี replacement diff</div>';
}
function updateInlineContextV33(panel){
  ensureInlineV33(panel);
  const body=panel.querySelector('.ai-context-mini-body');
  if(body)body.innerHTML=inlineContextHtml(panel.dataset.section,panel.dataset.row===''?null:Number(panel.dataset.row),panel.dataset.target||'');
  const toggle=panel.querySelector('.ai-gap-toggle');
  if(toggle)toggle.textContent=panel.dataset.showAll==='true'?'แสดงเฉพาะ Gap':'ดูทั้งหมด';
  renderInlineDiff(panel);
}
function completionState(section){
  if(section==='clo'){
    const c=collectClos(),started=$('#t3-objectives')?.value.trim()||c.some(x=>x.description||x.plo);
    if(!started)return'NOT_STARTED';
    if(c.length&&c.every(x=>x.description&&x.plo))return'READY_FOR_INTERNAL_REVIEW';
    return c.some(x=>!x.description)?'NEEDS_REVIEW':'IN_PROGRESS';
  }
  if(section==='weekly'){
    const w=collectWeeks(),filled=w.filter(x=>x.topic);
    if(!filled.length)return'NOT_STARTED';
    return filled.every(x=>x.clo&&x.activities&&x.assessment)?'READY_FOR_INTERNAL_REVIEW':'NEEDS_REVIEW';
  }
  if(section==='assessment'){
    const a=collectAssessments(),total=a.reduce((n,x)=>n+Number(x.weight||0),0);
    if(!a.some(x=>x.item))return'NOT_STARTED';
    return Math.abs(total-100)<.01&&a.filter(x=>x.item).every(x=>x.clos&&x.evidence)?'READY_FOR_INTERNAL_REVIEW':'NEEDS_REVIEW';
  }
  if(section==='overview'){
    const r=$('#t3-resources')?.value.trim(),i=$('#t3-improvement')?.value.trim();
    if(!r&&!i)return'NOT_STARTED';return r&&i?'READY_FOR_INTERNAL_REVIEW':'IN_PROGRESS';
  }
  if(section==='tqf5'){
    const t=collectTqf5(),started=t.general_information?.registered_students!=null||t.plan_actual?.summary||(t.issues?.course_problems||[]).length;
    if(!started)return'NOT_STARTED';
    return t.plan_actual?.summary&&(t.results?.clo_attainment||[]).length?'READY_FOR_INTERNAL_REVIEW':'NEEDS_REVIEW';
  }
  if(section==='verification'){
    const linked=(evidenceWorkspace?.linked_evidence||[]).length,cand=(evidenceWorkspace?.candidates||[]).length;
    if(!docCtx?.verification&&!linked&&!cand)return'NOT_STARTED';
    return docCtx?.verification?.status==='VERIFIED'?'READY_FOR_INTERNAL_REVIEW':'NEEDS_REVIEW';
  }
  return'IN_PROGRESS';
}
function renderSectionCompletionV33(){
  $$('[data-ai-inline-section]').forEach(panel=>{
    const section=panel.dataset.aiInlineSection||panel.getAttribute('data-ai-inline-section'),owner=panel.closest('.form-section'),header=owner?.querySelector('.form-section-header');
    if(!header)return;
    let badge=header.querySelector('[data-section-completion]');
    if(!badge){badge=document.createElement('span');badge.dataset.sectionCompletion=section;badge.className='badge section-completion';header.appendChild(badge);}
    const state=completionState(section);setBadge(badge,state,state==='READY_FOR_INTERNAL_REVIEW'?'ok':state==='NEEDS_REVIEW'?'warn':'info');
  });
}
function readinessGapList(){
  const rank={BLOCKING:0,WARNING:1,INFO:2};
  return readinessState().checks.filter(x=>x.state!=='PASS'&&x.target).slice().sort((a,b)=>(rank[a.state]??3)-(rank[b.state]??3));
}
function goToNextGap(currentTarget=null){
  const gaps=readinessGapList();if(!gaps.length){say('ไม่พบ BLOCKING/WARNING ที่มีจุดแก้ใน readiness ปัจจุบัน','ok');return;}
  let i=currentTarget?gaps.findIndex(x=>x.target===currentTarget):-1;i=(i+1)%gaps.length;
  jumpToReadinessTarget(gaps[i].target);say('ไปยัง '+gaps[i].name+' — '+gaps[i].state,'info');
}
function ensureReviewQueueV33(){
  let host=$('#review-queue-v33');if(host)return host;
  const readiness=$('.readiness');if(!readiness)return null;
  host=document.createElement('div');host.id='review-queue-v33';host.className='review-queue-v33';
  readiness.after(host);return host;
}
function reviewQueueGroup(x){
  const t=x.target||'';
  if(/verification|evidence/.test(t))return'VERIFICATION';
  if(/t5-|clo-body/.test(t)&&activeTab==='tqf5')return'TQF5';
  if(/t3-|weekly|assessment/.test(t))return'TQF3';
  return'GENERAL';
}
function filteredReviewQueue(){
  const all=readinessGapList().map(x=>({...x,group:reviewQueueGroup(x)}));
  if(reviewQueueFilter==='ALL')return all;
  if(reviewQueueFilter==='BLOCKING'||reviewQueueFilter==='WARNING')return all.filter(x=>x.state===reviewQueueFilter);
  if(reviewQueueFilter==='UNRESOLVED_AI'){
    const unresolved=unresolvedAiTrail();
    return unresolved.map((x,i)=>({name:x.title,state:x.severity==='BLOCKING'?'BLOCKING':'WARNING',detail:x.message,target:x.target||'#ai-suggestions',group:'AI',ai_index:i}));
  }
  if(reviewQueueFilter==='EVIDENCE')return all.filter(x=>x.category==='EVIDENCE'||x.group==='VERIFICATION'||/หลักฐาน|evidence/i.test(x.name+' '+x.detail));
  return all.filter(x=>x.group===reviewQueueFilter);
}
function reviewSectionProgress(){
  const sections=['clo','weekly','assessment','overview','tqf5','verification'];
  const out={};
  sections.forEach(x=>out[x]=completionState(x));
  return out;
}
function reviewTargetContext(x){
  if(!x)return'';
  const el=x.target?$(x.target):null;
  const value=el?.value?.trim?.()||'';
  return value?('ค่าปัจจุบัน: '+value.slice(0,220)):'ช่องเป้าหมายยังว่างหรือไม่มี text value';
}
function renderReviewQueueV33(){
  const host=ensureReviewQueueV33();if(!host)return;
  const all=readinessGapList(),items=filteredReviewQueue(),progress=reviewSectionProgress();
  const blocking=all.filter(x=>x.state==='BLOCKING').length,warnings=all.filter(x=>x.state==='WARNING').length;
  if(!all.length&&reviewQueueFilter!=='UNRESOLVED_AI'){host.innerHTML='<div class="notice ok">Review Queue: ไม่พบ BLOCKING/WARNING ที่มี target</div>';return;}
  reviewQueueIndex=Math.max(0,Math.min(reviewQueueIndex,Math.max(items.length-1,0)));
  const x=items[reviewQueueIndex];
  host.innerHTML='<div class="section-title"><div><h3>Review Queue Mode</h3><div class="help">Remaining '+all.length+' · BLOCKING '+blocking+' · WARNING '+warnings+' · แก้จากความเสี่ยงสูงก่อน</div></div>'+
    '<select id="rq-filter"><option value="ALL">ทั้งหมด</option><option value="BLOCKING">BLOCKING</option><option value="WARNING">WARNING</option><option value="UNRESOLVED_AI">Unresolved AI</option><option value="EVIDENCE">Evidence gaps</option><option value="TQF3">TQF3</option><option value="TQF5">TQF5</option><option value="VERIFICATION">Verification</option></select></div>'+
    '<div class="rq-section-progress">'+Object.entries(progress).map(([k,v])=>'<span class="badge '+(v==='READY_FOR_INTERNAL_REVIEW'?'ok':v==='NEEDS_REVIEW'?'warn':'info')+'">'+esc(k)+' · '+esc(v)+'</span>').join('')+'</div>'+
    (x?'<div class="review-queue-item"><div class="actions"><span class="badge '+(x.state==='BLOCKING'?'danger':'warn')+'">'+esc(x.state)+'</span><span class="badge info">'+esc(x.group||'AI')+'</span><span class="badge info">'+(reviewQueueIndex+1)+' / '+items.length+'</span></div><strong>'+esc(x.name)+'</strong><div>'+esc(x.detail)+'</div><div class="rq-context">'+esc(reviewTargetContext(x))+'</div></div>'+
    '<div class="actions"><button type="button" class="btn small" id="rq-prev">ก่อนหน้า</button><button type="button" class="btn small primary" id="rq-jump">ไปแก้จุดนี้</button><button type="button" class="btn small good" id="rq-resolve-next">ตรวจซ้ำแล้วไปข้อถัดไป</button><button type="button" class="btn small" id="rq-next">ถัดไป</button></div><div class="help">Keyboard: Alt+← ก่อนหน้า · Alt+→ ถัดไป</div>':'<div class="notice info">ไม่มีรายการตามตัวกรอง</div>');
  $('#rq-filter').value=reviewQueueFilter;
  $('#rq-filter').onchange=e=>{reviewQueueFilter=e.target.value;reviewQueueIndex=0;renderReviewQueueV33();};
  if(!x)return;
  $('#rq-prev').onclick=()=>{reviewQueueIndex=(reviewQueueIndex-1+items.length)%items.length;renderReviewQueueV33();};
  $('#rq-next').onclick=()=>{reviewQueueIndex=(reviewQueueIndex+1)%items.length;renderReviewQueueV33();};
  $('#rq-jump').onclick=()=>jumpToReadinessTarget(x.target);
  $('#rq-resolve-next').onclick=()=>{
    const target=x.target;renderReadiness();const fresh=filteredReviewQueue();
    if(target&&fresh.some(y=>y.target===target)){say('รายการนี้ยังไม่ผ่าน readiness — กรุณาแก้ข้อมูลก่อน','warn');jumpToReadinessTarget(target);return;}
    say('รายการเดิมผ่านแล้ว ไปข้อถัดไป','ok');reviewQueueIndex=Math.min(reviewQueueIndex,Math.max(fresh.length-1,0));renderReviewQueueV33();const n=fresh[reviewQueueIndex];if(n?.target)jumpToReadinessTarget(n.target);
  };
}

function ensureReuseUpdateV33(){
  let host=$('#reuse-update-v33');if(host)return host;
  const diff=$('#version-diff');if(!diff)return null;
  host=document.createElement('div');host.id='reuse-update-v33';host.className='reuse-update-v33';diff.after(host);return host;
}
function priorWorkingVersion(){
  const current=Number(docCtx?.tqf3?.current_version_no||0);
  return versionHistory.filter(x=>Number(x.version_no)<current).sort((a,b)=>Number(b.version_no)-Number(a.version_no))[0]||null;
}
function priorFieldValue(prev,key){return prev?.content?.form_sections?.[key]||'';}
function reuseFieldCompareHtml(prev){
  const defs=[['วัตถุประสงค์','objectives','#t3-objectives'],['ทรัพยากร/สื่อ','resources','#t3-resources'],['แนวทางปรับปรุง','improvement_notes','#t3-improvement']];
  return defs.map(([label,key,sel])=>'<div class="reuse-field-row"><strong>'+label+'</strong>'+simpleDiffHtml(priorFieldValue(prev,key),$(sel)?.value||'')+'</div>').join('');
}
function cqiMappingHtml(){
  const rows=[];
  (cqiContext?.prior_tqf5||[]).forEach(x=>(Array.isArray(x.improvement_plan)?x.improvement_plan:[]).forEach(y=>rows.push({source:'TQF5 '+x.academic_year+'/'+x.term_code,text:typeof y==='string'?y:(y.action||JSON.stringify(y))})));
  (cqiContext?.improvement_items||[]).forEach(x=>rows.push({source:x.source_reference||x.source_kind||'Improvement item',text:x.recommendation_text||x.action_plan_text||x.issue_text||''}));
  return rows.length?rows.slice(0,8).map((x,i)=>'<div class="cqi-map-row"><div><b>'+esc(x.source)+'</b><div>'+esc(x.text)+'</div></div><button type="button" class="btn tiny cqi-map-review" data-i="'+i+'">พิจารณา</button></div>').join(''):'<div class="help">ยังไม่มี CQI source สำหรับ mapping ไปยังช่องปรับปรุง</div>';
}
function renderReuseUpdateV33(){
  const host=ensureReuseUpdateV33();if(!host)return;
  const prev=priorWorkingVersion(),cqi=(cqiContext?.prior_tqf5||[]).length+(cqiContext?.improvement_items||[]).length;
  if(!prev){host.innerHTML='<div class="help">Reuse → Update: ยังไม่มี prior working version ที่เก่ากว่าฉบับปัจจุบัน</div>';return;}
  host.innerHTML='<div class="section-title"><div><h4>Reuse → Update Assistant</h4><div class="help">ฐาน: Working Version '+esc(prev.version_no)+' · CQI sources '+cqi+' · ทุก carry-forward ต้องให้ผู้ใช้เลือก</div></div><span class="badge info">USER DECIDES</span></div>'+
    '<details class="reuse-compare"><summary>เปรียบเทียบช่องสำคัญกับ Version '+esc(prev.version_no)+'</summary>'+reuseFieldCompareHtml(prev)+'</details>'+
    '<details class="reuse-cqi"><summary>CQI → ช่องที่ควรพิจารณาปรับ</summary><div id="reuse-cqi-map">'+cqiMappingHtml()+'</div></details>'+
    '<div class="field reuse-rationale-field"><label for="reuse-rationale-v36">เหตุผลสั้น ๆ หากเลือก carry-forward จาก prior version</label><input id="reuse-rationale-v36" placeholder="เช่น คงสาระเดิมและเติมเฉพาะช่องว่างจากฉบับก่อน"><div class="help">จำเป็นเฉพาะเมื่อกด เติมเฉพาะช่องว่าง</div></div><div class="actions"><button type="button" class="btn small" data-reuse-action="KEEP">คงฉบับปัจจุบัน</button><button type="button" class="btn small primary" data-reuse-action="UPDATE">เติมเฉพาะช่องว่างจาก Version '+esc(prev.version_no)+'</button><button type="button" class="btn small" data-reuse-action="REWRITE">เริ่มทบทวนจาก Gap แรก</button></div>'+
    '<div id="reuse-update-result" class="help"></div>';
  $$('[data-reuse-action]').forEach(b=>b.onclick=()=>applyReuseDecisionV33(b.dataset.reuseAction,prev));
  $$('.cqi-map-review').forEach(b=>b.onclick=()=>{setTab('tqf3');setTimeout(()=>$('#t3-improvement')?.scrollIntoView({behavior:'smooth',block:'center'}),70);say('เปิดช่องแนวทางปรับปรุงเพื่อพิจารณา CQI ด้วยตนเอง','info');});
}
function applyReuseDecisionV33(action,prev){
  const result=$('#reuse-update-result');
  const rationale=$('#reuse-rationale-v36')?.value.trim()||'';
  if(action==='UPDATE'&&!rationale){say('กรุณาระบุเหตุผลสั้น ๆ ก่อน carry-forward เนื้อหาจาก prior version','warn');$('#reuse-rationale-v36')?.focus();return;}
  if(action==='KEEP'){
    reuseLineage.push({action:'KEEP',source_version:prev.version_no,target_version:docCtx?.tqf3?.current_version_no,at:new Date().toISOString()});
    aiDecisions.push({document:'TQF3',section:'REUSE_UPDATE',suggestion_id:'KEEP_CURRENT',decision:'ACCEPTED',text:'Keep current working content',source_basis:'Working Version '+prev.version_no,working_version:docCtx?.tqf3?.current_version_no,rationale:'User chose to keep current working content',decided_at:new Date().toISOString()});
    if(result)result.textContent='คงฉบับปัจจุบัน ไม่มีการเปลี่ยนช่องข้อมูล';return;
  }
  if(action==='REWRITE'){
    reuseLineage.push({action:'REVIEW_FROM_GAP',source_version:prev.version_no,target_version:docCtx?.tqf3?.current_version_no,at:new Date().toISOString()});
    aiDecisions.push({document:'TQF3',section:'REUSE_UPDATE',suggestion_id:'REVIEW_FROM_GAP',decision:'ACCEPTED',text:'Start review from first readiness gap',source_basis:'Working Version '+prev.version_no,working_version:docCtx?.tqf3?.current_version_no,rationale:'User chose gap-first review instead of carry-forward',decided_at:new Date().toISOString()});
    goToNextGap(null);if(result)result.textContent='เริ่มทบทวนจาก Gap แรกแล้ว';return;
  }
  const fs=prev.content?.form_sections||{};let filled=0,fields=[];
  const fill=(sel,val,key)=>{const el=$(sel);if(el&&!el.value.trim()&&val){el.value=val;el.dispatchEvent(new Event('input',{bubbles:true}));filled++;fields.push(key);}};
  fill('#t3-objectives',fs.objectives,'objectives');fill('#t3-resources',fs.resources,'resources');fill('#t3-improvement',fs.improvement_notes,'improvement_notes');
  reuseLineage.push({action:'FILL_BLANKS',source_version:prev.version_no,target_version:docCtx?.tqf3?.current_version_no,fields,rationale,at:new Date().toISOString()});
  changeRationales.push({kind:'REUSE_UPDATE',source_version:prev.version_no,target_version:docCtx?.tqf3?.current_version_no,fields,rationale,at:new Date().toISOString()});
  aiDecisions.push({document:'TQF3',section:'REUSE_UPDATE',suggestion_id:'FILL_BLANKS_FROM_PRIOR',decision:'EDITED_AND_ACCEPTED',text:'Filled '+filled+' blank top-level fields only',source_basis:'Working Version '+prev.version_no,working_version:docCtx?.tqf3?.current_version_no,rationale,decided_at:new Date().toISOString()});
  if(result)result.textContent='เติมเฉพาะช่องว่าง '+filled+' ช่องจาก Version '+prev.version_no+' โดยไม่เขียนทับข้อมูลที่มีอยู่';
  renderReadiness();
}

function ensureStaticFieldQuickActionsV33(){
  const defs=[
    ['#t3-objectives','clo',['write','check','refine']],
    ['#t3-resources','overview',['write','check','refine']],
    ['#t3-improvement','overview',['write','check','refine']],
    ['#t5-plan-actual','tqf5',['write','check','refine']],
    ['#t5-problems','tqf5',['write','check','refine']],
    ['#improvement-plan','tqf5',['write','check','refine']],
    ['#verification-note','verification',['write','check','refine']]
  ];
  defs.forEach(([sel,section,actions])=>{
    const el=$(sel),field=el?.closest('.field');if(!el||!field||field.querySelector('.ai-field-actions'))return;
    const wrap=document.createElement('div');wrap.innerHTML=aiQuickButtons(section,sel,null,actions);field.insertBefore(wrap.firstElementChild,el);
  });
  bindAiFieldButtons();
}
function sectionPanelForV36(section){
  const inline=$('[data-ai-inline-section="'+section+'"]');
  return inline?.closest('.form-section')||inline?.closest('.card')||null;
}
function sectionGapChecksV36(section){
  const checks=readinessState().checks.filter(x=>x.state!=='PASS');
  const matchers={
    clo:/t3-objectives|t3-clo-body/,
    weekly:/weekly-body/,
    assessment:/assessment-body/,
    overview:/t3-resources|t3-improvement/,
    tqf5:/registered-students|students-at-end|t5-|clo-body|grade-body/,
    verification:/verification|evidence/
  };
  const re=matchers[section]||/.^/;
  return checks.filter(x=>re.test((x.target||'')+' '+(x.name||'')+' '+(x.category||'')));
}
function ensureFinishSectionControlsV36(){
  $$('[data-ai-inline-section]').forEach(inline=>{
    const section=inline.dataset.aiInlineSection||inline.getAttribute('data-ai-inline-section');
    const owner=inline.closest('.form-section')||inline.closest('.card');
    const header=owner?.querySelector('.form-section-header,.section-title');
    if(!owner||!header||header.querySelector('[data-finish-section="'+section+'"]'))return;
    const wrap=document.createElement('div');
    wrap.className='finish-section-tools';
    wrap.innerHTML='<button type="button" class="btn tiny finish-section-btn" data-finish-section="'+esc(section)+'">ตรวจหมวดนี้ให้จบ</button><span class="badge info" data-finish-section-state="'+esc(section)+'">—</span>';
    header.appendChild(wrap);
    const result=document.createElement('div');
    result.className='finish-section-result';
    result.dataset.finishSectionResult=section;
    result.hidden=true;
    header.after(result);
    wrap.querySelector('[data-finish-section]').onclick=()=>finishSectionV36(section);
  });
  updateFinishSectionStatesV36();
}
function updateFinishSectionStatesV36(){
  $$('[data-finish-section-state]').forEach(el=>{
    const section=el.dataset.finishSectionState,state=completionState(section),gaps=sectionGapChecksV36(section);
    const label=state+' · gap '+gaps.length;
    setBadge(el,label,state==='READY_FOR_INTERNAL_REVIEW'&&gaps.length===0?'ok':gaps.some(x=>x.state==='BLOCKING')?'danger':'warn');
  });
}
function finishSectionV36(section){
  const result=$('[data-finish-section-result="'+section+'"]');if(!result)return;
  const state=completionState(section),gaps=sectionGapChecksV36(section);
  result.hidden=false;
  result.innerHTML='<div class="finish-section-summary"><div><strong>'+esc(section.toUpperCase())+' · '+esc(state)+'</strong><div class="help">'+(gaps.length?'พบ '+gaps.length+' จุดที่ยังต้องพิจารณา':'ไม่พบ readiness gap ที่ผูกกับหมวดนี้')+'</div></div>'+
    '<div class="actions"><button type="button" class="btn tiny finish-section-ai">AI ตรวจหมวดนี้</button>'+(gaps.length?'<button type="button" class="btn tiny primary finish-section-next">ไป Gap แรก</button>':'')+'</div></div>'+
    (gaps.length?'<div class="finish-gap-list">'+gaps.map(x=>'<div class="check-row"><span><b>'+esc(x.name)+'</b><div class="help">'+esc(x.detail)+'</div></span>'+readinessBadge(x.state)+'</div>').join(''):'<div class="notice ok">หมวดนี้ไม่มี BLOCKING/WARNING ที่ระบบผูก target ไว้</div>');
  result.querySelector('.finish-section-ai').onclick=()=>runSectionAi(section,null,result.querySelector('.finish-section-ai'));
  const next=result.querySelector('.finish-section-next');if(next)next.onclick=()=>jumpToReadinessTarget(gaps[0].target);
  updateFinishSectionStatesV36();
}
function evidenceAgeLabelV36(dateValue){
  if(!dateValue)return'MISSING DATE';
  const d=new Date(dateValue+'T00:00:00'),now=new Date();
  if(Number.isNaN(d.getTime()))return String(dateValue);
  const days=Math.floor((now-d)/86400000);
  if(days<0)return'ลงวันที่อนาคต '+Math.abs(days)+' วัน';
  if(days===0)return'ลงวันที่วันนี้';
  return'อายุเอกสาร '+days+' วัน';
}
function evidenceReviewSummaryV36(){
  const rows=evidenceWorkspace?.candidates||[],groups={};
  rows.forEach(x=>{const k=x.evidence_type||'UNSPECIFIED';(groups[k]||(groups[k]=[])).push(x);});
  const ready=rows.filter(x=>candidateReviewState(x)==='READY_FOR_HUMAN_REVIEW').length;
  const host=$('#evidence-review-readiness-v36');if(!host)return;
  host.innerHTML='<div class="section-title"><div><h4>Evidence Review Readiness</h4><div class="help">จัดกลุ่มเพื่อเตรียม human admission review เท่านั้น · ไม่มีการ admit อัตโนมัติ</div></div><span class="badge '+(ready===rows.length&&rows.length?'ok':'warn')+'">Ready '+ready+' / '+rows.length+'</span></div>'+
    (Object.keys(groups).length?'<div class="evidence-type-groups">'+Object.entries(groups).map(([k,v])=>'<div class="evidence-type-card"><strong>'+esc(k)+'</strong><span>'+v.length+' candidate</span><div class="help">Ready '+v.filter(x=>candidateReviewState(x)==='READY_FOR_HUMAN_REVIEW').length+' / '+v.length+'</div></div>').join('')+'</div>':'<div class="help">ยังไม่มี evidence candidate</div>');
}
function templateActivationChecklistV36(label,v2){
  const fields=v2?.fields||[],ar=templateActivationReadiness(v2);
  return '<div class="activation-checklist-v36"><div class="section-title"><div><h4>'+esc(label)+' · Activation Checklist</h4><div class="help">READ-ONLY · ไม่มีปุ่ม Activate/Approve</div></div><span class="badge danger">UNRESOLVED '+ar.unresolved+'</span></div>'+
    '<div class="activation-groups">'+['SOURCE_READY','EXECUTION_REQUIRED','HUMAN_INPUT_REQUIRED','SIGNATURE_GATE'].map(group=>{
      const rows=fields.filter(x=>templateBindingClass(x)===group);
      return '<details '+(group==='SOURCE_READY'?'':'open')+'><summary>'+esc(group)+' · '+rows.length+'</summary><ul>'+(
        rows.length?rows.map(x=>'<li><span class="badge '+(group==='SOURCE_READY'?'ok':'warn')+'">'+esc(group)+'</span> <b>'+esc(x.field_code)+'</b> · '+esc(x.source_label_th||'')+'<div class="help">'+esc(x.reconciliation_note||'')+'</div></li>').join(''):'<li>ไม่มีรายการ</li>'
      )+'</ul></details>';
    }).join('')+'</div></div>';
}
function ensureV33Ui(){
  $$('[data-ai-inline-section]').forEach(ensureInlineV33);
  ensureStaticFieldQuickActionsV33();
  renderSectionCompletionV33();
  renderReviewQueueV33();
  renderReuseUpdateV33();
  ensureFinishSectionControlsV36();
  evidenceReviewSummaryV36();
}
function runSectionAi(section,row=null,sourceEl=null){
  activeAiSection=section;
  aiSuggestions=sortAiSuggestions(analyze(section,row));
  aiSectionRuns[section]={at:new Date().toISOString(),count:aiSuggestions.length,row};
  aiSectionSuggestionCache[section]=aiSuggestions;
  renderAiRail();
  const box=$('#ai-analysis-box');
  if(box){
    const labels={curriculum:'ข้อมูลหลักสูตร',clo:'CLO–PLO',weekly:'แผนรายสัปดาห์',assessment:'การประเมิน',tqf5:'มคอ.5',verification:'ทวนสอบ',overview:'Readiness'};
    const c=curriculumCtx?.course||{};
    const header='ผลวิเคราะห์ทันที — '+(labels[section]||section)+'\nรายวิชา: '+(c.course_code||'')+' '+(c.title_th||'')+'\n\n';
    box.value=header+
      aiSuggestions.map((x,i)=>(i+1)+'. ['+x.severity+'] '+x.title+'\n   '+x.message+'\n   เหตุผล: '+x.why+'\n   Action: '+x.action).join('\n\n')+
      '\n\nการตัดสินใจสุดท้ายเป็นของผู้ใช้ ระบบจะไม่แก้ canonical data อัตโนมัติ';
    box.scrollTop=0;
  }
  renderAiProposedText();
  renderAiDecisionHistory();
  renderInlineAi(section,row,sourceEl);
}
function findInlinePanel(section,sourceEl=null){
  const owner=sourceEl?.closest?.('.form-section');
  const local=owner?.querySelector?.('[data-ai-inline-section="'+section+'"]');
  if(local)return local;
  return $$('[data-ai-inline-section="'+section+'"]').find(x=>!x.closest('.panel')?.hidden)
    ||$('[data-ai-inline-section="'+section+'"]');
}
function inlineSuggestionList(section){
  return aiSectionSuggestionCache[section]||[];
}
function renderInlineAi(section,row=null,sourceEl=null,forcedPanel=null,selectedIndex=0){
  const panel=forcedPanel||findInlinePanel(section,sourceEl);
  if(!panel)return;
  ensureInlineV33(panel);
  const all=inlineSuggestionList(section);
  const list=filteredInlineSuggestions(section,panel);
  const basis=aiEvidenceBasis(section);
  panel.hidden=false;
  panel.dataset.section=section;
  panel.dataset.row=row==null?'':String(row);
  const summary=panel.querySelector('[data-ai-inline-summary]');
  const basisEl=panel.querySelector('[data-ai-inline-basis]');
  const listEl=panel.querySelector('[data-ai-inline-list]');
  if(summary)summary.textContent='แสดง '+list.length+' / '+all.length+' ข้อเสนอ · เรียง BLOCKING → WARNING → SUGGESTION';
  if(basisEl){
    basisEl.textContent=basis.level+' · '+basis.label;
    basisEl.className='badge '+(basis.level==='HIGH'?'ok':basis.level==='MEDIUM'?'warn':'danger');
    basisEl.title=basis.detail||'';
  }
  if(listEl){
    listEl.innerHTML=list.map(x=>{
      const i=all.indexOf(x);
      return '<div class="ai-inline-card '+(x.status==='REJECTED'?'rejected':x.status==='ACCEPTED'||x.status==='EDITED_AND_ACCEPTED'?'accepted':'')+'" data-ai-inline-card data-i="'+i+'">'+
        '<div class="ai-inline-card-head"><span class="badge '+severityKind(x.severity)+'">'+esc(x.severity)+'</span><strong>'+esc(x.title)+'</strong><span class="badge info">'+esc(x.action_type||'CHECK')+'</span></div>'+
        '<div>'+esc(x.message)+'</div>'+
        '<div class="help"><b>เหตุผล:</b> '+esc(x.why)+'</div>'+
        '<div class="actions">'+
          '<button type="button" class="btn small ai-inline-pick" data-i="'+i+'">เลือกข้อเสนอนี้</button>'+
          '<button type="button" class="btn small ai-inline-reject" data-i="'+i+'">ไม่ใช้</button>'+
        '</div>'+
      '</div>';
    }).join('');
  }
  $$('.ai-inline-pick').filter(x=>x.closest('.ai-inline-result')===panel).forEach(x=>x.onclick=()=>pickInlineSuggestion(panel,Number(x.dataset.i)));
  $$('.ai-inline-reject').filter(x=>x.closest('.ai-inline-result')===panel).forEach(x=>x.onclick=()=>rejectInlineSuggestion(panel,Number(x.dataset.i)));

  let idx=Number(selectedIndex);
  if(!all[idx]||!list.includes(all[idx]))idx=list.length?all.indexOf(list[0]):-1;
  if(idx>=0)pickInlineSuggestion(panel,idx,false);
  else clearInlineSelection(panel);

  panel.classList.remove('ai-inline-flash');
  void panel.offsetWidth;
  panel.classList.add('ai-inline-flash');
  updateInlineContextV33(panel);
  panel.scrollIntoView({behavior:'smooth',block:'nearest'});
}
function clearInlineSelection(panel){
  const ta=panel.querySelector('[data-ai-inline-selected]');
  if(ta){ta.value='';ta.dataset.original='';}
  panel.dataset.selectedIndex='';
  panel.dataset.target='';
  const target=panel.querySelector('[data-ai-inline-target]');if(target)target.textContent='ยังไม่ได้เลือกข้อเสนอ';
  const accept=panel.querySelector('[data-ai-inline-accept]');if(accept)accept.disabled=true;
  const apply=panel.querySelector('[data-ai-inline-apply]');if(apply)apply.disabled=true;
  const copy=panel.querySelector('[data-ai-inline-copy]');if(copy)copy.disabled=true;
}
function pickInlineSuggestion(panel,i,focus=true){
  const section=panel.dataset.section;
  const list=inlineSuggestionList(section),sg=list[i];if(!sg)return;
  panel.dataset.selectedIndex=String(i);
  panel.dataset.target=sg.target||'';
  panel.querySelectorAll('[data-ai-inline-card]').forEach(x=>x.classList.toggle('selected',Number(x.dataset.i)===i));
  const ta=panel.querySelector('[data-ai-inline-selected]');
  if(ta){
    ta.value=sg.message||sg.action||'';
    ta.dataset.original=ta.value;
    ta.oninput=()=>{updateInlineApplyState(panel);renderInlineDiff(panel);};
    if(focus)ta.focus({preventScroll:true});
  }
  const target=panel.querySelector('[data-ai-inline-target]');
  if(target)target.textContent=sg.target
    ?'มีช่องเป้าหมาย · แก้ข้อความให้เป็นข้อความจริงก่อน แล้วจึงกด “แก้ข้อความแล้วใส่ในช่อง”'
    :'ข้อเสนอนี้เป็นข้อแนะนำเชิงวิเคราะห์ ไม่มีการเขียนทับช่องข้อมูลอัตโนมัติ';
  const accept=panel.querySelector('[data-ai-inline-accept]');
  const copy=panel.querySelector('[data-ai-inline-copy]');
  if(accept){accept.disabled=false;accept.onclick=()=>acceptInlineSuggestion(panel);}
  if(copy){copy.disabled=false;copy.onclick=()=>copyInlineSuggestion(panel);}
  const close=panel.querySelector('[data-ai-inline-close]');if(close)close.onclick=()=>panel.hidden=true;
  updateInlineApplyState(panel);updateInlineContextV33(panel);
}
function updateInlineApplyState(panel){
  const ta=panel.querySelector('[data-ai-inline-selected]');
  const apply=panel.querySelector('[data-ai-inline-apply]');
  const changed=!!ta?.value.trim()&&ta.value.trim()!==(ta.dataset.original||'').trim();
  const hasTarget=!!panel.dataset.target;
  if(apply){
    apply.disabled=!(changed&&hasTarget);
    apply.onclick=()=>applyInlineSuggestion(panel);
  }
}
function activateInlineSection(panel){
  const section=panel.dataset.section;
  activeAiSection=section;
  aiSuggestions=inlineSuggestionList(section);
  return{section,list:aiSuggestions,index:Number(panel.dataset.selectedIndex)};
}
function recordInlineDecision(panel,decision,textOverride=null){
  const {section,list,index}=activateInlineSection(panel);
  const sg=list[index];if(!sg)return;
  const ta=panel.querySelector('[data-ai-inline-selected]');
  const text=textOverride??ta?.value??sg.message;
  sg.status=decision;
  aiDecisions.push({document:activeTab==='tqf5'?'TQF5':'TQF3',section,suggestion_id:sg.id,decision,text,source_basis:aiEvidenceBasis(section).label,action_type:sg.action_type||panel.dataset.actionType||'SECTION_ANALYSIS',target:sg.target||panel.dataset.target||null,working_version:docCtx?.tqf3?.current_version_no??null,decided_at:new Date().toISOString()});
  aiSectionSuggestionCache[section]=list;
  renderAiRail();renderAiDecisionHistory();renderReadiness();renderSectionCompletionV33();renderReviewQueueV33();
  renderInlineAi(section,panel.dataset.row===''?null:Number(panel.dataset.row),null,panel,index);
}
function acceptInlineSuggestion(panel){
  const ta=panel.querySelector('[data-ai-inline-selected]');
  const decision=ta?.value.trim()!==(ta?.dataset.original||'').trim()?'EDITED_AND_ACCEPTED':'ACCEPTED';
  recordInlineDecision(panel,decision);
  say(decision==='ACCEPTED'?'รับข้อเสนอ AI แล้ว':'รับข้อเสนอที่แก้ไขแล้ว','ok');
}
function rejectInlineSuggestion(panel,i){
  pickInlineSuggestion(panel,i,false);
  recordInlineDecision(panel,'REJECTED');
  say('บันทึกว่าไม่ใช้ข้อเสนอนี้แล้ว','ok');
}
function applyInlineSuggestion(panel){
  const {section,list,index}=activateInlineSection(panel);
  const sg=list[index],ta=panel.querySelector('[data-ai-inline-selected]');
  if(!sg?.target||!ta?.value.trim())return;
  const target=$(sg.target);if(!target){say('ไม่พบช่องเป้าหมายของข้อเสนอนี้','danger');return;}
  if(ta.value.trim()===(ta.dataset.original||'').trim()){
    say('กรุณาแก้ข้อความให้เป็นข้อความที่จะใช้จริงก่อนใส่ลงช่อง','warn');return;
  }
  aiUndoStack.push({target:sg.target,previous:target.value,next:ta.value.trim(),section,at:new Date().toISOString()});
  if(aiUndoStack.length>20)aiUndoStack.shift();
  target.value=ta.value.trim();
  target.dispatchEvent(new Event('input',{bubbles:true}));
  recordInlineDecision(panel,'EDITED_AND_ACCEPTED',ta.value.trim());
  renderAiUndoState();
  say('นำข้อความที่แก้แล้วไปใส่ช่องเป้าหมายเรียบร้อย สามารถ Undo ได้','ok');
}
async function copyInlineSuggestion(panel){
  const text=panel.querySelector('[data-ai-inline-selected]')?.value.trim()||'';
  if(!text)return;
  try{await navigator.clipboard.writeText(text);say('คัดลอกข้อเสนอ AI แล้ว','ok');}
  catch{say('ไม่สามารถคัดลอกอัตโนมัติได้ กรุณาเลือกข้อความในกล่อง','warn');}
}

function severityKind(sev){return sev==='BLOCKING'?'danger':sev==='WARNING'?'warn':'info';}
function renderAiRail(){
  const labels={curriculum:'ข้อมูลหลักสูตร',clo:'CLO–PLO',weekly:'แผนรายสัปดาห์',assessment:'การประเมิน',tqf5:'มคอ.5',verification:'ทวนสอบ',overview:'Readiness'};
  $('#ai-context').textContent=labels[activeAiSection]||activeAiSection;
  const box=$('#ai-analysis-box');
  if(box){
    box.value=aiSuggestions.length
      ? aiSuggestions.map((x,i)=>(i+1)+'. ['+x.severity+'] '+x.title+'\n   '+x.message+'\n   เหตุผล: '+x.why+'\n   Action: '+x.action).join('\n\n')
      : 'กดปุ่ม AI วิเคราะห์ในหมวดที่ต้องการ ผลวิเคราะห์จะปรากฏในกล่องนี้ทันที';
  }
  const list=$('#ai-suggestions');
  list.innerHTML=aiSuggestions.length?aiSuggestions.map((s,i)=>
    '<div class="suggestion '+(s.status==='ACCEPTED'?'accepted':s.status==='REJECTED'?'rejected':'')+'">'+
    '<div class="actions"><span class="badge '+severityKind(s.severity)+'">'+esc(s.severity)+'</span><span class="title">'+esc(s.title)+'</span></div>'+
    '<div class="help"><b>Why:</b> '+esc(s.why)+'</div>'+
    '<textarea class="suggestion-text" data-i="'+i+'" data-original="'+esc(s.message)+'">'+esc(s.message)+'</textarea>'+
    '<div class="help"><b>Recommended action:</b> '+esc(s.action)+'</div>'+
    '<div class="actions">'+
      '<button class="btn small good sug-accept" data-i="'+i+'">รับข้อเสนอ</button>'+
      '<button class="btn small sug-edit" data-i="'+i+'">แก้ไขแล้วรับ</button>'+
      (s.target?'<button class="btn small sug-apply" data-i="'+i+'" disabled>นำข้อความที่แก้แล้วไปใส่ช่อง</button>':'')+
      '<button class="btn small sug-reject" data-i="'+i+'">ไม่ใช้</button>'+
    '</div></div>'
  ).join(''):'<div class="help">กด AI ช่วยวิเคราะห์ในแต่ละหมวด</div>';
  $$('.suggestion-text').forEach(t=>t.oninput=()=>{
    const i=Number(t.dataset.i),b=$('.sug-apply[data-i="'+i+'"]');
    if(b)b.disabled=t.value.trim()===t.dataset.original.trim()||!t.value.trim();
  });
  $$('.sug-accept').forEach(b=>b.onclick=()=>decideSuggestion(Number(b.dataset.i),'ACCEPTED'));
  $$('.sug-edit').forEach(b=>b.onclick=()=>decideSuggestion(Number(b.dataset.i),'EDITED_AND_ACCEPTED'));
  $$('.sug-apply').forEach(b=>b.onclick=()=>applySuggestionToField(Number(b.dataset.i)));
  $$('.sug-reject').forEach(b=>b.onclick=()=>decideSuggestion(Number(b.dataset.i),'REJECTED'));
  renderAiProposedText();renderAiDecisionHistory();
  const r=readinessState();$('#ai-readiness-score').textContent=r.score+'%';
}
function applySuggestionToField(i){
  const sg=aiSuggestions[i];if(!sg?.target)return;
  const target=$(sg.target),txt=$('.suggestion-text[data-i="'+i+'"]');
  if(!target||!txt||txt.value.trim()===txt.dataset.original.trim())return;
  aiUndoStack.push({target:sg.target,previous:target.value,next:txt.value.trim(),section:activeAiSection,at:new Date().toISOString()});
  if(aiUndoStack.length>20)aiUndoStack.shift();
  target.value=txt.value.trim();
  target.dispatchEvent(new Event('input',{bubbles:true}));
  decideSuggestion(i,'EDITED_AND_ACCEPTED');
  renderAiUndoState();
  say('นำข้อความที่ผู้ใช้แก้แล้วไปใส่ช่องเป้าหมายแล้ว สามารถ Undo ได้','ok');
}
function renderAiUndoState(){
  const undo=$('#ai-undo-apply');if(!undo)return;
  undo.disabled=aiUndoStack.length===0;
  undo.textContent=aiUndoStack.length?'Undo ('+aiUndoStack.length+')':'Undo การใช้ข้อความ';
}
function undoLastAiApply(){
  const change=aiUndoStack.pop();if(!change)return;
  const target=$(change.target);
  if(target){
    target.value=change.previous;
    target.dispatchEvent(new Event('input',{bubbles:true}));
    aiDecisions.push({document:activeTab==='tqf5'?'TQF5':'TQF3',section:change.section,suggestion_id:'UNDO_APPLY',decision:'UNDO',text:change.next,source_basis:aiEvidenceBasis(change.section).label,decided_at:new Date().toISOString()});
  }
  renderAiUndoState();
  say('ย้อนกลับการนำข้อความ AI ไปใส่ช่องล่าสุดแล้ว','ok');
  renderAiDecisionHistory();renderReadiness();
}
function aiEvidenceBasis(section){
  const canonical=!!curriculumCtx?.description?.description_th;
  const linked=(evidenceWorkspace?.linked_evidence||[]).length;
  const candidates=(evidenceWorkspace?.candidates||[]).length;
  const tqf3=!!docCtx?.tqf3?.content;
  const tqf5=!!docCtx?.tqf5?.payload;
  if(section==='curriculum')return canonical?{level:'HIGH',label:'Curriculum source observed',detail:curriculumCtx.description.source_reference||''}:{level:'LOW',label:'Curriculum source missing',detail:'ห้ามสร้าง canonical data ด้วย AI'};
  if(section==='verification')return linked>0?{level:'HIGH',label:'Linked controlled evidence',detail:'Linked evidence '+linked}:candidates>0?{level:'MEDIUM',label:'Candidate evidence only',detail:'Candidate '+candidates+' · ยังไม่ admitted'}:{level:'LOW',label:'No evidence linked',detail:'ยังไม่มี linked/candidate evidence'};
  if(section==='tqf5')return tqf5?{level:'MEDIUM',label:'Working TQF5 data',detail:docCtx?.tqf5?.source_status||'UNVERIFIED'}:{level:'LOW',label:'No TQF5 working data',detail:'ยังไม่มีข้อมูลผลการดำเนินงาน'};
  return canonical&&tqf3?{level:'MEDIUM',label:'Curriculum + Working TQF3',detail:'วิเคราะห์จากแหล่งหลักสูตรและ working form'}:tqf3?{level:'LOW',label:'Working form only',detail:'ยังไม่มีฐาน canonical ครบสำหรับส่วนนี้'}:{level:'LOW',label:'Insufficient working context',detail:'ข้อมูลยังไม่พอ'};
}
function decideSuggestion(i,decision){
  const sg=aiSuggestions[i];if(!sg)return;
  sg.status=decision;
  const text=$('.suggestion-text[data-i="'+i+'"]')?.value||sg.message;
  aiDecisions.push({document:activeTab==='tqf5'?'TQF5':'TQF3',section:activeAiSection,suggestion_id:sg.id,decision,text,source_basis:aiEvidenceBasis(activeAiSection).label,decided_at:new Date().toISOString()});
  renderAiRail();renderAiDecisionHistory();renderReadiness();
}
function proposedTextFromSuggestions(){
  const actionable=aiSuggestions.filter(x=>x.status!=='REJECTED');
  const direct=actionable.find(x=>x.target);
  if(direct)return direct.message||direct.action||'';
  if(!actionable.length)return '';
  const labels={curriculum:'ข้อมูลหลักสูตร',clo:'CLO–PLO',weekly:'แผนรายสัปดาห์',assessment:'การประเมิน',tqf5:'มคอ.5',verification:'ทวนสอบ',overview:'Readiness'};
  return 'ข้อเสนอสำหรับ '+(labels[activeAiSection]||activeAiSection)+'\n'+actionable.slice(0,5).map((x,i)=>(i+1)+'. '+(x.action||x.message)).join('\n');
}
function renderAiProposedText(){
  const box=$('#ai-proposed-text');if(box)box.value=proposedTextFromSuggestions();
  const basis=aiEvidenceBasis(activeAiSection);
  if($('#ai-evidence-basis')){
    $('#ai-evidence-basis').textContent=basis.level+' · '+basis.label;
    $('#ai-evidence-basis').className='badge '+(basis.level==='HIGH'?'ok':basis.level==='MEDIUM'?'warn':'danger');
    $('#ai-evidence-basis').title=basis.detail||'';
  }
  renderAiSectionState();
}
function renderAiSectionState(){
  const el=$('#ai-section-state');if(!el)return;
  const run=aiSectionRuns[activeAiSection];
  const unresolved=aiSuggestions.filter(x=>!['ACCEPTED','EDITED_AND_ACCEPTED','REJECTED'].includes(x.status)).length;
  const state=!run?'NOT_ANALYZED':unresolved===0?'REVIEWED':'ANALYZED';
  el.textContent=state;
  el.className='badge '+(state==='REVIEWED'?'ok':state==='ANALYZED'?'warn':'info');
}
function renderAiDecisionHistory(){
  const host=$('#ai-decision-history');if(!host)return;
  const recent=aiDecisions.slice(-10).reverse();
  host.innerHTML=recent.length?recent.map(x=>'<div class="history-row"><span class="badge '+(x.decision==='REJECTED'?'danger':x.decision==='UNDO'?'warn':'ok')+'">'+esc(x.decision)+'</span><span>'+esc(x.section||'')+' · '+esc(x.suggestion_id||'')+'<div class="help">'+esc(x.source_basis||'')+'</div></span></div>').join(''):'<div class="help">ยังไม่มีการตัดสินใจจาก AI</div>';
  const unresolved=aiSuggestions.filter(x=>!['ACCEPTED','EDITED_AND_ACCEPTED','REJECTED'].includes(x.status)).length;
  if($('#ai-unresolved-count'))$('#ai-unresolved-count').textContent=String(unresolved);
  renderAiSectionState();
}
async function copyAiProposedText(){
  const text=$('#ai-proposed-text')?.value.trim()||'';
  if(!text)return;
  try{await navigator.clipboard.writeText(text);say('คัดลอกข้อความเสนอแล้ว','ok');}
  catch{say('ไม่สามารถคัดลอกอัตโนมัติได้ กรุณาเลือกข้อความในกล่อง','warn');}
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
  const checks=[];
  const add=(name,state,detail,category='GENERAL',target=null)=>checks.push({name,state,detail,category,target});
  const d=curriculumCtx?.description;
  const workingDesc=($('#canonical-desc')?.value||'').trim();
  if(d?.description_th)add('คำอธิบายรายวิชา','PASS',(d.verification_status||'')+' / '+(d.authority_status||''),'SOURCE','#canonical-desc');
  else if(workingDesc)add('คำอธิบายรายวิชา','WARNING','มี Working fallback แต่ยังไม่มี canonical curriculum source','SOURCE','#canonical-desc');
  else add('คำอธิบายรายวิชา','BLOCKING','ยังไม่มีข้อความที่มี provenance รองรับ','SOURCE','#canonical-desc');
  const clos=collectClos();
  add('CLO',clos.length>=3&&clos.every(x=>x.description)?'PASS':'BLOCKING','CLO '+clos.filter(x=>x.description).length+'/'+clos.length+' มีข้อความ','TQF3','#t3-clo-body');
  const orphanClos=clos.filter(x=>x.description&&!x.plo).length;
  add('CLO→PLO',orphanClos===0?'PASS':'WARNING',orphanClos?orphanClos+' CLO ยังไม่มี working PLO linkage':'มี working linkage ครบ','ALIGNMENT','#t3-clo-body');
  const weeks=collectWeeks(),filled=weeks.filter(x=>x.topic).length;
  add('แผนรายสัปดาห์',filled===0?'BLOCKING':filled<weeks.length?'WARNING':'PASS','มีหัวข้อ '+filled+'/'+weeks.length+' สัปดาห์','TQF3','#weekly-body');
  const weeklyOrphans=weeks.filter(x=>x.topic&&(!x.clo||!x.activities||!x.assessment)).length;
  add('Weekly Alignment',weeklyOrphans===0?'PASS':'WARNING',weeklyOrphans?weeklyOrphans+' สัปดาห์ยังขาด CLO/กิจกรรม/หลักฐาน':'ไม่พบ orphan ในแถวที่กรอก','ALIGNMENT','#weekly-body');
  const assessments=collectAssessments(),total=assessments.reduce((sum,x)=>sum+Number(x.weight||0),0);
  add('น้ำหนักการประเมิน',Math.abs(total-100)<.01?'PASS':'BLOCKING','รวม '+total.toFixed(2)+'%','ASSESSMENT','#assessment-body');
  const orphanAssess=assessments.filter(x=>x.item&&(!x.clos||!x.evidence)).length;
  add('Assessment→CLO/Evidence',orphanAssess===0?'PASS':'BLOCKING',orphanAssess?orphanAssess+' รายการยังขาด CLO หรือ evidence':'รายการที่กรอกมี CLO/evidence','ASSESSMENT','#assessment-body');
  const t5=collectTqf5(),t3Codes=new Set(clos.map(x=>x.code).filter(Boolean)),t5Codes=new Set((t5.results?.clo_attainment||[]).map(x=>x.clo).filter(Boolean));
  const mismatch=[...t3Codes].filter(x=>!t5Codes.has(x));
  add('มคอ.3 ↔ มคอ.5 CLO',mismatch.length===0?'PASS':'WARNING',mismatch.length?'ขาด '+mismatch.join(', '):'สอดคล้อง','CROSS_DOCUMENT','#clo-body');
  const v=docCtx?.verification;
  add('ทวนสอบ',v?.status==='VERIFIED'?'PASS':'WARNING',v?.status||'ยังไม่มี','VERIFICATION','#verification-checklist');
  const linked=(evidenceWorkspace?.linked_evidence||[]).length,candidates=(evidenceWorkspace?.candidates||[]).length;
  add('หลักฐานทวนสอบ',linked>0?'PASS':candidates>0?'WARNING':'WARNING','Linked '+linked+' · Candidate '+candidates,'EVIDENCE','#evidence-workspace');
  const unresolved=aiSuggestions.filter(x=>!['ACCEPTED','EDITED_AND_ACCEPTED','REJECTED'].includes(x.status)).length;
  add('AI decisions',unresolved===0?'PASS':'WARNING',unresolved+' ข้อเสนอในหน้าปัจจุบันยังไม่ตัดสินใจ','AI','#ai-suggestions');
  const blocking=checks.filter(x=>x.state==='BLOCKING').length,warnings=checks.filter(x=>x.state==='WARNING').length,passes=checks.filter(x=>x.state==='PASS').length;
  const score=Math.round((passes+warnings*.5)/checks.length*100);
  return{score,checks,blocking,warnings,passes,exportReady:blocking===0};
}
function readinessBadge(state){
  return state==='PASS'?'<span class="badge ok">PASS</span>':state==='BLOCKING'?'<span class="badge danger">BLOCKING</span>':'<span class="badge warn">WARNING</span>';
}
function jumpToReadinessTarget(target){
  const el=$(target);if(!el)return;
  const panel=el.closest('.panel');
  if(panel?.id?.startsWith('panel-'))setTab(panel.id.replace('panel-',''));
  setTimeout(()=>{el.scrollIntoView({behavior:'smooth',block:'center'});if(typeof el.focus==='function')try{el.focus({preventScroll:true});}catch{}},80);
}
function renderReadinessSectionScores(r){
  const host=$('#readiness-section-scores');if(!host)return;
  const groups={};r.checks.forEach(x=>{(groups[x.category]||(groups[x.category]=[])).push(x);});
  host.innerHTML=Object.entries(groups).map(([k,v])=>{
    const p=v.filter(x=>x.state==='PASS').length,w=v.filter(x=>x.state==='WARNING').length,b=v.filter(x=>x.state==='BLOCKING').length;
    const score=Math.round((p+w*.5)/v.length*100);
    return '<div class="section-score"><strong>'+esc(k)+'</strong><span>'+score+'%</span><div class="help">B '+b+' · W '+w+' · P '+p+'</div></div>';
  }).join('');
}
function renderWeeklyCoverageHeatmap(){
  const host=$('#weekly-coverage-heatmap');if(!host)return;
  const weeks=collectWeeks();
  host.innerHTML=weeks.map((x,i)=>{
    const state=!x.topic?'EMPTY':(!x.clo||!x.activities||!x.assessment)?'GAP':'READY';
    return '<span class="week-cell '+state.toLowerCase()+'" title="สัปดาห์ '+(i+1)+' · '+state+'">W'+(x.week||i+1)+'</span>';
  }).join('');
}
function renderAssessmentMap(){
  const host=$('#assessment-map');if(!host)return;
  const a=collectAssessments();
  host.innerHTML=a.length?a.map(x=>'<div class="map-row"><strong>'+esc(x.item||'ยังไม่ระบุรายการ')+'</strong><span>'+esc(x.clos||'ไม่มี CLO')+'</span><span>'+esc(x.weight||0)+'%</span><span>'+badgeHtml(x.evidence?'EVIDENCE':'NO EVIDENCE',x.evidence?'ok':'danger')+'</span></div>').join(''):'<div class="help">ยังไม่มีรายการประเมิน</div>';
}
function renderSourceGapQueue(){
  const host=$('#source-gap-queue');if(!host)return;
  const gaps=courseCatalog.filter(x=>!x.description?.description_th);
  host.innerHTML=gaps.length?gaps.map(x=>'<div class="check-row"><span><b>'+esc(x.course_code)+'</b> '+esc(x.title_th||'')+'</span><span class="badge danger">MISSING SOURCE</span></div>').join(''):'<div class="notice ok">คำอธิบายรายวิชาครบ '+courseCatalog.length+'/'+courseCatalog.length+' วิชาใน scope</div>';
}
function advancedCrossDocumentChecks(){
  const t3=collectTqf3(),t5=collectTqf5();
  const assessments=t3.form_sections?.assessment_items||[];
  const weeks=t3.form_sections?.weekly_plan||[];
  const t3Clos=new Set((t3.form_sections?.clos||[]).map(x=>x.code).filter(Boolean));
  const t5Clos=new Set((t5.results?.clo_attainment||[]).map(x=>x.clo).filter(Boolean));
  const cqiSources=(cqiContext?.prior_tqf5||[]).reduce((n,x)=>n+(Array.isArray(x.improvement_plan)?x.improvement_plan.length:0),0)+(cqiContext?.improvement_items||[]).length;
  const cqiAccepted=aiDecisions.filter(x=>x.section==='CQI_CARRY_FORWARD'&&x.decision==='IMPLEMENT').length;
  const acceptedAi=aiDecisions.filter(x=>['ACCEPTED','EDITED_AND_ACCEPTED'].includes(x.decision));
  const evidenceTotal=(evidenceWorkspace?.linked_evidence||[]).length+(evidenceWorkspace?.candidates||[]).length;
  const expectedWeeklyEvidence=weeks.filter(x=>x.topic&&x.assessment).length;
  const planActual=(t5.plan_actual?.summary||'').trim();
  const mismatch=[...t3Clos].filter(x=>!t5Clos.has(x));
  return[
    {
      name:'TQF3 Assessment Plan → TQF5 Plan/Actual',
      state:!docCtx?.tqf5?'WARNING':assessments.length&&planActual?'PASS':'WARNING',
      detail:!docCtx?.tqf5?'ยังไม่มี มคอ.5 สำหรับเทียบผลจริง':assessments.length&&!planActual?'มีแผนการประเมินใน มคอ.3 แต่ มคอ.5 ยังไม่มี Plan→Actual narrative':'มีแผน '+assessments.length+' รายการ และมี Plan→Actual narrative; ระบบยังไม่อ้าง item-level result เพราะฐานไม่มีข้อมูลระดับนั้น'
    },
    {
      name:'Weekly evidence expectation → Verification evidence',
      state:expectedWeeklyEvidence===0?'INFO':evidenceTotal===0?'WARNING':'INFO',
      detail:expectedWeeklyEvidence===0?'ยังไม่มี weekly assessment expectation ที่กรอก':evidenceTotal===0?'มี '+expectedWeeklyEvidence+' สัปดาห์ที่คาด evidence แต่ Evidence Workspace ยังว่าง':'มี weekly expectation '+expectedWeeklyEvidence+' สัปดาห์ และ evidence workspace '+evidenceTotal+' รายการ; ยังไม่ยืนยัน one-to-one mapping'
    },
    {
      name:'TQF3 CLO → TQF5 CLO attainment',
      state:!docCtx?.tqf5?'WARNING':mismatch.length?'WARNING':'PASS',
      detail:!docCtx?.tqf5?'ยังไม่มี มคอ.5':mismatch.length?'มคอ.5 ยังไม่มี '+mismatch.join(', '):'รหัส CLO ที่มีใน มคอ.3 ปรากฏในตาราง CLO attainment ของ มคอ.5'
    },
    {
      name:'CQI source → next-cycle TQF3',
      state:cqiSources===0?'INFO':cqiAccepted>0?'PASS':'WARNING',
      detail:cqiSources===0?'ยังไม่มี CQI source จากรอบก่อนใน context':'พบ CQI source '+cqiSources+' รายการ · carry-forward decision '+cqiAccepted+' รายการ'
    },
    {
      name:'Accepted AI change traceability',
      state:acceptedAi.length===0?'INFO':acceptedAi.every(x=>x.source_basis||x.source_reference)?'PASS':'WARNING',
      detail:acceptedAi.length===0?'ยังไม่มี AI suggestion ที่ผู้ใช้รับ':acceptedAi.length+' การตัดสินใจที่รับไว้ · '+acceptedAi.filter(x=>x.source_basis||x.source_reference).length+' มี source/evidence basis'
    }
  ];
}
function qaBadge(state){
  return state==='PASS'?'<span class="badge ok">PASS</span>':state==='WARNING'?'<span class="badge warn">WARNING</span>':'<span class="badge info">INFO</span>';
}
function buildVersionChangeNarrative(){
  if(versionHistory.length<2)return'ยังมี Working Version ไม่พอสำหรับสร้าง change narrative';
  const sorted=versionHistory.slice().sort((a,b)=>Number(b.version_no)-Number(a.version_no));
  const newer=sorted[0],older=sorted[1],a=older.content?.form_sections||{},b=newer.content?.form_sections||{};
  const parts=[];
  if(a.objectives!==b.objectives)parts.push('วัตถุประสงค์');
  if(JSON.stringify(a.clos||[])!==JSON.stringify(b.clos||[]))parts.push('CLO');
  if(JSON.stringify(a.weekly_plan||[])!==JSON.stringify(b.weekly_plan||[]))parts.push('แผนรายสัปดาห์');
  if(JSON.stringify(a.assessment_items||[])!==JSON.stringify(b.assessment_items||[]))parts.push('การประเมิน');
  if(a.resources!==b.resources)parts.push('ทรัพยากร');
  if(a.improvement_notes!==b.improvement_notes)parts.push('แนวทางปรับปรุง');
  return 'Version '+older.version_no+' → '+newer.version_no+': '+(parts.length?'เปลี่ยน '+parts.join(', '):'ไม่พบความต่างใน structured sections ที่ตรวจ');
}
function renderAdvancedCrossDocumentQA(){
  const host=$('#cross-doc-detail');if(!host)return;
  const checks=advancedCrossDocumentChecks();
  host.innerHTML=checks.map(x=>'<div class="cross-doc-row"><strong>'+esc(x.name)+'</strong><span>'+qaBadge(x.state)+'</span><span class="help">'+esc(x.detail)+'</span></div>').join('');
  if($('#version-change-narrative'))$('#version-change-narrative').textContent=buildVersionChangeNarrative();
  const cqiSources=(cqiContext?.prior_tqf5||[]).reduce((n,x)=>n+(Array.isArray(x.improvement_plan)?x.improvement_plan.length:0),0)+(cqiContext?.improvement_items||[]).length;
  const cqiAccepted=aiDecisions.filter(x=>x.section==='CQI_CARRY_FORWARD'&&x.decision==='IMPLEMENT').length;
  if($('#cqi-lineage'))$('#cqi-lineage').textContent='CQI source '+cqiSources+' · carry-forward accepted '+cqiAccepted;
  const accepted=aiDecisions.filter(x=>['ACCEPTED','EDITED_AND_ACCEPTED'].includes(x.decision));
  if($('#accepted-ai-trace'))$('#accepted-ai-trace').textContent='Accepted '+accepted.length+' · with source/evidence basis '+accepted.filter(x=>x.source_basis||x.source_reference).length;
}

function renderReadiness(){
  const r=readinessState();
  $('#readiness-ring').style.setProperty('--p',r.score);$('#readiness-score').textContent=r.score+'%';
  if($('#readiness-blocking'))$('#readiness-blocking').textContent=r.blocking;
  if($('#readiness-warning'))$('#readiness-warning').textContent=r.warnings;
  if($('#readiness-pass'))$('#readiness-pass').textContent=r.passes;
  if($('#export-readiness')){setBadge($('#export-readiness'),r.exportReady?'READY FOR DRAFT EXPORT':'BLOCKED',r.exportReady?'ok':'danger');}
  $('#readiness-list').innerHTML=r.checks.map(x=>'<div class="check-row"><span>'+esc(x.name)+'<div class="help">'+esc(x.detail)+'</div></span><span class="readiness-actions">'+readinessBadge(x.state)+(x.target?'<button class="btn tiny readiness-jump" data-target="'+esc(x.target)+'">ไปยังจุดแก้</button>':'')+'</span></div>').join('');
  $$('.readiness-jump').forEach(b=>b.onclick=()=>jumpToReadinessTarget(b.dataset.target));
  $('#consistency-list').innerHTML=r.checks.filter(x=>['ALIGNMENT','ASSESSMENT','CROSS_DOCUMENT','VERIFICATION','EVIDENCE'].includes(x.category)).map(x=>'<div class="check-row"><span>'+esc(x.name)+'</span><span>'+esc(x.detail)+' '+readinessBadge(x.state)+'</span></div>').join('');
  renderReadinessSectionScores(r);renderWeeklyCoverageHeatmap();renderAssessmentMap();renderSourceGapQueue();renderAdvancedCrossDocumentQA();renderReviewPackagePreview();renderSectionCompletionV33();renderReviewQueueV33();enhanceAccessibility();
}
function reviewQueueRemainingByGroup(){
  const rows=readinessGapList().map(x=>({...x,group:reviewQueueGroup(x)}));
  return rows.reduce((a,x)=>{a[x.group]=(a[x.group]||0)+1;return a;},{});
}
function aiDecisionCountsBySection(){
  return aiDecisions.reduce((a,x)=>{const k=x.section||'UNKNOWN';a[k]=(a[k]||0)+1;return a;},{});
}
function unresolvedAiTrail(){
  return aiSuggestions.filter(x=>!['ACCEPTED','EDITED_AND_ACCEPTED','REJECTED'].includes(x.status));
}
function collectionDiffSummary(label,oldArr,newArr,keyFn){
  oldArr=oldArr||[];newArr=newArr||[];
  const oldMap=new Map(oldArr.map((x,i)=>[keyFn(x,i),x])),newMap=new Map(newArr.map((x,i)=>[keyFn(x,i),x]));
  const added=[...newMap.keys()].filter(k=>!oldMap.has(k)),removed=[...oldMap.keys()].filter(k=>!newMap.has(k));
  const changed=[...newMap.keys()].filter(k=>oldMap.has(k)&&JSON.stringify(oldMap.get(k))!==JSON.stringify(newMap.get(k)));
  return '<div class="collection-diff"><b>'+esc(label)+'</b> · เพิ่ม '+added.length+' · ลบ '+removed.length+' · เปลี่ยน '+changed.length+
    (changed.length?'<div class="help">Changed: '+esc(changed.slice(0,12).join(', '))+'</div>':'')+'</div>';
}
function changeOriginAppendix(){
  const origins=[];
  if(reuseLineage.length)origins.push('Reuse/Update actions: '+reuseLineage.length);
  const accepted=aiDecisions.filter(x=>['ACCEPTED','EDITED_AND_ACCEPTED'].includes(x.decision));
  if(accepted.length)origins.push('Accepted AI-assisted decisions: '+accepted.length);
  origins.push('Other differences may be direct user edits; system does not infer authorship without an event record.');
  return '<ul>'+origins.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>';
}
function fieldLevelPriorDiffAppendix(){
  const prev=priorWorkingVersion();if(!prev)return'<div>ยังไม่มี prior working version</div>';
  const old=prev.content?.form_sections||{},cur=collectTqf3().form_sections||{};
  return '<div><b>ฐานเปรียบเทียบ:</b> Working Version '+esc(prev.version_no)+'</div>'+reuseFieldCompareHtml(prev)+
    collectionDiffSummary('CLO',old.clos,cur.clos,(x,i)=>x.code||('row-'+i))+
    collectionDiffSummary('Weekly plan',old.weekly_plan,cur.weekly_plan,(x,i)=>String(x.week||i+1))+
    collectionDiffSummary('Assessment',old.assessment_items,cur.assessment_items,(x,i)=>x.item||('row-'+i))+
    '<div><b>Change origin</b>'+changeOriginAppendix()+'</div>';
}
function renderReviewPackagePreview(){
  const host=$('#review-package-preview');if(!host)return;
  const r=readinessState(),c=curriculumCtx?.course||{},p=curriculumCtx?.programme||{},t3=collectTqf3(),t5=collectTqf5();
  const linked=(evidenceWorkspace?.linked_evidence||[]).length,candidates=evidenceWorkspace?.candidates||[],cand=candidates.length;
  const unresolved=unresolvedAiTrail(),accepted=aiDecisions.filter(x=>['ACCEPTED','EDITED_AND_ACCEPTED'].includes(x.decision));
  const findings=r.checks.filter(x=>x.state!=='PASS'),resp=(courseResponsibilityCtx?.records||[]).filter(x=>x.display_as_responsible_person);
  const cqiSources=(cqiContext?.prior_tqf5||[]).reduce((n,x)=>n+(Array.isArray(x.improvement_plan)?x.improvement_plan.length:0),0)+(cqiContext?.improvement_items||[]).length;
  const qGroups=reviewQueueRemainingByGroup(),aiCounts=aiDecisionCountsBySection();
  host.innerHTML='<div class="draft-watermark">DRAFT · INTERNAL REVIEW</div><div class="review-grid">'+
    '<div><small>หลักสูตร</small><strong>'+esc(p.title_th||'—')+'</strong></div>'+
    '<div><small>รายวิชา</small><strong>'+esc((c.course_code||'')+' '+(c.title_th||''))+'</strong></div>'+
    '<div><small>Controlled responsibility</small><strong>'+esc(resp.length?resp.map(x=>x.person_name_th).join(', '):'ยังไม่มี controlled record')+'</strong></div>'+
    '<div><small>TQF3 Working Version</small><strong>'+esc(docCtx?.tqf3?.current_version_no??'—')+'</strong></div>'+
    '<div><small>Readiness</small><strong>'+r.score+'% · B '+r.blocking+' · W '+r.warnings+'</strong></div>'+
    '<div><small>Review Queue remaining</small><strong>'+esc(Object.entries(qGroups).map(([k,v])=>k+' '+v).join(' · ')||'0')+'</strong></div>'+
    '<div><small>TQF3</small><strong>CLO '+(t3.form_sections?.clos||[]).length+' · Weeks '+(t3.form_sections?.weekly_plan||[]).length+' · Assess '+(t3.form_sections?.assessment_items||[]).length+'</strong></div>'+
    '<div><small>TQF5</small><strong>'+esc(docCtx?.tqf5?.lifecycle_status||'NO_RECORD')+' · CLO Results '+((t5.results?.clo_attainment||[]).length)+'</strong></div>'+
    '<div><small>Verification / Evidence</small><strong>'+esc(docCtx?.verification?.status||'NO_RECORD')+' · Linked '+linked+' · Candidate '+cand+'</strong></div>'+
    '<div><small>AI</small><strong>Unresolved '+unresolved.length+' · Accepted '+accepted.length+'</strong></div>'+
    '</div>'+
    '<div class="review-appendices">'+
      '<div class="review-appendix"><h4>Appendix A · Section findings</h4><ul>'+(findings.length?findings.map(x=>'<li>'+esc(x.name)+' — '+esc(x.state)+' — '+esc(x.detail)+'</li>').join(''):'<li>ไม่พบ BLOCKING/WARNING ใน checks ปัจจุบัน</li>')+'</ul></div>'+
      '<div class="review-appendix"><h4>Appendix B · AI decisions by section</h4><ul>'+(Object.keys(aiCounts).length?Object.entries(aiCounts).map(([k,v])=>'<li>'+esc(k)+' · '+v+' decisions</li>').join(''):'<li>ยังไม่มี AI decision</li>')+'</ul></div>'+
      '<div class="review-appendix"><h4>Appendix C · Unresolved AI</h4><ul>'+(unresolved.length?unresolved.map(x=>'<li>'+esc(x.severity)+' · '+esc(x.title)+'</li>').join(''):'<li>ไม่มี unresolved suggestion ในชุดวิเคราะห์ปัจจุบัน</li>')+'</ul></div>'+
      '<div class="review-appendix"><h4>Appendix D · Evidence candidates</h4><ul>'+(candidates.length?candidates.map(x=>'<li>'+esc(x.evidence_id)+' · '+esc(x.admission_status)+' · '+esc(candidateReviewState(x))+'</li>').join(''):'<li>ยังไม่มี evidence candidate</li>')+'</ul></div>'+
      '<div class="review-appendix"><h4>Appendix E · Field-level prior-version diff</h4>'+fieldLevelPriorDiffAppendix()+'</div>'+
      '<div class="review-appendix"><h4>Appendix F · CQI lineage</h4><div>CQI source '+cqiSources+' · carry-forward accepted '+aiDecisions.filter(x=>x.section==='CQI_CARRY_FORWARD'&&x.decision==='IMPLEMENT').length+'</div></div>'+
      '<div class="review-appendix"><h4>Appendix G · Reuse / Update lineage</h4><ul>'+(reuseLineage.length?reuseLineage.map(x=>'<li>'+esc(x.at)+' · '+esc(x.action)+' · v'+esc(x.source_version)+' → v'+esc(x.target_version)+' · '+esc((x.fields||[]).join(', '))+(x.rationale?' · เหตุผล: '+esc(x.rationale):'')+'</li>').join(''):'<li>ยังไม่มี reuse/update action ใน session นี้</li>')+'</ul></div>'+
      '<div class="review-appendix"><h4>Appendix H · Source / provenance</h4><div>'+esc(curriculumCtx?.description?.source_reference||'No curriculum source')+' · '+esc(curriculumCtx?.description?.source_locator||'')+'</div></div>'+
      '<div class="review-appendix"><h4>Appendix I · AI Decision / Evidence Trail</h4><ul>'+(aiDecisions.length?aiDecisions.slice(-30).map(x=>'<li>'+esc(x.decided_at||'')+' · '+esc(x.document||'')+' · '+esc(x.section||'')+' · '+esc(x.action_type||'')+' · '+esc(x.decision||'')+' · '+esc(x.target||'no target')+' · basis: '+esc(x.source_basis||'not recorded')+' · rationale: '+esc(x.rationale||'—')+'</li>').join(''):'<li>ยังไม่มี AI decision trail ใน session/working content ปัจจุบัน</li>')+'</ul></div>'+'<div class="review-appendix"><h4>Appendix J · Change origin</h4>'+changeOriginAppendix()+'</div>'+
      '<div class="review-appendix"><h4>Appendix K · Evidence-source completeness</h4><div>Linked '+linked+' · Candidates '+cand+' · Ready-for-human-review '+candidates.filter(x=>candidateReviewState(x)==='READY_FOR_HUMAN_REVIEW').length+' · Needs metadata '+candidates.filter(x=>candidateReviewState(x)==='NEEDS_METADATA').length+'</div></div>'+
    '</div><div class="provenance-footer">DRAFT · NON-PRODUCTION · Internal review only · not institutional approval</div>';
}

async function loadTemplateReview(){
  if(templateReviewLoaded){renderTemplateReview();return;}
  const calls=await Promise.all([
    client.rpc('hepe_document_template_version_review',{p_template_code:'HEPE-TQF4-GENERIC',p_version_no:1}),
    client.rpc('hepe_document_template_version_review',{p_template_code:'HEPE-TQF4-GENERIC',p_version_no:2}),
    client.rpc('hepe_document_template_version_review',{p_template_code:'HEPE-TQF6-GENERIC',p_version_no:1}),
    client.rpc('hepe_document_template_version_review',{p_template_code:'HEPE-TQF6-GENERIC',p_version_no:2})
  ]);
  const err=calls.find(x=>x.error)?.error;if(err)throw err;
  templateReviewCtx={tqf4v1:calls[0].data,tqf4v2:calls[1].data,tqf6v1:calls[2].data,tqf6v2:calls[3].data};
  templateReviewLoaded=true;
  renderTemplateReview();
}
function structuralExecutionField(f){
  return /STUDENT|SUPERVISOR|PLACEMENT|EXECUTED|VARIANCE|GRADE|ATTAINMENT|PROBLEM|EVALUATION|APPROVAL|SIGNATURE/i.test((f.field_code||'')+' '+(f.field_kind||''));
}
function templateBindingClass(x){
  if(x.field_kind==='SIGNATURE'||x.field_code==='APPROVAL')return'SIGNATURE_GATE';
  if(structuralExecutionField(x))return'EXECUTION_REQUIRED';
  if(/COURSE|ACADEMIC_TERM|CREDIT|PREREQUISITE|TQF4_LINEAGE/i.test(x.field_code||''))return'SOURCE_READY';
  return'HUMAN_INPUT_REQUIRED';
}
function templateActivationReadiness(v2){
  const fields=v2?.fields||[],counts={SOURCE_READY:0,EXECUTION_REQUIRED:0,HUMAN_INPUT_REQUIRED:0,SIGNATURE_GATE:0};
  fields.forEach(x=>counts[templateBindingClass(x)]++);
  const unresolved=counts.EXECUTION_REQUIRED+counts.HUMAN_INPUT_REQUIRED+counts.SIGNATURE_GATE;
  return{counts,unresolved,total:fields.length,ready:false};
}
function templateReviewCard(label,v1,v2){
  if(!v1||!v2)return'<div class="template-review-card"><h4>'+esc(label)+'</h4><div class="notice warn">ยังโหลดข้อมูลไม่ครบ</div></div>';
  const s1=v1.sections||[],s2=v2.sections||[],codes1=new Set(s1.map(x=>x.section_code)),added=s2.filter(x=>!codes1.has(x.section_code));
  const fields=v2.fields||[],guarded=fields.filter(x=>x.synthetic_data_forbidden),canonical=fields.filter(x=>x.canonical_entity),execution=fields.filter(structuralExecutionField),approval=fields.filter(x=>x.field_kind==='SIGNATURE'||x.field_code==='APPROVAL');
  const canonicalList=fields.filter(x=>/COURSE|ACADEMIC_TERM|CREDIT|PREREQUISITE|TQF4_LINEAGE/i.test(x.field_code||'')),execList=fields.filter(structuralExecutionField),ar=templateActivationReadiness(v2);
  return '<div class="template-review-card"><h4>'+esc(label)+'</h4>'+
    '<div class="actions"><span class="badge info">v1 '+esc(v1.version?.version_status||'—')+'</span><span class="badge warn">v2 '+esc(v2.version?.version_status||'—')+'</span><span class="badge warn">current = v'+esc(v2.template?.current_version_no??v1.template?.current_version_no??'1')+'</span><span class="badge danger">ACTIVATION BLOCKED</span></div>'+
    '<div class="template-compare"><div class="template-version-box"><strong>v1 · '+s1.length+' sections</strong><ul>'+s1.map(x=>'<li>'+esc(x.section_label_th)+'</li>').join('')+'</ul></div>'+
    '<div class="template-version-box"><strong>v2 · '+s2.length+' sections</strong><ul>'+s2.map(x=>'<li>'+esc(x.section_label_th)+'</li>').join('')+'</ul></div></div>'+
    '<div class="template-field-summary"><div><b>เพิ่มใน v2:</b> '+(added.length?added.map(x=>esc(x.section_label_th)).join(' · '):'ไม่มี')+'</div>'+
    '<div><b>Field bindings:</b> '+fields.length+' · synthetic guard '+guarded.length+' · canonical/linkage '+canonical.length+' · execution-sensitive '+execution.length+' · approval/signature gate '+approval.length+'</div>'+
    '<div class="activation-readiness"><b>Pre-activation classification:</b> SOURCE_READY '+ar.counts.SOURCE_READY+' · EXECUTION_REQUIRED '+ar.counts.EXECUTION_REQUIRED+' · HUMAN_INPUT_REQUIRED '+ar.counts.HUMAN_INPUT_REQUIRED+' · SIGNATURE_GATE '+ar.counts.SIGNATURE_GATE+' · unresolved '+ar.unresolved+'</div>'+
    '<details><summary>Field classification</summary><ul>'+fields.map(x=>'<li><span class="badge '+(templateBindingClass(x)==='SOURCE_READY'?'ok':'warn')+'">'+templateBindingClass(x)+'</span> '+esc(x.field_code)+' · '+esc(x.source_label_th||'')+'</li>').join('')+'</ul></details>'+
    '<details><summary>Canonical/source-fed fields</summary><ul>'+(canonicalList.length?canonicalList.map(x=>'<li>'+esc(x.field_code)+' · '+esc(x.source_label_th||'')+'</li>').join(''):'<li>ไม่มีรายการที่จัดกลุ่มอัตโนมัติ</li>')+'</ul></details>'+
    '<details><summary>Execution-only / evidence-required fields</summary><ul>'+(execList.length?execList.map(x=>'<li>'+esc(x.field_code)+' · '+esc(x.source_label_th||'')+'</li>').join(''):'<li>ไม่มีรายการ</li>')+'</ul></details>'+
    '<details><summary>Approval / signature gates</summary><ul>'+(approval.length?approval.map(x=>'<li>'+esc(x.field_code)+' · '+esc(x.source_label_th||'')+'</li>').join(''):'<li>ไม่มี signature field ใน template นี้</li>')+'</ul></details>'+
    '<div class="help">Activation readiness report เป็น read-only classification เท่านั้น · v2 ยัง UNDER_REVIEW · ไม่มีปุ่ม Activate/Approve</div></div></div>';
}

function renderTemplateReview(){
  const host=$('#template-review');if(!host)return;
  if(!templateReviewCtx){host.innerHTML='<div class="help">กำลังรอข้อมูล template review</div>';return;}
  host.innerHTML=templateReviewCard('มคอ.4',templateReviewCtx.tqf4v1,templateReviewCtx.tqf4v2)+templateActivationChecklistV36('มคอ.4',templateReviewCtx.tqf4v2)+templateReviewCard('มคอ.6',templateReviewCtx.tqf6v1,templateReviewCtx.tqf6v2)+templateActivationChecklistV36('มคอ.6',templateReviewCtx.tqf6v2);
  enhanceAccessibility();
}

/* ---------- V27 Autosave / Recovery ---------- */
function bufferKey(){
  const a=courseArgs();
  return ['hepe-tqf-v27',a.p_programme_code,a.p_course_code,a.p_academic_year,a.p_term_code].join(':');
}
function setSaveState(text,kindName='info'){
  const el=$('#save-state'); if(!el)return;
  setBadge(el,text,kindName);
}
function scheduleLocalSave(){
  if(!$('#app-view') || $('#app-view').hidden)return;
  setSaveState('ยังไม่บันทึก','warn');
  clearTimeout(saveTimer);
  saveTimer=setTimeout(saveLocalBuffer,700);
}
function saveLocalBuffer(){
  try{
    const payload={
      identity:courseArgs(),
      saved_at:new Date().toISOString(),
      tqf3:collectTqf3(),
      tqf5:collectTqf5(),
      verification_note:$('#verification-note')?.value||'',
      ai_decisions:aiDecisions
    };
    localStorage.setItem(bufferKey(),JSON.stringify(payload));
    setSaveState('บันทึกในเครื่องแล้ว','ok');
  }catch(e){
    setSaveState('Autosave ไม่สำเร็จ','danger');
  }
}
function localBuffer(){
  try{
    const raw=localStorage.getItem(bufferKey());
    return raw?JSON.parse(raw):null;
  }catch{return null;}
}
function clearLocalBuffer(){
  try{localStorage.removeItem(bufferKey());}catch{}
  setSaveState('บันทึกบนระบบแล้ว','ok');
  const b=$('#recovery-banner'); if(b)b.hidden=true;
}
function offerLocalRecovery(){
  const d=localBuffer(),b=$('#recovery-banner');
  if(!b)return;
  if(!d){b.hidden=true;return;}
  b.hidden=false;
  $('#recovery-time').textContent=d.saved_at?new Date(d.saved_at).toLocaleString('th-TH'):'ไม่ทราบเวลา';
}
function restoreLocalDraft(){
  const d=localBuffer(); if(!d)return;
  docCtx=docCtx||{course:{course_offering_id:null}};
  if(d.tqf3){
    docCtx.tqf3={...(docCtx.tqf3||{}),content:d.tqf3,lifecycle_status:'LOCAL_DRAFT',current_version_no:docCtx.tqf3?.current_version_no||0,version_status:'LOCAL_BUFFER'};
  }
  if(d.tqf5){
    docCtx.tqf5={...(docCtx.tqf5||{}),payload:d.tqf5,lifecycle_status:'LOCAL_DRAFT'};
  }
  if(Array.isArray(d.ai_decisions))aiDecisions=d.ai_decisions;
  renderTqf3();renderTqf5();
  if($('#verification-note'))$('#verification-note').value=d.verification_note||'';
  setSaveState('กู้ Draft จากเครื่องแล้ว','warn');
  $('#recovery-banner').hidden=true;
  renderReadiness();
}
function discardLocalDraft(){
  clearLocalBuffer();
  renderTqf3();renderTqf5();renderVerification();
}

/* ---------- V27 Version Compare ---------- */
function renderVersionCompare(){
  const a=$('#version-a'),b=$('#version-b'),out=$('#version-diff');
  if(!a||!b||!out)return;
  const opts=versionHistory.map(v=>option(v.version_no,'Version '+v.version_no+' · '+(v.source_status||v.version_status||''),false)).join('');
  a.innerHTML=opts;b.innerHTML=opts;
  if(versionHistory.length){
    a.value=String(versionHistory[0].version_no);
    b.value=String(versionHistory[Math.min(1,versionHistory.length-1)].version_no);
  }
  compareVersions();
}
function compareVersions(){
  const out=$('#version-diff');if(!out)return;
  const va=versionHistory.find(x=>String(x.version_no)===$('#version-a').value);
  const vb=versionHistory.find(x=>String(x.version_no)===$('#version-b').value);
  if(!va||!vb){out.innerHTML='<div class="help">ยังไม่มีรุ่นเพียงพอสำหรับเปรียบเทียบ</div>';return;}
  const fa=va.content?.form_sections||{},fb=vb.content?.form_sections||{};
  const rows=[
    ['วัตถุประสงค์',fa.objectives!==fb.objectives,fa.objectives?'มีข้อมูล':'ว่าง',fb.objectives?'มีข้อมูล':'ว่าง'],
    ['CLO',JSON.stringify(fa.clos||[])!==JSON.stringify(fb.clos||[]),(fa.clos||[]).length+' ข้อ',(fb.clos||[]).length+' ข้อ'],
    ['แผนรายสัปดาห์',JSON.stringify(fa.weekly_plan||[])!==JSON.stringify(fb.weekly_plan||[]),(fa.weekly_plan||[]).length+' แถว',(fb.weekly_plan||[]).length+' แถว'],
    ['การประเมิน',JSON.stringify(fa.assessment_items||[])!==JSON.stringify(fb.assessment_items||[]),(fa.assessment_items||[]).length+' รายการ',(fb.assessment_items||[]).length+' รายการ'],
    ['ทรัพยากร',fa.resources!==fb.resources,fa.resources?'มีข้อมูล':'ว่าง',fb.resources?'มีข้อมูล':'ว่าง'],
    ['แนวทางปรับปรุง',fa.improvement_notes!==fb.improvement_notes,fa.improvement_notes?'มีข้อมูล':'ว่าง',fb.improvement_notes?'มีข้อมูล':'ว่าง']
  ];
  out.innerHTML='<div class="table-wrap"><table><thead><tr><th>ส่วน</th><th>สถานะ</th><th>Version '+va.version_no+'</th><th>Version '+vb.version_no+'</th></tr></thead><tbody>'+
    rows.map(r=>'<tr><td>'+esc(r[0])+'</td><td><span class="badge '+(r[1]?'warn':'ok')+'">'+(r[1]?'เปลี่ยน':'เหมือนเดิม')+'</span></td><td>'+esc(r[2])+'</td><td>'+esc(r[3])+'</td></tr>').join('')+
    '</tbody></table></div>';
  renderReuseUpdateV33();
}

/* ---------- V27 Evidence Workspace ---------- */
function candidateReviewState(c){
  const sm=c.summary||{};
  const locator=sm.source_locator||'';
  const hash=sm.integrity_sha256||'';
  const required=!!(c.source&&c.version_date&&c.authority_owner&&c.relevant_assertion);
  const locatorReady=!!locator;
  const hashValid=!hash||/^[A-Fa-f0-9]{64}$/.test(hash);
  if(!required||!locatorReady||!hashValid)return'NEEDS_METADATA';
  return'READY_FOR_HUMAN_REVIEW';
}
function candidateDuplicateGroups(candidates){
  const groups=new Map();
  candidates.forEach(c=>{
    const sm=c.summary||{},hash=(sm.integrity_sha256||'').toLowerCase().trim(),loc=(sm.source_locator||'').toLowerCase().trim();
    const key=hash?'hash:'+hash:'source:'+(c.source||'').toLowerCase().trim()+'|'+loc;
    if(!key||key==='source:|')return;
    const arr=groups.get(key)||[];arr.push(c);groups.set(key,arr);
  });
  return [...groups.values()].filter(x=>x.length>1);
}
function renderEvidenceWorkspace(){
  const host=$('#evidence-workspace');if(!host)return;
  const linked=evidenceWorkspace?.linked_evidence||[],cand=evidenceWorkspace?.candidates||[];
  const filter=$('#evidence-candidate-filter')?.value||'ALL';
  const filteredCand=cand.filter(x=>filter==='ALL'||x.admission_status===filter||x.verification_status===filter);
  const dupGroups=candidateDuplicateGroups(cand);
  let html='<div id="evidence-review-readiness-v36"></div>';
  if(dupGroups.length)html+='<div class="notice warn">พบ candidate metadata ที่จัดกลุ่มซ้ำได้ '+dupGroups.length+' กลุ่ม — ตรวจด้วยมนุษย์ก่อน admission</div>';
  if(linked.length){
    html+='<h4>Linked controlled evidence</h4><div class="table-wrap"><table><thead><tr><th>หลักฐาน</th><th>ประเภท</th><th>สถานะ</th><th>แหล่งที่มา</th></tr></thead><tbody>'+
      linked.map(x=>'<tr><td>'+esc(x.title||x.evidence_code)+'</td><td>'+esc(x.evidence_type_code||'LINKED_EVIDENCE')+'</td><td>'+badgeHtml(x.status_code||'PRESENT','ok')+'</td><td>'+esc(x.source_reference||'')+'</td></tr>').join('')+
      '</tbody></table></div>';
  }
  html+='<h4>Evidence candidates</h4>';
  html+=filteredCand.length?'<div class="table-wrap"><table><thead><tr><th>ID / Metadata</th><th>ประเภท</th><th>Verification</th><th>Admission</th><th>Human-review readiness</th></tr></thead><tbody>'+
    filteredCand.map(x=>{
      const sm=x.summary||{},locator=sm.source_locator||'',hash=sm.integrity_sha256||'',state=candidateReviewState(x);
      const authority=x.authority_owner||'';
      return '<tr><td><b>'+esc(x.evidence_id)+'</b><div>'+esc(x.source||'')+'</div><div class="evidence-meta">'+
        '<span>Authority: '+esc(authority||'MISSING')+'</span>'+
        '<span>Locator: '+esc(locator||'MISSING')+'</span>'+
        '<span>Date: '+esc(x.version_date||'MISSING')+' · '+esc(evidenceAgeLabelV36(x.version_date))+'</span>'+
        '<span>SHA: '+(hash?'<code>'+esc(hash)+'</code>':'<span>not supplied</span>')+'</span>'+
        '</div></td><td>'+esc(x.evidence_type||'')+'</td>'+
        '<td>'+badgeHtml(x.verification_status,kind(x.verification_status))+'</td>'+
        '<td>'+badgeHtml(x.admission_status,x.admission_status==='ADMITTED_BY_SEPARATE_AUTHORITY'?'ok':'warn')+'</td>'+
        '<td>'+badgeHtml(state,state==='READY_FOR_HUMAN_REVIEW'?'ok':'warn')+'</td></tr>';
    }).join('')+'</tbody></table></div>':'<div class="help">ไม่มี candidate ตามตัวกรอง</div>';
  if(!linked.length&&!cand.length)html='<div class="notice danger">ยังไม่พบ linked evidence หรือ evidence candidate สำหรับรายวิชานี้</div>';
  host.innerHTML=html;
  renderAdmissionReviewQueue();
  evidenceReviewSummaryV36();
  enhanceAccessibility();
}
function validSha256(v){return !v||/^[A-Fa-f0-9]{64}$/.test(v);}
async function checkEvidenceDuplicate(){
  const source=$('#evidence-source')?.value.trim()||'',locator=$('#evidence-locator')?.value.trim()||'',sha=$('#evidence-sha')?.value.trim()||'';
  if(!source){if($('#evidence-duplicate-state'))setBadge($('#evidence-duplicate-state'),'กรอก source ก่อน','info');return null;}
  if(!validSha256(sha)){setBadge($('#evidence-duplicate-state'),'SHA-256 ไม่ถูก format','danger');return {invalid:true};}
  const {data,error}=await client.rpc('hepe_fast_tqf_evidence_candidate_duplicate_check_by_code',{...courseArgs(),p_source:source,p_source_locator:locator||null,p_integrity_sha256:sha||null});
  if(error)throw error;
  if($('#evidence-duplicate-state'))setBadge($('#evidence-duplicate-state'),data.duplicate?'พบ candidate ซ้ำ: '+data.existing_evidence_id:'ไม่พบ candidate ซ้ำ',data.duplicate?'warn':'ok');
  return data;
}
async function registerEvidenceCandidate(){
  const get=id=>$(id)?.value.trim()||'';
  const date=get('#evidence-date'),sha=get('#evidence-sha');
  if(!get('#evidence-type')||!get('#evidence-source')||!date||!get('#evidence-authority')||!get('#evidence-assertion'))throw new Error('กรุณากรอกประเภทหลักฐาน แหล่งที่มา วันที่ Authority owner และ assertion ให้ครบ');
  if(!validSha256(sha))throw new Error('SHA-256 ต้องเป็นเลขฐาน 16 จำนวน 64 ตัวอักษร หรือเว้นว่าง');
  const dup=await checkEvidenceDuplicate();if(dup?.invalid)return;
  if(dup?.duplicate){say('ไม่สร้างรายการใหม่ เพราะพบ Evidence Candidate ซ้ำ','warn');return;}
  say('กำลังลงทะเบียน Evidence Candidate…');
  const {data,error}=await client.rpc('hepe_fast_tqf_register_evidence_candidate_by_code',{...courseArgs(),p_evidence_type:get('#evidence-type'),p_source:get('#evidence-source'),p_version_date:date,p_authority_owner:get('#evidence-authority'),p_relevant_assertion:get('#evidence-assertion'),p_source_locator:get('#evidence-locator')||null,p_integrity_sha256:sha||null,p_note:get('#evidence-note')||null});
  if(error)throw error;
  if(data.duplicate){say('ไม่สร้างรายการใหม่ เพราะพบ '+data.existing_evidence_id+' อยู่แล้ว','warn');return;}
  say('ลงทะเบียน '+data.evidence_id+' เป็น UNVERIFIED / NOT_ADMITTED แล้ว','ok');
  ['#evidence-type','#evidence-source','#evidence-authority','#evidence-assertion','#evidence-locator','#evidence-sha','#evidence-note'].forEach(id=>{if($(id))$(id).value='';});
  if($('#evidence-duplicate-state'))setBadge($('#evidence-duplicate-state'),'พร้อมตรวจรายการใหม่','info');
  await loadSelectedCourse();
}
function renderAdmissionReviewQueue(){
  const host=$('#admission-review-queue');if(!host)return;
  const rows=(evidenceWorkspace?.candidates||[]).filter(x=>x.admission_status==='NOT_ADMITTED');
  const ready=rows.filter(x=>candidateReviewState(x)==='READY_FOR_HUMAN_REVIEW').length;
  host.innerHTML=(rows.length?'<div class="help">พร้อมส่งให้มนุษย์ทบทวน '+ready+' / '+rows.length+' · ไม่มี auto-admit</div>':'')+(rows.length?rows.map(x=>'<div class="admission-row"><span><b>'+esc(x.evidence_id)+'</b><div class="help">'+esc(x.evidence_type)+' · '+esc(x.source)+'</div></span><span><span class="badge warn">NOT_ADMITTED</span><div class="help">Human admission gate</div></span></div>').join(''):'<div class="help">ไม่มี candidate รอ admission review</div>');
}

/* ---------- V27 CQI Carry-forward ---------- *//* ---------- V27 CQI Carry-forward ---------- */
function renderCqiCarryForward(){
  const host=$('#cqi-carry');if(!host)return;
  const prior=cqiContext?.prior_tqf5||[],items=cqiContext?.improvement_items||[];
  const blocks=[];
  prior.forEach(p=>{
    const plans=Array.isArray(p.improvement_plan)?p.improvement_plan:[];
    plans.forEach((x,i)=>blocks.push({
      id:'snap-'+p.result_snapshot_id+'-'+i,
      text:x.action||JSON.stringify(x),
      source:'มคอ.5 '+p.academic_year+'/'+p.term_code,
      ref:p.result_snapshot_id
    }));
  });
  items.forEach(x=>blocks.push({
    id:'item-'+x.improvement_item_id,
    text:x.action_plan_text||x.recommendation_text||x.issue_text,
    source:'Improvement item · '+x.item_status,
    ref:x.improvement_item_id
  }));
  if(!blocks.length){
    host.innerHTML='<div class="help">ยังไม่มี CQI จากรอบก่อนที่ระบบสามารถ carry-forward ได้</div>';
    return;
  }
  host.innerHTML=blocks.map((x,i)=>'<div class="suggestion"><div class="title">'+esc(x.source)+'</div><div>'+esc(x.text||'')+'</div><div class="actions"><button class="btn small good cqi-use" data-i="'+i+'">นำไปใช้</button><button class="btn small cqi-skip" data-i="'+i+'">ไม่ใช้</button></div></div>').join('');
  $$('.cqi-use').forEach(b=>b.onclick=()=>decideCqi(blocks[Number(b.dataset.i)],'IMPLEMENT'));
  $$('.cqi-skip').forEach(b=>b.onclick=()=>decideCqi(blocks[Number(b.dataset.i)],'NOT_ADOPTED'));
}
function decideCqi(item,decision){
  aiDecisions.push({
    document:'TQF3',section:'CQI_CARRY_FORWARD',suggestion_id:item.id,
    decision,text:item.text,source_reference:item.ref,decided_at:new Date().toISOString()
  });
  if(decision==='IMPLEMENT'){
    const el=$('#t3-improvement');
    if(el && !el.value.includes(item.text))el.value=(el.value?el.value+'\n':'')+item.text;
  }
  scheduleLocalSave();renderCqiCarryForward();renderReadiness();
}

/* ---------- V27 Programme Dashboard ---------- */
async function loadDashboard(){
  if(!$('#dashboard-body'))return;
  $('#dashboard-body').innerHTML='<tr><td colspan="9">กำลังโหลด…</td></tr>';
  setBusy(true,'กำลังโหลด Programme Dashboard และ controlled responsibility…');
  try{
    const args={
      p_programme_code:$('#programme-select').value,
      p_academic_year:$('#year-select').value,
      p_term_code:$('#term-select').value
    };
    const [dash,queue,resp]=await Promise.all([
      client.rpc('hepe_fast_tqf_programme_dashboard',args),
      client.rpc('hepe_fast_tqf_evidence_queue',args),
      client.rpc('hepe_fast_tqf_programme_responsibility_by_code',args)
    ]);
    if(dash.error)throw dash.error;if(queue.error)throw queue.error;
    dashboardCtx=dash.data;evidenceQueueCtx=queue.data;programmeResponsibilityCtx=resp.error?null:resp.data;
    renderDashboard();renderEvidenceQueue();enhanceAccessibility();
    say('โหลด Programme Dashboard แล้ว','ok');
  } finally {
    const app=$('#app-view');if(app)app.setAttribute('aria-busy','false');
  }
}
function renderDashboard(){
  const s=dashboardCtx?.summary||{},rows=dashboardCtx?.courses||[];
  $('#dash-curriculum').textContent=s.curriculum_courses??0;
  $('#dash-offered').textContent=s.offered_courses??0;
  $('#dash-tqf3').textContent=s.tqf3_present??0;
  $('#dash-tqf5').textContent=s.tqf5_present??0;
  $('#dash-verified').textContent=s.verified_courses??0;
  $('#dash-insufficient').textContent=s.insufficient_evidence??0;
  renderDashboardInstructorOptions();
  filterDashboardRows(rows);
}
function dashboardDescriptionStatus(code){
  const c=courseCatalog.find(x=>x.course_code===code);return c?.description?.description_th?'AVAILABLE':'MISSING';
}
function dashboardOperationalReadiness(x){
  const checks=[dashboardDescriptionStatus(x.course_code)==='AVAILABLE',!!x.course_offering_id,!!x.tqf3_record_id,!!x.tqf5_record_id,x.verification_status==='VERIFIED'];
  return Math.round(checks.filter(Boolean).length/checks.length*100);
}
function dashboardAttention(x){return dashboardOperationalReadiness(x)<100;}
function dashboardRecentTs(x){return x.verification_updated_at?new Date(x.verification_updated_at).getTime():0;}
function programmeResponsibilityFor(code){
  return (programmeResponsibilityCtx?.courses||[]).find(x=>x.course_code===code)||{responsible_people:[],has_pending_roster:false};
}
function dashboardResponsibleNames(code){
  return (programmeResponsibilityFor(code).responsible_people||[]).map(x=>x.person_name_th).filter(Boolean);
}
function renderDashboardInstructorOptions(){
  const sel=$('#dashboard-instructor');if(!sel)return;
  const current=sel.value||'ALL';
  const names=[...new Set((programmeResponsibilityCtx?.courses||[]).flatMap(x=>(x.responsible_people||[]).map(p=>p.person_name_th)).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'th'));
  sel.innerHTML='<option value="ALL">ผู้รับผิดชอบทั้งหมด</option><option value="CONTROLLED_ONLY">มี controlled responsibility</option><option value="MISSING">ยังไม่มี controlled responsibility</option>'+names.map(n=>'<option value="PERSON:'+esc(n)+'">'+esc(n)+'</option>').join('');
  if([...sel.options].some(o=>o.value===current))sel.value=current;
}
function filterDashboardRows(rows=dashboardCtx?.courses||[]){
  const q=($('#dashboard-search')?.value||'').trim().toLowerCase(),prefix=$('#dashboard-prefix')?.value||'ALL',role=$('#dashboard-role')?.value||'ALL',doc=$('#dashboard-doc')?.value||'ALL',ver=$('#dashboard-verification')?.value||'ALL',readiness=$('#dashboard-readiness')?.value||'ALL',sort=$('#dashboard-sort')?.value||'COURSE',instructor=$('#dashboard-instructor')?.value||'ALL';
  const attention=$('#dashboard-attention')?.checked||false,sourceGap=$('#dashboard-source-gap')?.checked||false;
  let filtered=rows.filter(x=>{
    const score=dashboardOperationalReadiness(x),names=dashboardResponsibleNames(x.course_code);
    if(q&&!(x.course_code+' '+x.title_th+' '+(x.title_en||'')+' '+names.join(' ')).toLowerCase().includes(q))return false;
    if(prefix!=='ALL'&&!x.course_code.startsWith(prefix))return false;
    if(role!=='ALL'&&x.course_role!==role)return false;
    if(doc==='MISSING_TQF3'&&x.tqf3_record_id)return false;if(doc==='MISSING_TQF5'&&x.tqf5_record_id)return false;if(doc==='OFFERED_ONLY'&&!x.course_offering_id)return false;
    if(ver!=='ALL'&&(x.verification_status||'NO_RECORD')!==ver)return false;
    if(readiness==='READY'&&score!==100)return false;if(readiness==='NOT_READY'&&score===100)return false;
    if(instructor==='CONTROLLED_ONLY'&&!names.length)return false;
    if(instructor==='MISSING'&&names.length)return false;
    if(instructor.startsWith('PERSON:')&&!names.includes(instructor.slice(7)))return false;
    if(sourceGap&&dashboardDescriptionStatus(x.course_code)!=='MISSING')return false;if(attention&&!dashboardAttention(x))return false;return true;
  });
  if(sort==='RECENT')filtered=filtered.slice().sort((a,b)=>dashboardRecentTs(b)-dashboardRecentTs(a)||a.course_code.localeCompare(b.course_code));
  if(sort==='READINESS')filtered=filtered.slice().sort((a,b)=>dashboardOperationalReadiness(a)-dashboardOperationalReadiness(b)||a.course_code.localeCompare(b.course_code));
  if($('#dashboard-filter-count'))$('#dashboard-filter-count').textContent=filtered.length+' / '+rows.length;
  $('#dashboard-body').innerHTML=filtered.map(x=>{
    const score=dashboardOperationalReadiness(x),rr=programmeResponsibilityFor(x.course_code),names=dashboardResponsibleNames(x.course_code);
    const respCell=names.length?names.map(n=>'<div>'+esc(n)+'</div>').join('')+(rr.has_pending_roster?'<span class="badge warn">roster pending</span>':''):'<span class="help">ยังไม่มี controlled record</span>';
    return '<tr><td><button type="button" class="link-btn dashboard-open-course" data-course="'+esc(x.course_code)+'"><b>'+esc(x.course_code)+'</b></button><div class="help">'+esc(x.title_th)+'</div></td>'+
      '<td>'+respCell+'</td>'+
      '<td>'+badgeHtml(dashboardDescriptionStatus(x.course_code),dashboardDescriptionStatus(x.course_code)==='AVAILABLE'?'ok':'danger')+'</td>'+
      '<td>'+badgeHtml(x.course_offering_id?'OFFERED':'NOT_OFFERED',x.course_offering_id?'ok':'info')+'</td>'+
      '<td>'+badgeHtml(x.tqf3_status||'—',kind(x.tqf3_status))+'</td><td>'+badgeHtml(x.tqf5_status||'—',kind(x.tqf5_status))+'</td><td>'+badgeHtml(x.verification_status||'—',kind(x.verification_status))+'</td>'+
      '<td>'+badgeHtml(score+'%',score===100?'ok':score>=60?'warn':'danger')+'</td><td>'+badgeHtml(dashboardAttention(x)?'NEEDS ATTENTION':'OK',dashboardAttention(x)?'warn':'ok')+'</td></tr>';
  }).join('')||'<tr><td colspan="9">ไม่พบรายวิชา</td></tr>';
  $$('.dashboard-open-course').forEach(b=>b.onclick=()=>openDashboardCourse(b.dataset.course));
  renderProgrammeAiSummary(filtered);
  enhanceAccessibility();
}
async function openDashboardCourse(code){
  const sel=$('#course-select');if(!sel)return;
  const opt=[...sel.options].find(o=>o.value===code);if(!opt){say('รายวิชานี้ไม่อยู่ใน course selector ปัจจุบัน','warn');return;}
  sel.value=code;await loadSelectedCourse();setTab('tqf3');window.scrollTo({top:0,behavior:'smooth'});
}
function renderProgrammeAiSummary(rows=dashboardCtx?.courses||[]){
  const box=$('#dashboard-ai-summary');if(!box)return;
  const ready=rows.filter(x=>dashboardOperationalReadiness(x)===100).length,missingT3=rows.filter(x=>!x.tqf3_record_id).length,missingT5=rows.filter(x=>!x.tqf5_record_id).length,evidence=rows.filter(x=>x.verification_status==='INSUFFICIENT_EVIDENCE').length,sourceGaps=rows.filter(x=>dashboardDescriptionStatus(x.course_code)==='MISSING').length,controlled=rows.filter(x=>dashboardResponsibleNames(x.course_code).length).length;
  box.value='สรุปเชิงปฏิบัติการ (Local Smart QA)\nรายวิชาในมุมมอง: '+rows.length+'\nOperational readiness 100%: '+ready+'\nยังไม่มี มคอ.3: '+missingT3+'\nยังไม่มี มคอ.5: '+missingT5+'\nINSUFFICIENT_EVIDENCE: '+evidence+'\nSource gap: '+sourceGaps+'\nControlled responsibility: '+controlled+'\n\nหมายเหตุ: เป็นสรุปสถานะระบบ ไม่ใช่การประเมินคุณภาพทางวิชาการหรือ institutional approval';
}

function badgeHtml(text,k){return '<span class="badge '+(k||kind(text))+'">'+esc(text||'—')+'</span>';}

function renderEvidenceQueue(){
  const s=evidenceQueueCtx?.summary||{},rows=evidenceQueueCtx?.items||[];
  if($('#evidence-queue-summary'))$('#evidence-queue-summary').textContent='Missing '+(s.no_verification_record??0)+' · Candidate '+(s.with_candidates??0)+' · Verified '+(s.verified??0);
  if(!$('#evidence-queue-body'))return;
  $('#evidence-queue-body').innerHTML=rows.map(x=>'<tr>'+
    '<td><b>'+esc(x.course_code)+'</b><div class="help">'+esc(x.title_th||'')+'</div></td>'+
    '<td>'+badgeHtml(x.verification_status||'NO_RECORD',kind(x.verification_status))+'</td>'+
    '<td>'+Number(x.linked_evidence_count||0)+'</td>'+
    '<td>'+Number(x.candidate_count||0)+'</td>'+
    '<td>'+badgeHtml(x.queue_state||'—',x.queue_state==='COMPLETE'?'ok':x.queue_state==='MISSING'?'danger':'warn')+'</td>'+
    '</tr>').join('')||'<tr><td colspan="5">ไม่มีข้อมูล</td></tr>';
}




function enhanceAccessibility(){
  $$('.table-wrap').forEach((el,i)=>{
    el.tabIndex=0;el.setAttribute('role','region');
    el.setAttribute('aria-describedby','table-scroll-instruction');
    if(!el.getAttribute('aria-label')){
      const section=el.closest('.form-section,.card,.review-subsection');
      const heading=section?.querySelector('h2,h3,h4')?.textContent?.trim();
      el.setAttribute('aria-label',heading?'ตาราง '+heading:'ตารางข้อมูล '+(i+1));
    }
  });
  $$('button:not([type])').forEach(b=>b.type='button');
  const tabs=$$('.tab[role="tab"]');
  tabs.forEach((tab,i)=>{
    if(tab.dataset.a11yBound==='1')return;
    tab.dataset.a11yBound='1';
    tab.addEventListener('keydown',e=>{
      if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
      e.preventDefault();
      let next=i;
      if(e.key==='ArrowRight')next=(i+1)%tabs.length;
      if(e.key==='ArrowLeft')next=(i-1+tabs.length)%tabs.length;
      if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;
      tabs[next].focus();setTab(tabs[next].dataset.tab);
    });
  });
}

function toggleSubmissionMode(){
  document.body.classList.toggle('submission-mode');
  const on=document.body.classList.contains('submission-mode');
  $('#submission-mode').textContent=on?'ออกจากโหมดส่งงาน':'โหมดส่งงาน';
  say(on?'เปิดโหมดส่งงาน: ซ่อนข้อมูลพัฒนาและแสดง Draft watermark':'กลับสู่โหมดทำงาน','ok');
}

/* ---------- Save / workflow ---------- */
document.addEventListener('click',e=>{
  const btn=e.target.closest?.('#preview-tqf3-readiness');
  if(!btn)return;
  e.preventDefault();
  e.stopPropagation();
  if(btn.dataset.busy==='1')return;
  btn.dataset.busy='1';
  const original=btn.textContent;
  btn.textContent='กำลังตรวจ…';
  btn.disabled=true;
  const out=$('#tqf3-preview-readiness-result');
  if(out){
    out.hidden=false;
    out.className='notice info';
    out.innerHTML='<strong>รับคำสั่งแล้ว</strong><div class="help">กำลังเรียก Preview Revalidation…</div>';
  }
  createTqf3PreviewReadiness()
    .catch(err=>{
      if(out){
        out.hidden=false;
        out.className='notice danger';
        out.innerHTML='<strong>Preview error</strong><div class="help">'+esc(friendlyError(err))+'</div>';
      }
      say(friendlyError(err),'danger');
    })
    .finally(()=>{
      btn.dataset.busy='0';
      btn.textContent=original;
      btn.disabled=false;
    });
},true);

document.addEventListener('click',e=>{
  const btn=e.target.closest?.('[data-tqf3-review-decision]');
  if(!btn)return;
  e.preventDefault();
  e.stopPropagation();
  const decision=btn.dataset.tqf3ReviewDecision;
  decideTqf3HumanReview(decision).catch(err=>say(friendlyError(err),'danger'));
},true);

document.addEventListener('click',e=>{
  const btn=e.target.closest?.('#submit-tqf3-human-review');
  if(!btn)return;
  e.preventDefault();
  e.stopPropagation();
  submitTqf3HumanReview().catch(err=>say(friendlyError(err),'danger'));
},true);

async function createTqf3PreviewReadiness(){
  if(!docCtx?.course?.course_offering_id)throw new Error('ยังไม่พบ Course Offering สำหรับปี/ภาคนี้');
  const out=$('#tqf3-preview-readiness-result');
  if(out){
    out.hidden=false;
    out.className='notice info';
    out.innerHTML='<strong>กำลังตรวจความพร้อม…</strong><div class="help">กำลังสร้าง preview ใหม่จาก Working Version ปัจจุบัน</div>';
  }
  say('กำลังสร้าง TQF3 Preview เพื่อตรวจความพร้อม…');
  const {data,error}=await client.rpc('hepe_revalidate_tqf3_working_preview_by_code',{
    ...courseArgs(),
    p_target_format:'HTML'
  });
  if(error){
    if(out){
      out.className='notice danger';
      out.innerHTML='<strong>สร้าง Preview ไม่สำเร็จ</strong><div class="help">'+esc(friendlyError(error))+'</div>';
    }
    throw error;
  }
  const session=data?.session||data||{};
  const status=session?.preview_status||data?.preview_status||'UNKNOWN';
  const findings=Array.isArray(data?.findings)?data.findings:[];
  const blocking=findings.filter(x=>x.is_blocking&&!x.resolved&&!x.is_resolved);
  const infos=findings.filter(x=>!x.is_blocking);
  if(out){
    out.className='notice '+(blocking.length?'warn':'ok');
    out.innerHTML=
      '<strong>Preview '+esc(status)+'</strong>'+
      '<div class="help">Blocking findings: '+blocking.length+' · Informational findings: '+infos.length+'</div>'+
      (blocking.length?'<ul>'+blocking.map(x=>'<li><b>'+esc(x.finding_code||x.code||'BLOCKER')+'</b> — '+esc(x.message||'')+'</li>').join('')+'</ul>':'<div class="help">ไม่พบ blocking finding ใหม่ · พร้อมเข้าสู่ Human Review ขั้นถัดไป</div>');
  }
  const submitBtn=$('#submit-tqf3-human-review');
  if(submitBtn){
    const ready=status==='READY_FOR_REVIEW'&&blocking.length===0;
    submitBtn.disabled=!ready;
    submitBtn.hidden=!ready;
  }
  say(
    'Preview '+status+' · blocking findings '+blocking.length+
    (blocking.length?' · '+blocking.map(x=>x.finding_code||x.code||'BLOCKER').join(', '):' · พร้อมสำหรับ human review'),
    blocking.length?'warn':'ok'
  );
  return data;
}
async function submitTqf3HumanReview(){
  const btn=$('#submit-tqf3-human-review');
  if(!btn||btn.disabled)return;
  const ok=window.confirm('ส่ง Preview ปัจจุบันเข้าสู่ Human Review หรือไม่? ขั้นนี้เป็นเพียงการส่งให้ทบทวน ยังไม่ใช่การอนุมัติ Controlled Export และยังไม่ทำให้เอกสารเป็นทางการ');
  if(!ok)return;
  const original=btn.textContent;
  btn.disabled=true;
  btn.textContent='กำลังส่ง…';
  const out=$('#tqf3-preview-readiness-result');
  try{
    const {data,error}=await client.rpc('hepe_submit_tqf3_preview_by_code',courseArgs());
    if(error)throw error;
    const session=data?.session||data||{};
    const status=session?.preview_status||data?.preview_status||'SUBMITTED';
    if(out){
      out.hidden=false;
      out.className='notice ok';
      out.innerHTML='<strong>ส่งเข้า Human Review แล้ว</strong><div class="help">Preview status: '+esc(status)+' · ยังไม่ใช่ Controlled Export approval</div>';
    }
    say('ส่ง TQF3 Preview เข้า Human Review แล้ว · '+status,'ok');
  }catch(err){
    if(out){
      out.hidden=false;
      out.className='notice danger';
      out.innerHTML='<strong>ส่งเข้า Human Review ไม่สำเร็จ</strong><div class="help">'+esc(friendlyError(err))+'</div>';
    }
    throw err;
  }finally{
    btn.textContent=original;
    btn.disabled=true;
  }
}

async function loadTqf3HumanReviewState(){
  const panel=$('#tqf3-human-review-panel');
  if(!panel)return;
  const {data,error}=await client.rpc('hepe_latest_tqf3_preview_by_code',courseArgs());
  if(error){
    panel.hidden=true;
    currentTqf3Preview=null;
    return;
  }
  currentTqf3Preview=data?.found?data.detail:null;
  renderTqf3HumanReviewPanel();
}

function renderTqf3HumanReviewPanel(){
  const panel=$('#tqf3-human-review-panel');
  if(!panel)return;
  const detail=currentTqf3Preview;
  if(!detail){panel.hidden=true;return;}
  const session=detail?.session||detail||{};
  const status=session.preview_status||'UNKNOWN';
  panel.hidden=status!=='SUBMITTED'&&status!=='UNDER_REVIEW'&&status!=='REVISION_REQUIRED'&&status!=='REJECTED'&&status!=='APPROVED_FOR_CONTROLLED_EXPORT';
  if(panel.hidden)return;

  const exportAllowed=!!session.authoritative_export_allowed;
  $('#tqf3-human-review-status').textContent=status;
  $('#tqf3-human-review-watermark').textContent=session.required_watermark||'—';

  const approve=$('#tqf3-review-approve-export');
  if(approve){
    approve.disabled=!exportAllowed||!['SUBMITTED','UNDER_REVIEW'].includes(status);
    approve.title=exportAllowed?'':'ยังไม่อนุญาต Controlled Export เพราะเอกสารยังเป็น DRAFT / UNVERIFIED';
  }
  const canDecide=['SUBMITTED','UNDER_REVIEW'].includes(status);
  $('#tqf3-review-request-revision').disabled=!canDecide;
  $('#tqf3-review-reject').disabled=!canDecide;

  const reason=$('#tqf3-human-review-export-note');
  if(reason){
    reason.textContent=exportAllowed
      ?'Preview นี้อนุญาต authoritative export ตาม governance ปัจจุบัน'
      :'Approve Controlled Export ถูกปิดไว้: current preview ยังไม่อนุญาต authoritative export';
  }
}

async function decideTqf3HumanReview(decision){
  const detail=currentTqf3Preview;
  const session=detail?.session||detail||{};
  const id=session.document_preview_session_id;
  if(!id)throw new Error('ไม่พบ Preview ปัจจุบัน');

  const labels={
    REQUEST_REVISION:'Request Revision',
    REJECT:'Reject',
    APPROVE_CONTROLLED_EXPORT:'Approve Controlled Export'
  };
  const note=$('#tqf3-human-review-note')?.value?.trim()||null;

  if(decision==='APPROVE_CONTROLLED_EXPORT'&&!session.authoritative_export_allowed){
    throw new Error('AUTHORITATIVE_EXPORT_NOT_ALLOWED_FOR_CURRENT_PREVIEW');
  }

  const ok=window.confirm(
    'ยืนยัน '+(labels[decision]||decision)+' สำหรับ Preview นี้หรือไม่? การตัดสินใจนี้จะถูกบันทึกใน Human Review audit trail'
  );
  if(!ok)return;

  const {data,error}=await client.rpc('hepe_decide_document_preview',{
    p_document_preview_session_id:id,
    p_decision:decision,
    p_note:note
  });
  if(error)throw error;
  currentTqf3Preview=data;
  renderTqf3HumanReviewPanel();
  say('บันทึก Human Review decision แล้ว · '+(data?.session?.preview_status||data?.preview_status||decision),'ok');
}

async function saveTqf3(){
  if(!docCtx?.course?.course_offering_id)throw new Error('ยังไม่พบ Course Offering สำหรับปี/ภาคนี้ จึงยังบันทึก มคอ.3 ไม่ได้');
  say('กำลังบันทึก มคอ.3 Working Version…');
  const {data,error}=await client.rpc('hepe_save_tqf3_working_version_by_code',{...courseArgs(),p_content:collectTqf3(),p_source_status:'UNVERIFIED'});if(error)throw error;
  clearLocalBuffer();say('บันทึก มคอ.3 สำเร็จ — Version '+data.version_no,'ok');await loadSelectedCourse();
}
async function saveTqf5(){
  if(!docCtx?.course?.course_offering_id)throw new Error('ยังไม่พบ Course Offering สำหรับปี/ภาคนี้');
  const {data,error}=await client.rpc('hepe_create_tqf5_working_draft_by_code',{...courseArgs(),p_payload:collectTqf5(),p_source_reference:'HEPE Fast TQF Portal v36 / completion-rationale-evidence-readiness / NON-PRODUCTION'});if(error)throw error;
  clearLocalBuffer();say('บันทึก มคอ.5 Draft สำเร็จ — '+data.result_snapshot_id,'ok');await loadSelectedCourse();
}
async function createVerification(){const {data,error}=await client.rpc('hepe_ensure_verification_draft_by_code',courseArgs());if(error)throw error;say(data.created?'สร้างรายการทวนสอบแล้ว':'มีรายการอยู่แล้ว','ok');await loadSelectedCourse();}
async function saveVerificationNote(){if(!docCtx?.verification?.verification_record_id)return createVerification();const {error}=await client.rpc('hepe_save_verification_note',{p_verification_record_id:docCtx.verification.verification_record_id,p_finding_summary:verificationNote()});if(error)throw error;say('บันทึกทวนสอบแล้ว','ok');await loadSelectedCourse();}
async function transitionVerification(status){const {error}=await client.rpc('hepe_review_course_verification',{p_verification_record_id:docCtx.verification.verification_record_id,p_new_status:status,p_finding_summary:verificationNote()});if(error)throw error;say('เปลี่ยนสถานะเป็น '+status,'ok');await loadSelectedCourse();}

/* ---------- Auth ---------- */
async function loginMagic(e){e.preventDefault();const email=$('#login-email').value.trim();const {error}=await client.auth.signInWithOtp({email,options:{shouldCreateUser:false,emailRedirectTo:'https://kasemch.github.io/hepe-trial/'}});if(error)throw error;say('ส่ง Magic Link แล้ว กรุณาเปิดอีเมลฉบับล่าสุด','ok');}
async function loginGoogle(){
  const {error}=await client.auth.signInWithOAuth({
    provider:'google',
    options:{
      redirectTo:'https://kasemch.github.io/hepe-trial/',
      queryParams:{prompt:'select_account'}
    }
  });
  if(error)throw error;
}
async function loginPassword(){const email=$('#login-email').value.trim(),password=$('#login-password').value;if(!email||!password)throw new Error('กรุณากรอกอีเมลและรหัสผ่าน');const {error}=await client.auth.signInWithPassword({email,password});if(error)throw error;}
async function logout(){await client.auth.signOut();location.reload();}

function bindStatic(){
  if(staticBound)return; staticBound=true;
  $$('.tab').forEach(b=>b.onclick=()=>setTab(b.dataset.tab));
  $('#programme-select').onchange=()=>{cfg.course_code='';loadCourses().catch(e=>say(friendlyError(e),'danger'));};
  $('#year-select').onchange=()=>{renderTermOptions();loadCourses().catch(e=>say(friendlyError(e),'danger'));};
  $('#term-select').onchange=()=>loadCourses().catch(e=>say(friendlyError(e),'danger'));
  $('#course-select').onchange=()=>loadSelectedCourse().catch(e=>say(friendlyError(e),'danger'));
  $('#reload-course').onclick=()=>loadSelectedCourse().catch(e=>say(friendlyError(e),'danger'));
  $('#add-clo').onclick=addClo;$('#add-week').onclick=addWeek;$('#add-assessment').onclick=addAssessment;
  $('#bulk-apply-empty').onclick=()=>bulkApplyWeeks(false);$('#bulk-apply-all').onclick=()=>bulkApplyWeeks(true);
  $('#sync-tqf5-from-tqf3').onclick=syncTqf5FromTqf3;
  $('#submission-mode').onclick=toggleSubmissionMode;
  $('#save-tqf3').onclick=()=>saveTqf3().catch(e=>say(friendlyError(e),'danger'));$('#save-tqf5').onclick=()=>saveTqf5().catch(e=>say(friendlyError(e),'danger'));$('#save-verification-note').onclick=()=>saveVerificationNote().catch(e=>say(friendlyError(e),'danger'));
  $$('.ai-section').forEach(b=>b.onclick=()=>runSectionAi(b.dataset.section,null,b));
  $('#ai-chatgpt').onclick=()=>openChatGPT().catch(e=>say(friendlyError(e),'danger'));$('#ai-show-prompt').onclick=()=>{$('#ai-prompt-wrap').hidden=!$('#ai-prompt-wrap').hidden;$('#ai-prompt').value=aiPrompt();};
  $('#print-form').onclick=()=>window.print();$('#logout').onclick=()=>logout().catch(e=>say(friendlyError(e),'danger'));
  $('#login-form').addEventListener('submit',e=>loginMagic(e).catch(x=>say(friendlyError(x),'danger')));$('#google-login').onclick=()=>loginGoogle().catch(x=>say(friendlyError(x),'danger'));$('#password-login').onclick=()=>loginPassword().catch(x=>say(friendlyError(x),'danger'));
  $('#restore-local').onclick=restoreLocalDraft;$('#discard-local').onclick=discardLocalDraft;
  $('#version-a').onchange=compareVersions;$('#version-b').onchange=compareVersions;
  $('#dashboard-search').oninput=()=>filterDashboardRows();
  ['#dashboard-prefix','#dashboard-role','#dashboard-doc','#dashboard-verification','#dashboard-readiness','#dashboard-sort','#dashboard-instructor'].forEach(id=>{if($(id))$(id).onchange=()=>filterDashboardRows();});
  if($('#dashboard-attention'))$('#dashboard-attention').onchange=()=>filterDashboardRows();
  if($('#dashboard-source-gap'))$('#dashboard-source-gap').onchange=()=>filterDashboardRows();
  if($('#register-evidence-candidate'))$('#register-evidence-candidate').onclick=()=>registerEvidenceCandidate().catch(e=>say(friendlyError(e),'danger'));
  if($('#check-evidence-duplicate'))$('#check-evidence-duplicate').onclick=()=>checkEvidenceDuplicate().catch(e=>say(friendlyError(e),'danger'));
  if($('#evidence-candidate-filter'))$('#evidence-candidate-filter').onchange=renderEvidenceWorkspace;
  $$('[data-ai-inline-close]').forEach(b=>b.onclick=()=>{const p=b.closest('.ai-inline-result');if(p)p.hidden=true;});
  ensureV33Ui();
  if($('#ai-copy-proposed'))$('#ai-copy-proposed').onclick=()=>copyAiProposedText();
  if($('#ai-undo-apply'))$('#ai-undo-apply').onclick=undoLastAiApply;
  if($('#review-package-print'))$('#review-package-print').onclick=()=>window.print();
  document.addEventListener('input',e=>{
    if(e.target.closest('#app-view')&&!e.target.closest('.selector-card')&&!e.target.closest('#dashboard-panel')){scheduleLocalSave();renderSectionCompletionV33();updateFinishSectionStatesV36();}
  });
  document.addEventListener('keydown',e=>{
    if(!e.altKey)return;
    if(e.key==='ArrowLeft'){e.preventDefault();const b=$('#rq-prev');if(b)b.click();}
    if(e.key==='ArrowRight'){e.preventDefault();const b=$('#rq-next');if(b)b.click();}
  });
  document.addEventListener('change',e=>{
    if(e.target.closest('#app-view')&&!e.target.closest('.selector-card')&&!e.target.closest('#dashboard-panel'))scheduleLocalSave();
  });
}

async function boot(){
  cfg=await fetch('./config/state.json?v=36',{cache:'no-store'}).then(r=>r.json()).catch(()=>({}));
  const {data:{session}}=await client.auth.getSession();
  $('#login-view').hidden=!!session;$('#app-view').hidden=!session;
  bindStatic();enhanceAccessibility();
  if(!session){say('กรุณา Login เพื่อใช้งาน HEPE Fast TQF Portal','warn');return;}
  $('#identity').textContent=session.user.email||'Authenticated';
  await loadInitialCatalogs();enhanceAccessibility();
}
client.auth.onAuthStateChange((event,session)=>{if(event==='SIGNED_IN'&&session)setTimeout(()=>boot().catch(e=>say(friendlyError(e),'danger')),0);});
boot().catch(e=>say(e.message||String(e),'danger'));
})();