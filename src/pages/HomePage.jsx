import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getListings } from '../api/listings';
import styles from './HomePage.module.css';
import heroBg from '../assets/hero.jpg';

export default function HomePage() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    getListings(0, 3).then(({ data }) => setFeatured(data.content));
  }, []);

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero} style={{ backgroundImage: `url(${heroBg})` }}>
        <div className={styles.overlay} />
        <div className={styles.heroContent}>
          <h1>Find Your Perfect Vehicle</h1>
          <p>
            Browse our extensive collection of quality pre-owned and new vehicles.
            Your dream car awaits at AutoTrade.
          </p>
          <div className={styles.heroBtns}>
            <button className={styles.btnPrimary} onClick={() => navigate('/listings')}>
              Browse Inventory
            </button>
            <button className={styles.btnOutline} onClick={() => {
              document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              How It Works
            </button>
          </div>
        </div>
      </section>

      {/* Quick Search */}
      <section className={styles.search}>
        <h2>Quick Search</h2>
        <button className={styles.searchAllBtn} onClick={() => navigate('/listings')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          Search All Vehicles
        </button>
      </section>

      {/* Featured Vehicles */}
      {featured.length > 0 && (
        <section className={styles.featured}>
          <h2>Featured Vehicles</h2>
          <div className={styles.featuredGrid}>
            {featured.map((car) => (
              <div key={car.id} className={styles.featuredCard} onClick={() => navigate(`/listings/${car.id}`)}>
                <div className={styles.featuredImg}>
                  {car.mainImageUrl
                    ? <img src={car.mainImageUrl} alt={car.title} />
                    : <div className={styles.noImg}>No photo</div>
                  }
                  <span className={styles.featuredBadge}>Featured</span>
                </div>
                <div className={styles.featuredBody}>
                  <h3>{car.year} {car.brand} {car.model}</h3>
                  <p className={styles.featuredPrice}>${Number(car.price).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
          <button className={styles.viewAllBtn} onClick={() => navigate('/listings')}>
            View All Vehicles →
          </button>
        </section>
      )}

      {/* How It Works */}
      <section className={styles.howItWorks} id="how-it-works">
        <h2>How It Works</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNum}>1</div>
            <h3>Create an Account</h3>
            <p>Sign up for free in seconds and get full access to all listings.</p>
          </div>
          <div className={styles.stepArrow}>→</div>
          <div className={styles.step}>
            <div className={styles.stepNum}>2</div>
            <h3>Browse or Post</h3>
            <p>Search thousands of cars or post your own vehicle for sale.</p>
          </div>
          <div className={styles.stepArrow}>→</div>
          <div className={styles.step}>
            <div className={styles.stepNum}>3</div>
            <h3>Connect & Deal</h3>
            <p>Contact the seller directly and close the deal on your terms.</p>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className={styles.features}>
        <div className={styles.feature}>
          <span className={styles.icon}>🚗</span>
          <h3>Wide Selection</h3>
          <p>Thousands of vehicles from trusted sellers across the country.</p>
        </div>
        <div className={styles.feature}>
          <span className={styles.icon}>✅</span>
          <h3>Verified Listings</h3>
          <p>Every listing is reviewed to ensure quality and accuracy.</p>
        </div>
        <div className={styles.feature}>
          <span className={styles.icon}>💬</span>
          <h3>Easy Contact</h3>
          <p>Reach sellers directly and get answers fast.</p>
        </div>
      </section>
    </div>
  );
}
