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

  it('should have as title \'javascript-calculator works!\'',
      inject([JavascriptCalculatorAppComponent], (app: JavascriptCalculatorAppComponent) => {
    expect(app.title).toEqual('javascript-calculator works!');
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
        
        app.equation = '9/3';
        app.equals();
        expect(app.equation).toEqual('3');
      }));

    it('it should not convert numbers with leading zeroes to octal ',
      inject([JavascriptCalculatorAppComponent], (app: JavascriptCalculatorAppComponent) => {
        app.equation = '017';
        app.equals();
        expect(app.equation).toEqual('17');
      }));
  });



});
