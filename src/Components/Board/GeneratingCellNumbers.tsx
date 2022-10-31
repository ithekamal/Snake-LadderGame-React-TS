export function playerNumbersForCell(maxCellNumber:number) {
    let numbersForBoard = [];
    for (
      let eachRow = maxCellNumber;
      eachRow >= 1;
      eachRow -= 10
    ) {
      if (eachRow % 20 === 0) {
        for (let numberLefttoRight = eachRow; numberLefttoRight > eachRow - 10; numberLefttoRight--) {
          numbersForBoard.push(numberLefttoRight);
        }
      } else {
        for (let numberRighttoLeft = eachRow - 9; numberRighttoLeft <= eachRow; numberRighttoLeft++) {
          numbersForBoard.push(numberRighttoLeft);
        }
      }
    }
    return numbersForBoard;
  }
  