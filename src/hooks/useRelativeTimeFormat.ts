import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function useRelativeTimeFormat(date: Date): string {
    return dayjs(date).fromNow()
}