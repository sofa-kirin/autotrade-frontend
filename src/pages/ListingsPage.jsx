import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getListings } from '../api/listings';
import styles from './ListingsPage.module.css';

const MAKES = ['Toyota', 'BMW', 'Mercedes', 'Audi', 'Ford', 'Honda', 'Tesla', 'Volkswagen'];
const FUEL_TYPES = ['PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID', 'GAS'];
const TRANSMISSIONS = ['MANUAL', 'AUTOMATIC', 'ROBOT', 'VARIATOR'];

const fuelLabel = { PETROL: 'Gasoline', DIESEL: 'Diesel', ELECTRIC: 'Electric', HYBRID: 'Hybrid', GAS: 'Gas' };
const transLabel = { MANUAL: 'Manual', AUTOMATIC: 'Automatic', ROBOT: 'Robot', VARIATOR: 'Variator' };

export default function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    make: searchParams.get('make') || '',
    fuelType: '',
    transmission: '',
    minPrice: Number(searchParams.get('minPrice')) || 0,
    maxPrice: Number(searchParams.get('maxPrice')) || 100000,
    minYear: Number(searchParams.get('year')) || 2000,
    maxYear: new Date().getFullYear(),
  });

  useEffect(() => {
    setLoading(true);
    getListings(page, 8)
      .then(({ data }) => {
        setListings(data.content);
        setTotalElements(data.totalElements);
        setTotalPages(data.totalPages);
      })
      .finally(() => setLoading(false));
  }, [page]);

  const handleReset = () =>
    setFilters({ make: '', fuelType: '', transmission: '', minPrice: 0, maxPrice: 100000, minYear: 2000, maxYear: new Date().getFullYear() });

  const displayed = listings.filter((car) => {
    if (filters.make && car.brand !== filters.make) return false;
    if (filters.fuelType && car.fuelType !== filters.fuelType) return false;
    if (filters.transmission && car.transmission !== filters.transmission) return false;
    if (car.price < filters.minPrice || car.price > filters.maxPrice) return false;
    if (car.year < filters.minYear || car.year > filters.maxYear) return false;
    return true;
  });

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Our Inventory</h1>

      <div className={styles.layout}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <span className={styles.sidebarTitle}>Filters</span>
            <button className={styles.reset} onClick={handleReset}>Reset</button>
          </div>

          <div className={styles.filterGroup}>
            <label>Make</label>
            <select value={filters.make} onChange={(e) => setFilters((f) => ({ ...f, make: e.target.value }))}>
              <option value="">All Makes</option>
              {MAKES.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Fuel Type</label>
            <select value={filters.fuelType} onChange={(e) => setFilters((f) => ({ ...f, fuelType: e.target.value }))}>
              <option value="">All Fuel Types</option>
              {FUEL_TYPES.map((f) => <option key={f} value={f}>{fuelLabel[f]}</option>)}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Transmission</label>
            <select value={filters.transmission} onChange={(e) => setFilters((f) => ({ ...f, transmission: e.target.value }))}>
              <option value="">All Transmissions</option>
              {TRANSMISSIONS.map((t) => <option key={t} value={t}>{transLabel[t]}</option>)}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Price Range</label>
            <input
              type="range" min={0} max={100000} step={1000}
              value={filters.maxPrice}
              onChange={(e) => setFilters((f) => ({ ...f, maxPrice: +e.target.value }))}
            />
            <div className={styles.rangeLabels}>
              <span>$0</span>
              <span>${filters.maxPrice.toLocaleString()}</span>
            </div>
          </div>

          <div className={styles.filterGroup}>
            <label>Year From</label>
            <input
              type="range" min={2000} max={new Date().getFullYear()} step={1}
              value={filters.minYear}
              onChange={(e) => setFilters((f) => ({ ...f, minYear: +e.target.value }))}
            />
            <div className={styles.rangeLabels}>
              <span>{filters.minYear}</span>
              <span>{new Date().getFullYear()}</span>
            </div>
          </div>
        </aside>

        {/* Content */}
        <div className={styles.content}>
          <p className={styles.count}>
            Showing {displayed.length} of {totalElements} vehicles
          </p>

          {loading ? (
            <p className={styles.center}>Loading...</p>
          ) : displayed.length === 0 ? (
            <p className={styles.center}>No vehicles found</p>
          ) : (
            <div className={styles.grid}>
              {displayed.map((car, i) => (
                <motion.div
                  key={car.id}
                  className={styles.card}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  whileHover={{ y: -5, boxShadow: '0 10px 28px rgba(0,0,0,0.13)' }}
                >
                  <div className={styles.cardImg}>
                    {car.mainImageUrl
                      ? <img src={car.mainImageUrl} alt={car.title} />
                      : <div className={styles.noImg}>No photo</div>
                    }
                  </div>
                  <div className={styles.cardBody}>
                    <h3>{car.year} {car.brand} {car.model}</h3>
                    <p className={styles.price}>${Number(car.price).toLocaleString()}</p>
                    <div className={styles.meta}>
                      <span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                        {car.mileage?.toLocaleString()} mi
                      </span>
                      {car.fuelType && (
                        <span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 22V8l9-6 9 6v14"/></svg>
                          {fuelLabel[car.fuelType] ?? car.fuelType}
                        </span>
                      )}
                      {car.transmission && (
                        <span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
                          {transLabel[car.transmission] ?? car.transmission}
                        </span>
                      )}
                    </div>
                    <button className={styles.viewBtn} onClick={() => navigate(`/listings/${car.id}`)}>
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button onClick={() => setPage((p) => p - 1)} disabled={page === 0}>←</button>
              <span>{page + 1} / {totalPages}</span>
              <button onClick={() => setPage((p) => p + 1)} disabled={page >= totalPages - 1}>→</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
