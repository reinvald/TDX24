
import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';

export default class TestableComponent extends LightningElement {
    contacts;
    filteredContacts;

    // Apex method called directly in LWC, makes it hard to test in isolation and harder to mock
    // there are mixed concerns here: fetching data and presentation logic
    @wire(getContacts)
    wiredContacts({ error, data }) {
        if (data) {
            this.contacts = data;
            this.filteredContacts = this.filteredContacts ?? data;
        } else if (error) {
            console.error(error);
        }
    }

    // let's move our Apex callout to a seperate service file to seperate our concerns
    // this will allow us to use dependency injection in our component and will make mocking of the Apex method much simpler
    handleSearchChange(event) {
        const searchKey = event.target.value.toLowerCase();
        this.filteredContacts = this.contacts.filter(contact => contact.Name.toLowerCase().includes(searchKey));
    }
}