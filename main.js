document.querySelector('.grid-container').querySelectorAll('button').forEach(e => {
    if (!e.id)
        return;
    
    switch (e.id) {
        case '/':
            e.addEventListener('click', () => divide());
            break;
        case '+':
            e.addEventListener('click', () => add());
            break;
        case '-':
            e.addEventListener('click', () => subtract());
            break;
        case '*':
            e.addEventListener('click', () => multiply());
            break;
        case '=':
            e.addEventListener('click', () => calc());
            break;
        case '.':
            e.addEventListener('click', () => addDecimal());
            break;
        default:
            e.addEventListener('click', () => addNum(e.id));
    }
});

document.getElementById('delete').addEventListener('click', () => deleteNum());
document.getElementById('reset').addEventListener('click', () => reset());

const operationEl = document.getElementById('op');
const resultEl = document.getElementById('result');

const arr = [0];
let lastOperation = '';
let index = 0;

function divide() {
    if (index === 1) {
        if (lastOperation === '/') {
            const num1 = arr[0], num2 = arr[1];
            const find = num1/num2;
            arr[0] = find;
            arr[1] = 0;
        }
    } else {
        index = 1;
        arr[index] = 0;
    }
    updateUINew('/')
}

function add() {
    if (index === 1) {
        if (lastOperation === '+') {
            const num1 = arr[0], num2 = arr[1];
            const find = num1+num2;
            arr[0] = find;
            arr[1] = 0;
        }
    } else {
        index = 1;
        arr[index] = 0;
    }
    updateUINew('+');
}

function subtract() {
    if (index === 1) {
        if (lastOperation === '-') {
            const num1 = arr[0], num2 = arr[1];
            const find = num1-num2;
            arr[0] = find;
            arr[1] = 0;
        } 
    } else {
        index = 1;
        arr[index] = 0;
    }
    updateUINew('-');
}

function multiply() {
    if (index === 1) {
        if (lastOperation === '*') {
            const num1 = arr[0], num2 = arr[1];
            const find = num1*num2;
            arr[0] = find;
            arr[1] = 0;
        }
    } else {
        index = 1;
        arr[index] = 0;
    }
    updateUINew('*');
}

function calc() {
    switch(lastOperation) {
        case '*':
            multiply();
            break;
        case '+':
            add();
            break;
        case '/':
            divide();
            break;
        case '-':
            subtract();
            break;
        default:
    }
}

function addNum(num) {
    if (isNaN(num)) {
        console.error(num, 'is not a number');
        return;
    }
    if (arr[index] > 999_999_999)
        return;
    
    arr[index] = (arr[index] * 10) + parseFloat(num);
    updateUI();
}

function updateUI() {
    resultEl.textContent = arr[index];
}

function updateUINew(op) {
    operationEl.textContent = `${op} ${arr[0]}`;
    resultEl.textContent = arr[0];
    lastOperation = op;
}

function deleteNum() {
    if (arr[index] === 0)
        return;
    arr[index] = Math.floor(arr[index] / 10);
    updateUI()
}

function reset() {
    arr[0] = 0;
    arr[1] = 0;
    index = 0;
    lastOperation = '';
    operationEl.textContent = '';
    resultEl.textContent = 0;
}