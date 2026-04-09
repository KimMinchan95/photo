"use client";

import { useEffect, useState } from "react";

import { formatTime } from "../lib/util";
import { DEFAULT_TIME_PLACEHOLDER } from "../model/constants";

export function LiveClock() {
    const [currentTime, setCurrentTime] = useState<string | null>(null);

    useEffect(() => {
        const initTimerId = window.setTimeout(() => {
            setCurrentTime(formatTime(new Date()));
        }, 0);

        const timerId = setInterval(() => {
            setCurrentTime(formatTime(new Date()));
        }, 1000);

        return () => {
            clearTimeout(initTimerId);
            clearInterval(timerId);
        };
    }, []);

    return <span suppressHydrationWarning>{currentTime ?? DEFAULT_TIME_PLACEHOLDER}</span>;
}
