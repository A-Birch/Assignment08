/*eslint-env browser*/

// ---------- The Bank Account Application (Creating a Closure Function) --------------

// HELPER FUNCTION TO SELECT ELEMENT FROM THE DOM
var $ = function (id) {
	"use strict";
	return window.document.getElementById(id);
};

//GLOBAL VARIABLES
var ownerName, depositAmount, withdrawalAmount;

// HELPER FUNCTION TO DISPLAY BALANCE
var displayMsg = function (message) {
	"use strict";
	$('div').innerHTML = message;
};

//FUNCTION FOR CHECKING THE INPUT OF AMOUNTS
function validate(amount) {
    "use strict";
    if (isNaN(amount) || amount === null) {
        window.alert("Not a number! Enter a number please.");
		return false;
    } else if (amount < 0) {
		window.alert("Enter a positive amount.");
		return false;
	} else {
		return true;
	}
}

function bankAccount(ownerName) {
	"use strict";
	//LOCAL VARIABLES
	var balance = 0;
	var owner = ownerName;
	
	// PUBLIC METHODS THAT HAVE ACCESS TO PRIVATE VARIABLES AND FUNCTIONS
	return {
		
		//FUNCTION TO WITHDRAWAL MONEY FROM THE OWNER'S BANK ACCOUNT
		withdrawal: function (withdrawalAmount) {
			
			//VALIDATION APPROPRIATE AMOUNT
			if (withdrawalAmount > balance) {
				window.alert("You can't withdrawal: " + withdrawalAmount + "\nNot enough funds on your account.");
			} else {
				balance -= withdrawalAmount;
				displayMsg(this.getOwnerName() + "'s account balance is " + this.getBalance());
			}
		},
		
		//FUNCTION TO DEPOSIT MONEY TO THE OWNER'S BANK ACCOUNT
		deposit: function (depositAmount) {
			balance += depositAmount;
			displayMsg(this.getOwnerName() + "'s account balance is " + this.getBalance());
		},
		//RETURN VALUE OF BALANCE
		getBalance: function () {
			return balance;
		},
		//RETURN VALUE OF OWNER
		getOwnerName: function () {
			return owner;
		}
	};
}

window.addEventListener("load", function () {
    "use strict";
	var userAccount;
	$('name').addEventListener("click", function () {
		ownerName = window.prompt("Enter your name:");
		userAccount = bankAccount(ownerName);
	});
	$('deposit').addEventListener("click", function () {
		
		//CHECK THAT THE OWNER'S NAME WAS ENTERED TO VOID UNDEFINED VALUE OF GETOWNERNAME FUNCTION
		if (userAccount === undefined) {
			return window.alert('Owner is undefined. \nEnter your name please.');
		}
		
		//USE VALIDATE FUNCTION THROUGH DO-WHILE LOOP FOR CHECKING depositAmount
		do {
			depositAmount = parseFloat(window.prompt("Enter an amount to deposit:"));
		} while (validate(depositAmount) === false);
		userAccount.deposit(depositAmount);
	});
	$('withdrawal').addEventListener("click", function () {
		
		//CHECK THAT THE OWNER'S NAME WAS ENTERED TO VOID UNDEFINED VALUE OF GETOWNERNAME FUNCTION
		if (userAccount === undefined) {
			return window.alert('Owner is undefined. \nEnter your name please.');
		}
		
		//USE VALIDATE FUNCTION THROUGH DO-WHILE LOOP FOR CHECKING withdrawalAmount
		do {
			withdrawalAmount = parseFloat(window.prompt("Enter an amount to withdrawal:"));
		} while (validate(withdrawalAmount) === false);
		userAccount.withdrawal(withdrawalAmount);
	});
});

