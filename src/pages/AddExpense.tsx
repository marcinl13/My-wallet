import { useStorageContext } from '@/Provider';
import { Expense } from '@const/Expense';
import { ExpenseType } from '@const/Variants';

import Form from '@features/Form';

export default function Page() {
  const { db } = useStorageContext();

  const onSubmit = (formData: Expense) => {
    db.expenses.add(formData);
  };

  return (
    <>
      <h1 className="text-lg font-bold text-center text-white">New Expense</h1>

      <Form initialState={{ type: ExpenseType.Expense }} onSubmit={onSubmit} onDelete={() => ({})} />
    </>
  );
}
