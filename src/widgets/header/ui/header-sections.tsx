import {
    HEADER_DESCRIPTION_FONT,
    HEADER_NAME_FONT,
} from "@shared/config";

import { LiveClock } from "@features/live-click";
import { ThemeToggleNoSsr } from "@features/theme-toggle";

import { HeaderNav } from "./header-nav";

export function HeaderBrand() {
    return (
        <div>
            <p className={HEADER_NAME_FONT}>Kim MinChan:</p>
            <p className={HEADER_DESCRIPTION_FONT}>
                Independent Photographer
            </p>
        </div>
    );
}

export function HeaderLocation() {
    return (
        <div>
            <p className={HEADER_NAME_FONT}>Location:</p>
            <p className={HEADER_DESCRIPTION_FONT}>
                Seoul, Korea (<LiveClock />)
            </p>
        </div>
    );
}

export function HeaderNavigation({
    onNavigate,
    orientation = "horizontal",
    compact = false,
}: {
    onNavigate?: () => void;
    orientation?: "horizontal" | "vertical";
    compact?: boolean;
}) {
    return (
        <div className={compact ? "flex flex-col gap-0" : undefined}>
            <p className={HEADER_NAME_FONT}>Navigation:</p>
            <HeaderNav
                onNavigate={onNavigate}
                orientation={orientation}
                compact={compact}
            />
        </div>
    );
}

export function HeaderTheme() {
    return (
        <div>
            <p className={HEADER_NAME_FONT}>Theme:</p>
            <ThemeToggleNoSsr />
        </div>
    );
}
