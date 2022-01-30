# Topic 11 - 3D Text

## What we learned?

<li>In this tutorial, we learned to write 3D text.</li>

<br />

## Running The Server

```cmd
npm install
npm run dev
```

<br />

## Font

<li>We will use TextBufferGeometry but we need a particular font format called typeface.</li>
<li>We can convert a font with tools like <a href="https://gero3.github.io/facetype.js/">this</a></li>
<li>We can also use font provided by three js by putting them in static folder or by directly importing.</li>

```js
import typefaceFont from "three/examples/fonts/helvetiker_regular.typeface.json";
```

<li>We can use FontLoader to load fonts from static folder.</li>

```js
const fontLoader = new THREE.FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
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
  const textMaterial = new THREE.MeshBasicMaterial();
  const text = new THREE.Mesh(textGeometry, textMaterial);
  debug.add(textMaterial, "wireframe");
  scene.add(text);
});
```

## Centering the text

<li>When we use axes helper then we find that center of text is not just its left corner. It has some offset because of bouding.</li>
<li>Bounding is an information associated with the geometry that tells what space is taken by that geometry. It can be box or sphere.</li>
<li>It helps three js to calculate if object is in on the screen (frustum culling) or not.</li>
<li>By default three js uses sphere bouding but we are going to use box bounding.</li>

```js
textGeometry.computeBoundingBox();
console.log(textGeometry.boundingBox);
```

<li>The result is instance of Box3 with min & max values.</li>
<li>min value is not at 0 because of bevelThickness & bevelSize</li>

```js
// Centering
textGeometry.translate(
  -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
  -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
  -(textGeometry.boundingBox.max.z - 0.03) * 0.5
);
```

<li>We can also center it by in-built function.</li>

```js
textGeometry.center();
```

<li>We can add random donuts but we should put geometry and material outside of loop because it will then create only one material. It will increase the performance a lot</li>

```js
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
```
