import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import fragment from "../shaders/fragment.glsl";
import vertex from "../shaders/vertex.glsl";
import gsap from "gsap";
import mockup from "../../img/MelchiCover.jpg";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

export default class Canvas {
  constructor() {
    this.canvas = document.querySelector(".webgl");

    this.options = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    this.time = 0;

    this.body = document.querySelector("body");
    this.scrollable = document.getElementById("scrollable");
    this.mainWrapper = document.getElementById("main-wrapper");

    this.currentScroll = 0;
    this.mockup = mockup;
    this.materials = [];

    this.scroll = {
      current: 0,
      target: 0,
      last: 0,
      limit: 0,
      ease: this.options.width < 1200 ? 0.08 : 0.05
    };

    this.addCamera();

    this.addRenderer();

    this.allMeshes = [];

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.onMouseMovement();

    this.resize();
    this.setupResize();

    this.initSmoothScroll();
    this.composerPass();
    this.render();
  }

  /**
   * Handle and watch media query and its own actions/ logic
   * Hide/ show webgl in mobile/ desktop devices
   */
  handleMediaQuery() {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    if (!mediaQuery.matches) {
      this.mergeHtmlWebGl();
    }
  }

  siLerp(start, end, time) {
    return start * (1 - time) + end * time;
  }

  handleScrollContainersStyles() {
    this.mainWrapper.style.width = "100%";
    this.mainWrapper.style.height = "100vh";
    this.mainWrapper.style.top = "0";
    this.mainWrapper.style.left = "0";
    this.mainWrapper.style.position = "fixed";

    this.scrollable.style.width = "100%";
    this.scrollable.style.top = "0";
    this.scrollable.style.left = "0";
    this.scrollable.style.position = "absolute";
    this.scrollable.style.willChange = "transform";
  }

  handleDocumentBodySettings() {
    if (this.scrollable) {
      const scrollableBounds = this.scrollable.getBoundingClientRect();
      const documentHeight = `${
        window.innerWidth < 1500
          ? scrollableBounds.height
          : scrollableBounds.height + 200
      }px`;

      this.body.style.width = "100%";
      this.body.style.height = "100vh";
      this.body.style.overscrollBehavior = "none";

      this.body.style.height = documentHeight;
    }
  }

  handleWindowResize() {
    window.addEventListener(
      "resize",
      this.handleDocumentBodySettings.bind(this)
    );
  }

  siSmoothScroller() {
    this.scroll.target = window.scrollY;

    if (this.scrollable) {
      this.scroll.limit = this.scrollable.clientHeight - window.innerHeight;
    }

    this.scroll.target = gsap.utils.clamp(
      0,
      this.scroll.limit,
      this.scroll.target
    );
    this.scroll.current = this.siLerp(
      this.scroll.current,
      this.scroll.target,
      this.scroll.ease
    );

    if (this.scroll.current < 0.01) {
      this.scroll.current = 0;
    }

    if (this.scrollable) {
      this.scrollable.style.transform = `translateY(${-this.scroll.current}px)`;
    }
  }

  initSmoothScroll() {
    this.handleScrollContainersStyles();
    this.handleDocumentBodySettings();
    this.handleWindowResize();
    this.siSmoothScroller();
  }

