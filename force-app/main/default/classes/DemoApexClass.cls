public with sharing class DemoApexClass {

    public class ReturnObject{
        @AuraEnabled public String messageText;
        @AuraEnabled public Boolean success;
    }
    @AuraEnabled
    public static ReturnObject sayHello(){
        ReturnObject returnObj = new ReturnObject();
        returnObj.messageText = 'Hello World';
        returnObj.success = true;
        return returnObj;
    }
}