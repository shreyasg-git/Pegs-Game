Create a new component called `GameClient` this client will be able to handle game state totally   
 - GameClient- (`selfBoardState`, `selfBoardStateDispatch`, `guestBoardState`, `guestBoardStateDispatch`, `gameInfo`)  
   - NavBar () [`username`]
   - (Self) GameBoard () [`selfBoardState`, `selfBoardStateDispatch`]  
     - Pegs [`selfBoardState`, `selfBoardStateDispatch`]  
   - (Guest) GameBoard () [`guestBoardState`, `guestBoardStateDispatch`]  
     - Pegs [`guestBoardState`, `guestBoardStateDispatch`]  
   - Menu [`selfBoardStateDispatch`, `guestBoardStateDispatch`]

#### GameBoardDispatch ActionTypes - 
 - NEWGAME    
 - EXITGAME  
 - UNDO  
 - REDO  
 - RESTART  

gameInfo - {username1, username2, winner}

