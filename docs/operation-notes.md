# 운영 노트

## 관리자 보안

- 운영 환경에서는 `ADMIN_SECRET`, `GITHUB_PAT`, `OPENAI_API_KEY`를 반드시 Vercel 환경변수로 설정합니다.
- `ADMIN_SECRET`이 없는 운영 환경에서는 `/api/articles`, `/api/keyword-trends`의 POST 작업과 `/api/ai-summary`가 실패하도록 보호합니다.
- 관리자 토큰은 브라우저 `sessionStorage`에 저장됩니다. 공용 PC에서는 사용 후 창을 닫아 세션을 종료합니다.
- API 키와 토큰은 HTML/JS 코드에 직접 넣지 않습니다.

## 신뢰도 배지

- `official`: 공식 출처입니다.
- `reliable_media`: 신뢰 가능한 전문 매체를 기반으로 한 기사입니다.
- `analysis`: 편집부 분석 또는 배경 정리입니다.
- `low_confidence`: 출처는 있으나 날짜, 수치, 명칭 등이 추가 확인이 필요한 낮은 신뢰도 항목입니다. 공개 페이지에 표시하되 배지를 분명하게 노출합니다.
- `unverified`: 미검증 항목입니다. 일반 공개 목록에는 노출하지 않는 것을 기본으로 합니다.

## 상태 처리

- `confirmed`: 확인된 내용입니다.
- `scheduled`: 예정된 일정입니다. 일정 변경 가능성을 본문 또는 검증 영역에 적습니다.
- `developing`: 진행 중인 사안입니다. 후속 확인이 필요할 수 있습니다.
- `needs_review`: 검토 중인 항목입니다. 일반 사용자 공개 목록에서는 제외합니다.

## 키워드 트렌드 운영

- 현재 키워드 트렌드는 외부 API 기반 실시간 수집이 아니라, 관리자 콘솔의 `키워드 트렌드` 패널에서 입력하는 운영 데이터입니다.
- 확인된 수치는 `confirmed`, 출처는 있으나 추가 검증이 필요한 수치는 `low_confidence`, 아직 입력하지 않은 후보는 `not_collected_yet`으로 관리합니다.
- `confirmed`와 `low_confidence` 행에는 언급량 또는 점수 등의 수치와 함께 `source`, `updatedAt`을 반드시 입력합니다.
- 키워드 운영 파일은 공개 저장소에서 제공되므로 관리자 메모나 비밀값은 저장하지 않습니다. 검증 경위가 필요하면 별도의 비공개 운영 기록에서 관리합니다.
- 저장 후 `trends.html`에서 배지, 수치, 출처, 기준 시각을 확인하고, `index.html` 프리뷰에 근거 없는 수치가 나타나지 않는지 확인합니다.

### RSS 초안 생성과 검토

- `npm run trend:draft`는 `data/keyword-trends-managed.json`의 키워드와 aliases를 읽어 최근 7일 Google News RSS 제목과 요약을 집계하고, `data/keyword-trends-draft.json`만 생성합니다.
- 스크립트는 링크 또는 유사 제목을 기준으로 중복 기사를 제거하며, 자동 계산 결과는 모두 `low_confidence` 초안으로 남깁니다. 각 키워드의 최신 매칭 기사 샘플 최대 5건을 제목, 날짜, 링크, 출처와 함께 저장하므로 발행 전에 근거를 확인합니다. 관리자가 확인하기 전에는 `confirmed`로 취급하지 않습니다.
- `articleCount`는 중복 제거 후 키워드가 등장한 기사 수, `mentionCount`는 제목과 요약 안의 총 등장 횟수입니다. `trendScore`는 `articleCount * 12 + mentionCount * 2 + officialSourceBonus + recencyBonus`를 최대 100점으로 제한한 검토용 점수입니다.
- 공식 기관 또는 기업 출처가 포함되면 10점, 최근 48시간 안의 관련 기사가 있으면 10점을 가산합니다. 기존 운영 `articleCount`가 양수일 때만 증감률을 계산하며, 0건에서 증가한 경우에는 `change`를 `null`로 둡니다.
- RSS 호출이 모두 실패하면 draft를 새로 쓰지 않으며, `managed` 운영 파일은 어떤 경우에도 스크립트가 직접 덮어쓰지 않습니다.
- draft를 커밋하면 공개 저장소에 포함됩니다. 민감한 메모를 추가하지 말고, 기사 출처와 산출값을 검토한 뒤 관리자 콘솔을 통해 발행할 값만 옮깁니다.

## 콘텐츠 출처와 저작권

- 공식 보도자료, 기관 페이지, 신뢰 매체, 논문 출처를 가능한 한 함께 기록합니다.
- NASA/JPL 이미지는 일반적으로 미국 정부 저작물로 사용할 수 있지만, NASA 로고와 엠블럼은 대표 이미지로 사용하지 않습니다.
- ESA, JAXA, SpaceX, 민간 기업 이미지는 각 페이지의 라이선스와 사용 조건을 확인한 뒤 사용합니다.
- 출처가 불명확하거나 저작권 상태가 불분명한 이미지는 사용하지 않습니다.

## 발행 전 확인 목록

- 제목, 날짜, 수치, 기관명, 임무명이 원문과 일치하는지 확인합니다.
- `sourceUrl`과 `sources[]`가 실제로 열리는지 확인합니다.
- `low_confidence` 또는 `needs_review` 상태가 필요한 항목은 무리하게 `confirmed`로 올리지 않습니다.
- 관리자 페이지에서 발행 후 `trends.html` 공개 카드와 모달 표시를 확인합니다.
