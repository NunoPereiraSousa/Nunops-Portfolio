import Button from "../classes/Button.js";
import Canvas from "../classes/Canvas.js";

import gsap from "gsap";
import Page from "../classes/Page.js";
import VerticalSlider from "../components/VerticalSlider.js";
import HeroCanvas from "../classes/HeroCanvas.js";

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

    this.resize();
  }

  create() {
    super.create();

    this.myselfCarousel();
    this.worksCarousel();
    this.awardsCarousel();
    this.servicesCarousel();
  }

  myselfCarousel() {
    this.slider = new VerticalSlider({
      spans: document.querySelectorAll(".spans"),
      title: document.querySelector(".home__myself__title")
    });

    this.slider.slider();
  }

  worksCarousel() {
    this.slider = new VerticalSlider({
      spans: document.querySelectorAll(".work__spans"),
      title: document.querySelector(".home__works__title")
    });

    this.slider.slider();
  }

  awardsCarousel() {
    this.slider = new VerticalSlider({
      spans: document.querySelectorAll(".awards__spans"),
      title: document.querySelector(".home__awards__title")
    });

    this.slider.slider();
  }

  servicesCarousel() {
    this.slider = new VerticalSlider({
      spans: document.querySelectorAll(".services__spans"),
      title: document.querySelector(".home__services__title")
    });

    this.slider.slider();
  }

  resize() {
    window.addEventListener("resize", this.slider.resize());
  }
}
