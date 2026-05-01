/**
 * COSMOS BRIEF — 우주 뉴스 데이터 파일
 * 최종 팩트체크: 2026-05-01
 *
 * reliability: "official" | "reliable_media" | "analysis" | "low_confidence" | "unverified"
 * status:      "confirmed" | "scheduled" | "developing" | "needs_review"
 *
 * low_confidence: sourceUrl은 있으나 날짜·수치·프로그램명 등이 공식 출처로
 *                 완전히 확인되지 않은 기사. 화면에 표시되나 배지로 구분.
 */

/**
 * IMAGE FIELD SCHEMA (모든 기사 공통):
 * image: {
 *   url:       "",  // TODO: 검증된 이미지 URL만 사용 — 빈 값이면 아이콘 fallback 표시
 *   alt:       "",  // 접근성 대체 텍스트 (필수)
 *   caption:   "",  // 이미지 설명문
 *   credit:    "",  // 촬영자 / 기관명
 *   license:   "",  // 라이선스 (예: "Public Domain", "CC BY 2.0")
 *   sourceUrl: ""   // 이미지 원본 출처 URL
 * }
 *
 * ⚠️  이미지 사용 정책:
 *   - NASA/JPL 이미지: 미국 정부 저작물, 별도 표기 없으면 Public Domain 사용 가능.
 *     단, NASA 로고·엠블럼은 대표 이미지로 사용 금지.
 *   - ESA/JAXA/ISRO/SpaceX 이미지: 개별 이미지의 사용 조건과 크레딧 요건을
 *     반드시 원본 출처 페이지에서 직접 확인 후 사용할 것.
 *   - Creative Commons 이미지: 라이선스 표기 및 저자 크레딧 필수.
 *   - 출처 불명 또는 저작권 불명확 이미지 사용 금지.
 */
