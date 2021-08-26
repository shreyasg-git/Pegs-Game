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

// does not give a neighbor if neighborofneighbor corres to it is out of gameboard (>6)
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

// gives neighbor even if neighborofneighbor corres to it is out of gameboard (>6)
// specially designed for FILLED SLOT CREATION : CASE II
export const getNeighborsIgnoreEdges = (coords: number[]) => {
  const neighbors = [];

  //   top
  coords[0] - 1 >= 0 ? neighbors.push([coords[0] - 1, coords[1]]) : neighbors.push([6, 6]);
  // if (coords[0] - 1 >= 0) neighbors.push([coords[0] - 1, coords[1]]);
  //   right
  coords[1] + 1 <= 6 ? neighbors.push([coords[0], coords[1] + 1]) : neighbors.push([6, 6]);
  // if (coords[1] + 1 <= 6) neighbors.push([coords[0], coords[1] + 1]);
  //   bottom
  coords[0] + 1 <= 6 ? neighbors.push([coords[0] + 1, coords[1]]) : neighbors.push([6, 6]);
  // if (coords[0] + 1 <= 6) neighbors.push([coords[0] + 1, coords[1]]);
  //   left
  coords[1] - 1 >= 0 ? neighbors.push([coords[0], coords[1] - 1]) : neighbors.push([6, 6]);
  // if (coords[1] - 1 >= 0) neighbors.push([coords[0], coords[1] - 1]);

  // [6,6] here is used just to avoid undefined errors...if the neighbor is out of the board then while checking it was giving undefined error. now it points to [6, 6] but game is not affected because [6, 6] is InvisiblePeg so the checks are not passed.

  return neighbors;
};

// TODO:
// FIXME:
