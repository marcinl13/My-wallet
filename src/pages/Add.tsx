import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useStorageContext } from '@context/Storage';
import { categoryDictionary } from '@const/categoryDictionary';
import { TransactionGroup } from '@const/Groups';
import { Transaction } from '@const/Transaction';
import { TransactionType } from '@const/Variants';

import Form from '@features/Form';

export default function Page() {
  const { type } = useParams();
  const navigate = useNavigate();
  const { db } = useStorageContext();

  const initialStateEarning: Partial<Transaction> = {
    type: TransactionType.Earning,
    group: TransactionGroup.Other,
    category: categoryDictionary[TransactionGroup.Other][0]
  };

  const initialStateExpense: Partial<Transaction> = {
    type: TransactionType.Expense,
    group: TransactionGroup.Home,
    category: categoryDictionary[TransactionGroup.Home][0]
  };

  const isEarningType = type === 'earning';

  const onSubmit = async (formData: Transaction) => {
    try {
      await db.transactions.add(formData);

      toast.success(`${isEarningType ? TransactionType.Earning : TransactionType.Expense} successfully added.`);

      navigate(-1);
    } catch (error) {
      toast.warning((error as Error).message);
    }
  };

  return (
    <>
      <h1 className="text-lg font-bold text-center text-white" data-testid="heading">
        {isEarningType ? 'New earning' : 'New expense'}
      </h1>

      <Form
        initialState={isEarningType ? initialStateEarning : initialStateExpense}
        onSubmit={onSubmit}
        onDelete={() => ({})}
      />
    </>
  );
}
