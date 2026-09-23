(function(){
'use strict';
const SUPABASE_URL='https://lztxpjsuzqvtgyasfnyj.supabase.co';
const SUPABASE_KEY='sb_publishable_7bv5GR0-ksXJn91sRHV0Mg_k4nblIGI';
const client=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:'implicit'}});
const $=s=>document.querySelector(s);
let ctx=null,courses=[],selectedCourses=new Set(),teamCtx=null,coSelected=new Set();
function say(t,k=''){const el=$('#status');el.textContent=t;el.className='status '+k;}
function opt(v,t){const o=document.createElement('option');o.value=v;o.textContent=t;return o;}
async function session(){
 const {data}=await client.auth.getSession();
 const signed=!!data.session;
 $('#login-card').hidden=signed;$('#app').hidden=!signed;
 if(signed) await load();
}
async function load(){
 say('กำลังโหลดสิทธิ์และข้อมูล…');
 const {data,error}=await client.rpc('hepe_fast_tqf_assignment_admin_context');
 if(error)throw error;if(data?.error)throw new Error(data.error);
 ctx=data;
 const us=$('#user-select');us.innerHTML='';
 (ctx.users||[]).forEach(u=>{const o=opt(u.email,u.display_label+' · '+u.email);o.dataset.bound=u.actor_bound?'1':'0';us.appendChild(o);});
 const rs=$('#role-select');rs.innerHTML='';(ctx.roles||[]).forEach(r=>rs.appendChild(opt(r.role_code,r.label_th+' ('+r.role_code+')')));
 const ps=$('#programme-select');ps.innerHTML='';
 (ctx.programmes||[]).forEach(p=>{const o=opt(p.programme_code,p.title_th);o.dataset.write=p.can_write?'1':'0';ps.appendChild(o);});
 renderProgrammes();renderAssignments();await loadCourses();
 $('#authority-summary').textContent=ctx.global_write?'มีสิทธิ์จัดการข้ามหลักสูตรตาม governed assignment':'สิทธิ์จำกัดตาม programme authority ที่ได้รับมอบหมาย';
 syncUser();syncProgramme();
 say('พร้อม','ok');
}
async function loadCourses(){
 const code=$('#programme-select').value;if(!code)return;
 const {data,error}=await client.rpc('hepe_fast_tqf_course_catalog',{p_programme_code:code,p_academic_year:null,p_term_code:null});
 if(error)throw error;
 courses=Array.isArray(data)?data:(data?.error?[]:[]);
 selectedCourses=new Set();
 renderCoursePicker();
}
function renderCoursePicker(){
 const box=$('#course-list');box.innerHTML='';
 courses.forEach(c=>{
   const label=document.createElement('label');label.className='course-option';
   const input=document.createElement('input');input.type='checkbox';input.value=c.course_code;input.checked=selectedCourses.has(c.course_code);
   input.addEventListener('change',()=>{if(input.checked)selectedCourses.add(c.course_code);else selectedCourses.delete(c.course_code);updateCourseCount();loadTeachingTeam().catch(e=>say(e.message,'bad'));});
   const text=document.createElement('div');
   const strong=document.createElement('strong');strong.textContent=c.course_code+' — '+c.title_th;
   const meta=document.createElement('div');meta.className='help';meta.textContent=(c.credit_value??'')+' หน่วยกิต';
   text.append(strong,meta);label.append(input,text);box.appendChild(label);
 });
 if(!courses.length){box.innerHTML='<div class="help" style="padding:12px">ไม่พบรายวิชาในหลักสูตรนี้</div>';}
 updateCourseCount();
}
function updateCourseCount(){
 const n=selectedCourses.size;
 $('#course-selected-count').textContent='เลือก '+n+' วิชา';
 $('#activate').textContent=n>1?'บันทึก Active '+n+' วิชา':'บันทึก Active';
 $('#revoke').textContent=n>1?'ยกเลิก Assignment '+n+' วิชา':'ยกเลิก Assignment';
 $('#team-apply-scope').textContent=n?('ใช้กับ '+n+' วิชา'):'ยังไม่ได้เลือกรายวิชา';
}
function setAllCourses(flag){
 selectedCourses=new Set(flag?courses.map(c=>c.course_code):[]);
 renderCoursePicker();
}
function personLabel(p){return (p.academic_position_th? p.academic_position_th+' ':'')+p.name_th;}
function renderLead(){
 const s=$('#lead-instructor');s.innerHTML='';
 const blank=opt('','— เลือกผู้สอนหลัก —');s.appendChild(blank);
 (teamCtx?.people||[]).forEach(p=>{
   const o=opt(p.academic_person_id,personLabel(p)+(p.account_bound?' · ✓ มีบัญชี':' · ○ ยังไม่มีบัญชี'));
   o.dataset.account=p.account_bound?'1':'0';o.dataset.email=p.account_email||'';s.appendChild(o);
 });
 syncLeadMeta();
}
function renderCoList(){
 const q=($('#co-search').value||'').trim().toLowerCase();
 const box=$('#co-instructor-list');box.innerHTML='';
 const lead=$('#lead-instructor').value;
 (teamCtx?.people||[]).filter(p=>{
   if(p.academic_person_id===lead)return false;
   const text=(personLabel(p)+' '+(p.person_code||'')).toLowerCase();
   return !q||text.includes(q);
 }).forEach(p=>{
   const label=document.createElement('label');label.className='course-option';
   const input=document.createElement('input');input.type='checkbox';input.value=p.academic_person_id;input.checked=coSelected.has(p.academic_person_id);
   input.addEventListener('change',()=>{if(input.checked)coSelected.add(p.academic_person_id);else coSelected.delete(p.academic_person_id);renderCoCount();});
   const text=document.createElement('div');
   const strong=document.createElement('strong');strong.textContent=personLabel(p);
   const meta=document.createElement('div');meta.className='help';meta.textContent=(p.account_bound?'✓ มีบัญชีระบบ':'○ ยังไม่มีบัญชีระบบ')+(p.account_email?' · '+p.account_email:'');
   text.append(strong,meta);label.append(input,text);box.appendChild(label);
 });
 if(!box.children.length)box.innerHTML='<div class="help" style="padding:12px">ไม่พบรายชื่อ</div>';
 renderCoCount();
}
function renderCoCount(){$('#co-selected-count').textContent='เลือก '+coSelected.size+' คน';}
function renderBindingControls(){
 const ps=$('#bind-person');ps.innerHTML='';ps.appendChild(opt('','— เลือกบุคคล —'));
 (teamCtx?.people||[]).forEach(p=>{
   const o=opt(p.academic_person_id,personLabel(p)+(p.account_bound?' · ✓ ผูกแล้ว':' · ○ ยังไม่ผูก'));
   o.dataset.bound=p.account_bound?'1':'0';ps.appendChild(o);
 });
 const as=$('#bind-account');as.innerHTML='';as.appendChild(opt('','— เลือกบัญชีที่เคย Sign in —'));
 (ctx?.users||[]).forEach(u=>as.appendChild(opt(u.email,(u.display_label||u.email)+' · '+u.email)));
 $('#bind-result').textContent='';
}
async function bindAccount(){
 const programme=$('#programme-select').value,person=$('#bind-person').value,email=$('#bind-account').value;
 if(!programme||!person||!email)throw new Error('กรุณาเลือกหลักสูตร บุคคล และบัญชีให้ครบ');
 const personOpt=$('#bind-person').selectedOptions[0];
 if(personOpt?.dataset.bound==='1')throw new Error('บุคคลนี้มีบัญชีที่ผูกไว้แล้ว');
 say('กำลังผูกบัญชีผู้สอน…');
 const {data,error}=await client.rpc('hepe_fast_tqf_bind_person_account',{
   p_programme_code:programme,p_academic_person_id:person,p_email:email
 });
 if(error)throw error;if(!data?.ok)throw new Error(data?.error||'ACCOUNT_BINDING_FAILED');
 $('#bind-result').textContent='ผูกบัญชี '+email+' สำเร็จ';
 await loadTeachingTeam();
 say('ผูกบัญชีผู้สอนสำเร็จ','ok');
}
function syncLeadMeta(){
 const o=$('#lead-instructor').selectedOptions[0];
 if(!o||!o.value){$('#lead-account-meta').textContent='';return;}
 $('#lead-account-meta').textContent=o.dataset.account==='1'
   ?'มีบัญชีระบบ: เมื่อบันทึกจะได้รับ COURSE_OWNER สำหรับรายวิชานี้'
   :'ยังไม่มีบัญชีระบบ: บันทึกบทบาทผู้สอนได้ แต่ยังเข้าแก้เอกสารไม่ได้จนกว่าจะ bind account';
}
async function loadTeachingTeam(){
 const programme=$('#programme-select').value,codes=Array.from(selectedCourses),year=$('#academic-year').value.trim(),term=$('#term-code').value;
 if(!programme||!codes.length||!year||!term){
   teamCtx={people:[],teams:[]};coSelected=new Set();renderLead();renderCoList();
   $('#team-existing-summary').textContent='เลือกรายวิชา ปีการศึกษา และภาคเรียนก่อน';
   return;
 }
 const {data,error}=await client.rpc('hepe_fast_tqf_teaching_team_context',{
   p_programme_code:programme,p_course_codes:codes,p_academic_year:year,p_term_code:term
 });
 if(error)throw error;if(data?.error)throw new Error(data.error);
 teamCtx=data;coSelected=new Set();renderLead();renderCoList();renderBindingControls();
 const teams=data.teams||[];
 const byCourse={};
 teams.forEach(t=>{(byCourse[t.course_code]??=[]).push(t);});
 const lines=codes.map(code=>{
   const arr=byCourse[code]||[];
   if(!arr.length)return code+': ยังไม่มีทีมผู้สอน';
   const lead=arr.find(x=>x.responsibility_type==='LEAD_INSTRUCTOR');
   const cos=arr.filter(x=>x.responsibility_type==='CO_INSTRUCTOR');
   return code+': '+(lead?'ผู้สอนหลัก '+lead.name_th:'ไม่มีผู้สอนหลัก')+(cos.length?' · ร่วม '+cos.map(x=>x.name_th).join(', '):'');
 });
 $('#team-existing-summary').innerHTML=lines.join('<br>');
 if(codes.length===1){
   const arr=byCourse[codes[0]]||[];
   const lead=arr.find(x=>x.responsibility_type==='LEAD_INSTRUCTOR');
   const cos=arr.filter(x=>x.responsibility_type==='CO_INSTRUCTOR');
   if(lead)$('#lead-instructor').value=lead.academic_person_id;
   coSelected=new Set(cos.map(x=>x.academic_person_id));renderCoList();syncLeadMeta();
 }else{
   $('#lead-instructor').value='';coSelected=new Set();renderCoList();syncLeadMeta();
 }
}
async function saveTeachingTeam(){
 const programme=$('#programme-select').value,codes=Array.from(selectedCourses),year=$('#academic-year').value.trim(),term=$('#term-code').value;
 const lead=$('#lead-instructor').value,cos=Array.from(coSelected).filter(x=>x!==lead);
 if(!programme||!codes.length||!year||!term||!lead)throw new Error('กรุณาเลือกหลักสูตร รายวิชา ปี/ภาค และผู้สอนหลัก');
 say('กำลังบันทึก Teaching Team '+codes.length+' วิชา…');
 const {data,error}=await client.rpc('hepe_fast_tqf_teaching_team_save',{
   p_programme_code:programme,p_course_codes:codes,p_academic_year:year,p_term_code:term,
   p_lead_academic_person_id:lead,p_co_academic_person_ids:cos
 });
 if(error)throw error;if(!data?.ok)throw new Error(data?.error||'TEACHING_TEAM_SAVE_FAILED');
 await loadTeachingTeam();
 say('บันทึก Teaching Team '+(data.courses_updated||codes.length)+' วิชาแล้ว','ok');
}
function renderProgrammes(){
 const box=$('#programme-list');box.innerHTML='';
 (ctx.programmes||[]).forEach(p=>{
   const d=document.createElement('div');d.style.marginBottom='10px';
   d.innerHTML='<strong>'+p.title_th+'</strong><div class="help">'+p.programme_code+' · '+p.curriculum_version+' · '+p.curriculum_status+'</div><span class="admin-pill '+(p.can_write?'good':'warn')+'">'+(p.can_write?'WRITE ALLOWED':'READ / NO WRITE AUTHORITY')+'</span>';
   box.appendChild(d);
 });
}
function renderAssignments(){
 const b=$('#assignment-body');b.innerHTML='';
 (ctx.assignments||[]).forEach(a=>{
   const tr=document.createElement('tr');
   tr.innerHTML='<td>'+(a.actor_label||'—')+'<div class="help">'+(a.email||'')+'</div></td><td>'+a.programme_code+'</td><td>'+a.course_code+'</td><td>'+a.role_code+'</td><td>'+a.status+'</td>';
   b.appendChild(tr);
 });
 if(!(ctx.assignments||[]).length){const tr=document.createElement('tr');tr.innerHTML='<td colspan="5" class="help">ยังไม่มี assignment ในขอบเขตที่มองเห็น</td>';b.appendChild(tr);}
}
function syncUser(){
 const o=$('#user-select').selectedOptions[0];if(!o)return;
 $('#display-label').value=o.textContent.split(' · ')[0]||'';
 $('#user-meta').textContent=o.dataset.bound==='1'?'มี HEPE actor แล้ว':'Authenticated identity พร้อม แต่ยังไม่มี HEPE actor';
}
function syncProgramme(){
 const o=$('#programme-select').selectedOptions[0];if(!o)return;
 const allowed=o.dataset.write==='1';
 $('#programme-meta').textContent=allowed?'มี authority สำหรับ assignment ในหลักสูตรนี้':'ไม่มี write authority สำหรับหลักสูตรนี้';
 $('#activate').disabled=!allowed;$('#revoke').disabled=!allowed;
}
async function save(active){
 const email=$('#user-select').value,display=$('#display-label').value.trim(),programme=$('#programme-select').value,role=$('#role-select').value;
 const courseCodes=Array.from(selectedCourses);
 if(!email||!programme||!role||!courseCodes.length)throw new Error('กรุณาเลือกข้อมูลให้ครบ และเลือกรายวิชาอย่างน้อย 1 วิชา');
 say(active?'กำลังบันทึก '+courseCodes.length+' assignment…':'กำลังยกเลิก '+courseCodes.length+' assignment…');
 const {data,error}=await client.rpc('hepe_fast_tqf_assignment_upsert_batch',{
   p_email:email,p_display_label:display,p_programme_code:programme,p_course_codes:courseCodes,p_role_code:role,p_active:active
 });
 if(error)throw error;if(!data?.ok)throw new Error(data?.error||'ASSIGNMENT_FAILED');
 const done=data.count||courseCodes.length;
 await load();say(active?'บันทึก Active '+done+' วิชาแล้ว':'ยกเลิก Assignment '+done+' วิชาแล้ว','ok');
}
$('#login').addEventListener('click',async()=>{try{const {error}=await client.auth.signInWithPassword({email:$('#email').value.trim(),password:$('#password').value});if(error)throw error;await session();}catch(e){say(e.message,'bad');}});
$('#logout').addEventListener('click',async()=>{await client.auth.signOut();await session();});
$('#reload').addEventListener('click',()=>load().catch(e=>say(e.message,'bad')));
$('#user-select').addEventListener('change',syncUser);
$('#programme-select').addEventListener('change',async()=>{try{syncProgramme();await loadCourses();await loadTeachingTeam();}catch(e){say(e.message,'bad');}});
$('#select-all-courses').addEventListener('click',()=>{setAllCourses(true);loadTeachingTeam().catch(e=>say(e.message,'bad'));});
$('#clear-all-courses').addEventListener('click',()=>{setAllCourses(false);loadTeachingTeam().catch(e=>say(e.message,'bad'));});
$('#lead-instructor').addEventListener('change',()=>{coSelected.delete($('#lead-instructor').value);syncLeadMeta();renderCoList();});
$('#co-search').addEventListener('input',renderCoList);
$('#save-teaching-team').addEventListener('click',()=>saveTeachingTeam().catch(e=>say(e.message,'bad')));
$('#reload-teaching-team').addEventListener('click',()=>loadTeachingTeam().catch(e=>say(e.message,'bad')));
$('#bind-account-button').addEventListener('click',()=>bindAccount().catch(e=>{say(e.message,'bad');$('#bind-result').textContent=e.message;}));
$('#academic-year').addEventListener('change',()=>loadTeachingTeam().catch(e=>say(e.message,'bad')));
$('#term-code').addEventListener('change',()=>loadTeachingTeam().catch(e=>say(e.message,'bad')));
$('#activate').addEventListener('click',()=>save(true).catch(e=>say(e.message,'bad')));
$('#revoke').addEventListener('click',()=>save(false).catch(e=>say(e.message,'bad')));
client.auth.onAuthStateChange(()=>setTimeout(()=>session().catch(e=>say(e.message,'bad')),0));
session().catch(e=>say(e.message,'bad'));
})();