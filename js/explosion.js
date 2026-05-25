import * as THREE from '../libs/three.module.min.js';
import { scene } from './escena.js';

let explosionActiva = false;
let facesGroup = null;
let facesCentros = [];

// Crear figura explotada agrupando por caras coplanares
function crearFiguraExplotada(mesh) {
  if (facesGroup) scene.remove(facesGroup);
  facesGroup = new THREE.Group();
  facesCentros = [];

  const geometry = mesh.geometry;
  const position = geometry.attributes.position;
  const material = mesh.material;
  const index = geometry.index;
  const triangulos = index ? index.count / 3 : position.count / 3;

  // Agrupar triángulos por normal
  const grupos = new Map();

  for (let i = 0; i < triangulos; i++) {
    const a = index ? index.getX(i * 3) : i * 3;
    const b = index ? index.getX(i * 3 + 1) : i * 3 + 1;
    const c = index ? index.getX(i * 3 + 2) : i * 3 + 2;

    const vA = new THREE.Vector3().fromBufferAttribute(position, a);
    const vB = new THREE.Vector3().fromBufferAttribute(position, b);
    const vC = new THREE.Vector3().fromBufferAttribute(position, c);

    // Calcular normal del triángulo
    const normal = new THREE.Vector3();
    const edge1 = new THREE.Vector3().subVectors(vB, vA);
    const edge2 = new THREE.Vector3().subVectors(vC, vA);
    normal.crossVectors(edge1, edge2);
    normal.normalize();

    // Clave redondeada para agrupar caras coplanares
    const clave = `${normal.x.toFixed(1)},${normal.y.toFixed(1)},${normal.z.toFixed(1)}`;

    if (!grupos.has(clave)) {
      grupos.set(clave, { vertices: [], normal: normal.clone() });
    }
    grupos.get(clave).vertices.push(vA, vB, vC);
  }

  // Crear una mesh por grupo
  grupos.forEach((grupo) => {
    const posArray = [];
    const centro = new THREE.Vector3();

    grupo.vertices.forEach(v => {
      posArray.push(v.x, v.y, v.z);
      centro.add(v);
    });

    centro.divideScalar(grupo.vertices.length);

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(posArray, 3));
    geo.computeVertexNormals();

    const mat = material.clone();
    const face = new THREE.Mesh(geo, mat);

    const edges = new THREE.EdgesGeometry(geo);
    const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.5, transparent: true });
    const line = new THREE.LineSegments(edges, lineMat);
    face.add(line);

    facesGroup.add(face);
    facesCentros.push(centro.clone());
  });

  facesGroup.position.copy(mesh.position);
  scene.add(facesGroup);
}

// Aplicar explosión según valor del slider
function aplicarExplosion(valor) {
  if (!facesGroup) return;
  const factor = valor / 100 * 2;

  facesGroup.children.forEach((face, i) => {
    const dir = facesCentros[i].clone().normalize();
    face.position.copy(dir.multiplyScalar(factor));
  });
}

export function iniciarExplosion(getMesh) {
  const btnExplosion = document.getElementById('btn-explosion');
  const panelExplosion = document.getElementById('panel-explosion');
  const slider = document.getElementById('slider-explosion');
  const valorEl = document.getElementById('valor-explosion');

  btnExplosion.addEventListener('click', () => {
    explosionActiva = !explosionActiva;
    btnExplosion.classList.toggle('activo', explosionActiva);

    const mesh = getMesh();

    if (explosionActiva) {
      panelExplosion.classList.remove('panel-oculto');
      panelExplosion.classList.add('panel-visible');
      mesh.visible = false;
      crearFiguraExplotada(mesh);
      aplicarExplosion(parseInt(slider.value));
    } else {
      panelExplosion.classList.remove('panel-visible');
      panelExplosion.classList.add('panel-oculto');
      mesh.visible = true;
      if (facesGroup) {
        scene.remove(facesGroup);
        facesGroup = null;
      }
      slider.value = 0;
      valorEl.textContent = '0%';
    }
  });

  slider.addEventListener('input', () => {
    const val = parseInt(slider.value);
    valorEl.textContent = val + '%';
    aplicarExplosion(val);
  });
}