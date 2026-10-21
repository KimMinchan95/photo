import { WorkDetail } from "@views/work";
import { works } from "@views/work/model/works";

export function generateStaticParams() {
    return works.map((work) => ({ slug: work.slug }));
}

export default async function LocaleWorkDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    return <WorkDetail slug={slug} />;
}
