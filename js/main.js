import { scene, camera, renderer, controls, crearEstrellas, iniciarResponsive } from './escena.js';
import { meshActual } from './figuras.js';
import { getRotacionActiva, iniciarControles } from './controles.js';
import { iniciarManos, getCamaraActiva } from './manos.js';
import { iniciarHamburguesa } from './hamburguesa.js';
import { iniciarCalculadora } from './calculadora.js';
import { iniciarComparacion, rotarComparacion } from './comparar.js';
import { iniciarExplosion } from './explosion.js';

// Iniciar estrellas y responsive
crearEstrellas();
iniciarResponsive();

// Mesh actual (referencia mutable)
let mesh = meshActual;

// Iniciar controles pasando callback para actualizar mesh
iniciarControles((nuevoMesh) => {
  mesh = nuevoMesh;
});

// Iniciar hamburguesa
iniciarHamburguesa();

// Iniciar calculadora
iniciarCalculadora();

// Iniciar comparacion
iniciarComparacion();

// Iniciar explosión pasando función para obtener mesh actual
iniciarExplosion(() => mesh);

// Animación
function animar() {
  requestAnimationFrame(animar);
  if (getRotacionActiva()) {
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;
  }
  controls.update();
  renderer.render(scene, camera);
  rotarComparacion();
}
animar();