export const datosFiguras = {
  cubo: {
    caras: 6, vertices: 8, aristas: 12,
    volumen: 'a³',
    area: '6a²',
    color: 0x6c63ff,
    formulas: [
      {
        nombre: 'Volumen',
        formula: 'V = a³',
        descripcion: 'El volumen mide el espacio interior del cubo. Se obtiene elevando el lado al cubo.'
      },
      {
        nombre: 'Área total',
        formula: 'A = 6a²',
        descripcion: 'El área total es la suma de las 6 caras cuadradas que forman el cubo.'
      },
      {
        nombre: 'Diagonal del cubo',
        formula: 'd = a√3',
        descripcion: 'La diagonal une dos vértices opuestos pasando por el interior del cubo.'
      },
      {
        nombre: 'Diagonal de cara',
        formula: 'dc = a√2',
        descripcion: 'La diagonal de una cara une dos vértices opuestos de una misma cara cuadrada.'
      }
    ]
  },
  esfera: {
    caras: 1, vertices: 0, aristas: 0,
    volumen: '(4/3)πr³',
    area: '4πr²',
    color: 0xff6584,
    formulas: [
      {
        nombre: 'Volumen',
        formula: 'V = (4/3)πr³',
        descripcion: 'El volumen mide el espacio interior de la esfera en función de su radio.'
      },
      {
        nombre: 'Área superficial',
        formula: 'A = 4πr²',
        descripcion: 'El área superficial es la superficie exterior completa de la esfera.'
      },
      {
        nombre: 'Diámetro',
        formula: 'd = 2r',
        descripcion: 'El diámetro es la distancia entre dos puntos opuestos pasando por el centro.'
      },
      {
        nombre: 'Circunferencia máxima',
        formula: 'C = 2πr',
        descripcion: 'La circunferencia máxima es el círculo más grande que se puede trazar en la esfera.'
      }
    ]
  },
  prisma: {
    caras: 8, vertices: 12, aristas: 18,
    volumen: 'A base × h',
    area: '2A base + P × h',
    color: 0x43e97b,
    formulas: [
      {
        nombre: 'Volumen',
        formula: 'V = A base × h',
        descripcion: 'El volumen es el área de la base hexagonal multiplicada por la altura del prisma.'
      },
      {
        nombre: 'Área total',
        formula: 'A = 2A base + P × h',
        descripcion: 'El área total suma las dos bases y el área lateral formada por los rectángulos laterales.'
      },
      {
        nombre: 'Área de base hexagonal',
        formula: 'A base = (3√3/2)a²',
        descripcion: 'El área de la base hexagonal depende del lado del hexágono regular.'
      },
      {
        nombre: 'Área lateral',
        formula: 'A lat = P × h',
        descripcion: 'El área lateral es el perímetro de la base multiplicado por la altura.'
      }
    ]
  },
  piramide: {
    caras: 5, vertices: 5, aristas: 8,
    volumen: '(1/3) × A base × h',
    area: 'A base + A laterales',
    color: 0xf9a825,
    formulas: [
      {
        nombre: 'Volumen',
        formula: 'V = (1/3) × a² × h',
        descripcion: 'El volumen de la pirámide es un tercio del volumen del prisma de igual base y altura.'
      },
      {
        nombre: 'Área total',
        formula: 'A = a² + 2a × ap',
        descripcion: 'El área total suma la base cuadrada y las cuatro caras triangulares laterales.'
      },
      {
        nombre: 'Apotema lateral',
        formula: 'ap = √(h² + (a/2)²)',
        descripcion: 'La apotema es la altura de cada cara triangular lateral desde la base hasta el vértice.'
      },
      {
        nombre: 'Área lateral',
        formula: 'A lat = 2a × ap',
        descripcion: 'El área lateral es la suma de las cuatro caras triangulares de la pirámide.'
      }
    ]
  },
  cilindro: {
    caras: 3, vertices: 0, aristas: 2,
    volumen: 'πr²h',
    area: '2πr² + 2πrh',
    color: 0x26c6da,
    formulas: [
      {
        nombre: 'Volumen',
        formula: 'V = πr²h',
        descripcion: 'El volumen es el área del círculo base multiplicada por la altura del cilindro.'
      },
      {
        nombre: 'Área total',
        formula: 'A = 2πr² + 2πrh',
        descripcion: 'El área total suma las dos bases circulares y la superficie lateral enrollada.'
      },
      {
        nombre: 'Área lateral',
        formula: 'A lat = 2πrh',
        descripcion: 'El área lateral es la superficie que rodea al cilindro sin incluir las bases.'
      },
      {
        nombre: 'Área de base',
        formula: 'A base = πr²',
        descripcion: 'El área de cada base circular del cilindro.'
      }
    ]
  },
  cono: {
    caras: 2, vertices: 1, aristas: 1,
    volumen: '(1/3)πr²h',
    area: 'πr² + πrl',
    color: 0xff7043,
    formulas: [
      {
        nombre: 'Volumen',
        formula: 'V = (1/3)πr²h',
        descripcion: 'El volumen del cono es un tercio del volumen del cilindro de igual base y altura.'
      },
      {
        nombre: 'Área total',
        formula: 'A = πr² + πrl',
        descripcion: 'El área total suma la base circular y la superficie lateral cónica.'
      },
      {
        nombre: 'Generatriz',
        formula: 'l = √(r² + h²)',
        descripcion: 'La generatriz es la distancia desde el vértice del cono hasta cualquier punto del borde de la base.'
      },
      {
        nombre: 'Área lateral',
        formula: 'A lat = πrl',
        descripcion: 'El área lateral es la superficie cónica que va desde la base hasta el vértice.'
      }
    ]
  }
};