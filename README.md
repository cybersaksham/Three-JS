# Topic 9 - Textures

## What we learned?

<li>In this tutorial, we learned about textures.</li>

<br />

## Running The Server

```cmd
npm install
npm run dev
```

<br />

## Textures

<li>There are different type of textures:</li>
<ol>
  <li>
  Color Texture
    <ul>
      <li>Most simple one</li>
      <li>Directly applied on geometry</li>
    </ul>
  </li>
  <li>
  Alpha Texture
    <ul>
      <li>Gray scale image</li>
      <li>White means visible black means not visible</li>
    </ul>
  </li>
  <li>
  Height Texture
    <ul>
      <li>Gray scale image</li>
      <li>Move the vertices to create some relief like terrain</li>
      <li>Need enough subdivisions to apply details</li>
    </ul>
  </li>
  <li>
  Normal Texture
    <ul>
      <li>It adds details to texture</li>
      <li>Does not need more subdivisions</li>
      <li>Vertices dont move</li>
      <li>It just lure the light about the face orietation so it seems to be moved</li>
      <li>Better performances than a height texture</li>
    </ul>
  </li>
  <li>
  Ambient Occlusion Texture
    <ul>
      <li>Gray scale image</li>
      <li>Add fake shadows in crevices</li>
      <li>Not physically accurate</li>
      <li>Help to create contrast & see details</li>
    </ul>
  </li>
  <li>
  Metalness Texture
    <ul>
      <li>Gray scale image</li>
      <li>White means metallic & black means non metallic</li>
      <li>Use for reflections</li>
    </ul>
  </li>
  <li>
  Roughness Texture
    <ul>
      <li>Gray scale image</li>
      <li>White means rough & black means smooth</li>
      <li>Use for light dissipation</li>
      <li>Use in duo with metalness</li>
    </ul>
  </li>
</ol>

## PBR

<li>
Mostly textures, espacially metallic & roughness, use PBR (Physically Based Rendering)</li>
<li>PBR consists of techniques that tend to follow real-life directions to get realistic results.</li>

## Loading Textures in Three JS

<li>Directly by images</li>

```js
const image = new Image();
image.src = "/textures/door/color.jpg";

const texture = new THREE.Texture(image);
image.onload = () => {
  texture.needsUpdate = true;
};

const material = new THREE.MeshBasicMaterial({
  map: texture,
});
```

<li>By TextureLoader which can load multiple textures.</li>

```js
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(
  "/textures/door/color.jpg",
  // onLoad callback
  () => {
    console.log("After load callback");
  },
  // onProcess callback
  () => {
    console.log("Progress");
  },
  // onError callback
  () => {
    console.log("Error occurred");
  }
);

const material = new THREE.MeshBasicMaterial({
  map: texture,
});
```

<li>We can use LoadingManager instead of those callbacks</li>

```js
const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => {
  console.log("Loading Start...");
};

loadingManager.onProgress = () => {
  console.log("Progressing...");
};

loadingManager.onLoad = () => {
  console.log("Loading Done...");
};

loadingManager.onError = () => {
  console.log("Error occurred...");
};

const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load("/textures/door/color.jpg");
const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");

const material = new THREE.MeshBasicMaterial({
  map: colorTexture,
});
```

## Transformations on Textures

```js
// Repeat for repeating factor in x and y direction
// Will repeat last pixel only
colorTexture.repeat.x = 4;
colorTexture.repeat.y = 4;

// Wrapping complete image in repetition instead of last pixel only
// wrapS means x direction, wrapT means y direction
// can wrap directly or mirror alternative repetitions
colorTexture.wrapS = THREE.MirroredRepeatWrapping;
colorTexture.wrapT = THREE.RepeatWrapping;

// Starting offset
colorTexture.offset.set(0.5, 0.5);

// Rotation about center of texture
colorTexture.rotation = Math.PI / 4;

// Changing center of texture
colorTexture.center.set(0.5, 0.5);
```

## Filter & Mipmapping

<li>It is a technic that consists of creating of half a smaller version of texture again and again until we get 1x1 texture.</li>
<li>All those texture variations are sent to GPU & it will choose the most appropriate version of texture.</li>
<li>There are many algorithm for mipmapping & we can switch between them.</li>

## Minification Filter

<li>It happens when pixels of texture are smaller than the pixels of render i.e. texture is too big for the surface.</li>
<li>We can change its value to these values for different results:</li>
<ol>
<li>Three.NearestFilter</li>
<li>Three.LinearFilter</li>
<li>Three.NearestMipmapNearestFilter</li>
<li>Three.NearestMipmapLinearFilter</li>
<li>Three.LinearMipmapNearestFilter</li>
<li>Three.LinearMipmapLinearFilter (default)</li>
</ol>

```js
colorTexture.minFilter = THREE.NearestFilter;
```

## Magnification Filter

<li>It happens when pixels of texture are bigger than the pixels of render i.e. texture is too small for the surface.</li>
<li>We can change its value to these values for different results:</li>
<ol>
<li>Three.NearestFilter</li>
<li>Three.LinearFilter (default)</li>
</ol>

```js
colorTexture.magFilter = THREE.NearestFilter;
```

<li>Nearest filters are really good & also performance friendly so we should use them if needed.</li>
<li>While using Nearest filter on minfilter, we dont need mipmapping so we should disable it. It enhances the performance.</li>

```js
colorTexture.generateMipmaps = false;
```

## How to enhance performance in textures?

<li>We should keep 3 things in mind while creating a texture.</li>

## 1. Weight

<li>We should make our texture images as ligher as possible</li>
<li>.jpg files are lighter but have some loosy compression while .png files have lossless compression but a bit heavier.</li>

## 2. Size

<li>We should keep our size or resolution low wherever high resolution is not needed. Because each pixel is stored in GPU & it has memory limitations.</li>
<li>Mipmapping reduces size dividing by 2. So we should keep our resolution in powers of 2 otherwise it will do extra processing in resizing that image.</li>

## 3. Data

<li>Textures support transparency but we cant have transparency in .jpg files so to combine some alpha textures better use .png files.</li>
<li>In normal textures, we need exact location of pixels so we should not use jpg in normal textures.</li>
