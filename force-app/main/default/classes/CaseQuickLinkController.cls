/*
*******************************************************************************************************
Apex Controller: CaseQuickLinkController
Description : Controller to query the "AssetName" from the record pages where "CaseQuickLink" is placed.
*******************************************************************************************************
Date         Version            Author                Summary of Changes 
*******************************************************************************************************
06/28/2018     1.0          Srikanth Parvathareddy       Initial Release
*******************************************************************************************************
*/

public class CaseQuickLinkController {
    
    public with sharing class CaseQuickWrapper {
        @AuraEnabled public string serviceTag {get;set;}
    }
    
    @AuraEnabled
    public static CaseQuickWrapper getAssetName(Id recordId)
    {    
        try{
            
            string assetName='';
            CaseQuickWrapper CQWrapper = new CaseQuickWrapper(); 
            
            if(recordId.getsobjecttype().getDescribe().getName().equals('Asset')){
                assetName = [SELECT Name FROM Asset WHERE Id = :recordId LIMIT 1].Name;
            }
            else if(recordId.getsobjecttype().getDescribe().getName().equals('Case')){
                assetName = [SELECT Asset.Name FROM Case WHERE Id = :recordId LIMIT 1].Asset.Name;
            }   
            
            if(assetName!=Null)
            {
                CQWrapper.serviceTag=assetName;
            } 
            
            return CQWrapper;
        }
        catch(exception e)
        {
            return null; 
        }     
    }      
}