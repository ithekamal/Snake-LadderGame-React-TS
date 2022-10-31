import { useEffect, useState } from "react";
import "./BoardControls.css";
import UpdatingPlayerDetailswithDice from "../UpdatingPlayersPositions/UpdatingPlayerDetailswithDice";
import { individualPlayerInformations } from "../LoginPage/LoginPage";
import BoardLayout from "../Board/BoardLayout";

interface userData {
  props: individualPlayerInformations[];
}

interface eachPlayerInfobyTurn {
  rolledDiceCount: number;
  currentPlayerPosition: number;
}

let dice: number = 0;
let nextTurnNumber: number = 0;
let currentTurnNumber: number = 0;
let winners: string[] = [];
//playerInformations:userData
function BoardControls(props: userData) {
  let updatedPlayersPosition: individualPlayerInformations[] = props.props;

  const [updated, SetUpdated] = useState<boolean>(false);
  const [winnedPlayers, SetwinnedPlayers] = useState<string[]>([""]);
  const [playersDetails, SetplayersDetails] = useState<
    individualPlayerInformations[]
  >(updatedPlayersPosition);
  const [player, SetPlayer] = useState<eachPlayerInfobyTurn>({
    rolledDiceCount: dice,
    currentPlayerPosition: 0,
  });
  useEffect(() => {
    SetplayersDetails(updatedPlayersPosition);
    SetPlayer({
      rolledDiceCount: dice,
      currentPlayerPosition:
        playersDetails[currentTurnNumber].playerMoves[
          playersDetails[currentTurnNumber].playerMoves.length - 1
        ],
    });
    SetwinnedPlayers(winners);
  }, [updated]);

  let playerNameDetails: string[] = playersDetails.map(
    (player) => player.playerName
  );

  //Updating each Player Position based On the Dice number
  function rollingDiceandUpdatingPlayersDetails() {
    if (winnedPlayers.length === playerNameDetails.length - 1) {
      alert(
        "Game is Ended!!!do You want to Restart the game?" +
          "\n" +
          "Click The Restart Button to Restart the Game"
      );
    } else {
      dice = Math.ceil(Math.random() * 6);
      if (winners.includes(playerNameDetails[nextTurnNumber])) {
        nextTurnNumber === playerNameDetails.length - 1
          ? (nextTurnNumber = 0)
          : (nextTurnNumber += 1);
      }
      let newupdatedPlayerInformations = UpdatingPlayerDetailswithDice(
        playersDetails,
        dice,
        nextTurnNumber,
        playerNameDetails,
        winnedPlayers
      );
      updatedPlayersPosition =
        newupdatedPlayerInformations.updatedPlayersInformation;
      currentTurnNumber = nextTurnNumber;
      nextTurnNumber = newupdatedPlayerInformations.nextPlayerTurnNmber;
      winners = newupdatedPlayerInformations.winnedPlayers;
    }
    SetUpdated(!updated);
  }

  //resetting each playerMoves on playerDetails,and turn and list of winnerplayers to  0
  function restart() {
    nextTurnNumber = 0;
    dice = 0;
    winners = [];
    updatedPlayersPosition.map((player) => (player.playerMoves = []));
    SetUpdated(!updated);
  }

  return (
    <div className="board-layout">
      <div className="buttons-pad">
        <div className="dice-square">
          <h1 className="dice-number">{player.rolledDiceCount}</h1>
        </div>
        <button
          className={"button-Div"}
          onClick={rollingDiceandUpdatingPlayersDetails}
        >
          {"Roll the Dice!! " + playerNameDetails[nextTurnNumber] + "."}
        </button>
        <h1 className="previous-player-text">
          &#x219e; Previous player History &#8608;
        </h1>
        <div className="boardDetails">
          <h1 className="textDetails">
            PLAYER NAME :{playerNameDetails[currentTurnNumber]}
          </h1>
          <h1 className="textDetails">DICE GOT : {player.rolledDiceCount}</h1>
          <h1 className="textDetails">
            PLAYER SYMBOL :
            {playersDetails[currentTurnNumber].playerSymbol.toString()}
          </h1>
          <h1 className="textDetails">
            POSITION MOVED :
            {player.currentPlayerPosition !== 0
              ? player.currentPlayerPosition
              : 0}
          </h1>
          {player.currentPlayerPosition !== 0 ? (
            <h1 className="textDetails">
              PREVIOUS POSITION:
              {
                playersDetails[currentTurnNumber].playerMoves[
                  playersDetails[currentTurnNumber].playerMoves.length - 2
                ]
              }
            </h1>
          ) : (
            <h1>PREVIOUS POSITION:0</h1>
          )}
          <h1 className="textDetails">
            NEXT PLAYER : {playerNameDetails[nextTurnNumber]}
          </h1>
          {player.currentPlayerPosition !== undefined ? null : (
            <h1 className="textDetails">Let's Hope For One Next Turn !! </h1>
          )}
        </div>

        <button type="button" className="restart" onClick={restart}>
          RESTART!!!
        </button>
        {winnedPlayers.length! ? (
          <h1 className="winners-text">Winners!!!</h1>
        ) : null}

        <div className="winners-Names">
          {winnedPlayers.map((playerThere: string) => (
            <div>
              <h1 className="winners" key={playerThere}>
                {playerThere}
              </h1>
            </div>
          ))}
        </div>
      </div>
      {<BoardLayout updatedplayerDetails={playersDetails} />}
    </div>
  );
}

export default BoardControls;
