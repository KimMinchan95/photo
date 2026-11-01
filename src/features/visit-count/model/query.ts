import type { VisitCounts } from "./types";

type CountResponse = {
    data?: {
        visitors?: unknown;
    };
};

type AggregateResponse = {
    data?: Array<{
        visitors?: unknown;
    }>;
};

function seoulDayRange(now = new Date()) {
    const date = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Seoul",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(now);
    const since = new Date(`${date}T00:00:00+09:00`);
    const until = new Date(since.getTime() + 24 * 60 * 60 * 1000 - 1);

    return {
        since: since.toISOString(),
        until: until.toISOString(),
    };
}

function visitorsFromCount(body: CountResponse) {
    return typeof body.data?.visitors === "number" ? body.data.visitors : null;
}

function visitorsFromAggregate(body: AggregateResponse) {
    if (!Array.isArray(body.data)) {
        return null;
    }

    return body.data.reduce((sum, row) => {
        return sum + (typeof row.visitors === "number" ? row.visitors : 0);
    }, 0);
}

export async function queryVisitCounts(): Promise<VisitCounts> {
    const token = process.env.VERCEL_ACCESS_TOKEN;
    const projectId = process.env.VERCEL_PROJECT_ID;
    const teamId = process.env.VERCEL_TEAM_ID ?? process.env.VERCEL_ORG_ID;

    if (!token || !projectId) {
        return { today: null, total: null };
    }

    const headers = { Authorization: `Bearer ${token}` };
    const shared = new URLSearchParams({ projectId });

    if (teamId) {
        shared.set("teamId", teamId);
    }

    const totalParams = new URLSearchParams(shared);
    const todayParams = new URLSearchParams(shared);
    const { since, until } = seoulDayRange();

    todayParams.set("since", since);
    todayParams.set("until", until);
    todayParams.set("by", "day");

    const [totalResponse, todayResponse] = await Promise.all([
        fetch(`https://api.vercel.com/v1/query/web-analytics/visits/count?${totalParams}`, {
            headers,
            next: { revalidate: 60 },
        }),
        fetch(`https://api.vercel.com/v1/query/web-analytics/visits/aggregate?${todayParams}`, {
            headers,
            next: { revalidate: 60 },
        }),
    ]);

    const total = totalResponse.ok
        ? visitorsFromCount((await totalResponse.json()) as CountResponse)
        : null;
    const today = todayResponse.ok
        ? visitorsFromAggregate((await todayResponse.json()) as AggregateResponse)
        : null;

    return { today, total };
}
