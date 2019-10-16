function add(num1, num2) {
	return num1 + num2;
}

function subtract(num1, num2) {
	return num1 - num2;
}

function multiply(num1, num2) {
	return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function power(num1, num2) {
	return Math.pow(num1, num2);
}

function factorial(num) {
	return num ? num * factorial(num - 1) : 1;
}

function operate(num1, num2, operator) {

    return operator === '+' ? add(num1,num2)
         : operator === '-' ? subtract(num1, num2)
         : operator === '*' ? multiply(num1, num2)
         : operator === '/' ? divide(num1, num2)
         : operator === '^' ? power(num1, num2)
         : factorial(num1);
}