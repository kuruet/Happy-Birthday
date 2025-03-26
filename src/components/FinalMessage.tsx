// import React from 'react';
// import { motion } from 'framer-motion';
// import { Heart } from 'lucide-react';

// export const FinalMessage: React.FC = () => {
//   return (
//     <motion.div
//       className="min-h-screen bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center p-8"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//     >
//       <motion.div
//         className="max-w-2xl bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl"
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ delay: 0.3 }}
//       >
//         <motion.div
//           animate={{ scale: [1, 1.2, 1] }}
//           transition={{ repeat: Infinity, duration: 2 }}
//           className="flex justify-center mb-6"
//         >
//           <Heart className="text-pink-500" size={48} fill="currentColor" />
//         </motion.div>

//         <h1 className="text-4xl font-bold text-center text-pink-600 mb-6">
//           Happy Birthday Madam Jii!!
//         </h1>

//         <p className="text-lg text-gray-700 leading-relaxed font-semibold text-center">
//           Thanks for coming into my life, and making it better with your presence. 
//         </p>

//         <div className="text-center mt-8 text-2xl">
//           ilysm
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const FinalMessage: React.FC = () => {
  // The component goes through phases: "postcards" -> "game" -> "final"
  const [phase, setPhase] = useState<"postcards" | "game" | "final">("postcards");

  // Postcard messages array
  const postcards = [
    "Remember that crazy road trip? You made every mile hilarious!",
    "Your laughter is my favorite soundtrack.",
    "Every moment with you is like a scene from a comic book adventure!",
  ];

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ fontFamily: 'Comic Neue, Comic Sans MS, cursive' }}
      // Use the same gradient as in the PhotoGallery
      style={{ background: "linear-gradient(135deg, #FFEEAD, #FAD0C4, #FBC2EB)", fontFamily: 'Comic Neue, Comic Sans MS, cursive' }}
    >
      {phase === "postcards" && (
        <motion.div
          className="max-w-3xl bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl mb-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-4xl font-bold text-center text-red-600 mb-6">
            Special Postcards Just for You!
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {postcards.map((msg, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-4 rounded-lg shadow-md border border-red-200"
                initial={{ rotate: -3 }}
                animate={{ rotate: [ -3, 3, -3 ] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-center text-gray-800 font-medium text-sm">
                  {msg}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-purple-600 text-white rounded-full shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPhase("game")}
            >
              Proceed to the Heart Game!
            </motion.button>
          </div>
        </motion.div>
      )}

      {phase === "game" && (
        <motion.div
          className="flex flex-col items-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Catch the Heart to Reveal the Final Message!
          </h2>
          <motion.div
            className="cursor-pointer"
            animate={{
              // A smoother interactive bounce effect
              x: [0, 50, -50, 0],
              y: [0, -30, 30, 0],
              scale: [1, 1.1, 1, 1.05, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            onClick={() => setPhase("final")}
          >
            <Heart size={90} className="text-red-400" />
          </motion.div>
          <p className="mt-4 text-white font-semibold">
            Click the bouncing heart!
          </p>
        </motion.div>
      )}

      {phase === "final" && (
        <motion.div
          className="max-w-2xl bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex justify-center mb-6"
          >
            <Heart className="text-red-400" size={48} fill="currentColor" />
          </motion.div>
          <h1 className="text-4xl font-bold text-center text-red-600 mb-6">
            Happy Birthday Madam Jii!!
          </h1>
          <p className="text-lg text-gray-800 leading-relaxed font-semibold text-center">
            Thanks for lighting up my world with your laughter, love, and endless inspiration.
          </p>
          <div className="text-center mt-8 text-2xl font-bold text-red-500">
            ilysm
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
