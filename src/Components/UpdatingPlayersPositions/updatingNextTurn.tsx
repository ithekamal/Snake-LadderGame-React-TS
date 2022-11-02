import { individualPlayerInformations } from "../LoginPage/LoginPage";
//to get unwinned players in array
function findingplayersOnGame(playersDetatails:individualPlayerInformations[], winnedPlayers:number[]) {
    return playersDetatails.map((player:individualPlayerInformations) => player.playerQuniqueId).filter(value => !winnedPlayers.includes(value));
  }
  
function updatingNextTurn(playersDetatails:individualPlayerInformations[],winnedPlayers:number[],playerTurnNumber:number):number{
 let currentTurn =  playerTurnNumber
 //if the next turn player is already won then giving turn to unwinned player
   if(playerTurnNumber < playersDetatails.length - 1){
    for(let i=0 ; i<playersDetatails.length;i++){
    if(playerTurnNumber < i && !winnedPlayers.includes(i+1)){
      playerTurnNumber =  i     
    break;
    }
   }}
   
  console.log('Was it updated',playerTurnNumber)
  //yes updated

  //if the current turn number was the last player in array/set then giving turn to unwinned player
  // playerTurnNumber === playersDetatails.length - 1 
   if( playerTurnNumber === currentTurn){
      playerTurnNumber = findingplayersOnGame(playersDetatails, winnedPlayers)[0] - 1
   }
 return playerTurnNumber
  }
  
export default updatingNextTurn