import { useState, useEffect } from 'react';
import { createInquiry } from '../api/inquiries';
import { useAuth } from '../context/AuthContext';
import styles from './ContactModal.module.css';

export default function ContactModal({ listingId, listingTitle, onClose }) {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: user?.email ?? '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await createInquiry(listingId, form);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>✕</button>

        {status === 'success' ? (
          <div className={styles.successState}>
            <div className={styles.successIcon}>✓</div>
            <h2>Request Sent!</h2>
            <p>The seller will contact you shortly.</p>
            <button className={styles.doneBtn} onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            <h2>Contact Seller</h2>
            <p className={styles.subtitle}>Regarding: <strong>{listingTitle}</strong></p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Your Name</label>
                  <input
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label>Phone</label>
                  <input
                    name="phone"
                    placeholder="+1 234 567 8900"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Message</label>
                <textarea
                  name="message"
                  placeholder="I'm interested in this vehicle. Is it still available?"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              {status === 'error' && (
                <p className={styles.error}>Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
