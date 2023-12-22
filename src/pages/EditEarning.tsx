import { useNavigate, useParams } from 'react-router-dom';

import { useStorageContext } from '@/Provider';
import { Expense, ExpenseId } from '@const/Expense';
import { useExpense } from '@hooks/useExpense';

import AddForm from '@features/AddForm';

export default function Page() {
  const { id } = useParams();

  if (!id) {
    return <></>;
  }

  return (
    <>
      <h1 className="text-lg font-bold text-center text-white">Edit Earning</h1>

      <Wrapper id={+id} />
    </>
  );
}

function Wrapper({ id }: Pick<Expense, 'id'>) {
  const expense = useExpense(id);
  const { db } = useStorageContext();
  const navigate = useNavigate();

  const onSubmit = async (formData: Expense) => {
    if (!formData.id) return;

    await db.expenses.update(formData.id, formData);

    alert(`Earning(${formData.id}) successfully updated.`);

    navigate(-1);
  };

  const onDelete = async (id: ExpenseId) => {
    if (!id) return;

    await db.expenses.where('id').equals(id).delete();

    alert(`Earning(${id}) successfully deleted.`);

    navigate(-1);
  };

  return expense && <AddForm initialState={expense} onSubmit={onSubmit} onDelete={onDelete} />;
}
