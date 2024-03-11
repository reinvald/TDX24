import { createElement } from "@lwc/engine-dom";
import ChildLWC from "c/childLWC";
//Import Apex class
import sayHello from "@salesforce/apex/DemoApexClass.sayHello";

// Mock Apex method call
jest.mock(
  "@salesforce/apex/DemoApexClass.sayHello",
  () => {
    return {
      default: jest.fn()
    };
  },
  { virtual: true }
);

describe("c-child-lwc", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("Validate event fired on button click", () => {
    //Mock sayHello to return test data instead of calling actual Apex class
    const mockSayHelloData = require("./data/mockSayHelloData.json");
    sayHello.mockResolvedValue(mockSayHelloData);

    // Arrange
    const element = createElement("c-child-lwc", {
      is: ChildLWC
    });

    // Act
    document.body.appendChild(element);

    // Add event listener to capture event fired to parent component
    const buttonClickedEventHandler = jest.fn();
    element.addEventListener("helloevent", buttonClickedEventHandler);

    //Simulate button click
    const sayHelloButton = element.shadowRoot.querySelector(
      "[data-label=HelloButton]"
    );
    sayHelloButton.dispatchEvent(new CustomEvent("click"));

    //Validate that event was fired and the content matches the content of mockSayHelloData.json
    return Promise.resolve().then(() => {
      expect(buttonClickedEventHandler).toHaveBeenCalled();
      expect(buttonClickedEventHandler.mock.calls[0][0].detail.message).toBe(
        "Howdy Partner"
      );
    });
  });
});
