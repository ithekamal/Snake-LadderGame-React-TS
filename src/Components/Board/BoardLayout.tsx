import "./BoardLayout.css";
import { playerNumbersForCell } from "./GeneratingCellNumbers";
import { snakeandLadderPositionInformations } from "../UpdatingPlayersPositions/updatePlayerPositionswithsnakeandLadderPositionInformations";
import { snakeorLadderPositionInformations } from "../UpdatingPlayersPositions/updatePlayerPositionswithsnakeandLadderPositionInformations";
import { individualPlayerInformations } from "../LoginPage/LoginPage";

interface setPlayerSymbol{
  updatedplayerDetails : individualPlayerInformations[]
}


function printingSnakeOrLadder(cellnumber: number) {
  let cellhasSnakeorLadder:snakeorLadderPositionInformations = {
    startingCell: 0,
    endingCell: 0,
    typeOfcatch: "",
  };

  snakeandLadderPositionInformations.map((snakeorLadder: snakeorLadderPositionInformations) =>
    snakeorLadder.startingCell === cellnumber
      ? (cellhasSnakeorLadder = snakeorLadder)
      : null
  );
  
  if (cellhasSnakeorLadder.startingCell !== 0) {
    let emojiOfCatch:string =
      cellhasSnakeorLadder.typeOfcatch === "snake" ? "🐍" : "🚀";
    return (
      <div>
        <p className="ladderorSnake">{emojiOfCatch}</p>
        <p className="fromTo">
          {cellhasSnakeorLadder.startingCell +
            " - " +
            cellhasSnakeorLadder.endingCell}
        </p>
      </div>
    );
  }
}

const BoardLayout = (updatedplayersInformations:setPlayerSymbol) => {

  let boardCellNumbers:number[] = playerNumbersForCell(100);

  return (
    <div>
        <div className="board">
          {boardCellNumbers.map((cellNumber:number,key) => (
            <div className={cellNumber % 2 === 0 ? "evencell" : "oddcell"} key={key}>
              <div className="cellNumber" key={cellNumber}>{" "}
                <h1 className="numbersOncell" key={cellNumber}>{cellNumber}</h1>
                {printingSnakeOrLadder(cellNumber)}
              </div>
                <div className="playersymbol">
                {updatedplayersInformations.updatedplayerDetails.map((player:any)=> 
                player.playerMoves.length > 0 &&
                  player.playerMoves[player.playerMoves.length - 1] === cellNumber ? 
                    <p className="symbolOncell" key={player.playerSymbol}>{player.playerSymbol}</p> : null)}
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default BoardLayout;
