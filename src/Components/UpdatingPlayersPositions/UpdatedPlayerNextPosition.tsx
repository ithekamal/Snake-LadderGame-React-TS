import {individualPlayerInformations} from '../LoginPage/LoginPage'

const UpdatedPlayerNextPosition = (
  playersDetails: individualPlayerInformations[],
  playerTurnNumber: number,
  diceNumber: number
):individualPlayerInformations[] => {
  
  //current cell Number of player 
  let currentPositionOfaPlayer:number|undefined =
    playersDetails[playerTurnNumber].playerMoves[
      playersDetails[playerTurnNumber].playerMoves.length - 1
    ];
    //updating player Position only when the player already got the Dice 1, and his Position adds with dice lesser than/equal to Maximum Cell
    if (
      currentPositionOfaPlayer !== undefined &&
      currentPositionOfaPlayer + diceNumber <= 100
    ) {
      playersDetails[playerTurnNumber].playerMoves.push(
        playersDetails[playerTurnNumber].playerMoves[
          playersDetails[playerTurnNumber].playerMoves.length - 1
        ] + diceNumber
      );
    }
    //updating player Position when the player did not get dice 1 before,and Got dice 1 in this current turn
    else if (currentPositionOfaPlayer === undefined && diceNumber === 1) {
      playersDetails[playerTurnNumber].playerMoves.push(diceNumber);
    } 
    
  return playersDetails;
};

export default UpdatedPlayerNextPosition;
