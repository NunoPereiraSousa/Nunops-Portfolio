import gsap from "gsap";
import Canvas from "./Canvas.js";
import each from "lodash/each";
import Button from "../classes/Button.js";
import HeroCanvas from "../classes/HeroCanvas.js";
import Prefix from "prefix";
import NormalizeWheel from "normalize-wheel";

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

    this.onMouseWheelEvent = this.onMouseWheel.bind(this);

    this.transformPrefix = Prefix("transform");

    this.addEventListeners();
    this.addClickEvent();
  }

  /**
   * On create each page component...
   */
  create() {
    this.element = document.querySelector(this.selector);
    this.elements = {};

    this.scroll = {
      // first position
      current: 0,
      // where the mouse goes to
      target: 0,
      // last position
      last: 0,
      limit: 0
    };

    new HeroCanvas();

    new Canvas();

    new Button({
      buttonTitle: this.selectorChildren.up,
      element: this.selectorChildren.button,
      svg: document.querySelector(".footer__name")
    });

    let currentColor =
      JSON.parse(localStorage.getItem("color")) === null
        ? "linear-gradient(315deg, rgb(68, 27, 38) 0%, rgb(22, 39, 61) 54%)"
        : currentColor;

    gsap.to(this.selectorChildren.canvas, {
      backgroundImage: currentColor
    });

    // checks if each element inside the constructor is what... array, single type, ...
    // and then gives it: document.querySelector(entry) / document.querySelectorAll(entry) / ...
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

  onResize() {
    if (this.elements.wrapper) {
      this.scroll.limit =
        this.elements.wrapper.clientHeight - window.innerHeight;
    }
  }

  onMouseWheel(event) {
    const { pixelY } = NormalizeWheel(event);

    this.scroll.target += pixelY;
  }

  update() {
    this.scroll.target = gsap.utils.clamp(
      0,
      this.scroll.limit,
      this.scroll.target
    );

    this.scroll.current = gsap.utils.interpolate(
      this.scroll.current,
      this.scroll.target,
      0.05
    );

    if (this.scroll.current < 0.01) {
      this.scroll.current = 0;
    }

    if (this.elements.wrapper) {
      this.elements.wrapper.style[
        this.transformPrefix
      ] = `translateY(-${this.scroll.current}px)`;
    }
  }

  scrollPageToTop() {
    this.scroll = {
      // first position
      current: 0,
      // where the mouse goes to
      target: 0,
      // last position
      last: 0,
      limit: 0
    };

    this.elements.wrapper.style[this.transformPrefix] = "0px";
  }

  addClickEvent() {
    window.addEventListener("click", this.scrollPageToTop.bind(this));
  }

  addEventListeners() {
    window.addEventListener("mousewheel", this.onMouseWheelEvent);
  }

  removeEventListeners() {
    window.removeEventListener("mousewheel", this.onMouseWheelEvent);
  }
}
