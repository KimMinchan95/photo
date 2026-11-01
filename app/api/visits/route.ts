import { queryVisitCounts } from "@features/visit-count/model/query";

export const dynamic = "force-dynamic";

export async function GET() {
    const counts = await queryVisitCounts();

    return Response.json(counts);
}
