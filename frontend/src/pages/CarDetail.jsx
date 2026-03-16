import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

const CarDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [car, setCar] = useState(location.state?.dynamicCar || null);
  const [loading, setLoading] = useState(!location.state?.dynamicCar);

  useEffect(() => {
    // If we already have the dynamic car from state, don't fetch
    if (car) return;

    axios.get(`http://localhost:5000/api/cars/${id}`)
      .then(res => {
        setCar(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id, car]);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '10rem' }}>
      <div style={{ width: '60px', height: '60px', border: '4px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s ease-in-out infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (!car) return <div style={{ textAlign: 'center', padding: '5rem' }}><h2>Car not found</h2></div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ padding: '0', maxWidth: '1400px', margin: '0 auto' }}
    >
      <Link to="/cars" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '2rem', transition: 'color 0.2s', fontWeight: 500 }} onMouseOver={e => e.currentTarget.style.color='white'} onMouseOut={e => e.currentTarget.style.color='var(--text-muted)'}>
        <ArrowLeft size={20} /> Back to Inventory
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: '4rem', alignItems: 'start' }}>
        {/* Image Section */}
        <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', position: 'sticky', top: '100px' }}>
          <img 
            src={car.images[0] || 'https://images.unsplash.com/photo-1503376712396-6e0a82b0128e?auto=format&fit=crop&q=80&w=1000'} 
            alt={car.model} 
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1503376712396-6e0a82b0128e?auto=format&fit=crop&q=80&w=1000' }}
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', aspectRatio: '16/9' }} 
          />
        </div>

        {/* Details Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div>
            <span style={{ color: 'var(--primary)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem' }}>{car.make} • {car.category}</span>
            <h1 style={{ fontSize: '4rem', letterSpacing: '-1.5px', marginBottom: '0.5rem', lineHeight: 1.1 }}>{car.model}</h1>
            <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent)', marginTop: '1rem' }}>₹{car.price.toLocaleString('en-IN')}</p>
          </div>

          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            {car.description}
          </p>

          <div className="glass" style={{ padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Horsepower</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 600 }}>{car.specs.horsepower} HP</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>0-100 km/h</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 600 }}>{car.specs.zeroToHundred}s</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Efficiency/Range</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 600 }}>{car.specs.rangeOrMpg}</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Drivetrain</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 600 }}>{car.specs.drivetrain}</p>
            </div>
          </div>

          <div>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 600 }}>Available Exterior Colors</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {car.colors.map(color => (
                <div key={color} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.05)', padding: '0.75rem 1.25rem', borderRadius: '30px', fontSize: '1rem', fontWeight: 500, border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: color.includes('Black') ? '#111' : color.includes('White') ? '#f8fafc' : color.includes('Red') ? '#dc2626' : color.includes('Blue') ? '#2563eb' : color.includes('Grey') || color.includes('Gray') ? '#6b7280' : color.includes('Green') ? '#059669' : color.includes('Bronze') ? '#b45309' : '#e5e7eb', boxShadow: '0 2px 5px rgba(0,0,0,0.5)' }} />
                  {color}
                </div>
              ))}
            </div>
          </div>

          <button className="btn-primary" style={{ padding: '1.25rem', fontSize: '1.2rem', marginTop: '1rem', boxShadow: '0 10px 25px rgba(99,102,241,0.5)' }}>
            <CheckCircle2 size={24} /> Reseve This Vehicle
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CarDetail;
