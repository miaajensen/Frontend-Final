import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
    const [location, setLocation] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [favorites, setFavorites] = useState([]);

    return (
        <AppContext.Provider
            value={{
                location,
                setLocation,
                selectedCategory,
                setSelectedCategory,
                favorites,
                setFavorites
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}