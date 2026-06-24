import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { getListings } from '../api/listings';
import ScrollReveal from '../components/ScrollReveal';
import styles from './HomePage.module.css';
import heroBg from '../assets/hero.jpg';

function AnimatedCounter({ to, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: 1500, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionVal.set(to);
  }, [inView, to, motionVal]);

  useEffect(() => spring.on('change', (v) => setDisplay(Math.round(v))), [spring]);

  return <span ref={ref}>{display.toLocaleString()}{suffix}</span>;
}

export default function HomePage() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    getListings(0, 6).then(({ data }) => setFeatured(data.content));
  }, []);

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero} style={{ backgroundImage: `url(${heroBg})` }}>
        <div className={styles.overlay} />
        <div className={styles.heroContent}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Find Your Perfect Vehicle
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            Browse our extensive collection of quality pre-owned and new vehicles.
            Your dream car awaits at AutoTrade.
          </motion.p>
          <motion.div
            className={styles.heroBtns}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          >
            <button className={styles.btnPrimary} onClick={() => navigate('/listings')}>
              Browse Inventory
            </button>
            <button className={styles.btnOutline} onClick={() => {
              document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              How It Works
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Vehicles */}
      {featured.length > 0 && (
        <section className={styles.featured}>
          <ScrollReveal direction="zoom">
            <h2>Featured Vehicles</h2>
          </ScrollReveal>
          <div className={styles.featuredGrid}>
            {featured.map((car, i) => (
              <ScrollReveal key={car.id} delay={i * 0.12} direction={i % 3 === 0 ? 'left' : i % 3 === 1 ? 'up' : 'right'}>
                <motion.div
                  className={styles.featuredCard}
                  onClick={() => navigate(`/listings/${car.id}`)}
                  whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.18)' }}
                  transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                >
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
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.3}>
            <button className={styles.viewAllBtn} onClick={() => navigate('/listings')}>
              View All Vehicles →
            </button>
          </ScrollReveal>
        </section>
      )}

      {/* How It Works */}
      <section className={styles.howItWorks} id="how-it-works">
        <ScrollReveal direction="flip">
          <h2>How It Works</h2>
        </ScrollReveal>
        <div className={styles.steps}>
          <ScrollReveal delay={0} direction="left" duration={0.8}>
            <div className={styles.step}>
              <div className={styles.stepNum}>1</div>
              <h3>Create an Account</h3>
              <p>Sign up for free in seconds and get full access to all listings.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15} direction="zoom">
            <div className={styles.stepArrow}>→</div>
          </ScrollReveal>
          <ScrollReveal delay={0.25} direction="up" duration={0.9}>
            <div className={styles.step}>
              <div className={styles.stepNum}>2</div>
              <h3>Browse or Post</h3>
              <p>Search thousands of cars or post your own vehicle for sale.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.35} direction="zoom">
            <div className={styles.stepArrow}>→</div>
          </ScrollReveal>
          <ScrollReveal delay={0.45} direction="right" duration={0.8}>
            <div className={styles.step}>
              <div className={styles.stepNum}>3</div>
              <h3>Connect & Deal</h3>
              <p>Contact the seller directly and close the deal on your terms.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Choose */}
      <section className={styles.why}>
        <ScrollReveal>
          <h2>Why Choose AutoTrade</h2>
        </ScrollReveal>
        <div className={styles.whyGrid}>
          {[
            {
              icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
              title: 'Quality Guaranteed',
              text: 'Every vehicle undergoes rigorous inspection to ensure top quality and reliability.',
            },
            {
              icon: <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>,
              title: 'Competitive Pricing',
              text: 'We offer the best prices in the market with transparent pricing and no hidden fees.',
            },
            {
              icon: <><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></>,
              title: 'Wide Selection',
              text: 'Browse through our extensive inventory of sedans, SUVs, trucks, and luxury vehicles.',
            },
            {
              icon: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
              title: 'Quick & Easy',
              text: 'Our streamlined process makes buying your next car simple and hassle-free.',
            },
          ].map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.15} direction={['left', 'up', 'up', 'right'][i]} duration={0.7}>
              <motion.div
                className={styles.whyItem}
                whileHover={{ scale: 1.07, y: -6 }}
                transition={{ type: 'spring', stiffness: 280, damping: 16 }}
              >
                <div className={styles.whyIcon}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {item.icon}
                  </svg>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <ScrollReveal>
        <section className={styles.cta}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Find Your Next Car?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Visit us today or browse our online inventory to discover your perfect vehicle.
          </motion.p>
          <motion.button
            className={styles.ctaBtn}
            onClick={() => navigate('/listings')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Get Started
          </motion.button>
        </section>
      </ScrollReveal>
    </div>
  );
}
