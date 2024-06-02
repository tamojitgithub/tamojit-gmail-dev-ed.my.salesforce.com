/*******************************************************************************************************
Name:          Case_Customer_Communications
Description:   This class contains the method to fetch dispatch instruction for related workorder
Req #: 5049187
Test Class : Case_Customer_Communications_Test
*******************************************************************************************************/
public with sharing class Case_Customer_Communications{
 
    public  static List<Case> LstDispInt = new List<Case>();    
    @AuraEnabled    
    public static List<Case> getDispatchList(String Id){
               LstDispInt = [select id  from Case ORDER BY CreatedDate DESC];
               return LstDispInt;
    }
}