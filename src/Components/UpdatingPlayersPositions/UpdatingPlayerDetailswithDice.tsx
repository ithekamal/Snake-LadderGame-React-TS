import updatePlayerPositionswithsnakeandLadderPositionInformations from "./updatePlayerPositionswithsnakeandLadderPositionInformations";
import UpdatedPlayerNextPosition from "./UpdatedPlayerNextPosition";
import { individualPlayerInformations } from "../LoginPage/LoginPage";
import updatingNextTurn from "./updatingNextTurn";
interface returnOfUpdatingPlayerDetails {
  updatedPlayersInformation: individualPlayerInformations[];
  nextPlayerTurnNmber: number;
  winnedPlayers: number[];
}

function UpdatingPlayerDetailswithDice(
  playersDetails: individualPlayerInformations[],
  diceNumber: number,
  playerTurnNumber: number,
  playerWinned: number[]
): returnOfUpdatingPlayerDetails {
  //Current cellNumber(positions) of a player
  let currentPositionOfaPlayer: number =
    playersDetails[playerTurnNumber].playerMoves.slice(-1)[0];
  //returning 0 if the player next moving cell don't have any catch, returning ending position of catch(snake/ladder) if cell has catch
  let playerPositionChangedbySnakeorLadder: number =
    updatePlayerPositionswithsnakeandLadderPositionInformations(
      currentPositionOfaPlayer,
      diceNumber
    );

  if (
    currentPositionOfaPlayer + diceNumber === 100 ||
    playerPositionChangedbySnakeorLadder === 100
  ) {
    playersDetails[playerTurnNumber].playerMoves.push(100);
    playerWinned.push(playersDetails[playerTurnNumber].playerQuniqueId);
    alert(
      "We Got The Winner!!!" + playersDetails[playerTurnNumber].playerName + "."
    );
  } else if(playerPositionChangedbySnakeorLadder !== 0){
    playersDetails[playerTurnNumber].playerMoves.push(playerPositionChangedbySnakeorLadder)
  }
  else if (
    currentPositionOfaPlayer + diceNumber <= 100 &&
    currentPositionOfaPlayer !== 0
  ) {
    playerPositionChangedbySnakeorLadder === 0
      ? (playersDetails = UpdatedPlayerNextPosition(
          playersDetails,
          playerTurnNumber,
          diceNumber
        ))
      : playersDetails[playerTurnNumber].playerMoves.push(
          currentPositionOfaPlayer + diceNumber
        );
  } else if (currentPositionOfaPlayer === 0 && diceNumber === 1) {
    playersDetails[playerTurnNumber].playerMoves.push(diceNumber);
  }

  //updating/Changing the turn for next player
  if (
    (diceNumber !== 1 && diceNumber !== 5 && diceNumber !== 6) ||
    currentPositionOfaPlayer + diceNumber === 100 ||
    playerPositionChangedbySnakeorLadder === 100
  ) {
    console.log('\nYes Going For turn updation')
    playerTurnNumber = updatingNextTurn(
      playersDetails,
      playerWinned,
      playerTurnNumber
    );
  }
  return {
    updatedPlayersInformation: playersDetails,
    nextPlayerTurnNmber: playerTurnNumber,
    winnedPlayers: playerWinned,
  };
}

export default UpdatingPlayerDetailswithDice;
