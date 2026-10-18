import { cn } from "@shared/lib";

import { HeaderMobileMenu } from "./header-mobile-menu";
import { HeaderBrand, HeaderLocation, HeaderNavigation, HeaderTheme } from "./header-sections";

export function Header() {
    return (
        <header
            className={cn("@container sticky top-[2vh] z-50 box-border max-w-[100vw] px-[1.5vw]")}
        >
            <div className={cn("flex items-start justify-between gap-4 @[80rem]:hidden")}>
                <HeaderBrand />
                <HeaderMobileMenu />
            </div>

            <div className={cn("hidden w-full grid-cols-4 items-start gap-24 @[80rem]:grid")}>
                <HeaderBrand />
                <HeaderLocation />
                <HeaderNavigation />
                <HeaderTheme />
            </div>
        </header>
    );
}
