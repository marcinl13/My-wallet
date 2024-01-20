import { TransactionGroup } from '../../../src/const/Groups';
import { TransactionType } from '../../../src/const/Variants';
import { fakeTransactions } from '../../fixtures/fakeTransactions';
import { numberToCurrency, sumTransactions, visitRoute } from '../../support/utils';

describe('Test transaction group widget', () => {
  beforeEach(() => {
    cy.clearTransactions();
    cy.createTransactionsObjectStore().as('objectStore');

    // populate indexedDb
    fakeTransactions.map((t) => cy.getStore('@objectStore').addItem(t));
  });

  it('Filter transactions after clicking tab', () => {
    cy.visit(visitRoute.Home);

    const transactions = fakeTransactions.filter((t) => t.type === TransactionType.Expense);

    for (const key in TransactionGroup) {
      if (Object.hasOwnProperty.call(TransactionGroup, key)) {
        const group = TransactionGroup[key];
        const amount = sumTransactions(transactions, group);

        cy.get(`[data-testid="${group}-item-amount"]`).should('have.text', numberToCurrency(amount));
      }
    }
  });
});
