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
Technically, we can count the amount of cash in the register and compare it to needed amount of change
right from the bat. If they are equal, then all money from register goes to client, we pop "CLOSED"
answer and finish working with function early, without additional computations.
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

function checkCashRegisterTestClosed(price, cash, cid) {
  let change = {};
  let cidAmount = 0;  

  for (let i = 0; i < cid.length; i++) {
    cidAmount += cid[i][1];
  }

  if (cidAmount == (cash - price).toFixed(2)) {
    change["status"] = "CLOSED";
    change["change"] = cid;
    return change;
  }

  return change;
}

// console.log(checkCashRegisterTestClosed(96.74, 100, cashInRegisterClosedTest));

/*
For INSUFFICIENT_FUNDS and OPEN cases we still need to return "change" object, so I can't just say
that I don't have enough funds and finish the function.

My approach will be, for every cash type:
1) if I don't have any cash of a type, I skip computations for this cash type;
2) 
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

  // Checking for CLOSED situation
  // Counting cash in register
  for (let i = 0; i < cid.length; i++) {
    cidAmount += cid[i][1];
  }

  // If cash-in-register equals change amount, early "return" activates
  if (cidAmount == (cash - price).toFixed(2)) {
    change["status"] = "CLOSED";
    change["change"] = cid;
    return change;
  }

  
  return change;
}

console.log(checkCashRegister(96.74, 100, cashInRegisterClosedTest)); // CLOSED test-case
console.log(checkCashRegister(3.26, 100, cashInRegisterOpenTest)); // OPEN test-case


/*
let hundredsToGive;
let twentysToGive;

if ((cash - price) / 100 < 1) {
  remainingChangeToCalculate = cash - price;
} else {
  remainingChangeToCalculate = (cash - price) % 100;
  hundredsToGive = Math.floor((cash - price) / 100);
  if (hundredsToGive > cashInRegister[8][1]) {
    remainingChangeToCalculate += (hundredsToGive - cashInRegister[8][1]) * 100;
    hundredsToGive = cashInRegister[8][1];
  }
}

if (remainingChangeToCalculate / 20 >= 1) {
  twentysToGive = Math.floor(remainingChangeToCalculate / 20);
  remainingChangeToCalculate = remainingChangeToCalculate % 20;
  if (twentysToGive > cashInRegister[7][1]) {
    remainingChangeToCalculate += (twentysToGive - cashInRegister[7][1]) * 20;
    twentysToGive = cashInRegister[7][1];
  }
}

console.log(cash - price, remainingChangeToCalculate, hundredsToGive, twentysToGive);*/

/*
First idea was to use division with remainder: divide by available currency from highest valuable down
and get the amount of needed bills/coins, then proceed to the next bill/coin, and so on. Skip steps if
division is less than 1 (means we don't need twenty bills for change of 2 dimes).

There's also a problem with each bill/coin amount in the register - maybe implement spot check for
amount of bills/coins we have on hand during the divisions? Like, if we divide something by nickel's
worth, get 5 but we only have 3 nickels. If this happens, we will give out 3 nickels, and must add 2
nickel's worth to the remainder, and then try to give change with pennies.

Then use IF statements to check for amount of cash in the register and "CLOSED"/"INSUFFICIENT FUNDS"
situations.
*/