import { createElement } from 'lwc';
import TestableComponent from 'c/testableComponent';

// import Apex method to be mocked
import getContacts from '@salesforce/apex/ContactController.getContacts';

async function flushPromises() {
    return Promise.resolve();
}

jest.mock(
    '@salesforce/apex/ContactController.getContacts',
    () => {
      const {
        createApexTestWireAdapter
      } = require('@salesforce/sfdx-lwc-jest');
      return {
        default: createApexTestWireAdapter(jest.fn())
      };
    },
    { virtual: true }
  );

describe('c-testable-component', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.clearAllMocks();
    });

    it('renders contacts when data is returned', async () => {
        const CONTACTS_MOCK = [
            { Id: '1', Name: 'John Doe', Email: 'john@example.com', Phone: '1234567890' },
            { Id: '2', Name: 'Jane Smith', Email: 'jane@example.com', Phone: '9876543210' }
        ];

        const element = createElement('c-testable-component', { is: TestableComponent });
        document.body.appendChild(element);

        getContacts.emit(CONTACTS_MOCK)

        await flushPromises();

        return Promise.resolve().then(() => {
            const contactElements = element.shadowRoot.querySelectorAll('lightning-layout-item');
            expect(contactElements.length).toBe(CONTACTS_MOCK.length);
        });
    });

    it('updates filtered contacts when search input changes', async () => {
        const CONTACTS_MOCK = [
            { Id: '1', Name: 'John Doe', Email: 'john@example.com', Phone: '1234567890' },
            { Id: '2', Name: 'Jane Smith', Email: 'jane@example.com', Phone: '9876543210' }
        ];

        const element = createElement('c-testable-component', { is: TestableComponent });
        document.body.appendChild(element);

        getContacts.emit(CONTACTS_MOCK);
        
        const inputElement = element.shadowRoot.querySelector('lightning-input');
        inputElement.value = 'John';
        inputElement.dispatchEvent(new CustomEvent('change'));

        await flushPromises();

        const contactElements = element.shadowRoot.querySelectorAll('lightning-layout-item');
        expect(contactElements.length).toBe(1); // Only John Doe should be displayed
    });

    // Add more tests for error handling, no data scenarios, etc.
});
