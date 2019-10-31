const screen = document.getElementById('screen');

const buttons = document.querySelectorAll('button');

const decimalButton = document.getElementById('dcml');

const numButtons = document.querySelectorAll('.number');
numButtons.forEach(button => button.addEventListener('click', numButtonClick));

const opButtons = document.querySelectorAll('.operator');
opButtons.forEach(button => button.addEventListener('click', opButtonClick));

const calculate = {
    total : null,
    num2 : null,
    operator : null,
    decimal : false
}



window.addEventListener('keydown', event => {
    console.log(event.key);
    
    getKeyboardInput(event);

    if (event.key === '/') event.preventDefault();
});

window.addEventListener('keyup', event => {
    console.log(event.key);

    getKeyboardInput(event);
});



let newScreen = true;
let keyPress = false;



function add(num1, num2) {

	return num1 + num2;
}



function backspace() {

    var back = [...screen.textContent.split('')];

    back.splice(-1, 1);
    back = back.join('');

    screen.textContent = `${back}`;
}



function clearAll() {

    calculate.operator = null;
    calculate.total = null;
    calculate.num2 = null;
    calculate.decimal = false;

    newScreen = true;

    screen.textContent = '';

    if (buttons[1].disabled === true) buttons.forEach(button => {

        if (button.id !== 'clr') {

            button.disabled = false;
            button.classList.remove('disabled');
        }
    });
}



function decimalClick() {

    if (!(`${screen.textContent}`.includes('.'))) calculate.decimal = false;

    if (calculate.decimal === false || newScreen) {

        if (newScreen) screen.textContent = '';

        screen.textContent = (screen.textContent.length + 1) <= 9 ? screen.textContent += decimalButton.textContent : `${error()}`;
        
        calculate.decimal = true;
        newScreen = false;
    }
}



function divide(num1, num2) {

    if (num2 === 0) {

        return screen.textContent = `${error()}`;
    }
    else {
        return num1 / num2;
    }
}



function error() {

    buttons.forEach(button => {

        if (button.id !== 'clr') {

            button.disabled = true;
            button.classList.add('disabled');
        }
    });
    
    return 'ERROR';
}



function findPrecision(num) {

    num = `${num}`.split('.');

    return 9 - (num[0].length + 1);
}



function getKeyboardInput(e) {

    e.key = (e.key.indexOf('numpad') !== -1) ? isNumpad(e) : e.key;

    if (e.key >= 0 && e.key < 10) {

        numButtons.forEach(button => {

            if (button.innerText === e.key) toggleButton(button.id, e);
        });
    }
    else {
        switch (e.key) {

            case '+':
            case 'Add':
            case 'add':
                toggleButton('pls', e);
                break;

            case '-':
            case 'Subtract':
            case 'subtract':
                toggleButton('mns', e);
                break;

            case '=':
            case 'Equals':
            case 'equals':
            case 'Equal Sign':
            case 'equal sign':
            case 'Enter':
            case 'enter':
                toggleButton('eqls', e);
                break;

            case '/':
            case 'Divide':
            case 'divide':
                toggleButton('dvd', e);
                break;
            
            case '*':
            case 'Multiply':
            case 'multiply':
                toggleButton('mtp', e);
                break;

            case '.':
            case 'Decimal':
            case 'decimal':
            case 'Decimal Point':
            case 'decimal point':
            case 'period':
                toggleButton('dcml', e);
                break;

            case 'c':
            case 'C':
                toggleButton('clr', e);
                break;

            case 'Backspace':
                toggleButton('bsp', e);
                break;

            case 'y':
            case '^':
                toggleButton('exp', e);
                break;

            case 's':
            case '√':
                toggleButton('sqrt', e);
        }
    }
}



function isNumpad(e) {
    var numpad = e.key.split(' ');
    numpad.splice(0, 1);

    return numpad.join('');
}



function multiply(num1, num2) {

	return num1 * num2;
}



function numButtonClick() {

    if (newScreen) {

        screen.textContent = '';

        newScreen = false;
    }

    screen.textContent = (screen.textContent.length + 1) <= 9 ? screen.textContent += this.textContent : `${error()}`;
}



function opButtonClick() {

    if (calculate.total !== null && calculate.num2 === null && newScreen === false) calculate.num2 = Number(screen.textContent);

    if (screen.textContent !== '' && calculate.total === null) calculate.total = Number(screen.textContent);

    if (calculate.num2 !== null) total();
    
    if (calculate.total === null) {
        calculate.operator = null;
    }
    else {
        calculate.operator = this.id;
    }

    if (calculate.operator === 'sqrt') total();

    calculate.decimal = false;
    newScreen = true;
}



function operate(num1, num2, operator) {

    return operator === 'pls' ? add(num1,num2)
         : operator === 'mns' ? subtract(num1, num2)
         : operator === 'mtp' ? multiply(num1, num2)
         : operator === 'dvd' ? divide(num1, num2)
         : operator === 'exp' ? power(num1, num2)
         : squareRoot(num1);
}



function power(num1, num2) {

	return Math.pow(num1, num2);
}



function round(num, precision) {

    return Number(Math.round(num + 'e' + precision) + 'e-' + precision);
}



function subtract(num1, num2) {

	return num1 - num2;
}



function squareRoot(num) {

    return Math.sqrt(num);
}



function toggleButton(key, e) {

    var button = document.getElementById(key);

    if (e.type === 'keydown') {
        
        button.classList.add('key-press');
    }
    else {
        button.click();
        button.classList.remove('key-press');
    }
}



function total() {

    if (calculate.total !== null && calculate.operator !== null) {

        calculate.num2 = Number(screen.textContent);

        calculate.total = operate(calculate.total, calculate.num2, calculate.operator);

        calculate.num2 = null;
        calculate.operator = null;
        
        screen.textContent = `${round(calculate.total, findPrecision(calculate.total))}`;
    }

    if (screen.textContent === 'Infinity' || screen.textContent === 'NaN') screen.textContent = `${error()}`;
}