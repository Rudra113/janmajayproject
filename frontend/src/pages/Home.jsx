import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';

const Home = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
      {/* Hero Section */}
      <section style={{ 
        minHeight: '70vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{ position: 'absolute', top: '10%', left: '20%', width: '300px', height: '300px', background: 'var(--primary)', filter: 'blur(100px)', opacity: 0.2, borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '20%', width: '300px', height: '300px', background: 'var(--accent)', filter: 'blur(100px)', opacity: 0.2, borderRadius: '50%' }} />
        
        <motion.div 
          initial={{ y: 30, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.8 }}
          style={{ maxWidth: '800px', zIndex: 1 }}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', padding: '6px 16px', borderRadius: '30px', color: 'var(--primary)', fontWeight: 600, marginBottom: '1.5rem' }}
          >
            <Sparkles size={16} /> AI-Powered Recommendations
          </motion.div>
          <h1 style={{ fontSize: '4.5rem', marginBottom: '1.5rem', letterSpacing: '-2px' }}>
            Find Your <span className="text-gradient">Perfect Drive</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.6, maxWidth: '650px', margin: '0 auto 2.5rem auto' }}>
            Discover the ideal vehicle tailored to your lifestyle. Our intelligent recommendation engine matches you with premium cars based on your unique preferences.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/recommend" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              Find My Car <ArrowRight size={20} />
            </Link>
            <Link to="/cars" className="btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              Browse Inventory
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        {[
          { icon: <Zap size={32} color="var(--primary)" />, title: 'Smart Matching', desc: 'Our AI analyzes your needs to find the exact make and model that fits your lifestyle.' },
          { icon: <Shield size={32} color="var(--accent)" />, title: 'Premium Selection', desc: 'Browse an exclusive inventory of high-end luxury, sports, and electric vehicles.' },
          { icon: <Sparkles size={32} color="#f59e0b" />, title: 'Tailored Experience', desc: 'Answer a few simple questions and let our algorithm handle the complex research.' }
        ].map((feature, i) => (
          <motion.div 
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 + (i * 0.1), duration: 0.5 }}
            className="glass" 
            whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
            style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'all 0.3s' }}
          >
            <div style={{ background: 'rgba(255,255,255,0.05)', width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {feature.icon}
            </div>
            <h3 style={{ fontSize: '1.5rem' }}>{feature.title}</h3>
            <p style={{ color: 'var(--text-muted)' }}>{feature.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default Home;
