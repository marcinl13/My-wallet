import { useStorageContext } from '@/Provider';
import { Expense } from '@const/Expense';
import { ExpenseType } from '@const/Variants';

import AddForm from '@features/AddForm';

export default function Page() {
  const { db } = useStorageContext();

  const onSubmit = (formData: Expense) => {
    console.log(formData);

    db.expenses.add(formData);
  };

  return (
    <>
      <h1 className="text-lg font-bold text-center text-white">New Expense</h1>

      <AddForm initialState={{ type: ExpenseType.Expense }} onSubmit={onSubmit} onDelete={() => ({})} />
    </>
  );
}
