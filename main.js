/* Cash Register

Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price),
payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.
The checkCashRegister() function should always return an object with a status key and a change key.
Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.
Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.
Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

Currency Unit	Amount
Penny	$0.01 (PENNY)
Nickel	$0.05 (NICKEL)
Dime	$0.1 (DIME)
Quarter	$0.25 (QUARTER)
Dollar	$1 (ONE)
Five Dollars	$5 (FIVE)
Ten Dollars	$10 (TEN)
Twenty Dollars	$20 (TWENTY)
One-hundred Dollars	$100 (ONE HUNDRED)

See below for an example of a cash-in-drawer array:

[
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]
*/

// Final solution
/*
function checkCashRegister(price, cash, cid) {
    let change;
    return change;
  }
  
console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
*/
// Thinking process

/*
Two easy cases are "I don't have enough change in cash register" and "I have exact change amount in change register".
First one returns "INSUFFICIENT_FUNDS" and empty array.
Second one returns "CLOSED" and same array as have been passed to the function.
*/

const cashInRegisterClosedTest = [
  ["PENNY", 0.01],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0.25],
  ["ONE", 3],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0]
];

const cashInRegisterLessThanChangeTest = [
  ["PENNY", 0.01],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 3],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0]
];

/*
"OPEN" case and second variant of "INSUFFICIENT_FUNDS" case require cash-in-register evaluation.

First, divide change amount by bill/coin value in descending value order, with remainder.
Remainder gets pushed to next division stage.
Division result is compared with available bill/coin amount. If cash in register doesn't cover the required
bill/coin amount, the rest is also pushed to next division stage.

On "penny" stage:
- if cash-in-register covered change amount fully, "OPEN" is returned with array of bill/coin amounts;
- if cash-in-register didn't cover the change amount exactly, "INSUFFICIENT_FUNDS" is returned with empty array.
*/

const cashInRegisterOpenTest = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

