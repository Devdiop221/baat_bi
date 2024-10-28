import { motion, AnimatePresence } from "framer-motion";

export const ScoreDisplay = ({ score, lastFoundWord }) => {
  return (
    <>
      <div className="text-center mt-4">
        <div className="text-2xl font-bold">Score: {score}</div>
        <AnimatePresence mode="wait">
          {lastFoundWord && (
            <motion.div
              key={lastFoundWord.word + Date.now()}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="text-green-500 font-bold"
            >
              +{lastFoundWord.score} points !
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                🎉
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
