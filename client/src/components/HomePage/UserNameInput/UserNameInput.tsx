import { useContext, useState } from "react";
import GameInfoCxt from "GameInfoCxt";
import { GameInfoActionsEnum } from "reducers/gameInfoReducer";

type UserNameInputPropsType = {};

const UserNameInput: React.FC<UserNameInputPropsType> = () => {
  const { gameInfoDispatch } = useContext(GameInfoCxt);

  const [localUserName, setLocalUserName] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    gameInfoDispatch({
      type: GameInfoActionsEnum.setUsername,
      payload: { username1: localUserName },
    });
  };
  return (
    <div className="usernameinput modal">
      <div className="input modal-body-2">
        Enter a Username :
        <form onSubmit={handleSubmit}>
          <input
            className="modal-input-element"
            type="text"
            onChange={(e) => {
              setLocalUserName(e.target.value);
            }}
          />
          <input type="submit" value="Submit" className="modal-submit-btn" />
        </form>
      </div>
    </div>
  );
};

export default UserNameInput;
