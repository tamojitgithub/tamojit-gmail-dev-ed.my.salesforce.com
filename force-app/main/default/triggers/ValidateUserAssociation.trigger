trigger ValidateUserAssociation on User (before update) {

    userValidation.ValidateCaseOwner(Trigger.New);

}