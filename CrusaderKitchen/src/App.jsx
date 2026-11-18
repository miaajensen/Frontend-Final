import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import ResultsPage from './pages/ResultsPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import Header from './components/Header.jsx';
import CategoryCard from './components/Category-card.jsx';
import RestaurantDetails from './pages/RestaurantDetails.jsx';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
//       <Header />
//       <main className="main-content">

//         <CategoryCard
//           category="Studying"
//         />

//         <CategoryCard
//           category="Late Night"
//         />

//         <CategoryCard
//           category="Quick Bite"
//         />

//         <CategoryCard
//           category="Pre-Game"
//         />

//         <CategoryCard
//           category="Post-Game"
//         />
//       </main>
//     </div>
//   );
// }


export default App;