import { useState } from 'react';
import { IoIosTrendingDown, IoIosTrendingUp } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import { TimeRange } from '@const/TimeRanges';
import { Transaction } from '@const/Transaction';
import { TransactionType } from '@const/Variants';
import { useExpenses } from '@hooks/useExpenses';
import { useRelativeTimeFormat } from '@hooks/useRelativeTimeFormat';

import { TimeRangeSelect } from '@components/TimeRangeSelect';

enum TabOption {
  All = 'All',
  Earning = 'Earning',
  Expenses = 'Expenses'
}

export default function RecentlyCreatedList() {
  const [activeTab, setActiveTab] = useState<string>(TabOption.All);
  const [selectedTimeRange, setSelectedRange] = useState(TimeRange.CurrentDay);
  const expensesWithingTimeRange = useExpenses(selectedTimeRange);

  return (
    <section className="flex flex-col gap-2 p-3 rounded-md shadow-md bg-sunglow">
      <div>
        <div className="flex justify-between pb-1 border-b-2 border-primary">
          <h2 className="font-bold text-primary">Recently added</h2>
          <TimeRangeSelect onChange={(timeRange) => setSelectedRange(timeRange)} value={selectedTimeRange} />
        </div>

        <ul className="grid grid-cols-3 gap-1 text-sm font-semibold leading-6 text-center border-b-2 border-primary">
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
        <ExpensesList expenses={expensesWithingTimeRange.filter((ex) => ex.type === TransactionType.Earning)} />
      )}

      {activeTab === TabOption.Expenses && (
        <ExpensesList expenses={expensesWithingTimeRange.filter((ex) => ex.type === TransactionType.Expense)} />
      )}

      {activeTab === TabOption.All && <ExpensesList expenses={expensesWithingTimeRange} />}
    </section>
  );
}

function ExpensesList({ expenses }: { expenses: Transaction[] }) {
  if (!expenses.length) {
    return <p className="flex items-center justify-center h-40 text-lg font-bold md:text-xl text-primary">Not found</p>;
  }

  return (
    <div className="flex flex-col h-40 pr-2 overflow-y-auto">
      {expenses.map((expense: Transaction) => (
        <ExpensesListItem key={expense.id} expense={expense} />
      ))}
    </div>
  );
}

function ExpensesListItem({ expense }: { expense: Transaction }) {
  const isIncomeType: boolean = expense.type === TransactionType.Earning;
  const createdTimeAgo = useRelativeTimeFormat(expense.createdAt);

  return (
    <Link
      to={isIncomeType ? `edit/earning/${expense.id}` : `edit/expense/${expense.id}`}
      className={twMerge(
        'flex items-center gap-4 p-1.5',
        isIncomeType ? 'text-emerald hover:text-emerald' : 'text-crayola hover:text-crayola'
      )}>
      <figure className="p-1 bg-white rounded-full">
        {!isIncomeType && <IoIosTrendingDown size={30} />}
        {isIncomeType && <IoIosTrendingUp size={30} />}
      </figure>

      <div className="flex flex-col w-full text-primary">
        <p className="overflow-x-hidden font-bold text-ellipsis max-w-[40vw] md:max-w-none whitespace-nowrap">
          {expense.text}
        </p>

        <p className="text-xs">{createdTimeAgo}</p>
      </div>

      <div className="font-bold">
        {expense.amount.toLocaleString('en-us', {
          style: 'currency',
          currency: 'USD'
        })}
      </div>
    </Link>
  );
}
