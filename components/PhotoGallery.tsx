import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface PhotoGalleryProps {
  images: string[];
  onComplete: () => void;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ images, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      rotate: direction > 0 ? 5 : -5,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      rotate: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      rotate: direction < 0 ? 5 : -5,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    const nextIndex = currentIndex + newDirection;
    if (nextIndex >= 0 && nextIndex < images.length) {
      setDirection(newDirection);
      setCurrentIndex(nextIndex);
    } else if (nextIndex === images.length) {
      // User finished viewing all photos
      onComplete();
    }
  };

  return (
    <div className="w-full h-[500px] relative flex items-center justify-center overflow-hidden my-6">
        <div className="absolute inset-0 bg-christmas-red/5 rounded-3xl m-2 border-2 border-dashed border-christmas-gold/30"></div>
        
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute w-[85%] h-[90%] bg-white p-3 shadow-2xl rounded-xl rotate-1 flex flex-col"
        >
          <div className="w-full flex-1 relative overflow-hidden rounded-lg bg-gray-900 flex items-center justify-center isolate">
             {currentIndex < images.length && (
               <>
                 {/* Blurred background for fill, ensuring theme consistency */}
                 <img
                   src={images[currentIndex]}
                   alt=""
                   className="absolute inset-0 w-full h-full object-cover opacity-60 blur-xl scale-110 -z-10"
                 />
                 {/* Main image with aspect ratio preserved */}
                 <img
                   src={images[currentIndex]}
                   alt={`Memory ${currentIndex + 1}`}
                   className="w-full h-full object-contain pointer-events-none z-10 drop-shadow-lg"
                 />
               </>
             )}
          </div>
          {/* Polaroid-style label effect */}
          <div className="pt-3 pb-1 text-center font-script text-2xl text-gray-600">
             Memory #{currentIndex + 1}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls for non-touch devices or clear guidance */}
      <div className="absolute bottom-0 w-full flex justify-center gap-8 py-2 z-20">
        <button 
            onClick={() => paginate(-1)}
            disabled={currentIndex === 0}
            className={`p-2 rounded-full bg-white/80 shadow-md ${currentIndex === 0 ? 'opacity-30' : 'opacity-100'}`}
        >
            <ChevronLeft className="text-christmas-dark" />
        </button>
        <button 
            onClick={() => paginate(1)}
            disabled={currentIndex >= images.length}
             className="p-2 rounded-full bg-white/80 shadow-md"
        >
            <ChevronRight className="text-christmas-dark" />
        </button>
      </div>
    </div>
  );
};

export default PhotoGallery;