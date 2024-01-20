import { earningList, fakeTransactions } from '../fixtures/fakeTransactions';
import { selector, visitRoute } from '../support/utils';

describe('Test earing transaction removal', () => {
  beforeEach(() => {
    cy.clearTransactions();
    cy.createTransactionsObjectStore().as('objectStore');

    // populate indexedDb
    fakeTransactions.map((t) => cy.getStore('@objectStore').addItem(t));
  });

  it('Chosen tab filters transaction', () => {
    cy.visit(visitRoute.Home);

    cy.get(selector.recentlyAdded.tab.earning).click();
    cy.get(selector.recentlyAdded.list).children().first().click();
    cy.get(selector.form.btnDelete).click();

    cy.visit(visitRoute.Home);
    cy.get(selector.recentlyAdded.tab.earning).click();
    cy.get(selector.recentlyAdded.list)
      .children()
      .should('have.length', earningList.length - 1);
  });
});
