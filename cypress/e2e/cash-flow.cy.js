import { TransactionType } from '../../src/const/Variants';
import { fakeTransactions } from '../fixtures/fakeTransactions';
import { numberToCurrency, selector, visitRoute } from '../support/utils';

describe('Test cash flow component', () => {
  beforeEach(() => {
    cy.clearTransactions();
    cy.createTransactionsObjectStore().as('objectStore');

    // populate indexedDb
    fakeTransactions.map((t) => cy.getStore('@objectStore').addItem(t));
  });

  it('Transaction should change cash flow ', () => {
    cy.visit(visitRoute.Home);

    const incomeAmount = fakeTransactions
      .filter((t) => t.type === TransactionType.Earning)
      .reduce((acc, cur) => acc + cur.amount, 0);

    const expenseAmount = fakeTransactions
      .filter((t) => t.type === TransactionType.Expense)
      .reduce((acc, cur) => acc + cur.amount, 0);

    const diffAmount = incomeAmount - expenseAmount;

    cy.get(selector.balanceSummary.earningAmountSelector).should('have.text', numberToCurrency(incomeAmount));
    cy.get(selector.balanceSummary.diffAmountSelector).should('have.text', numberToCurrency(diffAmount));
    cy.get(selector.balanceSummary.expenseAmountSelector).should('have.text', numberToCurrency(expenseAmount));
  });
});
