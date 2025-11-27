import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Heart } from 'lucide-react';
import { CORRECT_MONTH, CORRECT_DAY } from '../constants';

interface LockScreenProps {
  onUnlock: () => void;
}

const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [date, setDate] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;

    // Parse YYYY-MM-DD directly to avoid timezone issues with new Date()
    const [yearStr, monthStr, dayStr] = date.split('-');
    const month = parseInt(monthStr, 10);
    const day = parseInt(dayStr, 10);

    if (month === CORRECT_MONTH && day === CORRECT_DAY) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000); // Reset shake after 2s
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-christmas-dark text-christmas-cream p-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-xs text-center space-y-8"
      >
        <div className="flex justify-center mb-4">
          <div className="bg-christmas-red p-4 rounded-full shadow-lg shadow-christmas-red/50 border-2 border-christmas-gold">
            <Lock className="w-8 h-8 text-white" />
          </div>
        </div>

        <h1 className="font-script text-5xl text-christmas-gold drop-shadow-md">
          Our Story
        </h1>

        <motion.form 
          onSubmit={handleSubmit}
          animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
          className="space-y-6 bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-christmas-gold/30 shadow-2xl"
        >
          <div className="space-y-2">
            <label className="block text-sm font-sans font-light tracking-wider opacity-90">
              우리의 1일은?
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-white/90 text-gray-800 p-3 rounded-lg outline-none focus:ring-2 focus:ring-christmas-gold text-center font-sans"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-christmas-green hover:bg-green-800 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4 fill-current" />
            <span>Enter Love</span>
          </button>
        </motion.form>

        <p className="text-xs opacity-60 font-sans font-light">
          Hint: 우리의 1일은?
        </p>
      </motion.div>
    </div>
  );
};

export default LockScreen;