import About from "./pages/about.js";
import Home from "./pages/home.js";
import Project from "./pages/project.js";
import gsap from "gsap";

class App {
  constructor() {
    this.pages = {};

    this.createContent();

    this.createPages();
  }

  /**
   * Set up the page content and template
   */
  createContent() {
    // get the current ".content" element
    this.content = document.querySelector(".content");

    // get the current template based on the page I am in
    this.template = this.content.getAttribute("data-template");
  }

  /**
   * Creates the pages. Instantiates its Classes
   */
  createPages() {
    this.pages = {
      about: new About(),
      home: new Home(),
      project: new Project()
    };

    this.page = this.pages[this.template];

    this.page.create();

    console.log(this.page);

    // this.page.create();
  }
}

new App();
