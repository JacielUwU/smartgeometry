import * as THREE from '../libs/three.module.min.js';
import { scene } from './escena.js';
import { datosFiguras } from './datos.js';

export const material = new THREE.MeshPhongMaterial({ color: 0x6c63ff });

export const figuras = {
  cubo:     new THREE.BoxGeometry(1.5, 1.5, 1.5),
  esfera:   new THREE.SphereGeometry(1, 32, 32),
  prisma:   new THREE.CylinderGeometry(0.8, 0.8, 1.5, 6),
  piramide: new THREE.ConeGeometry(1, 1.8, 4),
  cilindro: new THREE.CylinderGeometry(0.8, 0.8, 1.8, 32),
  cono:     new THREE.ConeGeometry(1, 1.8, 32),
};

export let meshActual = new THREE.Mesh(figuras.cubo, material);
scene.add(meshActual);

export let aristasActual = null;

export function getAristasActual() {
  return aristasActual;
}

export function agregarAristas(mesh) {
  if (aristasActual) mesh.remove(aristasActual);
  const geometriaAristas = new THREE.EdgesGeometry(mesh.geometry);
  const materialAristas = new THREE.LineBasicMaterial({ color: 0xffffff });
  aristasActual = new THREE.LineSegments(geometriaAristas, materialAristas);
  aristasActual.visible = false;
  mesh.add(aristasActual);
}

export let verticesActual = null;

export function getVerticesActual() {
  return verticesActual;
}

export function agregarVertices(mesh) {
  if (verticesActual) mesh.remove(verticesActual);
  const geometria = new THREE.BufferGeometry();
  const posiciones = mesh.geometry.attributes.position;
  const vertices = [];

  for (let i = 0; i < posiciones.count; i++) {
    vertices.push(posiciones.getX(i), posiciones.getY(i), posiciones.getZ(i));
  }

  geometria.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

  const materialVertices = new THREE.PointsMaterial({
    color: 0xffff00,
    size: 0.08,
  });

  verticesActual = new THREE.Points(geometria, materialVertices);
  verticesActual.visible = false;
  mesh.add(verticesActual);
}

agregarAristas(meshActual);
agregarVertices(meshActual);

export function cambiarFigura(nombre) {
  scene.remove(meshActual);
  meshActual = new THREE.Mesh(figuras[nombre], material);
  meshActual.scale.set(0, 0, 0);
  scene.add(meshActual);
  agregarAristas(meshActual);
  agregarVertices(meshActual);

  let progreso = 0;
  function animarEntrada() {
    progreso += 0.05;
    const escala = Math.min(progreso, 1);
    meshActual.scale.set(escala, escala, escala);
    if (progreso < 1) requestAnimationFrame(animarEntrada);
  }
  animarEntrada();

  return meshActual;
}

export function actualizarInfo(nombre) {
  const datos = datosFiguras[nombre];
  document.getElementById('info-caras').textContent = datos.caras;
  document.getElementById('info-vertices').textContent = datos.vertices;
  document.getElementById('info-aristas').textContent = datos.aristas;
  document.getElementById('info-volumen').textContent = datos.volumen;
  document.getElementById('info-area').textContent = datos.area;
  material.color.setHex(datos.color);

  // Actualizar fórmulas
  const contenedor = document.getElementById('formulas-panel');
  if (contenedor) {
    contenedor.innerHTML = '';
    datos.formulas.forEach(f => {
      const item = document.createElement('div');
      item.classList.add('formula-item');
      item.innerHTML = `
        <p class="formula-nombre">${f.nombre}</p>
        <p class="formula-expresion">${f.formula}</p>
        <p class="formula-descripcion">${f.descripcion}</p>
      `;
      contenedor.appendChild(item);
    });
  }

  // Actualizar título del panel flotante
  const tituloFormulas = document.getElementById('formulas-titulo');
  if (tituloFormulas) {
    tituloFormulas.textContent = `Fórmulas — ${nombre.charAt(0).toUpperCase() + nombre.slice(1)}`;
  }

  const nombreEl = document.getElementById('nombre-figura');
  nombreEl.textContent = nombre.charAt(0).toUpperCase() + nombre.slice(1);
  nombreEl.style.animation = 'none';
  requestAnimationFrame(() => {
    nombreEl.style.animation = 'fadeIn 0.4s ease';
  });
}

// Cargar info inicial
actualizarInfo('cubo');