# Topic 12 - Lighting

## What we learned?

<li>In this tutorial, we learned about lighting.</li>

<br />

## Running The Server

```cmd
npm install
npm run dev
```

<br />

## Lights

<li>Three js has different type of lights.</li>
<li>You can read them all in <a href="https://threejs.org/docs/?q=light">docs</a></li>

## Ambient Light

<li>It comes from everywhere in scene uniformly.</li>
<li>We use ambient lights to simulate bouncing of lights because bouncing of other lights is really hard in realtime.</li>

```js
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
```

## Directional Light

<li>It comes from one direction all rays parellel like sun.</li>
<li>Rays are directed from origin point to center of scene.</li>
<li>By default it is from (0, 1, 0) but we can change its position.</li>

```js
const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);
```

## Hemisphere Light

<li>It is same as ambient light but has different colors for sky and ground side.</li>

```js
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
scene.add(hemisphereLight);
```

## Point Light

<li>It is like a infinitely small point in scene illuminating light in all directions around it.</li>
<li>By default it does not fade on increasing distance but we can do that manually.</li>

```js
const pointLight = new THREE.PointLight(0xff0000, 0.3, 0.5, 2);
scene.add(pointLight);
```

## Rect Area Light

<li>It is like a rectangle light which is present on photoshoot sets.</li>
<li>It works only with MeshStandard & MeshPhysical materials.</li>

```js
const rectAreaLight = new THREE.RectAreaLight(0x0000ff, 0.3, 3, 2);
rectAreaLight.lookAt(new THREE.Vector3());
scene.add(rectAreaLight);
```

## SpotLight

<li>It is like a flashlight which illuminates in shape of cone.</li>

```js
const spotLight = new THREE.SpotLight(0x00ffff, 0.3, 2, Math.PI * 0.1, 0.25, 1);
scene.add(spotLight);
```

<li>In order to rotate a spotlight, we need to position its target.</li>

```js
spotLight.target.position.set(0, 0, 0);
scene.add(spotLight.target);
```

## Performance

<li>Light can cost a lot in terms of performances. So try to add minimum lights.</li>
<li>Ambient & Hemisphere lights are minimum cost lights.</li>
<li>Directional & Point lights are moderate cost lights.</li>
<li>Spot & Rect area lights are high cost lights.</li>

## Baking

<li>Baking is generally diffusing light in textures.</li>
<li>It is done in 3D softwares.</li>

## Helpers

<li>Three js has many light helpers like axes helper also.</li>
<li>We can use them to visualize position of light.</li>

```js
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
scene.add(pointLightHelper);
```

<li>We have to update spot light helper if we are positioning it using target.</li>

```js
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);
window.requestAnimationFrame(() => {
  spotLightHelper.update();
});
```

<li>Rect area light helper is not present in THREE variable. We have to import it.</li>
<li>And we have to do some extra stuff to update it also.</li>

```js
// Importing
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";

// Using
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
scene.add(rectAreaLightHelper

// Updating
window.requestAnimationFrame(() => {
  rectAreaLightHelper.position.copy(rectAreaLight.position);
  rectAreaLightHelper.quaternion.copy(rectAreaLight.quaternion);
  rectAreaLightHelper.update();
});
```
