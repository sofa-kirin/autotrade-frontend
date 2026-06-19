import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import logo from '../assets/3.png';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <img src={logo} alt="AutoTrade" className={styles.logoImg} />
            <span>AutoTrade</span>
          </div>
          <p>Your trusted partner in finding the perfect vehicle. Quality cars, exceptional service.</p>
        </div>

        {/* Quick Links */}
        <div className={styles.col}>
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/listings">Inventory</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>

        {/* Contact */}
        <div className={styles.col}>
          <h4>Contact Us</h4>
          <p>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.92 5.92l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            (555) 123-4567
          </p>
          <p>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            info@autotrade.com
          </p>
          <p>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            123 Auto Drive, Car City
          </p>
        </div>

        {/* Hours */}
        <div className={styles.col}>
          <h4>Hours</h4>
          <p>Monday – Friday: 9:00 AM – 7:00 PM</p>
          <p>Saturday: 9:00 AM – 6:00 PM</p>
          <p>Sunday: 11:00 AM – 5:00 PM</p>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2026 AutoTrade. All rights reserved.</p>
      </div>
    </footer>
  );
}
