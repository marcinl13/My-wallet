import { InputHTMLAttributes } from 'react';

import { TransactionGroup } from '@const/Groups';

interface FormSelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  label: string;
}

export function FormSelectGroup(props: FormSelectProps) {
  const { label, ...inputProps } = props;

  return (
    <div className="space-y-1">
      <label htmlFor={inputProps.id} className="text-sm font-bold text-primary">
        {label}
      </label>

      <select
        {...inputProps}
        data-testid="select-group"
        className="bg-white border text-primary text-sm rounded-lg block w-full p-2.5">
        {Object.values(TransactionGroup).map((val) => (
          <option key={val} value={val}>
            {val}
          </option>
        ))}
      </select>
    </div>
  );
}
