
let ExpenseController = (() => {
  let total = 0, savings = 0, expenses = 0, investments = 0;

  return {
    inputEntry(userInput) {
      if (userInput['expenseType'] === 'savings') {
        savings += userInput['value'];
        total += userInput['value'];
      }
      if (userInput['expenseType'] === 'investment') {
        investments += userInput['value'];
        total -= userInput['value'];
      }
      if (userInput['expenseType'] === 'expense') {
        expenses += userInput['value'];
        total -= userInput['value'];
      }
    },

    getSavingsData() {
      return savings;
    },

    getExpensesData() {
      return expenses;
    },

    getInvestmentData() {
      return investments;
    },

    getTotalData() {
      return total;
    }
  }

})();

let UIController = (() => {
  let expenseType = 'savings';

  let HTMLStrings = {
    inExpenseDescription: '.input-expense-description',
    inExpenseValue: '.input-expense-value',
    btnSubmitExpense: '.btn-submit-expense',
    expenseList: '.expense-list',
    currentMonth: '#current-month',
    typeExpense: '#type-expense',
    typeSavings: '#type-savings',
    typeInvestment: '#type-investment',
    trackingText: '.tracking-text',
    expenseChart: '#expense-chart',
    monthBudget: '#month-budget'
  };

  return {
    numberFormat(number) {
      return Intl.NumberFormat('en-IN').format(number);
    },
    showCurrentMonth() {
      let now, month, year, months;

      now = new Date();
      month = now.getMonth();
      year = now.getFullYear();
      months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
        'November', 'December'
      ];
      document.querySelector(HTMLStrings.currentMonth).textContent = months[month] + " " + year;
    },

    getHTMLStrings() {
      return HTMLStrings;
    },

    setExpenseType(type) {
      console.log('here', type);
      this.expenseType = type;
      let emoji = "💰";
      if (type === 'savings') {
        emoji = "💰";
        if (document.querySelector(HTMLStrings.btnSubmitExpense).classList.contains('btn-warning')) {
          document.querySelector(HTMLStrings.btnSubmitExpense).classList.remove('btn-warning');
        }
        if (document.querySelector(HTMLStrings.btnSubmitExpense).classList.contains('btn-danger')) {
          document.querySelector(HTMLStrings.btnSubmitExpense).classList.remove('btn-danger');
        }
        if (!document.querySelector(HTMLStrings.btnSubmitExpense).classList.contains('btn-success')) {
          document.querySelector(HTMLStrings.btnSubmitExpense).classList.add('btn-success');
        }
      }

      if (type === 'expense') {
        emoji = "🧾";
        if (document.querySelector(HTMLStrings.btnSubmitExpense).classList.contains('btn-warning')) {
          document.querySelector(HTMLStrings.btnSubmitExpense).classList.remove('btn-warning');
        }
        if (document.querySelector(HTMLStrings.btnSubmitExpense).classList.contains('btn-success')) {
          document.querySelector(HTMLStrings.btnSubmitExpense).classList.remove('btn-success');
        }
        if (!document.querySelector(HTMLStrings.btnSubmitExpense).classList.contains('btn-danger')) {
          document.querySelector(HTMLStrings.btnSubmitExpense).classList.add('btn-danger');
        }
      }
      if (type === 'investment') {
        emoji = "🏠";
        if (document.querySelector(HTMLStrings.btnSubmitExpense).classList.contains('btn-danger')) {
          document.querySelector(HTMLStrings.btnSubmitExpense).classList.remove('btn-danger');
        }
        if (document.querySelector(HTMLStrings.btnSubmitExpense).classList.contains('btn-success')) {
          document.querySelector(HTMLStrings.btnSubmitExpense).classList.remove('btn-success');
        }
        if (!document.querySelector(HTMLStrings.btnSubmitExpense).classList.contains('btn-warning')) {
          document.querySelector(HTMLStrings.btnSubmitExpense).classList.add('btn-warning');
        }
      }

      document.querySelector(HTMLStrings.trackingText).textContent = "Tracking " + type + " " + emoji;

    },

    getUserExpenseInput() {
      return {
        description: document.querySelector(HTMLStrings.inExpenseDescription).value,
        value: parseInt(document.querySelector(HTMLStrings.inExpenseValue).value),
        date: new Date().toLocaleDateString(),
        expenseType: this.expenseType ? this.expenseType : 'savings'
      }
    },

    addListItem(inputObj) {
      let html, element;
      element = HTMLStrings.expenseList;

      if (inputObj['expenseType'] === 'savings') {
        html = '<div class="bottom-border"> <div class="row expense-row"><div class="col-2 expense-date fs-15">' + inputObj['date'] + ' </div><div class="col-8 expense-text fs-15"> ' + inputObj['description'] + ' </div><div class="col-2 expense-value expense-saving fs-15"> $ ' + this.numberFormat(inputObj['value']) + ' </div></div>'
      } else if (inputObj['expenseType'] === 'expense') {
        html = '<div class="bottom-border"> <div class="row expense-row"><div class="col-2 expense-date fs-15">' + inputObj['date'] + ' </div><div class="col-8 expense-text fs-15"> ' + inputObj['description'] + ' </div><div class="col-2 expense-value expense-cost fs-15"> $ ' + this.numberFormat(inputObj['value']) + ' </div></div>'
      } else if (inputObj['expenseType'] === 'investment') {
        html = '<div class="bottom-border"> <div class="row expense-row"><div class="col-2 expense-date fs-15">' + inputObj['date'] + ' </div><div class="col-8 expense-text fs-15"> ' + inputObj['description'] + ' </div><div class="col-2 expense-value expense-investment fs-15"> $ ' + this.numberFormat(inputObj['value']) + ' </div></div>'
      }

      // Add the new element
      document.querySelector(element).insertAdjacentHTML('beforeend', html);

      // Clear the input fields after adding element
      document.querySelector(HTMLStrings.inExpenseValue).value = "";
      document.querySelector(HTMLStrings.inExpenseDescription).value = "";
    },

    updateOverallTotal(totalValue) {
      document.querySelector(HTMLStrings.monthBudget).textContent = "$ " + this.numberFormat(totalValue);

      if (totalValue > 0) {
        if (document.querySelector(HTMLStrings.monthBudget).classList.contains('expense-cost')) {
          document.querySelector(HTMLStrings.monthBudget).classList.remove('expense-cost');
        }
        document.querySelector(HTMLStrings.monthBudget).classList.add('expense-saving');
      } else {
        if (document.querySelector(HTMLStrings.monthBudget).classList.contains('expense-saving')) {
          document.querySelector(HTMLStrings.monthBudget).classList.remove('expense-saving');
        }
        document.querySelector(HTMLStrings.monthBudget).classList.add('expense-cost');
      }
    },

    displayChart(savings = 0, expenses = 0, investments = 0) {
      let ctx = document.querySelector(HTMLStrings.expenseChart);
      let expenseChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Savings', 'Expenses', 'Investments'],
          datasets: [{
            data: [savings, expenses, investments],
            backgroundColor: [
              'rgba(32, 137, 56, 1)',
              'rgba(255, 84, 98, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 0.5
          }]
        },
        options: {
          legend: {
            labels: {
              fontColor: 'white'
            }
          }
        }
      });
    }
  }
})();

