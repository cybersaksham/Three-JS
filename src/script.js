import "./style.css";
import * as THREE from "three";

// Scene
const scene = new THREE.Scene();

// Red Cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: "red" });
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animations
const clock = new THREE.Clock();
// let time = Date.now();
const tick = () => {
  // const currentTime = Date.now();
  // const deltaTime = currentTime - time;
  // time = currentTime;
  // cube.rotation.y += 0.002 * deltaTime;

  const elapsedTime = clock.getElapsedTime();

  // Elliptical Orbit
  cube.position.x = 1.5 * Math.sin(elapsedTime);
  cube.position.y = Math.cos(elapsedTime);

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
