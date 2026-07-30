export const moonService = {
  getMoonPhase() {
    const lp = 2551443; 
    const now = new Date();
    const newMoon = new Date(1970, 0, 7, 20, 35, 0);
    const phase = ((now.getTime() - newMoon.getTime()) / 1000) % lp;
    const age = phase / (24 * 3600);
    
    let phaseName = '';
    let icon = '🌑';
    const illumination = Math.round((1 - Math.abs(1 - (age / 14.765))) * 100);

    if (age < 1.84) { phaseName = 'Luna Nueva'; icon = '🌑'; }
    else if (age < 5.53) { phaseName = 'Luna Creciente'; icon = '🌒'; }
    else if (age < 9.22) { phaseName = 'Cuarto Creciente'; icon = '🌓'; }
    else if (age < 12.91) { phaseName = 'Gibosa Creciente'; icon = '🌔'; }
    else if (age < 16.61) { phaseName = 'Luna Llena'; icon = '🌕'; }
    else if (age < 20.30) { phaseName = 'Gibosa Menguante'; icon = '🌖'; }
    else if (age < 23.99) { phaseName = 'Cuarto Menguante'; icon = '🌗'; }
    else if (age < 27.68) { phaseName = 'Luna Menguante'; icon = '🌘'; }
    else { phaseName = 'Luna Nueva'; icon = '🌑'; }

    // Estimación próxima luna llena
    const daysToFull = 14.765 - age;
    const nextFullDate = new Date();
    nextFullDate.setDate(now.getDate() + (daysToFull < 0 ? daysToFull + 29.53 : daysToFull));

    return Promise.resolve({
      phase: phaseName,
      illumination,
      icon,
      nextFull: nextFullDate.toLocaleDateString()
    });
  }
};