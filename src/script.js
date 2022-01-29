import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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

// Mouse
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = -(e.clientY / sizes.height - 0.5);
});

// Camera
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.PerspectiveCamera(75, aspectRatio);
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   -1,
//   1
// );
camera.position.z = 2;
// camera.position.y = 1.5;
// camera.position.x = 1.5;
camera.lookAt(cube.position);
scene.add(camera);

const canvas = document.getElementById("canvas");
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Movement of camera on a plane
  // camera.position.x = cursor.x * 5;
  // camera.position.y = cursor.y * 5;

  // Movement of camera circularly around cube
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
  // camera.position.y = cursor.y * 3;
  // camera.lookAt(cube.position);

  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
