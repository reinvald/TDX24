import { LightningElement } from "lwc";

export default class ParentLWC extends LightningElement {
  text = "";

  handleChildEvent(event) {
    this.text = event.detail.message;
  }
}
