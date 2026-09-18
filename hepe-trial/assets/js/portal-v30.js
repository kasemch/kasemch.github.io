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
let activeTab='tqf3',activeAiSection='curriculum',aiSuggestions=[],aiDecisions=[];
let saveTimer=null,staticBound=false,lastAppliedChange=null;

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
  $$$('.tab').forEach(x=>x.classList.toggle('active',x.dataset.tab===name));
  $$('.panel').forEach(x=>x.hidden=x.id!=='panel-'+name);
  activeAiSection=name==='tqf3'?'curriculum':name;
  renderAiRail();
  if(name==='overview')renderReadiness();
  if(name==='dashboard')loadDashboard().catch(e=>say(e.message,'danger'));
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
  say('กำลังดึงข้อมูลหลักสูตร เอกสาร หลักฐาน และประวัติรุ่น…');
  const args=courseArgs();
  const [cc,d,vh,ew,cqi]=await Promise.all([
    client.rpc('hepe_fast_tqf_curriculum_context',{p_programme_code:p,p_course_code:c}),
    client.rpc('hepe_fast_tqf_portal_context_by_code',args),
    client.rpc('hepe_fast_tqf_version_history_by_code',{...args,p_limit:10}),
    client.rpc('hepe_fast_tqf_evidence_workspace_by_code',args),
    client.rpc('hepe_fast_tqf_cqi_context_by_code',args)
  ]);
  if(cc.error)throw cc.error;
  curriculumCtx=cc.data;
  docCtx=d.error?null:d.data;
  versionHistory=vh.error?[]:(Array.isArray(vh.data)?vh.data:[]);
  evidenceWorkspace=ew.error?null:ew.data;
  cqiContext=cqi.error?null:cqi.data;
  renderCourseContext();
  renderTqf3();
  renderTqf5();
  renderVerification();
  renderEvidenceWorkspace();
  renderVersionCompare();
  renderCqiCarryForward();
  renderReadiness();
  renderAiRail();
  offerLocalRecovery();
  say(d.error?'โหลดข้อมูลหลักสูตรแล้ว แต่ยังไม่พบ Course Offering ในปี/ภาคนี้':'พร้อมกรอกและบันทึก Draft','ok');
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
    plo_matrix:fs.plo_matrix||{},
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
  renderCloPloMatrix(f.plo_matrix||{});
  renderWeeklyCoverage();
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
  $$$('.clo-ai').forEach(b=>b.onclick=()=>runSectionAi('clo',Number(b.dataset.row)));
  $$$('.week-ai').forEach(b=>b.onclick=()=>runSectionAi('weekly',Number(b.dataset.row)));
  $$$('.assess-ai').forEach(b=>b.onclick=()=>runSectionAi('assessment',Number(b.dataset.row)));
  $$$('.delete-clo').forEach(b=>b.onclick=()=>deleteRow('clo',Number(b.dataset.row)));
  $$$('.delete-week').forEach(b=>b.onclick=()=>deleteRow('week',Number(b.dataset.row)));
  $$$('.duplicate-week').forEach(b=>b.onclick=()=>duplicateWeek(Number(b.dataset.row)));
  $$$('.delete-assessment').forEach(b=>b.onclick=()=>deleteRow('assessment',Number(b.dataset.row)));
  $$('.as-weight').forEach(x=>x.oninput=()=>{updateAssessmentTotal();renderWeeklyCoverage();});
  $$('.t3-clo-code,.t3-clo-desc,.t3-clo-plo').forEach(x=>x.addEventListener('input',()=>{renderCloPloMatrix(collectPloMatrix());renderWeeklyCoverage();}));
  $$('.wk-topic,.wk-clo,.wk-plo,.wk-assess').forEach(x=>x.addEventListener('input',renderWeeklyCoverage));
}
function collectClos(){return $$$('.t3-clo-code').map((el,i)=>({code:el.value.trim()||('CLO'+(i+1)),description:$('.t3-clo-desc[data-row="'+i+'"]')?.value.trim()||'',plo:$('.t3-clo-plo[data-row="'+i+'"]')?.value.trim()||''}));}
function collectWeeks(){return $$$('.wk-topic').map((el,i)=>({week:i+1,topic:el.value.trim(),clo:$('.wk-clo[data-row="'+i+'"]')?.value.trim()||'',plo:$('.wk-plo[data-row="'+i+'"]')?.value.trim()||'',activities:$('.wk-act[data-row="'+i+'"]')?.value.trim()||'',lecture_hours:Number($('.wk-lec[data-row="'+i+'"]')?.value||0),practice_hours:Number($('.wk-prac[data-row="'+i+'"]')?.value||0),self_hours:Number($('.wk-self[data-row="'+i+'"]')?.value||0),assessment:$('.wk-assess[data-row="'+i+'"]')?.value.trim()||'',resources:$('.wk-res[data-row="'+i+'"]')?.value.trim()||''}));}
function collectAssessments(){return $$$('.as-item').map((el,i)=>({item:el.value.trim(),method:$('.as-method[data-row="'+i+'"]')?.value.trim()||'',weight:Number($('.as-weight[data-row="'+i+'"]')?.value||0),clos:$('.as-clo[data-row="'+i+'"]')?.value.trim()||'',evidence:$('.as-evidence[data-row="'+i+'"]')?.value.trim()||''}));}

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
  const plos=(curriculumCtx?.programme_plos||[]).map(x=>x.code).filter(Boolean);
  const current=seed&&Object.keys(seed).length?seed:collectPloMatrix();
  const canonical=curriculumCtx?.course_plo_mappings||[];
  setBadge('#canonical-mapping-state',
    canonical.length?'Canonical mapping: '+canonical.length+' รายการ':'Canonical mapping: ไม่พบใน runtime',
    canonical.length?'ok':'warn'
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
  $$('.irm-cell').forEach(el=>el.onchange=()=>{
    syncCloPloTextFromMatrix();
    scheduleLocalSave();
    renderWeeklyCoverage();
  });
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
    ui_version:'v29'
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
  base.results.grade_distribution=$$$('.grade-count').map(el=>({grade:el.dataset.grade,count:Number(el.value||0),percent:Number($('.grade-percent[data-grade="'+CSS.escape(el.dataset.grade)+'"]')?.value||0)}));
  base.results.clo_attainment=$$$('.clo-code').map((el,i)=>({clo:el.value.trim(),target_percent:Number($('.clo-target[data-row="'+i+'"]')?.value||0),attainment_percent:Number($('.clo-attain[data-row="'+i+'"]')?.value||0)}));
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
  const have=$$$('.vcheck').filter(x=>x.checked).map(x=>evidenceChecks.find(c=>c[0]===x.dataset.id)?.[1]).filter(Boolean);
  const miss=$$$('.vcheck').filter(x=>!x.checked).map(x=>evidenceChecks.find(c=>c[0]===x.dataset.id)?.[1]).filter(Boolean);
  return ($('#verification-note').value.trim()+'\n\n[Evidence checklist]\nมี: '+(have.join('; ')||'ยังไม่มีรายการที่ยืนยัน')+'\nขาด: '+(miss.join('; ')||'ไม่พบรายการที่ขาด')).trim();
}

