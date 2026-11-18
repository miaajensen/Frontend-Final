import './index.css';
import Header from './components/Header.jsx';
import CategoryCard from './components/Category-card.jsx';



function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">

        <CategoryCard
          category="Studying"
        />

        <CategoryCard
          category="Late Night"
        />

        <CategoryCard
          category="Quick Bite"
        />

        <CategoryCard
          category="Pre-Game"
        />

        <CategoryCard
          category="Post-Game"
        />
      </main>
    </div>
  );
}


export default App;