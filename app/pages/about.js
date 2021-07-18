import Page from "../classes/Page.js";

export default class About extends Page {
  constructor() {
    super({
      id: "about",
      element: ".about",
      elements: {
        navigation: document.querySelector(".navigation"),
        title: ".about__intro__title",
        wrapper: ".about__wrapper",
        button: ".home__link"
      }
    });
  }

  create() {
    super.create();

    // this.link = new Button({
    //   element: this.elements.button
    // });
  }
}
