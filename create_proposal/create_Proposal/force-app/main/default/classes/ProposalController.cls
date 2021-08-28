public with sharing class ProposalController 
{
   @AuraEnabled
   public static String createProposal(String oppId, String propertyId, Double price, String clientId, String partnerId)
   {
        Property__c property = [SELECT id,Price__c FROM Property__c WHERE id =: propertyId];
        property.Price__c = price;
        update property;
        Contact client=[SELECT id from Contact Where id=:clientId];
    
        Proposal__c proposal = new Proposal__c();
        proposal.Opportunity__c = oppId;
        proposal.Client_contact__c = clientId;
        proposal.Agent_contact__c = partnerId;
        proposal.Property__c = property.id;
        insert proposal;
        return proposal.id;  
   }

   @AuraEnabled
   public static String createContact(String firstname, String lastname, String email)
   {
      Contact contact = new Contact();
      contact.firstname = firstname;
      contact.lastname = lastname;
      contact.Email = email;
      insert contact;
      return contact.id;
   }
}