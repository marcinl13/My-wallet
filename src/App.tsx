import BalanceSummary from '@features/BalanceSummary';
import GroupedExpensesSummary from '@features/GroupedExpensesSummary';
import RecentlyCreatedList from '@features/RecentlyCreatedList';

export default function App() {
  return (
    <>
      <BalanceSummary />
      <GroupedExpensesSummary />
      <RecentlyCreatedList />
    </>
  );
}
