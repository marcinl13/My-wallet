import { GrAdd } from 'react-icons/gr';
import { Link } from 'react-router-dom';

import BalanceSummary from '@features/BalanceSummary';
import GroupedExpensesSummary from '@features/GroupedExpensesSummary';
import RecentlyCreatedList from '@features/RecentlyCreatedList';

export default function Page() {
  return (
    <>
      <section className="grid grid-cols-2 gap-6 p-3 rounded-md shadow-md bg-sunglow">
        <Link
          to="/add/expense"
          data-testid="btn-add-expense"
          className="flex items-center justify-center gap-3 p-4 font-bold text-white rounded-md bg-crayola">
          <GrAdd size={20} />
          Expense
        </Link>

        <Link
          to="/add/earning"
          data-testid="btn-add-earning"
          className="flex items-center justify-center gap-3 p-4 font-bold text-white rounded-md bg-emerald">
          <GrAdd size={20} />
          Earning
        </Link>
      </section>

      <BalanceSummary />
      <GroupedExpensesSummary />
      <RecentlyCreatedList />
    </>
  );
}
