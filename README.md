# Topic 6 - Resizing

## What we learned?

<li>In this tutorial, we learned about resizing our window and working in fullscreen.</li>

<br />

## Running The Server

```cmd
npm install
npm run dev
```

<br />

## Resizing
<li>First we have to update our css to make canvas on whole viewport.</li>

```css
* {
  margin: 0;
  padding: 0;
}

body,
html {
  overflow: hidden;
}

#canvas {
  position: fixed;
  top: 0;
  left: 0;
}
```

<li>Now we have to set our size according to viewport.</li>

```js
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
```

<li>Now we have to reset camera and renderer everytime on resizing.</li>

```js
const resizeWindow = () => {
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  resizeWindow();
});
```

## Fullscreen
<li>We want to get full screen on double clicking the canvas.</li>

```js
// We use webkit for safari browser.
window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    if (canvas.requestFullScreen) canvas.requestFullScreen();
    else if (canvas.webkitRequestFullscreen) canvas.webkitRequestFullscreen();
  } else {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  }
});
```