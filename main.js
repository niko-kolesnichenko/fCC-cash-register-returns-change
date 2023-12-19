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
  if (cidAmount == (cash - price).toFixed(2)) {
    change["status"] = "CLOSED";
    change["change"] = cid;
    return change;
  }

  // If cash-in-register is less than change amount => "INSUFFICIENT_FUNDS"
  if (cidAmount < (cash - price).toFixed(2)) {
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
    remainingChangeToCount = amountToWorkWith % 100;
    // substracting remainder from whole change amount to get whole amount in hundreds needed to be given out
    // i.e. $212 - $12 = $200. If we have $300 in register, we give $200 to client. If we have $100, we give out $100, and
    // add remaining $100 to remaining change to count. 
    if (cid[8][1] < (amountToWorkWith - remainingChangeToCount)) {
      remainingChangeToCount += amountToWorkWith - remainingChangeToCount - cid[8][1];
      changeArray.unshift(cid[8][1]);
    } else if (cid[8][1] >= (amountToWorkWith - remainingChangeToCount)) {
      // if we need to give out $100 and we have $300 in register, we just add $100 to resulting changeArray
      // task says nothing about keeping track of remaining change in register
      changeArray.unshift(["ONE HUNDRED", amountToWorkWith - remainingChangeToCount]);
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
    remainingChangeToCount = amountToWorkWith % 20;

    if (cid[7][1] < (amountToWorkWith - remainingChangeToCount)) {
      remainingChangeToCount += amountToWorkWith - remainingChangeToCount - cid[7][1];
      changeArray.unshift(["TWENTY", cid[7][1]]);
    } else if (cid[7][1] >= (amountToWorkWith - remainingChangeToCount)) {
      changeArray.unshift(["TWENTY", amountToWorkWith - remainingChangeToCount]);
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
    remainingChangeToCount = amountToWorkWith % 10;

    if (cid[6][1] < (amountToWorkWith - remainingChangeToCount)) {
      remainingChangeToCount += amountToWorkWith - remainingChangeToCount - cid[6][1];
      changeArray.unshift(["TEN", cid[6][1]]);
    } else if (cid[6][1] >= (amountToWorkWith - remainingChangeToCount)) {
      changeArray.unshift(["TEN", amountToWorkWith - remainingChangeToCount]);
    }
  }

  change["status"] = "OPEN";
  change["change"] = changeArray;

  return change;
}

// CLOSED test-case
console.log(checkCashRegister(96.74, 100, cashInRegisterClosedTest)); 
// INSUFFICIENT_FUNDS (not enough change) test-case
console.log(checkCashRegister(96.74, 100, cashInRegisterLessThanChangeTest)); 
// OPEN test-case
console.log(checkCashRegister(20, 200, cashInRegisterOpenTest)["change"][1]);


/*


console.log(cash - price, remainingChangeToCount, hundredsToGive, twentysToGive);*/