/* ---------- AI / Smart QA ---------- */
function sectionData(section,row){
  if(section==='curriculum')return curriculumCtx;
  if(section==='clo')return row!=null?collectClos()[row]:collectClos();
  if(section==='weekly')return row!=null?collectWeeks()[row]:collectWeeks();
  if(section==='assessment')return row!=null?collectAssessments()[row]:collectAssessments();
  if(section==='tqf5')return collectTqf5();
  if(section==='verification')return{status:docCtx?.verification?.status,note:$('#verification-note').value,checked:$$$('.vcheck').filter(x=>x.checked).map(x=>x.dataset.id)};
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
    const checked=$$$('.vcheck').filter(x=>x.checked).length;if(checked<evidenceChecks.length)out.push(sug('v-evidence','หลักฐานยังครบ '+checked+'/'+evidenceChecks.length,'คงสถานะไม่ VERIFIED จนกว่าจะมีหลักฐานจริงครบตาม gate'));
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
    target:opts.target||null
  };
}
function runSectionAi(section,row=null){
  activeAiSection=section;
  aiSuggestions=analyze(section,row);
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
  $$$$('.suggestion-text').forEach(t=>t.oninput=()=>{
    const i=Number(t.dataset.i),b=$('.sug-apply[data-i="'+i+'"]');
    if(b)b.disabled=t.value.trim()===t.dataset.original.trim()||!t.value.trim();
  });
  $$$$('.sug-accept').forEach(b=>b.onclick=()=>decideSuggestion(Number(b.dataset.i),'ACCEPTED'));
  $$$$('.sug-edit').forEach(b=>b.onclick=()=>decideSuggestion(Number(b.dataset.i),'EDITED_AND_ACCEPTED'));
  $$$$('.sug-apply').forEach(b=>b.onclick=()=>applySuggestionToField(Number(b.dataset.i)));
  $$$$('.sug-reject').forEach(b=>b.onclick=()=>decideSuggestion(Number(b.dataset.i),'REJECTED'));
  renderAiProposedText();renderAiDecisionHistory();
  const r=readinessState();$('#ai-readiness-score').textContent=r.score+'%';
}
function applySuggestionToField(i){
  const s=aiSuggestions[i];if(!s?.target)return;
  const target=$(s.target),txt=$('.suggestion-text[data-i="'+i+'"]');
  if(!target||!txt||txt.value.trim()===txt.dataset.original.trim())return;
  lastAppliedChange={target:s.target,previous:target.value,next:txt.value.trim(),at:new Date().toISOString()};
  target.value=txt.value.trim();
  target.dispatchEvent(new Event('input',{bubbles:true}));
  decideSuggestion(i,'EDITED_AND_ACCEPTED');
  const undo=$('#ai-undo-apply');if(undo)undo.disabled=false;
  say('นำข้อความที่ผู้ใช้แก้แล้วไปใส่ช่องเป้าหมายแล้ว สามารถ Undo ได้','ok');
}
function undoLastAiApply(){
  if(!lastAppliedChange)return;
  const target=$(lastAppliedChange.target);
  if(target){
    target.value=lastAppliedChange.previous;
    target.dispatchEvent(new Event('input',{bubbles:true}));
    aiDecisions.push({document:activeTab==='tqf5'?'TQF5':'TQF3',section:activeAiSection,suggestion_id:'UNDO_APPLY',decision:'UNDO',text:lastAppliedChange.next,decided_at:new Date().toISOString()});
  }
  lastAppliedChange=null;
  const undo=$('#ai-undo-apply');if(undo)undo.disabled=true;
  say('ย้อนกลับการนำข้อความ AI ไปใส่ช่องล่าสุดแล้ว','ok');
  renderAiDecisionHistory();
}
function decideSuggestion(i,decision){
  const s=aiSuggestions[i];if(!s)return;
  s.status=decision;
  const text=$('.suggestion-text[data-i="'+i+'"]')?.value||s.message;
  aiDecisions.push({document:activeTab==='tqf5'?'TQF5':'TQF3',section:activeAiSection,suggestion_id:s.id,decision,text,decided_at:new Date().toISOString()});
  renderAiRail();renderAiDecisionHistory();renderReadiness();
}
function proposedTextFromSuggestions(){
  const direct=aiSuggestions.find(x=>x.target && x.status!=='REJECTED') || aiSuggestions.find(x=>x.status!=='REJECTED');
  if(!direct)return '';
  return direct.message||direct.action||'';
}
function renderAiProposedText(){
  const box=$('#ai-proposed-text');if(!box)return;
  box.value=proposedTextFromSuggestions();
}
function renderAiDecisionHistory(){
  const host=$('#ai-decision-history');if(!host)return;
  const recent=aiDecisions.slice(-8).reverse();
  host.innerHTML=recent.length?recent.map(x=>'<div class="history-row"><span class="badge '+(x.decision==='REJECTED'?'danger':x.decision==='UNDO'?'warn':'ok')+'">'+esc(x.decision)+'</span><span>'+esc(x.section||'')+' · '+esc(x.suggestion_id||'')+'</span></div>').join(''):'<div class="help">ยังไม่มีการตัดสินใจจาก AI</div>';
  const unresolved=aiSuggestions.filter(x=>!['ACCEPTED','EDITED_AND_ACCEPTED','REJECTED'].includes(x.status)).length;
  if($('#ai-unresolved-count'))$('#ai-unresolved-count').textContent=String(unresolved);
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
  const add=(name,state,detail,category='GENERAL')=>checks.push({name,state,detail,category});
  const d=curriculumCtx?.description;
  const workingDesc=($('#canonical-desc')?.value||'').trim();
  if(d?.description_th) add('คำอธิบายรายวิชา','PASS',(d.verification_status||'')+' / '+(d.authority_status||''),'SOURCE');
  else if(workingDesc) add('คำอธิบายรายวิชา','WARNING','มี Working fallback แต่ยังไม่มี canonical curriculum source','SOURCE');
  else add('คำอธิบายรายวิชา','BLOCKING','ยังไม่มีข้อความที่มี provenance รองรับ','SOURCE');

  const clos=collectClos();
  add('CLO',clos.length>=3&&clos.every(x=>x.description)?'PASS':'BLOCKING','CLO '+clos.filter(x=>x.description).length+'/'+clos.length+' มีข้อความ','TQF3');
  const orphanClos=clos.filter(x=>x.description&&!x.plo).length;
  add('CLO→PLO',orphanClos===0?'PASS':'WARNING',orphanClos?orphanClos+' CLO ยังไม่มี working PLO linkage':'มี working linkage ครบ','ALIGNMENT');

  const weeks=collectWeeks(),filled=weeks.filter(x=>x.topic).length;
  add('แผนรายสัปดาห์',filled===0?'BLOCKING':filled<weeks.length?'WARNING':'PASS','มีหัวข้อ '+filled+'/'+weeks.length+' สัปดาห์','TQF3');
  const weeklyOrphans=weeks.filter(x=>x.topic&&(!x.clo||!x.activities||!x.assessment)).length;
  add('Weekly Alignment',weeklyOrphans===0?'PASS':'WARNING',weeklyOrphans?weeklyOrphans+' สัปดาห์ยังขาด CLO/กิจกรรม/หลักฐาน':'ไม่พบ orphan ในแถวที่กรอก','ALIGNMENT');

  const assessments=collectAssessments(),total=assessments.reduce((sum,x)=>sum+Number(x.weight||0),0);
  add('น้ำหนักการประเมิน',Math.abs(total-100)<.01?'PASS':'BLOCKING','รวม '+total.toFixed(2)+'%','ASSESSMENT');
  const orphanAssess=assessments.filter(x=>x.item&&(!x.clos||!x.evidence)).length;
  add('Assessment→CLO/Evidence',orphanAssess===0?'PASS':'BLOCKING',orphanAssess?orphanAssess+' รายการยังขาด CLO หรือ evidence':'รายการที่กรอกมี CLO/evidence','ASSESSMENT');

  const t5=collectTqf5(),t3Codes=new Set(clos.map(x=>x.code).filter(Boolean)),t5Codes=new Set((t5.results?.clo_attainment||[]).map(x=>x.clo).filter(Boolean));
  const mismatch=[...t3Codes].filter(x=>!t5Codes.has(x));
  add('มคอ.3 ↔ มคอ.5 CLO',mismatch.length===0?'PASS':'WARNING',mismatch.length?'ขาด '+mismatch.join(', '):'สอดคล้อง','CROSS_DOCUMENT');

  const v=docCtx?.verification;
  add('ทวนสอบ',v?.status==='VERIFIED'?'PASS':v?.status==='INSUFFICIENT_EVIDENCE'?'WARNING':'WARNING',v?.status||'ยังไม่มี','VERIFICATION');
  const linked=(evidenceWorkspace?.linked_evidence||[]).length,candidates=(evidenceWorkspace?.candidates||[]).length;
  add('หลักฐานทวนสอบ',linked>0?'PASS':candidates>0?'WARNING':'WARNING','Linked '+linked+' · Candidate '+candidates,'EVIDENCE');

  const unresolved=aiSuggestions.filter(x=>!['ACCEPTED','EDITED_AND_ACCEPTED','REJECTED'].includes(x.status)).length;
  add('AI decisions',unresolved===0?'PASS':'WARNING',unresolved+' ข้อเสนอในหน้าปัจจุบันยังไม่ตัดสินใจ','AI');

  const blocking=checks.filter(x=>x.state==='BLOCKING').length;
  const warnings=checks.filter(x=>x.state==='WARNING').length;
  const passes=checks.filter(x=>x.state==='PASS').length;
  const score=Math.round((passes+warnings*.5)/checks.length*100);
  return{score,checks,blocking,warnings,passes};
}
function readinessBadge(state){
  return state==='PASS'?'<span class="badge ok">PASS</span>':state==='BLOCKING'?'<span class="badge danger">BLOCKING</span>':'<span class="badge warn">WARNING</span>';
}
function renderReadiness(){
  const r=readinessState();
  $('#readiness-ring').style.setProperty('--p',r.score);
  $('#readiness-score').textContent=r.score+'%';
  if($('#readiness-blocking'))$('#readiness-blocking').textContent=r.blocking;
  if($('#readiness-warning'))$('#readiness-warning').textContent=r.warnings;
  if($('#readiness-pass'))$('#readiness-pass').textContent=r.passes;
  $('#readiness-list').innerHTML=r.checks.map(x=>'<div class="check-row"><span>'+esc(x.name)+'<div class="help">'+esc(x.detail)+'</div></span>'+readinessBadge(x.state)+'</div>').join('');
  $('#consistency-list').innerHTML=r.checks.filter(x=>['ALIGNMENT','ASSESSMENT','CROSS_DOCUMENT','VERIFICATION','EVIDENCE'].includes(x.category)).map(x=>'<div class="check-row"><span>'+esc(x.name)+'</span><span>'+esc(x.detail)+' '+readinessBadge(x.state)+'</span></div>').join('');
  renderReviewPackagePreview();
}
function renderReviewPackagePreview(){
  const host=$('#review-package-preview');if(!host)return;
  const r=readinessState(),c=curriculumCtx?.course||{},p=curriculumCtx?.programme||{};
  host.innerHTML='<div class="review-grid">'+
    '<div><small>หลักสูตร</small><strong>'+esc(p.title_th||'—')+'</strong></div>'+
    '<div><small>รายวิชา</small><strong>'+esc((c.course_code||'')+' '+(c.title_th||''))+'</strong></div>'+
    '<div><small>TQF3 Working Version</small><strong>'+esc(docCtx?.tqf3?.current_version_no??'—')+'</strong></div>'+
    '<div><small>Readiness</small><strong>'+r.score+'% · Blocking '+r.blocking+' · Warning '+r.warnings+'</strong></div>'+
    '<div><small>Verification</small><strong>'+esc(docCtx?.verification?.status||'NO_RECORD')+'</strong></div>'+
    '<div><small>Course Description</small><strong>'+esc(curriculumCtx?.description?.authority_status||curriculumCtx?.description_status||'MISSING')+'</strong></div>'+
    '</div>';
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
}

