import gsap from "gsap";

export default class VerticalSlider {
  constructor({ spans, title }) {
    this.spans = [...spans];
    this.title = title;

    this.containerWidth = title.getBoundingClientRect().width;
    this.titleWidth = [...spans][0].getBoundingClientRect().width;

    this.initial_offset =
      ((2 * this.titleWidth) / this.containerWidth) * 100 * -1;
  }

  slider() {
    this.containerWidth = this.title.getBoundingClientRect().width;
    this.titleWidth = this.spans[0].getBoundingClientRect().width;
    this.initial_offset =
      ((2 * this.titleWidth) / this.containerWidth) * 100 * -1;

    gsap.set(this.title, {
      xPercent: `${this.initial_offset}`
    });

    this.animate = gsap.timeline();

    this.animate.to(this.title, {
      xPercent: 0,
      duration: 10,
      repeat: -1,
      overwrite: true,
      ease: "none"
    });
  }

  resize() {
    window.addEventListener("resize", this.onSliderResize.bind(this));
  }

  onSliderResize() {
    this.containerWidth = this.title.getBoundingClientRect().width;
    this.titleWidth = this.spans[0].getBoundingClientRect().width;
    this.initial_offset =
      ((2 * this.titleWidth) / this.containerWidth) * 100 * -1;
  }
}
