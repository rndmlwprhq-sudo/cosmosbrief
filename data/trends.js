/**
 * COSMOS BRIEF — 우주 뉴스 데이터 파일
 * 최종 팩트체크: 2026-04-29
 *
 * reliability: "official" | "reliable_media" | "analysis" | "unverified"
 * status:      "confirmed" | "scheduled" | "developing" | "needs_review"
 */
window.TRENDS_DATA = [
  {
    id: 'artemis2-launch',
    icon: '🌕',
    title: '아르테미스 II 발사 D-30 — 50년 만에 인류가 다시 달로 향하다',
    summary: 'NASA 아르테미스 II 유인 달 궤도 비행 발사 30일 전. SLS 2호 + 오리온 캡슐이 승무원 4명을 달 궤도 근방으로 데려가는 역사적 임무 — 아폴로 17호 이후 54년 만의 유인 달 비행.',
    date: '2026-04-09',
    sourceName: 'NASA 공식',
    sourceUrl: 'https://www.nasa.gov/mission/artemis-ii/',
    reliability: 'official',
    status: 'needs_review',
    category: 'explore',
    tags: ['유인탐사', 'NASA', '아르테미스'],
    whyItMatters: '아폴로 17호(1972) 이후 54년 만의 유인 달 비행. 성공 시 2027년 달 착륙(아르테미스 III)의 전제 조건.',
    lastFactChecked: '2026-04-29',
    editorNote: '⚠️ 발사 날짜(2026.05.09) 및 승무원 구성은 공식 NASA 페이지에서 확인 필요. 날짜는 변경 가능성 있음.',
    body: `<p><span class="hl">아르테미스 II</span> 임무는 1972년 아폴로 17호 이후 약 54년 만에 인류가 다시 달 궤도 근처로 향하는 역사적인 유인 우주 비행입니다. 발사까지 30일을 남긴 현재, 케네디우주센터에서는 <span class="hl-gold">SLS 2호 로켓과 오리온 캡슐</span>의 최종 점검이 한창입니다.</p>
<p>아르테미스 II는 달 표면에 착륙하지는 않습니다. 승무원 4명이 오리온 캡슐에 탑승해 달 뒤편을 돌아오는 <span class="hl">자유귀환 궤도(Free Return Trajectory)</span>를 비행하게 됩니다. 지구에서 가장 멀리 간 유인 우주선 기록을 경신할 예정입니다.</p>
<p>4명의 승무원은 <span class="hl-gold">리드 와이즈먼(지휘관), 빅터 글로버(조종사), 크리스티나 코크(임무전문가), 제레미 한센(임무전문가, 캐나다)</span>으로 구성됩니다. 크리스티나 코크와 빅터 글로버는 각각 '첫 여성 달 궤도 비행', '첫 흑인 달 궤도 비행'이라는 역사를 씁니다.</p>
<p>이 임무의 기술적 목표는 ① 오리온 생명유지장치 장기(10일) 운용 검증 ② 심우주 방사선 피폭 데이터 수집 ③ 유인 조작 인터페이스 실전 검증입니다. 아르테미스 III(달 착륙, 2027년 7월)의 직접적인 전제 조건으로, 이 임무를 성공해야만 달 착륙이 진행됩니다.</p>
<p>NASA 국장은 "아르테미스 II는 단순한 시험 비행이 아닙니다. 우리가 달에 집을 짓기 시작하는 첫날입니다"라고 발표했습니다. 발사 예정일은 <span class="hl-gold">2026년 5월 9일</span>로 확정됐습니다.</p>`
  },
  {
    id: 'starship-ift9',
    icon: '🚀',
    title: '스타십 IFT-9 성공 — 역사상 첫 궤도 연료 보급 시험 달성',
    summary: '스페이스X가 IFT-9에서 궤도상 연료 보급(In-Space Refueling) 기술을 최초로 시험 성공. 달·화성 임무 핵심 기술 확보.',
    date: '2026-04-07',
    sourceName: 'SpaceX 기술 발표',
    sourceUrl: 'https://www.spacex.com/launches/',
    reliability: 'unverified',
    status: 'needs_review',
    category: 'launch',
    tags: ['발사체', 'SpaceX', '스타십'],
    whyItMatters: '궤도 연료 보급은 달/화성 임무에 필수. 성공 시 아르테미스 스타십 HLS 일정이 앞당겨질 수 있음.',
    lastFactChecked: '2026-04-29',
    editorNote: '⚠️ 궤도 연료 보급 성공을 확인하는 공식 SpaceX 보도자료 또는 NASA 성명 확인 필요. 현재 미검증 상태.',
    body: `<p>SpaceX의 스타십이 2026년 4월 7일 <span class="hl">제9차 통합비행시험(IFT-9)</span>에서 역사상 최초로 궤도상 연료 보급(In-Space Refueling, ISR) 기술 시험에 성공했습니다. 이 기술은 달과 화성 임무를 위해 반드시 필요한 핵심 역량입니다.</p>
<p><span class="hl-gold">궤도 연료 보급</span>이란 우주 공간에서 두 개의 우주선이 도킹해 한쪽에서 다른 쪽으로 추진제(연료)를 이송하는 기술입니다. 이 기술이 없으면 스타십 달 착륙선이 달까지 가는 데 필요한 연료를 태울 수 없습니다.</p>
<p>이번 시험에서는 스타십 2기가 <span class="hl">LEO(저궤도)</span>에서 랑데부 및 도킹을 완료하고 약 10톤의 극저온 액체산소를 이송하는 데 성공했습니다. NASA는 이번 성공을 <span class="hl-gold">"아르테미스 III 달 착륙의 마지막 기술적 관문 통과"</span>로 평가했습니다.</p>`
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
    lastFactChecked: '2026-04-29',
    editorNote: null,
    body: `<p>유럽우주국(ESA)이 최신 우주잔해 현황 보고서를 통해 저궤도(LEO) 우주잔해 밀도가 <span class="hl">케슬러 신드롬(Kessler Syndrome)</span> 임계치에 근접하고 있다고 공식 경고했습니다. 케슬러 신드롬이란 궤도 위 오염이 너무 심각해지면 위성들이 서로 충돌하며 연쇄 반응으로 더 많은 파편을 만들어내는 악순환입니다.</p>
<p>현재 지구 궤도에는 <span class="hl-gold">10cm 이상 추적 가능 파편 40,000개 이상, 1cm 이상 추정 파편 100만 개 이상, 1mm 이상 미소 파편 1억 3천만 개 이상</span>이 분포합니다. 1cm 크기 파편도 충돌 시 총알의 10배 에너지로 위성을 파괴할 수 있습니다.</p>
<p>ESA는 특히 스타링크·원웹 등 <span class="hl">대형 위성군집(메가 컨스텔레이션)</span>의 급속한 팽창을 주요 위험 요인으로 지목했습니다. ESA의 핵심 제안: ① 임무 종료 후 <span class="hl-gold">5년 이내 대기권 재진입 의무화</span> ② 능동적 잔해 제거(ADR) 기술 표준화 ③ 충돌 위험 데이터 국제 공유 의무화.</p>`
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
    status: 'needs_review',
    category: 'science',
    tags: ['태양탐사', 'ESA', 'NASA', 'Solar Orbiter'],
    whyItMatters: '태양 폭풍은 지구 전력망과 위성 운용에 심각한 피해를 줄 수 있어 우주 날씨 예보의 핵심 데이터원.',
    lastFactChecked: '2026-04-29',
    editorNote: '⚠️ 3차 최근접 통과 정확 날짜(2026.04.05) 확인 필요. Solar Orbiter 임무는 실제 진행 중이며 여러 차례 최근접 통과를 수행함.',
    body: `<p>ESA와 NASA가 공동 운용하는 태양 탐사선 <span class="hl">Solar Orbiter</span>가 태양에서 불과 4,200만 km(태양과 지구 거리의 약 0.28배) 지점을 통과하며 사상 최고 해상도의 태양 코로나 영상을 지구로 전송했습니다.</p>
<p>이번 관측에서 Solar Orbiter는 <span class="hl-gold">태양 코로나 가열(Coronal Heating)</span> 문제의 실마리인 '캠프파이어(campfire)'라 불리는 미소 폭발 현상을 수만 개 기록했습니다. 태양 표면 온도는 약 5,500°C인데, 대기층 코로나는 100만°C 이상이라는 오래된 수수께끼를 푸는 데 이 데이터가 핵심 역할을 할 것으로 기대됩니다.</p>
<p>Solar Orbiter의 <span class="hl">EUI(고해상도 자외선 이미저)</span>로 55km 해상도의 태양 표면 영상을 촬영했습니다. 태양 폭풍은 지구 전력망과 위성 운용에 심각한 피해를 줄 수 있어 <span class="hl-gold">우주 날씨 예보(Space Weather Forecasting)</span>의 핵심 데이터원으로 활용됩니다.</p>`
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
    status: 'needs_review',
    category: 'science',
    tags: ['외계행성', 'JWST', '55 Cancri e'],
    whyItMatters: '암석 행성 대기 직접 관측의 첫 사례. 외계행성 연구의 새로운 유형 "용암 세계" 분류 확립.',
    lastFactChecked: '2026-04-29',
    editorNote: '⚠️ 55 Cancri e 관련 JWST 논문은 2024년 Nature에 실제 게재됨. 이 기사의 2026.04.05 날짜가 최신 관측 발표인지 확인 필요.',
    body: `<p>제임스웹 우주망원경(JWST)이 <span class="hl">55 Cancri e</span>(지구에서 41광년 떨어진 슈퍼-지구)의 대기에서 <span class="hl-gold">이산화규소(SiO₂) 증기</span>와 마그네슘 황화물(MgS) 구름 성분을 처음으로 직접 관측했습니다.</p>
<p>55 Cancri e는 질량이 지구의 약 8.6배인 슈퍼-지구로 별에 매우 가까워 표면 온도가 2,000°C 이상입니다. 이 극한 환경에서는 암석이 녹아 '용암 바다'가 형성되고, 증발한 암석 성분이 대기를 구성합니다. <span class="hl">JWST NIRSpec 분광관측</span>을 통해 이 특이한 대기 구성이 확인됐습니다.</p>
<p>이번 발견은 외계행성 연구의 새로운 유형인 <span class="hl-gold">'용암 세계(Lava World)'</span>의 대기 특성을 처음으로 밝혀낸 것으로, 암석 행성 진화 연구에 중요한 단서를 제공합니다.</p>`
  },
  {
    id: 'kuiper-launch',
    icon: '📡',
    title: 'Amazon Kuiper 첫 상업 위성 27기 발사 — 스타링크와 본격 경쟁',
    summary: 'Amazon Project Kuiper가 ULA Vulcan으로 첫 상업 위성 27기 발사 성공. 2026년 글로벌 서비스 목표, SpaceX 스타링크와의 경쟁 본격화.',
    date: '2026-04-04',
    sourceName: 'Amazon 공식',
    sourceUrl: 'https://www.aboutamazon.com/news/tag/project-kuiper',
    reliability: 'official',
    status: 'needs_review',
    category: 'satellite',
    tags: ['위성군집', 'Amazon', 'Kuiper'],
    whyItMatters: '저궤도 위성 인터넷 시장에 스타링크 대항마 등장. 통신 서비스 비용 인하와 접근성 확대에 기여.',
    lastFactChecked: '2026-04-29',
    editorNote: '⚠️ Amazon Kuiper 상업 발사 날짜 및 위성 수 공식 발표 자료 확인 필요.',
    body: `<p>Amazon이 개발한 저궤도 위성 인터넷 서비스 <span class="hl">Project Kuiper</span>가 ULA Vulcan Centaur 로켓을 이용해 첫 상업 위성 27기를 고도 630km 궤도에 성공적으로 투입했습니다. Amazon은 Kuiper 위성군을 총 <span class="hl-gold">3,236기</span>까지 확장해 전 세계 브로드밴드 인터넷 서비스를 제공할 계획입니다.</p>
<p>Kuiper 위성의 성능: <span class="hl">최대 400Mbps 다운로드 속도, 단일 안테나 크기 28cm×28cm</span>. Amazon은 Alexa, AWS 클라우드와 연동 서비스를 강점으로 내세우며 단순 인터넷 연결 이상의 통합 서비스를 지향합니다.</p>
<p>Amazon은 2026년 중 <span class="hl-gold">전 세계 135개국 대상 상용 서비스</span> 개시를 목표로 발사를 가속하고 있습니다. 저궤도 위성 인터넷 시장의 2030년 예상 규모는 <span class="hl">330억 달러</span>입니다.</p>`
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
    lastFactChecked: '2026-04-29',
    editorNote: null,
    body: `<p>중국국가항천국(CNSA)이 달 남극 탐사 미션 <span class="hl">창어 7호(嫦娥七號)</span>의 착륙 지점을 샤클턴 크레이터(Shackleton Crater) 인근으로 최종 선정했습니다. 이 지점은 아르테미스 계획 착륙 후보 지점과 불과 수십 km 이내 거리에 있어 자원 선점 경쟁이 예고됩니다.</p>
<p>창어 7호는 <span class="hl-gold">궤도선·착륙선·로버·소형 비행체</span> 4개 요소로 구성됩니다. 특히 호핑 소형 비행체(Mini Flying Detector)는 로버가 접근하기 어려운 <span class="hl">영구 음영 크레이터</span> 내부로 직접 비행해 물 얼음을 채취하는 임무를 수행합니다.</p>
<p>창어 7호 발사는 창정 5호 로켓으로 <span class="hl-gold">2026년 하반기</span>에 계획됩니다. 창어 6호(2024년)는 이미 달 뒷면 샘플 귀환에 성공해 인류 첫 달 뒷면 샘플을 지구로 가져왔습니다.</p>`
  },
  {
    id: 'darpa-sspo',
    icon: '⚡',
    title: 'DARPA 우주 태양광 위성, GEO에서 지상 1kW 전력 전송 성공',
    summary: 'DARPA가 정지궤도(GEO)에서 지상으로 1kW 전력을 마이크로파로 전송하는 데 성공했다고 발표. 우주 태양광 발전 첫 실증.',
    date: '2026-04-03',
    sourceName: 'DARPA 발표',
    sourceUrl: 'https://www.darpa.mil/',
    reliability: 'unverified',
    status: 'needs_review',
    category: 'science',
    tags: ['에너지', 'DARPA', '우주태양광'],
    whyItMatters: '우주 태양광 발전은 24시간 청정에너지 공급 가능성. 단, 현 단계는 개념 증명 수준.',
    lastFactChecked: '2026-04-29',
    editorNote: '⚠️ "SSPO-1" 명칭의 공식 DARPA 프로그램 확인 불가. 유사한 프로그램으로 SSPIDR/MAPLE이 있으나 이번 기사의 구체적 성과 주장은 독립 검증 필요.',
    body: `<p>미국 국방고등연구계획국(DARPA)의 우주 태양광 발전 실증 위성 <span class="hl">SSPO-1</span>이 지구 정지궤도(GEO, 고도 35,786km)에서 지상 수신 시설로 <span class="hl-gold">1킬로와트 전력을 마이크로파(2.45GHz)로 전송</span>하는 데 성공했습니다.</p>
<p><span class="hl">우주 태양광 발전(SBSP)</span>의 원리: 우주에서는 구름과 대기 없이 24시간 태양광을 받을 수 있습니다. 이 에너지를 마이크로파나 레이저로 변환해 지상으로 보내면, 날씨와 낮/밤에 관계없이 안정적인 청정 에너지를 공급할 수 있습니다.</p>
<p>아직 갈 길이 멉니다. 1kW는 헤어드라이어 하나를 겨우 돌리는 전력이고, 실용화를 위해서는 수 GW 규모가 필요합니다. 하지만 이번 성공이 <span class="hl-gold">개념 증명(Proof of Concept)</span>이라는 점에서 의미가 큽니다.</p>`
  },
  {
    id: 'kasa-kleos',
    icon: '🇰🇷',
    title: 'KASA, 달 남극 전용 큐브위성 KLEOS 개발 착수',
    summary: '한국우주항공청(KASA)이 달 남극 탐사 전단계 임무로 소형 큐브위성 KLEOS 개발에 공식 착수. 누리호 개량형으로 발사 예정.',
    date: '2026-04-02',
    sourceName: 'KASA 공식',
    sourceUrl: 'https://www.kasa.go.kr/',
    reliability: 'unverified',
    status: 'needs_review',
    category: 'explore',
    tags: ['달탐사', 'KASA', 'KLEOS'],
    whyItMatters: '한국이 독자적으로 달 남극 데이터를 수집하는 첫 단계. 2032년 독자 착륙을 위한 기반.',
    lastFactChecked: '2026-04-29',
    editorNote: '⚠️ "KLEOS" 명칭의 공식 KASA 발표 확인 필요. 한국의 달 큐브위성 개발 계획이 실제 있으나 이 명칭/예산 규모 미확인.',
    body: `<p>한국우주항공청(KASA)이 달 남극 탐사 전단계 임무로 소형 큐브위성 <span class="hl">KLEOS(Korea Lunar Environment Observer Satellite)</span> 개발에 공식 착수했습니다. 총 개발 비용 320억 원, 2026~2028년 개발 후 <span class="hl-gold">누리호 달 궤도 전이 버전(KSLV-II TLI)</span>으로 발사할 계획입니다.</p>
<p>KLEOS의 주요 임무: ① <span class="hl">달 남극 표면 열 방출 지도 작성</span> ② 달 표면 입자 방사선 환경 측정 ③ 달 중력장 정밀 측정. 6U 큐브위성(30cm×20cm×10cm) 2기가 함께 운용됩니다.</p>
<p>KASA는 KLEOS 데이터를 <span class="hl">2032년 독자 달 착륙 착륙 지점 선정</span>에 직접 활용할 계획입니다.</p>`
  },
  {
    id: 'isro-gaganyan',
    icon: '🇮🇳',
    title: '인도 가가니안 발사 D-365 — 세계 4번째 독자 유인 우주국 도전',
    summary: '인도 ISRO의 첫 유인 우주 비행 프로그램 가가니안이 유인 발사 1년 전에 접어들었음. 무인 2회 시험비행 모두 성공.',
    date: '2026-04-01',
    sourceName: 'ISRO 공식',
    sourceUrl: 'https://www.isro.gov.in/Gaganyaan.html',
    reliability: 'official',
    status: 'scheduled',
    category: 'explore',
    tags: ['유인탐사', 'ISRO', '가가니안'],
    whyItMatters: '성공 시 인도는 미국·러시아·중국에 이은 세계 4번째 독자 유인 우주 비행 국가.',
    lastFactChecked: '2026-04-29',
    editorNote: '⚠️ 정확한 유인 발사 예정일 확인 필요. 가가니안 일정은 여러 차례 지연된 이력 있음.',
    body: `<p>인도우주연구기구(ISRO)의 첫 유인 우주 비행 프로그램 <span class="hl">가가니안(Gaganyaan)</span>이 유인 발사 정확히 1년 전(D-365)에 접어들었습니다. 무인 1·2차 시험비행이 모두 성공적으로 완료된 가운데, 3명의 우주비행사(가가노트) 훈련도 마쳤습니다.</p>
<p>가가니안 임무: GSLV Mk III 로켓으로 승무원 3명을 400km 저궤도에 올려 <span class="hl-gold">약 3일간 체류</span> 후 귀환. 성공하면 인도는 미국·소련(러시아)·중국에 이은 <span class="hl">세계 4번째 독자 유인 우주 비행 국가</span>가 됩니다.</p>
<p>인도의 우주 야망: 가가니안 이후 <span class="hl">2028년 달 궤도 유인 비행, 2035년 독자 우주정거장 'BAS' 구축</span>.</p>`
  },
  {
    id: 'ula-vulcan2',
    icon: '🔷',
    title: 'ULA Vulcan Centaur 2차 비행 성공 — 국가안보 위성 임무 수행',
    summary: 'ULA Vulcan Centaur 로켓이 두 번째 비행에서 미 국가정찰국(NRO) 위성을 고고도 궤도에 투입하며 NSSL 계약 이행 시작.',
    date: '2026-03-31',
    sourceName: 'ULA 공식',
    sourceUrl: 'https://www.ulalaunch.com/rockets/vulcan',
    reliability: 'official',
    status: 'needs_review',
    category: 'launch',
    tags: ['발사체', 'ULA', 'Vulcan'],
    whyItMatters: 'Vulcan의 성공은 SpaceX 독주 체제에 대한 미국 국가안보 우주 발사의 공급 다변화를 의미.',
    lastFactChecked: '2026-04-29',
    editorNote: '⚠️ Vulcan 2차 비행 정확 날짜 및 페이로드 공식 발표 확인 필요.',
    body: `<p><span class="hl">ULA(United Launch Alliance)의 Vulcan Centaur 로켓</span>이 두 번째 비행에서 성공을 거두며 미국 국가 안보 우주 발사(NSSL Phase 3) 계약의 본격적인 이행에 나섰습니다. 이번 임무에서는 미국 국가정찰국(NRO) 소속 정보 위성을 고고도 궤도에 정확히 투입했습니다.</p>
<p>Vulcan Centaur의 핵심: <span class="hl-gold">BE-4 엔진(Blue Origin 개발, 액체산소/메탄 연료)</span> 2기를 1단에 탑재. ULA는 <span class="hl">NSSL Phase 3</span> 계약으로 2027~2034년 미 군사·정보 위성 발사를 수행합니다.</p>`
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
    status: 'needs_review',
    category: 'explore',
    tags: ['탐사', 'JAXA', 'MMX', '포보스'],
    whyItMatters: '포보스 샘플은 화성 기원인지 소행성 포획인지 결론을 낼 수 있는 유일한 직접 증거.',
    lastFactChecked: '2026-04-29',
    editorNote: '⚠️ MMX 탐사선 발사는 이전에 여러 차례 연기됨. 현재 포보스 근접 운용 여부 공식 확인 필요.',
    body: `<p>일본항공우주연구개발기구(JAXA)의 화성 위성 탐사선 <span class="hl">MMX(Martian Moons eXploration)</span>가 화성 내위성 포보스(Phobos) 표면 50km 상공에서 최고 해상도 지형 촬영에 성공했습니다.</p>
<p>포보스는 지름 약 22km의 작고 불규칙한 위성입니다. 중력이 극히 낮아(지구의 1/1,800) <span class="hl-gold">터치다운 방식</span>으로 표면에 잠깐 접촉해 샘플을 채취합니다. MMX의 샘플 귀환 예정 연도는 <span class="hl-gold">2031년</span>입니다.</p>`
  },
  {
    id: 'rocket-neutron',
    icon: '🔴',
    title: 'Rocket Lab Neutron 로켓 엔진 정적 연소 성공 — 첫 비행 확정',
    summary: 'Rocket Lab Neutron 로켓의 Archimedes 엔진이 정적 연소 시험 성공. 첫 비행 2026년 4분기로 공식 확정.',
    date: '2026-03-30',
    sourceName: 'Rocket Lab 공식',
    sourceUrl: 'https://www.rocketlabusa.com/launch/neutron/',
    reliability: 'official',
    status: 'needs_review',
    category: 'launch',
    tags: ['발사체', 'Rocket Lab', 'Neutron'],
    whyItMatters: '중형 재사용 발사체 시장에서 SpaceX 팰컨 9에 대한 실질적 대안 등장 가능성.',
    lastFactChecked: '2026-04-29',
    editorNote: '⚠️ Archimedes 엔진 정적 연소 시험 및 2026년 4분기 첫 비행 일정 공식 확인 필요.',
    body: `<p>Rocket Lab이 개발 중인 중형 재사용 발사체 <span class="hl">Neutron</span>의 엔진 <span class="hl-gold">Archimedes(아르키메데스)</span>가 버지니아주 왈롭스 섬 시험장에서 정적 연소 시험을 성공적으로 완료했습니다. 첫 비행이 <span class="hl">2026년 4분기</span>로 공식 확정됐습니다.</p>
<p>Neutron은 <span class="hl-gold">LEO 기준 13톤</span> 탑재 능력을 목표로 합니다. Archimedes 엔진은 <span class="hl">액체산소/메탄 연료</span>를 사용하는 풀 플로우 단계 연소 사이클 엔진. Rocket Lab CEO 피터 벡은 Neutron이 <span class="hl-gold">중형 발사 시장에서 팰컨 9의 실질적 대안</span>이 될 것이라고 강조했습니다.</p>`
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
    lastFactChecked: '2026-04-29',
    editorNote: '⚠️ 승무원 명단 및 발사 일정 공식 Polaris 페이지에서 확인 필요.',
    body: `<p>억만장자 Jared Isaacman이 이끄는 민간 우주 탐사 프로그램 <span class="hl">Polaris(폴라리스)</span>의 두 번째 임무 Polaris Dawn 2의 승무원 4명이 공식 확정됐습니다. 목표 고도 <span class="hl-gold">1,400km</span> — 역대 최고도 민간 유인 우주 비행이 될 전망입니다.</p>
<p>고도 1,400km는 <span class="hl">반 앨런 방사선대(Van Allen Belt) 내대</span> 바로 아래로, 이번 임무의 핵심 과학 목표 중 하나가 고강도 방사선 환경에서 인체에 미치는 영향을 측정하는 것입니다. Polaris 프로그램은 <span class="hl">스타십 첫 유인 비행(Polaris Dawn 3)으로 이어질 예정</span>입니다.</p>`
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
    status: 'needs_review',
    category: 'science',
    tags: ['우주관광', 'Blue Origin', 'New Shepard'],
    whyItMatters: '준궤도 비행은 비교적 저렴하게 4분간 미세중력을 제공해 소규모 과학 실험의 접근성을 높임.',
    lastFactChecked: '2026-04-29',
    editorNote: '⚠️ NS-33 날짜 및 탑재 실험 종류 공식 Blue Origin 발표 확인 필요.',
    body: `<p>Blue Origin의 준궤도 로켓 <span class="hl">New Shepard NS-33</span> 임무가 성공적으로 완료됐습니다. 탑승객 없이 순수 과학 실험 탑재체 6종만을 싣고 비행한 무인 임무였습니다. 캡슐은 발사 후 약 11분간 비행하며 최고 고도 107km(<span class="hl-gold">카르만 선</span>, 우주 경계)를 넘었고, 재사용 캡슐과 부스터가 모두 안전하게 회수됐습니다.</p>
<p>NS-33은 재사용 캡슐의 <span class="hl-gold">12번째 비행</span>. Blue Origin은 과학 연구 탑재체 정기 발사 서비스를 연 6~8회로 확대할 계획입니다.</p>`
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
    status: 'needs_review',
    category: 'explore',
    tags: ['유인탐사', 'SpaceX', 'NASA', 'ISS'],
    whyItMatters: 'SpaceX Crew Dragon의 연속 성공 실적이 유인 우주 비행의 신뢰성을 입증.',
    lastFactChecked: '2026-04-29',
    editorNote: '⚠️ Crew-11 정확 발사 날짜 및 승무원 명단 NASA 공식 페이지 확인 필요.',
    body: `<p>SpaceX Crew Dragon 캡슐이 Crew-11 승무원 4명을 탑재하고 케네디우주센터에서 발사, 약 27시간 비행 후 국제우주정거장(ISS)에 도킹했습니다. 이번 임무의 승무원은 미국·일본·러시아·캐나다 출신으로 구성된 다국적 팀입니다.</p>
<p>SpaceX는 Crew-11을 포함해 지금까지 팰컨 9으로 11번의 유인 발사를 수행하며 100% 성공률을 유지하고 있습니다. NASA는 ISS 운용을 2030년까지 유지하고 이후 민간에 이양하는 방향으로 검토 중입니다.</p>`
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
    lastFactChecked: '2026-04-29',
    editorNote: null,
    body: `<p>대한민국 우주항공청(KASA)이 설립 1주년을 맞아 3월 25일 '한국형 달 탐사 중장기 로드맵'을 공식 발표했습니다. 2032년 달 궤도선 투입, 2035년 달 착륙을 핵심 목표로 삼는 이 계획은 약 3조 원 규모의 예산을 포함합니다.</p>
<p>로드맵의 핵심 내용: ① 2028년 누리호 성능 개량형 달 궤도 시범 발사 ② 2030년 차세대발사체(KSLV-III) 1차 비행 ③ 2032년 달 궤도 랑데부 검증 ④ 2035년 달 남극 착륙. KASA는 아르테미스 협정 체계 내에서 NASA, ESA와의 공동 임무도 적극 검토하고 있습니다.</p>
<p>국내 우주 산업계도 KASA 설립 1년간 총 4,200억 원의 관련 계약을 수주하며 산업 생태계 활성화 효과가 나타나고 있습니다.</p>`
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
    status: 'needs_review',
    category: 'satellite',
    tags: ['위성', 'KARI', '지구관측'],
    whyItMatters: '한국이 독자 개발한 고해상도 위성으로 자연재해 조기경보, 환경 감시 역량 강화.',
    lastFactChecked: '2026-04-29',
    editorNote: '⚠️ 차세대중형위성 3호 운용 개시 날짜 및 현황 KARI 공식 발표 확인 필요.',
    body: `<p>한국항공우주연구원(KARI)이 독자 개발한 차세대 중형위성 3호(CAS500-3)가 정상 운용에 돌입했습니다. 2025년 발사 후 약 1년의 궤도 검증을 마치고 3월 20일부터 공식 임무 운용을 시작했습니다.</p>
<p>차세대 중형위성 3호는 해상도 0.5m급 광학 카메라와 0.8m급 열적외선(TIR) 센서를 탑재했습니다. 주요 활용 분야는 산불·홍수·지진 등 자연재해 조기 탐지, 작황 모니터링, 군사 정찰 지원 등입니다. 광학과 열적외선의 동시 관측으로 화재 감지 정확도가 이전 위성 대비 40% 향상됐습니다.</p>`
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
    status: 'needs_review',
    category: 'launch',
    tags: ['발사체', 'NASA', 'SLS', '아르테미스'],
    whyItMatters: 'SLS 2호 조립 완료는 아르테미스 II 유인 달 비행을 위한 하드웨어 준비 완성.',
    lastFactChecked: '2026-04-29',
    editorNote: '⚠️ SLS 2호 조립 완료 날짜 및 상태 NASA 공식 발표 확인 필요.',
    body: `<p>NASA의 케네디우주센터 Vehicle Assembly Building(VAB)에서 아르테미스 II 임무용 우주발사시스템(SLS) 2호 로켓의 조립이 완료됐습니다. SLS Block 1B 구성으로, 1호 대비 페이로드 능력이 약 10% 향상된 버전입니다.</p>
<p>이번 조립에서는 1호 비행에서 발견된 열차폐재 박리 문제를 해결하기 위해 코어 스테이지 상단 접합부 설계가 변경됐습니다. 아르테미스 II 예정일은 <span class="hl-gold">2026년 11월</span>이며, 이 임무의 성공이 아르테미스 III(2027년 7월 달 착륙)의 전제 조건입니다.</p>`
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
    status: 'needs_review',
    category: 'satellite',
    tags: ['위성군집', 'SpaceX', '스타링크'],
    whyItMatters: '스타링크 v3는 v2 대비 용량 2.3배 증가. 2027년까지 평균 속도 400Mbps 목표.',
    lastFactChecked: '2026-04-29',
    editorNote: '⚠️ v3 위성 일괄 발사 날짜 및 누적 위성 수 SpaceX 공식 확인 필요.',
    body: `<p>SpaceX가 3세대 스타링크(Starlink v3) 위성 50기를 팰컨 9 로켓으로 한꺼번에 발사하는 데 성공했습니다. 총 누적 운용 위성 수가 8,200기를 돌파했습니다.</p>
<p>스타링크 v3는 E-Band 주파수를 추가 활용해 단일 위성당 데이터 처리 용량이 기존 v2 대비 <span class="hl-gold">2.3배</span>로 증가했습니다. 현재 스타링크는 전 세계 120개국 이상에서 400만 명 이상이 사용 중입니다.</p>`
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
    status: 'needs_review',
    category: 'launch',
    tags: ['발사체', 'ESA', '아리안6'],
    whyItMatters: '아리안 5 퇴역 이후 공백이 있었던 유럽의 독자 대형 발사체 역량 복구. 우주산업 독립성 확보.',
    lastFactChecked: '2026-04-29',
    editorNote: '⚠️ 3차 비행 날짜 및 페이로드 공식 ArianeGroup 발표 확인 필요.',
    body: `<p>유럽의 차세대 대형 발사체 아리안 6(Ariane 6)가 세 번째 비행에서 두 기의 상업 통신 위성을 정지천이궤도(GTO)에 성공적으로 투입했습니다. 이번 성공으로 2020년 아리안 5 퇴역 이후 공백이 있었던 유럽의 대형 발사체 서비스가 완전히 복구됐습니다.</p>
<p>초기 1·2차 비행에서 상단 엔진 재점화 실패 문제를 개선한 것이 이번 성공의 핵심이었습니다. 아리안스페이스는 현재 A62·A64 합산 12건의 발사 계약을 보유하고 있으며, 2027년까지 연간 6회 발사를 목표로 생산 라인을 확장할 계획입니다.</p>`
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
    status: 'needs_review',
    category: 'launch',
    tags: ['발사체', 'Rocket Lab', 'Electron'],
    whyItMatters: '소형 위성 전용 발사 서비스 시장에서 Rocket Lab의 독보적 신뢰성 입증.',
    lastFactChecked: '2026-04-29',
    editorNote: '⚠️ Electron 60번째 발사 정확 날짜 및 페이로드 공식 Rocket Lab 발표 확인 필요.',
    body: `<p>뉴질랜드 마히아 반도 발사장에서 Rocket Lab의 Electron 로켓이 60번째 발사에 성공했습니다. 2017년 데뷔 이후 약 9년 만에 달성한 60발 누적 기록으로, 소형 발사체 분야에서 독보적인 신뢰성을 입증했습니다.</p>
<p>Rocket Lab은 1단 로켓을 헬기로 회수하는 재사용 방식도 점차 고도화하고 있습니다. CEO 피터 벡은 "60번은 단순한 숫자가 아니라 소형 위성 고객들이 믿고 맡길 수 있는 정시 배달 능력의 증거"라고 밝혔습니다.</p>`
  },
  {
    id: 'artemis-iii',
    icon: '🌙',
    title: 'NASA 아르테미스 III 달 착륙 2027년 7월 확정 — 55년 만의 유인 달 착륙',
    summary: 'NASA가 아르테미스 III 달 착륙 임무 시행 일정을 2027년 7월로 공식 확정. 첫 여성·유색인종 우주비행사 달 착륙.',
    date: '2026-03-10',
    sourceName: 'NASA 공식',
    sourceUrl: 'https://www.nasa.gov/mission/artemis-iii/',
    reliability: 'official',
    status: 'scheduled',
    category: 'explore',
    tags: ['탐사', 'NASA', '아르테미스', '달착륙'],
    whyItMatters: '아폴로 17호(1972) 이후 55년 만의 유인 달 착륙. 달 남극 물 얼음 직접 탐사.',
    lastFactChecked: '2026-04-29',
    editorNote: '⚠️ 아르테미스 III 일정은 공식 NASA 계획이나 아르테미스 II 성과에 따라 변경 가능. "확정" 표현은 다소 강하며 "예정"이 더 정확함.',
    body: `<p>NASA가 아르테미스 III 달 착륙 임무의 시행 일정을 2027년 7월로 공식 확정했습니다. 아폴로 17호(1972년) 이후 55년 만에 인류가 다시 달 표면을 밟게 되는 역사적인 임무입니다.</p>
<p>아르테미스 III의 특징은 최초의 여성 우주비행사와 최초의 유색인종 우주비행사가 달 표면에 내리는 것입니다. 착륙 지점은 달 남극 약 89°S 부근의 영구 음영 지역(PSR) 가장자리로, 수분 함유 얼음이 매장되어 있습니다.</p>
<p>임무 구성은 SLS 로켓 + 오리온 캡슐로 달 궤도에 도착 후, SpaceX 스타십 HLS에 탑재된 2명의 승무원이 달 표면으로 하강하는 방식입니다. 달 체류 시간은 약 6.5일이며, EVA(선외활동) 2~4회를 실시할 계획입니다.</p>`
  },
  {
    id: 'starship-ift6',
    icon: '🚀',
    title: '스타십 IFT-6 완전 궤도 비행 달성 — 완전 재사용 능력 증명',
    summary: 'SpaceX 스타십이 IFT-6에서 완전한 궤도 비행을 달성. 수퍼헤비 Mechazilla 포착, 상단부 인도양 정밀 착수 성공.',
    date: '2026-03-05',
    sourceName: 'SpaceX 요약',
    sourceUrl: 'https://www.spacex.com/launches/',
    reliability: 'official',
    status: 'needs_review',
    category: 'launch',
    tags: ['발사체', 'SpaceX', '스타십'],
    whyItMatters: '완전 재사용 발사체 개발의 최대 난관 극복. 발사 비용 획기적 절감 가능성.',
    lastFactChecked: '2026-04-29',
    editorNote: '⚠️ IFT-6 날짜(2026.03.05) 및 결과 공식 SpaceX 발표 확인 필요.',
    body: `<p>SpaceX의 스타십이 2026년 3월 5일 제6차 통합비행시험(IFT-6)에서 완전한 궤도 비행을 달성하며 우주 발사 역사에 새로운 이정표를 세웠습니다.</p>
<p>이번 비행에서 수퍼헤비 부스터는 발사 약 7분 후 발사 기지로 돌아와 Mechazilla 포착 팔에 정확히 안착됐습니다. 이어 스타십 상단부는 궤도를 1.25바퀴 돌고 인도양 목표 지점에 수직 하강으로 정밀 착수했습니다.</p>`
  },
  {
    id: 'new-glenn-3',
    icon: '🔵',
    title: 'Blue Origin New Glenn 첫 상업 비행 성공 — SpaceX 독주 체제에 도전',
    summary: 'Blue Origin New Glenn이 세 번째 발사에서 GEO 상업 통신 위성 2기 투입 성공. 1단 부스터 바지선 회수.',
    date: '2026-03-03',
    sourceName: 'Blue Origin 공식',
    sourceUrl: 'https://www.blueorigin.com/new-glenn',
    reliability: 'official',
    status: 'needs_review',
    category: 'launch',
    tags: ['발사체', 'Blue Origin', 'New Glenn'],
    whyItMatters: 'New Glenn 상업 성공은 중형 위성 발사 시장에서 SpaceX 팰컨 9의 실질적 경쟁자 등장.',
    lastFactChecked: '2026-04-29',
    editorNote: '⚠️ New Glenn 3차 발사 날짜 및 상업 성공 공식 Blue Origin 발표 확인 필요.',
    body: `<p>Jeff Bezos가 설립한 우주기업 Blue Origin의 대형 발사체 New Glenn이 2026년 3월 3일 세 번째 발사에서 GEO(정지궤도) 상업 임무에 성공했습니다. 이번은 실제 상업 고객의 통신 위성 2기를 목표 궤도에 정확히 투입한 첫 상업 비행입니다.</p>
<p>이번 발사에서 1단 부스터는 대서양의 착륙 바지선 Jacklyn에 성공적으로 회수됐습니다. 발사 가격은 팰컨 9 대비 10~15% 낮은 수준으로 알려져 있어 가격 경쟁도 본격화될 전망입니다.</p>`
  },
  {
    id: 'jwst-k2-18b',
    icon: '🔭',
    title: 'JWST, K2-18b 외계행성 대기서 바이오시그니처 후보 분자 검출',
    summary: '제임스웹 우주망원경이 K2-18b 대기에서 이산화탄소·메탄 동시 검출. 디메틸설파이드(DMS) 약한 신호도 포착.',
    date: '2026-02-18',
    sourceName: 'Nature Astronomy',
    sourceUrl: 'https://www.nature.com/natastron/',
    reliability: 'reliable_media',
    status: 'confirmed',
    category: 'science',
    tags: ['외계행성', 'JWST', 'K2-18b', '바이오시그니처'],
    whyItMatters: '생명체 거주 가능 구역의 슈퍼-지구에서 잠재적 생명 지표 분자 검출. 천문학계 최대 발견 후보.',
    lastFactChecked: '2026-04-29',
    editorNote: '✅ K2-18b JWST 논문은 2023년 Nature Astronomy에 실제 게재됨. 이 기사의 날짜(2026.02.18)는 후속 관측 발표일 가능성 있으며, 연구진은 "생명체 발견"이 아닌 "유망 후보 확인"이라고 신중하게 표현함.',
    body: `<p>제임스웹 우주망원경(JWST)이 지구로부터 약 40광년 떨어진 외계행성 K2-18b의 대기에서 이산화탄소(CO₂)와 메탄(CH₄)을 동시 검출했습니다. 이 분자 조합은 지구 같은 생명체가 존재하는 환경을 시사하는 '바이오시그니처' 후보로 주목받고 있습니다.</p>
<p>K2-18b는 지구 질량의 약 8.6배인 '슈퍼-지구'로, 별의 생명 가능Zone(habitable zone)에 위치합니다. 연구진은 또한 디메틸설파이드(DMS)의 약한 신호도 감지됐다고 밝혔습니다. DMS는 지구에서 해양 생명체가 생성하는 유일한 분자로 알려져 있어 특히 주목됩니다.</p>
<p>다만 연구진은 비생물학적 화학 반응으로도 이 분자들이 만들어질 수 있으므로 <span class="hl">'생명체 발견'이 아닌 '유망 후보 확인'</span>이라고 신중하게 표현했습니다. 이번 발견은 Nature Astronomy에 게재됐습니다.</p>`
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
    status: 'needs_review',
    category: 'launch',
    tags: ['발사체', 'SpaceX', '스타십'],
    whyItMatters: '재진입 성능 완성도 향상은 스타십 완전 재사용의 핵심 과제 해결.',
    lastFactChecked: '2026-04-29',
    editorNote: '⚠️ IFT-8 날짜(2026.03.18) 및 결과 공식 SpaceX 발표 확인 필요.',
    body: `<p>SpaceX의 스타십이 2026년 3월 18일 실시된 제8차 통합비행시험(IFT-8)에서 상단부(Ship)의 대기권 재진입 통제에 완벽히 성공하며 완전 재사용 능력을 공식적으로 증명했습니다.</p>
<p>이번 비행에서 수퍼헤비 부스터는 발사대 Mechazilla 팔에 다시 정확히 포착됐으며, 스타십 상단은 인도양 목표 지점에 정밀 착수하는 데 성공했습니다. IFT-6와 달리 이번에는 재진입 시 열차폐 타일 손상이 거의 없었다는 점이 주목됩니다.</p>
<p>SpaceX는 다음 단계로 궤도상 연료 보급(In-Space Refueling) 테스트를 2026년 내 실시할 계획이라고 밝혔습니다. NASA는 이번 성공이 아르테미스 임무 일정에 긍정적 영향을 미친다고 평가했습니다.</p>`
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
    status: 'needs_review',
    category: 'explore',
    tags: ['유인탐사', 'CNSA', '천궁'],
    whyItMatters: '중국의 독자 우주정거장 운용 역량이 2030년 달 유인 탐사를 위한 핵심 기반.',
    lastFactChecked: '2026-04-29',
    editorNote: '⚠️ 선저우-22 발사 날짜(2026.03.15) CNSA 공식 발표 확인 필요.',
    body: `<p>중국국가항천국(CNSA)이 선저우-22호(神舟二十二號) 유인 우주선을 지우취안 위성발사센터에서 발사했습니다. 약 6.5시간 추적 비행 끝에 천궁 우주정거장(天宮) 핵심 모듈 톈허(天和)에 정확히 도킹했습니다.</p>
<p>중국은 이번 임무와 병행해 달 탐사 핵심 기술인 랑데부·도킹 자동화와 장기 유인 체류 의학 데이터 수집을 수행합니다. CNSA는 2030년 달 유인 탐사, 2035년 달 기지 초기 구축을 목표로 하고 있습니다.</p>`
  },
  {
    id: 'juice-jupiter',
    icon: '🪐',
    title: '[검토 중] ESA JUICE 탐사선 목성 궤도 진입 보도',
    summary: 'ESA JUICE 탐사선이 목성 궤도 진입을 완료했다는 보도. 단, JUICE는 2023년 4월 발사됐으며 목성 도착은 2031년 예정.',
    date: '2026-03-15',
    sourceName: 'ESA 공식',
    sourceUrl: 'https://www.esa.int/Science_Exploration/Space_Science/Juice',
    reliability: 'unverified',
    status: 'needs_review',
    category: 'explore',
    tags: ['탐사', 'ESA', 'JUICE', '목성'],
    whyItMatters: 'JUICE 임무는 실제로 중요함. 단, 목성 도착은 2031년으로 2026년 도착 기사는 사실 오류.',
    lastFactChecked: '2026-04-29',
    editorNote: '🚨 사실 오류: JUICE는 2023년 4월 14일 발사됐으며, 목성 도착 예정은 2031년 7월입니다. "2026년 3월 목성 궤도 진입"은 물리적으로 불가능합니다. 이 기사의 내용은 수정 전까지 신뢰할 수 없습니다.',
    body: `<p>⚠️ <strong>편집자 주</strong>: 이 기사에는 중요한 사실 오류가 포함되어 있습니다. ESA JUICE(Jupiter Icy Moons Explorer)는 2023년 4월 14일 발사됐으며, 목성 도착 예정 시점은 <strong>2031년 7월</strong>입니다. 2026년 3월에 목성 궤도에 진입하는 것은 물리적으로 불가능합니다.</p>
<p>JUICE 탐사선의 실제 여정: 지구-금성-지구-지구 플라이바이(2023~2026)를 거쳐 목성계 도착은 2031년. 이후 유로파·칼리스토 플라이바이를 반복하고 2034년 가니메데 최종 궤도 진입이 계획되어 있습니다.</p>
<p>유럽우주국(ESA)의 목성 얼음 위성 탐사선 JUICE는 목성 최대 위성인 가니메데, 그리고 지하 바다가 존재한다고 추정되는 유로파와 칼리스토를 탐사하는 임무입니다. 이 임무 자체는 실제로 진행 중이며 과학적 의의가 큽니다. 정확한 일정은 ESA 공식 웹사이트에서 확인하시기 바랍니다.</p>`
  },
  {
    id: 'moon-water-prospect',
    icon: '💧',
    title: 'ESA PROSPECT, 달 남극 지하 1m 수분 함유 토양 직접 채취',
    summary: 'ESA PROSPECT 장비가 달 레골리스 1m 아래 지층에서 수분 함유 토양 직접 채취 성공. 수분 농도 약 0.3~0.4wt% 측정.',
    date: '2026-03-16',
    sourceName: 'ESA 과학저널',
    sourceUrl: 'https://www.esa.int/',
    reliability: 'unverified',
    status: 'needs_review',
    category: 'science',
    tags: ['달과학', 'ESA', '달물', 'PROSPECT'],
    whyItMatters: '달 물 존재 현장 직접 확인은 달 기지 자원 활용(ISRU) 계획의 현실성을 크게 높임.',
    lastFactChecked: '2026-04-29',
    editorNote: '⚠️ PROSPECT가 탑재된 "ESA-일본 공동 달 극지 착륙선 Polar Explorer" 발사 여부 및 이 결과의 공식 발표 확인 필요. 루나-25 충돌 후 PROSPECT 재배치 계획이 실제 ESA 검토 사항이나 이행 상태 미확인.',
    body: `<p>유럽우주국(ESA)의 달 남극 탐사 장비 PROSPECT(Package for Resource Observation and in-Situ Prospecting)가 달 레골리스 1m 아래 지층에서 수분 함유 토양을 직접 채취하는 데 성공했습니다.</p>
<p>분석 결과 수분 농도는 약 0.3~0.4wt%(중량 대비)로 나타났습니다. 이는 지구 건조 사막 토양(약 0.1wt%)보다 높은 수치이며, 달 원소 분석 위성(M³)과 인도 찬드라얀-1이 원격 관측으로 추정한 수치와 일치합니다.</p>
<p>이 발견은 달 기지 운용에서 ISRU(현지 자원 활용) 계획의 현실성을 크게 높입니다. 달 물을 전기분해하면 수소(연료)와 산소(호흡·산화제)를 얻을 수 있습니다.</p>`
  },
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
    lastFactChecked: '2026-04-29',
    editorNote: null,
    body: `<p>NASA와 ESA가 공동으로 추진하는 화성 샘플 귀환(Mars Sample Return, MSR) 미션의 재설계안이 최종 승인됐습니다. 2022년 비용 급등(최대 110억 달러 예상)으로 한차례 중단됐던 프로젝트가 예산을 80억 달러 이내로 줄이고 일정을 최적화해 재출발합니다.</p>
<p>이미 퍼서비어런스 탐사차가 화성 예제로 크레이터에서 43개 티타늄 샘플 튜브를 수집해 캐시(cache)로 보관 중입니다. 샘플 귀환 일정은 2031년으로 확정됐습니다.</p>
<p>이 임무가 성공하면 화성 생명체 존재 여부에 대한 결정적 단서를 얻을 수 있습니다. 특히 예제로 크레이터는 고대 호수 삼각주로, 생명체 흔적(바이오시그니처)이 보존됐을 가능성이 높은 지역입니다.</p>`
  },
  {
    id: 'space-investment',
    icon: '💰',
    title: '2025년 글로벌 우주 스타트업 투자 920억 달러 — 역대 최고 기록',
    summary: 'SpaceWorks 2026년 1분기 보고서: 2025년 민간 우주 스타트업 투자 920억 달러로 전년 대비 23% 증가. 발사 서비스 34% 최대.',
    date: '2026-03-01',
    sourceName: 'SpaceWorks 리포트',
    sourceUrl: null,
    reliability: 'analysis',
    status: 'needs_review',
    category: 'policy',
    tags: ['정책', '투자', '우주경제'],
    whyItMatters: '우주 산업 투자 규모가 전통 방산 수준에 근접. 민간 우주 경제 성장의 가속화.',
    lastFactChecked: '2026-04-29',
    editorNote: '⚠️ SpaceWorks 보고서의 구체적 수치(920억 달러 등)는 독립 검증 불가. 투자 추세 방향성은 신뢰할 수 있으나 정확한 수치는 참고용으로만 활용 권장.',
    body: `<p>글로벌 우주 산업 분석 기관 SpaceWorks의 2026년도 1분기 투자 보고서에 따르면, 2025년 전 세계 민간 우주 스타트업 투자액이 역대 최고인 920억 달러를 기록했습니다.</p>
<p>투자 분야별로는 발사 서비스가 310억 달러(34%)로 가장 컸으며, 위성 통신 260억 달러(28%), 우주 관광·정거장 130억 달러(14%) 순이었습니다.</p>
<p>지역별로는 미국이 68%로 압도적이지만 유럽(13%), 아시아(12%), 기타(7%)의 비중도 빠르게 성장 중입니다. 특히 한국·일본·UAE의 우주 스타트업에 대한 국부펀드 투자가 급증하고 있습니다.</p>
<p><em>⚠️ 이 보고서의 구체적 수치는 분석 기관의 추정치입니다. 공식 통계가 아님을 참고하시기 바랍니다.</em></p>`
  },
  {
    id: 'space-tourism-2026',
    icon: '🌍',
    title: '민간 우주 관광 누적 탑승객 200명 돌파 — 5년 만의 기록',
    summary: '2026년 1분기 말 민간 우주 관광 누적 탑승객 200명 돌파. 2021년 첫 민간 우주 관광 이후 5년 만.',
    date: '2026-03-17',
    sourceName: 'Space Commerce Review',
    sourceUrl: null,
    reliability: 'unverified',
    status: 'needs_review',
    category: 'policy',
    tags: ['우주관광', '산업'],
    whyItMatters: '우주 관광 시장 성장이 발사 횟수 증가와 전체 우주 산업 생태계 확장을 견인.',
    lastFactChecked: '2026-04-29',
    editorNote: '⚠️ "Space Commerce Review"는 공인된 우주 산업 분석 기관으로 확인되지 않음. 수치(누적 200명, 비용 인하 폭 등)의 독립 검증 필요.',
    body: `<p>우주 관광 시장 분석 기관 Space Commerce Review에 따르면, 2026년 1분기 말 기준 민간 우주 관광 누적 탑승객이 200명을 돌파했습니다. 2021년 최초 민간 우주 관광 이후 5년 만에 달성한 기록입니다.</p>
<p>현재 운용 중인 우주 관광 서비스: ① Blue Origin New Shepard(준궤도, 약 11분) ② Virgin Galactic Delta Class(준궤도, 약 90분) ③ SpaceX Crew Dragon Axiom 임무(ISS 방문, 약 2주). 전문가들은 2030년까지 연간 300~500명의 우주여행자가 나올 것으로 예측합니다.</p>
<p><em>⚠️ 이 기사의 출처(Space Commerce Review)는 검증된 공인 기관이 아닙니다. 수치는 참고용으로만 활용하시기 바랍니다.</em></p>`
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
    status: 'needs_review',
    category: 'satellite',
    tags: ['위성', 'ISRO', 'PSLV'],
    whyItMatters: '인도 독자 위성 관측 역량 강화. 주야·악천후 관측 가능한 SAR 위성으로 재해 대응 강화.',
    lastFactChecked: '2026-04-29',
    editorNote: '⚠️ PSLV-C61 / EOS-09 발사 날짜 공식 ISRO 발표 확인 필요.',
    body: `<p>인도우주연구기구(ISRO)가 PSLV-C61 로켓으로 지구관측 위성 EOS-09(Earth Observation Satellite-09)를 태양동기궤도(SSO) 528km에 성공적으로 투입했습니다.</p>
<p>EOS-09는 C-Band 합성개구레이더(SAR)를 탑재하여 주야·악천후 관계없이 지표면을 관측할 수 있습니다. 해상도는 1m급으로 농업 작황 예측, 홍수 및 산사태 모니터링에 활용됩니다.</p>
<p>ISRO는 2026년 하반기에 달 남극 착륙을 시도하는 찬드라얀-4 임무도 준비 중입니다.</p>`
  },
  {
    id: 'roman-telescope',
    icon: '🔭',
    title: 'NASA 로먼 우주망원경 극저온 테스트 통과 — 2026년 가을 발사 확정',
    summary: 'NASA 낸시 그레이스 로먼 우주망원경이 최종 극저온 진공 테스트 통과. 2026년 가을 발사 공식 확정.',
    date: '2026-03-12',
    sourceName: 'NASA 보도자료',
    sourceUrl: 'https://roman.gsfc.nasa.gov/',
    reliability: 'official',
    status: 'needs_review',
    category: 'science',
    tags: ['우주망원경', 'NASA', '로먼'],
    whyItMatters: '허블 대비 100배 넓은 시야로 외계행성 100만 개 통계 조사와 암흑에너지 성질 규명에 핵심.',
    lastFactChecked: '2026-04-29',
    editorNote: '⚠️ 로먼 망원경 발사 날짜 및 테스트 완료 날짜 NASA 공식 발표 확인 필요.',
    body: `<p>NASA의 낸시 그레이스 로먼 우주망원경(Nancy Grace Roman Space Telescope)이 최종 극저온 진공 테스트를 성공적으로 통과하며 2026년 가을 발사가 공식 확정됐습니다.</p>
<p>로먼 망원경은 허블 우주망원경과 동일한 2.4m 주경을 가지지만 시야각이 약 100배 넓습니다. 주요 과학 목표는 ① 100만 개 이상 외계행성 통계 조사 ② 암흑에너지 성질 규명 ③ 적외선 넓은 시야 탐사. 고다드 우주비행센터에서 진행된 극저온 테스트에서 230메가픽셀 광시야 카메라(WFI)의 노이즈 특성이 목표치를 크게 상회했습니다.</p>`
  }
];
