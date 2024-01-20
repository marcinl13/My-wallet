import { fakeEarning } from '../fixtures/fakeTransactions';
import { numberToCurrency, selector, visitRoute } from '../support/utils';

describe('Test add earning transaction flow', () => {
  beforeEach(() => {
    cy.clearTransactions();
  });

  it('Can reach form from home page', () => {
    cy.visit(visitRoute.Home);

    cy.get(selector.btnAdd.earningSelector).should('have.attr', 'href', visitRoute.AddEarning);
    cy.get(selector.btnAdd.earningSelector).click();

    cy.location().should((location) => {
      expect(location.pathname).to.eq(visitRoute.AddEarning);
    });
  });

  it('Can submit form', () => {
    cy.visit(visitRoute.AddEarning);

    cy.fillForm(fakeEarning);
  });

  it('Transaction should change cash flow ', () => {
    cy.visit(visitRoute.AddEarning);

    cy.fillForm(fakeEarning);

    cy.visit(visitRoute.Home);

    const incomeAmount = fakeEarning.amount;
    const expenseAmount = 0;
    const diffAmount = incomeAmount - expenseAmount;

    cy.get(selector.balanceSummary.earningAmountSelector).should('have.text', numberToCurrency(incomeAmount));
    cy.get(selector.balanceSummary.diffAmountSelector).should('have.text', numberToCurrency(diffAmount));
    cy.get(selector.balanceSummary.expenseAmountSelector).should('have.text', numberToCurrency(expenseAmount));
  });

  it('Transaction should change recently created list', () => {
    cy.visit(visitRoute.AddEarning);

    cy.fillForm(fakeEarning);

    cy.visit(visitRoute.Home);

    cy.validateRecentlyCreatedListItem(fakeEarning);
  });
});
