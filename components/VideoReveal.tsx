import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VideoRevealProps {
  videoUrl: string;
}

const VideoReveal: React.FC<VideoRevealProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Auto-play prevented:", e));
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="w-full flex flex-col items-center space-y-8 pb-12"
    >
      {/* Changed aspect ratio from aspect-[9/16] to aspect-video (16:9) for horizontal videos */}
      <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-[0_0_20px_rgba(248,178,41,0.5)] border-4 border-christmas-gold">
        <video
          ref={videoRef}
          src={videoUrl}
          controls
          className="w-full h-full object-contain"
          playsInline
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-center space-y-4 px-4"
      >
        <p className="font-script text-4xl md:text-5xl text-christmas-gold leading-relaxed drop-shadow-md">
            Congratulations on our D+50,<br/>
            and may this relationship diverge to D+infinity...
        </p>
      </motion.div>
    </motion.div>
  );
};

export default VideoReveal;