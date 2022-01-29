# Topic 7 - Geometry

## What we learned?

<li>In this tutorial, we learned about geometry in three js.</li>

<br />

## Running The Server

```cmd
npm install
npm run dev
```

<br />

## Geometry
<li>There are a lot of in-built geometries in three js.</li>
<li>You can find them all in <a href="https://threejs.org/docs/?q=geometry">docs</a>.</li>
<li>Geometries are made up of various triangles. We can create our own geometries by making traingular faces by joining vertices.</li>

```js
const geometry = new THREE.Geometry();
// Pushing vertices
geometry.vertices.push(new THREE.Vector3(0, 0, 0));
geometry.vertices.push(new THREE.Vector3(0, 2, 0));
geometry.vertices.push(new THREE.Vector3(1, 0, 0));
// Pushing faces with index of vertices
geometry.faces.push(new THREE.Face3(0, 1, 2));
```

## Buffer Geometry
<li>In docs there are simple and buffer both type of geometries for all geometriees.</li>
<li>Buffer geometries store vertices in Float32Array. They are very optimized and performance friendly. But they are not so much developer friendly.</li>

```js
const positionsArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);
const positionAttribute = new THREE.BufferAttribute(positionsArray, 3);
const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", positionAttribute);
```
