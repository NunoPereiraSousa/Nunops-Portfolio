import Home from "./pages/home.js";
import Preloader from "./components/Preloader.js";

class App {
  constructor() {
    this.pages = {};

    this.createContent();
    this.createPreloader();

    this.createPages();

    this.onResize();
    this.addResizeEventListener();
    this.update();
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

  update() {
    if (this.page && this.page.update) {
      this.page.update();
    }

    this.frame = window.requestAnimationFrame(this.update.bind(this));
  }

  onResize() {
    if (this.page && this.page.onResize) {
      this.page.onResize();
    }
  }

  addResizeEventListener() {
    window.addEventListener("resize", this.onResize.bind(this));
  }
}

new App();
