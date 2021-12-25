import React from "react";
import Button from "components/Button";
import "./Modal.scss";

type ModalPropsType = {
  closeFunction: Function;
  newGame: Function;
  pegsRemaining: number;
};

const Modal: React.FC<ModalPropsType> = ({ closeFunction, newGame, pegsRemaining }) => {
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
        <div className="game-over-msg">Game Over!!!</div>
        <div className="ran-out-of-moves">You have ran out of moves :D</div>
        Score: {32 - pegsRemaining!}
        <Button clickHandler={newGame} title={"New Game"} style={{ marginTop: "1.5rem" }} />
      </div>
    </div>
  );
};

export default Modal;
