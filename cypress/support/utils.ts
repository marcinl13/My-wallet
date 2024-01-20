export function numberToCurrency(amount: number): string {
  return amount.toLocaleString('en-us', {
    style: 'currency',
    currency: 'USD'
  });
}

export const selector = {
  btnAdd: {
    earningSelector: '[data-testid="btn-add-earning"]',
    expenseSelector: '[data-testid="btn-add-expense"]'
  },
  balanceSummary: {
    earningAmountSelector: '[data-testid="balance-summary-earning-amount"]',
    diffAmountSelector: '[data-testid="balance-summary-diff-amount"]',
    expenseAmountSelector: '[data-testid="balance-summary-expense-amount"]'
  },
  form: {
    inputTitle: '[data-testid="input-title"]',
    inputAmount: '[data-testid="input-amount"]',
    selectGroup: '[data-testid="select-group"]',
    selectCategory: '[data-testid="select-category"]',
    btnSubmit: '[data-testid="btn-save"]',
    btnDelete: '[data-testid="btn-delete"]',
  },
  recentlyAdded: {
    tab: {
      all: '[data-testid="list-tab-all"]',
      earning: '[data-testid="list-tab-earning"]',
      expense: '[data-testid="list-tab-expenses"]',
    },
    list: '[data-testid="list"]'
  }
};

export const visitRoute = {
  Home: '/',
  AddExpense: '/add/expense',
  AddEarning: '/add/earning'
};