import { earningList, expenseList, fakeTransactions } from '../../fixtures/fakeTransactions';
import { numberToCurrency, selector, sumTransactions, visitRoute } from '../../support/utils';

describe('Test cash flow component', () => {
  beforeEach(() => {
    cy.clearTransactions();
    cy.createTransactionsObjectStore().as('objectStore');

    // populate indexedDb
    fakeTransactions.map((t) => cy.getStore('@objectStore').addItem(t));
  });

  it('Transaction should change cash flow ', () => {
    cy.visit(visitRoute.Home);

    const incomeAmount = sumTransactions(earningList);
    const expenseAmount = sumTransactions(expenseList);
    const diffAmount = incomeAmount - expenseAmount;

    cy.get(selector.balanceSummary.earningAmountSelector).should('have.text', numberToCurrency(incomeAmount));
    cy.get(selector.balanceSummary.diffAmountSelector).should('have.text', numberToCurrency(diffAmount));
    cy.get(selector.balanceSummary.expenseAmountSelector).should('have.text', numberToCurrency(expenseAmount));
  });
});
