import { LightningElement, track, wire } from 'lwc';
import getProperties from '@salesforce/apex/PropertyController.getProperties';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const columns = [
    { label: 'Property name', fieldName: 'name' },
    { label: 'Price', fieldName: 'amount', type: 'currency' }
];

export default class BasicDatatable extends LightningElement {
    @track data = [];
    @track columns = columns;

  
    @wire(getProperties)
    WireContactRecords({error, data}){
        if(data){
            this.data = data;
            this.error = undefined;
        }else{
            this.error = error;
            this.data = undefined;
        }
    }
    handleRowSelection = event => {
        var selectedRows=event.detail.selectedRows;
        if(selectedRows.length>1)
        {
            var el = this.template.querySelector('lightning-datatable');
            selectedRows=el.selectedRows=el.selectedRows.slice(1);
            this.showNotification();
            event.preventDefault();
            return;
        }
    }
    showNotification() {
        const event = new ShowToastEvent({
            title: 'Error',
            message: 'Only one row can be selected',
            variant: 'warning',
            mode: 'pester'
        });
        this.dispatchEvent(event);
    }
}