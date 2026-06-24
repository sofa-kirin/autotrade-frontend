import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getFavorites } from '../api/favorites';
import { useFavorites } from '../context/FavoritesContext';
import styles from './FavoritesPage.module.css';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { favoriteIds, toggle } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    getFavorites()
      .then(({ data }) => setFavorites(data))
      .finally(() => setLoading(false));
  }, []);

  const handleRemove = async (listingId) => {
    await toggle(listingId);
    setFavorites((prev) => prev.filter((f) => f.listingId !== listingId));
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>My Favorites</h1>

      {loading ? (
        <p className={styles.empty}>Loading...</p>
      ) : favorites.length === 0 ? (
        <div className={styles.emptyBlock}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <p>You haven't saved any vehicles yet.</p>
          <button onClick={() => navigate('/listings')}>Browse Inventory</button>
        </div>
      ) : (
        <div className={styles.grid}>
          {favorites.map((fav, i) => (
            <motion.div
              key={fav.id}
              className={styles.card}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              whileHover={{ y: -5, boxShadow: '0 10px 28px rgba(0,0,0,0.13)' }}
            >
              <div className={styles.imgWrap} onClick={() => navigate(`/listings/${fav.listingId}`)}>
                {fav.mainImageUrl
                  ? <img src={fav.mainImageUrl} alt={fav.listingTitle} />
                  : <div className={styles.noImg}>No photo</div>
                }
              </div>
              <div className={styles.body}>
                <h3 onClick={() => navigate(`/listings/${fav.listingId}`)}>
                  {fav.listingBrand} {fav.listingModel}
                </h3>
                <div className={styles.actions}>
                  <button className={styles.viewBtn} onClick={() => navigate(`/listings/${fav.listingId}`)}>
                    View Details
                  </button>
                  <button className={styles.removeBtn} onClick={() => handleRemove(fav.listingId)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
