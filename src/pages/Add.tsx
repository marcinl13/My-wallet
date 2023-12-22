import { useParams } from 'react-router-dom';

import { useStorageContext } from '@/Provider';
import { categoryDictionary } from '@const/categoryDictionary';
import { Expense } from '@const/Expense';
import { ExpenseGroup } from '@const/Groups';
import { ExpenseType } from '@const/Variants';

import Form from '@features/Form';

export default function Page() {
  const { type } = useParams();
  const { db } = useStorageContext();

  const initialStateEarning: Partial<Expense> = {
    type: ExpenseType.Earning,
    group: ExpenseGroup.Income,
    category: categoryDictionary[ExpenseGroup.Income][0]
  };

  const initialStateExpense: Partial<Expense> = {
    type: ExpenseType.Expense,
    group: ExpenseGroup.Home,
    category: categoryDictionary[ExpenseGroup.Home][0]
  };

  const onSubmit = (formData: Expense) => {
    db.expenses.add(formData);
  };

  const isEarningType = type === 'earning';

  return (
    <>
      <h1 className="text-lg font-bold text-center text-white">{isEarningType ? 'New earning' : 'New expense'}</h1>

      <Form
        initialState={isEarningType ? initialStateEarning : initialStateExpense}
        onSubmit={onSubmit}
        onDelete={() => ({})}
      />
    </>
  );
}
