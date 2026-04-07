import { DEFAULT_LOCALE } from "../model/constants";

export function formatTime(date: Date) {
    return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }).format(date);
}
