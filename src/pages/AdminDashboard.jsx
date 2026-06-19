import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminGetListings, adminDeleteListing, adminUpdateStatus } from '../api/admin';
import styles from './AdminDashboard.module.css';

const STATUS_OPTIONS = ['ACTIVE', 'SOLD', 'ARCHIVED'];

export default function AdminDashboard() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load = () => {
    setLoading(true);
    adminGetListings(0, 50)
      .then(({ data }) => setListings(data.content))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this listing?')) return;
    await adminDeleteListing(id);
    load();
  };

  const handleStatus = async (id, status) => {
    await adminUpdateStatus(id, status);
    load();
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Admin Dashboard</h1>
        <button className={styles.addBtn} onClick={() => navigate('/admin/listings/new')}>
          + New Listing
        </button>
      </div>

      {loading ? (
        <p className={styles.center}>Loading...</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Title</th>
                <th>Price</th>
                <th>City</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((car) => (
                <tr key={car.id}>
                  <td>
                    {car.mainImageUrl
                      ? <img src={car.mainImageUrl} alt="" className={styles.thumb} />
                      : <div className={styles.noImg}>—</div>
                    }
                  </td>
                  <td className={styles.title}>{car.year} {car.brand} {car.model}</td>
                  <td>${Number(car.price).toLocaleString()}</td>
                  <td>{car.city}</td>
                  <td>
                    <select
                      value={car.status}
                      onChange={(e) => handleStatus(car.id, e.target.value)}
                      className={`${styles.statusSelect} ${styles[car.status?.toLowerCase()]}`}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className={styles.actions}>
                    <button
                      className={styles.editBtn}
                      onClick={() => navigate(`/admin/listings/${car.id}/edit`)}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(car.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
