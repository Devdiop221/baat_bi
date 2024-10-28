import { motion } from "framer-motion";

export const WordList = ({ words, foundWords }) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-bold mb-2">
        Mots à trouver : {foundWords.length}/{words.length}
      </h3>
      <div className="mb-6 flex flex-wrap gap-2 justify-center">
        {words.map((word) => (
          <motion.div
            key={word}
            className={`px-3 py-1 rounded-full text-sm
          ${
            foundWords.includes(word)
              ? "bg-green-500 text-white"
              : "bg-gray-100 dark:bg-gray-800"
          }`}
            animate={
              foundWords.includes(word)
                ? {
                    scale: [1, 1.1, 1],
                    backgroundColor: ["#9333EA", "#22C55E"],
                  }
                : {}
            }
            transition={{ duration: 0.5 }}
          >
            {word}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
