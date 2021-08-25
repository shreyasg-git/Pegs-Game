const getNeighborsOfNeighbors = (coords: number[]) => {
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

const getNeighbors = (coords: number[]) => {
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

// const ge;

console.log("2, 5", getNeighbors([2, 5]));
console.log("3, 5", getNeighbors([3, 5]));
console.log("2, 6", getNeighbors([2, 6]));

const testGetNeighborsOfNeighbors = () => {
  if (getNeighborsOfNeighbors([1, 2]).flat().toString() === "1,4,3,2" + ",1,0") {
    // console.log("BRUHHH");
  }
};

testGetNeighborsOfNeighbors();

export {};
