import { expenseList, fakeTransactions } from '../../fixtures/fakeTransactions';
import { selector, visitRoute } from '../../support/utils';

describe('Test recently added widget', () => {
  beforeEach(() => {
    cy.clearTransactions();
    cy.createTransactionsObjectStore().as('objectStore');

    // populate indexedDb
    fakeTransactions.map((t) => cy.getStore('@objectStore').addItem(t));
  });

  it('Chosen tab filters transaction', () => {
    cy.visit(visitRoute.Home);

    cy.get(selector.recentlyAdded.tab.earning).click();
    cy.get(selector.recentlyAdded.list).children().should('have.length', expenseList.length);

    cy.get(selector.recentlyAdded.tab.expense).click();
    cy.get(selector.recentlyAdded.list).children().should('have.length', expenseList.length);

    cy.get(selector.recentlyAdded.tab.all).click();
    cy.get(selector.recentlyAdded.list).children().should('have.length', fakeTransactions.length);
  });
});