((UIController, ExpenseController) => {

  let HTMLStrings = UIController.getHTMLStrings();
  let setupEventListeners = () => {
    document.querySelector(HTMLStrings.btnSubmitExpense).addEventListener('click', addExpense);
    document.querySelector(HTMLStrings.typeExpense).addEventListener('click', () => {
      setExpenseType('expense')
    });
    document.querySelector(HTMLStrings.typeInvestment).addEventListener('click', () => {
      setExpenseType('investment')
    });
    document.querySelector(HTMLStrings.typeSavings).addEventListener('click', () => {
      setExpenseType('savings')
    });
  };

  let setExpenseType = (type) => {
    UIController.setExpenseType(type);
  }

  let addExpense = () => {
    let input = UIController.getUserExpenseInput();
    console.log(input);

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      console.log('Adding item');
      UIController.addListItem(input);
      ExpenseController.inputEntry(input);
      UIController.updateOverallTotal(ExpenseController.getTotalData());
      UIController.displayChart(ExpenseController.getSavingsData(), ExpenseController.getExpensesData(),
        ExpenseController.getInvestmentData());
    }
  }

  let init = () => {
    console.log('Initializing...');
    setupEventListeners();
    UIController.showCurrentMonth();
  }

  init();

})(UIController, ExpenseController);



// From extra assets foler
// const modal = document.getElementById("myModal");
// const btn = document.getElementById("myBtn");
// const span = document.getElementsByClassName("close")[0];
// btn.onclick = function () {
//   expName.value = "";
//   expNumber.value = "";
//   expenseForm.style.display = "block";
//   editForm.style.display = "none";
//   modal.style.display = "block";
// };
// span.onclick = function () {
//   modal.style.display = "none";
// };
// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// };

// const amountInput = document.getElementById("number");
// const addForm = document.getElementById("addForm");
// const budgetAmount = document.getElementById("budgetAmount");
// const balanceAmount = document.getElementById("balanceAmount");

