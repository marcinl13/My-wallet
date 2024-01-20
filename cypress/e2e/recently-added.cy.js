import { TransactionType } from '../../src/const/Variants';
import { fakeTransactions } from '../fixtures/fakeTransactions';
import { selector, visitRoute } from '../support/utils';

describe('Test recently added widget', () => {
  beforeEach(() => {
    cy.clearTransactions();
    cy.createTransactionsObjectStore().as('objectStore');

    // populate indexedDb
    fakeTransactions.map((t) => cy.getStore('@objectStore').addItem(t));
  });

  it('Chosen tab filters transaction', () => {
    cy.visit(visitRoute.Home);

    const transactionAmount = fakeTransactions.length;
    const earningsAmount = fakeTransactions.filter((t) => t.type === TransactionType.Earning).length;
    const expensesAmount = fakeTransactions.filter((t) => t.type === TransactionType.Expense).length;

    cy.get(selector.recentlyAdded.tab.earning).click();
    cy.get(selector.recentlyAdded.list).children().should('have.length', earningsAmount);

    cy.get(selector.recentlyAdded.tab.expense).click();
    cy.get(selector.recentlyAdded.list).children().should('have.length', expensesAmount);

    cy.get(selector.recentlyAdded.tab.all).click();
    cy.get(selector.recentlyAdded.list).children().should('have.length', transactionAmount);
  });
});
