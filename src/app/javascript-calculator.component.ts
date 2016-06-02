import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'javascript-calculator-app',
  templateUrl: 'javascript-calculator.component.html',
  styleUrls: ['javascript-calculator.component.css']
})
export class JavascriptCalculatorAppComponent {
  title = 'javascript-calculator works!';

  display = '';
  equation = '';

  isAnOperator (p) {
    var operators = ['%', 'x', '-', '+'];
    return (operators.indexOf(p) !== -1);
  }

  equals () {
    var equationToEval = '';
    
    // Keep the operators (delimiters)
    // E.g. '2+2%2' --> ['2', '+', '2', '%', '2']
    var equationArray = this.equation.split(/(,|\+|%|-|x)/);

    // Number() the number strings to prevent leading zero numbers from being converted to octal
    // E.g. 023 === 19 by default
    for (var i = 0; i < equationArray.length; i++) {
      if (!this.isAnOperator(this.equation[i])) {
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
      this.display = String(result);
    }
    this.equation = '';
  }
}
