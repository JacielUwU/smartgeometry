// Campos por figura
const camposFiguras = {
  cubo: [
    { id: 'lado', label: 'Lado (a)' }
  ],
  esfera: [
    { id: 'radio', label: 'Radio (r)' }
  ],
  prisma: [
    { id: 'lado', label: 'Lado base (a)' },
    { id: 'altura', label: 'Altura (h)' }
  ],
  piramide: [
    { id: 'lado', label: 'Lado base (a)' },
    { id: 'altura', label: 'Altura (h)' }
  ],
  cilindro: [
    { id: 'radio', label: 'Radio (r)' },
    { id: 'altura', label: 'Altura (h)' }
  ],
  cono: [
    { id: 'radio', label: 'Radio (r)' },
    { id: 'altura', label: 'Altura (h)' }
  ]
};

// Fórmulas de cálculo
function calcular(figura, valores) {
  const { lado, radio, altura } = valores;
  const π = Math.PI;

  switch (figura) {
    case 'cubo':
      return {
        volumen: Math.pow(lado, 3).toFixed(2),
        area: (6 * Math.pow(lado, 2)).toFixed(2)
      };
    case 'esfera':
      return {
        volumen: ((4 / 3) * π * Math.pow(radio, 3)).toFixed(2),
        area: (4 * π * Math.pow(radio, 2)).toFixed(2)
      };
    case 'prisma':
      return {
        volumen: (((3 * Math.sqrt(3)) / 2) * Math.pow(lado, 2) * altura).toFixed(2),
        area: ((3 * Math.sqrt(3) * Math.pow(lado, 2)) + (3 * lado * altura)).toFixed(2)
      };
    case 'piramide':
      return {
        volumen: ((1 / 3) * Math.pow(lado, 2) * altura).toFixed(2),
        area: (Math.pow(lado, 2) + 2 * lado * Math.sqrt(Math.pow(lado / 2, 2) + Math.pow(altura, 2))).toFixed(2)
      };
    case 'cilindro':
      return {
        volumen: (π * Math.pow(radio, 2) * altura).toFixed(2),
        area: (2 * π * radio * (radio + altura)).toFixed(2)
      };
    case 'cono':
      const generatriz = Math.sqrt(Math.pow(radio, 2) + Math.pow(altura, 2));
      return {
        volumen: ((1 / 3) * π * Math.pow(radio, 2) * altura).toFixed(2),
        area: (π * radio * (radio + generatriz)).toFixed(2)
      };
    default:
      return { volumen: '—', area: '—' };
  }
}

// Generar campos dinámicamente
function generarCampos(figura) {
  const contenedor = document.getElementById('campos-calc');
  contenedor.innerHTML = '';

  camposFiguras[figura].forEach(campo => {
    const grupo = document.createElement('div');
    grupo.classList.add('campo-grupo');

    const label = document.createElement('label');
    label.classList.add('campo-label');
    label.textContent = campo.label;

    const input = document.createElement('input');
    input.type = 'number';
    input.id = `calc-${campo.id}`;
    input.classList.add('campo-input');
    input.placeholder = '0';
    input.min = '0';

    input.addEventListener('input', () => actualizarResultados(figura));

    grupo.appendChild(label);
    grupo.appendChild(input);
    contenedor.appendChild(grupo);
  });

  // Limpiar resultados
  document.getElementById('resultado-volumen').textContent = '—';
  document.getElementById('resultado-area').textContent = '—';
}

// Actualizar resultados
function actualizarResultados(figura) {
  const valores = {};
  camposFiguras[figura].forEach(campo => {
    const input = document.getElementById(`calc-${campo.id}`);
    valores[campo.id] = parseFloat(input?.value) || 0;
  });

  const todosCompletos = Object.values(valores).every(v => v > 0);
  if (!todosCompletos) {
    document.getElementById('resultado-volumen').textContent = '—';
    document.getElementById('resultado-area').textContent = '—';
    return;
  }

  const resultado = calcular(figura, valores);
  document.getElementById('resultado-volumen').textContent = resultado.volumen;
  document.getElementById('resultado-area').textContent = resultado.area;
}

// Iniciar calculadora
export function iniciarCalculadora() {
  const btnAbrir = document.getElementById('btn-calculadora');
  const btnCerrar = document.getElementById('btn-cerrar-calc');
  const panel = document.getElementById('calculadora');
  const titulo = document.getElementById('calculadora-titulo');

  let figuraActual = 'cubo';
  generarCampos(figuraActual);

  // Abrir/cerrar
  btnAbrir.addEventListener('click', () => {
    panel.classList.toggle('calculadora-oculta');
  });

  btnCerrar.addEventListener('click', () => {
    panel.classList.add('calculadora-oculta');
  });

  // Actualizar al cambiar figura
  const botones = document.querySelectorAll('.btn-figura');
  botones.forEach(btn => {
    btn.addEventListener('click', () => {
      figuraActual = btn.dataset.figura;
      titulo.textContent = `Calculadora — ${btn.textContent}`;
      generarCampos(figuraActual);
    });
  });
}

// Botón fórmulas
  const btnFormulas = document.getElementById('btn-formulas');
  const panelFormulas = document.getElementById('formulas-flotante');
  const btnCerrarFormulas = document.getElementById('btn-cerrar-formulas');

  if (btnFormulas) {
    btnFormulas.addEventListener('click', () => {
      panelFormulas.classList.toggle('calculadora-oculta');
    });

    btnCerrarFormulas.addEventListener('click', () => {
      panelFormulas.classList.add('calculadora-oculta');
    });
  }