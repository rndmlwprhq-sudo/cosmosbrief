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

### 키워드 트렌드 초안 수집

관리자 입력 전 수치 계산을 보조하기 위해 RSS 기반 초안 생성 스크립트를 제공합니다.

```bash
npm install
npm run trend:draft
```

`scripts/collect-keyword-trends.js`는 `data/keyword-trends-managed.json`의 키워드와 aliases를 사용하여 최근 7일 Google News RSS 검색 결과의 제목과 요약만 집계합니다. 결과는 `data/keyword-trends-draft.json`에 `low_confidence` 초안으로 저장되며, 운영 파일인 `data/keyword-trends-managed.json`은 변경하지 않습니다. 각 키워드에는 검토용 매칭 기사 샘플이 최대 5건 포함됩니다. 관리자는 draft의 기사 출처, 링크와 수치를 검토한 뒤 관리자 콘솔에서 필요한 항목만 발행합니다.

RSS의 제목, 요약, 날짜, 링크와 출처 필드를 안전하게 읽기 위해 가벼운 XML 파서인 `fast-xml-parser`를 사용합니다. 본문 전문 크롤링이나 API 키가 필요한 외부 서비스는 사용하지 않습니다.

점수 초안은 포화가 너무 빨리 발생하지 않도록 `articleCount * 7 + mentionCount * 1.5 + officialSourceBonus + recencyBonus`를 최대 100점으로 제한하여 계산합니다. 등록된 공식 RSS 또는 NASA, ESA, JAXA, KASA/KARI/KASI, SpaceX의 공식 도메인 출처가 포함되면 `officialSourceBonus`가 10점, 최근 48시간 내 관련 기사가 있으면 `recencyBonus`가 10점 추가됩니다. 이전 운영 데이터의 `articleCount`가 양수일 때에는 초안의 `change`에 증감률을 계산하며, 0건에서 증가한 경우에는 의미 있는 백분율 기준이 없으므로 `null`로 남깁니다.

관리자 콘솔의 `키워드 트렌드` 패널에서는 `Draft 불러오기`로 초안을 열어 기사 샘플을 검토하고, 체크한 항목만 기존 편집표로 복사할 수 있습니다. 이 단계에서는 공개 저장이 일어나지 않으며, 관리자가 별도로 `수치 저장 및 발행`을 누른 경우에만 인증된 API 저장이 실행됩니다.

## 외부 연동

- OpenAI Chat Completions API
- GitHub Contents API
- Google News RSS
- NASA Image and Video Library API
- 각 우주기관/기업 공식 뉴스 페이지 및 RSS

## 키워드 트렌드 저장 구조

- `data/keyword-trends.js`: 수치가 없는 후보 키워드의 정적 폴백 데이터
- `data/keyword-trends-managed.json`: 관리자가 발행한 운영 데이터
- `data/keyword-trends-draft.json`: RSS 집계 후 관리자 검토를 기다리는 초안 데이터
- `/api/keyword-trends`: 공개 읽기와 관리자 저장을 담당하는 GitHub-backed API

현재 운영 필드는 `keyword`, `mentionCount`, `articleCount`, `trendScore`, `change`, `rank`, `status`, `updatedAt`, `source`입니다. 데이터 파일은 공개 저장소를 통해 제공되므로 관리자 메모나 비밀값은 저장하지 않습니다. 초안 파일 역시 커밋하면 공개될 수 있으므로 민감한 검토 기록을 넣지 않습니다. 이후 외부 데이터 공급자가 확정되면 같은 필드 구조를 유지한 채 저장 입력원만 자동 수집 파이프라인으로 확장할 수 있습니다.
