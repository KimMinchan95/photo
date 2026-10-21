export type WorkCopy = {
    ko: string;
    en: string;
};

export type WorkImage = {
    id: string;
    src: string | null;
    width: number;
    height: number;
};

export type WorkLayout = "tiles" | "mixed";

export type Work = {
    slug: string;
    year: string;
    title: WorkCopy;
    place: WorkCopy;
    layout: WorkLayout;
    images: WorkImage[];
};

const frameBank: Pick<WorkImage, "width" | "height">[] = [
    { width: 1200, height: 1800 },
    { width: 1200, height: 1800 },
    { width: 1800, height: 1200 },
    { width: 1800, height: 1200 },
    { width: 1200, height: 1800 },
    { width: 1200, height: 1800 },
    { width: 1800, height: 1200 },
    { width: 1200, height: 1800 },
    { width: 1800, height: 1200 },
    { width: 1800, height: 1200 },
];

function frames(prefix: string, start: number): WorkImage[] {
    return frameBank.map((_, index) => {
        const picked = frameBank[(start + index) % frameBank.length];

        return {
            id: `${prefix}-${index}`,
            src: null,
            width: picked.width,
            height: picked.height,
        };
    });
}

const selectedFrames: Pick<WorkImage, "width" | "height">[] = [
    { width: 1800, height: 1200 },
    { width: 800, height: 1200 },
    { width: 1000, height: 1000 },
    { width: 900, height: 1200 },
    { width: 1600, height: 1100 },
    { width: 800, height: 1000 },
    { width: 1600, height: 900 },
    { width: 1400, height: 900 },
];

export const works: Work[] = [
    {
        slug: "selected",
        year: "2025",
        title: { ko: "Selected", en: "Selected" },
        place: { ko: "서울", en: "Seoul" },
        layout: "mixed",
        images: selectedFrames.map((frame, index) => ({
            id: `selected-${index}`,
            src: null,
            width: frame.width,
            height: frame.height,
        })),
    },
    {
        slug: "portrait",
        year: "2025",
        title: { ko: "Portrait", en: "Portrait" },
        place: { ko: "서울", en: "Seoul" },
        layout: "tiles",
        images: frames("portrait", 0),
    },
    {
        slug: "street",
        year: "2025",
        title: { ko: "Street", en: "Street" },
        place: { ko: "서울", en: "Seoul" },
        layout: "tiles",
        images: frames("street", 2),
    },
    {
        slug: "landscape",
        year: "2024",
        title: { ko: "Landscape", en: "Landscape" },
        place: { ko: "한국", en: "Korea" },
        layout: "tiles",
        images: frames("landscape", 4),
    },
    {
        slug: "travel",
        year: "2024",
        title: { ko: "Travel", en: "Travel" },
        place: { ko: "한국", en: "Korea" },
        layout: "tiles",
        images: frames("travel", 6),
    },
    {
        slug: "daily",
        year: "2024",
        title: { ko: "Daily", en: "Daily" },
        place: { ko: "서울", en: "Seoul" },
        layout: "tiles",
        images: frames("daily", 8),
    },
];

export function getWork(slug: string) {
    return works.find((work) => work.slug === slug);
}

export function workCopy(copy: WorkCopy, locale: string) {
    return locale === "en" ? copy.en : copy.ko;
}
