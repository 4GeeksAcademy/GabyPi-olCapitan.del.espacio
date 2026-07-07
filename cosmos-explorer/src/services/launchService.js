const BASE_URL = 'https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=1';

const cache = { data: null, timestamp: 0 };
const CACHE_TIME = 5 * 60 * 1000;

export const launchService = {
  async getNextLaunch() {
    const now = Date.now();
    if (cache.data && (now - cache.timestamp < CACHE_TIME)) return cache.data;

    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('Error cargando lanzamientos');
    const data = await response.json();
    const launch = data.results[0];

    const result = {
      name: launch.name,
      company: launch.launch_service_provider?.name || 'Desconocida',
      rocket: launch.rocket?.configuration?.name || 'No especificado',
      date: launch.net, // Formato ISO completo para la cuenta atrás
      image: launch.image || 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=600&q=80'
    };

    cache.data = result;
    cache.timestamp = now;
    return result;
  }
};