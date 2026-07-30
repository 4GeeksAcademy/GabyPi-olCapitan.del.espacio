const API_KEY = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';
const BASE_URL = 'https://api.nasa.gov';

// Caché simple en memoria (5 minutos)
const cache = {};
const CACHE_TIME = 5 * 60 * 1000;

async function fetchWithCache(url, cacheKey) {
  const now = Date.now();
  if (cache[cacheKey] && (now - cache[cacheKey].timestamp < CACHE_TIME)) {
    return cache[cacheKey].data;
  }
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  cache[cacheKey] = { data, timestamp: now };
  return data;
}

export const nasaService = {
  // 1. MANTENIDO: Imagen del día para la Home
  async getPictureOfTheDay() {
    const url = `${BASE_URL}/planetary/apod?api_key=${API_KEY}`;
    const data = await fetchWithCache(url, 'apod');
    return {
      image: data.hdurl || data.url,
      title: data.title,
      explanation: data.explanation,
      date: data.date,
      media_type: data.media_type
    };
  },

  // 2. MANTENIDO: Asteroides para el panel de la Home
  async getNearEarthObjects() {
    const today = new Date().toISOString().split('T')[0];
    const url = `${BASE_URL}/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${API_KEY}`;
    const data = await fetchWithCache(url, `neows-${today}`);
    
    const dayObjects = data.near_earth_objects[today] || [];
    const count = data.element_count;
    
    if (dayObjects.length === 0) {
      return { count: 0, closest: null };
    }

    let closest = dayObjects[0];
    dayObjects.forEach(obj => {
      const currentDist = parseFloat(obj.close_approach_data[0].miss_distance.kilometers);
      const closestDist = parseFloat(closest.close_approach_data[0].miss_distance.kilometers);
      if (currentDist < closestDist) closest = obj;
    });

    const approach = closest.close_approach_data[0];
    return {
      count,
      closest: {
        name: closest.name,
        distance: Math.round(parseFloat(approach.miss_distance.kilometers)).toLocaleString() + ' km',
        velocity: Math.round(parseFloat(approach.relative_velocity.kilometers_per_hour)).toLocaleString() + ' km/h',
        size: `${Math.round(closest.estimated_diameter.meters.estimated_diameter_min)} - ${Math.round(closest.estimated_diameter.meters.estimated_diameter_max)} m`,
        isDangerous: closest.is_potentially_hazardous_asteroid
      }
    };
  },

  // 3. NUEVO: Obtener lista extensa de asteroides de los próximos días para la sección Asteroides
  async getExtendedAsteroids() {
    const today = new Date().toISOString().split('T')[0];
    const url = `${BASE_URL}/neo/rest/v1/feed?start_date=${today}&api_key=${API_KEY}`;
    const data = await fetchWithCache(url, `neows-extended-${today}`);
    
    const days = Object.keys(data.near_earth_objects);
    let allAsteroids = [];
    days.forEach(day => {
      allAsteroids = [...allAsteroids, ...data.near_earth_objects[day]];
    });

    return allAsteroids.map(iron => {
      const approach = iron.close_approach_data[0];
      return {
        id: iron.id,
        name: iron.name,
        date: approach.close_approach_date,
        distance: Math.round(parseFloat(approach.miss_distance.kilometers)),
        velocity: Math.round(parseFloat(approach.relative_velocity.kilometers_per_hour)),
        diameterMin: Math.round(iron.estimated_diameter.meters.estimated_diameter_min),
        diameterMax: Math.round(iron.estimated_diameter.meters.estimated_diameter_max),
        isDangerous: iron.is_potentially_hazardous_asteroid,
        url: iron.nasa_jpl_url
      };
    });
  },

  // 4. NUEVO: Buscador de la Galería de Imágenes de la NASA
  async searchGallery(query) {
    const cleanQuery = query || 'nebula';
    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(cleanQuery)}&media_type=image`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error al consultar la galería de la NASA');
    const data = await response.json();
    
    return (data.collection.items || []).slice(0, 24).map(item => ({
      id: item.data[0].nasa_id,
      title: item.data[0].title,
      description: item.data[0].description,
      date: item.data[0].date_created?.split('T')[0],
      image: item.links?.[0]?.href
    }));
  }
};