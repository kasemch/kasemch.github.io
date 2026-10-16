(()=>{
  'use strict';
  const PAGE='/arm-jobs/';
  const ENDPOINT='https://armstats.compute.c-4.ap-southeast-1.aws.neon.tech/visit';
  const KEY='armstatsSessionV1';
  function sessionId(){
    let id=sessionStorage.getItem(KEY);
    if(!id){
      const raw=(globalThis.crypto&&crypto.randomUUID)?crypto.randomUUID():`${Date.now()}_${Math.random().toString(36).slice(2)}`;
      id=`s_${raw.replace(/[^A-Za-z0-9_-]/g,'_')}`.slice(0,80);
      sessionStorage.setItem(KEY,id);
    }
    return id;
  }
  function pageView(){
    const body={visitor_id:sessionId(),page_path:PAGE};
    try{fetch(ENDPOINT,{method:'POST',mode:'cors',keepalive:true,headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}).catch(()=>{});}catch(_){/* analytics must never block UX */}
  }
  // The current backend stores page visits only. Interaction events remain gated
  // until a dedicated event store exists, so clicks cannot inflate Total Views.
  function track(event){ if(event==='page_view') pageView(); }
  window.ARMStats={track};
  window.addEventListener('DOMContentLoaded',()=>track('page_view'));
})();
