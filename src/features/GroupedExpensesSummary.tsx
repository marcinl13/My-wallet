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

import { TimeRangeSelect } from '@components/TimeRangeSelect';
import { ExpenseGroup } from '@const/Groups';
import { TimeRange } from '@const/TimeRanges';
import { useExpenses } from '@hooks/useExpenses';

export default function GroupedExpensesSummary() {
  const [selectedTimeRange, setSelectedRange] = useState(TimeRange.CurrentMonth);
  const expensesWithingTimeRange = useExpenses(selectedTimeRange);

  return (
    <section className="flex flex-col gap-6 p-3 bg-sunglow rounded-md shadow-md text-left">
      <div className="flex justify-between">
        <h2 className="font-bold text-primary">Expenses by group</h2>
        <TimeRangeSelect value={selectedTimeRange} onChange={(timeRange: TimeRange) => setSelectedRange(timeRange)} />
      </div>

      <ul className="grid grid-cols-2 gap-2 text-white">
        {Object.values(ExpenseGroup).map((group) => (
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
  group: ExpenseGroup;
  amount: number;
  iconSize?: number;
}) {
  return (
    <li className="flex items-center justify-between font-semibold text-white bg-primary rounded-lg p-2">
      <figure className="bg-white text-secondary rounded-md">
        {group === ExpenseGroup.Income && <IoMdCash size={iconSize} />}
        {group === ExpenseGroup.Home && <IoIosHome size={iconSize} />}
        {group === ExpenseGroup.Food && <IoIosBasket size={iconSize} />}
        {group === ExpenseGroup.Transport && <IoMdCar size={iconSize} />}
        {group === ExpenseGroup.HealthCare && <IoMdMedkit size={iconSize} />}
        {group === ExpenseGroup.Entertainment && <IoIosTennisball size={iconSize} />}
        {group === ExpenseGroup.PersonalExpenses && <IoIosSchool size={iconSize} />}
        {group === ExpenseGroup.Rest && <IoIosBoat size={iconSize} />}
        {group === ExpenseGroup.Clothes && <IoIosCut size={iconSize} />}
      </figure>

      {amount.toLocaleString('en-us', {
        style: 'currency',
        currency: 'USD'
      })}
    </li>
  );
}
