import { createElement } from 'lwc';
import MoreTestableComponent from 'c/moreTestableComponent';

import * as GetContactsNetworkRequest from '../getContactsNetworkRequest';

const mockContactData = require("./data/mockContactData.json");

GetContactsNetworkRequest.fetchContacts = jest.fn();

async function flushPromises() {
    return Promise.resolve();
}

describe('c-more-testable-component', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.clearAllMocks();
    });

    it('renders contacts when data is returned', async () => {

        GetContactsNetworkRequest.fetchContacts.mockReturnValueOnce(mockContactData)

        const element = createElement('c-more-testable-component', { is: MoreTestableComponent });
        document.body.appendChild(element);

        await flushPromises();

        return Promise.resolve().then(() => {
            const contactElements = element.shadowRoot.querySelectorAll('lightning-layout-item');
            expect(contactElements.length).toBe(mockContactData.length);
        });
    });

    it('updates filtered contacts when search input changes', async () => {

        GetContactsNetworkRequest.fetchContacts.mockReturnValueOnce(mockContactData)

        const element = createElement('c-more-testable-component', { is: MoreTestableComponent });
        document.body.appendChild(element);

        await flushPromises();
        
        const inputElement = element.shadowRoot.querySelector('lightning-input');
        inputElement.value = 'John';
        inputElement.dispatchEvent(new CustomEvent('change'));

        await flushPromises();

        const contactElements = element.shadowRoot.querySelectorAll('lightning-layout-item');
        expect(contactElements.length).toBe(1); // Only John Doe should be displayed
    });

    it('shows a no contacts found message to the user when none match the search', async () => {

        GetContactsNetworkRequest.fetchContacts.mockReturnValueOnce(mockContactData)

        const element = createElement('c-more-testable-component', { is: MoreTestableComponent });
        document.body.appendChild(element);

        await flushPromises();
        
        const inputElement = element.shadowRoot.querySelector('lightning-input');
        inputElement.value = 'Michael';
        inputElement.dispatchEvent(new CustomEvent('change'));

        await flushPromises();

        const noContactsMessageElement = element.shadowRoot.querySelector('div[data-id="noContactsMessage"]');
        expect(noContactsMessageElement).toBeTruthy(); // Only John Doe should be displayed
    });

    it('displays an error message when one is encountered', async () => {

        const ERROR_MESSAGE = 'Error fetching contacts';

        GetContactsNetworkRequest.fetchContacts.mockRejectedValue(ERROR_MESSAGE);

        const element = createElement('c-more-testable-component', { is: MoreTestableComponent });
        document.body.appendChild(element);

        await flushPromises();

        return Promise.resolve().then(() => {
            const errorElement = element.shadowRoot.querySelector('div[data-id="errorMessage"]');
            expect(errorElement.textContent).toBe(ERROR_MESSAGE);
        });
    });

    // Add more tests for error handling, no data scenarios, etc.
});