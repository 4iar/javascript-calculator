import { Component } from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'javascript-calculator-app',
  templateUrl: 'javascript-calculator.component.html',
  styleUrls: ['javascript-calculator.component.css'],
  host: {
    '(window:keydown)': 'handleKey($event)'
  },
})
export class JavascriptCalculatorAppComponent {
  title = 'javascript-calculator works!';

  equation = '';

  isAnOperator (p) {
    var operators = ['/', '*', '-', '+', '(', ')'];
    return (operators.indexOf(p) !== -1);
  }

  equals () {
    if (this.equation === '') {
      return;
    }
    
    var equationToEval = '';

    // Keep the operators (delimiters)
    // E.g. '2+2%2' --> ['2', '+', '2', '%', '2']
    var equationArray = this.equation.split(/(\+|\/|-|\*|\(|\))/);
    equationArray = equationArray.filter(function (item) {return item !== ''});

    // Number() the number strings to prevent leading zero numbers from being converted to octal
    // E.g. 023 === 19 by default
    for (var i = 0; i < equationArray.length; i++) {
      if (!this.isAnOperator(equationArray[i])) {
        equationToEval += Number(equationArray[i]);
      } else {
        equationToEval += equationArray[i];
      }
    }

    // Display NaN if the equation is invalid
    // E.g. '2+++', '2+2+', etc...
    var result = ''
    try {
      result = eval(equationToEval);
    } catch (e) {
      if (e instanceof ReferenceError || e instanceof SyntaxError) {
        result = 'NaN'
      }
    } finally {
      this.equation = String(result);
    }
  }

  pressNumber (number) {
    this.equation += number;
  };

  operation (op) {
    this.equation += op;
  };

  clear () {
    this.equation = '';
  }

  backspace () {
    // Treat NaN as a single character so the user doesn't have to backspace 3 times to remove NaN
    // TODO: might be cleaner to use a regex to catch NaN at the end
    if (this.equation.slice(this.equation.length - 3, this.equation.length) === 'NaN') {
      this.equation = this.equation.slice(0, this.equation.length - 3);
    } else {
      this.equation = this.equation.slice(0, this.equation.length - 1);
    }
  }

  handleKey (event) {
    // Need to handle shift -- can't just shift AND 5/8 because layouts are different?
    // sample event.code: 'KeyC', 'KeyX', 'Digit1', 'Digit2'
    // this code is disgusting  TODO: make less bad
    var key = event.code;

    if (key === 'Enter' || key === 'Equal') {
      this.equals();
      return;
    }

    if (key === 'Slash') {
      this.operation('/');
      return;
    }

    if (key === 'Minus') {
      this.operation('-');
      return;
    }

    if (key.slice(0, 5) === 'Digit') {
        this.pressNumber(key.slice(5));
    } else if (key.slice(0, 3) === 'Key') {
      switch (key.slice(3)) {
        case 'C': this.clear(); break;
        case 'X': this.operation('*'); break;
      }
    }
  }
}
