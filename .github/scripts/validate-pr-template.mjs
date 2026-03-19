import { readFileSync } from "fs";

const REQUIRED_SECTIONS = ["## ✨ 작업 내용", "## 🧠 구현 포인트", "## ✅ 체크리스트"];
const CHECKBOX_CHECKED = /-\s*\[\s*x\s*\]/i;

function hasValidContent(content) {
    if (!content || content.trim().length === 0) {
        return false;
    }

    const lines = content
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

    if (lines.length === 0) {
        return false;
    }

    const hasContent = lines.some((line) => {
        const isEmptyBullet = /^-\s*$/.test(line);
        return !isEmptyBullet;
    });

    return hasContent;
}

function getSectionContent(body, sectionHeader) {
    const start = body.indexOf(sectionHeader);
    if (start === -1) {
        return null;
    }
    const afterHeader = body.slice(start + sectionHeader.length);
    const nextSection = afterHeader.search(/\n##\s+/);
    const content = nextSection === -1 ? afterHeader : afterHeader.slice(0, nextSection);
    return content.replace(/<!--[\s\S]*?-->/g, "").trim();
}

function main() {
    const bodyPath = process.argv[2];
    if (!bodyPath) {
        console.error("Usage: node validate-pr-template.mjs <pr-body-file>");
        process.exit(1);
    }

    let body;
    try {
        body = readFileSync(bodyPath, "utf-8");
    } catch (err) {
        console.error("PR 본문 파일을 읽을 수 없습니다:", err.message);
        process.exit(1);
    }

    const errors = [];

    for (const section of REQUIRED_SECTIONS) {
        if (!body.includes(section)) {
            errors.push(`필수 섹션이 없습니다: ${section}`);
        }
    }

    const workContent = getSectionContent(body, "## ✨ 작업 내용");
    if (workContent !== null && !hasValidContent(workContent)) {
        errors.push(`"✨ 작업 내용"에 구체적인 내용을 입력해 주세요. (불릿 항목에 설명 추가)`);
    }

    const implementationContent = getSectionContent(body, "## 🧠 구현 포인트");
    if (implementationContent !== null && !hasValidContent(implementationContent)) {
        errors.push(`"🧠 구현 포인트"에 구체적인 내용을 입력해 주세요. (불릿 항목에 설명 추가)`);
    }

    const checklistContent = getSectionContent(body, "## ✅ 체크리스트");
    if (checklistContent !== null && !CHECKBOX_CHECKED.test(checklistContent)) {
        errors.push('"✅ 체크리스트"에서 확인한 항목을 하나 이상 체크해 주세요.');
    }

    if (!!errors.length) {
        console.error("PR 템플릿 검증 실패:\n");
        errors.forEach((e) => console.error(`- ${e}`));
        process.exit(1);
    }

    console.log("PR 템플릿 검증을 통과했습니다.");
}

main();
