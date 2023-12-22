import { InputHTMLAttributes } from 'react';

interface FieldInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function FormInput(props: FieldInputProps) {
  const { label, ...inputProps } = props;

  return (
    <div className="space-y-1">
      <label htmlFor={inputProps.id} className="text-sm font-bold text-primary">
        {label}
      </label>

      <input {...inputProps} className="bg-white border text-primary text-sm rounded-lg block w-full p-2.5" />
    </div>
  );
}
