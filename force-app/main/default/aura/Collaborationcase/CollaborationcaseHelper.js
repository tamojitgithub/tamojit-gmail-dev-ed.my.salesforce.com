({
    fetchqueue: function(component){
        try{
            
            var supportTeamValueFromFlow = component.get("v.SupportTeam");            
            var parentCase =component.get("v.caseRec");
            var acc =component.get("v.AccountId");
            var cont =component.get("v.ContactId");
            var asset =component.get("v.AssetId");
            var caseNum =component.get("v.caseNum");        
            
            component.set("v.SupportTeamValue", supportTeamValueFromFlow);
            component.set("v.caserecordId", parentCase);
            component.set("v.AccountIdValue",acc);
            component.set("v.ContactIdValue",cont);
            component.set("v.AssetIdValue",asset);
            component.set("v.CaseNumValue",caseNum);
            
            
            // Call the Server Side Controller for getting the Dependent Picklist of Queue and reasons based on Support Team Selection
            var action = component.get("c.getOptions");
            action.setParams({  supportTeam : supportTeamValueFromFlow});
            action.setCallback(this, function(res) {
                var state = res.getState();
                console.log(res.getReturnValue());
                if(state == 'SUCCESS') {
                    component.set("v.optionList", res.getReturnValue());
                }  
            })
            
            $A.enqueueAction(action);
            var actionUser = component.get("c.getCurrentUser"); // Call the Server Side Controller for getting the Current User Details
            
            actionUser.setCallback(this, function(response) {
                var state=response.getState();
                var resValue=response.getReturnValue();
                if(state == 'SUCCESS') {                   
                    component.set("v.currentUser", resValue);
                    
                }
            });
            $A.enqueueAction(actionUser);
        }catch(err){
            console.log(err);
        }
    },
    
    startcreatecasehelper: function(component,helper){
        try{
            var bID = component.find("queueId").get("v.value");//button ID
            console.log(bID);
            
            var index,QueueName;
            component.get("v.optionList").forEach(function(v,i) { 
                if(v.Id == bID) {
                    index = i;
                    
                }
            });
            
            var Queue=component.get("v.optionList")[index].Queue__c;
            var Reason = component.find("reason").get("v.value"); 
            var caseTitle = component.find("title").get("v.value"); 
            var Description = component.find("Desc").get("v.value"); 
            var customerWaiting = component.find("custStatus").get("v.value");
            var parentCase =component.get("v.caserecordId");
            var accId =component.get("v.AccountIdValue");   
            var conId=component.get("v.ContactIdValue");
            var assetId=component.get("v.AssetIdValue");
            var supportTeam=component.get("v.SupportTeamValue");            
            
            
            if(supportTeam.length!=0 && Queue.length!=0 && Reason!='--None--' && caseTitle.length!=0 && Description!=null && Description!=''){
                
                //Call the Server Side Controller for creating the case
                var action = component.get("c.createCase");                
                action.setParams({ 
                    supportTeam :supportTeam,
                    queueId : Queue,
                    reason : Reason ,
                    description : Description,
                    caseTitle : caseTitle ,                    
                    customerWaiting : customerWaiting,
                    parentCase : parentCase,
                    accId: accId,
                    contactId: conId,
                    assetId: assetId});
                
                action.setCallback(this, function(res) {
                    var state = res.getState();
                    console.log(res.getReturnValue());
                    var error = res.getError();
                    console.log(JSON.stringify(res.getError())); 
                    console.log(customerWaiting);
                    if(state == 'SUCCESS') {  
                        if(res.getReturnValue()!=null){
                            var navEvt = $A.get("e.force:navigateToSObject");
                            navEvt.setParams({
                                "recordId": res.getReturnValue(),
                                "slideDevName": "detail"
                            });
                            navEvt.fire();
                        }
                        else{
                            helper.showToast(component,'Error',"Case is not created , please contact system admin", error);
                        }
                    }
                    else{
                        helper.showToast(component,'Error',"Case is not created , please contact system admin", error);
                    }
                })
                $A.enqueueAction(action); 
                
            }
            else{                
                helper.showToast(component,'Error',"Kindly fill the Mandatory Field", "Error");
            }
            
        }catch(err){
            console.log(err);            
        }
    },
    
    startcollaboratechathelper : function(component, helper) {
        try{
            var bID = component.find("queueId").get("v.value");//button ID
            console.log(bID);
            
            var index,QueueName;
            component.get("v.optionList").forEach(function(v,i) { 
                if(v.Id == bID) {
                    index = i;
                    
                }
            });
            
            var QueueName  = component.get("v.optionList")[index].Queue__c;
            var buttonId  = component.get("v.optionList")[index].buttonId__c;
            var rsn = component.find("Desc").get("v.value"); //Description field
            var customerWaiting = component.find("custStatus").get("v.value");
            var caseId = component.get("v.caserecordId");// get the caseId
            var Reason = component.find("reason").get("v.value");             
            var Cn =component.get("v.CaseNumValue");            
            var url = '';           
            var userName=component.get("v.currentUser.Name"); 
            var supportTeam=component.get("v.SupportTeamValue"); 
            
            if(Reason!='--None--' && rsn!=null && rsn!=''){
                if(customerWaiting){
                    url= "/apex/CollaborateChat?Name="+userName+"&Description="+encodeURIComponent(rsn)+"&CaseNr="+Cn+"&buttonId="+buttonId+"&Role="+supportTeam+"&QueueName="+QueueName+"&RoleReason="+Reason+"&custStatus=Yes";
                } else {
                    url= "/apex/CollaborateChat?Name="+userName+"&Description="+encodeURIComponent(rsn)+"&CaseNr="+Cn+"&buttonId="+buttonId+"&Role="+supportTeam+"&QueueName="+QueueName+"&RoleReason="+Reason+"&custStatus=No";
                }
                
                console.log(url);
                
                window.open(url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=420,height=500");  
            }
            else{
                helper.showToast(component,'Error',"Kindly fill the Mandatory Field", "Error"); 
            }          
        } catch(err){
            console.log(err);
        }   
    },
    
    onlineOrChathelper: function(component){
        try{
            
            var bID = component.find("queueId").get("v.value");
            var Reason = component.find("reason").get("v.value"); 
            console.log(bID);
            
            var index,QueueName;
            component.get("v.optionList").forEach(function(v,i) { 
                if(v.Id == bID) {
                    index = i;
                    
                }
            });
            var Type='';
            if(bID!='--None--'){
                Type  = component.get("v.optionList")[index].Type__c ;
                component.set("v.Type",Type);
                if(Type=='Chat'){
                    component.find("title").set("v.disabled", true);
                }
                else if(Type=='Case'){
                    component.find("title").set("v.disabled", false);
                }
            } 
        }catch(err){
            console.log(err);
        }   
    },
    
    showToast: function(component, title, message, type) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": title,
            "message": message, 
            "type": type,
            "mode": "pester",
            "duration": "3000"
        });
        toastEvent.fire();
    }    
})