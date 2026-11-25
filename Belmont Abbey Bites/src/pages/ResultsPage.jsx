import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRestaurants } from "../services/geoapify";
import "../css/resultsPage.css";

function ResultsPage() {
    const navigate = useNavigate();
    const { selectedCategory, setSelectedRestaurant } = useAppContext();

    const [location, setLocation] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });

            },
            (error) => {
                console.error("Unable to retrieve location. Please allow location access.", error);
                setLoading(false);
                console.error(error);
            }
        );
    }, []);

    useEffect(() => {
        if (!location || !selectedCategory) {
            return;
        }
        
        async function fetchRestaurants() {
            try {
                setLoading(true);
                setError("");

                const results = await getRestaurants(
                    selectedCategory,
                    location.latitude,
                    location.longitude
                );

                setRestaurants(results);
            } catch (error) {
                setError("Could not load restaurants. Please try again later.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchRestaurants();
    }, [location, selectedCategory]);

    function openRestaurantDetails(restaurant) {
        const place = restaurant.properties;
        const restaurantDetails = {
            id: place.place_id,
            name: place.name || "Unnamed Restaurant",
            address: place.formatted || "Address not available",
            category: place.categories?.join(", ") || selectedCategory,
            latitude: place.lat,
            longitude: place.lon
        };

        setSelectedRestaurant(restaurantDetails);
        localStorage.setItem("selectedRestaurant", JSON.stringify(restaurantDetails));
        navigate(`/restaurant/${encodeURIComponent(restaurantDetails.id)}`);
    }

    return (
        <main className="results-page">
            <h2 className="results-page-title">{selectedCategory}</h2>

            {loading && <p>Loading restaurants...</p>}
            {error && <p role="alert">{error}</p>}

            {!loading && !error && restaurants.length === 0 && (
                <p>No places found nearby.</p>
            )}

            <div className="restaurant-container">
                {restaurants.map((restaurant) => {
                    const place = restaurant.properties;

                    return (
                        <button
                            className="restaurant-card"
                            key={place.place_id}
                            type="button"
                            onClick={() => openRestaurantDetails(restaurant)}
                        >
                            <h3>{place.name || "Unnamed Restaurant"}</h3>
                            <p>{place.formatted || "Address not available"}</p>
                        </button>
                    );
                })}
            </div>
        </main>
    );
}



export default ResultsPage;