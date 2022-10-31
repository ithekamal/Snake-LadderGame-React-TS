import updatePlayerPositionswithsnakeandLadderPositionInformations from "./updatePlayerPositionswithsnakeandLadderPositionInformations";
import UpdatedPlayerNextPosition from "./UpdatedPlayerNextPosition";
import { individualPlayerInformations } from "../LoginPage/LoginPage";

interface returnOfUpdatingPlayerDetails {
  updatedPlayersInformation: individualPlayerInformations[];
  nextPlayerTurnNmber: number;
  winnedPlayers: string[];
}

function UpdatingPlayerDetailswithDice(
  playersDetails: individualPlayerInformations[],
  diceNumber: number,
  playerTurnNumber: number,
  playerNameDetails: string[],
  playerWinned: string[]
): returnOfUpdatingPlayerDetails {
  //Current cellNumber(positions) of a player
  let currentPositionOfaPlayer: number =
    playersDetails[playerTurnNumber].playerMoves[
      playersDetails[playerTurnNumber].playerMoves.length - 1
    ];

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
    playerWinned.push(playersDetails[playerTurnNumber].playerName);
    alert(
      "We Got The Winner!!!" + playersDetails[playerTurnNumber].playerName + "."
    );
    playerTurnNumber === playerNameDetails.length - 1
      ? (playerTurnNumber = 0)
      : (playerTurnNumber += 1);
  } else {
    playerPositionChangedbySnakeorLadder === 0
      ? (playersDetails = UpdatedPlayerNextPosition(
          playersDetails,
          playerTurnNumber,
          diceNumber
        ))
      : playersDetails[playerTurnNumber].playerMoves.push(
          playerPositionChangedbySnakeorLadder
        );
  }

  //Updating turn for for next Player
  if (diceNumber !== 1 && diceNumber !== 5 && diceNumber !== 6) {
    playerTurnNumber === playerNameDetails.length - 1
      ? (playerTurnNumber = 0)
      : (playerTurnNumber += 1);
  }
  //again Updating turn if the next Player already won in this game(skipping winned players)
  if (playerWinned.includes(playerNameDetails[playerTurnNumber])) {
    playerTurnNumber === playerNameDetails.length - 1
      ? (playerTurnNumber = 0)
      : (playerTurnNumber += 1);
  }

  return {
    updatedPlayersInformation: playersDetails,
    nextPlayerTurnNmber: playerTurnNumber,
    winnedPlayers: playerWinned,
  };
}

export default UpdatingPlayerDetailswithDice;
