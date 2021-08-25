import { LightningElement, track,api } from 'lwc';
import templateContactInput from './create_Proposal.html'
import templatePropertyChose from './propertyChose.html'
import { CloseActionScreenEvent } from 'lightning/actions';
import id from '@salesforce/user/Id';
 

export default class InputNameRequired extends LightningElement {
    templateContactInput = true;
    @api client_firstname;
    @api client_lastname;
    @api client_email;
    @api partner_firstname;
    @api partner_lastname
    @api partner_email;

render() {
    return this.templateContactInput ? templateContactInput : templatePropertyChose;
}

switchTemplate(){ 
    this.templateContactInput = this.templateContactInput === true ? false : true; 
}
closeAction(){
    this.dispatchEvent(new CloseActionScreenEvent());
  }
  handleClick(event)
    {
        console.log(event.target.label);
        var inp=this.template.querySelectorAll("lightning-input");


        inp.forEach(function(element){
            if(element.id=="ClFN")
                this.client_firstname=element.value;

            else if(element.id=="ClLN")
                this.client_lastname=element.value;

            else if(element.id=="ClE")
                this.client_email=element.value;

            else if(element.id=="PFN")
                this.pertner_firstname=element.value;

            else if(element.id=="PLN")
                this.partner_lastname=element.value;

            else if(element.id=="PlE")
                this.partner_email=element.value;

        },this);
        this.switchTemplate();
    }
}