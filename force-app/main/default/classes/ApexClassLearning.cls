public with sharing class ApexClassLearning {


    public static void getCaseList()
    {
        Case CList = new Case(Origin = 'Web', Status = 'New');
        Set<Case> caseIds = new Set<Case>([select id, casenumber from case]);

    

        Database.SaveResult[] results = Database.insert(new SObject[]{CList});

        for (Database.SaveResult rs : results) {
            
        } 

        

        


    }
    
}