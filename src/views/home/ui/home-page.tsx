import { getTranslations } from "next-intl/server";

export async function HomePage() {
    const t = await getTranslations("Home");

    return <h1 className="font-display text-sm font-bold text-(--text-gray)">{t("Photo Blog")}</h1>;
}
