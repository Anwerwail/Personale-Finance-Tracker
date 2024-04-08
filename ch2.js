
// JavaScript code
let expenses = [];
let monthlyBudget = 0;

// Function to add an expense
function addExpense() {
    const expenseName = document.getElementById('expense-name').value.trim();
    const expenseAmount = parseFloat(document.getElementById('expense-amount').value);
    const expenseCategory = document.getElementById('expense-category').value;

    if (!expenseName || isNaN(expenseAmount) || expenseAmount <= 0) {
        alert('Please enter a valid expense name and amount.');
        return;
    }

    const newExpense = { name: expenseName, amount: expenseAmount, category: expenseCategory };
    expenses.push(newExpense);
    saveExpensesToLocalStorage();
    renderExpenses();
    updateTotalExpenses();

    // Clear input fields
    document.getElementById('expense-name').value = '';
    document.getElementById('expense-amount').value = '';
}

// Function to render expenses list
function renderExpenses() {
    const expensesList = document.getElementById('expenses-list');
    expensesList.innerHTML = '';
    expenses.forEach((expense, index) => {
        const newItem = document.createElement('li');
        newItem.innerHTML = `
            <span>${expense.name}</span>
            <span>$${expense.amount.toFixed(2)}</span>
            <span>${expense.category}</span>
            <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
        `;
        expensesList.appendChild(newItem);
    });
}

// Function to delete an expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    saveExpensesToLocalStorage();
    renderExpenses();
    updateTotalExpenses();
}

// Function to update total expenses and remaining budget
function updateTotalExpenses() {
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const remainingBudget = monthlyBudget - totalExpenses;

  const totalExpensesElement = document.getElementById('total-expenses');
  const remainingBudgetElement = document.getElementById('remaining-budget');
  const noteElement = document.getElementById('note');

  totalExpensesElement.textContent = `Total Expenses: $${totalExpenses.toFixed(2)}`;
  remainingBudgetElement.textContent = `Remaining Budget: $${remainingBudget.toFixed(2)}`;

  if (remainingBudget >= 0) {
      noteElement.textContent = `💪 صحيت يالقبطان! راك تعرف تسير امورك `;
      noteElement.className = 'note good';
  } else {
      noteElement.textContent = ` عندك!! شهريتك راهي في خطر.`;
      noteElement.className = 'note warning';
  }

  if (remainingBudget < 500) {
      noteElement.textContent = `
       .🤨لازم تكون مسؤول كثر
      `;
      noteElement.className = 'note warning';
  }
}


// Function to save expenses to local storage
function saveExpensesToLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Event listener to update monthly budget
document.getElementById('monthly-budget').addEventListener('change', function () {
    monthlyBudget = parseFloat(this.value);
    updateTotalExpenses();
    localStorage.setItem('monthlyBudget', monthlyBudget);
});

// Load expenses and monthly budget from local storage
if (localStorage.getItem('expenses')) {
    expenses = JSON.parse(localStorage.getItem('expenses'));
    renderExpenses();
    updateTotalExpenses();
}
if (localStorage.getItem('monthlyBudget')) {
    monthlyBudget = parseFloat(localStorage.getItem('monthlyBudget'));
    document.getElementById('monthly-budget').value = monthlyBudget;
}
