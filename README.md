# Topic 3 - Transformations

## What we learned?

<li>In this tutorial, we learned how transformation work on object in all 3 axes.</li>

<br />

## Running The Server

```cmd
npm install
npm run dev
```

<br />

## Position & Scale

<li>Position of object is defined as its coordinates relative to its parent.</li>
<li>Scale is its stretching along any axis relative to its parent.</li>

```js
// We can access position like this
cube.position.x = 0.6;
cube.position.y = -0.7;
cube.position.z = 1;

// Or directly like this
cube.position.set(0.6, -0.7, 1);
```

<li>Position of object is actually a Vector. We can apply some vector operations on that.</li>

```js
// Getting length of position vector
console.log(cube.position.length());

// normalize function reduces magnitude/length of position vector to 1 without changing direction
cube.position.normalize();
```

<li>Same things also work for scale.</li>

<br />

## Rotation

<li>Rotation is an Euler property instead of Vector. But still we can access it by same way.</li>
<li><b>While rotating an object order of axis matters. It is by default XYZ but generally we have to rotate things in Y first then in X then in Z. So we can reorder before rotating</b></li>

```js
cube.rotation.reorder("YXZ");
cube.rotation.x = Math.PI / 4;
cube.rotation.y = Math.PI / 4;
```

## Axes Helper
<li>It is a class in three.js which helps in visualizing the axes. But it is not meant to use in production.</li>

```js
// We can pass length of axes as parameter
const axes = new THREE.AxesHelper();
scene.add(axes);
```

## Other Functions
```js
// distanceTo function tell about distance between two vectors
console.log(cube.position.distanceTo(camera.position));

// lookAt function force -z axis of an object to pass through center of another object. It helps in forcing camera to look at specific object
camera.lookAt(cube.position);
```

## Groups
<li>We can group object into some bigger object that may be logically parent to that object. It helps in transforming whole group at once with its all children.</li>

```js
const group = new THREE.Group();
scene.add(group);
const cube1 = new THREE.Mesh(geometry, material);
const cube2 = new THREE.Mesh(geometry, material);
group.add(cube1);
group.add(cube2);
group.position.y = 0.5;
cube1.position.x = 2;
cube2.position.x = -1;
```
