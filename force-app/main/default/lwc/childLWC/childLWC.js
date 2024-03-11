import { LightningElement } from "lwc";
import sayHello from "@salesforce/apex/DemoApexClass.sayHello";

export default class ChildLWC extends LightningElement {
  handleSayHelloButtonClick() {
    sayHello().then((result) => {
      const text = result.messageText;
      const clickEvent = new CustomEvent("helloevent", {
        detail: { message: text }
      });
      this.dispatchEvent(clickEvent);
    });
  }

  methodWithNoTests() {
    const a = 1;
    const b = 2;
    const c = a + b;
  }
}
