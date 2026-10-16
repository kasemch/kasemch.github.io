const API='https://br-empty-king-b3fkxbfp-jobinterests.compute.c-4.ap-southeast-1.aws.neon.tech';
const E=id=>document.getElementById(id);
const esc=s=>String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[m]));

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

const MARKET_REFRESH={checked:'16 ต.ค. 2569',jobs:[
 {rank:1,title:'Fashion Stylist',company:'Louis Vuitton',match:'96%',why:'ตรงกับ Styling / Wardrobe 10+ ปี และพื้นฐาน Fashion โดยตรง',check:'ตรวจ requirement ด้าน luxury client strategy และภาษาในประกาศต้นทาง',url:'https://th.fashionjobs.com/job/louis-vuitton/Fashion-stylist-bangkok%2C12084290.html'},
 {rank:2,title:'Stylist — Fashion Brand',company:'WMANAGEMENT',match:'92%',why:'งาน Stylist โดยตรง สอดคล้องกับประสบการณ์ styling/costume/wardrobe',check:'ตรวจชื่อแบรนด์และรายละเอียดนายจ้างก่อนส่งใบสมัคร',url:'https://jobbkk.com/jobs/detailurgent/247263/1395776'},
 {rank:3,title:'Assistant Creative & Production Coordinator',company:'EVENTERY',match:'90%',why:'Production/backstage, coordination และแก้ปัญหาหน้างาน transferable โดยตรง',check:'Adobe เป็นเพียงข้อพิจารณาเพิ่มเติม—ไม่ใส่ใน CV หากยังไม่ยืนยัน',url:'https://www.jobthai.com/en/job/1907454'},
 {rank:4,title:'Sales & Client Advisor — Siam Paragon',company:'BALENCIAGA',match:'82%',why:'Fashion background + customer service/coordination ใช้ต่อยอดได้',check:'ตรวจ sales KPI และภาษา; ไม่อ้างประสบการณ์ luxury sales ที่ไม่มีหลักฐาน',url:'https://www.kering.com/fr/talent/offres-d-emploi/asia/balenciaga-sales-client-advisor-siam-paragon/'},
 {rank:5,title:'Client Advisor',company:'GUCCI',match:'80%',why:'Fashion knowledge และ customer-facing experience เป็น transferable strengths',check:'ตำแหน่งเน้น sales/clienteling/targets จึงต้องเทียบ requirement ก่อนสมัคร',url:'https://www.kering.com/en/talent/job-offers/europe/gucci-client-advisor-36/'}
]};
function renderMarketRefresh(){
 if(location.pathname!=='/arm-jobs/')return;
 const summary=document.querySelector('.summary');if(!summary)return;
 const sec=document.createElement('section');sec.className='section';sec.id='live-market-refresh';
 sec.innerHTML=`<h2>Top 5 — Live Market Refresh</h2><p class="muted">ตรวจตลาดล่าสุด ${MARKET_REFRESH.checked} · รายการนี้เป็น operational priority ปัจจุบัน · Match เป็นคะแนนจัดลำดับภายใน ไม่ใช่คะแนนนายจ้าง</p><div class="jobs">${MARKET_REFRESH.jobs.map(j=>`<article class="card job"><span class="match">#${j.rank} · ${j.match} Match</span><h3>${esc(j.title)}</h3><div class="muted">${esc(j.company)} · Bangkok</div><div class="fit"><b>Why it fits:</b> ${esc(j.why)}</div><div class="warn"><b>What to check:</b> ${esc(j.check)}</div><div class="actions"><a class="btn" data-job-source="${esc(j.company+' '+j.title)}" target="_blank" rel="noopener" href="${j.url}">Source</a><button class="btn gold" onclick="selectJob('${esc(j.title+' — '+j.company)}')">Prepare</button></div></article>`).join('')}</div>`;
 summary.insertAdjacentElement('afterend',sec);
 const market=document.querySelector('#jobs h2');if(market)market.textContent='Opportunity Market — previous verified snapshot';
 const marketNote=document.querySelector('#jobs > p.muted');if(marketNote)marketNote.insertAdjacentHTML('afterend','<p class="warn"><b>Operational note:</b> ใช้ Top 5 — Live Market Refresh ด้านบนเป็นลำดับปัจจุบัน ข้อมูล snapshot ด้านล่างเก็บไว้เพื่อ traceability และจะทยอย re-verify ในรอบตลาดถัดไป</p>');
}

document.addEventListener('click',e=>{const a=e.target.closest('a[data-job-source]');if(a)window.ARMAnalytics?.event('job_source_click',a.dataset.jobSource||'job')});
['target','name','phone','email','portfolio','projects','tools'].forEach(i=>E(i)?.addEventListener('input',()=>{saveLocal();buildCV(false)}));
if(location.pathname==='/arm-jobs/'){document.title='ARM Job Scout v3';const s=document.querySelector('.brand .muted');if(s)s.textContent='v3';}
renderMarketRefresh();loadLocal();loadInterests();
