import React from "react";
import { selfBoardStateAction } from "../GameClientTypes";
import { guestBoardStateAction } from "../GameClientTypes";
export interface GameBoardPropType {
  selfBoardState?: string[];
  selfBoardStateDispatch?: React.Dispatch<selfBoardStateAction>;
  guestBoardState?: string[];
  guestBoardStateDispatch?: React.Dispatch<guestBoardStateAction>;
  type: string;
}
