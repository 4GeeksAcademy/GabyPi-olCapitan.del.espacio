import React, { createContext, useState, useEffect } from 'react';

// Creamos el canal de comunicación para los favoritos
export const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {
  // Inicializamos los favoritos intentando leer la lista del local
  const [favoritos, setFavoritos] = useState(() => {
    const guardados = localStorage.getItem('favoritos_nasa');
    // Si hay datos guardados los parseamos si no empezamos con un array vacío
    return guardados ? JSON.parse(guardados) : [];
  });

  // Cada vez que el array de favoritos cambie, lo grabamos en el almacenamiento local
  useEffect(() => {
    localStorage.setItem('favoritos_nasa', JSON.stringify(favoritos));
  }, [favoritos]);

  // Función para meter o sacar una foto de la lista
  const toggleFavorito = (imagen) => {
    console.log("Frecuencia recibida para favoritos:", imagen.title);

    setFavoritos((favsActuales) => {
      // Usamos un .some para ver si la URL ya está repetida
      const yaExiste = favsActuales.some((item) => item.url === imagen.url);
      
      if (yaExiste === true) {
        console.log("El elemento ya estaba en órbita. Procedemos a eliminarlo.");
        return favsActuales.filter((item) => item.url !== imagen.url);
      } else {
        // Si no existe, lo metemos al array manteniendo la estructura
        console.log("Nueva captura acoplada a la lista de favoritos.");
        return [...favsActuales, imagen];
      }
    });
  };

  return (
    <FavoritosContext.Provider value={{ favoritos, toggleFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
}