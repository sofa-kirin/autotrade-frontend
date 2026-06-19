import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminCreateListing, adminUpdateListing } from '../api/admin';
import { getListingById } from '../api/listings';
import styles from './ListingForm.module.css';

const EMPTY = {
  title: '', brand: '', model: '', year: '', price: '', mileage: '',
  city: '', description: '', fuelType: '', transmission: '',
  color: '', engineVolume: '', horsepower: '', driveType: '',
  imageUrls: [''],
};

export default function ListingForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    getListingById(id).then(({ data }) => {
      setForm({
        ...data,
        imageUrls: data.imageUrls?.length ? data.imageUrls : [''],
      });
      setLoading(false);
    });
  }, [id]);

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const setImg = (i, val) =>
    setForm((f) => {
      const urls = [...f.imageUrls];
      urls[i] = val;
      return { ...f, imageUrls: urls };
    });

  const addImg = () =>
    setForm((f) => ({ ...f, imageUrls: [...f.imageUrls, ''] }));

  const removeImg = (i) =>
    setForm((f) => ({ ...f, imageUrls: f.imageUrls.filter((_, idx) => idx !== i) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = {
        ...form,
        year: Number(form.year),
        price: Number(form.price),
        mileage: Number(form.mileage),
        horsepower: form.horsepower ? Number(form.horsepower) : null,
        imageUrls: form.imageUrls.filter(Boolean),
      };
      if (isEdit) {
        await adminUpdateListing(id, payload);
      } else {
        await adminCreateListing(payload);
      }
      navigate('/admin');
    } catch {
      setError('Failed to save. Check all required fields.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className={styles.center}>Loading...</div>;

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate('/admin')}>← Back</button>
      <h1>{isEdit ? 'Edit Listing' : 'New Listing'}</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.section}>
          <h2>Basic Info</h2>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <label>Title *</label>
              <input value={form.title} onChange={set('title')} required placeholder="e.g. 2024 BMW X5 xDrive40i" />
            </div>
            <div className={styles.field}>
              <label>City *</label>
              <input value={form.city} onChange={set('city')} required placeholder="e.g. Berlin" />
            </div>
            <div className={styles.field}>
              <label>Brand *</label>
              <input value={form.brand} onChange={set('brand')} required placeholder="e.g. BMW" />
            </div>
            <div className={styles.field}>
              <label>Model *</label>
              <input value={form.model} onChange={set('model')} required placeholder="e.g. X5" />
            </div>
            <div className={styles.field}>
              <label>Year *</label>
              <input type="number" value={form.year} onChange={set('year')} required placeholder="2024" min="1900" max="2030" />
            </div>
            <div className={styles.field}>
              <label>Price ($) *</label>
              <input type="number" value={form.price} onChange={set('price')} required placeholder="45000" min="0" />
            </div>
            <div className={styles.field}>
              <label>Mileage (mi) *</label>
              <input type="number" value={form.mileage} onChange={set('mileage')} required placeholder="10000" min="0" />
            </div>
          </div>
          <div className={styles.field}>
            <label>Description</label>
            <textarea value={form.description} onChange={set('description')} rows={4} placeholder="Describe the vehicle..." />
          </div>
        </div>

        <div className={styles.section}>
          <h2>Specifications</h2>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <label>Fuel Type</label>
              <select value={form.fuelType} onChange={set('fuelType')}>
                <option value="">— Select —</option>
                <option value="PETROL">Gasoline</option>
                <option value="DIESEL">Diesel</option>
                <option value="ELECTRIC">Electric</option>
                <option value="HYBRID">Hybrid</option>
                <option value="GAS">Gas</option>
              </select>
            </div>
            <div className={styles.field}>
              <label>Transmission</label>
              <select value={form.transmission} onChange={set('transmission')}>
                <option value="">— Select —</option>
                <option value="AUTOMATIC">Automatic</option>
                <option value="MANUAL">Manual</option>
                <option value="ROBOT">Robot</option>
                <option value="VARIATOR">Variator</option>
              </select>
            </div>
            <div className={styles.field}>
              <label>Color</label>
              <input value={form.color} onChange={set('color')} placeholder="e.g. Midnight Black" />
            </div>
            <div className={styles.field}>
              <label>Engine Volume (L)</label>
              <input value={form.engineVolume} onChange={set('engineVolume')} placeholder="e.g. 3.0" />
            </div>
            <div className={styles.field}>
              <label>Horsepower</label>
              <input type="number" value={form.horsepower} onChange={set('horsepower')} placeholder="e.g. 340" />
            </div>
            <div className={styles.field}>
              <label>Drive Type</label>
              <select value={form.driveType} onChange={set('driveType')}>
                <option value="">— Select —</option>
                <option value="FWD">FWD</option>
                <option value="RWD">RWD</option>
                <option value="AWD">AWD</option>
                <option value="4WD">4WD</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Photos</h2>
          <p className={styles.hint}>Add image URLs. The first one will be used as the main photo.</p>
          {form.imageUrls.map((url, i) => (
            <div key={i} className={styles.imgRow}>
              <input
                value={url}
                onChange={(e) => setImg(i, e.target.value)}
                placeholder="https://example.com/photo.jpg"
              />
              {url && (
                <img src={url} alt="" className={styles.preview}
                  onError={(e) => e.target.style.display = 'none'}
                />
              )}
              {form.imageUrls.length > 1 && (
                <button type="button" className={styles.removeImg} onClick={() => removeImg(i)}>✕</button>
              )}
            </div>
          ))}
          <button type="button" className={styles.addImg} onClick={addImg}>
            + Add another photo
          </button>
        </div>

        <div className={styles.formActions}>
          <button type="button" className={styles.cancelBtn} onClick={() => navigate('/admin')}>Cancel</button>
          <button type="submit" className={styles.saveBtn} disabled={saving}>
            {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Listing'}
          </button>
        </div>
      </form>
    </div>
  );
}
