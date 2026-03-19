import { getTranslations } from "next-intl/server";

export async function HomePage() {
    const t = await getTranslations("Home");

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-4 bg-white px-16 py-32 text-center dark:bg-black">
                <h1 className="text-4xl font-semibold">{t("title")}</h1>
                <p className="text-zinc-600 dark:text-zinc-300">{t("description")}</p>
            </main>
        </div>
    );
}
