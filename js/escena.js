import * as THREE from '../libs/three.module.min.js';
import { OrbitControls } from '../libs/OrbitControls.js';

// Escena
export const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f0f1a);

// Cámara
const menuAncho = window.innerWidth <= 768 ? 0 : 240;
export const camera = new THREE.PerspectiveCamera(
  75,
  (window.innerWidth - menuAncho) / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

// Renderer
export const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth - menuAncho, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Controles de órbita
export const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Iluminación
const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(luzAmbiente);

const luzDireccional = new THREE.DirectionalLight(0xffffff, 1);
luzDireccional.position.set(5, 5, 5);
scene.add(luzDireccional);

// Cuadrícula
const cuadricula = new THREE.GridHelper(10, 10, 0x2a2a4a, 0x2a2a4a);
cuadricula.position.y = -1.5;
scene.add(cuadricula);

// Estrellas
export function crearEstrellas() {
  const geometria = new THREE.BufferGeometry();
  const cantidad = 1500;
  const posiciones = new Float32Array(cantidad * 3);

  for (let i = 0; i < cantidad * 3; i++) {
    posiciones[i] = (Math.random() - 0.5) * 200;
  }

  geometria.setAttribute('position', new THREE.BufferAttribute(posiciones, 3));

  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.3,
    transparent: true,
    opacity: 0.9
  });

  scene.add(new THREE.Points(geometria, material));
}

// Responsive
export function iniciarResponsive() {
  function actualizar() {
    const menuAncho = window.innerWidth <= 768 ? 0 : 240;
    camera.aspect = (window.innerWidth - menuAncho) / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth - menuAncho, window.innerHeight);
  }

  actualizar();
  window.addEventListener('resize', actualizar);
}