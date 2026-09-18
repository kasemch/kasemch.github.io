(function(){
'use strict';

const SUPABASE_URL='https://lztxpjsuzqvtgyasfnyj.supabase.co';
const SUPABASE_KEY='sb_publishable_7bv5GR0-ksXJn91sRHV0Mg_k4nblIGI';
const client=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY,{
  auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:'implicit'}
});
const $=s=>document.querySelector(s);
const $$=s=>Array.from(document.querySelectorAll(s));
let cfg=null, ctx=null;

function say(msg,kind='info'){
  const el=$('#status');
  if(!el)return;
  el.textContent=msg;
  el.className='status '+(kind==='info'?'':kind);
}
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
function fmt(v){if(!v)return '—';try{return new Date(v).toLocaleString('th-TH',{dateStyle:'medium',timeStyle:'short'});}catch{return v;}}
function courseArgs(){
  return {
    p_programme_code:$('#programme-code').value.trim(),
    p_course_code:$('#course-code').value.trim().toUpperCase(),
    p_academic_year:$('#academic-year').value.trim(),
    p_term_code:$('#term-code').value.trim()
  };
}
function setBadge(id,text,kind='info'){
  const el=$(id); if(!el)return;
  el.textContent=text||'—'; el.className='badge '+kind;
}
function badgeKind(s){
  s=String(s||'').toUpperCase();
  if(['VERIFIED','PUBLIC_PUBLISHED','FINAL','CONTROLLED','APPROVED'].some(x=>s.includes(x)))return 'ok';
  if(['INSUFFICIENT','REQUIRES_ACTION','DRAFT','UNDER_REVIEW','UNVERIFIED'].some(x=>s.includes(x)))return 'warn';
  return 'info';
}
function setTab(name){
  $$('.tab').forEach(x=>x.classList.toggle('active',x.dataset.tab===name));
  $$('.panel').forEach(x=>x.hidden=x.id!=='panel-'+name);
}
function deepClone(v){return JSON.parse(JSON.stringify(v||{}));}

function renderCourse(){
  const c=ctx?.course||{};
  $('#course-summary').textContent=c.course_code
    ? `${c.course_code} · ${c.course_title_th||''} · ${c.academic_year}/${c.term_code}`
    : 'ยังไม่ได้โหลดรายวิชา';
  $('#course-offering-id').textContent=c.course_offering_id||'—';
  setBadge('#offering-status',c.offering_status||'—',badgeKind(c.offering_status));
  setBadge('#source-status',c.source_status||'—',badgeKind(c.source_status));
}

function renderTqf3(){
  const d=ctx?.tqf3;
  setBadge('#tqf3-status',d?.lifecycle_status||'ยังไม่มี',badgeKind(d?.lifecycle_status));
  $('#tqf3-version').textContent=d?.current_version_no??'—';
  $('#tqf3-source').textContent=d?.source_status||'—';
  const content=deepClone(d?.content||{
    course_code:ctx?.course?.course_code||$('#course-code').value.trim().toUpperCase(),
    canonical:{credit_value:ctx?.course?.credit_value??null,credit_pattern:''},
    source_supported_content:{}
  });
  $('#tqf3-json').value=JSON.stringify(content,null,2);
  $('#tqf3-meta').textContent=d
    ? `Record ${d.record_id} · Version ${d.current_version_no} · ${d.version_status}`
    : 'ยังไม่มี working draft';
}

