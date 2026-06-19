import { useState } from 'react';
import { createListing } from '../api/listings';
import styles from './AdminPage.module.css';

const FUEL_TYPES = ['PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID', 'GAS'];
const TRANSMISSIONS = ['MANUAL', 'AUTOMATIC', 'ROBOT', 'VARIATOR'];

const empty = {
  title: '', brand: '', model: '', year: '', price: '',
  mileage: '', city: '', description: '',
  fuelType: '', transmission: '', color: '',
  engineVolume: '', horsepower: '', driveType: '',
};

export default function AdminPage() {
  const [form, setForm] = useState(empty);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);
    try {
      await createListing({
        ...form,
        year: Number(form.year),
        price: Number(form.price),
        mileage: Number(form.mileage),
        horsepower: form.horsepower ? Number(form.horsepower) : null,
        fuelType: form.fuelType || null,
        transmission: form.transmission || null,
      });
      setSuccess(true);
      setForm(empty);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <h1>Admin Panel</h1>
      <h2>Create New Listing</h2>

      {success && <p className={styles.success}>✓ Listing created successfully!</p>}
      {error && <p className={styles.error}>{error}</p>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.section}>
          <h3>Basic Info</h3>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <label>Title *</label>
              <input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. 2023 BMW X5 xDrive" />
            </div>
            <div className={styles.field}>
              <label>City *</label>
              <input name="city" value={form.city} onChange={handleChange} required placeholder="e.g. Berlin" />
            </div>
            <div className={styles.field}>
              <label>Brand *</label>
              <input name="brand" value={form.brand} onChange={handleChange} required placeholder="e.g. BMW" />
            </div>
            <div className={styles.field}>
              <label>Model *</label>
              <input name="model" value={form.model} onChange={handleChange} required placeholder="e.g. X5" />
            </div>
            <div className={styles.field}>
              <label>Year *</label>
              <input name="year" type="number" value={form.year} onChange={handleChange} required placeholder="2023" min="1900" max="2026" />
            </div>
            <div className={styles.field}>
              <label>Price ($) *</label>
              <input name="price" type="number" value={form.price} onChange={handleChange} required placeholder="45000" min="0" />
            </div>
            <div className={styles.field}>
              <label>Mileage (mi) *</label>
              <input name="mileage" type="number" value={form.mileage} onChange={handleChange} required placeholder="15000" min="0" />
            </div>
          </div>
          <div className={styles.field}>
            <label>Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={4} placeholder="Describe the vehicle..." />
          </div>
        </div>

        <div className={styles.section}>
          <h3>Specifications</h3>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <label>Fuel Type</label>
              <select name="fuelType" value={form.fuelType} onChange={handleChange}>
                <option value="">— Select —</option>
                {FUEL_TYPES.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div className={styles.field}>
              <label>Transmission</label>
              <select name="transmission" value={form.transmission} onChange={handleChange}>
                <option value="">— Select —</option>
                {TRANSMISSIONS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className={styles.field}>
              <label>Color</label>
              <input name="color" value={form.color} onChange={handleChange} placeholder="e.g. Midnight Black" />
            </div>
            <div className={styles.field}>
              <label>Engine Volume (L)</label>
              <input name="engineVolume" value={form.engineVolume} onChange={handleChange} placeholder="e.g. 3.0" />
            </div>
            <div className={styles.field}>
              <label>Horsepower</label>
              <input name="horsepower" type="number" value={form.horsepower} onChange={handleChange} placeholder="e.g. 340" />
            </div>
            <div className={styles.field}>
              <label>Drive Type</label>
              <input name="driveType" value={form.driveType} onChange={handleChange} placeholder="e.g. AWD, FWD, RWD" />
            </div>
          </div>
        </div>

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? 'Creating...' : 'Create Listing'}
        </button>
      </form>
    </div>
  );
}
