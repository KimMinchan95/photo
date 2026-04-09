import { useTheme } from "next-themes";

import { THEME } from "@shared/config";

export function useThemeToggle() {
    const { setTheme } = useTheme();

    const handleLightMode = () => setTheme(THEME.LIGHT);
    const handleDarkMode = () => setTheme(THEME.DARK);

    return {
        handleLightMode,
        handleDarkMode,
    };
}

