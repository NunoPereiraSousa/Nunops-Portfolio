import { GRADIENT_ONE, GRADIENT_TWO, GRADIENT_THREE } from "../utils/color.js";
import GSAP from "gsap";

export default class Button {
  constructor({ buttonTitle, element }) {
    this.buttonTitle = document.querySelector(buttonTitle);
    this.element = document.querySelector(element);

    this.canvas = document.querySelector(".webgl");

    this.onCreate();
    this.addEventListener();
    this.addClickScrollEventListener();
  }

  /**
   * When the class initializes sets the website background to the one saved on LS
   */
  onCreate() {
    this.canvas.style.backgroundImage = JSON.parse(
      localStorage.getItem("color")
    );
  }

  /**
   * On click logic
   */
  onClick() {
    let color = this.canvas.style.backgroundImage;

    if (color === GRADIENT_ONE) {
      GSAP.to(this.canvas, {
        backgroundImage: GRADIENT_TWO
      });

      this.saveColor(GRADIENT_TWO);
    } else if (color === GRADIENT_TWO) {
      GSAP.to(this.canvas, {
        backgroundImage: GRADIENT_THREE
      });

      this.saveColor(GRADIENT_THREE);
    } else {
      GSAP.to(this.canvas, {
        backgroundImage: GRADIENT_ONE
      });

      this.saveColor(GRADIENT_ONE);
    }
  }

  /**
   * Scroll to the top
   */
  scrollPageToTop() {
    window.scroll(0, 0);
  }

  /**
   * Add event listeners
   */
  addEventListener() {
    this.element.addEventListener("click", this.onClick.bind(this));
  }

  /**
   * Add scroll event listeners
   */
  addClickScrollEventListener() {
    this.buttonTitle.addEventListener("click", this.scrollPageToTop.bind(this));
  }

  /**
   * Save the current background color on the LS
   * @param {String} color CSS background-image property
   */
  saveColor(color) {
    localStorage.setItem("color", JSON.stringify(color));
  }
}
