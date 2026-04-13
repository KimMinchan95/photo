import { getTranslations } from "next-intl/server";

export async function ContactPage() {
    const t = await getTranslations("Nav");

    return (
        <div className="px-[1.5vw] pt-[18vh]">
            <h1 className="font-display text-sm font-bold text-(--text-gray)">{t("Contact")}</h1>
        </div>
    );
}
