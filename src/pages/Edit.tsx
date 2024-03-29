import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useStorageContext } from '@context/Storage';
import { Transaction, TransactionId } from '@const/Transaction';
import { TransactionType } from '@const/Variants';
import { useTransaction } from '@hooks/useTransaction';

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

type Props = Pick<Transaction, 'id'> & {
  isEarningType: boolean;
};

function FormWrapper({ id, isEarningType }: Props) {
  const expense = useTransaction(id);
  const { updateTransaction, deleteTransaction } = useStorageContext();
  const navigate = useNavigate();

  const onSubmit = async (formData: Transaction) => {
    try {
      if (!formData.id) {
        throw new Error(`Couldn't find the ${isEarningType ? TransactionType.Earning : TransactionType.Expense} id.`);
      }

      await updateTransaction(formData.id, formData);

      toast.success(`${isEarningType ? TransactionType.Earning : TransactionType.Expense} successfully updated.`);

      navigate(-1);
    } catch (error) {
      toast.warning((error as Error).message);
    }
  };

  const onDelete = async (id: TransactionId) => {
    try {
      if (!id) {
        throw new Error(`Couldn't find the ${isEarningType ? TransactionType.Earning : TransactionType.Expense} id.`);
      }

      await deleteTransaction(id);

      toast.success(`${isEarningType ? TransactionType.Earning : TransactionType.Expense} successfully deleted.`);

      navigate(-1);
    } catch (error) {
      toast.warning((error as Error).message);
    }
  };

  return expense && <Form initialState={expense} onSubmit={onSubmit} onDelete={onDelete} />;
}
