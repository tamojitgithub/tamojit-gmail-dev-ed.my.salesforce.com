public class userValidation{


   public static void ValidateCaseOwner(object[] newTrigger){
   
   List<User> UsersList = (List<User>) newTrigger;
   
   for(User usr : UsersList){
         
        if(usr.IsActive == false){
             
        Integer OwnerCount = [select count() from  case where ownerId=:usr.Id];
        
        if(OwnerCount > 0){
        
        usr.addError('user has case ownership, can not deactivate');
        
        }
             
    }
    }
   
   
             
   }
}