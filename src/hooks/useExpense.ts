import { useLiveQuery } from "dexie-react-hooks";

import { useStorageContext } from "@/Provider";
import { Expense, ExpenseId } from "@const/Expense";

export function useExpense(id: ExpenseId): Expense | undefined {
    const { db } = useStorageContext();

    return useLiveQuery(() => db.expenses.get({ id: id }), [id]) as Expense | undefined;
}