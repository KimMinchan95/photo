import { WorkSheet } from "./work-sheet";

export async function WorkDetail({ slug }: { slug: string }) {
    return <WorkSheet slug={slug} />;
}
