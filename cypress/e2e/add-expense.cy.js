import { categoryDictionary } from '../../src/const/categoryDictionary';
import { TransactionGroup } from '../../src/const/Groups';
import { TransactionType } from '../../src/const/Variants';
import { numberToCurrency, selector, visitRoute } from '../support/utils';

const expense = {
  id: 1,
  amount: Math.floor(Math.random() * 91) + 15,
  text: 'New Expense entry',
  type: TransactionType.Expense,
  group: TransactionGroup.Transport,
  category: categoryDictionary[TransactionGroup.Transport][2],
  createdAt: new Date()
};

describe('Add expense flow', () => {
  beforeEach(() => {
    cy.clearTransactionsDB();
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

    cy.fillForm(expense);
  });

  it('Transaction should change cash flow ', () => {
    cy.visit(visitRoute.AddExpense);

    cy.fillForm(expense);

    cy.visit(visitRoute.Home);

    const incomeAmount = 0;
    const expenseAmount = expense.amount;
    const diffAmount = incomeAmount - expenseAmount;

    cy.get(selector.balanceSummary.earningAmountSelector).should('have.text', numberToCurrency(incomeAmount));
    cy.get(selector.balanceSummary.diffAmountSelector).should('have.text', numberToCurrency(diffAmount));
    cy.get(selector.balanceSummary.expenseAmountSelector).should('have.text', numberToCurrency(expenseAmount));
  });

  it('Transaction should change recently created list', () => {
    cy.visit(visitRoute.AddExpense);

    cy.fillForm(expense);

    cy.visit(visitRoute.Home);

    cy.validateRecentlyCreatedListItem(expense);
  });

  it('Transaction appears on expense group', () => {
    cy.visit(visitRoute.AddExpense);

    cy.fillForm(expense);

    cy.visit(visitRoute.Home);

    cy.get(`[data-testid="${expense.group}-item-amount"]`).should('have.text', numberToCurrency(expense.amount));
  });
});
