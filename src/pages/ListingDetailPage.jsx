import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getListingById } from '../api/listings';
import ContactModal from '../components/ContactModal';
import styles from './ListingDetailPage.module.css';

const fuelLabel = { PETROL: 'Gasoline', DIESEL: 'Diesel', ELECTRIC: 'Electric', HYBRID: 'Hybrid', GAS: 'Gas' };
const transLabel = { MANUAL: 'Manual', AUTOMATIC: 'Automatic', ROBOT: 'Robot', VARIATOR: 'Variator' };

export default function ListingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [selectedImg, setSelectedImg] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    getListingById(id)
      .then(({ data }) => setCar(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className={styles.center}>Loading...</div>;
  if (error || !car) return <div className={styles.center}>Vehicle not found.</div>;

  const images = car.imageUrls?.length ? car.imageUrls : [car.mainImageUrl].filter(Boolean);

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate(-1)}>← Back to listings</button>

      <div className={styles.layout}>
        {/* Left — images */}
        <div className={styles.gallery}>
          <div className={styles.mainImg}>
            {images[selectedImg]
              ? <img src={images[selectedImg]} alt={car.title} />
              : <div className={styles.noImg}>No photo</div>
            }
          </div>
          {images.length > 1 && (
            <div className={styles.thumbs}>
              {images.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt=""
                  className={i === selectedImg ? styles.thumbActive : styles.thumb}
                  onClick={() => setSelectedImg(i)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right — info */}
        <div className={styles.info}>
          <h1>{car.year} {car.brand} {car.model}</h1>
          <p className={styles.price}>${Number(car.price).toLocaleString()}</p>

          <div className={styles.badges}>
            {car.city && <span className={styles.badge}>📍 {car.city}</span>}
            {car.status && <span className={`${styles.badge} ${styles.status}`}>{car.status}</span>}
          </div>

          {/* Specs grid */}
          <div className={styles.specs}>
            <div className={styles.spec}>
              <span className={styles.specLabel}>Mileage</span>
              <span className={styles.specValue}>{car.mileage?.toLocaleString()} mi</span>
            </div>
            {car.fuelType && (
              <div className={styles.spec}>
                <span className={styles.specLabel}>Fuel Type</span>
                <span className={styles.specValue}>{fuelLabel[car.fuelType] ?? car.fuelType}</span>
              </div>
            )}
            {car.transmission && (
              <div className={styles.spec}>
                <span className={styles.specLabel}>Transmission</span>
                <span className={styles.specValue}>{transLabel[car.transmission] ?? car.transmission}</span>
              </div>
            )}
            {car.engineVolume && (
              <div className={styles.spec}>
                <span className={styles.specLabel}>Engine</span>
                <span className={styles.specValue}>{car.engineVolume}L</span>
              </div>
            )}
            {car.horsepower && (
              <div className={styles.spec}>
                <span className={styles.specLabel}>Horsepower</span>
                <span className={styles.specValue}>{car.horsepower} hp</span>
              </div>
            )}
            {car.driveType && (
              <div className={styles.spec}>
                <span className={styles.specLabel}>Drive Type</span>
                <span className={styles.specValue}>{car.driveType}</span>
              </div>
            )}
            {car.color && (
              <div className={styles.spec}>
                <span className={styles.specLabel}>Color</span>
                <span className={styles.specValue}>{car.color}</span>
              </div>
            )}
            <div className={styles.spec}>
              <span className={styles.specLabel}>Year</span>
              <span className={styles.specValue}>{car.year}</span>
            </div>
          </div>

          <button className={styles.contactBtn} onClick={() => setShowContact(true)}>
            Contact Seller
          </button>
        </div>
      </div>

      {showContact && (
        <ContactModal
          listingId={car.id}
          listingTitle={`${car.year} ${car.brand} ${car.model}`}
          onClose={() => setShowContact(false)}
        />
      )}

      {/* Description */}
      {car.description && (
        <div className={styles.description}>
          <h2>Description</h2>
          <p>{car.description}</p>
        </div>
      )}
    </div>
  );
}
