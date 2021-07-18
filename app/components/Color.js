// import Component from "classes/Component";
import gsap from "gsap";

export default class Color {
  constructor({ template }) {
    super({
      element: ".about__link"
    });

    this.addEventListener();
  }

  addEventListener(template) {
    this.element.addEventListener("click", this.changeTheme());
  }

  changeTheme() {}
}
