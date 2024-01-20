import { TransactionType } from '../../src/const/Variants';
import { fakeTransactions } from '../fixtures/fakeTransactions';
import { selector, visitRoute } from '../support/utils';

describe('Test expense transaction removal', () => {
  beforeEach(() => {
    cy.clearTransactions();
    cy.createTransactionsObjectStore().as('objectStore');

    // populate indexedDb
    fakeTransactions.map((t) => cy.getStore('@objectStore').addItem(t));
  });

  it('Chosen tab filters transaction', () => {
    cy.visit(visitRoute.Home);

    cy.get(selector.recentlyAdded.tab.expense).click();
    cy.get(selector.recentlyAdded.list).children().first().click();
    cy.get(selector.form.btnDelete).click();

    const expenseAmount = fakeTransactions.filter((t) => t.type === TransactionType.Expense).length - 1;

    cy.visit(visitRoute.Home);
    cy.get(selector.recentlyAdded.tab.expense).click();
    cy.get(selector.recentlyAdded.list).children().should('have.length', expenseAmount);
  });
});
