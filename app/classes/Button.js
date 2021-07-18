// import Component from "classes/Component";
import {
  COLOR_PAMPAS,
  COLOR_COD_GREY,
  COLOR_RUSSET,
  COLOR_WILLOW_GROVE,
  COLOR_NEVADA
} from "../utils/color.js";
import GSAP from "gsap";

export default class Button {
  constructor({ element }) {
    this.element = element;

    console.log(this.element);

    this.addEventListener();
  }

  onClick() {
    let color = document.body.style.backgroundColor;

    if (color === "rgb(26, 26, 26)") {
      GSAP.to("body", {
        backgroundColor: COLOR_RUSSET
      });

      this.saveColor(COLOR_RUSSET);
    } else if (color === "rgb(125, 89, 90)") {
      GSAP.to("body", {
        backgroundColor: COLOR_WILLOW_GROVE
      });

      this.saveColor(COLOR_WILLOW_GROVE);
    } else if (color === "rgb(101, 111, 98)") {
      GSAP.to("body", {
        backgroundColor: COLOR_NEVADA
      });

      this.saveColor(COLOR_NEVADA);
    } else if (color === "rgb(93, 115, 126)") {
      GSAP.to("body", {
        backgroundColor: COLOR_COD_GREY
      });

      this.saveColor(COLOR_COD_GREY);
    } else {
      GSAP.to("body", {
        backgroundColor: COLOR_RUSSET
      });

      this.saveColor(COLOR_RUSSET);
    }
  }

  addEventListener() {
    this.onMouseClick = this.onClick.bind(this);

    this.element.addEventListener("click", this.onMouseClick);
  }

  saveColor(color) {
    localStorage.setItem("color", JSON.stringify(color));
  }

  // removeEventListeners () {
  //   this.element.removeEventListener('click', this.onMouseLeaveEvent)
  // }
}
