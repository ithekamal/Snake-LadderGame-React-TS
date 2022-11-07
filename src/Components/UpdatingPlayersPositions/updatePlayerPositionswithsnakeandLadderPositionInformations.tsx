export interface snakeorLadderPositionInformations {
  startingCell: number;
  endingCell: number;
  typeOfcatch: string;
}

export let snakeandLadderPositionInformations: snakeorLadderPositionInformations[] =
  [
    { startingCell: 5, endingCell: 38, typeOfcatch: "ladder" },
    { startingCell: 9, endingCell: 38, typeOfcatch: "ladder" },
    { startingCell: 4, endingCell: 14, typeOfcatch: "ladder" },
    { startingCell: 17, endingCell: 7, typeOfcatch: "snake" },
    { startingCell: 21, endingCell: 42, typeOfcatch: "ladder" },
    { startingCell: 28, endingCell: 84, typeOfcatch: "ladder" },
    { startingCell: 51, endingCell: 67, typeOfcatch: "ladder" },
    { startingCell: 54, endingCell: 34, typeOfcatch: "snake" },
    { startingCell: 62, endingCell: 19, typeOfcatch: "snake" },
    { startingCell: 64, endingCell: 60, typeOfcatch: "snake" },
    { startingCell: 72, endingCell: 91, typeOfcatch: "ladder" },
    { startingCell: 80, endingCell: 96, typeOfcatch: "ladder" },
    { startingCell: 87, endingCell: 36, typeOfcatch: "snake" },
    { startingCell: 93, endingCell: 78, typeOfcatch: "snake" },
    { startingCell: 94, endingCell: 75, typeOfcatch: "snake" },
    { startingCell: 98, endingCell: 79, typeOfcatch: "snake" },
  ];

function updatePlayerPositionswithsnakeandLadderPositionInformations(
    currentPositionOfaPlayer: number,
    diceNumber: number
  ): number {
    let position = 0
    snakeandLadderPositionInformations.map(
      (eachCatch:snakeorLadderPositionInformations) => currentPositionOfaPlayer+diceNumber === eachCatch.startingCell  ? position = eachCatch.endingCell : null
     )
    return position
  }


export default updatePlayerPositionswithsnakeandLadderPositionInformations