const grades=['A','B+','B','C+','C','D+','D','F','W/I'];
function gradeRows(payload){
  const map=new Map((payload?.results?.grade_distribution||[]).map(x=>[x.grade,x]));
  return grades.map(g=>{
    const x=map.get(g)||{grade:g,count:0,percent:0};
    return `<tr><td><strong>${esc(g)}</strong></td><td><input class="grade-count" data-grade="${esc(g)}" type="number" min="0" value="${Number(x.count||0)}"></td><td><input class="grade-percent" data-grade="${esc(g)}" type="number" min="0" max="100" step="0.01" value="${Number(x.percent||0)}"></td></tr>`;
  }).join('');
}
function cloRows(payload){
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
  setBadge('#tqf5-status',d?.lifecycle_status||'ยังไม่มี',badgeKind(d?.lifecycle_status));
  $('#tqf5-snapshot').textContent=d?.snapshot_id||'—';
  $('#registered-students').value=p.general_information.registered_students??'';
  $('#students-at-end').value=p.general_information.students_at_end??'';
  $('#classroom-mean').value=p.evaluation.classroom_mean??'';
  $('#independent-mean').value=p.evaluation.independent_mean??'';
  $('#teaching-mean').value=p.evaluation.teaching_evaluation_mean??'';
  $('#grade-body').innerHTML=gradeRows(p);
  $('#clo-body').innerHTML=cloRows(p);
  $('#improvement-plan').value=(p.improvement_plan||[]).map(x=>`${x.action||''} | ${x.target_term||''}`).join('\n');
  $('#tqf5-raw').value=JSON.stringify(p,null,2);
  $('#tqf5-meta').textContent=d
    ? `Snapshot ${d.snapshot_status} · Source ${d.source_status}`
    : 'ยังไม่มี มคอ.5 draft';
}
function collectTqf5(){
  const base=deepClone(ctx?.tqf5?.payload||{});
  base.general_information=base.general_information||{};
  base.general_information.course_code=ctx?.course?.course_code||$('#course-code').value.trim().toUpperCase();
  base.general_information.academic_year=ctx?.course?.academic_year||$('#academic-year').value.trim();
  base.general_information.term_code=ctx?.course?.term_code||$('#term-code').value.trim();
  base.general_information.registered_students=numOrNull($('#registered-students').value);
  base.general_information.students_at_end=numOrNull($('#students-at-end').value);

  base.results=base.results||{};
  base.results.grade_distribution=$$('.grade-count').map(el=>{
    const grade=el.dataset.grade;
    const p=$(`.grade-percent[data-grade="${CSS.escape(grade)}"]`);
    return {grade,count:Number(el.value||0),percent:Number(p?.value||0)};
  });
  base.results.clo_attainment=$$('.clo-code').map((el,i)=>({
    clo:el.value.trim()||`CLO${i+1}`,
    target_percent:Number($(`.clo-target[data-row="${i}"]`)?.value||0),
    attainment_percent:Number($(`.clo-attain[data-row="${i}"]`)?.value||0)
  }));

  base.evaluation=base.evaluation||{};
  base.evaluation.classroom_mean=numOrNull($('#classroom-mean').value);
  base.evaluation.independent_mean=numOrNull($('#independent-mean').value);
  base.evaluation.teaching_evaluation_mean=numOrNull($('#teaching-mean').value);
  base.evaluation.source_status=base.evaluation.source_status||'UNVERIFIED_WORKING_SOURCE';

  base.improvement_plan=$('#improvement-plan').value.split('\n')
    .map(x=>x.trim()).filter(Boolean).map(line=>{
      const [action,...rest]=line.split('|');
      return {action:action.trim(),target_term:rest.join('|').trim()||null};
    });
  return base;
}
function numOrNull(v){return v===''||v==null?null:Number(v);}

function renderVerification(){
  const v=ctx?.verification;
  setBadge('#verification-status',v?.status||'ยังไม่มี',badgeKind(v?.status));
  $('#verification-id').textContent=v?.verification_record_id||'—';
  $('#verification-note').value=v?.finding_summary||'';
  $('#verification-updated').textContent=fmt(v?.updated_at);
  const actions=$('#verification-actions');
  actions.innerHTML='';
  if(!v){
    actions.innerHTML='<button class="btn primary" id="create-verification">สร้างรายการทวนสอบ</button>';
    $('#create-verification').onclick=createVerification;
    return;
  }
  const s=v.status;
  if(s==='DRAFT'){
    actions.innerHTML='<button class="btn primary" data-state="IN_REVIEW">เริ่มทวนสอบ</button>';
  }else if(s==='IN_REVIEW'){
    actions.innerHTML='<button class="btn" data-state="REQUIRES_ACTION">ส่งกลับแก้ไข</button><button class="btn accent" data-state="INSUFFICIENT_EVIDENCE">หลักฐานไม่เพียงพอ</button><button class="btn" disabled title="VERIFIED ต้องผ่าน evidence gate">VERIFIED เมื่อหลักฐานครบ</button>';
  }else if(s==='REQUIRES_ACTION' || s==='INSUFFICIENT_EVIDENCE'){
    actions.innerHTML='<button class="btn primary" data-state="IN_REVIEW">เปิดทวนสอบอีกครั้ง</button><button class="btn" disabled>VERIFIED เมื่อหลักฐานครบ</button>';
  }else{
    actions.innerHTML='<span class="help">สถานะนี้ไม่มี action เร่งด่วนใน Fast Portal</span>';
  }
  actions.querySelectorAll('[data-state]').forEach(b=>b.onclick=()=>transitionVerification(b.dataset.state));
}

function renderAll(){
  renderCourse(); renderTqf3(); renderTqf5(); renderVerification();
}

async function loadCourse(){
  say('กำลังโหลดข้อมูลรายวิชา…');
  const {data,error}=await client.rpc('hepe_fast_tqf_portal_context_by_code',courseArgs());
  if(error)throw error;
  ctx=data;
  renderAll();
  say('โหลดข้อมูลแล้ว พร้อมแก้ไข/บันทึก Draft','ok');
}

async function saveTqf3(){
  let content;
  try{content=JSON.parse($('#tqf3-json').value);}catch{throw new Error('JSON ของ มคอ.3 ไม่ถูกต้อง');}
  if(!content.course_code) content.course_code=$('#course-code').value.trim().toUpperCase();
  say('กำลังบันทึก มคอ.3 working version…');
  const {data,error}=await client.rpc('hepe_save_tqf3_working_version_by_code',{
    ...courseArgs(),
    p_content:content,
    p_source_status:'LATEST_WORKING_CONFIRMED'
  });
  if(error)throw error;
  say(`บันทึก มคอ.3 สำเร็จ — Version ${data.version_no}`,'ok');
  await loadCourse();
}

