import { ChangeEvent, useId } from 'react';

import { TimeRange } from '@const/TimeRanges';

type Props = {
  onChange: (event: TimeRange) => void;
  value: string;
};

export function TimeRangeSelect({ value, onChange }: Props) {
  const id = useId();

  const onHandleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as TimeRange);
  };

  return (
    <select
      name={id}
      id={id}
      className="border border-secondary text-primary text-sm rounded-lg focus:ring focus:outline-secondary px-1.5 capitalize text-right"
      value={value}
      onChange={onHandleChange}>
      {Object.values(TimeRange).map((timeRange) => (
        <option key={timeRange} dir="rtl" value={timeRange}>
          {timeRange}
        </option>
      ))}
    </select>
  );
}
