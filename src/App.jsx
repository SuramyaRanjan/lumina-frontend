import React, { useState } from 'react';
import axios from 'axios';
import { ArrowRight, Loader2, CheckCircle, Globe, Target, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [url, setUrl] = useState('');
  const [adContent, setAdContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // IMPORTANT: Replace the URL below with your actual Render URL after deployment
  const BACKEND_URL = 'https://lumina-backend.onrender.com'; 

  const handlePersonalize = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const response = await axios.post(`${BACKEND_URL}/personalize`, {
        url,
        ad_content: adContent,
      });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Server connection failed. Make sure your backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-black text-white w-9 h-9 flex items-center justify-center rounded-xl font-bold shadow-lg">L</div>
            <span className="text-xl font-bold tracking-tight">Lumina</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <button className="bg-black text-white px-5 py-2 rounded-xl font-medium hover:bg-gray-800 transition-all active:scale-95 shadow-md">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.1] mb-6">
            Smart Landing Pages that <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Convert</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed">
            Instantly personalize your landing page copy based on ad intent. Stop losing leads to generic headlines.
          </p>
          <div className="flex flex-wrap gap-5 text-sm font-semibold text-gray-500">
            <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100"><CheckCircle size={16} className="text-green-500"/> Ultra Fast</span>
            <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100"><CheckCircle size={16} className="text-green-500"/> No Code</span>
            <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100"><CheckCircle size={16} className="text-green-500"/> AI Powered</span>
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-gray-200 border border-gray-100"
        >
          <form onSubmit={handlePersonalize} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2 ml-1">
                <Globe size={14}/> Target URL
              </label>
              <input
                type="url"
                required
                placeholder="https://example.com"
                className="w-full border-2 border-gray-50 bg-gray-50 rounded-2xl p-4 focus:bg-white focus:border-black focus:ring-0 outline-none transition-all"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2 ml-1">
                <Target size={14}/> Campaign Hook
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 50% discount for first-time buyers"
                className="w-full border-2 border-gray-50 bg-gray-50 rounded-2xl p-4 focus:bg-white focus:border-black focus:ring-0 outline-none transition-all"
                value={adContent}
                onChange={(e) => setAdContent(e.target.value)}
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-black text-white py-4 rounded-2xl font-bold flex justify-center items-center gap-3 hover:bg-gray-800 transition-all shadow-xl shadow-gray-200 disabled:opacity-50 active:scale-[0.98]"
            >
              {loading ? (
                <><Loader2 className="animate-spin" size={20}/> Optimizing...</>
              ) : (
                <><Sparkles size={18}/> Generate Optimization</>
              )}
            </button>
          </form>

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm font-medium mt-4 text-center">
              {error}
            </motion.p>
          )}
        </motion.div>
      </section>

      {/* Results Section */}
      <AnimatePresence>
        {result && (
          <section className="max-w-6xl mx-auto px-6 pb-24">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {/* Control */}
              <div className="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm group hover:border-gray-300 transition-all">
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 bg-gray-100 inline-block px-3 py-1 rounded-full">Control</div>
                <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 tracking-wider">Original Headline</h3>
                <h2 className="text-2xl font-bold mb-3 text-gray-800">{result.original.h1}</h2>
                <p className="text-gray-500 leading-relaxed">{result.original.subheadline}</p>
              </div>

              {/* Optimized */}
              <div className="bg-black text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
                  <Sparkles size={80}/>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-6 bg-white/10 inline-block px-3 py-1 rounded-full">AI Optimized</div>
                <h3 className="text-sm font-bold text-indigo-300 uppercase mb-4 tracking-wider">Personalized Variant</h3>
                <h2 className="text-2xl font-bold mb-3 leading-tight tracking-tight">{result.personalized.headline}</h2>
                <p className="text-gray-400 leading-relaxed">{result.personalized.subheadline}</p>
                
                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                   <div className="flex items-center gap-2 text-xs font-bold text-green-400 uppercase">
                     <CheckCircle size={14}/> Higher Relevance
                   </div>
                   <ArrowRight className="text-white/20" size={20}/>
                </div>
              </div>
            </motion.div>
          </section>
        )}
      </AnimatePresence>

      <footer className="text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-400 py-12 border-t border-gray-200">
        Lumina Engine © 2026 • Optimized for High-Growth Teams
      </footer>
    </div>
  );
}