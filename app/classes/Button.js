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

  onCreate() {
    this.canvas.style.backgroundImage = JSON.parse(
      localStorage.getItem("color")
    );
  }

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

  scrollPageToTop() {
    window.scroll(0, 0);
  }

  addEventListener() {
    this.element.addEventListener("click", this.onClick.bind(this));
  }

  addClickScrollEventListener() {
    this.buttonTitle.addEventListener("click", this.scrollPageToTop.bind(this));
  }

  saveColor(color) {
    localStorage.setItem("color", JSON.stringify(color));
  }

  // removeEventListeners () {
  //   this.element.removeEventListener('click', this.onMouseLeaveEvent)
  // }
}
