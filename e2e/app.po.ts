export class JavascriptCalculatorPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('javascript-calculator-app h1')).getText();
  }
}
