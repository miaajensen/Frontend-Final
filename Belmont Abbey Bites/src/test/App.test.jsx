import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import App from '../App';
import { AppProvider, useAppContext } from '../context/AppContext';
import CategoryCard from '../components/Category-card';
import Header from '../components/Header';
import HomePage from '../pages/HomePage';
import ResultsPage from '../pages/ResultsPage';
import RestaurantDetails from '../pages/RestaurantDetails';
import FavoritesPage from '../pages/FavoritesPage';
import LoginPage from '../pages/LoginPage';

vi.mock('../services/geoapify', () => ({
  getRestaurants: vi.fn(),
}));

import { getRestaurants } from '../services/geoapify';

function renderWithProviders(ui, initialEntries = ['/']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <AppProvider>{ui}</AppProvider>
    </MemoryRouter>
  );
}

function ContextProbe() {
  const { selectedCategory, setSelectedCategory, selectedRestaurant, setSelectedRestaurant } =
    useAppContext();

  return (
    <div>
      <p data-testid="category">{selectedCategory}</p>
      <p data-testid="restaurant">{selectedRestaurant?.name || ''}</p>
      <button type="button" onClick={() => setSelectedCategory('Studying')}>Set category</button>
      <button
        type="button"
        onClick={() => setSelectedRestaurant({ id: '1', name: 'Campus Cafe' })}
      >
        Set restaurant
      </button>
    </div>
  );
}

function LocationProbe() {
  const location = useLocation();
  return <p data-testid="location">{location.pathname}</p>;
}

describe('App components', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders the header navigation links', () => {
    renderWithProviders(<Header />);

    expect(screen.getByRole('heading', { name: 'Belmont Abbey Bites' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Favorites' })).toHaveAttribute('href', '/favorites');
    expect(screen.getByRole('link', { name: 'Login' })).toHaveAttribute('href', '/login');
  });

  it('renders all category options on the home page', () => {
    renderWithProviders(<HomePage />);

    expect(screen.getByRole('heading', { name: 'What vibe are you looking for?' })).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(5);
  });

  it('updates selected category and navigates when a category is selected', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppProvider>
          <Routes>
            <Route path="/" element={<CategoryCard category="Studying" />} />
            <Route path="/results" element={<LocationProbe />} />
          </Routes>
        </AppProvider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Studying' }));

    expect(screen.getByTestId('location')).toHaveTextContent('/results');
  });

  it('renders and updates shared app state', () => {
    renderWithProviders(<ContextProbe />);

    fireEvent.click(screen.getByRole('button', { name: 'Set category' }));
    fireEvent.click(screen.getByRole('button', { name: 'Set restaurant' }));

    expect(screen.getByTestId('category')).toHaveTextContent('Studying');
    expect(screen.getByTestId('restaurant')).toHaveTextContent('Campus Cafe');
  });

  it('renders favorites and login pages', () => {
    renderWithProviders(
      <>
        <FavoritesPage />
        <LoginPage />
      </>
    );

    expect(screen.getByRole('heading', { name: 'Favorites' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Welcome Crusader!' })).toBeInTheDocument();
  });

  it('loads restaurants and opens a selected restaurant details page', async () => {
    vi.stubGlobal('navigator', {
      geolocation: {
        getCurrentPosition: vi.fn((success) =>
          success({ coords: { latitude: 35.26, longitude: -81.32 } })
        ),
      },
    });

    getRestaurants.mockResolvedValue([
      {
        properties: {
          place_id: 'restaurant-1',
          name: 'Campus Cafe',
          formatted: '100 Main Street',
          categories: ['catering.cafe'],
          lat: 35.26,
          lon: -81.32,
        },
      },
    ]);

    function CategorySetter({ children }) {
      const { setSelectedCategory } = useAppContext();

      return (
        <button type="button" onClick={() => setSelectedCategory('Studying')}>
          {children}
        </button>
      );
    }

    function ResultsHarness() {
      const { selectedCategory, setSelectedCategory } = useAppContext();

      if (!selectedCategory) {
        return (
          <button type="button" onClick={() => setSelectedCategory('Studying')}>
            Choose Studying
          </button>
        );
      }

      return <ResultsPage />;
    }

    render(
      <MemoryRouter initialEntries={['/results']}>
        <AppProvider>
          <Routes>
            <Route
              path="/results"
              element={
                <>
                  <ResultsHarness />
                  <CategorySetter>Hidden setter</CategorySetter>
                </>
              }
            />
            <Route path="/restaurant/:id" element={<RestaurantDetails />} />
          </Routes>
        </AppProvider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Choose Studying' }));

    const restaurantButton = await screen.findByRole('button', { name: /Campus Cafe/ });
    fireEvent.click(restaurantButton);

    await waitFor(() =>
      expect(screen.getByRole('heading', { name: 'Campus Cafe' })).toBeInTheDocument()
    );
    expect(screen.getByText('100 Main Street')).toBeInTheDocument();
  });

  it('renders the main app routes successfully', () => {
    render(
      <MemoryRouter initialEntries={['/favorites']}>
        <AppProvider>
          <App />
        </AppProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'Favorites' })).toBeInTheDocument();
  });
});
