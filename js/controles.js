import { material, cambiarFigura, actualizarInfo, getAristasActual, getVerticesActual } from './figuras.js';
import { camera, controls } from './escena.js';
import { activarManos, setMeshRef } from './manos-control.js';
import * as THREE from '../libs/three.module.min.js';

let wireframeActivo = false;
let rotacionActiva = true;
let transparenciaActiva = false;
let aristasActivas = false;
let verticesActivos = false;

export function getRotacionActiva() {
  return rotacionActiva;
}

export function iniciarControles(getMesh) {

  setMeshRef(getMesh);

  // Botones de figuras
  const botones = document.querySelectorAll('.btn-figura');
  botones.forEach(btn => {
    btn.addEventListener('click', () => {
      botones.forEach(b => b.classList.remove('activo'));
      btn.classList.add('activo');
      const nueva = cambiarFigura(btn.dataset.figura);
      getMesh(nueva);
      setMeshRef(nueva);
      actualizarInfo(btn.dataset.figura);
    });
  });

  // Wireframe
  const btnWireframe = document.getElementById('btn-wireframe');
  if (btnWireframe) {
    btnWireframe.addEventListener('click', () => {
      wireframeActivo = !wireframeActivo;
      material.wireframe = wireframeActivo;
      btnWireframe.classList.toggle('activo', wireframeActivo);
    });
  }

  // Pausar rotación
  const btnPausa = document.getElementById('btn-pausa');
  if (btnPausa) {
    btnPausa.addEventListener('click', () => {
      rotacionActiva = !rotacionActiva;
      btnPausa.textContent = rotacionActiva ? 'Pausar rotación' : 'Reanudar rotación';
      btnPausa.classList.toggle('activo', !rotacionActiva);
    });
  }

  // Resetear cámara
  const btnReset = document.getElementById('btn-reset');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      camera.position.set(0, 0, 3);
      camera.lookAt(0, 0, 0);
      controls.reset();
    });
  }

  // Transparencia
  const btnTransparente = document.getElementById('btn-transparente');
  if (btnTransparente) {
    btnTransparente.addEventListener('click', () => {
      transparenciaActiva = !transparenciaActiva;
      material.transparent = transparenciaActiva;
      material.opacity = transparenciaActiva ? 0.3 : 1;
      material.side = transparenciaActiva ? THREE.DoubleSide : THREE.FrontSide;
      btnTransparente.classList.toggle('activo', transparenciaActiva);
    });
  }

  // Resaltar aristas
  const btnAristas = document.getElementById('btn-aristas');
  if (btnAristas) {
    btnAristas.addEventListener('click', () => {
      aristasActivas = !aristasActivas;
      const aristas = getAristasActual();
      if (aristas) aristas.visible = aristasActivas;
      btnAristas.classList.toggle('activo', aristasActivas);
    });
  }

  // Mostrar vértices
  const btnVertices = document.getElementById('btn-vertices');
  if (btnVertices) {
    btnVertices.addEventListener('click', () => {
      verticesActivos = !verticesActivos;
      const vertices = getVerticesActual();
      if (vertices) vertices.visible = verticesActivos;
      btnVertices.classList.toggle('activo', verticesActivos);
    });
  }

  // Control con manos
  const btnManos = document.getElementById('btn-manos');
  if (btnManos) {
    btnManos.addEventListener('click', () => {
      activarManos();
      btnManos.textContent = 'Manos activas';
      btnManos.classList.add('activo');
      btnManos.disabled = true;
    });
  }

}