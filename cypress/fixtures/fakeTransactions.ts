import { Transaction } from '../../src/const/Transaction';
import { TransactionGroup } from '../../src/const/Groups';
import { TransactionType } from '../../src/const/Variants';
import { categoryDictionary } from '../../src/const/categoryDictionary';

const transactions: Transaction[] = [
  {
    amount: Math.floor(Math.random() * 91) + 15,
    text: 'New Earning entry 1',
    type: TransactionType.Earning,
    group: TransactionGroup.Food,
    category: categoryDictionary[TransactionGroup.Food][1],
    createdAt: new Date()
  },
  {
    amount: Math.floor(Math.random() * 91) + 15,
    text: 'New Earning entry 2',
    type: TransactionType.Earning,
    group: TransactionGroup.Clothes,
    category: categoryDictionary[TransactionGroup.Clothes][1],
    createdAt: new Date()
  },
  {
    amount: Math.floor(Math.random() * 91) + 15,
    text: 'New Earning entry 3',
    type: TransactionType.Earning,
    group: TransactionGroup.PersonalExpenses,
    category: categoryDictionary[TransactionGroup.PersonalExpenses][1],
    createdAt: new Date()
  },
  {
    amount: Math.floor(Math.random() * 91) + 15,
    text: 'New Earning entry 4',
    type: TransactionType.Earning,
    group: TransactionGroup.Entertainment,
    category: categoryDictionary[TransactionGroup.Entertainment][1],
    createdAt: new Date()
  },
  {
    amount: Math.floor(Math.random() * 91) + 15,
    text: 'New Expense entry 1',
    type: TransactionType.Expense,
    group: TransactionGroup.Home,
    category: categoryDictionary[TransactionGroup.Home][1],
    createdAt: new Date()
  },
  {
    amount: Math.floor(Math.random() * 91) + 15,
    text: 'New Expense entry 2',
    type: TransactionType.Expense,
    group: TransactionGroup.HealthCare,
    category: categoryDictionary[TransactionGroup.HealthCare][1],
    createdAt: new Date()
  },
  {
    amount: Math.floor(Math.random() * 91) + 15,
    text: 'New Expense entry 3',
    type: TransactionType.Expense,
    group: TransactionGroup.Transport,
    category: categoryDictionary[TransactionGroup.Transport][1],
    createdAt: new Date()
  },
  {
    amount: Math.floor(Math.random() * 91) + 15,
    text: 'New Expense entry 4',
    type: TransactionType.Expense,
    group: TransactionGroup.Other,
    category: categoryDictionary[TransactionGroup.Other][1],
    createdAt: new Date()
  }
];

export const fakeTransactions = transactions; //.sort(() => Math.random() - 0.5);

export const expenseList = transactions.filter((t) => t.type === TransactionType.Expense);
export const earningList = transactions.filter((t) => t.type === TransactionType.Earning);

export const fakeExpense = transactions.filter((t) => t.type === TransactionType.Expense)[0];

export const fakeEarning = transactions.filter((t) => t.type === TransactionType.Earning)[0];
