const API='https://br-empty-king-b3fkxbfp-jobinterests.compute.c-4.ap-southeast-1.aws.neon.tech';
const E=id=>document.getElementById(id);
const esc=s=>String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

async function loadInterests(){
  const state=E('interestState'),list=E('interestList'); if(!state||!list)return;
  try{const r=await fetch(API+'/interests',{cache:'no-store'});if(!r.ok)throw 0;const d=await r.json(),a=d.items||[];
    state.textContent='● เชื่อม Neon แล้ว • รอบค้นหาใช้เฉพาะรายการที่เปิดค้นหา';
    list.innerHTML=a.map(x=>`<div class="interest"><span class="badge">${x.is_active?'เปิดค้นหา':'พัก'}</span><b>${esc(x.label)}</b><div class="meta">${esc(x.location_text||'')}</div><button class="btn" onclick="toggleInterest(${x.id},${!x.is_active})">${x.is_active?'หยุดค้นหา':'เปิดค้นหา'}</button></div>`).join('');
  }catch(e){state.textContent='ยังเชื่อม Job Interests ไม่สำเร็จ'}
}
async function addInterest(){const label=E('interestLabel')?.value.trim();if(!label||label.length<2)return alert('กรอกตำแหน่ง');E('interestAdd').disabled=true;try{const r=await fetch(API+'/interests',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({label,location_text:E('interestLocation').value,minimum_salary_thb:E('interestSalary').value||null,employment_type:E('interestType').value||null})});if(!r.ok)throw 0;E('interestLabel').value='';await loadInterests()}catch(e){alert('บันทึกไม่สำเร็จ')}finally{E('interestAdd').disabled=false}}
async function toggleInterest(id,state){try{const r=await fetch(API+'/interests/'+id,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({is_active:state})});if(!r.ok)throw 0;await loadInterests()}catch(e){alert('เปลี่ยนสถานะไม่สำเร็จ')}}

function selectJob(j){if(E('target'))E('target').value=j;if(E('trackJob'))E('trackJob').value=j;if(E('trackStatus'))E('trackStatus').value='เตรียม CV';window.ARMAnalytics?.event('prepare_application',j);buildCV();location.hash='cv'}
function buildCV(track=true){if(!E('pvName'))return;E('pvName').textContent=E('name').value.trim()||'ARM';E('pvContact').textContent=[E('phone').value,E('email').value,E('portfolio').value].filter(Boolean).join(' • ')||'เติมข้อมูลติดต่อก่อนส่งสมัคร';E('pvProfile').textContent='Fashion Styling & Creative Production professional with 10+ years of experience across styling, costume, wardrobe and production environments.'+(E('target').value?' Targeting '+E('target').value+'.':'');E('pvExperience').textContent=E('projects').value.trim()||'10+ years: Styling / Costume / Wardrobe / Production environments';E('pvTools').innerHTML=E('tools').value.trim()?'<h2>LANGUAGES / TOOLS</h2><p>'+esc(E('tools').value)+'</p>':'';saveLocal();if(track)window.ARMAnalytics?.event('cv_builder','explicit_update')}
function saveLocal(){const d={};['target','name','phone','email','portfolio','projects','tools'].forEach(i=>{if(E(i))d[i]=E(i).value});localStorage.setItem('armJobScoutV25',JSON.stringify(d))}
function loadLocal(){try{const d=JSON.parse(localStorage.getItem('armJobScoutV25')||localStorage.getItem('armJobScoutV24')||localStorage.getItem('armJobScoutV23')||'{}');Object.keys(d).forEach(i=>{if(E(i))E(i).value=d[i]})}catch(e){}buildCV(false);renderTrack()}
function addTrack(){const j=E('trackJob')?.value.trim();if(!j)return alert('กรอกชื่องาน');const a=JSON.parse(localStorage.getItem('armTrackerV20')||'[]'),x={job:j,status:E('trackStatus').value,note:E('trackNote').value.trim(),at:new Date().toLocaleDateString('th-TH')},k=a.findIndex(v=>v.job===j);if(k>=0)a[k]=x;else a.unshift(x);localStorage.setItem('armTrackerV20',JSON.stringify(a));renderTrack()}
function renderTrack(){if(!E('trackList'))return;const a=JSON.parse(localStorage.getItem('armTrackerV20')||'[]');E('trackList').innerHTML=a.map(x=>'<div class="track"><b>'+esc(x.job)+'</b><div class="fit">'+esc(x.status)+'</div><small>'+esc(x.note||'')+' • '+esc(x.at)+'</small></div>').join('')||'<div class="meta">ยังไม่มีรายการสมัคร</div>'}

document.addEventListener('click',e=>{const a=e.target.closest('a[data-job-source]');if(a)window.ARMAnalytics?.event('job_source_click',a.dataset.jobSource||'job')});
['target','name','phone','email','portfolio','projects','tools'].forEach(i=>E(i)?.addEventListener('input',()=>{saveLocal();buildCV(false)}));
if(location.pathname==='/arm-jobs/'){document.title='ARM Job Scout v3';const s=document.querySelector('.brand .muted');if(s)s.textContent='v3';}
loadLocal();loadInterests();
