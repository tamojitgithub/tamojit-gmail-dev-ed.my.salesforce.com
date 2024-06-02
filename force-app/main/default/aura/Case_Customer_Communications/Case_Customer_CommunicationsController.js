({
	doInit : function(component, event, helper) {
        try{
		    helper.doInitHelper(component,event, helper);
        }catch (Err) {
            helper.showToast(component,'Error',"Error Occured While Refreshing Component","Error");
        }
	},
    
    onTabRefreshed : function(component, event, helper) {
        try{
            var refreshedTabId = event.getParam("tabId");
            helper.doInitHelper(component,event, helper);
            var workspaceAPI = component.find("workspace");
            workspaceAPI.getTabInfo({
                tabId : refreshedTabId
                }).then(function(Response) {
               });
        }catch(Err){
            helper.showToast(component,'Error',"Error Occured While Refreshing Component","Error");
        }
    }
})