  /**
   * Add scene controls - not being used
   */
  addControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  /**
   * Add renderer to the scene
   */
  addRenderer() {
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
      alpha: true
    });
    this.renderer.setSize(this.options.width, this.options.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2);
  }

  /**
   * Add camera to the scene
   */
  addCamera() {
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.options.width / this.options.height,
      1.0,
      2000
    );
    this.camera.position.z = 50;
  }

  /**
   * Create a shader material
   *  Add uniforms to the material so those can be manipulated with webgl
   * Get all the website images
   *  Load their textures
   *  Create a geometry and material for them
   * Mouse hover/ leave interactions
   * Set meshes position and scaling according to the images position in the website
   */
  mergeHtmlWebGl() {
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        uImage: { value: 0 },
        hover: { value: new THREE.Vector2(0.5, 0.5) },
        hoverState: {
          value: 0
        }
      },
      fragmentShader: fragment,
      vertexShader: vertex
    });

    const htmlImages = [...document.querySelectorAll("img")];

    htmlImages.forEach(image => {
      let texture = new THREE.Texture(image);
      texture.needsUpdate = true;
      texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
      let geometry = new THREE.PlaneBufferGeometry(1, 1, 10, 10);
      let material = this.material.clone();

      this.materials.push(material);
      material.uniforms.uImage.value = texture;

      image.addEventListener("mouseenter", () => {
        gsap.to(material.uniforms.hoverState, {
          duration: 1,
          value: 1,
          ease: "expo.out"
        });
      });

      image.addEventListener("mouseout", () => {
        gsap.to(material.uniforms.hoverState, {
          duration: 1,
          value: 0,
          ease: "expo.out"
        });
      });

      let mesh = new THREE.Mesh(geometry, material);
      mesh.userData.image = image;

      this.allMeshes.push(mesh);

      this.setScalePosition(mesh);
      this.scene.add(mesh);
    });
  }

  /**
   * Set scale property for each mesh that exists inside three js scene
   * @param {Object} mesh each object mesh
   */
  setScale(mesh) {
    let image = mesh.userData.image;
    let bounds = image.getBoundingClientRect();

    mesh.scale.set(bounds.width, bounds.height, 1);
  }

  /**
   * Set the correct mesh position according to each image position in the website
   * @param {Object} mesh each object mesh
   */
  setPosition(mesh) {
    let image = mesh.userData.image;
    let bounds = image.getBoundingClientRect();

    mesh.position.set(
      bounds.left - this.options.width / 2 + bounds.width / 2,
      -bounds.top - bounds.height / 2 + this.options.height / 2
    );
  }

  /**
   * Scale + position calls
   * @param {Object} mesh each object mesh
   */
  setScalePosition(mesh) {
    this.setScale(mesh);
    this.setPosition(mesh);
  }

  /**
   * Calculates the right Three.js FOV
   * @returns FOV calculations
   */
  getFOV() {
    let height = this.options.height;

    let fov = Math.atan(height / (2 * this.camera.position.z)) * 2;

    return (fov / Math.PI) * 180;
  }

  /**
   * Mouse movement intersections
   * Looks for objects that are being hovered inside the scene
   */
  onMouseMovement() {
    window.addEventListener(
      "mousemove",
      event => {
        this.mouse.x = (event.clientX / this.options.width) * 2 - 1;
        this.mouse.y = -(event.clientY / this.options.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);

        const intersects = this.raycaster.intersectObjects(this.scene.children);

        if (intersects.length > 0) {
          let object = intersects[0].object;
          object.material.uniforms.hover.value = intersects[0].uv;
        }
      },
      false
    );
  }

  /**
   * Resize window function
   */
  resize() {
    this.options.height = window.innerHeight;
    this.options.width = window.innerWidth;

    this.camera.fov = this.getFOV();
    this.camera.aspect = this.options.width / this.options.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.options.width, this.options.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.handleMediaQuery();

    this.allMeshes.forEach(mesh => {
      this.setScalePosition(mesh);
    });

    this.handleDocumentBodySettings();
  }

  /**
   * Resize window event listener function
   */
  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  composerPass() {
    this.composer = new EffectComposer(this.renderer);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(this.renderPass);

    var counter = 0.0;
    this.myEffect = {
      uniforms: {
        tDiffuse: { value: null },
        scrollSpeed: { value: null }
      },
      vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix 
          * modelViewMatrix 
          * vec4( position, 1.0 );
      }
      `,
      fragmentShader: `
      uniform sampler2D tDiffuse;
      varying vec2 vUv;
      uniform float scrollSpeed;

      void main(){
        vec2 newUV = vUv;
        float area = smoothstep(0.25,0.,vUv.y);
        newUV.x -= ((vUv.x + area * 0.5) - 1.) *0.085*area;

        gl_FragColor = texture2D( tDiffuse, newUV);
      }
      `
    };

    this.customPass = new ShaderPass(this.myEffect);
    this.customPass.renderToScreen = true;

    this.composer.addPass(this.customPass);
  }

  /**
   * Animation loop function
   */
  render() {
    this.time += 0.05;

    this.currentScroll = this.scroll.current;

    this.materials.forEach(material => {
      material.uniforms.time.value = this.time;
    });

    this.siSmoothScroller();

    this.allMeshes.forEach(mesh => {
      this.setScalePosition(mesh);
    });

    this.composer.render();

    requestAnimationFrame(this.render.bind(this));
  }
}
