import { motion } from 'framer-motion';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './HeartButton.module.css';

export default function HeartButton({ listingId }) {
  const { user } = useAuth();
  const { favoriteIds, toggle } = useFavorites();
  const navigate = useNavigate();
  const isFav = favoriteIds.has(listingId);

  const handleClick = (e) => {
    e.stopPropagation();
    if (!user) { navigate('/login'); return; }
    toggle(listingId);
  };

  return (
    <motion.button
      className={`${styles.btn} ${isFav ? styles.active : ''}`}
      onClick={handleClick}
      whileTap={{ scale: 1.4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </motion.button>
  );
}
