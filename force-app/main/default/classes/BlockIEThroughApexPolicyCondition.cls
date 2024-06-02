Public class BlockIEThroughApexPolicyCondition implements TxnSecurity.PolicyCondition {
    public boolean evaluate(TxnSecurity.Event e) {
        List<User> users = [SELECT ProfileId FROM User WHERE Id = :e.UserId];
        //if (users == null || users.size() == 0){
          //  return false;
        //}
        String profileId = (String)users.get(0).get('ProfileId');
        List<Profile> profiles = [SELECT Name FROM Profile WHERE Id = :profileId];
      if (profiles == null || profiles.size() == 0 ||users == null || users.size() == 0){
         return false;
       }
       
        String profileName = (String)profiles.get(0).get('Name');
        List<LoginHistory> eObjList = [SELECT Browser FROM LoginHistory WHERE Id = :e.data.get('LoginHistoryId') Limit 1];
        string profileName1 = '"' +profileName + '"';
        String P=system.label.BlockIEPolicyProfile;
        Boolean ismatch = p.contains(profileName1);
     /*  if(ismatch && eObjList.size()>0 && eObjList[0].Browser.contains('IE'))
           return true;
       else 
            return false; */
         return (ismatch && eObjList.size()>0 && eObjList[0].Browser.contains('IE'))? true :false;
  
    }
}