import { useNavigate, useParams } from 'react-router-dom';

import { useStorageContext } from '@context/Storage';
import { categoryDictionary } from '@const/categoryDictionary';
import { Expense } from '@const/Expense';
import { ExpenseGroup } from '@const/Groups';
import { ExpenseType } from '@const/Variants';

import Form from '@features/Form';

export default function Page() {
  const { type } = useParams();
  const navigate = useNavigate();
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

  const isEarningType = type === 'earning';

  const onSubmit = async (formData: Expense) => {
    const id = await db.expenses.add(formData);

    alert(`${isEarningType ? ExpenseType.Earning : ExpenseType.Expense}(${id}) successfully added.`);

    navigate(-1);
  };

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
