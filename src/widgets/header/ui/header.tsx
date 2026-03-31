import { NAME_FONT, DESCRIPTION_FONT } from "@widgets/header/model/constants";
import { LiveClock } from "@features/live-click";
import { cn } from "@shared/lib";

export function Header() {
    return (
        <header className="fixed inset-x-0 top-[2vh] z-50 box-border max-w-[100vw] px-[1.5vw]">
            <div className="grid w-full grid-cols-4 items-start gap-24">
                <div>
                    <p className={NAME_FONT}>Kim MinChan:</p>
                    <p className={DESCRIPTION_FONT}>Independent Photographer</p>
                </div>
                <div>
                    <p className={NAME_FONT}>Location:</p>
                    <p className={DESCRIPTION_FONT}>
                        Seoul, Korea (<LiveClock />)
                    </p>
                </div>
                <div>
                    <p className={NAME_FONT}>Navigation:</p>
                </div>
                <div>
                    <p className={NAME_FONT}>Theme:</p>
                    <div className="flex items-center gap-1">
                        <button className={cn(DESCRIPTION_FONT, "cursor-pointer")}>
                            Light Mode
                        </button>
                        <span>|</span>
                        <button className={cn(DESCRIPTION_FONT, "cursor-pointer")}>
                            Dark Mode
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
