import { FormEvent, useReducer } from 'react';
import { twMerge } from 'tailwind-merge';

import { Category } from '@const/Categories';
import { categoryDictionary } from '@const/categoryDictionary';
import { TransactionGroup } from '@const/Groups';
import { Transaction, TransactionId } from '@const/Transaction';
import { TransactionType } from '@const/Variants';

import { ButtonVariant, FormButton } from '@components/FormButton';
import { FormInput } from '@components/FormInput';
import { FormSelectGroup } from '@components/FormSelectGroup';
import { FormSelectGroupCategory } from '@components/FormSelectGroupCategory';

const baseState: Transaction = {
  amount: 0,
  text: '',
  type: TransactionType.Expense,
  group: TransactionGroup.Home,
  category: categoryDictionary[TransactionGroup.Home][0],
  createdAt: new Date()
};

type FormProps = {
  initialState?: Partial<Transaction>;
  onSubmit: (formData: Transaction) => void;
  onDelete: (id: TransactionId) => void;
};

export default function Form({ initialState, onSubmit, onDelete }: FormProps) {
  const [formData, setFormData] = useReducer(
    (prev: Transaction, curr: Partial<Transaction>) => ({ ...prev, ...curr }),
    {
      ...baseState,
      ...initialState
    }
  );

  const onFromSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit(formData);
  };

  return (
    <form onSubmit={onFromSubmit} className="flex flex-col gap-4 p-3 rounded-lg bg-sunglow">
      <fieldset className="flex flex-col gap-3">
        <FormInput
          required
          label="Title"
          id="title"
          value={formData.text}
          placeholder="Title"
          maxLength={50}
          onChange={(e) => setFormData({ text: e.target.value })}
        />

        <FormInput
          required
          label="Amount"
          type="number"
          id="amount"
          value={formData.amount}
          placeholder="0"
          onChange={(e) => setFormData({ amount: e.target.valueAsNumber || 0 })}
        />

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <FormSelectGroup
            required
            label="Group"
            id="group"
            value={formData.group}
            onChange={(e) =>
              setFormData({
                group: e.target.value as TransactionGroup,
                category: categoryDictionary[e.target.value as TransactionGroup][0]
              })
            }
          />

          <FormSelectGroupCategory
            required
            label="Category"
            group={formData.group as TransactionGroup}
            value={formData.category}
            onChange={(e) => setFormData({ category: e.target.value as Category })}
          />
        </div>
      </fieldset>

      <section className={twMerge('grid gap-3', !!formData?.id && 'grid-cols-1 md:grid-cols-2')}>
        <FormButton type="submit" variant={ButtonVariant.Save} text={formData?.id ? 'Update' : 'Save'} />

        {!!formData?.id && (
          <FormButton
            type="button"
            variant={ButtonVariant.Delete}
            text="Delete"
            onClick={() => onDelete(formData.id)}
          />
        )}
      </section>
    </form>
  );
}
