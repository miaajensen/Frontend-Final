import Header from '../components/Header.jsx';
import CategoryCard from '../components/Category-card.jsx';

function HomePage() {
    return (
        <main className="homepage">
            <h2 className="homepage-title">What vibe are you looking for?</h2>
            <p className="homepage-subtitle">Find the perfect spot for whatever you're craving!</p>
            {categories.map((category) => (
                <CategoryCard
                    category={category}
                />
            ))}
        </main>
    );
}

export default HomePage;