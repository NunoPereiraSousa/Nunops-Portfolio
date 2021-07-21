import Canvas from "./classes/Canvas.js";
import Home from "./pages/home.js";
import Preloader from "./components/Preloader";
import gsap from "gsap";
import barba from "@barba/core";

class App {
  constructor() {
    this.pages = {};

    this.createContent();
    // this.createPreloader();

    this.createPages();

    this.pageTransitions();
  }

  /**
   * Set up the page content and template
   */
  createContent() {
    // get the current ".content" element
    this.content = document.querySelector(".content");

    // get the current template based on the page I am in
    this.template = this.content.getAttribute("data-template");
  }

  /**
   * Function that instantiates the Preloader
   * Fires the preloader function once it's completed
   */
  createPreloader() {
    this.preloader = new Preloader();

    // this.preloader.once("completed", this.onPreloaded.bind(this));
  }

  /**
   * Creates the pages. Instantiates its Classes
   */
  createPages() {
    this.pages = {
      // about: new About(),
      home: new Home()
      // project: new Project()
    };

    this.page = this.pages[this.template];

    this.page.create();

    // this.page.create();
  }

  pageTransitions() {
    this.animationRunning = false;
    let that = this;
    barba.init({
      transitions: [
        {
          name: "from-home-transition",
          from: {
            namespace: ["home"]
          },
          leave(data) {
            that.animationRunning = true;
            return (
              gsap
                .timeline()
                // .to(".curtain", {
                //   duration: 0.3,
                //   y: 0
                // })
                .to(data.current.container, {
                  opacity: 0,
                  duration: 0.5,
                  ease: "expo.out"
                })
            );
          },
          enter(data) {
            return gsap.timeline().from(data.next.container, {
              opacity: 0,
              ease: "expo.out",
              onComplete: () => {
                window.scroll(0, 0);
                document.querySelector(".webgl").style.visibility = "hidden";
                that.animationRunning = false;
              }
            });
            // .to(".curtain", {
            //   duration: 0.3,
            //   y: "-100%"
            // });
          }
        },
        {
          name: "from-inside-project-transition",
          from: {
            namespace: ["project"]
          },
          leave(data) {
            // that.asscroll.disable();
            return gsap
              .timeline()
              .to(".curtain", {
                duration: 0.3,
                y: 0
              })
              .to(data.current.container, {
                opacity: 0,
                ease: "expo.out"
              });
          },
          enter(data) {
            // that.asscroll = new ASScroll({
            //   disableRaf: true,
            //   containerElement: data.next.container.querySelector(
            //     "[asscroll-container]"
            //   )
            // });
            // that.asscroll.enable({
            //   horizontalScroll: true,
            //   newScrollElements:
            //     data.next.container.querySelector(".scroll-wrap")
            // });
            // // cleeaning old arrays
            // that.imageStore.forEach(m => {
            //   that.scene.remove(m.mesh);
            // });
            // that.imageStore = [];
            // that.materials = [];
            // that.addObjects();
            // that.resize();
            // that.addClickEvents();
            // that.container.style.visibility = "visible";
            return gsap
              .timeline()
              .to(".curtain", {
                duration: 0.3,
                y: "-100%"
              })
              .from(data.next.container, {
                opacity: 0,
                duration: 1,
                ease: "expo.out",
                onComplete: () => {
                  that.createContent();
                  that.createPreloader();

                  // that.preloader.preloadImages()
                }
              });
          }
        }
      ]
    });
  }
}

new App();
