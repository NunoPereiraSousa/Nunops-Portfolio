import GSAP from "gsap";
import { split } from "../utils/text.js";
import imagesLoaded from "imagesloaded";
import FontFaceObserver from "fontfaceobserver";

export default class Preloader {
  constructor() {
    this.element = document.querySelector(".preloader");
    this.elements = {
      year: document.querySelector(".preloader__number__year"),
      title: document.querySelector(".preloader__number__label"),
      label: document.querySelector(".preloader__title"),
      graphics: document.querySelectorAll(".preloader__graphics__box"),
      images: document.querySelectorAll("img")
    };

    split({
      element: this.elements.title,
      append: true
    });

    split({
      element: this.elements.title,
      append: true
    });

    this.elements.titleSpans =
      this.elements.title.querySelectorAll("span span");

    this.counter = 0;

    this.allSiteImages = document.querySelectorAll("img");

    this.loadFonts();
  }

  /**
   * Load the website fonts
   */
  loadFonts() {
    this.supreme = new FontFaceObserver("Supreme");
    this.bigilla = new FontFaceObserver("Bigilla");

    Promise.all([this.supreme.load(), this.bigilla.load()]).then(font => {
      console.log("Fonts loaded! Ready to go 🚀");
      this.afterFontsAreLoaded();
    });
  }

  /**
   * Preload all the website images
   */
  preloadImages() {
    this.imagesLoad = imagesLoaded(this.allSiteImages);

    // when all the images are loaded
    this.imagesLoad.on("done", () => {
      console.log("Images loaded! Ready to go 🚀");
      setTimeout(() => {
        // the counter begins
        this.updateProcess();
      }, 750);
    });
  }

  /**
   * Counter (numbers) upgrade
   */
  updateProcess() {
    GSAP.to(this.elements.title, {
      innerText: "2000",
      snap: {
        innerText: 50
      },
      ease: "ease.out",
      duration: 3,
      onComplete: () => {
        setTimeout(() => {
          this.onLoaded();
        }, 500);
      }
    });
  }

  /**
   * Preloader animations
   * @returns a Promise
   */
  onLoaded() {
    window.scroll(0, 0);

    return new Promise(resolve => {
      this.animateOut = GSAP.timeline({
        delay: 1.25
      });

      this.animateOut.to([this.elements.year, this.elements.title], {
        y: "100%",
        duration: 0.9,
        stagger: 0.12,
        ease: "expo.in"
      });

      this.animateOut.to([this.elements.label, this.elements.graphics], {
        autoAlpha: 0,
        filter: "blur(10px)",
        duration: 0.8,
        ease: "expo.out"
      });

      this.animateOut.to(
        this.element,
        {
          scaleY: 0,
          transformOrigin: "0% 0%",
          ease: "expo.out",
          duration: 1.5,
          delay: 1
        },
        "-=0.9"
      );

      this.animateOut.call(_ => {
        this.destroy();
      });
    });
  }

  /**
   * After fonts are loaded, the preloader content shows up
   */
  afterFontsAreLoaded() {
    this.animateIn = GSAP.timeline({
      delay: 1
    });

    this.animateIn.to(
      [this.elements.year, this.elements.title, this.elements.label],
      {
        autoAlpha: 1,
        duration: 1,
        ease: "expo.out"
      }
    );

    this.animateIn.call(_ => {
      this.preloadImages();
    });
  }

  /**
   * Destroy the preloader after completed - removes it from the DOM
   */
  destroy() {
    this.element.parentNode.removeChild(this.element);
  }
}
