import each from "lodash/each";
import GSAP from "gsap";
import { split } from "../utils/text";
import imagesLoaded from "imagesloaded";
import FontFaceObserver from "fontfaceobserver";

export default class Preloader {
  constructor() {
    // super({
    //   element: ".preloader",
    //   elements: {
    //     title: ".preloader__number__label",
    //     label: ".preloader__title",
    //     graphics: document.querySelectorAll(".stars"),
    //     images: document.querySelectorAll("img")
    //   }
    // });

    this.element = document.querySelector(".preloader");
    this.elements = {
      title: document.querySelector(".preloader__number__label"),
      label: document.querySelector(".preloader__title"),
      graphics: document.querySelectorAll(".stars"),
      images: document.querySelectorAll("img"),
      curtain: document.querySelector(".preloader__curtain")
    };

    console.log(this.fontSupreme, this.fontBigilla);

    console.log(this.element, this.elements);

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

    this.length = 0;
    this.imageCount;
    this.counter = 0;

    this.allSiteImages = document.querySelectorAll("img");

    // this.onCounterLoaded();
    this.preloadImages();
  }

  preloadImages() {
    this.imagesLoad = imagesLoaded(this.allSiteImages);
    this.imageCount = this.imagesLoad.images.length;

    // this.updateProcess(0);

    this.imagesLoad.on("progress", progress => {
      this.length++;
      // this.updateProcess(this.length);
    });

    this.imagesLoad.on("done", done => {
      setTimeout(() => {
        console.log(done);
        this.updateProcess();
      }, 1000);
    });
  }

  updateProcess() {
    GSAP.to(this.elements.title, {
      innerText: "100%",
      snap: {
        innerText: 1
      },
      ease: "ease.out",
      duration: 3
    });
    GSAP.to(this.elements.curtain, {
      width: "100%",
      ease: "ease.out",
      duration: 2,
      onComplete: () => {
        setTimeout(() => {
          this.onLoaded();
        }, 500);
      }
    });
  }

  // updateProcess(loadedImageCount) {
  //   GSAP.to(this.elements.title, {
  //     onUpdate: () => {
  //       this.elements.title.innerHTML += `${Math.round(
  //         (loadedImageCount / this.imageCount) * 100
  //       )}%`;
  //     },
  //     ease: "ease.out",
  //     delay: 1
  //   });
  // }

  onAssetLoadedShowCounter() {
    this.length++;

    const percent = this.length / this.elements.images.length;

    this.elements.curtain.style.width = `${Math.round(percent * 100)}%`;

    console.log(percent);

    return percent;
  }

  /**
   * Loading animation increment
   */
  onCounterLoaded() {
    let percent = this.length;

    // this.beforeLoaded();

    setTimeout(() => {
      this.onLoaded();
    }, 50000); // 2000
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
        duration: 1,
        stagger: 0.12,
        ease: "expo.in"
      });

      each(this.elements.graphics, svg => {
        this.animateOut.to(
          svg,
          {
            autoAlpha: 0,
            filter: "blur(10px)",
            duration: 0.8,
            stagger: 0.05,
            ease: "expo.out"
          },
          "-=0.75"
        );
      });

      this.animateOut.to(this.elements.label, {
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

  destroy() {
    this.element.parentNode.removeChild(this.element);
  }
}