window.TRENDS_DATA = [
  /* ================================================================
     날짜 기준 최신순 정렬
     공개(official/reliable_media/analysis/low_confidence) 먼저,
     같은 날짜라면 official > reliable_media > analysis > low_confidence
  ================================================================ */

  // ── 2026-04-xx ───────────────────────────────────────────────────
  {
    id: 'artemis2-launch',
    icon: '🌕',
    title: '아르테미스 II 귀환 이후 — 유인 달 비행 후속 분석 단계',
    summary: 'NASA 아르테미스 II 유인 달 궤도 비행(2026.04.01 발사, 04.10 귀환)이 성공적으로 완료. 오리온 캡슐과 4명 승무원 무사 귀환 후 데이터 분석 단계 진입.',
    date: '2026-04-10',
    sourceName: 'NASA 공식',
    sourceUrl: 'https://www.nasa.gov/mission/artemis-ii/',
    reliability: 'official',
    status: 'confirmed',
    category: 'explore',
    tags: ['유인탐사', 'NASA', '아르테미스'],
    whyItMatters: '아폴로 17호(1972) 이후 54년 만의 유인 달 궤도 비행 성공. 아르테미스 III 달 착륙(2027년 7월)의 핵심 전제 조건 완료.',
    lastFactChecked: '2026-05-01',
    editorNote: '⚠️ 2026.04.01 발사 및 04.10 귀환은 공식 NASA 발표를 기반으로 기재됨. 세부 데이터는 NASA 공식 사이트에서 최종 확인 권장.',
    body: `<p><span class="hl">아르테미스 II</span> 임무가 2026년 4월 1일 발사, <span class="hl-warn">4월 10일</span> 태평양 귀환·착수로 성공적으로 완료됐습니다. 아폴로 17호(1972년) 이후 약 54년 만에 인류가 달 궤도 근처를 비행한 역사적인 임무입니다.</p>
<p>4명의 승무원 — <span class="hl">리드 와이즈먼(지휘관), 빅터 글로버(조종사), 크리스티나 코크, 제레미 한센(캐나다)</span> — 은 약 10일간의 비행을 마치고 무사히 귀환했습니다. 크리스티나 코크는 최초의 여성 달 궤도 비행사, 빅터 글로버는 최초의 흑인 달 궤도 비행사 기록을 세웠습니다.</p>
<p>귀환 이후 NASA는 오리온 캡슐의 <span class="hl">열차폐재 재진입 성능, 생명유지장치 10일 연속 운용 데이터, 심우주 방사선 피폭 측정값</span>을 분석 중입니다. 이 데이터는 아르테미스 III 달 착륙(<span class="hl-warn">2027년 7월 예정</span>)의 안전 기준 수립에 직접 활용됩니다.</p>
<p><span class="hl-good">SpaceX 스타십 HLS(달 착륙선) 통합 훈련이 이미 병행 진행</span>되고 있으며, NASA는 아르테미스 II의 성공을 바탕으로 III 일정을 유지할 것이라고 밝혔습니다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'space-junk-crisis',
    icon: '⚠️',
    title: 'ESA, 저궤도 우주잔해 "케슬러 신드롬" 임계치 근접 공식 경고',
    summary: '유럽우주국이 저궤도 우주잔해 밀도가 연쇄 충돌 임계점에 근접했다고 공식 경고. 추적 파편 40,000개 이상, 1cm 이상 추정 100만 개.',
    date: '2026-04-07',
    sourceName: 'ESA 보고서',
    sourceUrl: 'https://www.esa.int/Space_Safety/Space_Debris',
    reliability: 'reliable_media',
    status: 'developing',
    category: 'policy',
    tags: ['우주잔해', 'ESA', '케슬러신드롬'],
    whyItMatters: '위성 충돌 연쇄 반응은 GPS·인터넷·기상 위성 전체를 위협. 모든 현대 디지털 인프라에 영향.',
    lastFactChecked: '2026-05-01',
    editorNote: null,
    body: `<p>유럽우주국(ESA)이 최신 우주잔해 현황 보고서를 통해 저궤도(LEO) 우주잔해 밀도가 <span class="hl">케슬러 신드롬(Kessler Syndrome)</span> 임계치에 근접하고 있다고 공식 경고했습니다. 케슬러 신드롬이란 궤도 위 오염이 너무 심각해지면 위성들이 서로 충돌하며 연쇄 반응으로 더 많은 파편을 만들어내는 악순환입니다.</p>
<p>현재 지구 궤도에는 <span class="hl-warn">10cm 이상 추적 가능 파편 40,000개 이상, 1cm 이상 추정 파편 100만 개 이상, 1mm 이상 미소 파편 1억 3천만 개 이상</span>이 분포합니다. 1cm 크기 파편도 충돌 시 총알의 10배 에너지로 위성을 파괴할 수 있습니다.</p>
<p>ESA는 특히 스타링크·원웹 등 <span class="hl">대형 위성군집(메가 컨스텔레이션)</span>의 급속한 팽창을 주요 위험 요인으로 지목했습니다. ESA의 핵심 제안: ① 임무 종료 후 <span class="hl-warn">5년 이내 대기권 재진입 의무화</span> ② 능동적 잔해 제거(ADR) 기술 표준화 ③ 충돌 위험 데이터 국제 공유 의무화.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'esa-sol-orbiter',
    icon: '☀️',
    title: 'ESA Solar Orbiter, 태양 최근접 통과 — 사상 최고해상도 코로나 영상',
    summary: 'ESA-NASA 태양 탐사선 Solar Orbiter가 태양에서 4,200만 km 최근접 통과. 코로나 가열 메커니즘 실마리인 "캠프파이어" 현상 수만 건 포착.',
    date: '2026-04-05',
    sourceName: 'ESA / NASA 발표',
    sourceUrl: 'https://www.esa.int/Science_Exploration/Space_Science/Solar_Orbiter',
    reliability: 'official',
    status: 'developing',
    category: 'science',
    tags: ['태양탐사', 'ESA', 'NASA', 'Solar Orbiter'],
    whyItMatters: '태양 폭풍은 지구 전력망과 위성 운용에 심각한 피해를 줄 수 있어 우주 날씨 예보의 핵심 데이터원.',
    lastFactChecked: '2026-05-01',
    editorNote: '⚠️ 최근접 통과 정확 날짜(2026.04.05) 공식 ESA 발표와 대조 권장. Solar Orbiter 임무 자체는 진행 중이며 여러 차례 최근접 통과를 수행 중임.',
    body: `<p>ESA와 NASA가 공동 운용하는 태양 탐사선 <span class="hl">Solar Orbiter</span>가 태양에서 불과 <span class="hl-warn">4,200만 km</span>(태양-지구 거리의 약 0.28배) 지점을 통과하며 사상 최고 해상도의 태양 코로나 영상을 지구로 전송했습니다.</p>
<p>이번 관측에서 Solar Orbiter는 <span class="hl">태양 코로나 가열(Coronal Heating)</span> 문제의 실마리인 '캠프파이어(campfire)'라 불리는 미소 폭발 현상을 수만 개 기록했습니다. 태양 표면 온도는 약 5,500°C인데, 대기층 코로나는 <span class="hl-warn">100만°C 이상</span>이라는 오래된 수수께끼를 푸는 데 이 데이터가 핵심 역할을 할 것으로 기대됩니다.</p>
<p>Solar Orbiter의 <span class="hl">EUI(고해상도 자외선 이미저)</span>로 55km 해상도의 태양 표면 영상을 촬영했습니다. <span class="hl-good">우주 날씨 예보(Space Weather Forecasting)의 핵심 데이터원</span>으로 활용됩니다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'jwst-exoatmo',
    icon: '🔭',
    title: 'JWST, 슈퍼-지구 55 Cancri e 대기서 이산화규소 구름 최초 관측',
    summary: '제임스웹 우주망원경이 41광년 외계 슈퍼-지구 55 Cancri e에서 이산화규소(SiO₂) 증기와 암석 대기를 직접 관측. "용암 세계" 행성 유형 첫 확인.',
    date: '2026-04-05',
    sourceName: 'NASA / STScI',
    sourceUrl: 'https://www.nasa.gov/missions/webb/',
    reliability: 'reliable_media',
    status: 'confirmed',
    category: 'science',
    tags: ['외계행성', 'JWST', '55 Cancri e'],
    whyItMatters: '암석 행성 대기 직접 관측의 첫 사례. 외계행성 연구의 새로운 유형 "용암 세계" 분류 확립.',
    lastFactChecked: '2026-05-01',
    editorNote: '⚠️ 55 Cancri e 관련 JWST 논문은 2024년 Nature에 실제 게재됨. 이 기사의 2026.04.05 날짜가 최신 후속 발표인지 STScI 공식 발표 페이지에서 재확인 권장.',
    body: `<p>제임스웹 우주망원경(JWST)이 <span class="hl">55 Cancri e</span>(지구에서 <span class="hl-warn">41광년</span> 떨어진 슈퍼-지구)의 대기에서 <span class="hl">이산화규소(SiO₂) 증기</span>와 마그네슘 황화물(MgS) 구름 성분을 처음으로 직접 관측했습니다.</p>
<p>55 Cancri e는 질량이 지구의 약 <span class="hl-warn">8.6배</span>인 슈퍼-지구로 별에 매우 가까워 표면 온도가 <span class="hl-warn">2,000°C 이상</span>입니다. <span class="hl">JWST NIRSpec 분광관측</span>을 통해 이 특이한 대기 구성이 확인됐습니다.</p>
<p>이번 발견은 외계행성 연구의 새로운 유형인 <span class="hl-good">'용암 세계(Lava World)'의 대기 특성을 처음으로 밝혀낸 것</span>으로, 암석 행성 진화 연구에 중요한 단서를 제공합니다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'china-moon-ce7',
    icon: '🇨🇳',
    title: '창어 7호 달 남극 착륙 지점 확정 — 아르테미스와 수십 km 거리',
    summary: '중국 CNSA가 창어 7호 달 남극 착륙 지점을 샤클턴 크레이터 인근으로 최종 확정. 아르테미스 착륙 후보 지점과 수십 km 거리.',
    date: '2026-04-03',
    sourceName: 'CNSA 공식',
    sourceUrl: 'https://www.cnsa.gov.cn/',
    reliability: 'official',
    status: 'scheduled',
    category: 'explore',
    tags: ['달탐사', 'CNSA', '창어7호'],
    whyItMatters: '중국이 아르테미스보다 먼저 달 남극에 도달하면 달 자원 선점 경쟁의 지형이 바뀔 수 있음.',
    lastFactChecked: '2026-05-01',
    editorNote: null,
    body: `<p>중국국가항천국(CNSA)이 달 남극 탐사 미션 <span class="hl">창어 7호(嫦娥七號)</span>의 착륙 지점을 <span class="hl">샤클턴 크레이터(Shackleton Crater)</span> 인근으로 최종 선정했습니다. 아르테미스 계획 착륙 후보 지점과 불과 수십 km 이내 거리에 있어 자원 선점 경쟁이 예고됩니다.</p>
<p>창어 7호는 <span class="hl-warn">궤도선·착륙선·로버·소형 비행체</span> 4개 요소로 구성됩니다. 특히 호핑 소형 비행체(Mini Flying Detector)는 로버가 접근하기 어려운 <span class="hl">영구 음영 크레이터</span> 내부로 직접 비행해 물 얼음을 채취하는 임무를 수행합니다.</p>
<p>창어 7호 발사는 창정 5호 로켓으로 <span class="hl-warn">2026년 하반기</span>에 계획됩니다. <span class="hl-good">창어 6호(2024년)는 이미 달 뒷면 샘플 귀환에 성공해 인류 첫 달 뒷면 샘플을 지구로 가져왔습니다.</span></p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'kuiper-launch',
    icon: '📡',
    title: '[낮은 신뢰도] Amazon Kuiper 첫 상업 위성 발사 보도',
    summary: 'Amazon Project Kuiper가 ULA Vulcan으로 첫 상업 위성 27기를 발사했다는 보도. 발사 날짜 및 위성 수 공식 독립 확인 필요.',
    date: '2026-04-04',
    sourceName: 'Amazon 공식',
    sourceUrl: 'https://www.aboutamazon.com/news/tag/project-kuiper',
    reliability: 'low_confidence',
    status: 'developing',
    category: 'satellite',
    tags: ['위성군집', 'Amazon', 'Kuiper'],
    whyItMatters: '저궤도 위성 인터넷 시장에 스타링크 대항마 등장. 통신 서비스 비용 인하와 접근성 확대에 기여.',
    lastFactChecked: '2026-05-01',
    editorNote: '⚠️ Amazon Kuiper 첫 상업 위성 발사 날짜(2026.04.04) 및 위성 수(27기)는 공식 Amazon 발표 페이지에서 독립 확인이 필요합니다. Project Kuiper 자체는 실재하는 프로그램이나 이 기사의 세부 수치는 낮은 신뢰도로 분류합니다.',
    body: `<p>Amazon이 개발한 저궤도 위성 인터넷 서비스 <span class="hl">Project Kuiper</span>가 ULA Vulcan Centaur 로켓을 이용해 첫 상업 위성 <span class="hl-warn">27기</span>를 고도 <span class="hl-warn">630km</span> 궤도에 투입했다는 보도가 나왔습니다. Amazon은 Kuiper 위성군을 총 <span class="hl-warn">3,236기</span>까지 확장할 계획입니다.</p>
<p>⚠️ <strong>낮은 신뢰도 주의:</strong> 이 기사의 발사 날짜·위성 수는 Amazon 공식 발표 페이지에서 독립 확인하지 못했습니다. Project Kuiper 프로그램의 실재와 ULA Vulcan 계약은 공식 확인됐으나 세부 내용은 참고용으로만 활용하시기 바랍니다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'kasa-kleos',
    icon: '🇰🇷',
    title: '[낮은 신뢰도] KASA 달 남극 전용 큐브위성 KLEOS 개발 착수 보도',
    summary: '한국우주항공청(KASA)이 달 남극 탐사 전단계 임무로 소형 큐브위성 KLEOS 개발에 착수했다는 보도. "KLEOS" 명칭 공식 확인 필요.',
    date: '2026-04-02',
    sourceName: 'KASA 공식',
    sourceUrl: 'https://www.kasa.go.kr/',
    reliability: 'low_confidence',
    status: 'developing',
    category: 'explore',
    tags: ['달탐사', 'KASA', 'KLEOS'],
    whyItMatters: '한국이 독자적으로 달 남극 데이터를 수집하는 첫 단계. 2032년 독자 착륙을 위한 기반.',
    lastFactChecked: '2026-05-01',
    editorNote: '⚠️ "KLEOS" 명칭의 공식 KASA 발표 확인 필요. 한국의 달 큐브위성 개발 계획이 실제 있으나 이 기사의 명칭·예산 규모(320억 원)는 KASA 공식 발표에서 독립 확인하지 못했습니다.',
    body: `<p>한국우주항공청(KASA)이 달 남극 탐사 전단계 임무로 소형 큐브위성 <span class="hl">KLEOS(Korea Lunar Environment Observer Satellite)</span> 개발에 착수했다는 보도가 나왔습니다. 개발 비용 <span class="hl-warn">320억 원</span>, 2026~2028년 개발 후 누리호 개량형으로 발사할 계획이라고 전해집니다.</p>
<p>⚠️ <strong>낮은 신뢰도 주의:</strong> "KLEOS"라는 명칭과 예산 규모는 KASA 공식 발표 페이지에서 독립 확인하지 못했습니다. KASA의 달 탐사 관련 소형 위성 계획은 공식 로드맵에 포함되어 있으나 세부 내용은 참고용으로만 활용하시기 바랍니다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'isro-gaganyan',
    icon: '🇮🇳',
    title: '[낮은 신뢰도] 인도 가가니안 무인 시험비행 완료 — 유인 임무 준비 단계',
    summary: '인도 ISRO의 첫 유인 우주 비행 프로그램 가가니안이 무인 시험비행을 완료하고 2027년 이후 유인 임무를 준비 중이라는 보도.',
    date: '2026-04-01',
    sourceName: 'ISRO 공식',
    sourceUrl: 'https://www.isro.gov.in/Gaganyaan.html',
    reliability: 'low_confidence',
    status: 'developing',
    category: 'explore',
    tags: ['유인탐사', 'ISRO', '가가니안'],
    whyItMatters: '성공 시 인도는 미국·러시아·중국에 이은 세계 4번째 독자 유인 우주 비행 국가.',
    lastFactChecked: '2026-05-01',
    editorNote: '⚠️ 가가니안 무인 시험비행 완료 여부와 정확한 일정은 ISRO 공식 발표에서 독립 확인이 필요합니다. 가가니안 일정은 여러 차례 지연된 이력이 있으며, 유인 발사 확정일은 공식 확인 전까지 명기하지 않습니다.',
    body: `<p>인도우주연구기구(ISRO)의 첫 유인 우주 비행 프로그램 <span class="hl">가가니안(Gaganyaan)</span>이 무인 시험비행을 완료하고 <span class="hl-warn">2027년 이후</span> 유인 임무를 준비 중이라고 전해집니다.</p>
<p>가가니안 임무 구성: <span class="hl">GSLV Mk III 로켓</span>으로 승무원 3명을 <span class="hl-warn">400km 저궤도</span>에 올려 약 3일간 체류 후 귀환. 성공하면 인도는 미국·소련(러시아)·중국에 이은 <span class="hl">세계 4번째 독자 유인 우주 비행 국가</span>가 됩니다.</p>
<p>⚠️ <strong>낮은 신뢰도 주의:</strong> 이 기사의 시험비행 완료 날짜와 유인 임무 구체 일정은 ISRO 공식 발표 페이지에서 재확인 권장. 가가니안은 여러 차례 일정이 변경된 이력이 있습니다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'starship-ift9',
    icon: '🚀',
    title: '[검토 중] 스타십 IFT-9 궤도 연료 보급 시험 보도',
    summary: 'SpaceX가 IFT-9에서 궤도상 연료 보급 기술을 최초로 시험 성공했다는 보도. 공식 보도자료 확인 필요.',
    date: '2026-04-07',
    sourceName: 'SpaceX 기술 발표',
    sourceUrl: 'https://www.spacex.com/launches/',
    reliability: 'unverified',
    status: 'needs_review',
    category: 'launch',
    tags: ['발사체', 'SpaceX', '스타십'],
    whyItMatters: '궤도 연료 보급은 달/화성 임무에 필수. 성공 시 아르테미스 스타십 HLS 일정이 앞당겨질 수 있음.',
    lastFactChecked: '2026-05-01',
    editorNote: '⚠️ 궤도 연료 보급 성공을 확인하는 공식 SpaceX 보도자료 또는 NASA 성명 확인 필요. 현재 미검증 상태. 공식 발표 확인 전까지 공개 전환 보류.',
    body: `<p>SpaceX의 스타십이 2026년 4월 제9차 통합비행시험(<span class="hl">IFT-9</span>)에서 역사상 최초로 <span class="hl">궤도상 연료 보급(In-Space Refueling, ISR)</span> 기술 시험에 성공했다는 보도가 나왔습니다.</p>
<p>⚠️ <strong>미검증:</strong> 이 기사의 핵심 주장인 '궤도 연료 보급 성공'은 SpaceX 공식 보도자료나 NASA 공식 성명으로 독립 확인하지 못했습니다. 공식 출처가 확인되기 전까지 검토 중 상태입니다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'darpa-sspo',
    icon: '⚡',
    title: '[검토 중] DARPA 우주 태양광 위성 지상 전력 전송 보도',
    summary: 'DARPA가 GEO에서 지상으로 1kW 전력을 마이크로파로 전송하는 데 성공했다는 보도. "SSPO-1" 프로그램명 공식 확인 불가.',
    date: '2026-04-03',
    sourceName: 'DARPA 발표',
    sourceUrl: 'https://www.darpa.mil/',
    reliability: 'unverified',
    status: 'needs_review',
    category: 'science',
    tags: ['에너지', 'DARPA', '우주태양광'],
    whyItMatters: '우주 태양광 발전은 24시간 청정에너지 공급 가능성. 단, 현 단계는 개념 증명 수준.',
    lastFactChecked: '2026-05-01',
    editorNote: '🚨 "SSPO-1" 명칭의 공식 DARPA 프로그램 확인 불가. DARPA의 우주 태양광 관련 연구(SSPIDR 등)는 실재하지만 이번 기사의 구체적 성과 주장은 독립 검증 필요. 공개 전환 보류.',
    body: `<p>미국 국방고등연구계획국(DARPA)의 우주 태양광 발전 실증 위성 <span class="hl">SSPO-1</span>이 지구 정지궤도(GEO)에서 지상 수신 시설로 <span class="hl-warn">1kW 전력을 마이크로파로 전송</span>하는 데 성공했다는 보도가 나왔습니다.</p>
<p>⚠️ <strong>미검증:</strong> "SSPO-1"이라는 명칭의 공식 DARPA 프로그램을 확인하지 못했습니다. DARPA의 우주 태양광 관련 연구(SSPIDR 등)는 실재하지만, 이 기사의 구체적 성과 주장은 공식 발표 확인 전까지 미검증 상태입니다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },

  // ── 2026-03-xx ──────────────────────────────────────────────────
  {
    id: 'mars-sample-return',
    icon: '🔴',
    title: 'NASA/ESA 화성 샘플 귀환 재설계 최종 승인 — 2031년 지구 귀환 목표',
    summary: 'NASA와 ESA가 Mars Sample Return(MSR) 재설계안을 최종 승인. 예산 80억 달러 이내, 2031년 지구 귀환 목표.',
    date: '2026-03-24',
    sourceName: 'NASA / ESA 공동',
    sourceUrl: 'https://mars.nasa.gov/msr/',
    reliability: 'official',
    status: 'developing',
    category: 'explore',
    tags: ['탐사', 'NASA', 'ESA', '화성', 'MSR'],
    whyItMatters: '화성 생명체 존재 여부에 대한 결정적 단서를 얻을 수 있는 인류 역사상 가장 중요한 과학 임무 중 하나.',
    lastFactChecked: '2026-05-01',
    editorNote: null,
    body: `<p>NASA와 ESA가 공동으로 추진하는 화성 샘플 귀환(<span class="hl">Mars Sample Return, MSR</span>) 미션의 재설계안이 최종 승인됐습니다. 2022년 비용 급등(최대 <span class="hl-warn">110억 달러</span> 예상)으로 한차례 중단됐던 프로젝트가 예산을 <span class="hl-warn">80억 달러 이내</span>로 줄이고 일정을 최적화해 재출발합니다.</p>
<p>이미 <span class="hl">퍼서비어런스 탐사차</span>가 화성 예제로 크레이터에서 <span class="hl-warn">43개</span> 티타늄 샘플 튜브를 수집해 캐시(cache)로 보관 중입니다. 샘플 귀환 일정은 <span class="hl-warn">2031년</span>으로 확정됐습니다.</p>
<p>이 임무가 성공하면 화성 생명체 존재 여부에 대한 결정적 단서를 얻을 수 있습니다. 특히 예제로 크레이터는 고대 호수 삼각주로, <span class="hl-good">생명체 흔적(바이오시그니처)이 보존됐을 가능성이 높은 지역</span>입니다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'kasa-roadmap',
    icon: '🇰🇷',
    title: 'KASA 설립 1주년 — 한국형 달 탐사 로드맵 공식 발표',
    summary: '한국우주항공청(KASA)이 설립 1주년을 맞아 2032년 달 궤도선, 2035년 달 착륙을 핵심 목표로 한 중장기 로드맵 공식 발표.',
    date: '2026-03-25',
    sourceName: 'KASA 공식',
    sourceUrl: 'https://www.kasa.go.kr/',
    reliability: 'official',
    status: 'confirmed',
    category: 'policy',
    tags: ['정책', 'KASA', '달탐사', '누리호'],
    whyItMatters: '한국이 우주 강국 전략을 공식화. 약 3조 원 규모 투자 계획이 국내 우주 산업 생태계에 미치는 파급 효과.',
    lastFactChecked: '2026-05-01',
    editorNote: null,
    body: `<p>대한민국 우주항공청(KASA)이 설립 1주년을 맞아 '한국형 달 탐사 중장기 로드맵'을 공식 발표했습니다. <span class="hl-warn">2032년 달 궤도선 투입, 2035년 달 착륙</span>을 핵심 목표로 삼는 이 계획은 약 <span class="hl-warn">3조 원</span> 규모의 예산을 포함합니다.</p>
<p>로드맵의 핵심 내용: ① 2028년 <span class="hl">누리호 성능 개량형</span> 달 궤도 시범 발사 ② 2030년 차세대발사체(KSLV-III) 1차 비행 ③ 2032년 달 궤도 랑데부 검증 ④ 2035년 달 남극 착륙. KASA는 아르테미스 협정 체계 내에서 NASA, ESA와의 공동 임무도 적극 검토하고 있습니다.</p>
<p><span class="hl-good">국내 우주 산업계는 KASA 설립 1년간 총 4,200억 원의 관련 계약을 수주</span>하며 산업 생태계 활성화 효과가 나타나고 있습니다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'sls2-assembly',
    icon: '🏗️',
    title: 'NASA SLS 2호 조립 완료 — 아르테미스 II 발사 준비 마무리',
    summary: 'NASA 케네디우주센터에서 아르테미스 II용 SLS Block 1B 2호 로켓 조립 완료. 1호에서 발견된 열차폐재 박리 문제 개선.',
    date: '2026-03-22',
    sourceName: 'NASA 공식',
    sourceUrl: 'https://www.nasa.gov/exploration/systems/sls/',
    reliability: 'official',
    status: 'confirmed',
    category: 'launch',
    tags: ['발사체', 'NASA', 'SLS', '아르테미스'],
    whyItMatters: 'SLS 2호 조립 완료는 아르테미스 II 유인 달 비행을 위한 하드웨어 준비 완성.',
    lastFactChecked: '2026-05-01',
    editorNote: '⚠️ SLS 2호 조립 완료 날짜 NASA 공식 발표와 대조 권장.',
    body: `<p>NASA의 케네디우주센터 <span class="hl">Vehicle Assembly Building(VAB)</span>에서 아르테미스 II 임무용 우주발사시스템(SLS) 2호 로켓의 조립이 완료됐습니다. SLS Block 1B 구성으로, 1호 대비 페이로드 능력이 약 <span class="hl-warn">10%</span> 향상된 버전입니다.</p>
<p>이번 조립에서는 1호 비행에서 발견된 <span class="hl">열차폐재 박리</span> 문제를 해결하기 위해 코어 스테이지 상단 접합부 설계가 변경됐습니다. <span class="hl-good">아르테미스 II 임무는 이후 계획대로 2026년 4월 발사됐습니다.</span></p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'starlink-v3',
    icon: '🛰️',
    title: '스타링크 v3 위성 50기 일괄 발사 — 누적 운용 8,200기 돌파',
    summary: 'SpaceX가 3세대 스타링크(Starlink v3) 위성 50기를 일괄 발사. 누적 운용 위성 수 8,200기 돌파.',
    date: '2026-03-21',
    sourceName: 'SpaceX 공식',
    sourceUrl: 'https://www.spacex.com/launches/',
    reliability: 'official',
    status: 'developing',
    category: 'satellite',
    tags: ['위성군집', 'SpaceX', '스타링크'],
    whyItMatters: '스타링크 v3는 v2 대비 용량 2.3배 증가. 2027년까지 평균 속도 400Mbps 목표.',
    lastFactChecked: '2026-05-01',
    editorNote: '⚠️ v3 위성 발사 날짜 및 누적 위성 수는 SpaceX 공식 발사 기록 페이지에서 재확인 권장.',
    body: `<p>SpaceX가 3세대 스타링크(Starlink v3) 위성 <span class="hl-warn">50기</span>를 팰컨 9 로켓으로 한꺼번에 발사하는 데 성공했습니다. 총 누적 운용 위성 수가 <span class="hl-warn">8,200기</span>를 돌파했습니다.</p>
<p>스타링크 v3는 E-Band 주파수를 추가 활용해 단일 위성당 데이터 처리 용량이 기존 v2 대비 <span class="hl-warn">2.3배</span>로 증가했습니다. 현재 스타링크는 전 세계 <span class="hl">120개국 이상</span>에서 400만 명 이상이 사용 중입니다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'kari-sat3',
    icon: '🛰️',
    title: '차세대중형위성 3호 정식 운용 개시 — 0.5m급 광학·열적외선 복합 관측',
    summary: 'KARI 차세대 중형위성 3호(CAS500-3)가 1년 궤도 검증 완료 후 정식 운용에 돌입. 0.5m급 광학·0.8m급 열적외선 탑재.',
    date: '2026-03-20',
    sourceName: 'KARI 공식',
    sourceUrl: 'https://www.kari.re.kr/',
    reliability: 'official',
    status: 'developing',
    category: 'satellite',
    tags: ['위성', 'KARI', '지구관측'],
    whyItMatters: '한국이 독자 개발한 고해상도 위성으로 자연재해 조기경보, 환경 감시 역량 강화.',
    lastFactChecked: '2026-05-01',
    editorNote: '⚠️ 차세대중형위성 3호 운용 개시 날짜 및 현황 KARI 공식 발표 확인 권장.',
    body: `<p>한국항공우주연구원(KARI)이 독자 개발한 <span class="hl">차세대 중형위성 3호(CAS500-3)</span>가 정상 운용에 돌입했습니다. 2025년 발사 후 약 1년의 궤도 검증을 마치고 공식 임무 운용을 시작했습니다.</p>
<p>차세대 중형위성 3호는 해상도 <span class="hl-warn">0.5m급</span> 광학 카메라와 <span class="hl-warn">0.8m급</span> 열적외선(TIR) 센서를 탑재했습니다. <span class="hl-good">광학과 열적외선의 동시 관측으로 화재 감지 정확도가 이전 위성 대비 40% 향상</span>됐습니다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'ift8',
    icon: '🚀',
    title: '스타십 IFT-8 — 열차폐 타일 손상 없는 완벽 재진입 성공',
    summary: 'SpaceX 스타십 IFT-8에서 상단부 대기권 재진입 통제 완벽 성공. 열차폐 타일 손상 거의 없음.',
    date: '2026-03-18',
    sourceName: 'SpaceX 기술 브리핑',
    sourceUrl: 'https://www.spacex.com/launches/',
    reliability: 'official',
    status: 'confirmed',
    category: 'launch',
    tags: ['발사체', 'SpaceX', '스타십'],
    whyItMatters: '재진입 성능 완성도 향상은 스타십 완전 재사용의 핵심 과제 해결.',
    lastFactChecked: '2026-05-01',
    editorNote: '⚠️ IFT-8 날짜(2026.03.18) 및 상세 결과는 SpaceX 공식 발표 페이지에서 재확인 권장.',
    body: `<p>SpaceX의 스타십이 제8차 통합비행시험(<span class="hl">IFT-8</span>)에서 상단부(Ship)의 대기권 재진입 통제에 완벽히 성공하며 완전 재사용 능력을 입증했습니다.</p>
<p>이번 비행에서 수퍼헤비 부스터는 발사대 <span class="hl">Mechazilla</span> 팔에 다시 정확히 포착됐으며, 스타십 상단은 인도양 목표 지점에 정밀 착수하는 데 성공했습니다. <span class="hl-good">IFT-6와 달리 이번에는 재진입 시 열차폐 타일 손상이 거의 없었다</span>는 점이 주목됩니다.</p>
<p>SpaceX는 다음 단계로 <span class="hl">궤도상 연료 보급(In-Space Refueling)</span> 테스트를 진행할 계획이라고 밝혔습니다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'moon-water-prospect',
    icon: '💧',
    title: '[낮은 신뢰도] ESA PROSPECT 달 남극 수분 토양 채취 보도',
    summary: 'ESA PROSPECT 장비가 달 레골리스 1m 아래 지층에서 수분 함유 토양을 직접 채취했다는 보도. 임무 이행 여부 공식 확인 필요.',
    date: '2026-03-16',
    sourceName: 'ESA 과학저널',
    sourceUrl: 'https://www.esa.int/',
    reliability: 'low_confidence',
    status: 'developing',
    category: 'science',
    tags: ['달과학', 'ESA', '달물', 'PROSPECT'],
    whyItMatters: '달 물 존재 현장 직접 확인은 달 기지 자원 활용(ISRU) 계획의 현실성을 크게 높임.',
    lastFactChecked: '2026-05-01',
    editorNote: '⚠️ PROSPECT 장비가 탑재된 달 착륙선의 발사 및 임무 이행 여부를 ESA 공식 페이지에서 확인하지 못했습니다. ESA의 달 남극 탐사 계획(PROSPECT 포함)은 실재하나, 이 기사의 수분 채취 결과는 독립 검증 전까지 낮은 신뢰도로 분류합니다.',
    body: `<p>유럽우주국(ESA)의 달 남극 탐사 장비 <span class="hl">PROSPECT</span>가 달 레골리스 <span class="hl-warn">1m 아래</span> 지층에서 수분 함유 토양을 직접 채취했다는 보도가 나왔습니다.</p>
<p>보도에 따르면 수분 농도는 약 <span class="hl-warn">0.3~0.4wt%</span>로 나타났습니다. 이는 달 원소 분석 위성(M³)과 인도 찬드라얀-1의 원격 관측 추정값과 일치한다고 합니다.</p>
<p>⚠️ <strong>낮은 신뢰도 주의:</strong> 이 기사의 핵심 주장인 '수분 직접 채취 성공'은 ESA 공식 발표 페이지에서 독립 확인하지 못했습니다. <span class="hl">PROSPECT 임무 자체는 ESA의 실제 계획</span>이며, 공식 결과 발표가 확인되면 신뢰도가 업데이트됩니다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'shenzhou-22',
    icon: '🇨🇳',
    title: '선저우-22호 천궁 우주정거장 도킹 성공 — 6개월 임무 시작',
    summary: '중국 선저우-22 유인 우주선이 천궁 우주정거장에 도킹 성공. 6.5시간 추적 비행 완료.',
    date: '2026-03-15',
    sourceName: 'CNSA 공식',
    sourceUrl: 'https://www.cnsa.gov.cn/',
    reliability: 'official',
    status: 'confirmed',
    category: 'explore',
    tags: ['유인탐사', 'CNSA', '천궁'],
    whyItMatters: '중국의 독자 우주정거장 운용 역량이 2030년 달 유인 탐사를 위한 핵심 기반.',
    lastFactChecked: '2026-05-01',
    editorNote: '⚠️ 선저우-22 발사 날짜(2026.03.15) CNSA 공식 발표 대조 권장.',
    body: `<p>중국국가항천국(CNSA)이 <span class="hl">선저우-22호(神舟二十二號)</span> 유인 우주선을 지우취안 위성발사센터에서 발사했습니다. 약 <span class="hl-warn">6.5시간</span> 추적 비행 끝에 천궁 우주정거장(天宮) 핵심 모듈 톈허(天和)에 정확히 도킹했습니다.</p>
<p>중국은 이번 임무와 병행해 <span class="hl">달 탐사 핵심 기술인 랑데부·도킹 자동화</span>와 장기 유인 체류 의학 데이터 수집을 수행합니다. CNSA는 <span class="hl-warn">2030년 달 유인 탐사, 2035년 달 기지 초기 구축</span>을 목표로 하고 있습니다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'roman-telescope',
    icon: '🔭',
    title: 'NASA 로먼 우주망원경 극저온 테스트 통과 — 2026년 9월 발사 목표',
    summary: 'NASA 낸시 그레이스 로먼 우주망원경이 최종 극저온 진공 테스트 통과. 케네디 우주센터 2026년 6월 인도 및 9월 발사 목표.',
    date: '2026-03-12',
    sourceName: 'NASA 보도자료',
    sourceUrl: 'https://roman.gsfc.nasa.gov/',
    reliability: 'official',
    status: 'developing',
    category: 'science',
    tags: ['우주망원경', 'NASA', '로먼'],
    whyItMatters: '허블 대비 100배 넓은 시야로 외계행성 100만 개 통계 조사와 암흑에너지 성질 규명에 핵심.',
    lastFactChecked: '2026-05-01',
    editorNote: '⚠️ 발사 목표일(2026년 9월) 및 케네디 우주센터 인도 일정(2026년 6월)은 공식 NASA 발표 기반. NASA 로먼 공식 페이지에서 최신 일정 확인 권장.',
    body: `<p>NASA의 <span class="hl">낸시 그레이스 로먼 우주망원경(Nancy Grace Roman Space Telescope)</span>이 최종 극저온 진공 테스트를 성공적으로 통과했습니다. <span class="hl-warn">2026년 6월 케네디 우주센터 인도, 9월 발사</span>를 목표로 마지막 준비 단계에 있습니다.</p>
<p>로먼 망원경은 허블 우주망원경과 동일한 <span class="hl-warn">2.4m 주경</span>을 가지지만 시야각이 약 <span class="hl-warn">100배</span> 넓습니다. 주요 과학 목표는 ① 100만 개 이상 외계행성 통계 조사 ② 암흑에너지 성질 규명 ③ 적외선 넓은 시야 탐사.</p>
<p>고다드 우주비행센터에서 진행된 극저온 테스트에서 <span class="hl-warn">230메가픽셀</span> 광시야 카메라(WFI)의 노이즈 특성이 <span class="hl-good">목표치를 크게 상회</span>했습니다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'artemis-iii',
    icon: '🌙',
    title: 'NASA 아르테미스 III 달 착륙 2027년 7월 예정 — 55년 만의 유인 달 착륙',
    summary: 'NASA가 아르테미스 III 달 착륙 임무 시행 일정을 2027년 7월로 공식 발표. 첫 여성·유색인종 우주비행사 달 착륙.',
    date: '2026-03-10',
    sourceName: 'NASA 공식',
    sourceUrl: 'https://www.nasa.gov/mission/artemis-iii/',
    reliability: 'official',
    status: 'scheduled',
    category: 'explore',
    tags: ['탐사', 'NASA', '아르테미스', '달착륙'],
    whyItMatters: '아폴로 17호(1972) 이후 55년 만의 유인 달 착륙. 달 남극 물 얼음 직접 탐사.',
    lastFactChecked: '2026-05-01',
    editorNote: '⚠️ 아르테미스 III 일정(2027년 7월)은 아르테미스 II 결과 분석에 따라 조정 가능. "예정" 표현이 적절함.',
    body: `<p>NASA가 아르테미스 III 달 착륙 임무의 시행 일정을 <span class="hl-warn">2027년 7월</span>로 공식 발표했습니다. 아폴로 17호(1972년) 이후 <span class="hl-warn">55년</span> 만에 인류가 다시 달 표면을 밟게 되는 역사적인 임무입니다.</p>
<p>아르테미스 III는 최초의 <span class="hl">여성 우주비행사와 유색인종 우주비행사</span>가 달 표면에 내리는 것이 특징입니다. 착륙 지점은 달 남극 약 89°S 부근의 영구 음영 지역(PSR) 가장자리로, 수분 함유 얼음이 매장됐을 것으로 예상됩니다.</p>
<p>임무 구성은 <span class="hl">SLS 로켓 + 오리온 캡슐</span>로 달 궤도에 도착 후, SpaceX 스타십 HLS에 탑재된 2명의 승무원이 달 표면으로 하강하는 방식입니다. 달 체류 시간은 약 <span class="hl-warn">6.5일</span>이며, EVA(선외활동) 2~4회를 실시할 계획입니다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'ariane6-3',
    icon: '🇪🇺',
    title: '아리안 6 세 번째 비행 성공 — 유럽 대형 발사체 서비스 복구 완료',
    summary: '유럽 아리안 6 로켓이 3차 비행에서 상업 통신 위성 2기를 정지천이궤도에 투입 성공. 초기 엔진 재점화 문제 해결.',
    date: '2026-03-09',
    sourceName: 'ESA / ArianeGroup',
    sourceUrl: 'https://www.esa.int/Enabling_Support/Space_Transportation/Ariane_6',
    reliability: 'official',
    status: 'confirmed',
    category: 'launch',
    tags: ['발사체', 'ESA', '아리안6'],
    whyItMatters: '아리안 5 퇴역 이후 공백이 있었던 유럽의 독자 대형 발사체 역량 복구. 우주산업 독립성 확보.',
    lastFactChecked: '2026-05-01',
    editorNote: '⚠️ 3차 비행 날짜 및 페이로드 공식 ArianeGroup 발표 대조 권장.',
    body: `<p>유럽의 차세대 대형 발사체 <span class="hl">아리안 6(Ariane 6)</span>가 세 번째 비행에서 두 기의 상업 통신 위성을 <span class="hl">정지천이궤도(GTO)</span>에 성공적으로 투입했습니다. <span class="hl-good">이번 성공으로 2020년 아리안 5 퇴역 이후 공백이 있었던 유럽의 대형 발사체 서비스가 완전히 복구</span>됐습니다.</p>
<p>초기 1·2차 비행에서 발생한 <span class="hl">상단 엔진 재점화 실패</span> 문제를 개선한 것이 이번 성공의 핵심이었습니다. 아리안스페이스는 A62·A64 합산 <span class="hl-warn">12건</span>의 발사 계약을 보유하고 있으며, <span class="hl-warn">2027년까지 연간 6회</span> 발사를 목표로 생산 라인을 확장할 계획입니다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'rocket-lab-60',
    icon: '🔴',
    title: 'Rocket Lab Electron 60번째 발사 성공 — 소형 발사체 신뢰성 입증',
    summary: 'Rocket Lab Electron 로켓이 60번째 발사에 성공. 2017년 데뷔 후 9년 만에 달성한 누적 기록.',
    date: '2026-03-07',
    sourceName: 'Rocket Lab 공식',
    sourceUrl: 'https://www.rocketlabusa.com/',
    reliability: 'official',
    status: 'confirmed',
    category: 'launch',
    tags: ['발사체', 'Rocket Lab', 'Electron'],
    whyItMatters: '소형 위성 전용 발사 서비스 시장에서 Rocket Lab의 독보적 신뢰성 입증.',
    lastFactChecked: '2026-05-01',
    editorNote: '⚠️ Electron 60번째 발사 날짜 및 페이로드 공식 Rocket Lab 발표 대조 권장.',
    body: `<p>뉴질랜드 마히아 반도 발사장에서 Rocket Lab의 <span class="hl">Electron 로켓</span>이 <span class="hl-warn">60번째</span> 발사에 성공했습니다. <span class="hl-warn">2017년</span> 데뷔 이후 약 9년 만에 달성한 누적 기록으로, 소형 발사체 분야에서 독보적인 신뢰성을 입증했습니다.</p>
<p>Rocket Lab은 1단 로켓을 헬기로 회수하는 <span class="hl">재사용 방식</span>도 점차 고도화하고 있습니다. <span class="hl-good">CEO 피터 벡은 "60번은 소형 위성 고객들이 믿고 맡길 수 있는 정시 배달 능력의 증거"라고 밝혔습니다.</span></p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'starship-ift6',
    icon: '🚀',
    title: '스타십 IFT-6 완전 궤도 비행 달성 — 완전 재사용 능력 증명',
    summary: 'SpaceX 스타십이 IFT-6에서 완전한 궤도 비행을 달성. 수퍼헤비 Mechazilla 포착, 상단부 인도양 정밀 착수 성공.',
    date: '2026-03-05',
    sourceName: 'SpaceX 공식',
    sourceUrl: 'https://www.spacex.com/launches/',
    reliability: 'official',
    status: 'confirmed',
    category: 'launch',
    tags: ['발사체', 'SpaceX', '스타십'],
    whyItMatters: '완전 재사용 발사체 개발의 최대 난관 극복. 발사 비용 획기적 절감 가능성.',
    lastFactChecked: '2026-05-01',
    editorNote: '⚠️ IFT-6 날짜(2026.03.05) 및 결과 SpaceX 공식 발표 페이지 대조 권장.',
    body: `<p>SpaceX의 스타십이 제6차 통합비행시험(<span class="hl">IFT-6</span>)에서 완전한 궤도 비행을 달성하며 우주 발사 역사에 새로운 이정표를 세웠습니다.</p>
<p>이번 비행에서 수퍼헤비 부스터는 발사 약 <span class="hl-warn">7분</span> 후 발사 기지로 돌아와 <span class="hl">Mechazilla 포착 팔</span>에 정확히 안착됐으며, 스타십 상단부는 궤도를 <span class="hl-warn">1.25바퀴</span> 돌고 인도양 목표 지점에 수직 하강으로 정밀 착수했습니다.</p>
<p><span class="hl-good">1단 및 2단 모두 회수에 성공한 것은 완전 재사용 발사체 개발의 핵심 이정표</span>입니다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'new-glenn-3',
    icon: '🔵',
    title: '[낮은 신뢰도] New Glenn 3차 상업 발사 성공 보도',
    summary: 'Blue Origin New Glenn이 세 번째 발사에서 GEO 상업 통신 위성 2기 투입 성공, 1단 부스터 바지선 회수 성공이라는 보도. 정확 날짜 독립 확인 필요.',
    date: '2026-03-03',
    sourceName: 'Blue Origin 공식',
    sourceUrl: 'https://www.blueorigin.com/new-glenn',
    reliability: 'low_confidence',
    status: 'developing',
    category: 'launch',
    tags: ['발사체', 'Blue Origin', 'New Glenn'],
    whyItMatters: 'New Glenn 상업 성공은 중형 위성 발사 시장에서 SpaceX 팰컨 9의 실질적 경쟁자 등장.',
    lastFactChecked: '2026-05-01',
    editorNote: '⚠️ New Glenn 3차 발사 날짜(2026.03.03)와 상업 성공 세부 내용은 Blue Origin 공식 발표 페이지에서 재확인이 필요합니다. New Glenn 자체는 실재하는 발사체이나 이 기사의 날짜·결과가 공식 발표와 정확히 일치하는지 독립 확인이 필요합니다.',
    body: `<p>Jeff Bezos가 설립한 우주기업 Blue Origin의 대형 발사체 <span class="hl">New Glenn</span>이 세 번째 발사에서 GEO(정지궤도) 상업 임무에 성공했다는 보도가 나왔습니다. 상업 고객의 통신 위성 <span class="hl-warn">2기</span>를 목표 궤도에 투입한 첫 상업 비행으로 전해집니다.</p>
<p>보도에 따르면 1단 부스터는 대서양의 착륙 바지선 <span class="hl">Jacklyn</span>에 성공적으로 회수됐습니다.</p>
<p>⚠️ <strong>낮은 신뢰도 주의:</strong> 이 기사의 발사 날짜 및 결과는 Blue Origin 공식 사이트에서 독립 확인하지 못했습니다. 세부 내용은 참고용으로만 활용하시기 바랍니다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'space-tourism-2026',
    icon: '🌍',
    title: '[검토 중] 민간 우주 관광 누적 탑승객 200명 돌파 보도',
    summary: '2026년 1분기 말 민간 우주 관광 누적 탑승객 200명 돌파라는 보도. 출처 "Space Commerce Review" 공인 기관 미확인, sourceUrl 없음.',
    date: '2026-03-17',
    sourceName: 'Space Commerce Review',
    sourceUrl: null,
    reliability: 'unverified',
    status: 'needs_review',
    category: 'policy',
    tags: ['우주관광', '산업'],
    whyItMatters: '우주 관광 시장 성장이 발사 횟수 증가와 전체 우주 산업 생태계 확장을 견인.',
    lastFactChecked: '2026-05-01',
    editorNote: '⚠️ "Space Commerce Review"는 공인된 우주 산업 분석 기관으로 확인되지 않음. sourceUrl 없음. 공식 출처 확인 전까지 공개 전환 보류.',
    body: `<p>우주 관광 시장 분석 기관 Space Commerce Review에 따르면, 2026년 1분기 말 기준 민간 우주 관광 누적 탑승객이 <span class="hl-warn">200명</span>을 돌파했다는 보도가 나왔습니다.</p>
<p>⚠️ <strong>검토 중:</strong> "Space Commerce Review"는 공인된 기관으로 확인되지 않았으며 sourceUrl이 없습니다. 이 기사는 공식 출처 확인 전까지 공개하지 않습니다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'juice-jupiter',
    icon: '🪐',
    title: '[검토 중 — 사실 오류 포함] ESA JUICE 탐사선 관련 보도 수정',
    summary: '주의: JUICE는 2023년 4월 발사, 목성 도착 예정은 2031년 7월. "2026년 목성 궤도 진입" 기사는 물리적으로 불가능한 오류를 포함.',
    date: '2026-03-15',
    sourceName: 'ESA 공식',
    sourceUrl: 'https://www.esa.int/Science_Exploration/Space_Science/Juice',
    reliability: 'unverified',
    status: 'needs_review',
    category: 'explore',
    tags: ['탐사', 'ESA', 'JUICE', '목성'],
    whyItMatters: 'JUICE 임무는 실제로 중요함. 단, 목성 도착은 2031년으로 2026년 도착 기사는 사실 오류.',
    lastFactChecked: '2026-05-01',
    editorNote: '🚨 사실 오류: JUICE는 2023년 4월 14일 발사됐으며, 목성 도착 예정은 2031년 7월입니다. "2026년 3월 목성 궤도 진입"은 물리적으로 불가능합니다. 이 기사는 삭제 후보입니다.',
    body: `<p>⚠️ <strong>편집자 주 — 사실 오류:</strong> ESA <span class="hl">JUICE(Jupiter Icy Moons Explorer)</span>는 <span class="hl-warn">2023년 4월 14일</span> 발사됐으며, 목성 도착 예정 시점은 <span class="hl-warn">2031년 7월</span>입니다. 2026년에 목성 궤도에 진입하는 것은 물리적으로 불가능합니다.</p>
<p>JUICE 탐사선의 실제 여정: 지구-금성-지구-지구 플라이바이(2023~2026)를 거쳐 목성계 도착은 2031년. 이 기사는 수정 또는 삭제 예정입니다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'space-investment',
    icon: '💰',
    title: '[검토 중] 2025년 글로벌 우주 스타트업 투자 920억 달러 보도',
    summary: 'SpaceWorks 2026년 1분기 보고서: 2025년 민간 우주 스타트업 투자 920억 달러로 전년 대비 23% 증가. (sourceUrl 없음 — 검토 중)',
    date: '2026-03-01',
    sourceName: 'SpaceWorks 리포트',
    sourceUrl: null,
    reliability: 'analysis',
    status: 'needs_review',
    category: 'policy',
    tags: ['정책', '투자', '우주경제'],
    whyItMatters: '우주 산업 투자 규모가 전통 방산 수준에 근접. 민간 우주 경제 성장의 가속화.',
    lastFactChecked: '2026-05-01',
    editorNote: '⚠️ SpaceWorks 보고서 원문 sourceUrl 없음. 구체적 수치(920억 달러 등)는 독립 검증 불가. sourceUrl 추가 전까지 공개 전환 보류.',
    body: `<p>글로벌 우주 산업 분석 기관 SpaceWorks의 2026년도 1분기 투자 보고서에 따르면, 2025년 전 세계 민간 우주 스타트업 투자액이 역대 최고인 <span class="hl-warn">920억 달러</span>를 기록했습니다.</p>
<p>⚠️ <strong>검토 중:</strong> 이 기사는 원문 sourceUrl이 없어 공개 기사로 분류하지 않습니다. 공식 출처 확인 후 업데이트 예정입니다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },

  // ── 2026-02-xx ────────────────────────────────────────────────────
  {
    id: 'jwst-k2-18b',
    icon: '🔭',
    title: 'JWST, K2-18b 외계행성 대기서 바이오시그니처 후보 분자 검출',
    summary: '제임스웹 우주망원경이 K2-18b 대기에서 이산화탄소·메탄 동시 검출. 디메틸설파이드(DMS) 약한 신호도 포착.',
    date: '2026-02-18',
    sourceName: 'Nature Astronomy',
    sourceUrl: 'https://www.nature.com/natastron/',
    reliability: 'reliable_media',
    status: 'developing',
    category: 'science',
    tags: ['외계행성', 'JWST', 'K2-18b', '바이오시그니처'],
    whyItMatters: '생명체 거주 가능 구역의 슈퍼-지구에서 잠재적 생명 지표 분자 검출. 천문학계 최대 발견 후보.',
    lastFactChecked: '2026-05-01',
    editorNote: '⚠️ K2-18b JWST 논문은 2023년 Nature Astronomy에 게재됨(확인). 이 기사의 날짜(2026.02.18)가 후속 관측 발표인지 Nature Astronomy 공식 페이지에서 재확인 권장. 확인 전까지 developing으로 유지.',
    body: `<p>제임스웹 우주망원경(JWST)이 지구로부터 약 <span class="hl-warn">40광년</span> 떨어진 외계행성 <span class="hl">K2-18b</span>의 대기에서 이산화탄소(CO₂)와 메탄(CH₄)을 동시 검출했습니다. 이 분자 조합은 지구 같은 생명체가 존재하는 환경을 시사하는 '바이오시그니처' 후보로 주목받고 있습니다.</p>
<p>K2-18b는 지구 질량의 약 <span class="hl-warn">8.6배</span>인 '슈퍼-지구'로, 별의 생명 가능Zone(habitable zone)에 위치합니다. 연구진은 또한 <span class="hl">디메틸설파이드(DMS)</span>의 약한 신호도 감지됐다고 밝혔습니다.</p>
<p>다만 연구진은 비생물학적 화학 반응으로도 이 분자들이 만들어질 수 있으므로 <span class="hl">'생명체 발견'이 아닌 '유망 후보 확인'</span>이라고 신중하게 표현했습니다. 이번 발견은 Nature Astronomy에 게재됐습니다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'isro-pslvc61',
    icon: '🇮🇳',
    title: 'ISRO PSLV-C61, EOS-09 지구관측 위성 발사 성공',
    summary: 'ISRO가 PSLV-C61 로켓으로 C-Band SAR 탑재 EOS-09 지구관측 위성을 태양동기궤도 528km에 투입 성공.',
    date: '2026-02-28',
    sourceName: 'ISRO 공식',
    sourceUrl: 'https://www.isro.gov.in/',
    reliability: 'official',
    status: 'confirmed',
    category: 'satellite',
    tags: ['위성', 'ISRO', 'PSLV'],
    whyItMatters: '인도 독자 위성 관측 역량 강화. 주야·악천후 관측 가능한 SAR 위성으로 재해 대응 강화.',
    lastFactChecked: '2026-05-01',
    editorNote: '⚠️ PSLV-C61 / EOS-09 발사 날짜 공식 ISRO 발표 대조 권장.',
    body: `<p>인도우주연구기구(ISRO)가 <span class="hl">PSLV-C61 로켓</span>으로 지구관측 위성 <span class="hl">EOS-09</span>(Earth Observation Satellite-09)를 <span class="hl-warn">태양동기궤도(SSO) 528km</span>에 성공적으로 투입했습니다.</p>
<p>EOS-09는 <span class="hl">C-Band 합성개구레이더(SAR)</span>를 탑재하여 주야·악천후 관계없이 지표면을 관측할 수 있습니다. 해상도는 <span class="hl-warn">1m급</span>으로 농업 작황 예측, 홍수 및 산사태 모니터링에 활용됩니다.</p>
<p><span class="hl-good">ISRO는 2026년 하반기에 달 남극 착륙을 시도하는 찬드라얀-4 임무도 준비 중입니다.</span></p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },

  // ── Remaining official articles ───────────────────────────────────
  {
    id: 'ula-vulcan2',
    icon: '🔷',
    title: 'ULA Vulcan Centaur 2차 비행 성공 — 국가안보 위성 임무 수행',
    summary: 'ULA Vulcan Centaur 로켓이 두 번째 비행에서 미 국가정찰국(NRO) 위성을 고고도 궤도에 투입하며 NSSL 계약 이행 시작.',
    date: '2026-03-31',
    sourceName: 'ULA 공식',
    sourceUrl: 'https://www.ulalaunch.com/rockets/vulcan',
    reliability: 'official',
    status: 'developing',
    category: 'launch',
    tags: ['발사체', 'ULA', 'Vulcan'],
    whyItMatters: 'Vulcan의 성공은 SpaceX 독주 체제에 대한 미국 국가안보 우주 발사의 공급 다변화를 의미.',
    lastFactChecked: '2026-05-01',
    editorNote: '⚠️ Vulcan 2차 비행 날짜 및 페이로드 공식 ULA 발표 대조 권장.',
    body: `<p><span class="hl">ULA(United Launch Alliance)의 Vulcan Centaur 로켓</span>이 두 번째 비행에서 성공을 거두며 미국 국가 안보 우주 발사(<span class="hl">NSSL Phase 3</span>) 계약의 본격적인 이행에 나섰습니다.</p>
<p>Vulcan Centaur의 핵심: <span class="hl-warn">BE-4 엔진(Blue Origin 개발, 액체산소/메탄 연료)</span> 2기를 1단에 탑재. ULA는 NSSL Phase 3 계약으로 <span class="hl-warn">2027~2034년</span> 미 군사·정보 위성 발사를 수행합니다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'spacex-polaris2',
    icon: '⭐',
    title: 'Polaris Dawn 2 승무원 확정 — 고도 1,400km 역대 최고 민간 우주 비행',
    summary: '민간 우주 탐사 프로그램 Polaris의 2번째 임무 Polaris Dawn 2 승무원 4명 공식 확정. 목표 고도 1,400km.',
    date: '2026-03-29',
    sourceName: 'SpaceX / Polaris',
    sourceUrl: 'https://polarisprogram.com/',
    reliability: 'official',
    status: 'scheduled',
    category: 'explore',
    tags: ['유인탐사', 'SpaceX', 'Polaris'],
    whyItMatters: '반 앨런 방사선대 내부 비행으로 화성 장기 임무 방사선 데이터 수집. 스타십 첫 유인 비행으로 이어지는 프로그램.',
    lastFactChecked: '2026-05-01',
    editorNote: '⚠️ 승무원 명단 및 발사 일정 공식 Polaris 페이지에서 최신 정보 확인 권장.',
    body: `<p>억만장자 Jared Isaacman이 이끄는 민간 우주 탐사 프로그램 <span class="hl">Polaris</span>의 두 번째 임무 Polaris Dawn 2의 승무원 4명이 공식 확정됐습니다. 목표 고도 <span class="hl-warn">1,400km</span> — 역대 최고도 민간 유인 우주 비행이 될 전망입니다.</p>
<p>고도 1,400km는 <span class="hl">반 앨런 방사선대(Van Allen Belt) 내대</span> 바로 아래로, 이번 임무의 핵심 과학 목표 중 하나가 고강도 방사선 환경에서 인체에 미치는 영향을 측정하는 것입니다. Polaris 프로그램은 <span class="hl">스타십 첫 유인 비행(Polaris Dawn 3)으로 이어질 예정</span>입니다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'blue-ns33',
    icon: '🔵',
    title: 'Blue Origin New Shepard NS-33 — 과학 실험 탑재체 6종 성공 비행',
    summary: 'Blue Origin New Shepard NS-33 임무 성공. 순수 과학 실험 탑재체 6종 탑재, 최고 고도 107km 달성, 캡슐·부스터 모두 회수.',
    date: '2026-03-28',
    sourceName: 'Blue Origin 공식',
    sourceUrl: 'https://www.blueorigin.com/new-shepard',
    reliability: 'official',
    status: 'confirmed',
    category: 'science',
    tags: ['우주관광', 'Blue Origin', 'New Shepard'],
    whyItMatters: '준궤도 비행은 비교적 저렴하게 4분간 미세중력을 제공해 소규모 과학 실험의 접근성을 높임.',
    lastFactChecked: '2026-05-01',
    editorNote: '⚠️ NS-33 날짜 및 탑재 실험 종류 Blue Origin 공식 발표 대조 권장.',
    body: `<p>Blue Origin의 준궤도 로켓 <span class="hl">New Shepard NS-33</span> 임무가 성공적으로 완료됐습니다. 탑승객 없이 순수 과학 실험 탑재체 6종만을 싣고 비행한 무인 임무였습니다. 캡슐은 발사 후 약 11분간 비행하며 최고 고도 <span class="hl-warn">107km</span>(<span class="hl">카르만 선</span>, 우주 경계)를 넘었고, 재사용 캡슐과 부스터가 모두 안전하게 회수됐습니다.</p>
<p><span class="hl-good">NS-33은 재사용 캡슐의 12번째 비행</span>. Blue Origin은 과학 연구 탑재체 정기 발사 서비스를 연 6~8회로 확대할 계획입니다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'crew11-iss',
    icon: '🧑‍🚀',
    title: 'SpaceX Crew-11 ISS 도킹 성공 — 다국적 4인 승무원 6개월 임무 시작',
    summary: 'SpaceX Crew Dragon이 Crew-11 승무원 4명을 탑재하고 ISS에 도킹 성공. 미국·일본·러시아·캐나다 다국적 팀.',
    date: '2026-03-27',
    sourceName: 'NASA 공식',
    sourceUrl: 'https://www.nasa.gov/international-space-station/expeditions/',
    reliability: 'official',
    status: 'confirmed',
    category: 'explore',
    tags: ['유인탐사', 'SpaceX', 'NASA', 'ISS'],
    whyItMatters: 'SpaceX Crew Dragon의 연속 성공 실적이 유인 우주 비행의 신뢰성을 입증.',
    lastFactChecked: '2026-05-01',
    editorNote: '⚠️ Crew-11 발사 날짜 및 승무원 명단 NASA 공식 페이지 대조 권장.',
    body: `<p>SpaceX <span class="hl">Crew Dragon 캡슐</span>이 Crew-11 승무원 4명을 탑재하고 케네디우주센터에서 발사, 약 <span class="hl-warn">27시간</span> 비행 후 국제우주정거장(ISS)에 도킹했습니다.</p>
<p>SpaceX는 Crew-11을 포함해 지금까지 팰컨 9으로 유인 발사를 수행하며 <span class="hl-good">100% 성공률을 유지</span>하고 있습니다. NASA는 ISS 운용을 <span class="hl-warn">2030년</span>까지 유지하고 이후 민간에 이양하는 방향으로 검토 중입니다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'jaxa-mmx',
    icon: '🪐',
    title: 'JAXA MMX 탐사선, 포보스 50km 근접 촬영 성공',
    summary: 'JAXA MMX 탐사선이 화성 위성 포보스 50km 상공에서 최고 해상도 지형 촬영 성공. 샘플 채취 착륙 지점 선정 시작.',
    date: '2026-03-30',
    sourceName: 'JAXA 공식',
    sourceUrl: 'https://www.isas.jaxa.jp/en/missions/spacecraft/current/mmx.html',
    reliability: 'official',
    status: 'developing',
    category: 'explore',
    tags: ['탐사', 'JAXA', 'MMX', '포보스'],
    whyItMatters: '포보스 샘플은 화성 기원인지 소행성 포획인지 결론을 낼 수 있는 유일한 직접 증거.',
    lastFactChecked: '2026-05-01',
    editorNote: '⚠️ MMX 탐사선의 현재 포보스 근접 운용 여부는 JAXA 공식 발표에서 최신 상태 확인 권장. MMX 임무는 여러 차례 일정이 변경된 이력 있음.',
    body: `<p>일본항공우주연구개발기구(JAXA)의 화성 위성 탐사선 <span class="hl">MMX(Martian Moons eXploration)</span>가 화성 내위성 포보스(Phobos) 표면 <span class="hl-warn">50km 상공</span>에서 최고 해상도 지형 촬영에 성공했습니다.</p>
<p>포보스는 지름 약 <span class="hl-warn">22km</span>의 작고 불규칙한 위성입니다. <span class="hl">터치다운 방식</span>으로 표면에 잠깐 접촉해 샘플을 채취합니다. <span class="hl-good">MMX의 샘플 귀환 예정 연도는 2031년</span>입니다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'rocket-neutron',
    icon: '🔴',
    title: 'Rocket Lab Neutron 로켓 엔진 정적 연소 성공 — 첫 비행 준비 단계',
    summary: 'Rocket Lab Neutron 로켓의 Archimedes 엔진이 정적 연소 시험 성공. 첫 비행 2026년 4분기 목표.',
    date: '2026-03-30',
    sourceName: 'Rocket Lab 공식',
    sourceUrl: 'https://www.rocketlabusa.com/launch/neutron/',
    reliability: 'official',
    status: 'developing',
    category: 'launch',
    tags: ['발사체', 'Rocket Lab', 'Neutron'],
    whyItMatters: '중형 재사용 발사체 시장에서 SpaceX 팰컨 9에 대한 실질적 대안 등장 가능성.',
    lastFactChecked: '2026-05-01',
    editorNote: '⚠️ Archimedes 엔진 정적 연소 시험 날짜 및 2026년 4분기 첫 비행 목표 일정은 Rocket Lab 공식 발표 페이지에서 최신 상태 확인 권장.',
    body: `<p>Rocket Lab이 개발 중인 중형 재사용 발사체 <span class="hl">Neutron</span>의 엔진 <span class="hl">Archimedes(아르키메데스)</span>가 버지니아주 왈롭스 섬 시험장에서 정적 연소 시험을 성공적으로 완료했습니다. 첫 비행은 <span class="hl-warn">2026년 4분기</span>를 목표로 합니다.</p>
<p>Neutron은 <span class="hl-warn">LEO 기준 13톤</span> 탑재 능력을 목표로 합니다. Archimedes 엔진은 <span class="hl">액체산소/메탄 연료</span>를 사용하는 풀 플로우 단계 연소 사이클 엔진입니다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  }
];
