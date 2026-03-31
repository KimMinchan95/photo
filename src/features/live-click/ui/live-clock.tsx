"use client";

import { useEffect, useState } from "react";

function formatTime(date: Date) {
    return new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }).format(date);
}

export function LiveClock() {
    const [currentTime, setCurrentTime] = useState<string>(() => formatTime(new Date()));

    useEffect(() => {
        const timerId = setInterval(() => {
            setCurrentTime(formatTime(new Date()));
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, []);

    return <span>{currentTime}</span>;
}
