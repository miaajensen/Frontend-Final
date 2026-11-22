import Header from '../components/Header.jsx';
import CategoryCard from '../components/Category-card.jsx';


const categories = [
    "Studying",
    "Quick Bite",
    "Late Night",
    "Pre-Game",
    "Post-Game"
];



function HomePage() {
    return (
        <main className="homepage">
            <h2 className="homepage-title">What vibe are you looking for?</h2>
            
            <p className="homepage-subtitle">Find the perfect spot for whatever you're craving!</p>
            
            <div className="category-container">
                {categories.map((category) => (
                    <CategoryCard
                        key={category}
                        category={category}
                    />
                ))}
            </div>
        </main>
    );
}

export default HomePage;