/* ---------- V27 Evidence Workspace ---------- */
function renderEvidenceWorkspace(){
  const host=$('#evidence-workspace');if(!host)return;
  const linked=evidenceWorkspace?.linked_evidence||[];
  const cand=evidenceWorkspace?.candidates||[];
  const items=[];
  linked.forEach(x=>items.push({
    title:x.title||x.evidence_code,
    type:x.evidence_type_code||'LINKED_EVIDENCE',
    status:x.status_code||'PRESENT',
    source:x.source_reference||'',
    authority:'Linked controlled evidence',
    cls:'ok'
  }));
  cand.forEach(x=>items.push({
    title:x.evidence_id,
    type:x.evidence_type,
    status:(x.admission_status||'')+' / '+(x.verification_status||''),
    source:x.source||'',
    authority:x.authority_owner||'',
    cls:x.admission_status==='ADMITTED'?'ok':'warn'
  }));
  if(!items.length){
    host.innerHTML='<div class="notice danger">ยังไม่พบหลักฐานที่ผูกกับรายการทวนสอบนี้</div>';
    return;
  }
  host.innerHTML='<div class="table-wrap"><table><thead><tr><th>หลักฐาน</th><th>ประเภท</th><th>สถานะ</th><th>แหล่งที่มา</th><th>Authority</th></tr></thead><tbody>'+
    items.map(x=>'<tr><td>'+esc(x.title)+'</td><td>'+esc(x.type)+'</td><td><span class="badge '+x.cls+'">'+esc(x.status)+'</span></td><td>'+esc(x.source)+'</td><td>'+esc(x.authority)+'</td></tr>').join('')+
    '</tbody></table></div>';
}

