import { TransactionGroup } from "../../src/const/Groups";
import { Transaction } from "../../src/const/Transaction";

export function numberToCurrency(amount: number): string {
  return amount.toLocaleString('en-us', {
    style: 'currency',
    currency: 'USD'
  });
}

export function sumTransactions(transaction: Transaction[], group: TransactionGroup) {
  return transaction.filter((f) => f.group === group)?.reduce((n, { amount }) => n + amount, 0);
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
    list: '[data-testid="list"]',
    listItem: {
      title: '[data-testid="list-item-text"]',
      amount: '[data-testid="list-item-amount"]',
      time: '[data-testid="list-item-time"]',
      iconExpense: '[data-testid="list-item-icon-expense"]',
      iconEarning: '[data-testid="list-item-icon-earning"]',
    }
  }
};

export const visitRoute = {
  Home: '/',
  AddExpense: '/add/expense',
  AddEarning: '/add/earning'
};