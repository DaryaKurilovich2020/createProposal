public with sharing class PropertyController {
      @AuraEnabled(cacheable=true)
      public static List<Property__c> getProperties(){
         return [SELECT name,price__c From Property__c];
       }
}