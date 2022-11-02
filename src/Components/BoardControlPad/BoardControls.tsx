import { useEffect, useState } from "react";
import "./BoardControls.css";
import UpdatingPlayerDetailswithDice from "../UpdatingPlayersPositions/UpdatingPlayerDetailswithDice";
import { individualPlayerInformations } from "../LoginPage/LoginPage";
import BoardLayout from "../Board/BoardLayout";





interface userData {
  props: individualPlayerInformations[];
}

let dice: number = 0;
let nextTurnNumber: number = 0;
let currentTurnNumber: number = 0;
let winnersList: number[] = [];


//props: userData

function BoardControls(props: userData) {
  console.log("The prop is--------------------------------------------------",props)                                 //props.props
  const [updatedPlayersPosition,setupdatedPlayersPosition] = useState<individualPlayerInformations[]>(props.props)
  const [updated, SetUpdated] = useState<boolean>(false)

  useEffect(() => {
    winnersList = winnersList
  }, [updated]);
  //Updating each Player Position based On the Dice number
  function rollingDiceandUpdatingPlayersDetails() {
    console.log('winners array',winnersList,updatedPlayersPosition.length)
    if (winnersList.length === updatedPlayersPosition.length - 1) {
      alert(
        "Game is Ended!!!do You want to Restart the game?" +
          "\n" +
          "Click The Restart Button to Restart the Game"
      );
    }else{

      dice =    Math.ceil(Math.random() * 6);
      let newupdatedPlayerInformations = UpdatingPlayerDetailswithDice(
        updatedPlayersPosition,
        dice,
        nextTurnNumber,
        winnersList
      );
      setupdatedPlayersPosition(newupdatedPlayerInformations.updatedPlayersInformation)
      currentTurnNumber = nextTurnNumber
      console.log("the turn number is",currentTurnNumber)
      nextTurnNumber = newupdatedPlayerInformations.nextPlayerTurnNmber;
      winnersList = newupdatedPlayerInformations.winnedPlayers;
    }
    SetUpdated(!updated);
  }

  //resetting each playerMoves on playerDetails,and turn and list of winnerplayers to  0
  function restart() {
    currentTurnNumber = 0 
    nextTurnNumber = 0;
    dice = 0;
    winnersList = [];
    updatedPlayersPosition.map((player) => (player.playerMoves = [0]));
    SetUpdated(!updated);
  }

  return (

    <div className="board-layout">
      <div className="buttons-pad">
        <div className="dice-square">
          <h1 className="dice-number">{dice}</h1>
        </div>
        <button
          className={"button-Div"}
          onClick={rollingDiceandUpdatingPlayersDetails}
        >
          {"Roll the Dice!! " + updatedPlayersPosition[nextTurnNumber].playerName + "."}
        </button>
        <h1 className="previous-player-text">
          &#x219e; Previous player History &#8608;
        </h1>
        <div className="boardDetails">
          <h1 className="textDetails">
            current turn : {currentTurnNumber}
            PLAYER NAME :{updatedPlayersPosition[currentTurnNumber].playerName}
          </h1>
          <h1 className="textDetails">DICE GOT : {dice}</h1>
          <h1 className="textDetails">
            PLAYER SYMBOL :
            {updatedPlayersPosition[currentTurnNumber].playerSymbol.toString()}
          </h1>
          <h1 className="textDetails">
            POSITION MOVED :
            {updatedPlayersPosition[currentTurnNumber].playerMoves.slice(-1)[0]}
          </h1>
          {updatedPlayersPosition[currentTurnNumber].playerMoves.slice(-1)[0] !== 0 ? (
            <h1 className="textDetails">
              PREVIOUS POSITION:
              {
               updatedPlayersPosition[currentTurnNumber].playerMoves.slice(-2)[0]
              }
            </h1>
          ) : (
            <h1 className="textDetails">PREVIOUS POSITION:0</h1>
          )}
          <h1 className="textDetails">
            NEXT PLAYER : {updatedPlayersPosition[nextTurnNumber].playerName}
          </h1>
          {updatedPlayersPosition[currentTurnNumber].playerMoves.slice(-1)[0]===0 ? (
            <h1 className="textDetails">Let's Hope For One Next Turn !! </h1>
          ):null}
        </div>

        <button type="button" className="restart" onClick={restart}>
          RESTART!!!
        </button>
        {winnersList.length! ? (
          <h1 className="winners-text">Winners!!!</h1>
        ) : null}
        <div className="winners-Names">
          {winnersList.map((player: number) => (
            <div>
              <h1 className="winners" key={player}>
                {updatedPlayersPosition[player -1].playerName}
              </h1>
            </div>
          ))}
        </div>
      </div>
      {<BoardLayout updatedplayerDetails={updatedPlayersPosition} />}
    
    </div>

 
  );
}

export default BoardControls;

