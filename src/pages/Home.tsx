import BalanceSummary from '@features/BalanceSummary';
import GroupedExpensesSummary from '@features/GroupedExpensesSummary';
import RecentlyCreatedList from '@features/RecentlyCreatedList';

export default function Page() {
  return (
    <>
      <BalanceSummary />
      <GroupedExpensesSummary />
      <RecentlyCreatedList />
    </>
  );
}
