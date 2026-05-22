# Radiant Blue Dot

Radiant Blue Dot은 우주개발 뉴스와 천문 지식을 한국어로 쉽게 전달하는 정적 웹사이트입니다. 현재 구조는 HTML/CSS/JavaScript 중심이며, Vercel Serverless Functions(`/api/*`)가 관리자 뉴스 수집, AI 초안 생성, GitHub 기반 게시글 저장을 담당합니다.

## 주요 페이지

- `index.html`: 메인 랜딩, 주요 탭 소개, 최신 콘텐츠 프리뷰
- `trends.html`: 우주 개발 동향, 정적 트렌드 데이터와 관리자 발행 뉴스 표시
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
- `GITHUB_PAT`: `data/published.json`을 GitHub Contents API로 읽고 쓰기 위한 토큰입니다. 저장소 쓰기 권한이 필요합니다.
- `OPENAI_API_KEY`: 관리자 콘솔의 AI 초안 생성 기능에서 사용합니다.

로컬 개발 환경에서는 `ADMIN_SECRET`이 없어도 일부 관리자 POST 요청을 허용하지만, 운영 환경에서는 fail-safe로 차단합니다.

## 관리자 기능 개요

관리자는 `admin/index.html`에서 다음 작업을 수행합니다.

- 공식 사이트 또는 Google News RSS 기반 뉴스 수집
- 원문 붙여넣기 후 AI 초안 생성
- 에디터에서 본문 수정
- GitHub의 `data/published.json`으로 게시글 발행, 삭제, 가져오기

관리자 토큰은 브라우저 `sessionStorage`에만 저장됩니다. 공용 PC에서는 작업 후 브라우저 창을 닫아 세션을 종료하세요.

## 외부 연동

- OpenAI Chat Completions API
- GitHub Contents API
- Google News RSS
- NASA Image and Video Library API
- 각 우주기관/기업 공식 뉴스 페이지 및 RSS