// const editForm = document.getElementById("editForm");
// const saveEdit = document.getElementById("saveEdit");
// const editExpValue = document.getElementById("editExpValue");
// const editExpNumber = document.getElementById("editExpNumber");

// const expForm = document.getElementById("expForm");
// const expensesAmount = document.getElementById("expensesAmount");
// const expValue = document.getElementById("expValue");
// const displayExpenses = document.getElementById("displayExpenses");
// const expenseForm = document.getElementById("expense-form");
// const budgetform = document.getElementById("budgetform");

// let expName = document.getElementById("expName");
// let expNumber = document.getElementById("expNumber");
// let id = 0;
// let details = [];

// function getBudgetAmount(amount) {
//   if (!amount) {
//     amountInput.style.border = "1px solid #b80c09";
//     amountInput.placeholder = "input can not be empty";
//     amountInput.style.color = "#b80c09";
//     setTimeout(() => {
//       amountInput.style.color = "#495057";
//       amountInput.style.border = "1px solid gray";
//     }, 3000);
//   } else {
//     budgetAmount.innerText = amount;
//     balanceAmount.innerText = amount;
//     expenseForm.style.display = "block";
//     budgetform.style.display = "none";
//     editForm.style.display = "none";
//     amountInput.value = "";
//   }
// }

// function addExpenses(name, number) {
//   if (!name.length || !number.length) {
//     expName.style.border = "1px solid #b80c09";
//     expName.placeholder = "input can not be empty";
//     expName.style.color = "#b80c09";

//     expNumber.style.border = "1px solid #b80c09";
//     expNumber.placeholder = "input can not be empty";
//     expNumber.style.color = "#b80c09";

//     setTimeout(() => {
//       expName.style.color = "#495057";
//       expName.style.border = "1px solid gray";
//       expName.placeholder = "input can not be empty";

//       expNumber.placeholder = "input can not be empty";
//       expNumber.style.border = "1px solid gray";
//       expNumber.style.color = "#495057";
//     }, 3000);
//   } else {
//     const userExp = {
//       id: id,
//       name: name,
//       number: parseInt(number),
//     };
//     details.push(userExp);
//     displayExp(details);
//     id++;
//     expName.value = "";
//     expNumber.value = "";
//   }
// }

// function displayExp(details) {
//   expValue.innerHTML = null;
//   for (i = 0; i < details.length; i++) {
//     expValue.innerHTML += `
//     <div class="expValue" id="${details[i].id}">
//       <div id="expTitleName" class="exp"><p>${details[i].name}</p></div>
//       <div id="expValueAmount" class="exp"><p> <span>$ </span> ${details[i].number}</p></div>
//       <div id="edite_delete">
//         <p>
//           <button id="${details[i].id}" onclick="editExpDetails(${details[i].id})"> <img src="image/edit.svg" width="15" alt=""  /></button> 
//           <button id="${details[i].id}" onclick="delExpenseDetails(${details[i].id})"><img src="image/trash.svg" width="15" alt="" /></button>
//         </p>
//       </div>
//     </div>
//   `;
//   }
//   calcExpenses();
//   displayExpenses.style.display = "block";
// }

// function calcExpenses() {
//   let totalExp = 0;
//   for (i = 0; i < details.length; i++) {
//     totalExp = details[i].number + totalExp;
//   }
//   expensesAmount.innerText = totalExp;
//   updateBalance();
// }

// function updateBalance() {
//   balanceAmount.innerText =
//     parseInt(budgetAmount.innerText) - parseInt(expensesAmount.innerText);
// }

// function delExpenseDetails(id) {
//   let index = details.findIndex((item) => item.id === id);
//   details.splice(index, 1);
//   displayExp(details);
// }

// function editExpDetails(id) {
//   expenseForm.style.display = "none";
//   budgetform.style.display = "none";
//   editForm.style.display = "block";
//   details.findIndex((item) => {
//     if (item.id === id) {
//       editExpName.value = item.name;
//       editExpNumber.value = item.number;
//       saveEdit.children[2].id = item.id;
//       modal.style.display = "block";
//     }
//   });
// }

// function getExpValue(editExpName, editExpNumber, id) {
//   edited = details.findIndex((obj) => obj.id == id);
//   details[edited].name = editExpName;
//   details[edited].number = parseInt(editExpNumber);
//   displayExp(details);
// }

// function callBudget() {
//   budgetform.style.display = "block";
//   expenseForm.style.display = "none";
// }

// saveEdit.addEventListener("submit", (e) => {
//   e.preventDefault();
//   getExpValue(editExpName.value, editExpNumber.value, saveEdit.children[2].id);
// });

// expForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   addExpenses(expName.value, expNumber.value);
// });

// addForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   getBudgetAmount(amountInput.value);
// });
