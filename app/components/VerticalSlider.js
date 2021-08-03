import gsap from "gsap";

export default class VerticalSlider {
  constructor({ spans, title }) {
    this.spans = [...spans];
    this.title = title;
  }

  /**
   * GSAP vertical slider function
   */
  slider() {
    gsap
      .to(this.spans, {
        xPercent: -100,
        repeat: -1,
        duration: 10,
        ease: "linear"
      })
      .totalProgress(0.5);

    gsap.set(this.title, { xPercent: 0 });
  }
}
