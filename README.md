# Topic 5 - Cameras

## What we learned?

<li>In this tutorial, we learned about cameras and camera controls.</li>

<br />

## Running The Server

```cmd
npm install
npm run dev
```

<br />

## Cameras

<li>Three.js has different type of cameras with different functionalities. We generally use perspective and orthographic cameras</li>
<li>But you can see <a href="https://threejs.org/docs/?q=camera">docs</a> to view all cameras.</li>

```js
const aspectRatio = sizes.width / sizes.height;

// Perspective Camera
const camera = new THREE.PerspectiveCamera(75, aspectRatio);

// Orthographic Camera
const camera = new THREE.OrthographicCamera(
  -1 * aspectRatio,
  1 * aspectRatio,
  -1,
  1
);
```

## Custom Controls

<li>We can control movement of camera by mouse or keyboard controls.</li>

```js
// Getting cursor position
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = -(e.clientY / sizes.height - 0.5);
});

// Updating camera position
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Movement of camera circularly around cube
  camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
  camera.position.y = cursor.y * 3;
  camera.lookAt(cube.position);

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
```

## In-built Controls

<li>Three.js has different type of controls with different functionalities.</li>
<li>You can see them all in <a href="https://threejs.org/docs/?q=controls">docs</a>.</li>

```js
// Importing
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Adding to canvas
const canvas = document.getElementById("canvas");
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Updating controls
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
```
