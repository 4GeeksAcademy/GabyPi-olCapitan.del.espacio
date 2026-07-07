import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [globalQuery, setGlobalQuery] = useState('');

  return (
    <SearchContext.Provider value={{ globalQuery, setGlobalQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);