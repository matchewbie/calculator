## Calculator
#### Operations included:
- Add
- Subtract
- Multiply
- Divide
- Square Root
- Exponentiation

#### Applied functionality:
Buttons
- Clear (reset memory and empty screen)
- Backspace (digit-by-digit on screen)

Rounding
- ([Jack Moore's](http://www.jacklmoore.com/notes/rounding-in-javascript/) rounding solution utilizing exponential notation)

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