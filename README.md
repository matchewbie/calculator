# Calculator
## Operations included:
- Add
- Subtract
- Multiply
- Divide
- Square Root
- Exponentiation

## Additional functionality:
Buttons
- Clear (reset memory and empty screen)
```
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
```
- Backspace (digit-by-digit on screen)
```
function backspace() {

    var back = [...screen.textContent.split('')];

    back.splice(-1, 1);
    back = back.join('');

    screen.textContent = `${back}`;
}
```

Rounding
```
round(calculate.total, findPrecision(calculate.total))
```
- [Jack Moore](http://www.jacklmoore.com/notes/rounding-in-javascript/)'s Rounding Solution (utilizing exponential notation)
```
function round(num, precision) {

    return Number(Math.round(num + 'e' + precision) + 'e-' + precision);
}
```

- Decimal Precision (based on availability of digits on screen)
```
function findPrecision(num) {

    num = `${num}`.split('.');

    return 9 - (num[0].length + 1);
}
```

ERROR Handling
```
function error() {

    buttons.forEach(button => {

        if (button.id !== 'clr') {

            button.disabled = true;
            button.classList.add('disabled');
        }
    });
    
    return 'ERROR';
}
```


from THE ODIN PROJECT