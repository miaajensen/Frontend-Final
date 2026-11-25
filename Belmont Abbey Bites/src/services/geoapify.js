const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

const categoryTypes = {
    "Studying": ["catering.cafe"],
    "Quick Bite": ["catering.fast_food"],
    "Late Night": ["catering.bar", "catering.fast_food"],
    "Pre-Game": ["catering.bar", "catering.fast_food", "catering.pub", "catering.restaurant"],
    "Post-Game": ["catering.bar", "catering.fast_food", "catering.pub", "catering.restaurant"]
};

export async function getRestaurants(category, lat, lon) {
    
    const categories = categoryTypes[category];

    if (!categories) {
        throw new Error(`404: Category "${category}" not found`);
    }

    const params = new URLSearchParams({
        categories: categories.join(","),
        filter: `circle:${lon},${lat},3000`,
        bias: `proximity:${lon},${lat}`,
        limit: "15",
        apiKey: API_KEY
    });

    const url = `https://api.geoapify.com/v2/places?${params.toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
        const errorDetails = await response.text();

        console.error("Geoapify Error:", errorDetails);

        throw new Error("Error fetching restaurants.");
    }

    const data = await response.json();

    return data.features;

    
}


console.log("API Key loaded:", !!API_KEY);
