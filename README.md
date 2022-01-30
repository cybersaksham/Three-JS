# Topic 10 - Materials

## What we learned?

<li>In this tutorial, we learned about materials.</li>

<br />

## Running The Server

```cmd
npm install
npm run dev
```

<br />

## Materials

<li>Materials are used to put a color on each visible pixel of geometries.</li>
<li>The algorithms are written in programs called shaders.</li>

## Types of Materials

<li>There are different type of materials in three js</li>

## 1. MeshBasicMaterial

<li>Most basic material</li>

```js
const material = new THREE.MeshBasicMaterial();
material.map = doorColorTexture;
material.color = new THREE.Color(0x00ff00);
material.transparent = true;
material.opacity = 0.7;
material.alphaMap = doorAlphaTexture;
material.side = THREE.DoubleSide;
```

## 2. MeshNormalMaterial

<li>Indicates direction of normal on surface.</li>
<li>Used for lighting, reflection & refraction.</li>
<li>It has a different property flatshading which flatten the faces so that normals dont interpolate between faces.</li>

```js
const material = new THREE.MeshNormalMaterial();
material.flatShading = true;
```

## 3. MeshMatcapMaterial

<li>It display a color by using normals as a reference to pick right color on texture</li>
<li>It use metcap texture</li>
<li>You can use matcaps from <a href="https://github.com/nidorx/matcaps">here</a></li>

```js
const material = new THREE.MeshMatcapMaterial();
material.matcap = matcapTexture;
```

## 4. MeshDepthMaterial

<li>It simply color the geometry in white if it is too close to near and black if close to far point of camera.</li>

```js
const material = new THREE.MeshDepthMaterial();
```

<li>Further materials need some lighting. So lets add some light.</li>

```js
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(2, 3, 4);
scene.add(pointLight);
```

## 5. MeshLambertMaterial

<li>It react to light. It is really performant but has some strange blurry lines on geometry.</li>

```js
const material = new THREE.MeshLambertMaterial();
```

## 6. MeshPhongMaterial

<li>It is same as mesh lambert but less performant. It does not have those strange lines and it shows reflection of light.</li>
<li>We can also set shininess color of reflection.</li>

```js
const material = new THREE.MeshPhongMaterial();
material.shininess = 1000;
material.specular = new THREE.Color("red");
```

## 7. MeshToonMaterial

<li>It is same as mesh lambert but is little cartoonish.</li>
<li>It accepts gradient texture</li>
<li>After applying gradient we dont see clear seperation because gradient is reall small.</li>
<li>So we can use minFilter & magFilter to NearestFilter & disable generateMipmaps</li>

```js
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;
```

```js
const material = new THREE.MeshToonMaterial();
material.gradientMap = gradientTexture;
```

## 8. MeshStandardMaterial

<li>It uses PBR to support light but with more realistic algorithm & better parameters like metalness & roughness.</li>

```js
const material = new THREE.MeshStandardMaterial();
material.side = THREE.DoubleSide;
material.metalness = 0.45;
material.roughness = 0.65;
material.map = doorColorTexture;
material.aoMap = doorAmbientOcclusionTexture;
material.aoMapIntensity = 2;
material.displacementMap = doorHeightTexture;
material.displacementScale = 0.05;
material.metalnessMap = doorMetalnessTexture;
material.roughnessMap = doorRoughnessTexture;
material.normalMap = doorNormalTexture;
material.normalScale.set(0.5, 0.5);
material.transparent = true;
material.alphaMap = doorAlphaTexture;

// Adding to dat.gui
debug.add(material, "metalness").min(0).max(1).step(0.001);
debug.add(material, "roughness").min(0).max(1).step(0.001);
debug.add(material, "aoMapIntensity").min(0).max(10).step(0.0001);
debug.add(material, "displacementScale").min(0).max(1).step(0.0001);
```

<li>We should use normal texture instead of height texture because height texture needs more details.</li>
<li>But here we are using height texture also so to see effects we must provide details</li>
<li>To use ambient occlusion texture we have to provide duplicate uv coordinates 'uv2'</li>

```js
sphere.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
);
plane.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
);
torus.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
);
```

## 9. MeshPhysicalMaterial
<li>It is same as MeshStandardMaterial but is more realistic with clear coat effect</li>

## 10. PointsMaterial
<li>It is uses to create tiny particles.</li>

## 11. ShaderMaterial & RawShaderMaterial
<li>These are used for creating your own materials.</li>

<br />

## Environment Map
<li>It is an image of what is sorrounding the scene</li>
<li>It can be used for reflection & refraction but for general lighting also for realistic render.</li>
<li>Three js currently supports only cube environment maps.</li>
<li>We should use CubeTextueLoader to load cube textures instead of TextureLoader</li>

```js
const cubeTextureLoader = new THREE.CubeTextureLoader();
const envMapTexture = cubeTextureLoader.load([
  "/textures/environmentMaps/0/px.jpg",
  "/textures/environmentMaps/0/nx.jpg",
  "/textures/environmentMaps/0/py.jpg",
  "/textures/environmentMaps/0/ny.jpg",
  "/textures/environmentMaps/0/pz.jpg",
  "/textures/environmentMaps/0/nz.jpg",
]);

material.envMap = envMapTexture;
```

<li>You can find hdri for environment maps & much more from <a href="https://polyhaven.com/">here</a></li>
<li>You can go <a href="https://matheowis.github.io/HDRI-to-CubeMap/">here</a> to convert hdr files to cube images</li>
<li>You can see info of all materials in <a href="https://threejs.org/docs/?q=material">docs</a></li>

