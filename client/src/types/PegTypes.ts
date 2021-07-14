export enum PegTypes {
  EmptySlot = 0,
  FilledSlot,
  DroppableEmptySlot,
  DeletePeg,
  SelectedPeg,
  InvisiblePeg,
}
// export enum PegTypes {
//   EmptySlot = "EmptySlot",
//   FilledSlot = "FilledSlot",
//   DroppableEmptySlot = "DroppableEmptySlot",
//   DeletePeg = "DeletePeg",
//   SelectedPeg = "SelectedPeg",
//   InvisiblePeg = "InvisiblePeg",
// }

export const intToPegTypeLookUp = [
  "EmptySlot", // 0
  "FilledSlot", // 1
  "DroppableEmptySlot", //2
  "DeletePeg", // 3
  "SelectedPeg", //4
  "InvisiblePeg", // 5
];
