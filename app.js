const balance = document.getElementById('balance');
const incomeMoney = document.getElementById('money-plus');
const expensesMoney = document.getElementById('money-minus');
const history = document.getElementById('list');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const form = document.getElementById('form');

let transactions = [];

const addTransaction = (e) => {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and an amount');
  }

  const transaction = {
    id: generateId(),
    text: text.value,
    amount: +amount.value,
  };

  transactions.push(transaction);
  addTransactionDOM(transaction);
  updateValues();
  text.value = '';
  amount.value = '';
};

const generateId = () => {
  return Math.floor(Math.random() * 100);
};

const addTransactionDOM = (transaction) => {
  //Get sign to distinguish between income and expenses
  const sign = transaction.amount < 0 ? '-' : '+';
  const list = document.createElement('li');

  list.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  list.innerHTML = `
    ${transaction.text} 
    <span> ${sign} ${Math.abs(transaction.amount)} </span>
    <button class='delete-btn' onclick = "removeTransaction(${
      transaction.id
    })"> x </button>`;

  history.appendChild(list);
};

//Updating the balance income

const updateValues = () => {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, curr) => acc + curr, 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, curr) => (acc += curr), 0)
    .toFixed(2);

  const expenses = (
    amounts.filter((item) => item < 0).reduce((acc, curr) => (acc += curr), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `${total}`;
  incomeMoney.innerText = `${income}`;
  expensesMoney.innerText = `${expenses}`;
};

//Remove transaction

const removeTransaction = (id) => {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  init();
};

const init = () => {
  history.innerHTML = '';
  transactions.forEach(addTransactionDOM);
};

init();

form.addEventListener('submit', addTransaction);
