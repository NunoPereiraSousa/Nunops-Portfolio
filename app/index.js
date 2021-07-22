import Home from "./pages/home.js";
import Preloader from "./components/Preloader";

class App {
  constructor() {
    this.pages = {};

    this.createContent();
    this.createPreloader();

    this.createPages();
  }

  /**
   * Set up the page content and template
   */
  createContent() {
    this.content = document.querySelector(".content");

    this.template = this.content.getAttribute("data-template");
  }

  /**
   * Function that instantiates the Preloader
   * Fires the preloader function once it's completed
   */
  createPreloader() {
    this.preloader = new Preloader();
  }

  /**
   * Creates the pages. Instantiates its Classes
   */
  createPages() {
    this.pages = {
      home: new Home()
    };

    this.page = this.pages[this.template];

    this.page.create();
  }
}

new App();
