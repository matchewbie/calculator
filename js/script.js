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
}



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

    screen.textContent = '';

    if (buttons[0].disabled === true) buttons.forEach(button => {

        if (button.id !== 'clr') {

            button.disabled = false;
            button.classList.remove('disabled');
        }
    });
}



function decimalClick() {

    if (!(screen.textContent.includes('.'))) {

        screen.textContent += decimalButton.textContent;
    }
}



function divide(num1, num2) {

    return num1 / num2;
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



function factorial(num) {

	return num ? num * factorial(num - 1) : 1;
}



function multiply(num1, num2) {

	return num1 * num2;
}



function numButtonClick() {

    if (calculate.total !== null && calculate.num2 === null) {

        screen.textContent = '';
        calculate.num2 = Number(this.textContent);
    }

    screen.textContent = (screen.textContent.length + 1) <= 9 ? screen.textContent += this.textContent : `${error()}`;

    if (calculate.operator === 'fct') screen.textContent = `${error()}`;
}



function opButtonClick() {

    if (this.id === 'fct') screen.textContent += '!';

    if (calculate.total !== null && calculate.num2 === null) calculate.num2 = Number(screen.textContent);

    if (calculate.total === null) {

        calculate.total = Number(screen.textContent);
    }
    else {
        total();
    }

    calculate.operator = this.id;
}



function operate(num1, num2, operator) {

    return operator === 'pls' ? add(num1,num2)
         : operator === 'mns' ? subtract(num1, num2)
         : operator === 'mtp' ? multiply(num1, num2)
         : operator === 'dvd' ? divide(num1, num2)
         : operator === 'exp' ? power(num1, num2)
         : factorial(num1);
}



function power(num1, num2) {
	return Math.pow(num1, num2);
}



function subtract(num1, num2) {
	return num1 - num2;
}



function total() {

    calculate.num2 = Number(screen.textContent);

    calculate.total = operate(calculate.total, calculate.num2, calculate.operator);

    calculate.num2 = null;
    
    screen.textContent = `${calculate.total}`;

    if (screen.textContent.length > 9) screen.textContent = `${error()}`;
}