import { Link } from 'react-router-dom';
import { CarFront, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="glass" 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000, 
        margin: '16px 24px', 
        padding: '16px 24px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}
    >
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ background: 'linear-gradient(135deg, var(--primary), #8b5cf6)', padding: '8px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(99,102,241,0.3)' }}>
          <CarFront color="white" size={24} />
        </div>
        <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
          Lumina<span className="text-gradient">Drive</span>
        </span>
      </Link>
      
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <Link to="/cars" style={{ fontWeight: 500, opacity: 0.9, transition: 'opacity 0.2s' }} onMouseOver={(e) => e.target.style.opacity = 1} onMouseOut={(e) => e.target.style.opacity = 0.9}>
          Inventory
        </Link>
        <Link to="/recommend" className="btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.95rem' }}>
          <Sparkles size={16} /> AI Match
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