async function registerEvidenceCandidate(){
  const get=id=>$(id)?.value.trim()||'';
  const date=get('#evidence-date');
  if(!get('#evidence-type')||!get('#evidence-source')||!date||!get('#evidence-authority')||!get('#evidence-assertion')){
    throw new Error('กรุณากรอกประเภทหลักฐาน แหล่งที่มา วันที่ Authority owner และ assertion ให้ครบ');
  }
  say('กำลังลงทะเบียน Evidence Candidate…');
  const {data,error}=await client.rpc('hepe_fast_tqf_register_evidence_candidate_by_code',{
    ...courseArgs(),
    p_evidence_type:get('#evidence-type'),
    p_source:get('#evidence-source'),
    p_version_date:date,
    p_authority_owner:get('#evidence-authority'),
    p_relevant_assertion:get('#evidence-assertion'),
    p_source_locator:get('#evidence-locator')||null,
    p_integrity_sha256:get('#evidence-sha')||null,
    p_note:get('#evidence-note')||null
  });
  if(error)throw error;
  say('ลงทะเบียน '+data.evidence_id+' เป็น UNVERIFIED / NOT_ADMITTED แล้ว','ok');
  ['#evidence-type','#evidence-source','#evidence-authority','#evidence-assertion','#evidence-locator','#evidence-sha','#evidence-note'].forEach(id=>{if($(id))$(id).value='';});
  await loadSelectedCourse();
}

