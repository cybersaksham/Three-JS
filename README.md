# Topic 4 - Animations

## What we learned?

<li>In this tutorial, we learned how animations work on object.</li>

<br />

## Running The Server

```cmd
npm install
npm run dev
```

<br />

## By Javascript Date

<li>We can update our object inside an animation loop and render. But speed of animation then depends on frame rate which vary for devices.</li>
<li>So we use javascript date to fix the speed.</li>

```js
let time = Date.now();
const tick = () => {
  const currentTime = Date.now();
  const deltaTime = currentTime - time;
  time = currentTime;

  cube.rotation.y += 0.002 * deltaTime;
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
```

## By Clock Class

<li>We can also use Clock class written in Three.js instead of date.</li>

```js
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Elliptical Orbit
  cube.position.x = 1.5 * Math.sin(elapsedTime);
  cube.position.y = Math.cos(elapsedTime);

  window.requestAnimationFrame(tick);
};

tick();
```
