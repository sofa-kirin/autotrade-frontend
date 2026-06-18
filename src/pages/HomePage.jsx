import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';
import heroBg from '../assets/hero.png';

export default function HomePage() {
  const navigate = useNavigate();

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
        <div className={styles.searchForm}>
          <select defaultValue="">
            <option value="" disabled>Make</option>
            <option>Toyota</option>
            <option>BMW</option>
            <option>Mercedes</option>
            <option>Audi</option>
            <option>Ford</option>
            <option>Honda</option>
          </select>
          <select defaultValue="">
            <option value="" disabled>Year</option>
            {Array.from({ length: 15 }, (_, i) => 2024 - i).map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
          <select defaultValue="">
            <option value="" disabled>Price range</option>
            <option>Up to $5,000</option>
            <option>$5,000 – $10,000</option>
            <option>$10,000 – $20,000</option>
            <option>$20,000+</option>
          </select>
          <button className={styles.btnPrimary} onClick={() => navigate('/listings')}>
            Search
          </button>
        </div>
      </section>

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
