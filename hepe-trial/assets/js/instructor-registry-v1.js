(function(){
'use strict';
const SUPABASE_URL='https://lztxpjsuzqvtgyasfnyj.supabase.co';
const SUPABASE_KEY='sb_publishable_7bv5GR0-ksXJn91sRHV0Mg_k4nblIGI';
const client=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:'implicit'}});
const $=s=>document.querySelector(s);let people=[];
function say(t,k=''){const el=$('#status');el.textContent=t;el.className='status '+k;}
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
async function session(){const {data}=await client.auth.getSession();const signed=!!data.session;$('#login-card').hidden=signed;$('#app').hidden=!signed;if(signed)await load();}
async function load(){
 say('กำลังโหลดทะเบียนผู้สอน…');
 const {data,error}=await client.rpc('hepe_fast_tqf_instructor_registry_context');
 if(error)throw error;if(data?.error)throw new Error(data.error);
 people=data.people||[];render();say('พร้อม','ok');
}
function render(){
 const q=($('#search').value||'').trim().toLowerCase(),vf=$('#verification-filter').value,af=$('#account-filter').value;
 const rows=people.filter(p=>{
   const blob=[p.name_th,p.academic_position_th,p.email,p.auth_email,p.person_code].join(' ').toLowerCase();
   if(q&&!blob.includes(q))return false;
   if(vf==='VERIFIED'&&!String(p.verification_status).startsWith('VERIFIED'))return false;
   if(vf==='UNVERIFIED'&&String(p.verification_status).startsWith('VERIFIED'))return false;
   if(af==='BOUND'&&!p.account_bound)return false;if(af==='UNBOUND'&&p.account_bound)return false;
   return true;
 });
 $('#count').textContent=rows.length+' คน';
 const b=$('#registry-body');b.innerHTML='';
 rows.forEach(p=>{
   const tr=document.createElement('tr');
   tr.innerHTML='<td><strong>'+esc((p.academic_position_th? p.academic_position_th+' ':'')+p.name_th)+'</strong><div class="help">'+esc(p.verification_status)+'</div></td>'+
    '<td class="hide-mobile">'+esc(p.person_code)+'</td>'+
    '<td>'+esc(p.auth_email||p.email||'—')+'</td>'+
    '<td><span class="pill '+(p.account_bound?'good':'warn')+'">'+(p.account_bound?'✓ มีบัญชี':'○ ยังไม่มีบัญชี')+'</span></td>'+
    '<td class="hide-mobile">'+esc(p.teaching_assignment_count||0)+'</td>'+
    '<td><span class="pill '+(String(p.verification_status).startsWith('VERIFIED')?'good':'warn')+'">'+esc(p.baseline_status)+'</span></td>';
   b.appendChild(tr);
 });
 if(!rows.length){const tr=document.createElement('tr');tr.innerHTML='<td colspan="6" class="help">ไม่พบรายการ</td>';b.appendChild(tr);}
}
async function addPerson(){
 const name=$('#new-name').value.trim(),pos=$('#new-position').value.trim(),email=$('#new-email').value.trim();
 if(!name)throw new Error('กรุณากรอกชื่อ–นามสกุล');
 say('กำลังเพิ่มผู้สอน candidate…');
 const {data,error}=await client.rpc('hepe_fast_tqf_instructor_registry_add_candidate',{p_name_th:name,p_academic_position_th:pos||null,p_email:email||null});
 if(error)throw error;if(!data?.ok)throw new Error(data?.error||'ADD_CANDIDATE_FAILED');
 $('#new-name').value='';$('#new-position').value='';$('#new-email').value='';await load();say('เพิ่มผู้สอน candidate แล้ว','ok');
}
$('#login').addEventListener('click',async()=>{try{const {error}=await client.auth.signInWithPassword({email:$('#email').value.trim(),password:$('#password').value});if(error)throw error;await session();}catch(e){say(e.message,'bad');}});
$('#logout').addEventListener('click',async()=>{await client.auth.signOut();await session();});
['search','verification-filter','account-filter'].forEach(id=>$('#'+id).addEventListener(id==='search'?'input':'change',render));
$('#add-person').addEventListener('click',()=>addPerson().catch(e=>say(e.message,'bad')));
client.auth.onAuthStateChange(()=>setTimeout(()=>session().catch(e=>say(e.message,'bad')),0));
session().catch(e=>say(e.message,'bad'));
})();