import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { SearchProvider } from './context/SearchContext';

export default function App() {
  return (
    <SearchProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </SearchProvider>
  );
}