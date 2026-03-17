const TITLE_PATTERN =
    /^(feat|fix|docs|style|refactor|test|chore|perf)\([^)]+\):\s.+$/;

function main() {
    const title = process.argv[2];

    if (!title || title.trim().length === 0) {
        console.error('PR 제목이 비어 있습니다.');
        process.exit(1);
    }

    if (!TITLE_PATTERN.test(title.trim())) {
        console.error(
            'PR 제목이 규칙에 맞지 않습니다.\n' +
                '필수 형식: <type>(<scope>): <한국어 설명>\n' +
                '예: feat(nav): 네비게이션 기본 구조 추가'
        );
        process.exit(1);
    }

    console.log('PR 제목 규칙을 통과했습니다.');
}

main();

