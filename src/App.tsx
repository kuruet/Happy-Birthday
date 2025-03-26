import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Music, Music2, Sparkles, Heart, Stars, Gift, Cake, PartyPopper, SkipBack, SkipForward 
} from 'lucide-react';
import { Room } from './components/Room';
import { CakeCeremony } from './components/CakeCeremony';
import { FinalMessage } from './components/FinalMessage';
import { PhotoGallery } from './components/PhotoGallery';
import bgMusic from './components/music/tummile.mp3';

// Cartoonish animated background with bright gradients
function AnimatedBackground() {
  return (
    <motion.div
      className="absolute inset-0 z-0"
      animate={{
        background: [
          "linear-gradient(135deg, #FFEEAD, #FF6F69)",
          "linear-gradient(135deg, #FF6F69, #FFEEAD)",
          "linear-gradient(135deg, #FFEEAD, #FF6F69)"
        ]
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}

// Background ambient music component using shared audioRef
function BgMusic({ audioRef, isPlaying }) {
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
    }
  }, [audioRef]);

  useEffect(() => {
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => console.error('Audio playback failed:', error));
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, audioRef]);

  return null;
}

// Floating comic icons for a playful background vibe
function FloatingIcon({ Icon, delay }) {
  const initialX = Math.random() * 100;
  const initialY = Math.random() * 100;
  
  return (
    <motion.div
      initial={{ y: -20, opacity: 0, x: 0 }}
      animate={{
        y: [0, 20, 0],
        opacity: [0.2, 1, 0.2],
        x: [0, 10, 0]
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute"
      style={{
        left: `${initialX}%`,
        top: `${initialY}%`
      }}
    >
      <Icon className="text-[#FF6F69]" size={28} />
    </motion.div>
  );
}

// Cartoon-inspired SongCard with audio controls and progress bar
// Uses the shared audioRef passed via props.
function SongCard({ onSongChoice, audioRef }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setProgress(100);
    });
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      // Do not pause here, so that the shared audio continues playing.
    };
  }, [audioRef]);

  const togglePlay = () => {
    if (!isPlaying) {
      setShowProgressBar(true);
      audioRef.current.play();
      setIsPlaying(true);
      // Wait for 3 seconds then transition smoothly
      setTimeout(() => {
        onSongChoice();
      }, 3000);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSkipBackward = () => {
    audioRef.current.currentTime = 0;
  };

  const handleSkipForward = () => {
    audioRef.current.currentTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 10);
  };

  return (
    <motion.div 
      key="song-card"
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.8 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="bg-white p-6 rounded-2xl shadow-2xl border-4 border-dashed border-[#FF6F69] max-w-md w-full"
      style={{ fontFamily: 'Comic Neue, Comic Sans MS, cursive' }}
    >
      <div className="flex flex-col items-center">
        {/* Song Cover with overlay play/pause control */}
        <div className="w-48 h-48 mb-4 relative">
          <img 
            src="https://via.placeholder.com/300/FFEEAD/FF6F69?text=Cover" 
            alt="Song Cover" 
            className="w-full h-full object-cover rounded-lg" 
          />
          <motion.div 
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? (
              <Music2 size={48} className="text-white" />
            ) : (
              <Music size={48} className="text-white" />
            )}
          </motion.div>
        </div>
        {/* Song Info */}
        <div className="w-full text-center mb-4">
          <h3 className="text-2xl font-bold text-[#FF6F69]">Comic Birthday Anthem</h3>
          <p className="text-sm text-gray-700">The Birthday Band</p>
        </div>
        {/* Control Buttons */}
        <div className="flex items-center justify-center space-x-6 mb-4">
          <motion.button
            onClick={handleSkipBackward}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-gray-800"
          >
            <SkipBack size={32} />
          </motion.button>
          <motion.button
            onClick={togglePlay}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-gray-800"
          >
            {isPlaying ? <Music2 size={40} /> : <Music size={40} />}
          </motion.button>
          <motion.button
            onClick={handleSkipForward}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-gray-800"
          >
            <SkipForward size={32} />
          </motion.button>
        </div>
        {/* Progress Bar */}
        {showProgressBar && (
          <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#FF6F69] to-[#FFEEAD]" 
              style={{ width: `${progress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Main App component managing the experience stages
function App() {
  // Create a shared audioRef for bgMusic
  const audioRef = useRef(new Audio(bgMusic));

  const [stage, setStage] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [showSongMessage, setShowSongMessage] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [isLightOn, setIsLightOn] = useState(false);

  const initializeMusic = () => {
    if (!isMusicPlaying) setIsMusicPlaying(true);
  };

  const messages = [
    "Hey Superstar! Happy Birthday!",
    "Get ready for a wild, cartoon adventure...",
    "You’re the hero of this comic celebration!"
  ];

  const messageVariants = {
    initial: { opacity: 0, y: 40, scale: 0.9, filter: 'blur(8px)' },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      filter: 'blur(0px)',
      transition: { duration: 0.9, ease: "easeInOut", scale: { type: "spring", damping: 20, stiffness: 100 } }
    },
    exit: { opacity: 0, y: -30, scale: 0.95, filter: 'blur(4px)', transition: { duration: 0.6, ease: "easeInOut" } }
  };

  useEffect(() => {
    const messageTimer = setTimeout(() => {
      if (currentMessageIndex < messages.length - 1) {
        setCurrentMessageIndex(prev => prev + 1);
        if (currentMessageIndex === messages.length - 2) setShowButtons(true);
      }
    }, 3000);
    return () => clearTimeout(messageTimer);
  }, [currentMessageIndex, messages.length]);

  const handleButtonClick = () => setShowSongMessage(true);

  const handleSongChoice = () => {
    initializeMusic();
    setShowSongMessage(false);
    setShowFinalMessage(true);
    setTimeout(() => {
      setStage(1);
      setIsLightOn(true);
    }, 3000);
  };

  const toggleMusic = (e) => {
    e.stopPropagation();
    setIsMusicPlaying(prev => !prev);
  };

  const floatingIcons = [Stars, Gift, Cake, PartyPopper, Heart];

  const renderStage = () => {
    switch (stage) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen relative overflow-hidden"
            style={{ fontFamily: 'Comic Neue, Comic Sans MS, cursive' }}
          >
            <AnimatedBackground />

            <div className="absolute inset-0 z-10">
              {floatingIcons.map((Icon, index) =>
                Array.from({ length: 3 }).map((_, i) => (
                  <FloatingIcon key={`${index}-${i}`} Icon={Icon} delay={index * 0.4 + i * 0.2} />
                ))
              )}
            </div>

            <div className="relative z-20 flex items-center justify-center min-h-screen px-4">
              <AnimatePresence mode="wait">
                {!showSongMessage && !showFinalMessage ? (
                  <motion.div
                    key="message"
                    variants={messageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="bg-white p-12 rounded-2xl shadow-2xl border-4 border-dashed border-[#FF6F69] max-w-lg w-full text-center"
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      className="mb-8 flex justify-center"
                    >
                      <Sparkles className="text-[#FF6F69]" size={48} />
                    </motion.div>
                    <motion.p className="text-2xl font-bold text-[#FF6F69] mb-10">
                      {messages[currentMessageIndex]}
                    </motion.p>
                    {showButtons && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="flex justify-center space-x-6"
                      >
                        {['Let\'s Party!', 'Show Me The Fun!'].map((text) => (
                          <motion.button
                            key={text}
                            onClick={handleButtonClick}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 rounded-full font-medium transition transform bg-gradient-to-r from-[#FF6F69] to-[#FFEEAD] text-white shadow-md"
                          >
                            {text}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                ) : showSongMessage ? (
                  <SongCard onSongChoice={handleSongChoice} audioRef={audioRef} />
                ) : (
                  <motion.div
                    key="final"
                    variants={messageVariants}
                    initial="initial"
                    animate="animate"
                    className="bg-white p-12 rounded-2xl shadow-2xl border-4 border-dashed border-[#FF6F69] max-w-lg w-full text-center"
                  >
                    <motion.p
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className="text-2xl font-bold text-[#FF6F69]"
                    >
                      Time to kick off the comic adventure!
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );

      case 1:
        return <Room isLightOn={isLightOn} onComplete={() => setStage(2)} />;
      case 2:
        return <CakeCeremony onComplete={() => setStage(3)} />;
      case 3:
        return (
          <PhotoGallery 
            onComplete={() => setStage(4)} 
            stopBgMusic={() => setIsMusicPlaying(false)}
          />
        );
      case 4:
        return <FinalMessage />;
      default:
        return null;
    }
  };

  return (
    <div className="relative" style={{ fontFamily: 'Comic Neue, Comic Sans MS, cursive' }}>
      <motion.button
        className="fixed top-5 right-5 z-50 bg-white/80 backdrop-blur rounded-full p-3 shadow-lg border border-gray-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMusic}
      >
        {isMusicPlaying ? (
          <Music2 size={24} className="text-[#FF6F69]" />
        ) : (
          <Music size={24} className="text-gray-800" />
        )}
      </motion.button>

      <BgMusic audioRef={audioRef} isPlaying={isMusicPlaying} />

      <AnimatePresence mode="wait">{renderStage()}</AnimatePresence>
    </div>
  );
}

export default App;
