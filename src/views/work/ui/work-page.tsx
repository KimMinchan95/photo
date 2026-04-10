import { getTranslations } from "next-intl/server";

export async function WorkPage() {
    const t = await getTranslations("Nav");

    return (
        <div className="px-[1.5vw] pt-[18vh]">
            <h1 className="font-display text-sm font-bold text-(--text-gray)">
                {t("Work")}
            </h1>
        </div>
    );
}
