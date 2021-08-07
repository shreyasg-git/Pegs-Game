// const forbiddenCoords = [
//   [0, 0],
//   [0, 1],
//   [1, 0],
//   [1, 1],
//   [0, 5],
//   [0, 6],
//   [1, 5],
//   [1, 6],
//   [5, 0],
//   [5, 1],
//   [6, 0],
//   [6, 1],
//   [5, 5],
//   [5, 6],
//   [6, 5],
//   [6, 6],
// ];

export const getNeighborsOfNeighbors = (coords: number[]) => {
  const neighborsOfNeighbors = [];

  //   top
  if (coords[0] - 2 >= 0) neighborsOfNeighbors.push([coords[0] - 2, coords[1]]);
  //   right
  if (coords[1] + 2 <= 6) neighborsOfNeighbors.push([coords[0], coords[1] + 2]);
  //   bottom
  if (coords[0] + 2 <= 6) neighborsOfNeighbors.push([coords[0] + 2, coords[1]]);
  //   left
  if (coords[1] - 2 >= 0) neighborsOfNeighbors.push([coords[0], coords[1] - 2]);

  return neighborsOfNeighbors;
};

export const getNeighbors = (coords: number[]) => {
  const neighbors = [];

  //   top
  if (coords[0] - 2 >= 0) neighbors.push([coords[0] - 1, coords[1]]);
  //   right
  if (coords[1] + 2 <= 6) neighbors.push([coords[0], coords[1] + 1]);
  //   bottom
  if (coords[0] + 2 <= 6) neighbors.push([coords[0] + 1, coords[1]]);
  //   left
  if (coords[1] - 2 >= 0) neighbors.push([coords[0], coords[1] - 1]);

  return neighbors;
};
