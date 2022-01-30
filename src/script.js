import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Lights
 */
// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const ambientGUI = gui.addFolder("Ambient Light");
ambientGUI.add(ambientLight, "intensity").min(0).max(1).step(0.0001);

// Directional Light
const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);
const directionalGUI = gui.addFolder("Directional Light");
directionalGUI.add(directionalLight, "intensity").min(0).max(1).step(0.0001);
directionalGUI.add(directionalLight.position, "x").min(-1).max(1).step(0.0001);
directionalGUI.add(directionalLight.position, "y").min(-1).max(1).step(0.0001);
directionalGUI.add(directionalLight.position, "z").min(-1).max(1).step(0.0001);
const directioanlLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  0.2
);
scene.add(directioanlLightHelper);
directionalGUI.add(directioanlLightHelper, "visible").name("Helper");

// Hemisphetrical Light
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
scene.add(hemisphereLight);
const hemisphereGUI = gui.addFolder("Hemispherical Light");
hemisphereGUI.add(hemisphereLight, "intensity").min(0).max(1).step(0.0001);
const hemisphereLightHelper = new THREE.HemisphereLightHelper(
  hemisphereLight,
  0.2
);
scene.add(hemisphereLightHelper);
hemisphereGUI.add(hemisphereLightHelper, "visible").name("Helper");

// Point Light
const pointLight = new THREE.PointLight(0xff0000, 0.3, 0.5, 2);
scene.add(pointLight);
const pointGUI = gui.addFolder("Point Light");
pointGUI.add(pointLight, "intensity").min(0).max(1).step(0.0001);
pointGUI.add(pointLight.position, "x").min(-1).max(1).step(0.0001);
pointGUI.add(pointLight.position, "y").min(-1).max(1).step(0.0001);
pointGUI.add(pointLight.position, "z").min(-1).max(1).step(0.0001);
pointGUI.add(pointLight, "distance").min(0).max(10).step(0.001);
pointGUI.add(pointLight, "decay").min(0).max(10).step(0.001);
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
scene.add(pointLightHelper);
pointGUI.add(pointLightHelper, "visible").name("Helper");

// Rect Area Light
const rectAreaLight = new THREE.RectAreaLight(0x0000ff, 0.3, 3, 2);
rectAreaLight.lookAt(new THREE.Vector3());
scene.add(rectAreaLight);
const rectareaGUI = gui.addFolder("Rect Area Light");
rectareaGUI.add(rectAreaLight, "intensity").min(0).max(1).step(0.0001);
rectareaGUI.add(rectAreaLight.position, "x").min(-1).max(1).step(0.0001);
rectareaGUI.add(rectAreaLight.position, "y").min(-1).max(1).step(0.0001);
rectareaGUI.add(rectAreaLight.position, "z").min(-1).max(1).step(0.0001);
rectareaGUI.add(rectAreaLight, "width").min(0).max(10).step(0.001);
rectareaGUI.add(rectAreaLight, "height").min(0).max(10).step(0.001);
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
scene.add(rectAreaLightHelper);
rectareaGUI.add(rectAreaLightHelper, "visible").name("Helper");

window.requestAnimationFrame(() => {
  rectAreaLightHelper.position.copy(rectAreaLight.position);
  rectAreaLightHelper.quaternion.copy(rectAreaLight.quaternion);
  rectAreaLightHelper.update();
});

// Spot Light
const spotLight = new THREE.SpotLight(0x00ffff, 0.3, 2, Math.PI * 0.1, 0.25, 1);
scene.add(spotLight);
spotLight.target.position.set(0, 0, 0);
scene.add(spotLight.target);
const spotGUI = gui.addFolder("Spot Light");
spotGUI.add(spotLight, "intensity").min(0).max(1).step(0.0001);
spotGUI.add(spotLight.position, "x").min(-1).max(1).step(0.0001);
spotGUI.add(spotLight.position, "y").min(-1).max(1).step(0.0001);
spotGUI.add(spotLight.position, "z").min(-1).max(1).step(0.0001);
spotGUI
  .add(spotLight.target.position, "x")
  .min(-1)
  .max(1)
  .step(0.0001)
  .name("targetX");
spotGUI
  .add(spotLight.target.position, "y")
  .min(-1)
  .max(1)
  .step(0.0001)
  .name("targetY");
spotGUI
  .add(spotLight.target.position, "z")
  .min(-1)
  .max(1)
  .step(0.0001)
  .name("targetZ");
spotGUI.add(spotLight, "distance").min(0).max(10).step(0.001);
spotGUI.add(spotLight, "angle").min(0).max(2).step(0.0001);
spotGUI.add(spotLight, "penumbra").min(0).max(1).step(0.0001);
spotGUI.add(spotLight, "decay").min(0).max(10).step(0.001);
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);
spotGUI.add(spotLightHelper, "visible").name("Helper");
window.requestAnimationFrame(() => {
  spotLightHelper.update();
});

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

// Objects
const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5, 32, 32),
  material
);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(
  new THREE.BoxBufferGeometry(0.75, 0.75, 0.75),
  material
);

const torus = new THREE.Mesh(
  new THREE.TorusBufferGeometry(0.3, 0.2, 32, 64),
  material
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  cube.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
