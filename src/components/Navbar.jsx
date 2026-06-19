import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';
import logo from '../assets/3.png';

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
        <img src={logo} alt="AutoTrade" className={styles.logoImg} />
        <span className={styles.logoText}>AUTOTRADE</span>
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
