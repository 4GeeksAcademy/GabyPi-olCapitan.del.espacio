// Data de respaldo local por si la API externa falla
const planetasRespaldo = [
  { id: 'mercurio', name: 'Mercurio', isPlanet: true, type: 'Planet', gravity: 3.7, mass: '3.30x10^23 kg', diameter: 4879, moons: 0, temp: '167', rotation: 1407, orbit: 88 },
  { id: 'venus', name: 'Venus', isPlanet: true, type: 'Planet', gravity: 8.87, mass: '4.87x10^24 kg', diameter: 12104, moons: 0, temp: '464', rotation: -5832, orbit: 224 },
  { id: 'tierra', name: 'Tierra', isPlanet: true, type: 'Planet', gravity: 9.8, mass: '5.97x10^24 kg', diameter: 12742, moons: 1, temp: '15', rotation: 24, orbit: 365 },
  { id: 'marte', name: 'Marte', isPlanet: true, type: 'Planet', gravity: 3.71, mass: '6.42x10^23 kg', diameter: 6779, moons: 2, temp: '-65', rotation: 24.6, orbit: 687 },
  { id: 'jupiter', name: 'Júpiter', isPlanet: true, type: 'Planet', gravity: 24.79, mass: '1.89x10^27 kg', diameter: 139820, moons: 95, temp: '-110', rotation: 9.9, orbit: 4333 },
  { id: 'saturno', name: 'Saturno', isPlanet: true, type: 'Planet', gravity: 10.44, mass: '5.68x10^26 kg', diameter: 116460, moons: 146, temp: '-140', rotation: 10.7, orbit: 10759 },
  { id: 'urano', name: 'Urano', isPlanet: true, type: 'Planet', gravity: 8.69, mass: '8.68x10^25 kg', diameter: 50724, moons: 28, temp: '-195', rotation: -17.2, orbit: 30687 },
  { id: 'neptuno', name: 'Neptuno', isPlanet: true, type: 'Planet', gravity: 11.15, mass: '1.02x10^26 kg', diameter: 49244, moons: 16, temp: '-200', rotation: 16.1, orbit: 60190 }
];

const misionesHistoricas = [
  { id: 'apollo11', name: 'Apollo 11', year: 1969, agency: 'NASA', status: 'Finalizada', desc: 'Primera misión en lograr que un ser humano pisara la Luna.', target: 'Llegar a la superficie lunar y regresar a salvo.', duration: '8 días, 3 horas', facts: ['Neil Armstrong dejó sus botas en la Luna.', 'La computadora de navegación era menos potente que un móvil moderno.'], timeline: ['16 Jul: Lanzamiento', '20 Jul: Alunizaje', '24 Jul: Amerizaje'], image: 'https://images.unsplash.com/photo-1510519138101-570d1dca3d66?auto=format&fit=crop&w=600&q=80' },
  { id: 'voyager1', name: 'Voyager 1', year: 1977, agency: 'NASA', status: 'Activa', desc: 'Objeto humano más alejado de la Tierra, navegando por el espacio interestelar.', target: 'Explorar Júpiter, Saturno y los límites del Sistema Solar.', duration: '48+ años', facts: ['Lleva un disco de oro con sonidos de la Tierra.', 'Sigue transmitiendo datos científicos débiles.'], timeline: ['1977: Lanzamiento', '1979: Sobrevuelo Júpiter', '2012: Cruce al espacio interestelar'], image: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=600&q=80' },
  { id: 'jameswebb', name: 'James Webb (JWST)', year: 2021, agency: 'NASA / ESA', status: 'Activa', desc: 'El observatorio espacial de infrarrojos más grande y potente del mundo.', target: 'Observar las primeras galaxias del universo primitivo.', duration: 'En curso', facts: ['Su espejo de oro mide 6.5 metros.', 'Opera en el punto Lagrange L2 a 1.5 millones de km.'], timeline: ['Dic 2021: Lanzamiento', 'Ene 2022: Despliegue de paneles', 'Jul 2022: Primera imagen a color'], image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=600&q=80' }
];

export const spaceService = {
  async getSolarSystemBodies() {
    const url = 'https://api.le-systeme-solaire.net/rest/bodies/';
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error de respuesta del servidor externo');
      const data = await response.json();
      
      return data.bodies.map(body => ({
        id: body.id,
        name: body.name,
        englishName: body.englishName,
        isPlanet: body.isPlanet,
        type: body.bodyType || (body.isPlanet ? 'Planeta' : 'Cuerpo Celeste'),
        gravity: body.gravity || 0,
        mass: body.mass ? `${body.mass.massValue}x10^${body.mass.massExponent} kg` : 'Desconocida',
        diameter: body.meanRadius ? Math.round(body.meanRadius * 2) : 'Desconocido',
        moons: body.moons ? body.moons.length : 0,
        temp: body.avgTemp ? `${body.avgTemp - 273}` : 'N/A',
        rotation: body.sideralRotation ? Math.round(body.sideralRotation) : 'N/A',
        orbit: body.sideralOrbit ? Math.round(body.sideralOrbit) : 'N/A'
      }));
    } catch (error) {
      console.warn("API Solar caída o bloqueada por CORS. Cargando base de datos de respaldo local.", error);
      // Retornamos el respaldo local para asegurar la experiencia de usuario
      return planetasRespaldo;
    }
  },

  async getMissions() {
    return Promise.resolve(misionesHistoricas);
  },

  async getAstronauts() {
    const url = 'https://corquaid.github.io/international-space-station-apis/apis/astronauts.json';
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error al obtener astronautas');
    const data = await response.json();
    return {
      count: data.number || data.astronauts?.length || 0,
      list: (data.astronauts || []).map(ast => ({ name: ast.name, craft: ast.craft || 'ISS' }))
    };
  }
};