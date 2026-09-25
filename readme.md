# P5 -> MJPEG Stream

A p5.js sketch that reads an MJPEG stream (e.g. from an IP camera) and draws
it into the canvas as an image, repeated four times in a 2x2 grid, so the
frames can be processed further.

## How to Use

1. Set the camera stream URL in `videoSrc` at the top of `sketch.js`
   (MJPEG cameras often serve streams at paths like `/?action=stream`).
2. The stream is loaded through a proxy that adds CORS headers, so the canvas
   can use the image. Set `proxyUrl` to your proxy (the sketch expects an
   endpoint of the form `http://<host>:<port>/stream?url=`). The proxy is not
   included in this repository; you have to run one yourself.
3. Start Live Server (click **Go Live** in the VS Code status bar). If you
   run into CORS problems, use the debugger configuration
   **Launch Chrome (no Security)** (Run and Debug panel), which opens Chrome
   with web security disabled.
4. While the stream is loading, the stream URL is shown on a black canvas.

## How it Works

The stream is loaded with `createImg()` (with `crossOrigin` set to
`anonymous`) and the HTML element is hidden. Because the browser keeps
updating an `<img>` that shows an MJPEG stream, drawing it with `image()` in
`draw()` always shows the current frame.

## Libraries

- p5.js 1.10.0
- p5.sound 1.0.1 (loaded, not used)
