import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function useRelativeTimeFormat(date: Date) {
    return dayjs(date).fromNow()
}