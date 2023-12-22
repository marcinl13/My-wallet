import { useStorageContext } from '@/Provider';
import { categoryDictionary } from '@const/categoryDictionary';
import { Expense } from '@const/Expense';
import { ExpenseGroup } from '@const/Groups';
import { ExpenseType } from '@const/Variants';

import Form from '@features/Form';

export default function Page() {
  const { db } = useStorageContext();

  const onSubmit = (formData: Expense) => {
    db.expenses.add(formData);
  };

  return (
    <>
      <h1 className="text-lg font-bold text-center text-white">New Earning</h1>

      <Form
        initialState={{
          type: ExpenseType.Earning,
          group: ExpenseGroup.Income,
          category: categoryDictionary[ExpenseGroup.Income][0]
        }}
        onSubmit={onSubmit}
        onDelete={() => ({})}
      />
    </>
  );
}
