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
});
