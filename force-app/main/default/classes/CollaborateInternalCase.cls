/* --------------------------------------------------------------------------------------------------------------------
Name:         CollaborateInternalCase 
Description:  this Controller is used by CollaborationCase.cmp for Story 5820178 & 5820681
Date          Version  Author             Summary of Changes 
-----------  -------  -----------------  -------------------------------------------------------------------------------
12/30/2018     1.0     Brundha Rajkumar     Initial Release

------------------------------------------------------------------------------------------------------------------------ */  


public class CollaborateInternalCase {
    
    
    /* ----------------------------------------------------------------------------------------------------------------------
Name:         createCase
Description:  this functions creates the  Case
-------------------------------------------------------------------------------------------------------------------------*/
    @AuraEnabled
    public static id createCase(string supportTeam,string queueId,string reason,string description,string caseTitle,boolean customerWaiting,Id parentCase,Id accId,Id contactId,Id assetId){
        try{
            case childcase=new case();      
            //childcase.support_team__c=supportTeam;
            //childcase.case_queue__c=queueId;
            //childcase.Internal_Case_Create_Reason__c =reason;
            childcase.Description=description;
            childcase.Subject=caseTitle;
            childcase.status='Open';
            //childcase.Customer_Waiting__c=Boolean.valueOf(customerWaiting);
            //childcase.recordtypeId=system.label.Internal_case;
            childcase.parentId=parentcase;
            childcase.Origin='Internal';
            childcase.AssetId=assetId;
            childcase.AccountId=accId;
            childcase.ContactId=contactId;
            
            insert childcase;        
            return childcase.id;
        }
        catch(exception e){
            //ExceptionHandler.logHandledExceptions(e,'CollaborateInternalCase','createCase','CaseManagement'); 
        }
        return null;
    }
    
    /* ----------------------------------------------------------------------------------------------------------------------
Name:         getOptions
Description:  this function get the records from Custom Metadata type Collaborate_Support_Team__mdt based on the Support Team value
-------------------------------------------------------------------------------------------------------------------------*/
    @AuraEnabled
    public static List<Collaborate_Support_Team__mdt> getOptions(string supportTeam) {
        List<Collaborate_Support_Team__mdt> CSTListValue=new List<Collaborate_Support_Team__mdt>();
        List<Collaborate_Support_Team__mdt> CSTList = new List<Collaborate_Support_Team__mdt>();
        CSTList=[SELECT Id,Label,developerName,buttonId__c,Queue__c,Reason__c,Support_Team__c,Type__c FROM Collaborate_Support_Team__mdt where Support_Team__c=:supportTeam ORDER By DeveloperName ASC limit 200];
        if(!CSTList.isEmpty()) {
            for(Collaborate_Support_Team__mdt objBT: CSTList) {
                CSTListValue.add(objBT);
            }
        }
        if(!CSTListValue.isEmpty()) {
            return CSTListValue; 
        }
        return null;
    }
    
    /* ----------------------------------------------------------------------------------------------------------------------
Name:         getCurrentUser
Description:  this function to query the current User Information
-------------------------------------------------------------------------------------------------------------------------*/
    @AuraEnabled
    
    public static User getCurrentUser() {
        User userInfo = [SELECT Id, FirstName, LastName,Name FROM User WHERE Id = :UserInfo.getUserId() LIMIT 1];
        return userInfo;
    }
}