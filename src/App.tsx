import { TimeRange } from "@const/TimeRanges";
import { ExpenseType } from "@const/Variants";
import { useExpenses } from "@hooks/useExpenses";

export default function App() {
  const expenses = useExpenses(TimeRange.CurrentMonth);

  return (
    <ul className="p-2 space-y-2 text-sm bg-white rounded-lg">
      {expenses?.map((item) => (
        <li key={item.id} className={item.type === ExpenseType.Earning ? "text-emerald" : "text-crayola"}>
          ({item.type}) {item.text} <span className="font-bold">${item.amount}</span>
        </li>
      ))}
    </ul>
  );
}