/* ---------- V27 CQI Carry-forward ---------- */
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
  $$$('.cqi-use').forEach(b=>b.onclick=()=>decideCqi(blocks[Number(b.dataset.i)],'IMPLEMENT'));
  $$$('.cqi-skip').forEach(b=>b.onclick=()=>decideCqi(blocks[Number(b.dataset.i)],'NOT_ADOPTED'));
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
  $('#dashboard-body').innerHTML='<tr><td colspan="7">กำลังโหลด…</td></tr>';
  const dash=await client.rpc('hepe_fast_tqf_programme_dashboard',{
    p_programme_code:$('#programme-select').value,
    p_academic_year:$('#year-select').value,
    p_term_code:$('#term-select').value
  });
  if(dash.error)throw dash.error;
  const queue=await client.rpc('hepe_fast_tqf_evidence_queue',{
    p_programme_code:$('#programme-select').value,
    p_academic_year:$('#year-select').value,
    p_term_code:$('#term-select').value
  });
  if(queue.error)throw queue.error;
  dashboardCtx=dash.data;
  evidenceQueueCtx=queue.data;
  renderDashboard();
  renderEvidenceQueue();
}
function renderDashboard(){
  const s=dashboardCtx?.summary||{},rows=dashboardCtx?.courses||[];
  $('#dash-curriculum').textContent=s.curriculum_courses??0;
  $('#dash-offered').textContent=s.offered_courses??0;
  $('#dash-tqf3').textContent=s.tqf3_present??0;
  $('#dash-tqf5').textContent=s.tqf5_present??0;
  $('#dash-verified').textContent=s.verified_courses??0;
  $('#dash-insufficient').textContent=s.insufficient_evidence??0;
  filterDashboardRows(rows);
}
function dashboardDescriptionStatus(code){
  const c=courseCatalog.find(x=>x.course_code===code);
  return c?.description?.description_th?'AVAILABLE':'MISSING';
}
function dashboardAttention(x){
  const missingDesc=dashboardDescriptionStatus(x.course_code)==='MISSING';
  return !x.course_offering_id || !x.tqf3_record_id || !x.tqf5_record_id || x.verification_status!=='VERIFIED' || missingDesc;
}
function filterDashboardRows(rows=dashboardCtx?.courses||[]){
  const q=($('#dashboard-search')?.value||'').trim().toLowerCase();
  const prefix=$('#dashboard-prefix')?.value||'ALL';
  const role=$('#dashboard-role')?.value||'ALL';
  const doc=$('#dashboard-doc')?.value||'ALL';
  const ver=$('#dashboard-verification')?.value||'ALL';
  const attention=$('#dashboard-attention')?.checked||false;
  const filtered=rows.filter(x=>{
    if(q && !(x.course_code+' '+x.title_th+' '+(x.title_en||'')).toLowerCase().includes(q))return false;
    if(prefix!=='ALL'&&!x.course_code.startsWith(prefix))return false;
    if(role!=='ALL'&&x.course_role!==role)return false;
    if(doc==='MISSING_TQF3'&&x.tqf3_record_id)return false;
    if(doc==='MISSING_TQF5'&&x.tqf5_record_id)return false;
    if(doc==='OFFERED_ONLY'&&!x.course_offering_id)return false;
    if(ver!=='ALL'&&(x.verification_status||'NO_RECORD')!==ver)return false;
    if(attention&&!dashboardAttention(x))return false;
    return true;
  });
  if($('#dashboard-filter-count'))$('#dashboard-filter-count').textContent=filtered.length+' / '+rows.length;
  $('#dashboard-body').innerHTML=filtered.map(x=>'<tr>'+
    '<td><b>'+esc(x.course_code)+'</b><div class="help">'+esc(x.title_th)+'</div></td>'+
    '<td>'+badgeHtml(dashboardDescriptionStatus(x.course_code),dashboardDescriptionStatus(x.course_code)==='AVAILABLE'?'ok':'danger')+'</td>'+
    '<td>'+badgeHtml(x.course_offering_id?'OFFERED':'NOT_OFFERED',x.course_offering_id?'ok':'info')+'</td>'+
    '<td>'+badgeHtml(x.tqf3_status||'—',kind(x.tqf3_status))+'</td>'+
    '<td>'+badgeHtml(x.tqf5_status||'—',kind(x.tqf5_status))+'</td>'+
    '<td>'+badgeHtml(x.verification_status||'—',kind(x.verification_status))+'</td>'+
    '<td>'+(x.tqf3_version_no??'—')+'</td>'+
    '<td>'+badgeHtml(dashboardAttention(x)?'NEEDS ATTENTION':'OK',dashboardAttention(x)?'warn':'ok')+'</td>'+
    '</tr>').join('') || '<tr><td colspan="8">ไม่พบรายวิชา</td></tr>';
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




function toggleSubmissionMode(){
  document.body.classList.toggle('submission-mode');
  const on=document.body.classList.contains('submission-mode');
  $('#submission-mode').textContent=on?'ออกจากโหมดส่งงาน':'โหมดส่งงาน';
  say(on?'เปิดโหมดส่งงาน: ซ่อนข้อมูลพัฒนาและแสดง Draft watermark':'กลับสู่โหมดทำงาน','ok');
}

/* ---------- Save / workflow ---------- */
async function saveTqf3(){
  if(!docCtx?.course?.course_offering_id)throw new Error('ยังไม่พบ Course Offering สำหรับปี/ภาคนี้ จึงยังบันทึก มคอ.3 ไม่ได้');
  say('กำลังบันทึก มคอ.3 Working Version…');
  const {data,error}=await client.rpc('hepe_save_tqf3_working_version_by_code',{...courseArgs(),p_content:collectTqf3(),p_source_status:'LATEST_WORKING_CONFIRMED'});if(error)throw error;
  clearLocalBuffer();say('บันทึก มคอ.3 สำเร็จ — Version '+data.version_no,'ok');await loadSelectedCourse();
}
async function saveTqf5(){
  if(!docCtx?.course?.course_offering_id)throw new Error('ยังไม่พบ Course Offering สำหรับปี/ภาคนี้');
  const {data,error}=await client.rpc('hepe_create_tqf5_working_draft_by_code',{...courseArgs(),p_payload:collectTqf5(),p_source_reference:'HEPE Fast TQF Portal v30 / advanced-readiness-evidence-intake / NON-PRODUCTION'});if(error)throw error;
  clearLocalBuffer();say('บันทึก มคอ.5 Draft สำเร็จ — '+data.result_snapshot_id,'ok');await loadSelectedCourse();
}
async function createVerification(){const {data,error}=await client.rpc('hepe_ensure_verification_draft_by_code',courseArgs());if(error)throw error;say(data.created?'สร้างรายการทวนสอบแล้ว':'มีรายการอยู่แล้ว','ok');await loadSelectedCourse();}
async function saveVerificationNote(){if(!docCtx?.verification?.verification_record_id)return createVerification();const {error}=await client.rpc('hepe_save_verification_note',{p_verification_record_id:docCtx.verification.verification_record_id,p_finding_summary:verificationNote()});if(error)throw error;say('บันทึกทวนสอบแล้ว','ok');await loadSelectedCourse();}
async function transitionVerification(status){const {error}=await client.rpc('hepe_review_course_verification',{p_verification_record_id:docCtx.verification.verification_record_id,p_new_status:status,p_finding_summary:verificationNote()});if(error)throw error;say('เปลี่ยนสถานะเป็น '+status,'ok');await loadSelectedCourse();}

/* ---------- Auth ---------- */
async function loginMagic(e){e.preventDefault();const email=$('#login-email').value.trim();const {error}=await client.auth.signInWithOtp({email,options:{shouldCreateUser:false,emailRedirectTo:'https://kasemch.github.io/hepe-trial/'}});if(error)throw error;say('ส่ง Magic Link แล้ว กรุณาเปิดอีเมลฉบับล่าสุด','ok');}
async function loginPassword(){const email=$('#login-email').value.trim(),password=$('#login-password').value;if(!email||!password)throw new Error('กรุณากรอกอีเมลและรหัสผ่าน');const {error}=await client.auth.signInWithPassword({email,password});if(error)throw error;}
async function logout(){await client.auth.signOut();location.reload();}

function bindStatic(){
  if(staticBound)return; staticBound=true;
  $$$('.tab').forEach(b=>b.onclick=()=>setTab(b.dataset.tab));
  $('#programme-select').onchange=()=>{cfg.course_code='';loadCourses().catch(e=>say(e.message,'danger'));};
  $('#year-select').onchange=()=>{renderTermOptions();loadCourses().catch(e=>say(e.message,'danger'));};
  $('#term-select').onchange=()=>loadCourses().catch(e=>say(e.message,'danger'));
  $('#course-select').onchange=()=>loadSelectedCourse().catch(e=>say(e.message,'danger'));
  $('#reload-course').onclick=()=>loadSelectedCourse().catch(e=>say(e.message,'danger'));
  $('#add-clo').onclick=addClo;$('#add-week').onclick=addWeek;$('#add-assessment').onclick=addAssessment;
  $('#bulk-apply-empty').onclick=()=>bulkApplyWeeks(false);$('#bulk-apply-all').onclick=()=>bulkApplyWeeks(true);
  $('#sync-tqf5-from-tqf3').onclick=syncTqf5FromTqf3;
  $('#submission-mode').onclick=toggleSubmissionMode;
  $('#save-tqf3').onclick=()=>saveTqf3().catch(e=>say(e.message,'danger'));$('#save-tqf5').onclick=()=>saveTqf5().catch(e=>say(e.message,'danger'));$('#save-verification-note').onclick=()=>saveVerificationNote().catch(e=>say(e.message,'danger'));
  $$$('.ai-section').forEach(b=>b.onclick=()=>runSectionAi(b.dataset.section));
  $('#ai-chatgpt').onclick=()=>openChatGPT().catch(e=>say(e.message,'danger'));$('#ai-show-prompt').onclick=()=>{$('#ai-prompt-wrap').hidden=!$('#ai-prompt-wrap').hidden;$('#ai-prompt').value=aiPrompt();};
  $('#print-form').onclick=()=>window.print();$('#logout').onclick=()=>logout().catch(e=>say(e.message,'danger'));
  $('#login-form').addEventListener('submit',e=>loginMagic(e).catch(x=>say(x.message,'danger')));$('#password-login').onclick=()=>loginPassword().catch(x=>say(x.message,'danger'));
  $('#restore-local').onclick=restoreLocalDraft;$('#discard-local').onclick=discardLocalDraft;
  $('#version-a').onchange=compareVersions;$('#version-b').onchange=compareVersions;
  $('#dashboard-search').oninput=()=>filterDashboardRows();
  ['#dashboard-prefix','#dashboard-role','#dashboard-doc','#dashboard-verification'].forEach(id=>{if($(id))$(id).onchange=()=>filterDashboardRows();});
  if($('#dashboard-attention'))$('#dashboard-attention').onchange=()=>filterDashboardRows();
  if($('#register-evidence-candidate'))$('#register-evidence-candidate').onclick=()=>registerEvidenceCandidate().catch(e=>say(e.message,'danger'));
  if($('#ai-copy-proposed'))$('#ai-copy-proposed').onclick=()=>copyAiProposedText();
  if($('#ai-undo-apply'))$('#ai-undo-apply').onclick=undoLastAiApply;
  if($('#review-package-print'))$('#review-package-print').onclick=()=>window.print();
  document.addEventListener('input',e=>{
    if(e.target.closest('#app-view')&&!e.target.closest('.selector-card')&&!e.target.closest('#dashboard-panel'))scheduleLocalSave();
  });
  document.addEventListener('change',e=>{
    if(e.target.closest('#app-view')&&!e.target.closest('.selector-card')&&!e.target.closest('#dashboard-panel'))scheduleLocalSave();
  });
}

async function boot(){
  cfg=await fetch('./config/state.json?v=30',{cache:'no-store'}).then(r=>r.json()).catch(()=>({}));
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