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
import { useGroupTransactions } from '@hooks/useGroupTransactions';

import { TimeRangeSelect } from '@components/TimeRangeSelect';

export default function GroupedExpensesSummary() {
  const [selectedTimeRange, setSelectedRange] = useState(TimeRange.CurrentMonth);
  const expensesWithingTimeRange = useGroupTransactions(selectedTimeRange);

  return (
    <section className="flex flex-col gap-6 p-3 text-left rounded-md shadow-md bg-sunglow">
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
    <li className="flex items-center justify-between p-2 rounded-lg bg-primary" data-testid={`${group}-item`}>
      <figure className="bg-white rounded-md text-secondary" data-testid={`${group}-item-icon`}>
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

      <span className="font-semibold text-white" data-testid={`${group}-item-amount`}>
        {amount.toLocaleString('en-us', {
          style: 'currency',
          currency: 'USD'
        })}
      </span>
    </li>
  );
}
