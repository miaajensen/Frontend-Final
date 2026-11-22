import './index.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import ResultsPage from './pages/ResultsPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import Header from './components/Header.jsx';
import RestaurantDetails from './pages/RestaurantDetails.jsx';



function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
      </Routes>
    </div>
  );
}



export default App;