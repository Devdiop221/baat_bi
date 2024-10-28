"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { WordGrid } from "./WordGrid";
import { WordList } from "./WordList";
import { ScoreDisplay } from "./ScoreDisplay";

const WordSearchGame = () => {
  const { theme, setTheme } = useTheme();
  const gridSize = 20;
  const [grid, setGrid] = useState(
    Array(gridSize).fill(Array(gridSize).fill(""))
  );
  const [words] = useState([
    "NEXTJS",
    "REACT",
    "TAILWIND",
    "TYPESCRIPT",
    "JAVASCRIPT",
    "HTML",
    "CSS",
    "FRONTEND",
    "BACKEND",
    "DATABASE",
    "API",
    "ROUTER",
    "COMPONENT",
    "HOOK",
    "STATE",
    "PROPS",
    "SERVER",
    "CLIENT",
    "RENDER",
    "BUILD",
  ]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [foundCells, setFoundCells] = useState([]);
  const [score, setScore] = useState(0);
  const [lastFoundWord, setLastFoundWord] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const createEmptyGrid = () => {
    return Array(gridSize)
      .fill(null)
      .map(() => Array(gridSize).fill(""));
  };

  const isValidPosition = (x, y, dx, dy, length) => {
    const endX = x + (length - 1) * dx;
    const endY = y + (length - 1) * dy;
    return endX >= 0 && endX < gridSize && endY >= 0 && endY < gridSize;
  };

  const canPlaceWord = (word, grid, direction, startX, startY) => {
    const [dx, dy] = direction;

    for (let i = 0; i < word.length; i++) {
      const x = startX + i * dx;
      const y = startY + i * dy;
      const currentCell = grid[x][y];
      if (currentCell !== "" && currentCell !== word[i]) {
        return false;
      }
    }
    return true;
  };

  const placeWord = (word, grid, direction, startX, startY) => {
    const [dx, dy] = direction;
    const newGrid = grid.map((row) => [...row]);

    for (let i = 0; i < word.length; i++) {
      const x = startX + i * dx;
      const y = startY + i * dy;
      newGrid[x][y] = word[i];
    }
    return newGrid;
  };

  const fillEmptyCells = (grid) => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return grid.map((row) =>
      row.map((cell) =>
        cell === ""
          ? letters.charAt(Math.floor(Math.random() * letters.length))
          : cell
      )
    );
  };

  const initializeGrid = () => {
    let grid = createEmptyGrid();
    const directions = [
      [1, 0],
      [0, 1],
      [1, 1],
      [-1, 1],
    ];

    const sortedWords = [...words].sort((a, b) => b.length - a.length);

    for (const word of sortedWords) {
      let placed = false;
      let attempts = 0;
      const maxAttempts = 100;

      while (!placed && attempts < maxAttempts) {
        const direction =
          directions[Math.floor(Math.random() * directions.length)];
        const startX = Math.floor(Math.random() * gridSize);
        const startY = Math.floor(Math.random() * gridSize);

        if (
          isValidPosition(
            startX,
            startY,
            direction[0],
            direction[1],
            word.length
          ) &&
          canPlaceWord(word, grid, direction, startX, startY)
        ) {
          grid = placeWord(word, grid, direction, startX, startY);
          placed = true;
        }

        attempts++;
      }

      if (!placed) {
        console.warn(`Impossible de placer le mot: ${word}`);
      }
    }

    return fillEmptyCells(grid);
  };

  const calculateWordScore = (word) => {
    return word.length * 10;
  };



  const areAdjacent = (cell1, cell2) => {
    const [x1, y1] = cell1;
    const [x2, y2] = cell2;
    const dx = Math.abs(x1 - x2);
    const dy = Math.abs(y1 - y2);
    return dx <= 1 && dy <= 1 && !(dx === 0 && dy === 0);
  };

  const handleCellClick = (x, y) => {
    if (selectedCells.length > 0) {
      const lastCell = selectedCells[selectedCells.length - 1];
      if (!areAdjacent(lastCell, [x, y])) {
        return;
      }
    }

    if (selectedCells.some(([sx, sy]) => sx === x && sy === y)) {
      return;
    }

    const newSelectedCells = [...selectedCells, [x, y]];
    setSelectedCells(newSelectedCells);

    const selectedWord = newSelectedCells.map(([x, y]) => grid[x][y]).join("");
    if (words.includes(selectedWord) && !foundWords.includes(selectedWord)) {
      const wordScore = selectedWord.length * 10;
      setScore((prev) => prev + wordScore);
      setFoundWords((prev) => [...prev, selectedWord]);
      setFoundCells((prev) => [...prev, newSelectedCells]);
      setLastFoundWord({ word: selectedWord, score: wordScore });

      setTimeout(() => {
        setSelectedCells([]);
      }, 500);
    }
  };

  const startNewGame = () => {
    const newGrid = initializeGrid();
    setGrid(newGrid);
    setSelectedCells([]);
    setFoundWords([]);
    setFoundCells([]);
    setScore(0);
    setLastFoundWord(null);
  };

  useEffect(() => {
    setMounted(true);
    startNewGame();
  }, []);

  if (!mounted) return null;

  return (
    <Card className="w-full max-w-4xl mx-auto font-mono">
      <CardHeader className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="h-6 w-6" />
          ) : (
            <Moon className="h-6 w-6" />
          )}
        </Button>
        <CardTitle className="text-center text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          Mots Mêlés
        </CardTitle>
        <ScoreDisplay score={score} lastFoundWord={lastFoundWord} />
      </CardHeader>
      <CardContent>
        <WordList words={words} foundWords={foundWords} />
        <WordGrid
          grid={grid}
          selectedCells={selectedCells}
          foundCells={foundCells}
          onCellClick={handleCellClick}
        />

        <Button
          onClick={startNewGame}
          className="mt-4 mx-auto block bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          Nouvelle partie
        </Button>

        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          Conseil : Sélectionnez les lettres une par une pour former le mot
        </div>
      </CardContent>
    </Card>
  );
};

export default WordSearchGame;
