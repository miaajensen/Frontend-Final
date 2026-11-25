import { NavLink } from 'react-router-dom';
import '../css/header.css';

function Header() {
    return (
        <header className="app-header">
            <h1 className="app-title">Belmont Abbey Bites</h1>
            <nav className="nav-menu">
                <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>Home</NavLink>
                <NavLink to="/favorites" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>Favorites</NavLink>
                <NavLink to="/login" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>Login</NavLink>
            </nav>
        </header>
    );
}

export default Header;