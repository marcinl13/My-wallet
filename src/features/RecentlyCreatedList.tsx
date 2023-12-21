import { useState } from 'react';
import { IoIosTrendingDown, IoIosTrendingUp } from 'react-icons/io';
import { twMerge } from 'tailwind-merge';

import { Expense } from '@const/Expense';
import { TimeRange } from '@const/TimeRanges';
import { ExpenseType } from '@const/Variants';
import { useExpenses } from '@hooks/useExpenses';

import { TimeRangeSelect } from '@components/TimeRangeSelect';

enum TabOption {
  All = 'All',
  Earning = 'Earning',
  Expenses = 'Expenses'
}

export default function RecentlyCreatedList() {
  const [activeTab, setActiveTab] = useState<string>(TabOption.All);
  const [selectedTimeRange, setSelectedRange] = useState(TimeRange.CurrentMonth);
  const expensesWithingTimeRange = useExpenses(selectedTimeRange);

  return (
    <section className="flex flex-col gap-2 p-3 bg-sunglow rounded-md shadow-md">
      <div>
        <div className="flex justify-between pb-1 border-b-2 border-primary">
          <h2 className="font-bold text-primary">Recently added</h2>
          <TimeRangeSelect onChange={(timeRange) => setSelectedRange(timeRange)} value={selectedTimeRange} />
        </div>

        <ul className="grid grid-cols-3 gap-1 leading-6 text-center font-semibold text-sm border-b-2 border-primary">
          {Object.keys(TabOption).map((tab) => (
            <li
              key={tab}
              className={twMerge('hover:cursor-pointer', activeTab === tab && 'bg-secondary text-white')}
              onClick={() => setActiveTab(tab)}>
              {tab}
            </li>
          ))}
        </ul>
      </div>

      {activeTab === TabOption.Earning && (
        <ExpensesList expenses={expensesWithingTimeRange.filter((ex) => ex.type === ExpenseType.Earning)} />
      )}

      {activeTab === TabOption.Expenses && (
        <ExpensesList expenses={expensesWithingTimeRange.filter((ex) => ex.type === ExpenseType.Expense)} />
      )}

      {activeTab === TabOption.All && <ExpensesList expenses={expensesWithingTimeRange} />}
    </section>
  );
}

function ExpensesList({ expenses }: { expenses: Expense[] }) {
  if (!expenses.length) {
    return <p className="flex items-center justify-center h-40 text-white">Not found</p>;
  }

  return (
    <div className="flex flex-col overflow-y-auto max-h-40 pr-2">
      {expenses.map((expense: Expense) => (
        <ExpensesListItem key={expense.id} expense={expense} />
      ))}
    </div>
  );
}

function ExpensesListItem({ expense }: { expense: Expense }) {
  const isIncome: boolean = expense.type === ExpenseType.Earning;

  return (
    <article
      className={twMerge(
        'flex items-center gap-4 p-1.5 odd:bg-slate-400',
        isIncome ? 'text-emerald hover:text-emerald' : 'text-crayola hover:text-crayola'
      )}>
      <figure className="rounded-full bg-white p-1">
        {!isIncome && <IoIosTrendingDown size={30} />}
        {isIncome && <IoIosTrendingUp size={30} />}
      </figure>

      <div className="flex flex-col w-full text-primary text-left">
        <p className="font-bold">{expense.text}</p>

        <p className="text-xs">
          {new Intl.DateTimeFormat('en-us', {
            dateStyle: 'long',
            timeStyle: 'short'
          }).format(expense.createdAt)}
        </p>
      </div>

      <div className="font-bold">
        {expense.amount.toLocaleString('en-us', {
          style: 'currency',
          currency: 'USD'
        })}
      </div>
    </article>
  );
}
