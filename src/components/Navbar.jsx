import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="9" width="22" height="9" rx="2"/>
          <path d="M5 9V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"/>
          <circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>
        </svg>
        AutoTrade
      </Link>

      <div className={styles.links}>
        <NavLink to="/" end className={({ isActive }) => isActive ? styles.active : ''}>Home</NavLink>
        <NavLink to="/listings" className={({ isActive }) => isActive ? styles.active : ''}>Inventory</NavLink>
        {user ? (
          <>
            <NavLink to="/favorites" className={({ isActive }) => isActive ? styles.active : ''}>Favorites</NavLink>
            {user.role === 'ADMIN' && (
              <NavLink to="/admin" className={styles.adminBtn}>Admin</NavLink>
            )}
            <button onClick={handleLogout} className={styles.logoutBtn}>Log out</button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={({ isActive }) => isActive ? styles.active : ''}>Log in</NavLink>
            <NavLink to="/register" className={styles.registerBtn}>Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
