@isTest 
private class userValidation_Test {
    @testSetup
    static void setupData()
    {
        Profile objProfile = [SELECT Id FROM Profile WHERE Name = 'System Administrator'];
        
        system.debug(objProfile);
        User user = new User(
            Alias = 'dellUser',
            FirstName='Test_pk_Dell', 
            Email='delluser@dell.com',
            IsActive=True, 
            LastName='Dell', 
            EmailEncodingKey='UTF-8',
            LanguageLocaleKey='en_US',
            FederationIdentifier='1234567',
            LocaleSidKey='en_US', 
            ProfileId = objProfile.Id,
            TimeZoneSidKey='America/Los_Angeles',
            UserName = 'testUser32123@google.com' 
            
        );
        insert(user);
        
        User thisUser = [SELECT Id FROM User WHERE Id = :UserInfo.getUserId()]; 
        User objUser = [SELECT Id,ProfileId,
                                            Name,
                                            IsActive
                        FROM User 
                        WHERE FirstName='Test_pk_Dell' limit 1];
        system.debug(objUser);
        
        Case testCaseRecord = new Case(
                Status = 'New',            
                Origin = 'Phone',
                Subject = 'Test Case',
                OwnerId = objUser.Id
            );
            insert testCaseRecord;
        
        system.debug(user);
        }
        
        public static testMethod void updateResource()
        {
        
        User thisUser = [SELECT Id FROM User WHERE Id = :UserInfo.getUserId()]; 
        User objUser = [SELECT Id,ProfileId,
                                            Name,
                                            IsActive
                        FROM User 
                        WHERE FirstName='Test_pk_Dell' limit 1];

        Test.startTest();
        List<Boolean> exceptions = new List<Boolean>();
        try{
                objUser.IsActive = false;
                update objUser;
                }
                catch (Exception e){
              if(e.getMessage().equalsIgnoreCase('user has case ownership, can not deactivate')){
                exceptions.add(true);
              }
            Test.stopTest();
            
            for(Boolean b : exceptions){
            system.assert(b, 'should not be able to update the user');
            }
  }

       
    }
}