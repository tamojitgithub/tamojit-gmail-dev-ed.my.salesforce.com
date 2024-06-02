({
    assetRetrieve: function(component){
        try{
            var errMessage='';
        	var recID= component.get("v.recordId");
            var action = component.get("c.getAssetName");
            action.setParams({
                "recordId": recID
            });
            action.setCallback(this, function(response) {
                var state = response.getState();        
                if (state === "SUCCESS") {	
                    var result = response.getReturnValue();
                    if (!$A.util.isUndefinedOrNull(result)){ 
                        component.set("v.assetName", result.serviceTag);
                    } else{
                        component.set("v.assetName", null);   
                    }
                } else if (state === "INCOMPLETE") {
                    errMessage = $A.get("$Label.c.CaseQuickLinkErrorMessage");
                    this.showToast(component,'Error', errMessage, "Error");
                } else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                             this.showToast(component,'Error', $A.get("$Label.c.CaseQuickLinkErrorMessage"), "Error");
                        }
                    } else{
                        errMessage = $A.get("$Label.c.CaseQuickLinkErrorMessage");
                        this.showToast(component,'Error', errMessage, "Error");
                    }
                }
            });
            $A.enqueueAction(action);   
        } catch(Err) {
            this.showToast(component,'Error', "Error Occured : "+Err, "Error");
        }
    },
    
    changeEventhelper: function (component) {
        try{
        	var selectedValue=component.get("v.selectedValue");
            var link='';
            var tagname=component.get("v.assetName");
            
            if(selectedValue==="SATC"){
                link=$A.get("$Label.c.SupportAssistTechConsole")+tagname;
            }
            if(selectedValue==="TechDirect"){
                link=$A.get("$Label.c.Tech_Direct");
            }
            if(selectedValue==="SPMD"){
                link=$A.get("$Label.c.SparePartsMasterDatabase")+tagname;
            }
            if(selectedValue==='SQi'){
                link=$A.get("$Label.c.ServiceTagLookup")+tagname;
            }
            if(selectedValue==="DellSupport"){
                link=$A.get("$Label.c.DellSupport")+tagname;
            }
            
            var urlEvent = $A.get("e.force:navigateToURL");
            link = 'https://www.google.com';
            urlEvent.setParams({
                "url":link 
            });
            urlEvent.fire();
            // Below Line is COmmented by Harsha - Since Action is Not Defined and enqueue is used
            //$A.enqueueAction(action);     
        } catch (Err) {
            this.showToast(component,'Error', $A.get("$Label.c.CaseQuickLinkErrorMessage"), "Error");
        }
    },
    
    showToast : function(component, title, message, type) {
    	var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
        	"title": title,
            "message": message, 
            "type": type,
            "mode": "pester",
            "duration": "3000"
        });
        toastEvent.fire();
    },
})