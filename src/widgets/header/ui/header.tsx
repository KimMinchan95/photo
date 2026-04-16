import {
    HEADER_DESCRIPTION_FONT,
    HEADER_NAME_FONT,
} from "@shared/config";

import { LiveClock } from "@features/live-click";
import { ThemeToggleNoSsr } from "@features/theme-toggle";

import { HeaderNav } from "./header-nav";

export function Header() {
    return (
        <header
            className="sticky top-[2vh] z-50 box-border max-w-[100vw] px-[1.5vw]"
        >
            <div className="grid w-full grid-cols-4 items-start gap-24">
                <div>
                    <p className={HEADER_NAME_FONT}>Kim MinChan:</p>
                    <p className={HEADER_DESCRIPTION_FONT}>
                        Independent Photographer
                    </p>
                </div>
                <div>
                    <p className={HEADER_NAME_FONT}>Location:</p>
                    <p className={HEADER_DESCRIPTION_FONT}>
                        Seoul, Korea (<LiveClock />)
                    </p>
                </div>
                <div>
                    <p className={HEADER_NAME_FONT}>Navigation:</p>
                    <HeaderNav />
                </div>
                <div>
                    <p className={HEADER_NAME_FONT}>Theme:</p>
                    <ThemeToggleNoSsr />
                </div>
            </div>
        </header>
    );
}
