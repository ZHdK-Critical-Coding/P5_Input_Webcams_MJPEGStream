// A p5.js sketch that reads a MJPEG input stream and displays it
// as a p5.js image which can be further processed
// © uh 2025

// URL zum MJPEG-Stream (z. B. IP-Kamera)
const videoSrc = 'http://153.169.104.107:8080/?action=stream';  
// Alternativ-Stream (auskommentiert)
// const videoSrc = 'http://110.4.178.160:3175/-wvhttp-01-/image.cgi';

// Optionaler Proxy, um CORS-Probleme zu umgehen
const proxyUrl = 'http://192.168.138.96:5000/stream?url=';

// Flag, das signalisiert, ob das Video geladen und bereit ist
let videoReady = false;

// p5.js Image-Element für den Stream
let imageStream;

function setup() {
  createCanvas(windowWidth, windowHeight); // Vollbild-Canvas
  background(0);

  // Erstelle Proxy-URL für MJPEG Stream
  const proxy = `${proxyUrl}${encodeURIComponent(videoSrc)}`;
  console.log(proxy);

  // Lade MJPEG als p5.Image über createImg
  imageStream = createImg(proxy, '', 'anonymous', (e) => {
    // Callback: Video ist geladen
    imageStream.hide();   // HTML-Element verstecken (wir zeichnen im Canvas)
    videoReady = true;    // Flag setzen
    console.log(e);       // Event-Info ausgeben
  });
}

// Canvas wird automatisch angepasst, wenn Fenstergröße sich ändert
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Anzeige während der Video-Ladephase
function wait() {
  fill(255);
  textSize(10);
  text(`⏳ ${videoSrc}`, 10, 20);
}

// p5.js Draw-Funktion (wird in Loop aufgerufen)
function draw() {
  background(0);

  if (videoReady) {
    try {
      // Zeichne das Video viermal in einem 2x2 Raster
      for (let step = 0; step < 4; step++) {
        image(
          imageStream,
          (width / 2) * (step % 2),               // X-Position (links/rechts)
          (height / 2) * Math.floor(step / 2),    // Y-Position (oben/unten)
          width / 2,                               // Breite des Segments
          height / 2                               // Höhe des Segments
        );
      }
    } catch (e) {
      // Fehler beim Zeichnen abfangen, um Sketch nicht abstürzen zu lassen
      console.warn('Error drawing video frame:', e);
    }
  } else {
    // Video noch nicht bereit → Ladehinweis anzeigen
    wait();
  }
}