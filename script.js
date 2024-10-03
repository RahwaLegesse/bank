'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Rahwa Legesse',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Esayas Aregawi',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Yoseph Legesse',
  movements: [20000, -200, 340000, -300, -20, 50000, 400000, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
//   movements.forEach(function (i, mov) {
//     const an = mov > 0 ? deposite : withdraw`${i}${an}${mov}`;
//   });
//   containerMovements.textContent = displayMov;
// };

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// acc = accounts.movements;

const displayMov = function (movements, sort = false) {
  containerMovements.textContent = '';
  const movs = sort ? movements.sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const display = ` <div class="movements__row">
          <div class="movements__type movements__type--${type}"> ${
      i + 1
    } ${type}</div>
         
          <div class="movements__value">${mov}€</div>
        </div>
        `;
    containerMovements.insertAdjacentHTML('afterbegin', display);
  });
};
// displayMov(account1.movements);
// let balance;
const DisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);

  labelBalance.textContent = `${acc.balance}`;
};
// DisplayBalance(account2.movements);

// const displaySumIn = movements => {
//   const positive = movements
//     .filter(mov => mov > 0)
//     .reduce((acc, mov) => acc + mov, 0);
//   labelSumIn.textContent = `${positive}`;
// };

// // displaySumIn(account2.movements);
// const displaySumOut = movements => {
//   const negative = movements
//     .filter(mov => mov < 0)
//     .reduce((acc, mov) => acc + mov, 0);
//   labelSumOut.textContent = `${negative}`;
// };
// // displaySumOut(account1.movements);

// const displayInterest = movements => {
//   const interest = movements
//     .filter(mov => mov > 0)
//     .map(mov => mov * 0.01)

//     .reduce((acc, int) => acc + int, 0);

//   labelSumInterest.textContent = `${interest}€`;
// };
// displayInterest(account1.movements);
const displaySummary = function (acc) {
  const displaySumIn = acc.movements

    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${displaySumIn}€`;
  const displaySumOut = acc.movements

    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${displaySumOut}€`;
  const displayInterest = acc.movements

    .filter(mov => mov > 0)
    .map(mov => mov * 0.01)

    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${displayInterest}€`;
};

const createusername = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
    // console.log(acc.username);
  });
};
const rahwa = createusername(accounts);

const update = function (acc) {
  displayMov(acc.movements);
  DisplayBalance(acc);
  displaySummary(acc);
};

let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    accs => accs.userName === inputLoginUsername.value
  );
  // console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) console.log('login');

  {
    labelWelcome.textContent = `wlcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    update(currentAccount);
  }
});
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );

  if (
    amount > 0 &&
    currentAccount?.balance >= amount &&
    receiverAcc?.userName !== currentAccount.userName
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    console.log('transfered');
    // console.log(currentAccount.balance);
    update(currentAccount);

    // Update UI
    // updateUI(currentAccount);
    // inputTransferAmount.value = inputTransferTo.value = '';
  }
  inputTransferAmount.value = inputTransferTo.value = '';
  console.log(currentAccount);
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.5)) {
    currentAccount.movements.push(amount);
    update(currentAccount);
  }

  inputLoanAmount.value = '';
});
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('delete');

  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );
    console.log(index);

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMov(currentAccount.movements, !sorted);
  sorted = !sorted;
});
// const movs = movements.some(mov => mov > 2000);
// console.log(movs);

// console.log('rahwa');

const legesse = ['ra', ['ke'], ['ma'], 'josy'];
console.log(legesse.flat());

// const rahw = accounts.map(acc => acc.movements);
// console.log(rahw);
// const ra = rahw.flat();
// console.log(ra);
// const r = ra.reduce((acc, mov) => acc + mov, 0);
// console.log(r);
const rah = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(rah);
const ra = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(ra);

const x = movements.sort((a, b) => b - a);
console.log(x);

/////////////////////////////////////////////////
