import * as THREE from "three";
import fragment from "../shaders/fragment2.glsl";
import vertex from "../shaders/vertex2.glsl";
import gsap from "gsap";

export default class HeroCanvas {
  constructor() {
    this.canvas = document.querySelector(".home__intro__canvas");

    this.options = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    this.geometryOptions = {
      width: window.innerWidth / 1.25,
      height: window.innerHeight / 1.25
    };

    this.meshes = [];

    this.time = 0;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.addCamera();
    this.addRenderer();

    this.onMouseMovement();

    this.addObjects();
    this.resize();
    this.setupResize();

    this.render();
  }

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

  addCamera() {
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.options.width / this.options.height,
      1.0,
      2000
    );
    this.camera.position.z = 50;
  }

  getFOV() {
    let height = this.options.height;

    let fov = Math.atan(height / (2 * this.camera.position.z)) * 2;

    return (fov / Math.PI) * 180;
  }

  onMouseMovement() {
    window.addEventListener(
      "mousemove",
      event => {
        this.mouse.x = (event.clientX / this.options.width / 1.25) * 2 - 1;
        this.mouse.y = -(event.clientY / this.options.height / 1.25) * 2 + 1;

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

  addObjects() {
    this.geometry = new THREE.PlaneBufferGeometry(1, 1, 40, 40);
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        hover: { value: new THREE.Vector2(0.5, 0.5) },
        hoverState: {
          value: 0
        }
      },
      fragmentShader: fragment,
      vertexShader: vertex,
      wireframe: true
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.setMeshScale(this.mesh);
    this.scene.add(this.mesh);

    this.canvas.addEventListener("mouseenter", () => {
      gsap.to(this.material.uniforms.hoverState, {
        duration: 1,
        value: 1,
        ease: "expo.out"
      });
    });

    this.canvas.addEventListener("mouseout", () => {
      gsap.to(this.material.uniforms.hoverState, {
        duration: 1,
        value: 0,
        ease: "expo.out"
      });
    });
  }

  setMeshScale(mesh) {
    mesh.scale.set(this.options.width / 1.25, this.options.height / 1.25, 1);
  }

  resize() {
    this.options.height = window.innerHeight;
    this.options.width = window.innerWidth;

    this.camera.fov = this.getFOV();
    this.camera.aspect = this.options.width / this.options.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.options.width, this.options.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  render() {
    this.time += 0.05;
    this.material.uniforms.time.value = this.time / 30;

    this.setMeshScale(this.mesh);

    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(this.render.bind(this));
  }
}
