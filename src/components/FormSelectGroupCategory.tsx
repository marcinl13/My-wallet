import { InputHTMLAttributes } from 'react';

import { categoryDictionary } from '@const/categoryDictionary';
import { ExpenseGroup } from '@const/Groups';

interface FormSelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  label: string;
  group: ExpenseGroup;
}

export function FormSelectGroupCategory(props: FormSelectProps) {
  const { label, group, ...inputProps } = props;

  return (
    <div className="space-y-1">
      <label htmlFor={inputProps.id} className="text-sm font-bold text-primary">
        {label}
      </label>

      <select
        {...inputProps}
        className="bg-white border text-primary text-sm rounded-lg block w-full p-2.5"
        aria-label="category select">
        {Object.values(categoryDictionary[group]).map((val) => (
          <option key={val} value={val}>
            {val}
          </option>
        ))}
      </select>
    </div>
  );
}
