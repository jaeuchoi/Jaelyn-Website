import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import LockScreen from './components/LockScreen';
import PhotoGallery from './components/PhotoGallery';
import VideoReveal from './components/VideoReveal';
import { IMAGE_URLS, VIDEO_URL } from './constants';

const App: React.FC = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [galleryCompleted, setGalleryCompleted] = useState(false);
  
  const videoSectionRef = useRef<HTMLDivElement>(null);

  const handleUnlock = () => {
    setIsLocked(false);
  };

  const handleRevealVideo = () => {
    setShowVideo(true);
    // Smooth scroll to video after a short delay to allow render
    setTimeout(() => {
        videoSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  if (isLocked) {
    return <LockScreen onUnlock={handleUnlock} />;
  }

  return (
    <div className="min-h-screen w-full bg-christmas-cream font-sans text-christmas-dark">
      {/* Mobile container - centers content on large screens, full width on mobile */}
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl relative border-x-8 border-christmas-green/80 overflow-y-auto overflow-x-hidden">
        
        {/* Decorative Top Border (Christmas Lights imitation) */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-christmas-dark flex justify-around items-start pt-1 z-20">
            {[...Array(8)].map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-christmas-red animate-pulse' : 'bg-christmas-gold'}`} style={{ boxShadow: `0 0 10px ${i % 2 === 0 ? '#D42426' : '#F8B229'}`}}></div>
            ))}
        </div>

        {/* Header */}
        <header className="pt-12 pb-6 px-4 flex items-center justify-center space-x-2 bg-gradient-to-b from-christmas-green/10 to-transparent">
          <span className="text-xl font-bold tracking-widest uppercase text-christmas-dark">Jaeu</span>
          <div className="relative flex flex-col items-center justify-center text-christmas-red">
            <Heart className="w-14 h-14 fill-current animate-pulse" />
            <span className="absolute text-[10px] font-bold text-white mt-1">50 days</span>
          </div>
          <span className="text-xl font-bold tracking-widest uppercase text-christmas-dark">SeungYi</span>
        </header>

        <main className="px-4 pb-20 space-y-8">
          {/* Introduction Text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center font-script text-3xl text-christmas-green mb-8"
          >
            Our Precious Moments
          </motion.div>

          {/* Photo Gallery */}
          <PhotoGallery 
            images={IMAGE_URLS} 
            onComplete={() => setGalleryCompleted(true)} 
          />

          {/* Reveal Button - Only shows after interaction or by default if preferred, but user asked for it at bottom */}
          <div className="flex justify-center py-8">
             <AnimatePresence>
                {!showVideo && (
                    <motion.button
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleRevealVideo}
                        className="relative group cursor-pointer"
                    >
                        {/* Ribbon Graphics via CSS */}
                        <div className="absolute top-0 left-0 w-full h-full bg-christmas-red transform skew-x-12 rounded-sm shadow-lg"></div>
                        <div className="absolute top-0 left-0 w-full h-full bg-christmas-red transform -skew-x-12 rounded-sm shadow-lg"></div>
                        
                        <div className="relative bg-gradient-to-r from-red-600 to-christmas-red px-10 py-4 z-10 text-christmas-gold font-script text-3xl border-2 border-christmas-gold shadow-xl rounded-sm">
                            letter from J to J.
                        </div>
                        
                        {/* Ribbon Ends */}
                        <div className="absolute top-1/2 -left-4 w-8 h-8 bg-red-800 transform rotate-45 -z-0"></div>
                        <div className="absolute top-1/2 -right-4 w-8 h-8 bg-red-800 transform rotate-45 -z-0"></div>
                    </motion.button>
                )}
             </AnimatePresence>
          </div>

          {/* Video Section */}
          <div ref={videoSectionRef}>
              <AnimatePresence>
                {showVideo && (
                    <VideoReveal videoUrl={VIDEO_URL} />
                )}
              </AnimatePresence>
          </div>
        </main>
        
        {/* Footer Decoration */}
        <div className="bg-christmas-dark text-christmas-cream/50 text-center py-4 text-xs font-light">
            Made with Love for D+50 Anniversary
        </div>
      </div>
    </div>
  );
};

export default App;
