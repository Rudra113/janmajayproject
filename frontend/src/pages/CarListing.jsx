import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const CarCard = ({ car, index }) => (
  <motion.div
    initial={{ y: 30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="glass"
    whileHover={{ y: -8, boxShadow: '0 15px 35px rgba(0,0,0,0.3)' }}
    style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease' }}
  >
    <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
      <img 
        src={car.images[0]} 
        alt={`${car.make} ${car.model}`} 
        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }}
        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
      />
      <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(4px)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontWeight: 600, fontSize: '0.85rem', border: '1px solid rgba(255,255,255,0.1)' }}>
        {car.category}
      </div>
    </div>
    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <div style={{ marginBottom: '1rem' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{car.make}</span>
        <h2 style={{ fontSize: '1.5rem', marginTop: '0.25rem', letterSpacing: '-0.5px' }}>{car.model}</h2>
      </div>
      <p style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '1.5rem' }}>
        ₹{car.price.toLocaleString('en-IN')}
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Power</span>
          <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{car.specs.horsepower} HP</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>0-100 km/h</span>
          <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{car.specs.zeroToHundred}s</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Drivetrain</span>
          <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{car.specs.drivetrain}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Year</span>
          <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{car.year}</span>
        </div>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <Link to={`/cars/${car._id}`} className="btn-secondary" style={{ width: '100%' }}>
          View Details
        </Link>
      </div>
    </div>
  </motion.div>
);

const CarListing = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/cars')
      .then(res => {
        setCars(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '2rem 0' }}>
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ marginBottom: '3rem', textAlign: 'center' }}
      >
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', letterSpacing: '-1px' }}>Premium <span className="text-gradient">Inventory</span></h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Explore our curated selection of high-performance and luxury vehicles.
        </p>
      </motion.div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
          <div style={{ width: '50px', height: '50px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s ease-in-out infinite' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2.5rem' }}>
          {cars.map((car, idx) => (
            <CarCard key={car._id} car={car} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarListing;
