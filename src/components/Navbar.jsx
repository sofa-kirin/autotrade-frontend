import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import logo from '../assets/3.png';

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
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
