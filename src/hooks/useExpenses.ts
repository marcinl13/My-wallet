import dayjs from "dayjs";
import { useLiveQuery } from "dexie-react-hooks";

import { useStorageContext } from "@/Provider";
import { Expense } from "@const/Expense";
import { TimeRange } from "@const/TimeRanges";

export function useExpenses(timeRange: TimeRange): Expense[] {
    const { db } = useStorageContext();

    const expensesWithingTimeRange = useLiveQuery(() => {
        const startOfRange = dayjs().startOf(timeRange).toDate();
        const endOfRange = dayjs().endOf(timeRange).toDate();

        return db.expenses.where("createdAt").between(startOfRange, endOfRange, true, true).reverse().toArray();
    }, [timeRange]) || [];

    return expensesWithingTimeRange as Expense[];
}