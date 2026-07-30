const BASE_URL = 'https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=10';

const cache = { data: null, timestamp: 0 };
const CACHE_TIME = 5 * 60 * 1000;

export const launchService = {
  async getNextLaunch() {
    const now = Date.now();

    if (cache.data && (now - cache.timestamp < CACHE_TIME)) {
      return cache.data;
    }

    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

      const data = await response.json();
      const launches = Array.isArray(data.results) ? data.results : [];

      // Buscar lanzamiento con fecha futura
      const launch = launches.find(l => new Date(l.net).getTime() > now) || launches[0];

      if (!launch) throw new Error('No hay lanzamientos en la respuesta');

      const result = {
        name: launch.name || 'Próximo Lanzamiento Espacial',
        company: launch.launch_service_provider?.name || 'Agencia Espacial',
        rocket: launch.rocket?.configuration?.name || 'Cohete no especificado',
        date: launch.net || new Date(now + 86400000).toISOString(),
        image: launch.image || 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=600&q=80'
      };

      cache.data = result;
      cache.timestamp = now;
      return result;

    } catch (error) {
      console.warn('Fallback activado en launchService:', error.message);
      
      const fechaFutura = new Date(now + 48 * 60 * 60 * 1000).toISOString();
      return {
        name: 'Artemis II - Misión Lunar',
        company: 'NASA',
        rocket: 'SLS Block 1',
        date: fechaFutura,
        image: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=600&q=80'
      };
    }
  }
};