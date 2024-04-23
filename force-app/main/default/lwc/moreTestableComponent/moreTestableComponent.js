import { LightningElement } from 'lwc';
import { fetchContacts } from './getContactsNetworkRequest';

export default class MoreTestableComponent extends LightningElement {
    error;
    contacts;
    filteredContacts;

    // dependency injection, separation of concerns
    // graceful error handling allows to effectively test all scenerios, successes and failures
    async connectedCallback() {
        try {
            this.contacts = await fetchContacts();
            this.filteredContacts = this.contacts;
        } catch (error) {
            this.error = error;
        }
    }

    handleSearchChange(event) {
        const searchKey = event.target.value.toLowerCase();
        this.filteredContacts = this.contacts.filter(contact => contact.Name.toLowerCase().includes(searchKey));
        this.filteredContacts = this.filteredContacts.length === 0 ? null : this.filteredContacts;
    }
}