async function saveTqf5(){
  const payload=collectTqf5();
  say('กำลังบันทึก มคอ.5 Draft…');
  const {data,error}=await client.rpc('hepe_create_tqf5_working_draft_by_code',{
    ...courseArgs(),
    p_payload:payload,
    p_source_reference:'Fast TQF Portal / user-entered working draft / NON-PRODUCTION'
  });
  if(error)throw error;
  say(`บันทึก มคอ.5 สำเร็จ — Snapshot ${data.result_snapshot_id}`,'ok');
  await loadCourse();
}

async function createVerification(){
  say('กำลังสร้างรายการทวนสอบ…');
  const {data,error}=await client.rpc('hepe_ensure_verification_draft_by_code',courseArgs());
  if(error)throw error;
  say(data.created?'สร้างรายการทวนสอบแล้ว':'มีรายการทวนสอบอยู่แล้ว','ok');
  await loadCourse();
}

async function saveVerificationNote(){
  if(!ctx?.verification?.verification_record_id) return createVerification();
  say('กำลังบันทึกบันทึกทวนสอบ…');
  const {error}=await client.rpc('hepe_save_verification_note',{
    p_verification_record_id:ctx.verification.verification_record_id,
    p_finding_summary:$('#verification-note').value
  });
  if(error)throw error;
  say('บันทึกบันทึกทวนสอบแล้ว','ok');
  await loadCourse();
}

async function transitionVerification(newStatus){
  if(!ctx?.verification?.verification_record_id)throw new Error('ยังไม่มีรายการทวนสอบ');
  say(`กำลังเปลี่ยนสถานะทวนสอบเป็น ${newStatus}…`);
  const {error}=await client.rpc('hepe_review_course_verification',{
    p_verification_record_id:ctx.verification.verification_record_id,
    p_new_status:newStatus,
    p_finding_summary:$('#verification-note').value
  });
  if(error)throw error;
  say(`สถานะทวนสอบเปลี่ยนเป็น ${newStatus}`,'ok');
  await loadCourse();
}

async function loginMagic(e){
  e.preventDefault();
  const email=$('#login-email').value.trim();
  say('กำลังส่ง Magic Link…');
  const {error}=await client.auth.signInWithOtp({
    email,
    options:{shouldCreateUser:false,emailRedirectTo:'https://kasemch.github.io/hepe-trial/'}
  });
  if(error)throw error;
  say('ส่ง Magic Link แล้ว กรุณาเปิดอีเมลฉบับล่าสุด','ok');
}
async function loginPassword(){
  const email=$('#login-email').value.trim();
  const password=$('#login-password').value;
  if(!email||!password)throw new Error('กรุณากรอกอีเมลและรหัสผ่าน');
  say('กำลังเข้าสู่ระบบ…');
  const {error}=await client.auth.signInWithPassword({email,password});
  if(error)throw error;
}
async function logout(){await client.auth.signOut();location.reload();}

async function boot(){
  cfg=await fetch('./config/state.json?v=24',{cache:'no-store'}).then(r=>r.json()).catch(()=>({}));
  $('#programme-code').value=cfg.programme_code||'25510071103503';
  $('#course-code').value=cfg.course_code||'HED2503';
  $('#academic-year').value=cfg.academic_year||'2569';
  $('#term-code').value=cfg.term_code||'1';

  const {data:{session}}=await client.auth.getSession();
  $('#login-view').hidden=!!session;
  $('#app-view').hidden=!session;
  if(!session){say('กรุณา Login เพื่อใช้งาน มคอ.3 / มคอ.5 / ทวนสอบ','warn');return;}

  const me=await client.rpc('hepe_my_context');
  $('#identity').textContent=me.error ? (session.user.email||'Authenticated') :
    `${me.data?.display_label||session.user.email||''} · ${(me.data?.roles||[]).map(x=>x.role_code).join(', ')}`;
  await loadCourse();
}

$$('.tab').forEach(b=>b.onclick=()=>setTab(b.dataset.tab));
$('#load-course').onclick=()=>loadCourse().catch(e=>say(e.message,'danger'));
$('#save-tqf3').onclick=()=>saveTqf3().catch(e=>say(e.message,'danger'));
$('#save-tqf5').onclick=()=>saveTqf5().catch(e=>say(e.message,'danger'));
$('#save-verification-note').onclick=()=>saveVerificationNote().catch(e=>say(e.message,'danger'));
$('#logout').onclick=()=>logout().catch(e=>say(e.message,'danger'));
$('#login-form').addEventListener('submit',e=>loginMagic(e).catch(x=>say(x.message,'danger')));
$('#password-login').onclick=()=>loginPassword().catch(x=>say(x.message,'danger'));

client.auth.onAuthStateChange((event,session)=>{
  if(event==='SIGNED_IN'&&session)setTimeout(()=>boot().catch(e=>say(e.message,'danger')),0);
});

boot().catch(e=>say(e.message||String(e),'danger'));
})();