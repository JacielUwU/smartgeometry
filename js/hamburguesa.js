export function iniciarHamburguesa() {
  const btnHamburguesa = document.getElementById('btn-hamburguesa');
  const menu = document.getElementById('menu');
  const overlay = document.getElementById('overlay');

  if (!btnHamburguesa) return;

  btnHamburguesa.addEventListener('click', () => {
    menu.classList.toggle('abierto');
    overlay.classList.toggle('visible');
  });

  overlay.addEventListener('click', () => {
    menu.classList.remove('abierto');
    overlay.classList.remove('visible');
  });

  // Cerrar menú al seleccionar una figura en móvil
  const botones = document.querySelectorAll('.btn-figura');
  botones.forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        menu.classList.remove('abierto');
        overlay.classList.remove('visible');
      }
    });
  });
}