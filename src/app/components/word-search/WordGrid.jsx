import { Cell } from "./WordCell";

export const WordGrid = ({ grid, selectedCells, onCellClick, foundCells }) => {
  return (
    <div
      className="grid gap-1"
      style={{
        gridTemplateColumns: `repeat(${grid[0].length}, minmax(0, 1fr))`,
      }}
    >
      {grid.map((row, x) =>
        row.map((letter, y) => {
          const isSelected = selectedCells.some(
            ([sx, sy]) => sx === x && sy === y
          );
          const isFound = foundCells.some((cells) =>
            cells.some(([fx, fy]) => fx === x && fy === y)
          );
          return (
            <Cell
              key={`${x}-${y}`}
              letter={letter}
              isSelected={isSelected}
              isFound={isFound}
              onClick={() => onCellClick(x, y)}
              position={{ x, y }}
            />
          );
        })
      )}
    </div>
  );
};
