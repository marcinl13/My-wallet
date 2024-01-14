import { useLiveQuery } from "dexie-react-hooks";

import { useStorageContext } from "@context/Storage";
import { Transaction, TransactionId } from "@const/Transaction";

export function useTransaction(id: TransactionId): Transaction | undefined {
    const { db } = useStorageContext();

    return useLiveQuery(() => db.transactions.get({ id: id }), [id]);
}