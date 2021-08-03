import Page from "../classes/Page.js";
import VerticalSlider from "../components/VerticalSlider.js";

export default class Home extends Page {
  constructor() {
    super({
      id: "home",
      element: ".home",
      elements: {
        navigation: document.querySelector(".navigation"),
        up: "#up",
        title: ".home__title",
        wrapper: ".home__wrapper",
        button: ".home__link",
        canvas: ".webgl"
      }
    });

    this.height = window.innerHeight;
    this.container = document.querySelector(".home__intro");

    this.setHomeContainerHeight();

    this.marquee();

    this.resize();

    console.log("Welcome! 🦉");
  }

  /**
   * Set home container (".home__intro") to the window height
   */
  setHomeContainerHeight() {
    this.container.style.height = `${this.height}px`;
  }

  /**
   * Initialize the vertical sliders
   */
  marquee() {
    this.slider = new VerticalSlider({
      spans: document.querySelectorAll(".spans"),
      title: document.querySelector(".home__marquee__title")
    });

    this.slider.slider();
  }

  /**
   * Resize event listener and actions
   */
  resize() {
    window.addEventListener("resize", () => {
      this.height = window.innerHeight;
      this.setHomeContainerHeight();
    });
  }
}
