import { categoryDictionary } from '../../src/const/categoryDictionary';
import { TransactionGroup } from '../../src/const/Groups';
import { TransactionType } from '../../src/const/Variants';
import { numberToCurrency, selector, visitRoute } from '../support/utils';

const expense = {
  id: 1,
  amount: Math.floor(Math.random() * 91) + 15,
  text: 'New Earning entry',
  type: TransactionType.Earning,
  group: TransactionGroup.Food,
  category: categoryDictionary[TransactionGroup.Food][1],
  createdAt: new Date()
};

describe('Test expense creation flow', () => {
  beforeEach(() => {
    cy.clearTransactionsDB();
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

    cy.fillForm(expense);
  });

  it('Transaction should change cash flow ', () => {
    cy.visit(visitRoute.AddEarning);

    cy.fillForm(expense);

    cy.visit(visitRoute.Home);

    const incomeAmount = expense.amount;
    const expenseAmount = 0;
    const diffAmount = incomeAmount - expenseAmount;

    cy.get(selector.balanceSummary.earningAmountSelector).should('have.text', numberToCurrency(incomeAmount));
    cy.get(selector.balanceSummary.diffAmountSelector).should('have.text', numberToCurrency(diffAmount));
    cy.get(selector.balanceSummary.expenseAmountSelector).should('have.text', numberToCurrency(expenseAmount));
  });

  it('Transaction should change recently created list', () => {
    cy.visit(visitRoute.AddEarning);

    cy.fillForm(expense);

    cy.visit(visitRoute.Home);

    cy.validateRecentlyCreatedListItem(expense);
  });

  it('Transaction appears on expense group', () => {
    cy.visit(visitRoute.AddEarning);

    cy.fillForm(expense);

    cy.visit(visitRoute.Home);

    cy.get(`[data-testid="${expense.group}-item-amount"]`).should('have.text', numberToCurrency(expense.amount));
  });
});
