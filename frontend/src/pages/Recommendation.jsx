import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Loader, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Recommendation = () => {
  const [preferences, setPreferences] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!preferences.trim()) return;
    
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/cars/recommend', { preferences });
      setTimeout(() => {
        setResults(res.data);
        setLoading(false);
      }, 1500); // Artificial delay to simulate AI thinking
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', paddingTop: '2rem' }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        <div style={{ display: 'inline-flex', padding: '16px', borderRadius: '50%', background: 'rgba(99,102,241,0.1)', marginBottom: '1.5rem', boxShadow: '0 0 30px rgba(99,102,241,0.2)' }}>
          <Sparkles size={40} color="var(--primary)" />
        </div>
        <h1 style={{ fontSize: '3.5rem', letterSpacing: '-1.5px', marginBottom: '1rem' }}>
          AI <span className="text-gradient">Matchmaker</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem' }}>
          Tell us about your lifestyle, dream features, or budget, and our intelligent engine will find your perfect match.
        </p>
      </motion.div>

      <motion.div className="glass" style={{ padding: '3rem', borderRadius: '24px', marginBottom: '4rem', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '1.2rem', fontWeight: 600, marginBottom: '1.25rem', color: 'var(--text-main)' }}>
              What are you looking for in a vehicle?
            </label>
            <textarea 
              className="input-premium"
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              placeholder="e.g., 'I want a fast electric car for weekend drives' or 'I need a spacious luxury SUV for my family under ₹90,00,000'"
              style={{ minHeight: '160px', resize: 'vertical', fontSize: '1.1rem', lineHeight: 1.6 }}
            />
          </div>
          
          <button 
            type="submit" 
            className="btn-primary" 
            disabled={loading || !preferences.trim()}
            style={{ 
              alignSelf: 'flex-end', 
              padding: '1.25rem 3rem', 
              fontSize: '1.1rem',
              opacity: (!preferences.trim() || loading) ? 0.7 : 1,
              cursor: (!preferences.trim() || loading) ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? (
              <><Loader size={20} className="animate-spin" style={{ animation: 'spin 1.5s linear infinite' }} /> Analyzing Preferences...</>
            ) : (
              <><Sparkles size={20} /> Discover My Match</>
            )}
          </button>
        </form>
      </motion.div>

      <AnimatePresence>
        {results && !loading && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass"
            style={{ padding: '3rem', borderRadius: '24px', background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.3)' }}
          >
            <h2 style={{ fontSize: '2.25rem', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--accent)', letterSpacing: '-0.5px' }}>
              <CheckCircle2 size={32} /> We Found Your Matches
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {results.length > 0 ? results.map((car, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  key={car._id} 
                  style={{ display: 'flex', gap: '2.5rem', background: 'rgba(15,23,42,0.9)', padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', alignItems: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
                >
                  <img 
                    src={car.images[0] || 'https://images.unsplash.com/photo-1503376712396-6e0a82b0128e?auto=format&fit=crop&q=80&w=1000'} 
                    alt={car.model} 
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1503376712396-6e0a82b0128e?auto=format&fit=crop&q=80&w=1000' }}
                    style={{ width: '220px', height: '140px', objectFit: 'cover', borderRadius: '12px' }} 
                  />
                  <div style={{ flexGrow: 1 }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>{car.make}</span>
                    <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>{car.model}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>{car.category} • <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>₹{car.price.toLocaleString('en-IN')}</span></p>
                  </div>
                  <Link 
                    to={`/cars/${car._id}`} 
                    state={{ dynamicCar: car }}
                    className="btn-secondary" 
                    style={{ padding: '1rem 2rem' }}
                  >
                    View <ArrowRight size={18} />
                  </Link>
                </motion.div>
              )) : (
                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>No perfect matches found for those criteria. Try adjusting your preferences.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Recommendation;
