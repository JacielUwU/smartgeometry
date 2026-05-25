let camaraActiva = false;
let videoElement = null;
let hands = null;

export function iniciarManos(onMover) {

  videoElement = document.createElement('video');
  videoElement.id = 'camara-video';
  videoElement.autoplay = true;
  videoElement.playsInline = true;
  document.body.appendChild(videoElement);

  const script1 = document.createElement('script');
  script1.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js';
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js';
  document.head.appendChild(script2);

  script2.onload = () => {
    hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.5
    });

    hands.onResults((results) => {
      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const landmarks = results.multiHandLandmarks[0];
        const muñeca = landmarks[0];
        onMover(muñeca.x, muñeca.y);
      }
    });

    const camera = new Camera(videoElement, {
      onFrame: async () => {
        await hands.send({ image: videoElement });
      },
      width: 320,
      height: 240
    });

    camera.start();
    camaraActiva = true;
  };
}

export function getCamaraActiva() {
  return camaraActiva;
}