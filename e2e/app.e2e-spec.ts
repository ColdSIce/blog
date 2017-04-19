import { ComplexPage } from './app.po';

describe('complex App', function() {
  let page: ComplexPage;

  beforeEach(() => {
    page = new ComplexPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
