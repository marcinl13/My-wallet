import { useState } from 'react';
import {
  IoIosBasket,
  IoIosBoat,
  IoIosCut,
  IoIosHome,
  IoIosSchool,
  IoIosTennisball,
  IoMdCar,
  IoMdCash,
  IoMdMedkit
} from 'react-icons/io';

import { TransactionGroup } from '@const/Groups';
import { TimeRange } from '@const/TimeRanges';
import { useTransactions } from '@hooks/useTransactions';

import { TimeRangeSelect } from '@components/TimeRangeSelect';

export default function GroupedExpensesSummary() {
  const [selectedTimeRange, setSelectedRange] = useState(TimeRange.CurrentMonth);
  const expensesWithingTimeRange = useTransactions(selectedTimeRange);

  return (
    <section className="flex flex-col gap-6 p-3 bg-sunglow rounded-md shadow-md text-left">
      <div className="flex justify-between">
        <h2 className="font-bold text-primary">Expenses by group</h2>
        <TimeRangeSelect value={selectedTimeRange} onChange={(timeRange: TimeRange) => setSelectedRange(timeRange)} />
      </div>

      <ul className="grid grid-cols-2 gap-2 text-white">
        {Object.values(TransactionGroup).map((group) => (
          <GroupExpenseItem
            key={group}
            group={group}
            amount={
              expensesWithingTimeRange?.filter((f) => f.group === group)?.reduce((n, { amount }) => n + amount, 0) || 0
            }
          />
        ))}
      </ul>
    </section>
  );
}

function GroupExpenseItem({
  group,
  amount = 0,
  iconSize = 28
}: {
  group: TransactionGroup;
  amount: number;
  iconSize?: number;
}) {
  return (
    <li className="flex items-center justify-between font-semibold text-white bg-primary rounded-lg p-2">
      <figure className="bg-white text-secondary rounded-md">
        {group === TransactionGroup.Other && <IoMdCash size={iconSize} />}
        {group === TransactionGroup.Home && <IoIosHome size={iconSize} />}
        {group === TransactionGroup.Food && <IoIosBasket size={iconSize} />}
        {group === TransactionGroup.Transport && <IoMdCar size={iconSize} />}
        {group === TransactionGroup.HealthCare && <IoMdMedkit size={iconSize} />}
        {group === TransactionGroup.Entertainment && <IoIosTennisball size={iconSize} />}
        {group === TransactionGroup.PersonalExpenses && <IoIosSchool size={iconSize} />}
        {group === TransactionGroup.Rest && <IoIosBoat size={iconSize} />}
        {group === TransactionGroup.Clothes && <IoIosCut size={iconSize} />}
      </figure>

      {amount.toLocaleString('en-us', {
        style: 'currency',
        currency: 'USD'
      })}
    </li>
  );
}
