import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import "../css/restaurantDetails.css";

function RestaurantDetails() {
    const { id } = useParams();
    const { selectedRestaurant } = useAppContext();
    const [restaurant, setRestaurant] = useState(selectedRestaurant);

    useEffect(() => {
        if (selectedRestaurant) {
            setRestaurant(selectedRestaurant);
            return;
        }

        const savedRestaurant = JSON.parse(
            localStorage.getItem("selectedRestaurant") || "null"
        );

        if (savedRestaurant?.id === id) {
            setRestaurant(savedRestaurant);
        }
    }, [id, selectedRestaurant]);

    if (!restaurant) {
        return (
            <main className="restaurant-details-page">
                <h1>Restaurant not found</h1>
                <p>Select a restaurant from the results page to view its details.</p>
            </main>
        );
    }

    return (
        <main className="restaurant-details-page">
            <h1>{restaurant.name}</h1>
            <p>{restaurant.address}</p>
            {restaurant.category && (
                <p><strong>Category:</strong> {restaurant.category}</p>
            )}
        </main>
    );
}

export default RestaurantDetails;






