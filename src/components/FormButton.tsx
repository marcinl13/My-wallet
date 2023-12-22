import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export enum ButtonVariant {
  Save = 'Save',
  Delete = 'Delete'
}

interface FormButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  text: string;
}

export function FormButton(props: FormButton) {
  const { variant, text, ...buttonProps } = props;

  return (
    <button
      {...buttonProps}
      className={twMerge(
        'font-semibold rounded-lg text-semibold px-5 py-2.5 text-center',
        variant === ButtonVariant.Delete && 'text-white bg-crayola',
        variant === ButtonVariant.Save && 'text-white bg-emerald'
      )}>
      {text}
    </button>
  );
}
