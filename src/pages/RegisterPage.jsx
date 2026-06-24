import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import styles from './AuthPage.module.css';
import logo from '../assets/3.png';

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await register(form);
      loginUser(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
      <div className={styles.logoBlock}>
        <img src={logo} alt="AutoTrade" className={styles.logoImg} />
        <span className={styles.logoText}>AUTOTRADE</span>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.fieldGroup}>
          <label>First Name</label>
          <input name="firstName" placeholder="John" value={form.firstName} onChange={handleChange} required />
        </div>

        <div className={styles.fieldGroup}>
          <label>Last Name</label>
          <input name="lastName" placeholder="Doe" value={form.lastName} onChange={handleChange} required />
        </div>

        <div className={styles.fieldGroup}>
          <label>Email</label>
          <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
        </div>

        <div className={styles.fieldGroup}>
          <label>Phone Number</label>
          <input name="phone" placeholder="+1 234 567 8900" value={form.phone} onChange={handleChange} required />
        </div>

        <div className={styles.fieldGroup}>
          <label>Password</label>
          <div className={styles.passwordWrapper}>
            <input name="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={handleChange} required />
            <button type="button" className={styles.eyeBtn} onClick={() => setShowPassword(p => !p)}>
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        <button type="submit">Create Account</button>
      </form>

      <p className={styles.footer}>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
      </div>
    </div>
  );
}
