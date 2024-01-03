import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useStorageContext } from '@context/Storage';
import { Expense, ExpenseId } from '@const/Expense';
import { ExpenseType } from '@const/Variants';
import { useExpense } from '@hooks/useExpense';

import Form from '@features/Form';

export default function Page() {
  const { id, type } = useParams();

  const isEarningType = type === 'earning';

  if (!id) {
    return <></>;
  }

  return (
    <>
      <h1 className="text-lg font-bold text-center text-white">{isEarningType ? 'Edit earning' : 'Edit expense'}</h1>

      <FormWrapper id={+id} isEarningType={isEarningType} />
    </>
  );
}

type Props = Pick<Expense, 'id'> & {
  isEarningType: boolean;
};

function FormWrapper({ id, isEarningType }: Props) {
  const expense = useExpense(id);
  const { db } = useStorageContext();
  const navigate = useNavigate();

  const onSubmit = async (formData: Expense) => {
    try {
      if (!formData.id) return;

      await db.expenses.update(formData.id, formData);

      toast.success(
        `${isEarningType ? ExpenseType.Earning : ExpenseType.Expense} successfully updated.`
      );

      navigate(-1);
    } catch (error) {
      toast.warning((error as Error).message);
    }
  };

  const onDelete = async (id: ExpenseId) => {
    try {
      if (!id) return;

      await db.expenses.where('id').equals(id).delete();

      toast.success(`${isEarningType ? ExpenseType.Earning : ExpenseType.Expense}(${id}) successfully deleted.`);

      navigate(-1);
    } catch (error) {
      toast.warning((error as Error).message);
    }
  };

  return expense && <Form initialState={expense} onSubmit={onSubmit} onDelete={onDelete} />;
}
