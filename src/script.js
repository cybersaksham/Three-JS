import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import typefaceFont from "three/examples/fonts/helvetiker_regular.typeface.json";

// Debug
const debug = new dat.GUI();

// Textures
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/3.png");

// Font
const fontLoader = new THREE.FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  // Text
  const textGeometry = new THREE.TextBufferGeometry("Hello Three.js", {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  // const textMaterial = new THREE.MeshBasicMaterial();
  const textMaterial = new THREE.MeshMatcapMaterial();
  textMaterial.matcap = matcapTexture;
  const text = new THREE.Mesh(textGeometry, textMaterial);
  // debug.add(textMaterial, "wireframe");
  scene.add(text);

  /*
  textGeometry.computeBoundingBox();
  textGeometry.translate(
    -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
    -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
    -(textGeometry.boundingBox.max.z - 0.03) * 0.5
  );
  textGeometry.computeBoundingBox();
  console.log(textGeometry.boundingBox);
  */

  textGeometry.center();

  console.time("donuts");

  // Objects
  const dountGeometry = new THREE.TorusBufferGeometry(0.2, 0.1, 20, 45);
  const donutMaterial = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture,
  });

  for (let i = 0; i < 1000; i++) {
    const donut = new THREE.Mesh(dountGeometry, donutMaterial);

    donut.position.set(
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 30
    );

    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;

    const scale = Math.random() / 2 + 0.5;
    donut.scale.set(scale, scale, scale);

    scene.add(donut);
  }

  console.timeEnd("donuts");
});

// Scene
const scene = new THREE.Scene();

// Axes
// const axes = new THREE.AxesHelper();
// scene.add(axes);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  resizeWindow();
});

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

const canvas = document.getElementById("canvas");
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

// Resizing Window
const resizeWindow = () => {
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};
resizeWindow();

const tick = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();

// Full Screen
window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    if (canvas.requestFullScreen) canvas.requestFullScreen();
    else if (canvas.webkitRequestFullscreen) canvas.webkitRequestFullscreen();
  } else {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  }
});
