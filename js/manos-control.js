import { iniciarManos } from './manos.js';

let ultimaPosX = null;
let ultimaPosY = null;
let meshRef = null;

export function setMeshRef(mesh) {
  meshRef = mesh;
}

export function activarManos() {
  iniciarManos((x, y) => {
    if (ultimaPosX !== null && meshRef) {
      const deltaX = x - ultimaPosX;
      const deltaY = y - ultimaPosY;
      meshRef.rotation.y += deltaX * 5;
      meshRef.rotation.x += deltaY * 5;
    }
    ultimaPosX = x;
    ultimaPosY = y;
  });
}