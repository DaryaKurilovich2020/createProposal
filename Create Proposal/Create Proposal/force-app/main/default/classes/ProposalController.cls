public with sharing class ProposalController {
    Contact client=new Contact();
    Contact partner=new Contact();
    @AuraEnabled(cacheable=true)
    public static void createClientContact(String clientFirstName,String clientLastName,String clientEmail){
        client.firstname=clientFirstName;
        client.lastname=lastname;
        client.email=clientEmail;
 //   Contact clientContact=new Contact(firstname=clientFirstName,lastname=clientLastName,email=clientEmail);
 //   client=clientContact;
    insert client;
    }
    @AuraEnabled(cacheable=true)
    public static void createProposal(String id,Double price){
        Property__c property=[SELECT id,name,price__c FROM Property__c WHERE id=:id];
        property.price__c=price;
        update property;
        Proposal__c proposal=new Proposal__c(Client_Contact__c=this.client,Agent_Contact__c=this.partner,Property__c=property);
        insert proposal;
        
    }
    @AuraEnabled(cacheable=true)
    public static void createPartnerContact(String partnerFirstName, String partnerLastName,String partnerEmail){
        partner.firstname=partnerFirstName;
        partner.lastname=partnerLastName;
        partner.email=partnerEmail;
   // Contact partnerContact=new Contact(firstname=partnerFirstName,lastname=partnerLastName,email=partnerEmail);
    //partner=partnerContact;
    insert partner;
    }
}
