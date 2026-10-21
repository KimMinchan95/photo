import { notFound } from "next/navigation";

import { WorkGallery } from "./work-gallery";
import { getWork, works } from "../model/works";

export async function WorkSheet({ slug }: { slug?: string }) {
    const current = slug ? getWork(slug) : works[0];

    if (!current) {
        notFound();
    }

    return <WorkGallery images={current.images} layout={current.layout} />;
}
