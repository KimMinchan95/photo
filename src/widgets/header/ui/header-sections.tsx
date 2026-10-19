import { DESCRIPTION_FONT, NAME_FONT } from "@shared/config";
import { cn } from "@shared/lib";

import { LiveClock } from "@features/live-click";
import { ThemeToggle } from "@features/theme-toggle";

import { HeaderNav } from "./header-nav";

export function HeaderBrand() {
    return (
        <div>
            <p className={cn(NAME_FONT)}>Kim MinChan:</p>
            <p className={cn(DESCRIPTION_FONT)}>Independent Photographer</p>
        </div>
    );
}

export function HeaderLocation() {
    return (
        <div>
            <p className={cn(NAME_FONT)}>Location:</p>
            <p className={cn(DESCRIPTION_FONT)}>
                Seoul, Korea (<LiveClock />)
            </p>
        </div>
    );
}

export function HeaderNavigation({
    onNavigate,
    orientation = "horizontal",
    showLabel = true,
    variant = "meta",
}: {
    onNavigate?: () => void;
    orientation?: "horizontal" | "vertical";
    showLabel?: boolean;
    variant?: "meta" | "sheet";
}) {
    return (
        <div>
            {showLabel ? <p className={cn(NAME_FONT)}>Navigation:</p> : null}
            <HeaderNav onNavigate={onNavigate} orientation={orientation} variant={variant} />
        </div>
    );
}

export function HeaderTheme() {
    return (
        <div>
            <p className={cn(NAME_FONT)}>Theme:</p>
            <ThemeToggle />
        </div>
    );
}
