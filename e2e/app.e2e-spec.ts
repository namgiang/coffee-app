import { CoffeeAppPage } from './app.po';

describe('coffee-app App', () => {
  let page: CoffeeAppPage;

  beforeEach(() => {
    page = new CoffeeAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
