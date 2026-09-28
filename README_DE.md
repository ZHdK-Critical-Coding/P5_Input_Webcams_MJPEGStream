# P5.js: MJPEG Stream

[English](readme.md)

Liest einen MJPEG-Stream (z. B. von einer IP-Kamera) und zeichnet ihn
viermal in einem 2×2-Raster auf die Zeichenfläche. Weil die Bilder auf der
Zeichenfläche landen, lassen sie sich wie jedes p5-Bild weiterverarbeiten.
Ein Ausgangspunkt, um Netzwerkkameras als Input für einen Sketch zu
verwenden.

## Installation

Voraussetzungen: eine MJPEG-Stream-URL und ein Proxy, der dem Stream
CORS-Header hinzufügt. Der Proxy ist nicht in diesem Repository enthalten,
du musst selbst einen betreiben.

1. In `sketch.js` oben in `videoSrc` die URL des Kamerastreams eintragen
   (MJPEG-Kameras liefern Streams oft unter Pfaden wie `/?action=stream`).
2. `proxyUrl` auf den eigenen Proxy setzen. Der Sketch erwartet einen
   Endpunkt der Form `http://<host>:<port>/stream?url=`.
3. Den Ordner in Visual Studio Code öffnen und Live Server starten (in der
   Statusleiste auf **Go Live** klicken).

Solange der Stream lädt, wird die Stream-URL auf schwarzem Grund angezeigt.
Bei CORS-Problemen die Debugger-Konfiguration **Launch Chrome (no
Security)** verwenden (Bereich Run and Debug). Sie öffnet Chrome mit
deaktivierter Web-Security auf `http://127.0.0.1:5500`.

Bibliotheken (in `libraries/`): p5.js 1.10.0, p5.sound 1.0.1 (eingebunden,
nicht verwendet).

## Coding-Hilfe

- **`sketch.js` → Konfiguration oben**: `videoSrc` ist der Kamerastream,
  `proxyUrl` der CORS-Proxy. Eine zweite Stream-URL ist auskommentiert.
- **`setup()`**: erstellt eine fensterfüllende Zeichenfläche und lädt
  `proxyUrl + encodeURIComponent(videoSrc)` mit `createImg()` und
  `crossOrigin` auf `anonymous`. Nach dem Laden wird das HTML-Element
  versteckt und `videoReady` gesetzt.
- **`draw()`**: zeichnet `imageStream` viermal mit `image()`. Der Browser
  aktualisiert ein `<img>` mit MJPEG-Stream laufend, jeder Aufruf zeigt also
  das aktuelle Bild. Hier die eigene Verarbeitung ergänzen.
- **`wait()`**: zeigt den Ladetext, bis der Stream bereit ist.
- **`windowResized()`**: passt die Zeichenfläche an die Fenstergrösse an.
