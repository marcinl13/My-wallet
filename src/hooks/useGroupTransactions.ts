import dayjs from 'dayjs';
import { useLiveQuery } from 'dexie-react-hooks';

import { useStorageContext } from '@context/Storage';
import { TimeRange } from '@const/TimeRanges';
import { Transaction } from '@const/Transaction';
import { TransactionType } from '@/const/Variants';

export function useGroupTransactions(timeRange: TimeRange): Transaction[] | undefined {
    const { db } = useStorageContext();

    return useLiveQuery(() => {
        const startOfRange = dayjs().startOf(timeRange).toDate();
        const endOfRange = dayjs().endOf(timeRange).toDate();

        return db.transactions
            .where('createdAt')
            .between(startOfRange, endOfRange, true, true)
            .and((f) => f.type === TransactionType.Expense)
            .reverse()
            .toArray();
    }, [timeRange]);
}
