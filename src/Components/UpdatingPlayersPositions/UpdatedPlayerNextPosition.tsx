import {individualPlayerInformations} from '../LoginPage/LoginPage'

const UpdatedPlayerNextPosition = (
  playersDetails: individualPlayerInformations[],
  playerTurnNumber: number,
  diceNumber: number
):individualPlayerInformations[] => {
  //current cell Number of player 
  let currentPositionOfaPlayer:number = playersDetails[playerTurnNumber].playerMoves.slice(-1)[0]
    //updating player Position only when the player already got the Dice 1, and his Position adds with dice lesser than/equal to Maximum Cell
    if (
      currentPositionOfaPlayer !== 0 &&
      currentPositionOfaPlayer + diceNumber <= 100
    ) {
      playersDetails[playerTurnNumber].playerMoves.push(
        playersDetails[playerTurnNumber].playerMoves.slice(-1)[0] + diceNumber
      );
    }
    //updating player Position when the player did not get dice 1 before,and Got dice 1 in this current turn
    else if (currentPositionOfaPlayer === 0 && diceNumber === 1) {
      playersDetails[playerTurnNumber].playerMoves.push(diceNumber);
    } 
  return playersDetails;
};

export default UpdatedPlayerNextPosition;
