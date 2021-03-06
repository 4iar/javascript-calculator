import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { JavascriptCalculatorAppComponent } from '../app/javascript-calculator.component';

beforeEachProviders(() => [JavascriptCalculatorAppComponent]);

describe('App: JavascriptCalculator', () => {
  it('should create the app',
    inject([JavascriptCalculatorAppComponent], (app: JavascriptCalculatorAppComponent) => {
      expect(app).toBeTruthy();
    }));

  it('should initialise equationHistory to an empty array',
    inject([JavascriptCalculatorAppComponent], (app: JavascriptCalculatorAppComponent) => {
      expect(app.equationHistory).toEqual([]);
    }));

  it('should initialise equation to an empty string',
    inject([JavascriptCalculatorAppComponent], (app: JavascriptCalculatorAppComponent) => {
      expect(app.equation).toEqual('');
    }));

  describe('Function: equals', () => {
    it('it should return NaN if the expression is invalid',
      inject([JavascriptCalculatorAppComponent], (app: JavascriptCalculatorAppComponent) => {
        app.equation = '2++';
        app.equals();
        expect(app.equation).toEqual('NaN');
      }));

    it('it should evaluate the expression in this.equation and put the result in this.equation',
      inject([JavascriptCalculatorAppComponent], (app: JavascriptCalculatorAppComponent) => {
        app.equation = '2+2';
        app.equals();
        expect(app.equation).toEqual('4');

        app.equation = '49+2';
        app.equals();
        expect(app.equation).toEqual('51');

        app.equation = '99/3';
        app.equals();
        expect(app.equation).toEqual('33');
      }));

    it('it should not convert numbers with leading zeroes to octal ',
      inject([JavascriptCalculatorAppComponent], (app: JavascriptCalculatorAppComponent) => {
        app.equation = '017';
        app.equals();
        expect(app.equation).toEqual('17');
      }));

    it('if this.equation is an empty string it should be kept as an empty string when this.equals() is called',
      inject([JavascriptCalculatorAppComponent], (app: JavascriptCalculatorAppComponent) => {
        app.equation = '';
        app.equals();
        expect(app.equation).toEqual('');
      }));
    
    it('should push the equation and its result to this.equationHistory',
      inject([JavascriptCalculatorAppComponent], (app: JavascriptCalculatorAppComponent) => {
        app.equation = '2+2';
        app.equals();
        expect(app.equationHistory).toEqual(['2+2 = 4']);
        app.equation = '5+5';
        app.equals();
        expect(app.equationHistory).toEqual(['2+2 = 4', '5+5 = 10']);
      })); 
    
    it('does not push the equation to this.equationHistory if the new equation is identical to the previous one',
      inject([JavascriptCalculatorAppComponent], (app: JavascriptCalculatorAppComponent) => {
        app.equation = '2+2';
        app.equals();
        app.equation = '2+2';
        app.equals();
        expect(app.equationHistory).toEqual(['2+2 = 4']);
      }));     
    
  });

  describe('Function: pressNumber', () => {
    it('should append the number this.equation',
      inject([JavascriptCalculatorAppComponent], (app:JavascriptCalculatorAppComponent) => {
        app.equation = '2+';
        app.pressNumber('2');
        expect(app.equation).toEqual('2+2');

        app.equation = '';
        app.pressNumber('9');
        expect(app.equation).toEqual('9');
      }));
  });

  describe('Function: operation', () => {
    it('should append the operation to this.equation',
      inject([JavascriptCalculatorAppComponent], (app:JavascriptCalculatorAppComponent) => {
        app.equation = '2';
        app.operation('+');
        expect(app.equation).toEqual('2+');

        app.equation = '40';
        app.operation('.');
        expect(app.equation).toEqual('40.');

        app.equation = '';
        app.operation('(');
        app.equation += '20';
        app.operation(')');
        expect(app.equation).toEqual('(20)');
      }));
  });

  describe('Function: clear', () => {
    it('should set this.equation to an empty string',
      inject([JavascriptCalculatorAppComponent], (app:JavascriptCalculatorAppComponent) => {
        app.equation = '2+4+2';
        app.clear();
        expect(app.equation).toEqual('');
      }));
    
    
  });

  describe('Function: backspace', () => {
    it('should remove the last character from this.equation',
      inject([JavascriptCalculatorAppComponent], (app:JavascriptCalculatorAppComponent) => {
        app.equation = '2+4+2';

        app.backspace();
        expect(app.equation).toEqual('2+4+');
        app.backspace();
        expect(app.equation).toEqual('2+4');
      }));

    it('should remove NaN on a single call',
      inject([JavascriptCalculatorAppComponent], (app:JavascriptCalculatorAppComponent) => {
        app.equation = 'NaN';
        app.backspace();
        expect(app.equation).toEqual('');
      }));
  });

});
