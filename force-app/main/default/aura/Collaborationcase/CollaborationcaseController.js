({    
    onlineOrChat : function(component, event, helper) {
        helper.onlineOrChathelper(component);
        
    },
    startCollaborateChat : function(component, event, helper) {
        helper.startcollaboratechathelper(component,helper);
    },
    startCreateCase : function(component, event, helper) {
        helper.startcreatecasehelper(component,helper);        
    },
    doInit : function(component, event, helper) {          
        helper.fetchqueue(component);      
    }
})