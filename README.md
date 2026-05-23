# Radiant Blue Dot

Radiant Blue Dot은 우주개발 뉴스와 천문 지식을 한국어로 쉽게 전달하는 정적 웹사이트입니다. 현재 구조는 HTML/CSS/JavaScript 중심이며, Vercel Serverless Functions(`/api/*`)가 관리자 뉴스 수집, AI 초안 생성, GitHub 기반 게시글 저장을 담당합니다.

## 주요 페이지

- `index.html`: 메인 랜딩, 주요 탭 소개, 최신 콘텐츠 프리뷰
- `trends.html`: 우주 개발 동향, 관리자 입력형 키워드 트렌드와 발행 뉴스 표시
- `knowledge.html`: 질문형 지식 지도 기반 천문 지식 허브
- `cosmos-life.html`: 우주 현상과 인간의 삶을 연결하는 에세이형 공간
- `admin/index.html`: 관리자 콘솔
- `style-trainer/index.html`: 문체 규칙과 예문을 브라우저 localStorage에 저장하는 내부 도구

## 로컬 실행

정적 페이지는 파일을 직접 열어도 대부분 확인할 수 있습니다. API까지 함께 확인하려면 Vercel 개발 서버를 권장합니다.

```bash
npm install
vercel dev
```

별도 빌드 단계는 없습니다.

## 필요한 환경변수

운영 환경에서는 아래 값을 Vercel Project Settings의 Environment Variables에 설정해야 합니다.

- `ADMIN_SECRET`: 관리자 콘솔 인증용 비밀값. 운영 환경에서 없으면 관리자 POST API가 실패하도록 보호됩니다.
- `GITHUB_PAT`: `data/published.json`과 `data/keyword-trends-managed.json`을 GitHub Contents API로 읽고 쓰기 위한 토큰입니다. 저장소 쓰기 권한이 필요합니다.
- `OPENAI_API_KEY`: 관리자 콘솔의 AI 초안 생성 기능에서 사용합니다.

로컬 개발 환경에서는 `ADMIN_SECRET`이 없어도 일부 관리자 POST 요청을 허용하지만, 운영 환경에서는 fail-safe로 차단합니다.

## 관리자 기능 개요

관리자는 `admin/index.html`에서 다음 작업을 수행합니다.

- 공식 사이트 또는 Google News RSS 기반 뉴스 수집
- 원문 붙여넣기 후 AI 초안 생성
- 에디터에서 본문 수정
- GitHub의 `data/published.json`으로 게시글 발행, 삭제, 가져오기
- `키워드 트렌드` 패널에서 검증한 언급량, 관심도 점수, 증감, 상태, 기준 시각, 출처를 입력하여 `data/keyword-trends-managed.json`으로 발행

키워드 트렌드 기능은 현재 자동 수집이 아니라 관리자 수동 입력 방식입니다. 실제 수치를 입력한 행에는 반드시 출처명과 기준 시각을 함께 기록하고, 검증이 덜 된 수치는 `low_confidence` 상태로 발행하세요. 수치가 없는 항목은 `not_collected_yet`으로 남아 공개 화면에서 `수집 준비 중`으로 표시됩니다.

관리자 토큰은 브라우저 `sessionStorage`에만 저장됩니다. 공용 PC에서는 작업 후 브라우저 창을 닫아 세션을 종료하세요.

## 외부 연동

- OpenAI Chat Completions API
- GitHub Contents API
- Google News RSS
- NASA Image and Video Library API
- 각 우주기관/기업 공식 뉴스 페이지 및 RSS

## 키워드 트렌드 저장 구조

- `data/keyword-trends.js`: 수치가 없는 후보 키워드의 정적 폴백 데이터
- `data/keyword-trends-managed.json`: 관리자가 발행한 운영 데이터
- `/api/keyword-trends`: 공개 읽기와 관리자 저장을 담당하는 GitHub-backed API

현재 운영 필드는 `keyword`, `mentionCount`, `trendScore`, `change`, `status`, `updatedAt`, `source`, `note`이며, `note`는 공개 화면과 API 공개 응답에서 제외됩니다. 단, GitHub 저장 파일에 포함되므로 비밀값이나 민감한 내용은 기록하지 마세요. 이후 외부 데이터 공급자가 확정되면 같은 필드 구조를 유지한 채 저장 입력원만 자동 수집 파이프라인으로 확장할 수 있습니다.
