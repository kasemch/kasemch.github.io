(function(){
'use strict';
const $=s=>document.querySelector(s);
const statusEl=()=>$('#status');
const say=(t,k='info')=>{const el=statusEl();if(!el)return;el.textContent=t;el.dataset.kind=k;};
window.addEventListener('error',e=>say(`เกิดข้อผิดพลาด: ${e.message||'JavaScript error'}`,'warn'));
window.addEventListener('unhandledrejection',e=>say(`เกิดข้อผิดพลาด: ${e.reason?.message||e.reason||'Promise error'}`,'warn'));

const SUPABASE_URL='https://lztxpjsuzqvtgyasfnyj.supabase.co';
const SUPABASE_PUBLISHABLE_KEY='sb_publishable_7bv5GR0-ksXJn91sRHV0Mg_k4nblIGI';
if(!window.supabase?.createClient){say('ไม่พบ Supabase library กรุณารีเฟรชหน้าอีกครั้ง','warn');return;}
const client=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
let cfg=null;

async function resolveAuthCallback(){
 const url=new URL(window.location.href);
 const code=url.searchParams.get('code');
 if(code){
   say('กำลังยืนยัน Magic Link…');
   const {error}=await client.auth.exchangeCodeForSession(code);
   if(error) throw error;
   url.searchParams.delete('code');
   history.replaceState({},document.title,url.pathname+url.search+url.hash);
 }
}
function identityArgs(){return {p_programme_code:cfg.programme_code,p_course_code:cfg.course_code,p_academic_year:cfg.academic_year,p_term_code:cfg.term_code};}
function payload(){return {course_code:cfg.course_code,canonical:{credit_value:3,credit_pattern:cfg.canonical.credit_pattern},working_source:cfg.working_source,conflict:{field:'credit_pattern',canonical:cfg.canonical.credit_pattern,working_source:cfg.working_conflict.credit_pattern,resolution:cfg.working_conflict.resolution},source_supported_content:{course_description:true,plo_clo_llo_mapping:true,assessment_structure:'60% formative/project-based + 40% summative',rubrics:['Role Play Sexual Counseling','Sexuality Board Game','Micro-teaching Performance']}};}
async function refreshReadiness(){
 const {data,error}=await client.rpc('hepe_release_readiness_by_code',identityArgs());
 if(error) throw error;
 $('#readiness').textContent=JSON.stringify(data,null,2);
 const hasDraft=!!data?.tqf3?.record_id,hasPreview=!!data?.preview?.preview_session_id;
 $('#create-draft').disabled=hasDraft;
 $('#create-preview').disabled=!hasDraft||hasPreview;
 return data;
}
async function createDraft(){
 say('กำลังสร้าง governed TQF3 draft…');
 const {data,error}=await client.rpc('hepe_create_tqf3_working_draft_by_code',{...identityArgs(),p_content:payload(),p_source_status:'LATEST_WORKING_CONFIRMED'});
 $('#result').textContent=JSON.stringify(error??data,null,2);
 if(error) throw error;
 say(data?.created===false?'พบ TQF3 เดิมแล้ว ไม่สร้างซ้ำ':'สร้าง governed TQF3 draft สำเร็จ','ok');
 return data;
}
async function createPreview(){
 say('กำลังสร้าง authenticated preview…');
 const {data,error}=await client.rpc('hepe_create_tqf3_preview_by_code',{...identityArgs(),p_target_format:'HTML'});
 $('#result').textContent=JSON.stringify(error??data,null,2);
 if(error) throw error;
 say('สร้าง Preview Session สำเร็จ','ok');
 return data;
}
async function autoRun(){
 let r=await refreshReadiness();
 if(!r?.tqf3?.record_id){await createDraft();r=await refreshReadiness();}
 if(r?.tqf3?.record_id&&!r?.preview?.preview_session_id){await createPreview();r=await refreshReadiness();}
 if(r?.tqf3?.record_id&&r?.preview?.preview_session_id)say('TQF3 Draft และ Authenticated Preview พร้อมแล้ว','ok');
}
async function boot(){
 say('กำลังตรวจสถานะ…');
 const r=await fetch('./config/state.json?v=5',{cache:'no-store'});if(!r.ok)throw new Error(`โหลด state.json ไม่สำเร็จ (${r.status})`);cfg=await r.json();
 $('#course').textContent=`${cfg.course_code} · ${cfg.programme_code} · AY ${cfg.academic_year}/${cfg.term_code}`;
 await resolveAuthCallback();
 const {data:{session},error}=await client.auth.getSession();if(error)throw error;
 $('#login').hidden=!!session;$('#workspace').hidden=!session;
 if(!session){say('ยังไม่พบ session ใน Safari นี้ กรุณาส่ง Magic Link จากหน้านี้','warn');return;}
 const ctx=await client.rpc('hepe_my_context');if(ctx.error)throw ctx.error;
 $('#identity').textContent=`${ctx.data?.display_label??''} · ${(ctx.data?.roles??[]).map(r=>r.role_code).join(', ')}`;
 await autoRun();
}
async function signIn(e){e.preventDefault();const email=$('#email').value.trim();say('กำลังส่ง Magic Link…');const {error}=await client.auth.signInWithOtp({email,options:{shouldCreateUser:false,emailRedirectTo:'https://kasemch.github.io/hepe-trial/'}});say(error?error.message:'ส่ง Magic Link แล้ว กรุณาเปิดลิงก์ใน Safari เครื่องนี้',error?'warn':'ok');}
$('#login-form').addEventListener('submit',signIn);
$('#create-draft').addEventListener('click',()=>createDraft().then(refreshReadiness).catch(e=>say(e.message,'warn')));
$('#create-preview').addEventListener('click',()=>createPreview().then(refreshReadiness).catch(e=>say(e.message,'warn')));
$('#refresh').addEventListener('click',()=>refreshReadiness().catch(e=>say(e.message,'warn')));
$('#logout').addEventListener('click',async()=>{await client.auth.signOut();location.reload();});
client.auth.onAuthStateChange((event,session)=>{if(event==='SIGNED_IN'&&session) setTimeout(()=>boot().catch(e=>say(e.message,'warn')),0);});
boot().catch(e=>say(e.message,'warn'));
})();
