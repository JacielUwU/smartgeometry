import * as THREE from '../libs/three.module.min.js';
import { scene } from './escena.js';
import { figuras, material, meshActual } from './figuras.js';
import { datosFiguras } from './datos.js';

let meshComparacion = null;
let comparandoActivo = false;
let figuraComparacion = null;

// Material para la segunda figura (verde)
const materialComparacion = new THREE.MeshPhongMaterial({ color: 0x63ff6c });

export function iniciarComparacion() {
  const btnComparar = document.getElementById('btn-comparar');
  const panelComparar = document.getElementById('panel-comparar');
  const botonesComparar = document.querySelectorAll('.btn-comparar-figura');

  // Abrir/cerrar panel
  btnComparar.addEventListener('click', () => {
    comparandoActivo = !comparandoActivo;
    btnComparar.classList.toggle('activo', comparandoActivo);

    if (comparandoActivo) {
      panelComparar.classList.remove('panel-oculto');
      panelComparar.classList.add('panel-visible');
    } else {
      panelComparar.classList.remove('panel-visible');
      panelComparar.classList.add('panel-oculto');
      eliminarFiguraComparacion();
    }
  });

  // Seleccionar segunda figura
  botonesComparar.forEach(btn => {
    btn.addEventListener('click', () => {
      botonesComparar.forEach(b => b.classList.remove('activo'));
      btn.classList.add('activo');
      figuraComparacion = btn.dataset.figura;
      agregarFiguraComparacion(figuraComparacion);
    });
  });
}

// Agregar segunda figura al canvas
function agregarFiguraComparacion(nombre) {
  if (meshComparacion) scene.remove(meshComparacion);

  const geometria = figuras[nombre];
  meshComparacion = new THREE.Mesh(geometria, materialComparacion);
  meshComparacion.position.x = 2.5;
  meshComparacion.scale.set(0, 0, 0);
  scene.add(meshComparacion);

  // Mover figura principal a la izquierda
  meshActual.position.x = -2.5;

  // Animación de entrada
  let progreso = 0;
  function animarEntrada() {
    progreso += 0.05;
    const escala = Math.min(progreso, 1);
    meshComparacion.scale.set(escala, escala, escala);
    if (progreso < 1) requestAnimationFrame(animarEntrada);
  }
  animarEntrada();

  // Actualizar color según figura
  const datos = datosFiguras[nombre];
  materialComparacion.color.setHex(datos.color);
}

// Eliminar segunda figura
function eliminarFiguraComparacion() {
  if (meshComparacion) {
    scene.remove(meshComparacion);
    meshComparacion = null;
  }
  // Regresar figura principal al centro
  meshActual.position.x = 0;
}

// Rotar segunda figura en la animación
export function rotarComparacion() {
  if (meshComparacion) {
    meshComparacion.rotation.x += 0.005;
    meshComparacion.rotation.y += 0.01;
  }
}