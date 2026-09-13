window.HED3505Portfolio = function(client){
  return {
    async saveField({wsId,fieldId,response,sourceEvidenceId=null,datasetId=null,status='DRAFT',revisionReason=null}){
      const {data,error}=await client.rpc('hed3505_save_portfolio_field',{
        p_ws_id:wsId,
        p_field_id:fieldId,
        p_response:response,
        p_source_evidence_id:sourceEvidenceId,
        p_dataset_id:datasetId,
        p_status:status,
        p_revision_reason:revisionReason
      });
      if(error) throw error;
      return data;
    },
    async getMyPortfolio(){
      const {data,error}=await client.rpc('hed3505_get_my_portfolio');
      if(error) throw error;
      return data||[];
    },
    async getRevisions(wsId=null,fieldId=null){
      const {data,error}=await client.rpc('hed3505_get_my_portfolio_revisions',{
        p_ws_id:wsId,
        p_field_id:fieldId
      });
      if(error) throw error;
      return data||[];
    },
    async getCarryForward(toWs){
      const {data,error}=await client.rpc('hed3505_get_my_carry_forward',{p_to_ws:toWs});
      if(error) throw error;
      return data||[];
    },
    async applyCarryForward(toWs){
      const {data,error}=await client.rpc('hed3505_apply_my_carry_forward',{p_to_ws:toWs});
      if(error) throw error;
      return Array.isArray(data)&&data[0]?data[0].applied_count:0;
    }
  };
};
