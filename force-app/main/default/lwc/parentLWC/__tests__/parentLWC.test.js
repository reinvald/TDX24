import { createElement } from "@lwc/engine-dom";
import ParentLWC from "c/parentLWC";

async function flushPromises() {
  return Promise.resolve();
}

//All tests should mock the child component
jest.mock("c/childLWC");

describe("c-parent-lwc", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }

    jest.clearAllMocks();
  });

  it("Validate buttonclick Event from child displays Howdy Partner Text", async () => {
    // Arrange
    const element = createElement("c-parent-lwc", {
      is: ParentLWC
    });

    // Act
    document.body.appendChild(element);

    //Get the child component
    const childComponent = element.shadowRoot.querySelector("c-child-l-w-c");

    //Load mocked hello event data
    const mockHelloEventData = require("./data/mockHelloEvent.json");

    //Create mock event using test data
    const mockedEvent = new CustomEvent("helloevent", mockHelloEventData);

    //Simulate firing the event from the child component
    childComponent.dispatchEvent(mockedEvent);

    //Flush any promises before checking UI state
    await flushPromises();

    //Get the Hello Text Message
    const helloTextMessage = element.shadowRoot.querySelector(
      "[data-label=HelloText]"
    );

    //Validate that Howdy Partner text is displayed
    expect(helloTextMessage.innerHTML).toBe("Howdy Partner");
  });
});
