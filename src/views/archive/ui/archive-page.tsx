import { getTranslations } from "next-intl/server";

export async function ArchivePage() {
    const t = await getTranslations("Nav");

    return <h1 className="font-display text-sm font-bold text-(--text-gray)">{t("Archive")}</h1>;
}
