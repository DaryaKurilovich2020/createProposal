import { LightningElement, track,api,wire } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import getProperties from '@salesforce/apex/PropertyController.getProperties';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createProposal from '@salesforce/apex/ProposalController.createProposal'
import createContact from '@salesforce/apex/ProposalController.createContact'
export default class InputNameRequired extends LightningElement
{
    templateContactInput = true;
    @api recordId;
    @track clientFirstname = "";
    @track clientLastname = "";
    @track clientEmail = "";
    @track partnerFirstname = "";
    @track partnerLastname = "";
    @track partnerEmail = "";
    @track selectedProperty;
    error;
    @track price = 0;
    @track data;
    @track columns = [{ label: 'Property name', fieldName: 'Name'},
    { label: 'Price', fieldName: 'Price__c', type: 'currency' }];
    clientId;
    partnerId;
    proposal;

    connectedCallback()
    {
        getProperties()
        .then((result, error) =>
        {
            if (result)
            {
               this.data = result;
            }
            else if (error)
            {
                console.error(error);
            }
        })
    }

    switchTemplate()
    { 
        this.templateContactInput = this.templateContactInput === true ? false : true; 
    }

    closeAction()
    {
        this.dispatchEvent(new CloseActionScreenEvent());
    }    

    handleClick(event)
    {            
        console.log(event.target.label);   
        this.handleInputs();
        this.isFilled();
    }

    handleInputs()
    {
        var inp = this.template.querySelectorAll("lightning-input");
        inp.forEach(function(element)
        {
            if(element.name == "ClFN")
            {
                this.client_firstname = element.value;
            }
            else if(element.name == "ClLN")
            {
                this.client_lastname = element.value;
            }
            else if(element.name == "ClE")
            {
                this.client_email = element.value;
            }
            else if(element.name == "PFN")
            {
                this.partner_firstname = element.value;
            }
            else if(element.name == "PLN")
            {
                this.partner_lastname = element.value;
            }
            else if(element.name == "PE")
            {
                this.partner_email = element.value;
            }

        },this);
    }
  
    isFilled()
    {
      const isCorrectContactInput = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, input) =>
            {
                input.reportValidity();
                return validSoFar && input.checkValidity();
            }, true);
        if (isCorrectContactInput)
        {
            this.switchTemplate();
        }
    }

    handleRowSelection = event => {
        var selectedRows = event.detail.selectedRows;
        this.selectedProperty = selectedRows[0].Id;
        this.price=selectedRows[0].Price__c;
    }

    showNotification()
    {
        const event = new ShowToastEvent({
            title: 'Error',
            message: 'Only one row can be selected',
            variant: 'warning',
            mode: 'pester'
        });
        this.dispatchEvent(event);
    }

    handlePriceInput()
    {
        var inp = this.template.querySelectorAll("lightning-input");
        inp.forEach(function(element)
        {
            if(element.name == "price")
            {
                this.price = element.value;
            }
        },this);
    }

    handleFinish()
    {
        this.handlePriceInput();
        this.createContacts();

        createProposal({oppId: this.recordId, propertyId: this.selectedProperty, price: this.price,
                        clientId: this.clientId, partnerId: this.partnerId})
        .then((result, error) =>
        {
            if (result)
            {
                this.proposal = result;
            } 
            else if (error)
            {
                console.error(error);
            }
        })
        this.closeAction();
    }

    createContacts()
    {
        createContact({firstname: this.clientFirstname, lastname: this.clientLastname, email: this.clientEmail})
        .then((result, error) =>
        {
            if (result)
            {
                this.clientId = result;
            }
            else if (error)
            {
                console.error(error);
            }
        })

        createContact({firstname: this.partnerFirstname, lastname: this.partnerLastname, email: this.partnerEmail})
        .then((result, error) =>
        {
            if (result)
            {
                this.partnerId = result;
            }
            else if (error)
            {
                console.error(error);
            }
        })
    }
}