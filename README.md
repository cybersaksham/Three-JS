# Topic 8 - Debug UI

## What we learned?

<li>In this tutorial, we learned about library to debug ui.</li>

<br />

## Running The Server

```cmd
npm install
npm run dev
```

<br />

## Libraries
<li>There are some libraries which allow to debug our ui. Some of them are:</li>
<ol>
<li><a href="https://www.npmjs.com/package/dat.gui">Dat.gui</a></li>
<li><a href="https://www.npmjs.com/package/control-panel">control-panel</a></li>
<li><a href="https://www.npmjs.com/package/controlkit">ControlKit</a></li>
<li><a href="https://www.npmjs.com/package/guify">Guify</a></li>
<li><a href="https://github.com/wearekuva/oui">Oui</a></li>
</ol>

## Dat Gui

```js
// Importing
import * as dat from "dat.gui";

// Initializing
const debug = new dat.GUI({ closed: true, width: 400, closeOnTop: true });

// Hiding Initially - H to toggle
debug.hide();

// Adding Values
debug.add(cube.position, "y").min(-1).max(2).step(0.001);
debug.add(material, "wireframe");
debug.add(cube, "visible");

// Adding Colors
debug.addColor(parameters, "color").onChange(() => {
  material.color.set(parameters.color);
});

// Adding Functions
debug.add(parameters, "spin");
```