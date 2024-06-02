({
	doInitHelper : function(component, event, helper) {
        try{
            var action = component.get("c.getDispatchList");
            action.setParams({"Id" : component.get("v.recordId")});
            action.setCallback(this, $A.getCallback(function (response) {
                var state = response.getState();
                if (state === "SUCCESS") { 
                    component.set("v.displayDispatchInstructionList", response.getReturnValue());                    
                }
             }));
            $A.enqueueAction(action);
        }catch(Err){
            this.showToast(component, 'ERROR', "Error Occured While Refreshing Component", "Error");
        }
    }

})