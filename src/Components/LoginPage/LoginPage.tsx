import { useRef, useState } from "react";
import "./LoginPage.css";
import BoardControls from "../BoardControlPad/BoardControls";

export interface individualPlayerInformations {
  playerName: string;
  playerSymbol: string;
  playerMoves: number[];
}


//storing every players Informations
let playersInformations: individualPlayerInformations[] = [];
export default function UserInputField() {
  const [newGame, SetnewGame] = useState<boolean>(false);
  const [totalPlayers, SettotalPlayers] = useState<string>("");
  const [playersCount, SetPlayersCount] = useState<number>(1);
  const [playerName, setPlayerName] = useState<string>("");
  const [playerSymbol, setPlayerSymbol] = useState<string>("");


  const playerNameRef = useRef<HTMLInputElement>(null);
  const playerSymbolRef = useRef<HTMLInputElement>(null);
  const totalPlayersRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    const nameAlreadyTaken:individualPlayerInformations|undefined = playersInformations.find(
      (excistingPlayer) => excistingPlayer.playerName === playerName
    );
    const symbolAlreadyTaken:individualPlayerInformations|undefined = playersInformations.find(
      (excistingPlayer) => excistingPlayer.playerSymbol === playerSymbol
    );
    if (playerName !== "" || playerSymbol !== "") {
      if (
        (nameAlreadyTaken === undefined && symbolAlreadyTaken === undefined) && playerName.length <= 8 && playerName.length >= 3 && playerSymbol.length === 2)
      {
        playersInformations.push({
          playerName: playerName,
          playerSymbol: playerSymbol,
          playerMoves: [],
        });
        SetPlayersCount(playersCount + 1);
      } else {
        if(playerName.length > 8 || playerName.length < 3 || playerSymbol.length !== 2){
          alert("Name Should be atleast 3 characters,atmost 8 characters long!!!"+"\n"+"Only one emoji is acceptable!!")
        }else{
          nameAlreadyTaken !== undefined
          ? alert('name "'+playerName+'" is already taken !! ')
          : alert('symbol "'+playerSymbol+'" Already taken !!');
        }
      }
    } else {
      alert("Please Fill All the Details in the Form");
    }

    const playerNameInputField = playerNameRef.current as HTMLInputElement;
    playerNameInputField.value = "";
    const PlayerSymbolInputField = playerSymbolRef.current as HTMLInputElement ;
    PlayerSymbolInputField.value = "";
  };

  return (
    <div className="Login-page">
      <div className="input-page">   
      {newGame === false ? 
      <div className="totalplayers-inputpage">
          {" "} 
          <h1 className="helping-text">Welcome to the Arena</h1><br />
          <input
            id = "totalPlayer-inp-Field"
            type="number"
            ref={totalPlayersRef}
            placeholder="Enter Number of Players"
            onChange={(e) => {
              SettotalPlayers(e.currentTarget.value);
            }}
            required
          /><br/>
          <button 
            onClick={() =>
              ((totalPlayers===""))||(Number(totalPlayers)<2 )||(Number(totalPlayers)>21) ? 
              alert("Minimum Players are 2,Maximum players are 20 allowed!") : SetnewGame(true)
            }
            id="submit-btn"
          >
            Enter
          </button>
          </div>
      : null}
      {newGame === true && playersCount <= Number(totalPlayers) ? (
        <div className="individualUserinput">
          <h1 className="helping-text">Enter Details of Player {playersCount}</h1>
          <div className="UserName">
            <label htmlFor="username" className="helping-text">Name Of Player : </label>
            <input
              type="text"
              placeholder ="Enter the name"
              ref={playerNameRef}
              onChange={(e) => {
                setPlayerName(e.currentTarget.value);
              }}
              required
            />
          </div>
          <div className="UserSymbol">
            <label htmlFor="userSymbol" className="helping-text">Symbol for Player : </label>
            <input
              type="text"
              ref={playerSymbolRef}
              placeholder ="Enter the Symbol"
              onChange={(e) => {
                setPlayerSymbol(e.currentTarget.value);
              }}
              required
            />
          </div>
          <button type="submit" id="submit-btn" onClick={handleClick}>
            Submit
          </button>
        </div>
      ) : null}
      <div ></div>



      {newGame === true && playersCount > Number(totalPlayers) ? (
        alert("Welcome To the Snake and Ladder game!!"+"\n"+"GAME RULES >>>"+
        "\n\n"+">> Players Should get the dice 1, to start their Game"+"\n"+
        ">> If the Dice was 6 , 5 or 4 the Player will Get another Turn"+"\n\n"+"Thats it :).LET'S ROLL THE DICE...!"
        ),
        <BoardControls props = {playersInformations} /> 
      ) :  ( 
        ""
      )} 
      </div> 
    </div>
  );
}
