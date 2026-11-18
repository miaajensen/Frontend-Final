import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="app-header">
            <h1 className="app-title">Belmont Abbey Bites</h1>
            <nav className="nav-menu">
                <Link to="/" className="nav-link">Home</Link> 
                <Link to="/favorites" className="nav-link">Favorites</Link>
            </nav>
        </header>
    );
}

export default Header;