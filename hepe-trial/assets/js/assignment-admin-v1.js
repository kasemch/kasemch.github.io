(function(){
'use strict';
const SUPABASE_URL='https://lztxpjsuzqvtgyasfnyj.supabase.co';
const SUPABASE_KEY='sb_publishable_7bv5GR0-ksXJn91sRHV0Mg_k4nblIGI';
const client=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:'implicit'}});
const $=s=>document.querySelector(s);
let ctx=null,courses=[],selectedCourses=new Set();
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
   input.addEventListener('change',()=>{if(input.checked)selectedCourses.add(c.course_code);else selectedCourses.delete(c.course_code);updateCourseCount();});
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
}
function setAllCourses(flag){
 selectedCourses=new Set(flag?courses.map(c=>c.course_code):[]);
 renderCoursePicker();
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
$('#programme-select').addEventListener('change',async()=>{try{syncProgramme();await loadCourses();}catch(e){say(e.message,'bad');}});
$('#select-all-courses').addEventListener('click',()=>setAllCourses(true));
$('#clear-all-courses').addEventListener('click',()=>setAllCourses(false));
$('#activate').addEventListener('click',()=>save(true).catch(e=>say(e.message,'bad')));
$('#revoke').addEventListener('click',()=>save(false).catch(e=>say(e.message,'bad')));
client.auth.onAuthStateChange(()=>setTimeout(()=>session().catch(e=>say(e.message,'bad')),0));
session().catch(e=>say(e.message,'bad'));
})();