function checkCashRegister(price, cash, cid) {
  let change = {};
  let cidAmount = 0;  

  // Counting cash in register
  for (let i = 0; i < cid.length; i++) {
    cidAmount += cid[i][1];
  }

  // If cash-in-register equals change amount => "CLOSED"
  if ((Math.round(cidAmount * 1e2 ) / 1e2) == (Math.round((cash - price) * 1e2 ) / 1e2)) {
    change["status"] = "CLOSED";
    change["change"] = cid;
    return change;
  }

  // If cash-in-register is less than change amount => "INSUFFICIENT_FUNDS"
  if ((Math.round(cidAmount * 1e2 ) / 1e2) < (Math.round((cash - price) * 1e2 ) / 1e2)) {
    change["status"] = "INSUFFICIENT_FUNDS";
    change["change"] = [];
    return change;
  }

  let amountToWorkWith = cash - price;
  let remainingChangeToCount = 0;
  let changeArray = [];

  if (amountToWorkWith / 100 < 1) {
    // if there's no need to give out $100 bills, passing the change amount to var with remaining change to count
    remainingChangeToCount = amountToWorkWith;
  } else {
    // assigning remainder to var with remaining change to count, i.e. $112: we will give $100, and $12 is passed onwards
    remainingChangeToCount = Math.round((amountToWorkWith % 100) * 1e2 ) / 1e2;
    // substracting remainder from whole change amount to get whole amount in hundreds needed to be given out
    // i.e. $212 - $12 = $200. If we have $300 in register, we give $200 to client. If we have $100, we give out $100, and
    // add remaining $100 to remaining change to count. 
    if (cid[8][1] < (amountToWorkWith - remainingChangeToCount)) {
      remainingChangeToCount += amountToWorkWith - remainingChangeToCount - cid[8][1];
      remainingChangeToCount = Math.round(remainingChangeToCount * 1e2 ) / 1e2;
      changeArray.push(cid[8][1]);
    } else if (cid[8][1] >= (amountToWorkWith - remainingChangeToCount)) {
      // if we need to give out $100 and we have $300 in register, we just add $100 to resulting changeArray
      // task says nothing about keeping track of remaining change in register
      changeArray.push(["ONE HUNDRED", Math.round((amountToWorkWith - remainingChangeToCount) * 1e2) / 1e2]);
    }
  }

  // for twenties
  // reassigning remainingChangeToCount to amountToWorkWith to keep using same IF construct
  amountToWorkWith = remainingChangeToCount;
  // emptying remainingChangeToCount var
  remainingChangeToCount = 0;

  if (amountToWorkWith / 20 < 1) {
    remainingChangeToCount = amountToWorkWith;
  } else {
    remainingChangeToCount = Math.round((amountToWorkWith % 20) * 1e2 ) / 1e2;

    if (cid[7][1] < (amountToWorkWith - remainingChangeToCount)) {
      remainingChangeToCount += amountToWorkWith - remainingChangeToCount - cid[7][1];
      remainingChangeToCount = Math.round(remainingChangeToCount * 1e2 ) / 1e2;
      changeArray.push(["TWENTY", cid[7][1]]);
    } else if (cid[7][1] >= (amountToWorkWith - remainingChangeToCount)) {
      changeArray.push(["TWENTY", Math.round((amountToWorkWith - remainingChangeToCount) * 1e2) / 1e2]);
    }
  }

  // for tens
  // reassigning remainingChangeToCount to amountToWorkWith to keep using same IF construct
  amountToWorkWith = remainingChangeToCount;
  // emptying remainingChangeToCount var
  remainingChangeToCount = 0;

  if (amountToWorkWith / 10 < 1) {
    remainingChangeToCount = amountToWorkWith;
  } else {
    remainingChangeToCount = Math.round((amountToWorkWith % 10) * 1e2 ) / 1e2;

    if (cid[6][1] < (amountToWorkWith - remainingChangeToCount)) {
      remainingChangeToCount += amountToWorkWith - remainingChangeToCount - cid[6][1];
      remainingChangeToCount = Math.round(remainingChangeToCount * 1e2 ) / 1e2;
      changeArray.push(["TEN", cid[6][1]]);
    } else if (cid[6][1] >= (amountToWorkWith - remainingChangeToCount)) {
      changeArray.push(["TEN", Math.round((amountToWorkWith - remainingChangeToCount) * 1e2) / 1e2]);
    }
  }

  // for fives
  // reassigning remainingChangeToCount to amountToWorkWith to keep using same IF construct
  amountToWorkWith = remainingChangeToCount;
  // emptying remainingChangeToCount var
  remainingChangeToCount = 0;

  if (amountToWorkWith / 5 < 1) {
    remainingChangeToCount = amountToWorkWith;
  } else {
    remainingChangeToCount = Math.round((amountToWorkWith % 5) * 1e2 ) / 1e2;

    if (cid[5][1] < (amountToWorkWith - remainingChangeToCount)) {
      remainingChangeToCount += amountToWorkWith - remainingChangeToCount - cid[5][1];
      remainingChangeToCount = Math.round(remainingChangeToCount * 1e2 ) / 1e2;
      changeArray.push(["FIVE", cid[5][1]]);
    } else if (cid[5][1] >= (amountToWorkWith - remainingChangeToCount)) {
      changeArray.push(["FIVE", Math.round((amountToWorkWith - remainingChangeToCount) * 1e2) / 1e2]);
    }
  }

  // for ones
  // reassigning remainingChangeToCount to amountToWorkWith to keep using same IF construct
  amountToWorkWith = remainingChangeToCount;
  // emptying remainingChangeToCount var
  remainingChangeToCount = 0;

  if (amountToWorkWith / 1 < 1) {
    remainingChangeToCount = amountToWorkWith;
  } else {
    remainingChangeToCount = Math.round((amountToWorkWith % 1) * 1e2 ) / 1e2;

    if (cid[4][1] < (amountToWorkWith - remainingChangeToCount)) {
      remainingChangeToCount += amountToWorkWith - remainingChangeToCount - cid[4][1];
      remainingChangeToCount = Math.round(remainingChangeToCount * 1e2 ) / 1e2;
      changeArray.push(["ONE", cid[4][1]]);
    } else if (cid[4][1] >= (amountToWorkWith - remainingChangeToCount)) {
      changeArray.push(["ONE", Math.round((amountToWorkWith - remainingChangeToCount) * 1e2) / 1e2]);
    }
  }

  // for quarters
  // reassigning remainingChangeToCount to amountToWorkWith to keep using same IF construct
  amountToWorkWith = remainingChangeToCount;
  // emptying remainingChangeToCount var
  remainingChangeToCount = 0;

  if (amountToWorkWith / 0.25 < 1) {
    remainingChangeToCount = amountToWorkWith;
  } else {
    remainingChangeToCount = Math.round((amountToWorkWith % 0.25) * 1e2 ) / 1e2;

    if (cid[3][1] < (amountToWorkWith - remainingChangeToCount)) {
      remainingChangeToCount += amountToWorkWith - remainingChangeToCount - cid[3][1];
      remainingChangeToCount = Math.round(remainingChangeToCount * 1e2 ) / 1e2;
      changeArray.push(["QUARTER", cid[3][1]]);
    } else if (cid[3][1] >= (amountToWorkWith - remainingChangeToCount)) {
      changeArray.push(["QUARTER", Math.round((amountToWorkWith - remainingChangeToCount) * 1e2) / 1e2]);
    }
  }

  // for dimes
  // reassigning remainingChangeToCount to amountToWorkWith to keep using same IF construct
  amountToWorkWith = remainingChangeToCount;
  // emptying remainingChangeToCount var
  remainingChangeToCount = 0;

  if (amountToWorkWith / 0.1 < 1) {
    remainingChangeToCount = amountToWorkWith;
  } else {
    remainingChangeToCount = Math.round((amountToWorkWith % 0.1) * 1e2 ) / 1e2;

    if (cid[2][1] < (amountToWorkWith - remainingChangeToCount)) {
      remainingChangeToCount += amountToWorkWith - remainingChangeToCount - cid[2][1];
      remainingChangeToCount = Math.round(remainingChangeToCount * 1e2 ) / 1e2;
      changeArray.push(["DIME", cid[2][1]]);
    } else if (cid[2][1] >= (amountToWorkWith - remainingChangeToCount)) {
      changeArray.push(["DIME", Math.round((amountToWorkWith - remainingChangeToCount) * 1e2) / 1e2]);
    }
  }

  // for nickels
  // reassigning remainingChangeToCount to amountToWorkWith to keep using same IF construct
  amountToWorkWith = remainingChangeToCount;
  // emptying remainingChangeToCount var
  remainingChangeToCount = 0;

  if (amountToWorkWith / 0.05 < 1) {
    remainingChangeToCount = amountToWorkWith;
  } else {
    remainingChangeToCount = Math.round((amountToWorkWith % 0.05) * 1e2 ) / 1e2;

    if (cid[1][1] < (amountToWorkWith - remainingChangeToCount)) {
      remainingChangeToCount += amountToWorkWith - remainingChangeToCount - cid[1][1];
      remainingChangeToCount = Math.round(remainingChangeToCount * 1e2 ) / 1e2;
      changeArray.push(["NICKEL", cid[1][1]]);
    } else if (cid[1][1] >= (amountToWorkWith - remainingChangeToCount)) {
      changeArray.push(["NICKEL", Math.round((amountToWorkWith - remainingChangeToCount) * 1e2) / 1e2]);
    }
  }

  // for pennies
  // reassigning remainingChangeToCount to amountToWorkWith to keep using same IF construct
  amountToWorkWith = remainingChangeToCount;
  // emptying remainingChangeToCount var
  remainingChangeToCount = 0;

  if (amountToWorkWith / 0.01 < 1) {
    remainingChangeToCount = amountToWorkWith;
  } else {
    remainingChangeToCount = Math.round((amountToWorkWith % 0.01) * 1e2 ) / 1e2;

    if (cid[0][1] < (amountToWorkWith - remainingChangeToCount)) {
      remainingChangeToCount += amountToWorkWith - remainingChangeToCount - cid[0][1];
      remainingChangeToCount = Math.round(remainingChangeToCount * 1e2 ) / 1e2;
      changeArray.push(["PENNY", cid[0][1]]);
    } else if (cid[0][1] >= (amountToWorkWith - remainingChangeToCount)) {
      changeArray.push(["PENNY", Math.round((amountToWorkWith - remainingChangeToCount) * 1e2) / 1e2]);
    }
  }

  if (remainingChangeToCount != 0) {
    change["status"] = "INSUFFICIENT_FUNDS";
    change["change"] = [];
  } else {
    change["status"] = "OPEN";
    change["change"] = changeArray;
  }
  return change;
}

// CLOSED test-case
// console.log(checkCashRegister(96.74, 100, cashInRegisterClosedTest)); 
// INSUFFICIENT_FUNDS (not enough change) test-case
// console.log(checkCashRegister(96.74, 100, cashInRegisterLessThanChangeTest)); 
// OPEN test-case
console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])["change"][1]);


/*


console.log(cash - price, remainingChangeToCount, hundredsToGive, twentysToGive);*/