import { UdemyRecipeBookPage } from './app.po';

describe('udemy-recipe-book App', function() {
  let page: UdemyRecipeBookPage;

  beforeEach(() => {
    page = new UdemyRecipeBookPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('rb works!');
  });
});
