import { JavascriptCalculatorPage } from './app.po';

describe('javascript-calculator App', function() {
  let page: JavascriptCalculatorPage;

  beforeEach(() => {
    page = new JavascriptCalculatorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('javascript-calculator works!');
  });
});
