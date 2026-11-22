
// function RestaurantDetails() {

//     const [isFavorite, setIsFavorite] = useState(false);

//     useEffect(() => {
//         const favorites = JSON.parse(localStorage.getItem('favoriteRestaurant')) || [];
//         const isRestaurantFavorite = favorites.some(fav => fav.id === DeviceMotionEvent.id);
//         setIsFavorite(isRestaurantFavorite);
//     }, [restaurant.id]);

//     const toggleFavorites = () => {
//         const favorites = JSON.parse(localStorage.getItem('favoriteRestaurant')) || [];
//         const isRestaurantFavorite = favorites.some(fav => fav.id === restaurant.id);
//         const updatedFavorites = isRestaurantFavorite
//             ? favorites.filter(fav => fav.id !== restaurant.id)
//             : [...favorites, restaurant]

//         localStorage.setItem('favoriteRestaurant', JSON.stringify(updatedFavorites));
//         setIsFavorite(!isRestaurantFavorite);
//         onFavoriteChange?.(updatedFavorites);
//     };
    
//     return (
//         <h1 className="restaurant-details-title">{restaurantName}</h1>
//     );
// }

// export default RestaurantDetails;


import { useParams } from 'react-router-dom';

function RestaurantDetails() {

  const { id } = useParams();

  return (
    <main>
      <h1>Restaurant Details</h1>

      <p>Restaurant ID: {id}</p>
    </main>
  );
}

export default RestaurantDetails;