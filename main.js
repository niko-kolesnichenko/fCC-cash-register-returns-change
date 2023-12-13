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

function checkCashRegister(price, cash, cid) {
    let change;
    return change;
  }
  
console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));

// Thinking process

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

function checkCashRegister(price, cash, cid) {
    let change;
    return change;
  }
  
console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])); //{status: "OPEN", change: [["QUARTER", 0.5]]}