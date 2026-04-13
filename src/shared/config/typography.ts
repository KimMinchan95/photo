import { cn } from "@shared/lib";

export const NAME_FONT = "font-display text-sm leading-tight font-bold text-(--text-gray)";
export const DESCRIPTION_FONT = "font-display text-sm leading-none";

const HEADER_TEXT_SCALE = "text-[11px] sm:text-xs md:text-sm";

export const HEADER_NAME_FONT = cn(NAME_FONT, HEADER_TEXT_SCALE);
export const HEADER_DESCRIPTION_FONT = cn(DESCRIPTION_FONT, HEADER_TEXT_SCALE);
