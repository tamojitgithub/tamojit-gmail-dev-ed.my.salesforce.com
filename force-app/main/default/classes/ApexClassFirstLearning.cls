public with sharing class ApexClassFirstLearning {

public static void getCase (String input)
{

List<case> cList = new List<case>([select id, casenumber from case]);
List<Account> aList = new List<Account>([select id from Account]);

Map<String, List<case>> m = new Map<String, List<case>>();

m.put('c', cList);

System.debug(m.get(input));




}
    
    
}