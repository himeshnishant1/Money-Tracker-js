const form = document.querySelector(".add-transaction-form");
const incomeHistory = document.querySelector(".income-details");
const expenseHistory = document.querySelector(".expense-details");
const balanceStats = document.querySelector(".balance");
const incomeStats = document.querySelector(".income");
const expenseStats = document.querySelector(".expense");

let balance = 0;
let income = 0;
let expense = 0;

updateStats();

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const source = form['input-transaction-source'].value;
    const amount = form['input-transaction-amount'].value;
    if(amount > 0)  setIncomeHistory(source, amount);
    else if(amount < 0) setExpenseHistory(source, amount);
});

function setIncomeHistory(source, amount){
    const rand = new Date().getSeconds() + new Date().getFullYear() * new Date().getMilliseconds();
    const currentDateTime = (new Date()).toLocaleString().split(",");
    const r = rand % 235;
    const g = (rand + r) % 200;
    const b = (rand + g) % 210;
    const card = `<div class="card in">
                    <span style="background-color: rgb(${r}, ${g}, ${b});" class="card-span-color"></span>
                    <div class="card-inner1">
                        <div class="card-inner11">
                            <span class="card-source">${source}</span>
                            <span class="card-date-time">${currentDateTime[1]} ${currentDateTime[0]}</span>
                        </div>
                        <div class="card-inner12">
                            <span class="card-amount">$${amount}</span>
                            <i onclick="deleteCard(event)" class="bi bi-trash"></i>
                        </div>
                    </div>
                </div>`;
    incomeHistory.innerHTML += card;
    income = income + parseFloat(amount);
    balance = income - expense;
    updateStats();
}

function setExpenseHistory(source, amount){
    const rand = new Date().getSeconds() + new Date().getFullYear() * new Date().getMilliseconds();
    const currentDateTime = (new Date()).toLocaleString().split(",");
    const r = rand % 235;
    const g = (rand + r) % 200;
    const b = (rand + g) % 210;
    const card = `<div class="card ex">
                    <span style="background-color: rgb(${r}, ${g}, ${b});" class="card-span-color"></span>
                    <div class="card-inner1">
                        <div class="card-inner11">
                            <span class="card-source">${source}</span>
                            <span class="card-date-time">${currentDateTime[1]} ${currentDateTime[0]}</span>
                        </div>
                        <div class="card-inner12">
                            <span class="card-amount">$${0-amount}</span>
                            <i onclick="deleteCard(event)" class="bi bi-trash"></i>
                        </div>
                    </div>
                </div>`;
    expenseHistory.innerHTML += card;
    expense += (0 - parseFloat(amount));
    balance = income - expense;
    updateStats();
}

function updateStats(){
    balanceStats.innerHTML = `Balance: $${balance}`;
    incomeStats.innerHTML = `Income: $${income}`;
    expenseStats.innerHTML = `Expense: $${expense}`;
}


function deleteCard(event){
    if(event.target.classList.contains("bi-trash")){
        const card = event.target.parentElement.parentElement.parentElement;
        //console.log();
        const amount = parseFloat((event.target.parentElement.children[0].innerHTML).substring(1));
        if(card.classList.contains("in")){
            income = income - amount;
            balance = income - expense;;
        }
        else if(card.classList.contains("ex")){
            expense = expense - amount;
            balance = income - expense;
        }
        card.remove();
        updateStats();
    }
}
