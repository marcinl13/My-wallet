import { useState } from 'react';

import { TimeRange } from '@const/TimeRanges';
import { Transaction } from '@const/Transaction';
import { TransactionType } from '@const/Variants';
import { useTransactions } from '@hooks/useTransactions';

import { TimeRangeSelect } from '@components/TimeRangeSelect';

export default function BalanceSummary() {
  const [selectedTimeRange, setSelectedRange] = useState(TimeRange.CurrentMonth);
  const expensesWithingTimeRange = useTransactions(selectedTimeRange);

  return (
    <section className="flex flex-col col-span-2 gap-6 p-3 rounded-md shadow-md bg-sunglow">
      <div className="flex justify-between">
        <h2 className="font-bold text-primary">Cash flow</h2>
        <TimeRangeSelect value={selectedTimeRange} onChange={(timeRange) => setSelectedRange(timeRange)} />
      </div>

      <Summary expensesWithingTimeRange={expensesWithingTimeRange || []} />
    </section>
  );
}

function Summary({ expensesWithingTimeRange }: { expensesWithingTimeRange: Transaction[] }) {
  const earning: number =
    expensesWithingTimeRange
      ?.filter((e: Transaction) => e.type === TransactionType.Earning)
      .reduce((n, { amount }) => n + amount, 0) || 0;

  const expense: number =
    expensesWithingTimeRange
      ?.filter((e: Transaction) => e.type === TransactionType.Expense)
      .reduce((n, { amount }) => n + amount, 0) || 0;

  const balance: number = earning - expense;

  return (
    <ul className="grid h-24 grid-cols-3 font-medium text-white bg-primary">
      <li
        data-testid="balance-summary-earning-amount"
        className="flex items-center justify-start gap-2 p-2 bg-emerald"
        style={{
          clipPath: 'polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)'
        }}>
        {earning.toLocaleString('en-us', {
          style: 'currency',
          currency: 'USD'
        })}
      </li>

      <li data-testid="balance-summary-diff-amount" className="flex items-center justify-center gap-2 p-2">
        {balance.toLocaleString('en-us', {
          style: 'currency',
          currency: 'USD'
        })}
      </li>

      <li
        data-testid="balance-summary-expense-amount"
        className="flex items-center justify-end gap-2 p-2 bg-crayola"
        style={{ clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)' }}>
        {expense.toLocaleString('en-us', {
          style: 'currency',
          currency: 'USD'
        })}
      </li>
    </ul>
  );
}
