import dayjs from "dayjs";
import { useLiveQuery } from "dexie-react-hooks";

import { useStorageContext } from "@context/Storage";
import { TimeRange } from "@const/TimeRanges";
import { Transaction } from "@const/Transaction";

export function useTransactions(timeRange: TimeRange): Transaction[] | undefined {
    const { db } = useStorageContext();

    return useLiveQuery(() => {
        const startOfRange = dayjs().startOf(timeRange).toDate();
        const endOfRange = dayjs().endOf(timeRange).toDate();

        return db.expenses.where("createdAt").between(startOfRange, endOfRange, true, true).reverse().toArray();
    }, [timeRange]) as Transaction[] | undefined;
}