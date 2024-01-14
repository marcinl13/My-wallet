import { useLiveQuery } from "dexie-react-hooks";

import { useStorageContext } from "@context/Storage";
import { Transaction, TransactionId } from "@const/Transaction";

export function useExpense(id: TransactionId): Transaction | undefined {
    const { db } = useStorageContext();

    return useLiveQuery(() => db.expenses.get({ id: id }), [id]) as Transaction | undefined;
}