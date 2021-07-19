import Page from "../classes/Page.js";

export class Navigation extends Page {
  constructor({ element, elements }) {
    super({ element, elements });

    console.log(this.element, this.elements);
  }

  create() {
    super.create();
  }
}
