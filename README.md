# Topic 1 - Basics of Three JS

## What we learned?

<li>In this tutorial, we have learned to integrate three js with simple html and js file without any server.</li>

<li>We have created a simple red cube.</li>

<br />

## Importing Three JS


```cmd
<script src="./three.min.js"></script>
```

## Creating Scene

```cmd
const scene = new THREE.Scene();
```

## Geometry & Material

```cmd
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: "red" });
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);
```

## Sizes

```cmd
const sizes = {
  width: 800,
  height: 600,
};
```

## Camera

```cmd
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);
```

## Rendering

```cmd
const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
```
