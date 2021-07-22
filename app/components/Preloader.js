import each from "lodash/each";
import GSAP from "gsap";
import { split } from "../utils/text";
import imagesLoaded from "imagesloaded";
import FontFaceObserver from "fontfaceobserver";

export default class Preloader {
  constructor() {
    this.element = document.querySelector(".preloader");
    this.elements = {
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

  loadFonts() {
    this.supreme = new FontFaceObserver("Supreme");
    this.bigilla = new FontFaceObserver("Bigilla");

    Promise.all([this.supreme.load(), this.bigilla.load()]).then(font => {
      console.log("Fonts loaded! Ready to go 🚀");
      this.afterFontsAreLoaded();
    });
  }

  preloadImages() {
    this.imagesLoad = imagesLoaded(this.allSiteImages);

    this.imagesLoad.on("done", () => {
      setTimeout(() => {
        this.updateProcess();
      }, 750);
    });
  }

  updateProcess() {
    GSAP.to(this.elements.title, {
      innerText: "100%",
      snap: {
        innerText: 1
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

      this.animateOut.to(this.elements.title, {
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

  afterFontsAreLoaded() {
    this.animateIn = GSAP.timeline({
      delay: 1
    });

    this.animateIn.to([this.elements.title, this.elements.label], {
      autoAlpha: 1,
      duration: 1,
      ease: "expo.out"
    });

    this.animateIn.call(_ => {
      this.preloadImages();
    });
  }

  destroy() {
    this.element.parentNode.removeChild(this.element);
  }
}
