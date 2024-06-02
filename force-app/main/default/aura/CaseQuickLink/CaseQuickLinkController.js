({
    doInit:function(component,event,helper){
        try{
            helper.assetRetrieve(component);
        }catch(Err){
            helper.showToast(component,'Error', $A.get("$Label.c.CaseQuickLinkErrorMessage"), "Error");  
        }
    },
    changeEvent: function(component, event, helper) {
        try{
            helper.changeEventhelper(component);
        }catch(Err){
            helper.showToast(component,'Error', "Error Occured :"+Err, "Error");
        }
    },
})