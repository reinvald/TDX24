import getContacts from '@salesforce/apex/ContactController.getContacts';

export async function fetchContacts() {
    try {
        return await getContacts();
    } catch (error) {
        throw error;
    }
}