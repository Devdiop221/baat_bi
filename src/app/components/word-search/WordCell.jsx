import { motion } from "framer-motion";

export const Cell = ({ letter, isSelected, isFound, onClick }) => {
  return (
    <motion.div
      className={`w-8 h-8 flex items-center justify-center cursor-pointer select-none
      ${isSelected ? "bg-purple-500 text-white" : "bg-transparent"}
      ${isFound ? "text-green-500 font-bold" : ""}
      hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors
      border border-gray-200 dark:border-gray-700`}
      onClick={onClick}
      initial={isFound ? { scale: 1 } : false}
      animate={
        isFound
          ? {
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }
          : false
      }
      transition={{ duration: 0.5 }}
    >
      {letter}
    </motion.div>
  );
};
