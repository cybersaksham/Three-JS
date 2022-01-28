import "./style.css";
import * as THREE from "three";

// Scene
const scene = new THREE.Scene();

// Red Cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: "red" });
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Position
cube.position.x = 0.6;
cube.position.y = -0.7;
cube.position.z = 1;
console.log(cube.position.length());
console.log(cube.position.x);
cube.position.normalize();
console.log(cube.position.length());
cube.position.set(0.6, -0.7, 1);
console.log(cube.position);

// Scale
cube.scale.set(2, 0.5, 0.25);

// Rotation
cube.rotation.reorder("YXZ");
cube.rotation.x = Math.PI / 4;
cube.rotation.y = Math.PI / 4;

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);
console.log(cube.position.distanceTo(camera.position));

// Look At
camera.lookAt(cube.position);

// Axes Helper
const axes = new THREE.AxesHelper(2);
scene.add(axes);

// Group
const group = new THREE.Group();
scene.add(group);
const cube1 = new THREE.Mesh(geometry, material);
const cube2 = new THREE.Mesh(geometry, material);
group.add(cube1);
group.add(cube2);
group.position.y = 0.5;
cube1.position.x = 2;
cube2.position.x = -1;

// Renderer
const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
