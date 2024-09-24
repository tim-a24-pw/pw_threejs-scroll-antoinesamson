import * as THREE from 'three';
import gsap from 'gsap';

//continuer la vidéo à 19:35
export default class Experience {
  constructor() {
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.canvas = document.querySelector('.webgl');
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();

    this.init();
  }

  init() {
    window.addEventListener('resize', this.resize.bind(this));
    const observer = new IntersectionObserver(this.observe.bind(this), {
      rootMargin: '-45% 0px',
    });

    this.createCamera();
    this.createObjects();
    this.createRenderer();
    this.animate();

    const experiences = document.querySelectorAll('.js-experience');
    for (let i = 0; i < experiences.length; i++) {
      const element = experiences[i];
      observer.observe(element);
    }
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height
    );
    this.camera.position.z = 8;
    this.scene.add(this.camera);
  }

  createRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
    });
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.render(this.scene, this.camera);
  }

  createObjects() {
    const geometry = new THREE.BoxGeometry(2, 2, 2, 2);
    const material = new THREE.MeshMatcapMaterial({
      color: '#ff0000',
    });
    this.cube = new THREE.Mesh(geometry, material); // on applique la forme et le materiel pour faire un mesh
    this.cube.position.x = 2;
    this.scene.add(this.cube);
  }

  resize() {
    // Update sizes
    this.sizes.width = window.innerWidth;
    this.sizes.height = window.innerHeight;

    // Update camera
    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();

    // Update renderer
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.renderer.render(this.scene, this.camera);
  }

  animate() {
    const elapsedTime = this.clock.getElapsedTime();
    this.renderer.render(this.scene, this.camera);

    this.cube.rotation.y = 0.5 * elapsedTime;

    window.requestAnimationFrame(this.animate.bind(this));
  }

  observe(entries) {
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const target = entry.target;

      if (entry.isIntersecting) {
        gsap.to(this.cube.position, {
          duration: 1,
          ease: 'Power2.inOut',
        });
      }
    }
  }
}
