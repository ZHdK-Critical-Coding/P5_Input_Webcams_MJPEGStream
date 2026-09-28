# P5.js: MJPEG Stream

[Deutsch](README_DE.md)

Reads an MJPEG stream (e.g. from an IP camera) and draws it into the
canvas, repeated four times in a 2×2 grid. Because the frames end up in
the canvas, they can be processed further like any p5 image. A starting
point for using network cameras as input for a sketch.

## Installation

Requirements: an MJPEG stream URL. Set it in `videoSrc` at the top of
`sketch.js` (MJPEG cameras often serve streams at paths like
`/?action=stream`).

Libraries (in `libraries/`): p5.js 1.10.0, p5.sound 1.0.1 (included, not used).

## Server

Needs `stream-proxy` from
[Servers_RaspberriPi](https://github.com/ZHdK-Critical-Coding/Servers_RaspberriPi)
(HTTP, port 5000), running on a Raspberry Pi in the same network as your
computer. Start it first with `bash run.sh` (or `python server.py`) in its
folder. It fetches the camera stream and passes it on with CORS headers,
so the sketch can read its pixels. Set `proxyUrl` in `sketch.js` to
`http://<pi-ip>:5000/stream?url=`.

## How to Run

Start the proxy first (see Server). Then open the folder in Visual Studio Code and start Live Server (click
**Go Live** in the status bar).

While the stream is loading, the stream URL is shown on a black canvas.
If you run into CORS problems, use the debugger configuration
**Launch Chrome (no Security)** (Run and Debug panel), which opens Chrome
with web security disabled on `http://127.0.0.1:5500`.

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
