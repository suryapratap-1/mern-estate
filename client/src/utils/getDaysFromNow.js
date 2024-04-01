import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const getDaysFromNow = (date) => {
    return dayjs(date).fromNow();
}