import gsap from "gsap";
import Canvas from "./Canvas.js";
import each from "lodash/each";
import Button from "../classes/Button.js";
import HeroCanvas from "../classes/HeroCanvas.js";

export default class Page {
  constructor({ id, element, elements }) {
    this.id = id;

    this.selector = element;
    this.selectorChildren = {
      ...elements,
      animationsTitles: "[data-animation='title']",
      animationsParagraphs: "[data-animation='paragraph']",
      animationsLines: "[data-animation='line']",
      animationsSliders: "[data-animation='slider']"
    };
  }

  create() {
    this.element = document.querySelector(this.selector);
    this.elements = {};

    new Canvas();
    new HeroCanvas();

    new Button({
      buttonTitle: this.selectorChildren.up,
      element: this.selectorChildren.button
    });

    let currentColor = JSON.parse(localStorage.getItem("color"));

    gsap.to(this.selectorChildren.canvas, {
      backgroundImage: currentColor
    });

    each(this.selectorChildren, (entry, key) => {
      if (
        entry instanceof window.HTMLElement ||
        entry instanceof window.NodeList ||
        Array.isArray(entry)
      ) {
        this.elements[key] = entry;
      } else {
        this.elements[key] = document.querySelectorAll(entry);

        if (this.elements[key].length === 0) {
          this.elements[key] = null;
        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(entry);
        }
      }
    });
  }
}
