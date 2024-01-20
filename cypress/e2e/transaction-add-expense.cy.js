import { fakeExpense } from '../fixtures/fakeTransactions';
import { numberToCurrency, selector, visitRoute } from '../support/utils';

describe('Test add expense transaction flow', () => {
  beforeEach(() => {
    cy.clearTransactions();
  });

  it('Can reach form from home page', () => {
    cy.visit(visitRoute.Home);

    cy.get(selector.btnAdd.expenseSelector).should('have.attr', 'href', visitRoute.AddExpense);
    cy.get(selector.btnAdd.expenseSelector).click();

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/add/expense');
    });
  });

  it('Can submit form', () => {
    cy.visit(visitRoute.AddExpense);

    cy.fillForm(fakeExpense);
  });

  it('Transaction should change cash flow ', () => {
    cy.visit(visitRoute.AddExpense);

    cy.fillForm(fakeExpense);

    cy.visit(visitRoute.Home);

    const incomeAmount = 0;
    const expenseAmount = fakeExpense.amount;
    const diffAmount = incomeAmount - expenseAmount;

    cy.get(selector.balanceSummary.earningAmountSelector).should('have.text', numberToCurrency(incomeAmount));
    cy.get(selector.balanceSummary.diffAmountSelector).should('have.text', numberToCurrency(diffAmount));
    cy.get(selector.balanceSummary.expenseAmountSelector).should('have.text', numberToCurrency(expenseAmount));
  });

  it('Transaction should change recently created list', () => {
    cy.visit(visitRoute.AddExpense);

    cy.fillForm(fakeExpense);

    cy.visit(visitRoute.Home);

    cy.validateRecentlyCreatedListItem(fakeExpense);
  });

  it('Transaction appears on expense group', () => {
    cy.visit(visitRoute.AddExpense);

    cy.fillForm(fakeExpense);

    cy.visit(visitRoute.Home);

    cy.get(`[data-testid="${fakeExpense.group}-item-amount"]`).should(
      'have.text',
      numberToCurrency(fakeExpense.amount)
    );
  });
});
