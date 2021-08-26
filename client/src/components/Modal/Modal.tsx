import React from "react";
import "./Modal.scss";

type ModalPropsType = {
  closeFunction: Function;
  newGame: Function;
};

const Modal: React.FC<ModalPropsType> = ({ closeFunction, newGame }) => {
  return (
    <div className="modal">
      <div className="modal-body">
        <div
          className="close-btn"
          onClick={() => {
            closeFunction();
          }}
        >
          X
        </div>
        <h1>Game Over!!!</h1>
        <br />
        You have ran out of moves :D
      </div>
      <div
        className="new-game-btn"
        onClick={() => {
          newGame();
        }}
      >
        New Game
      </div>
    </div>
  );
};

export default Modal;
