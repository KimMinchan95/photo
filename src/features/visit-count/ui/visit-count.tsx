"use client";

import { useEffect, useState } from "react";

import { cn } from "@shared/lib";

import type { VisitCounts } from "../model/types";

export function VisitCount() {
    const [counts, setCounts] = useState<VisitCounts | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        void fetch("/api/visits", { signal: controller.signal })
            .then((response) => (response.ok ? response.json() : null))
            .then((data: VisitCounts | null) => {
                if (typeof data?.today === "number" && typeof data.total === "number") {
                    setCounts(data);
                }
            })
            .catch(() => {
                setCounts(null);
                console.error("Failed to fetch visit counts");
            });

        return () => controller.abort();
    }, []);

    return (
        <p className={cn("mt-4 font-sans text-xs leading-[1.95] text-(--text-gray)")}>
            {`visitors: ${counts?.today?.toLocaleString("en-US") || "0"} / ${counts?.total?.toLocaleString("en-US") || "0"}`}
        </p>
    );
}
