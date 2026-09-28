# P5.js: MJPEG Stream

[Deutsch](README_DE.md)

Reads an MJPEG stream (e.g. from an IP camera) and draws it into the
canvas, repeated four times in a 2×2 grid. Because the frames end up in
the canvas, they can be processed further like any p5 image. A starting
point for using network cameras as input for a sketch.

## Installation

Requirements: an MJPEG stream URL and a proxy that adds CORS headers to
the stream. The proxy is not included in this repository; you have to run
one yourself.

1. Set the camera stream URL in `videoSrc` at the top of `sketch.js`
   (MJPEG cameras often serve streams at paths like `/?action=stream`).
2. Set `proxyUrl` to your proxy. The sketch expects an endpoint of the
   form `http://<host>:<port>/stream?url=`.
3. Open the folder in Visual Studio Code and start Live Server (click
   **Go Live** in the status bar).

While the stream is loading, the stream URL is shown on a black canvas.
If you run into CORS problems, use the debugger configuration
**Launch Chrome (no Security)** (Run and Debug panel), which opens Chrome
with web security disabled on `http://127.0.0.1:5500`.

Libraries (in `libraries/`): p5.js 1.10.0, p5.sound 1.0.1 (included, not used).

## Coding Help

- **`sketch.js` → config at the top**: `videoSrc` is the camera stream,
  `proxyUrl` the CORS proxy. A second stream URL is commented out.
- **`setup()`**: creates a full-window canvas and loads
  `proxyUrl + encodeURIComponent(videoSrc)` with `createImg()` and
  `crossOrigin` set to `anonymous`. Once loaded, the HTML element is
  hidden and `videoReady` is set.
- **`draw()`**: draws `imageStream` four times with `image()`. The browser
  keeps updating an `<img>` that shows an MJPEG stream, so each call shows
  the current frame. Add your own processing here.
- **`wait()`**: shows the loading text until the stream is ready.
- **`windowResized()`**: resizes the canvas with the window.
