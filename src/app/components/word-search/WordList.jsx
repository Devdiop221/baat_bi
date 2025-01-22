import { motion } from "framer-motion";

export const WordList = ({ words, foundWords, theme, category }) => {
  const getCategoryTitle = () => {
    switch (category) {
      case 'dev':
        return 'Développement';
      case 'animaux':
        return 'Animaux';
      case 'fruits':
        return 'Fruits';
      default:
        return 'Mots';
    }
  };

  return (
      <div className={`mb-4 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
        <h3 className={`text-lg font-bold mb-2 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}>
          {getCategoryTitle()} à trouver : {foundWords.length}/{words.length}
        </h3>
        <div className="mb-6 flex flex-wrap gap-2 justify-center">
          {words.map((word) => (
              <motion.div
                  key={word}
                  className={`px-3 py-1 rounded-full text-sm
              ${foundWords.includes(word)
                      ? "bg-green-500 text-white"
                      : theme === "dark"
                          ? "bg-gray-700 text-gray-400"
                          : "bg-gray-100 text-gray-700"
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