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

  // ── 2026-05-xx ───────────────────────────────────────────────────
  {
    id: 'nasa-clps-increase',
    icon: '🌕',
    title: 'NASA, CLPS 달 착륙선 계약 한도 42억 달러로 상향 추진',
    summary: 'NASA가 민간 달 착륙선 계약(CLPS) 상한을 기존 26억 달러에서 42억 달러로 증액하는 조달 계획을 공개했다. 2027~2028년 연간 10회 가까운 착륙을 목표로 하는 달기지(Moon Base) 계획을 지원하기 위한 조치다.',
    date: '2026-05-01',
    sourceName: 'SpaceNews',
    sourceUrl: 'https://spacenews.com/nasa-to-increase-value-of-clps-contract-to-support-surge-of-lunar-lander-missions/',
    reliability: 'reliable_media',
    status: 'developing',
    category: 'explore',
    tags: ['nasa', 'clps', 'moon', 'lunar-lander', 'commercial', 'lunar-base'],
    whyItMatters: '달 착륙선 상업 시장의 계약 규모가 62% 확대될 전망. 달기지 계획 실현 가능성과 민간 우주기업의 달 착륙 산업화 속도를 가늠하는 지표다.',
    lastFactChecked: '2026-05-04',
    editorNote: '증액은 4월 27일 SAM.gov 조달 공고 기반. 의회 승인·예산 집행까지는 추가 절차가 필요하며, 실제 임무 발주 수와 타이밍은 유동적이다.',
    sources: [
      { name: 'SpaceNews — NASA to increase value of CLPS contract', url: 'https://spacenews.com/nasa-to-increase-value-of-clps-contract-to-support-surge-of-lunar-lander-missions/', type: 'reliable_media', usedFor: '계약 상한 변경 금액·배경·업계 반응 확인' },
      { name: 'NASA CLPS 프로그램 공식 페이지', url: 'https://www.nasa.gov/commercial-lunar-payload-services/', type: 'official', usedFor: 'CLPS 프로그램 개요·참여 기업 목록 배경 정보' }
    ],
    body: `<p>NASA는 <span class="hl-warn">2026년 4월 27일</span> SAM.gov 조달 공고를 통해 상업 달 화물 착륙 서비스 계약인 <span class="hl">CLPS(Commercial Lunar Payload Services)</span>의 최대 계약 금액을 <span class="hl-warn">26억 달러에서 42억 달러</span>로 늘릴 계획을 공개했다. 이는 NASA가 3월 발표한 달기지(Moon Base) 계획에 따라 2027년 9회, 2028년 10회 달 착륙이라는 목표를 지원하기 위한 조치다. 계획 자체는 발표됐으나, 실제 증액 집행까지는 의회 승인 및 추가 절차가 필요하다.</p>
<p><span class="hl">CLPS</span>는 NASA가 달 표면에 과학 장비와 기술 시험품을 보내기 위해 민간 착륙선 기업들을 활용하는 계약 체계다. 2018년 출범 이후 현재까지 <span class="hl-warn">13개</span> 기업이 CLPS 적격 공급자로 등록돼 있다. NASA가 탑재물과 목적지를 지정하면 기업들이 경쟁 제안을 통해 개별 임무를 수주하는 방식이다. 착륙선 자체를 NASA가 개발하는 대신 민간에 맡겨 비용을 줄이고 다양성을 확보하는 것이 핵심 개념이다.</p>
<p>CLPS는 출범 이후 느린 속도로 비판을 받기도 했다. <span class="hl-warn">2025년</span>에는 파이어플라이 에어로스페이스와 인튜이티브 머신스가 각각 1회씩 착륙해 총 2회 임무가 이뤄졌다. <span class="hl-warn">2026년</span>에는 아스트로보틱·블루 오리진·파이어플라이·인튜이티브 머신스 등 최대 4개사의 임무가 계획돼 있다. 블루 오리진의 첫 <span class="hl">Blue Moon Mark 1</span> 착륙선 '엔듀런스'는 존슨 우주센터에서 열진공 시험을 마치고 플로리다 공장으로 복귀해 후속 준비 중이며, 파이어플라이는 <span class="hl">Blue Ghost 2·3·4</span>를 동시 생산 중이다.</p>
<p>이번 계약 증액이 중요한 이유는 NASA의 달기지 계획이 상업 착륙선 없이는 실현 불가능하기 때문이다. 인간이 달 표면에 장기 거주하려면 수분·산소·연료를 달에서 직접 조달(ISRU)해야 하고, 그 전 단계로 달 남극 수빙 탐사와 대형 장비 사전 배치가 필요하다. 이 모든 것이 다수의 착륙선 임무를 전제로 한다. NASA 조달 공고에서는 "달기지를 향한 높은 착륙 빈도에 맞춰 지금 당장 수요를 늘려야 한다"고 명시했다.</p>
<p>그러나 산업계에서는 목표 달성 가능성에 대한 회의도 나온다. 착륙선 제작과 공급망 구축에는 시간이 걸리며, 2027년 9회 착륙 목표는 현재 성능의 수배에 해당한다. 파이어플라이·블루 오리진·아스트로보틱·인튜이티브 머신스 등 기업들은 증설 의지를 밝히면서도 구체적인 물량 약속을 제시하지는 않았다. 앞으로 지켜볼 핵심 변수는 실제 임무 발주 건수, 발사 일정 준수율, 그리고 CLPS 2.0 후속 계약의 윤곽이다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'darpa-lasso',
    icon: '🛰️',
    title: 'DARPA, 달 수빙 탐사 초저궤도 위성 LASSO 연구 3사 선정',
    summary: 'DARPA가 달 수빙을 탐색하는 초저궤도 소형 위성 프로그램 LASSO의 Phase 1 연구기관으로 Benchmark Space Systems·Quantum Space·Revolution Space를 선정했다.',
    date: '2026-05-01',
    sourceName: 'SpaceNews',
    sourceUrl: 'https://spacenews.com/darpa-selects-three-companies-for-lunar-orbiter-studies/',
    reliability: 'reliable_media',
    status: 'confirmed',
    category: 'explore',
    tags: ['darpa', 'moon', 'lunar-orbiter', 'water-ice', 'cislunar', 'commercial'],
    whyItMatters: '달 수빙은 달 탐사 기지에서 물·산소·로켓 연료로 활용 가능한 핵심 자원이다. DARPA의 참여는 달 공간이 민간·과학을 넘어 국가안보 전략 영역으로 확장되고 있음을 보여준다.',
    lastFactChecked: '2026-05-04',
    editorNote: '계약 금액은 미공개. Revolution Space의 설계 접근법도 현재 공개되지 않았다. 4월 30일 DARPA 대변인이 3사 선정을 SpaceNews에 확인했다.',
    sources: [
      { name: 'SpaceNews — DARPA selects three companies for lunar orbiter studies', url: 'https://spacenews.com/darpa-selects-three-companies-for-lunar-orbiter-studies/', type: 'reliable_media', usedFor: '3사 선정·LASSO 프로그램 구조·각사 설계 접근법 확인' },
      { name: 'NASA CLPS 배경 정보', url: 'https://www.nasa.gov/commercial-lunar-payload-services/', type: 'background', usedFor: '달 수빙·ISRU와 상업 달 탐사 연관성 배경' }
    ],
    body: `<p>미국 방위고등연구계획국(DARPA)은 <span class="hl-warn">2026년 4월 30일</span> <span class="hl">LASSO(Lunar Assay via Small Satellite Orbiter)</span> 프로그램 Phase 1 연구기관으로 <span class="hl">Benchmark Space Systems, Quantum Space, Revolution Space</span> 3개사를 선정했다고 밝혔다. LASSO는 달 초저궤도(very low lunar orbit)에서 수빙 농도 5% 이상 지점을 탐색하는 소형 위성 임무를 개발하는 프로그램이다. 계약 금액은 공개되지 않았다.</p>
<p><span class="hl">달 초저궤도 유지</span>는 일반 위성 운용보다 훨씬 어렵다. 달에는 대기가 거의 없어 마찰 감속을 이용할 수 없고, 달의 중력장은 불균일해(질량 집중체, mascon) 궤도가 자연스럽게 무너지기 쉽다. 10~30km 고도의 초저궤도를 수십 시간 이상 유지하려면 정밀한 자율 기동이 필수다. LASSO는 이 기술을 시연하는 동시에 수빙 데이터를 수집하는 이중 목적을 갖는다.</p>
<p>달 수빙 탐사는 2000년대 이후 여러 임무에서 간접 증거가 축적됐다. <span class="hl-warn">2009년</span> NASA의 <span class="hl">LCROSS</span> 탐사선이 달 남극 카비우스 분화구 충돌에서 물 분자를 직접 검출했고, <span class="hl">인도 찬드라얀-1</span>의 탑재 레이더도 영구 음영 지역의 수빙 흔적을 포착했다. 그러나 분포 밀도와 접근 가능 여부는 여전히 불확실하며, LASSO 수준의 초저궤도 정밀 관측은 이 데이터 공백을 채울 수 있다.</p>
<p>DARPA가 달 영역에 관심을 갖는 배경에는 <span class="hl">시스루나(cislunar) 공간</span>의 전략적 가치 증대가 있다. 달과 지구 사이의 공간은 향후 군사 위성·통신 자산·우주 기지 등의 무대가 될 수 있으며, 이 공간에서 작전을 수행하려면 달 초저궤도 지속 기동 능력이 필수다. LASSO는 달 자원 탐사라는 과학적 목적과 시스루나 기동 기술 시연이라는 국방 목적을 결합한 프로그램이다.</p>
<p>앞으로 3사는 각각 <span class="hl-warn">6개월</span> Phase 1A 개념 설계를 진행하고, 이후 <span class="hl-warn">18개월</span> Phase 1B에서 핵심 설계 검토(CDR)까지 진행한다. Phase 2에서는 실제 위성 제작과 발사가 이루어질 예정이다. Benchmark는 화학+전기 복합 추진 방식의 'Sapphire' 아키텍처, Quantum Space는 하이브리드 추진체 탑재 'Ranger' 기반 설계를 제안했으며, Revolution Space는 아직 설계를 공개하지 않았다. 어느 기업이 Phase 2 비행 계약까지 이어질지는 설계 심사 결과에 달려 있다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'amazon-leo-300',
    icon: '📡',
    title: '아마존 레오 위성 302기 배치 완료 — FCC 기한까지 1,300기 이상 남아',
    summary: '아마존이 아틀라스 5(4월 27일)·아리안 64(4월 30일) 2회 발사로 총 302기의 레오(Project Kuiper) 위성을 배치했다. 전체 목표(3,232기)의 약 9%이며, 7월 30일 FCC 절반 배치 기한을 맞추기 어려울 것으로 예상된다.',
    date: '2026-05-01',
    sourceName: 'SpaceNews',
    sourceUrl: 'https://spacenews.com/amazon-leo-passes-300-satellites-with-atlas-and-ariane-launches/',
    reliability: 'reliable_media',
    status: 'confirmed',
    category: 'satellite',
    tags: ['amazon', 'kuiper', 'leo', 'satellite', 'ariane6', 'atlas5', 'broadband'],
    whyItMatters: '아마존 레오는 스타링크에 맞서는 최대 규모의 저궤도 위성 인터넷 경쟁 사업이다. 발사 속도·FCC 규제·공급망 위기가 향후 서비스 출시 일정을 결정한다.',
    lastFactChecked: '2026-05-04',
    editorNote: 'FCC 기한 면제/연장 신청은 1월 제출됐으나 결과 미발표. Vulcan과 New Glenn 운항 중단으로 당분간 아틀라스 5와 아리안 6에 의존해야 하는 상황이다.',
    sources: [
      { name: 'SpaceNews — Amazon Leo passes 300 satellites', url: 'https://spacenews.com/amazon-leo-passes-300-satellites-with-atlas-and-ariane-launches/', type: 'reliable_media', usedFor: '302기 배치 확인·발사 날짜·FCC 현황·공급망 이슈' },
      { name: 'SpaceNews — Amazon buys 10 more Falcon 9 launches', url: 'https://spacenews.com/amazon-buys-10-more-falcon-9-launches/', type: 'background', usedFor: 'FCC 연장 신청 배경·팔콘 9 추가 계약 내용' }
    ],
    body: `<p>아마존의 저궤도 위성 인터넷 사업 <span class="hl">아마존 레오(Amazon Leo, 구 Project Kuiper)</span>가 이번 주 2회 연속 발사로 배치 위성을 <span class="hl-good">302기</span>로 늘렸다. <span class="hl-warn">4월 27일</span> ULA 아틀라스 5로 29기(LA-06 임무), <span class="hl-warn">4월 30일</span> 아리안스페이스 아리안 64로 32기(VA 268/LE-02 임무)를 각각 465km 파킹 궤도에 배치했다. 전체 목표 <span class="hl-warn">3,232기</span>의 약 9%에 해당한다.</p>
<p><span class="hl">저궤도(LEO) 위성 인터넷</span>은 수백~수천 기의 소형 위성을 고도 500~1,200km에 촘촘히 배치해 지구 전역에 고속 인터넷을 제공하는 방식이다. 지상 케이블이나 정지궤도 위성보다 지연 시간(latency)이 짧고, 외딴 지역과 해상에서도 사용할 수 있다는 장점이 있다. 아마존 레오는 스페이스X <span class="hl">스타링크(Starlink)</span>에 이어 두 번째 대규모 LEO 브로드밴드 메가 컨스텔레이션이다.</p>
<p>아마존은 <span class="hl-warn">2022년</span> ULA 벌컨 <span class="hl-warn">38기</span>, 블루 오리진 뉴 글렌 <span class="hl-warn">24기</span>(+옵션 15기 포함), 아리안스페이스 아리안 6 등 다양한 발사체를 확보했다. 최근 팔콘 9 10기도 추가 계약했다. 그러나 현재 공급망에 심각한 차질이 생겼다. 벌컨은 <span class="hl-warn">2월 발사</span> 때 고체 로켓 부스터 파편 사고로 운항이 중단된 상태이고, 뉴 글렌은 <span class="hl-warn">4월 19일</span> 3차 비행에서 상단 엔진 고장으로 AST SpaceMobile 위성을 저궤도에 손실했다. 당분간 발사 주력은 아틀라스 5와 아리안 6로 제한된다.</p>
<p>FCC 규정상 아마존은 <span class="hl-warn">2026년 7월 30일</span>까지 전체 3,232기의 절반인 <span class="hl-warn">1,616기</span>를 배치해야 하는 의무가 있다. 현재 302기 배치 상황에서 이 기한을 맞추는 것은 사실상 불가능하다. 아마존은 올해 1월 FCC에 2년 기한 연장 또는 면제를 신청했으나 아직 결과가 나오지 않았다. 전체 배치 기한인 <span class="hl-warn">2029년 7월</span>은 연장 요청 없이 유지된다.</p>
<p>아마존은 <span class="hl-warn">2026년 말</span> 베타 서비스를 시작하겠다는 목표를 계속 유지하고 있다. 다음 발사는 아틀라스 5로 <span class="hl-warn">5월 22일</span> 예정이며, 이후 아리안 6 업그레이드 모터(P160C)를 탑재한 첫 발사에서는 위성 탑재 수량이 늘어날 예정이다. 스타링크가 이미 7,000기 이상의 위성을 운용하며 수백만 명의 가입자를 확보한 상황에서, 아마존 레오가 경쟁력 있는 서비스를 제때 출시할 수 있을지는 발사 빈도 회복 속도에 달려 있다.</p>
<p>LEO 위성 인터넷 경쟁은 단순한 기술 경쟁을 넘어 <span class="hl">궤도·주파수 자원 선점 게임</span>이기도 하다. FCC와 ITU 규정에서는 특정 주파수대역과 궤도 슬롯을 먼저 사용하는 사업자에게 우선권이 주어지는 구조여서, 발사 속도가 느릴수록 경쟁자에게 불리해진다. 아마존 레오의 이번 300기 돌파는 가시적인 이정표이지만, 실질적인 서비스 경쟁력은 아직 시험대 위에 있다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'iss-prk-cracking',
    icon: '🛸',
    title: 'ISS 즈베즈다 모듈 PrK 균열 — 누기는 멈췄지만 원인 규명은 미완',
    summary: '국제우주정거장(ISS)의 러시아 구역 즈베즈다 서비스 모듈 전실(前室) PrK에서 진행 중인 균열 문제가 최신 점검에서도 근본 원인이 규명되지 않았다. 최근 밀봉제 적용으로 누기는 일단 멈췄으나, NASA와 로스코스모스는 균열의 심각성 평가에서 여전히 이견을 보이고 있다.',
    date: '2026-04-29',
    sourceName: 'SpaceNews',
    sourceUrl: 'https://spacenews.com/iss-module-cracking-still-unresolved-despite-stopping-air-leaks/',
    reliability: 'reliable_media',
    status: 'developing',
    category: 'satellite',
    tags: ['iss', 'nasa', 'roscosmos', 'zvezda', 'safety', 'low-earth-orbit'],
    whyItMatters: 'ISS 구조 건전성 문제는 2030년대 퇴역 혹은 수명 연장 결정과 직결된다. 양 기관의 균열 원인 평가 불일치는 전체 스테이션 안전 관리에서 중요한 변수다.',
    lastFactChecked: '2026-05-04',
    editorNote: '4월 29일 ISS 자문위원회 발표 내용 기반. NASA와 로스코스모스의 공식 입장 차이는 신중하게 사실 중심으로 서술했음. 미래 퇴역 결정 시점은 현재 논의 중이다.',
    sources: [
      { name: 'SpaceNews — ISS module cracking still unresolved', url: 'https://spacenews.com/iss-module-cracking-still-unresolved-despite-stopping-air-leaks/', type: 'reliable_media', usedFor: '자문위원회 발표 내용·균열 원인 후보·양 기관 이견 내용 확인' },
      { name: 'NASA ISS 공식 페이지', url: 'https://www.nasa.gov/international-space-station/', type: 'background', usedFor: 'ISS 구조·즈베즈다 모듈 역할 배경 정보' }
    ],
    body: `<p><span class="hl-warn">2026년 4월 29일</span> 열린 <span class="hl">ISS 자문위원회(ISSAC)</span> 회의에서 위원장 밥 카바나는 <span class="hl">즈베즈다(Zvezda) 서비스 모듈</span>의 전실(前室) <span class="hl">PrK</span> 균열 문제가 여전히 해결되지 않았다고 밝혔다. NASA와 로스코스모스 기술팀이 올해 3월 합동 위원회에서 논의를 진행했지만 단일한 근본 원인에 합의하지 못했다. 밀봉제를 균열 부위에 적용한 이후 현재 누기(air leak)는 없는 상태이지만, 균열 자체가 해결됐다는 의미는 아니다.</p>
<p><span class="hl">국제우주정거장(ISS)</span>은 1998년부터 조립이 시작된 인류 최대의 유인 우주 시설이다. <span class="hl">즈베즈다</span>는 러시아가 제공한 핵심 모듈로, ISS의 초기 거주 공간, 추진 장치, 도킹 포트 역할을 담당한다. <span class="hl">PrK</span>는 즈베즈다 모듈과 도킹 포트를 연결하는 전실로, 프로그레스 화물선 같은 러시아 방문 차량이 정박할 때 이 구역을 통해 접근한다. 비좁고 하중이 집중되는 구조여서 균열이 발생하면 기압 유지에 직접 영향을 준다.</p>
<p>PrK 균열 문제는 수년 전부터 소규모 누기로 확인됐다. 러시아 우주비행사들이 밀봉제를 적용하며 관리해왔으나 근본 원인은 두 가지 가설이 경쟁 중이다. 하나는 펌프 진동에 의한 <span class="hl">고주기 피로(high-cycle fatigue)</span>, 다른 하나는 <span class="hl">환경 보조 균열(environmental-assisted cracking)</span>이다. NASA와 로스코스모스 기술팀은 두 가설에 대한 분석을 계속하고 있지만, 두 기관의 심각성 평가가 일치하지 않는 문제가 장기화되고 있다. NASA는 PrK 가압 시간을 최소화하는 보수적 접근을 요청하고 있으나, <span class="hl-warn">2025년 8월</span> 체결된 저압 유지 의정서가 항상 준수되는 것은 아니라고 밝혔다.</p>
<p>이 문제가 주목받는 이유는 ISS 수명과 직결되기 때문이다. ISS의 다자간 통제위원회는 퇴역 또는 수명 연장 결정을 <span class="hl-warn">2026년 말</span>까지 내리기를 요청하고 있다. 미국은 공식적으로 <span class="hl-warn">2030년 퇴역</span>을 계획하고 있지만, 미 상원 법안에서는 <span class="hl-warn">2032년까지</span> NASA 운용 수권을 연장하는 방안도 검토 중이다. 또 이번 회의에서는 보잉 스타라이너의 복귀 일정 불확실성이 승무원 교대와 훈련 계획에 차질을 주고 있다는 점도 논의됐다.</p>
<p>앞으로 주목할 점은 다음 합동 위원회에서 NASA와 로스코스모스가 균열 원인에 합의할 수 있을지 여부다. 합의가 이뤄지지 않으면 PrK 운용 방식을 둘러싼 이견이 계속될 것이다. 미국의 ISS 퇴역 결정은 러시아의 독자 우주정거장 건설 일정과도 연동돼 있어, 올해 말 양국 정책 결정이 향후 저궤도 유인 우주 운용 체계에 큰 영향을 미칠 것으로 보인다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'falcon9-lunar-impact',
    icon: '🌑',
    title: '팔콘 9 상단 스테이지, 2026년 8월 5일 달 충돌 예측',
    summary: '2025년 1월 Firefly Blue Ghost·ispace Resilience를 실어 나른 팔콘 9 상단(2025-010D)이 2026년 8월 5일 달 서쪽 아인슈타인 분화구 부근에 충돌할 것으로 예측됐다. 비의도적 달 충돌이 확인될 경우 2022년 사례 이후 두 번째다.',
    date: '2026-04-29',
    sourceName: 'SpaceNews',
    sourceUrl: 'https://spacenews.com/falcon-9-rocket-stage-projected-to-impact-moons-near-side-in-august/',
    reliability: 'reliable_media',
    status: 'developing',
    category: 'policy',
    tags: ['space-debris', 'falcon9', 'moon', 'spacex', 'lunar-impact'],
    whyItMatters: '비의도적 달 충돌은 달 표면 오염과 과학 관측 방해를 일으킬 수 있다. 달 주변 우주 환경 청결도와 잔해 추적 의무화 논의에 불을 지핀다.',
    lastFactChecked: '2026-05-04',
    editorNote: '충돌 예측은 Bill Gray(Project Pluto)가 1,053회 관측 데이터를 기반으로 계산한 값이다. 태양 복사압 등 소규모 힘의 영향으로 오차가 있을 수 있으며, 8월에 가까워질수록 예측 정밀도가 높아질 것이다.',
    sources: [
      { name: 'SpaceNews — Falcon 9 stage to impact moon', url: 'https://spacenews.com/falcon-9-rocket-stage-projected-to-impact-moons-near-side-in-august/', type: 'reliable_media', usedFor: '충돌 예측 일시·충돌 위치·스테이지 제원·추적 경위 확인' },
      { name: 'Project Pluto — Bill Gray 궤도 분석', url: 'https://www.projectpluto.com/25010d.htm', type: 'background', usedFor: '1,053회 관측 기반 궤도 계산 원본 데이터' }
    ],
    body: `<p>독립 궤도 분석가 빌 그레이(Project Pluto)는 <span class="hl-warn">2025년 1월 15일</span> 달 착륙선 Firefly Blue Ghost와 ispace Resilience를 동시에 실어 나른 팔콘 9의 상단 스테이지(국제 식별자: <span class="hl">2025-010D</span>)가 <span class="hl-warn">2026년 8월 5일 02:44 EDT(06:44 UTC)</span> 달 서쪽 가장자리 근면(近面)의 <span class="hl">아인슈타인 분화구</span> 부근에 충돌할 것으로 예측했다. 이 계산은 소행성 관측 네트워크와 망원경이 수집한 <span class="hl-warn">1,053회</span> 관측 데이터에 기반한다.</p>
<p>로켓 상단 스테이지는 위성을 궤도에 올려놓은 뒤 연료를 모두 소진해 독립적인 비행 능력을 잃은 금속 덩어리가 된다. 이 스테이지는 발사 이후 달과 지구를 여러 차례 근접 통과하며 고도로 비대칭적인 장타원 궤도를 돌고 있었고, 결국 달의 중력에 붙잡혀 충돌 경로로 진입하게 됐다. 길이 <span class="hl-warn">13.8m</span>, 무게 약 <span class="hl-warn">4,000kg</span>의 스테이지가 <span class="hl-warn">초속 2.43km(시속 약 8,700km)</span>로 충돌하면 일정 크기의 새 분화구가 형성될 것으로 보인다.</p>
<p>달에 인공 물체가 비의도적으로 충돌한 사례는 매우 드물다. 가장 최근의 비교 사례는 <span class="hl-warn">2022년</span> 중국의 창어-5T1(2014년 발사)에서 분리된 장정 3B 상단 스테이지가 달 뒷면에 충돌해 이중 분화구를 만든 것이다. 그 전에도 빌 그레이는 이 스테이지를 처음에는 스페이스X의 DSCOVR 발사 팔콘 9으로 오인 식별하는 오류를 범하기도 했다. 이번 2025-010D는 처음부터 추적이 이뤄진 만큼 데이터가 더 풍부하다.</p>
<p>비의도적 달 충돌이 문제가 되는 이유는 달이 단순한 빈 공간이 아니기 때문이다. NASA·ESA·중국·인도 등이 이미 달 남극 지역을 집중 탐사 대상으로 삼고 있으며, 아직 탐사되지 않은 지역의 오염은 과학 데이터를 오염시킬 수 있다. 또한 달에는 지구의 대기층 같은 자정(自淨) 기제가 없어 충돌 잔해가 수십만 년간 그대로 남는다. 의도치 않은 충돌이 반복되면 달 표면 자원 탐사와 유인 기지 설치 계획에 지장을 줄 수 있다는 우려도 제기된다.</p>
<p>이번 사례는 달 주변 우주 잔해 추적과 국제 규범 논의를 다시 수면 위로 끌어올렸다. UN 우주평화이용위원회(COPUOS)와 아르테미스 협정은 지속 가능한 탐사 원칙을 명시하고 있지만, 달 충돌 방지에 관한 구속력 있는 국제 규범은 아직 없다. 스위스 우주 상황 인식 기업 s2A systems는 스테이지의 회전(tumbling) 모습을 포착한 영상을 제공했으며, 8월에 가까워질수록 충돌 예측 좌표는 더 정확해질 예정이다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },
  {
    id: 'esa-smile-delay',
    icon: '☀️',
    title: 'ESA·중국과학원 SMILE 위성, Vega-C 부품 결함으로 발사 5월 19일로 연기',
    summary: '태양풍과 지구 자기권의 상호작용을 관측하는 ESA·CAS 공동 SMILE 위성이 Vega-C 발사체의 부품 생산라인 기술 결함으로 4월 9일 발사가 취소됐다. 새 발사일은 5월 19일로 재조정됐다.',
    date: '2026-04-24',
    sourceName: 'ESA',
    sourceUrl: 'https://www.esa.int/Science_Exploration/Space_Science/Smile/Smile_set_to_launch_on_19_May',
    reliability: 'official',
    status: 'scheduled',
    category: 'science',
    tags: ['esa', 'smile', 'vega-c', 'solar-wind', 'magnetosphere', 'space-weather', 'china'],
    whyItMatters: '태양풍이 지구 자기권을 어떻게 변형시키는지 최초로 X선 영상으로 촬영하는 임무. 우주 날씨 예보 정확도 향상과 지구 인프라 보호에 기여할 데이터를 제공한다.',
    lastFactChecked: '2026-05-04',
    editorNote: '5월 19일 발사는 ESA 4월 24일 발표 기준. 아직 실행되지 않은 예정 발사이므로 성공 여부는 불확실하다. ESA 공식 채널에서 최신 상태 확인 권장.',
    sources: [
      { name: 'ESA SMILE 발사 연기 안내 (4월 6일)', url: 'https://www.esa.int/Science_Exploration/Space_Science/Smile/T-20_days_Smile_to_launch_on_9_April', type: 'official', usedFor: '4월 6일 Vega-C 부품 결함 연기 사유 및 5월 19일 재조정 공지 확인' },
      { name: 'ESA SMILE 임무 개요', url: 'https://www.esa.int/Science_Exploration/Space_Science/Smile', type: 'official', usedFor: 'SMILE 임무 목표·탑재 장비·ESA-CAS 협력 구조 배경 정보' }
    ],
    body: `<p>ESA와 중국과학원(CAS)이 공동 개발한 태양물리 관측 위성 <span class="hl">SMILE(Solar wind Magnetosphere Ionosphere Link Explorer)</span>이 <span class="hl-warn">2026년 4월 6일</span> 발사 연기를 공식 발표했다. 연기 이유는 Vega-C 로켓(VV29 발사) 통합 과정에서 서브시스템 부품 생산라인의 기술 결함이 발견됐기 때문이다. 이후 <span class="hl-warn">4월 24일</span> ESA는 새 발사일을 <span class="hl-warn">2026년 5월 19일</span>로 재조정한다고 발표했다. 아직 발사가 이루어지지 않았으며 예정된 일정이다.</p>
<p><span class="hl">SMILE</span>은 지구 자기권이 태양풍에 반응하는 방식을 처음으로 연속 영상(X선·자외선)으로 촬영하는 임무다. 4개의 과학 장비 — 소프트 X선 이미저(SXI), 자외선 이미저(UVI), 이온 분석기, 자력계 — 를 통해 지구 자기권계면(magnetopause)과 오로라를 동시에 관측한다. 특히 SXI는 지구 자기권 경계를 X선으로 직접 촬영하는 최초의 기기다. 목표 궤도는 북극 위 <span class="hl-warn">121,000km</span>에서 남극 위 <span class="hl-warn">5,000km</span> 사이를 오가는 비대칭 타원 궤도로, 한 번 공전에 약 <span class="hl-warn">51시간</span>이 걸려 오로라를 최대 <span class="hl-warn">45시간 연속</span> 관측할 수 있다.</p>
<p>SMILE은 ESA의 <span class="hl">Cosmic Vision</span> 프로그램의 일환으로 2015년 선정됐다. ESA는 탑재체 모듈(SXI 포함)과 발사체를 제공하고, CAS는 위성 본체와 나머지 3개 장비를 제공한다. 임무 설계와 운용 책임은 ESA가 담당한다. 발사체 Vega-C는 유럽의 소형 발사체로, <span class="hl-warn">2022년 12월</span> Arianespace 위성 발사 실패 이후 수정·복구 과정을 거쳐 <span class="hl-warn">2024년</span> 비행 재개에 성공했다. 이번 연기는 비행 하드웨어 결함이 아닌 부품 생산 공정의 문제로, 기술 적용 후 5주 만에 새 날짜를 확정할 수 있었다.</p>
<p>SMILE의 관측 데이터는 우주 날씨 예보 정확도 향상에 기여할 것으로 기대된다. 강한 태양 폭풍은 지구 자기권을 압축·변형시켜 지상 전력망 교란, GPS 오류, 위성 수명 단축, 항공기 통신 두절 등을 일으킬 수 있다. 현재 우주 날씨 예보는 태양풍 측정 위성에서 실측된 데이터를 모델에 입력하는 방식인데, 자기권 자체의 반응 과정을 실시간 영상으로 촬영하면 모델의 정확도를 높일 수 있다. 특히 오로라와 자기권계면의 동시 관측 데이터는 기존에 없던 새로운 과학적 정보다.</p>
<p>5월 19일 발사 예정이 현재 계획이지만, 발사 전까지는 추가 점검과 일기·기술 조건이 충족돼야 한다. 성공적으로 발사될 경우 Vega-C의 4단이 약 <span class="hl-warn">57분</span> 후 SMILE을 저궤도에 투입하고, <span class="hl-warn">63분</span> 후 태양 전지판 전개가 확인되면 발사 성공으로 간주된다. 이후 수 개월의 궤도 전이를 거쳐 임무 궤도에 진입하면 과학 관측이 시작된다. ESA와 CAS의 공동 우주과학 임무가 Vega-C의 안정적 운용과 맞물려 어떤 결과를 낼지 주목된다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  },

  // ── 2026-04-xx ───────────────────────────────────────────────────
  {
    id: 'artemis2-launch',
    icon: '🌕',
    title: '아르테미스 II 임무 완료 — 4명 승무원, 달 비행 후 태평양 귀환',
    summary: 'NASA 아르테미스 II 유인 달 비행 임무가 2026년 4월 10일 태평양 착수로 완료됐다. 4명의 승무원은 약 10일간 비행하며 달 근접통과를 마쳤고, ESA 유럽 서비스 모듈이 핵심 추진 역할을 수행했다.',
    date: '2026-04-10',
    sourceName: 'NASA / ESA 공식',
    sourceUrl: 'https://www.esa.int/Newsroom/Press_Releases/Splashdown_for_Artemis_II',
    reliability: 'official',
    status: 'confirmed',
    category: 'explore',
    tags: ['유인탐사', 'NASA', 'ESA', '아르테미스', 'SLS', '오리온'],
    whyItMatters: '아폴로 17호(1972) 이후 처음으로 인간이 달 근처를 비행하고 무사 귀환한 임무. 오리온 캡슐과 ESA 유럽 서비스 모듈의 유인 비행 성능이 실제 환경에서 검증됐으며, 이후 유인 달 탐사 계획의 기술적 토대가 마련됐다.',
    lastFactChecked: '2026-05-04',
    editorNote: '발사 일시·귀환 일시·ESM 연소 세부 데이터는 ESA 공식 보도자료(N°18-2026, N°19-2026) 기반. NASA 공식 미션 페이지 및 임무 밀스톤 요약에서 교차 확인 권장.',
    sources: [
      { name: 'ESA 보도자료 — Splashdown for Artemis II', url: 'https://www.esa.int/Newsroom/Press_Releases/Splashdown_for_Artemis_II', type: 'official', usedFor: '귀환 시각·ESM 분리 연소 시각 확인' },
      { name: 'ESA 보도자료 — Europe powers Artemis II mission to the Moon', url: 'https://www.esa.int/Newsroom/Press_Releases/Europe_powers_Artemis_II_mission_to_the_Moon', type: 'official', usedFor: 'ESM 주엔진 350초 연소·궤도수정 취소 세부 내용' },
      { name: 'NASA Artemis II Mission Milestones', url: 'https://www.nasa.gov/centers-and-facilities/johnson/artemis-ii-mission-milestones-an-image-and-video-recap/', type: 'official', usedFor: '임무 전체 타임라인·승무원 활동 이미지 자료' }
    ],
    body: `<p><span class="hl">아르테미스 II</span> 임무가 <span class="hl-warn">2026년 4월 1일(미 동부시 기준)</span> 케네디우주센터에서 발사돼 <span class="hl-warn">4월 10일</span> 태평양에 착수하며 완료됐다. ESA의 공식 발표에 따르면 4명의 승무원은 약 10일간의 비행을 마치고 모두 무사히 귀환했다. 임무 기간 중 <span class="hl-warn">4월 6일</span>에는 달 근접통과가 이루어졌으며, ESA의 <span class="hl">유럽 서비스 모듈(ESM)</span> 주엔진이 <span class="hl-warn">350초</span> 동안 연소해 오리온을 달 방향으로 보내는 경로 설정을 담당했다. 연소 정밀도가 매우 높아 예정된 궤도 수정 기동 3회 중 2회가 불필요해졌다.</p>
<p><span class="hl">아르테미스 프로그램</span>은 SLS 로켓과 오리온 캡슐을 핵심으로 인류를 달로 돌려보내는 것이 목표다. ESA가 개발한 <span class="hl">유럽 서비스 모듈(ESM)</span>은 오리온의 주 추진력·전력·열 조절·생명유지 지원을 담당한다. 독일 브레멘의 에어버스가 제작하며 13개 ESA 회원국, 20개 주요 협력사, 100개 이상의 공급업체가 참여했다. 아르테미스 I(2022년 11월, 무인)이 발사체와 캡슐의 기본 성능을 검증했다면, 아르테미스 II는 처음으로 승무원을 태우고 달 근처를 비행하며 유인 운용 능력을 확인한 단계다.</p>
<p>4명의 승무원은 <span class="hl">리드 와이즈먼(지휘관, NASA), 빅터 글로버(조종사, NASA), 크리스티나 코크(NASA), 제레미 한센(CSA, 캐나다)</span>이다. 캐나다 우주비행사 제레미 한센의 참가는 아르테미스 협정을 통한 국제 협력을 상징한다. ESA는 ESTEC(네덜란드)·존슨 우주센터(미국)·유럽 우주비행사 센터(독일)에서 임무를 지원했다. 아르테미스 II는 아폴로 17호(1972년) 이후 <span class="hl-good">처음으로 인간이 달 근처를 비행하고 돌아온 임무</span>로서, 유인 심우주 비행 재개의 이정표가 됐다.</p>
<p>귀환 후 NASA와 ESA는 오리온 캡슐의 <span class="hl">열차폐재 재진입 성능, 생명유지장치 10일 연속 운용 데이터, 심우주 방사선 피폭 측정값</span>을 분석하고 있다. ESM은 오리온 분리 후 예정대로 대기권에서 소각됐다. 이번 임무에서 얻은 데이터는 오리온 시스템 개선과 이후 유인 임무의 안전 기준 수립에 활용될 예정이다.</p>
<p>아르테미스 II 완료 이후 국제 달 탐사 협정인 <span class="hl">아르테미스 협정</span> 서명국이 빠르게 늘어나는 흐름도 나타나고 있다. 이번 임무 이후 약 10일 만에 라트비아(4월 20일), 요르단(4월 23일), 모로코(4월 29일) 등 3개국이 새로 서명했으며, 2026년 들어서만 5개국이 합류해 전체 서명국이 <span class="hl-warn">64개국</span>으로 늘었다. 아르테미스 II의 가시적 성공이 국제 우주 협력 참여 확대에 영향을 미쳤다는 평가가 나온다.</p>
<p>다음 단계인 <span class="hl">아르테미스 III</span>는 2026년 2월 NASA가 임무 프로파일을 수정 발표한 바 있다. 현재 NASA는 아르테미스 III 관련 세부 계획을 구체화하는 단계이며, 공식 발표를 통해 최신 일정과 임무 구성을 확인할 것을 권장한다.</p>`,
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
    sources: [
      { name: 'ESA Space Debris', url: 'https://www.esa.int/Space_Safety/Space_Debris', type: 'official', usedFor: '잔해 현황·수치·케슬러 신드롬 정의 확인' },
      { name: 'ESA Space Safety', url: 'https://www.esa.int/Space_Safety', type: 'background', usedFor: 'ESA 정책 권고안·5년 재진입 의무화 배경' }
    ],
    body: `<p>유럽우주국(ESA)이 2026년 4월 최신 우주잔해 현황 보고서를 발표하며 저궤도(LEO) 우주잔해 밀도가 <span class="hl">케슬러 신드롬(Kessler Syndrome)</span> 임계치에 근접하고 있다고 공식 경고했습니다. ESA는 이 문제가 방치될 경우 특정 궤도 구간이 수십 년 내에 사실상 사용 불가능해질 수 있다고 지적합니다.</p>
<p><span class="hl">케슬러 신드롬</span>은 1978년 NASA 과학자 도널드 케슬러가 예측한 시나리오입니다. 궤도 파편 밀도가 임계점을 넘으면, 파편이 위성과 충돌해 더 많은 파편을 생성하고 이 파편이 또 다른 위성과 충돌하는 연쇄 반응이 멈추지 않게 됩니다. 현재 지구 궤도에는 <span class="hl-warn">10cm 이상 추적 가능 파편 40,000개 이상, 1cm 이상 추정 파편 100만 개 이상</span>이 분포하며, 1cm 파편도 충돌 시 위성을 치명적으로 손상시킬 수 있습니다.</p>
<p>우주잔해 문제는 오래전부터 예고됐습니다. <span class="hl-warn">2007년</span> 중국의 기상위성 FY-1C 요격 실험과 <span class="hl-warn">2009년</span> 이리듐 33–코스모스 2251 위성 충돌 사고가 파편 수를 크게 늘렸습니다. 최근에는 <span class="hl">스타링크·원웹 등 메가 컨스텔레이션</span>의 급속한 확장으로 저궤도 위성 수가 빠르게 증가하면서 충돌 위험도 높아지고 있습니다.</p>
<p>이 문제가 중요한 이유는 현대 디지털 인프라와 직결되기 때문입니다. GPS 위성, 기상 위성, 통신 위성은 모두 지구 궤도에 위치합니다. 연쇄 충돌이 현실화되면 <span class="hl-warn">항법·통신·기상 예보 등 일상 인프라 전반</span>이 영향을 받습니다. ESA는 특히 고도 550~1,200km 저궤도 구간이 가장 취약하다고 지목합니다.</p>
<p>ESA가 제안하는 핵심 대응책은 세 가지입니다: ① 임무 종료 후 <span class="hl-warn">5년 이내 대기권 재진입 의무화</span> ② 위성을 궤도에서 직접 끌어내리는 능동 잔해 제거(ADR) 기술 개발·표준화 ③ 충돌 위험 데이터의 국제 공유 의무화. 현재는 국가마다 규정이 달라 일관된 집행이 어렵습니다.</p>
<p>앞으로 주목할 점은 국제 규범 형성 속도입니다. UN 우주평화이용위원회(COPUOS) 차원의 논의가 진행 중이지만 구속력 있는 국제 조약은 아직 없습니다. <span class="hl">각국의 자발적 이행</span>에 기댈 수밖에 없는 현 구조에서, ESA의 이번 경고가 실질적인 정책 변화로 이어질지 지켜볼 필요가 있습니다.</p>`,
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
    sources: [
      { name: 'ESA Solar Orbiter', url: 'https://www.esa.int/Science_Exploration/Space_Science/Solar_Orbiter', type: 'official', usedFor: '임무 현황·최근접 통과 데이터 확인' },
      { name: 'NASA Solar Orbiter', url: 'https://www.nasa.gov/solar-orbiter/', type: 'official', usedFor: 'NASA 공동 운용·EUI 장비 사양 배경' }
    ],
    body: `<p>ESA와 NASA가 공동 운용하는 태양 탐사선 <span class="hl">Solar Orbiter</span>가 태양에서 불과 <span class="hl-warn">4,200만 km</span>(태양-지구 거리의 약 0.28배) 지점을 통과하며 사상 최고 해상도의 태양 코로나 영상을 지구로 전송했습니다. 이번 관측에서 코로나 가열 메커니즘의 실마리인 '캠프파이어(campfire)'라 불리는 미소 폭발 현상을 수만 개 기록했습니다.</p>
<p><span class="hl">Solar Orbiter</span>는 ESA가 주도하고 NASA가 참여한 태양 관측 우주선으로, <span class="hl-warn">2020년 2월</span> 발사됐습니다. 태양 주위를 타원 궤도로 돌며 최근접 시 태양-지구 거리(약 1억 5천만 km)의 <span class="hl-warn">4분의 1 이하</span>까지 접근합니다. 4개의 원격 감지 기기(EUI·PHI·SPICE·STIX 등)와 4개의 현장 측정 기기를 모두 탑재해 태양을 영상·분광·입자 등 다각도로 관측합니다.</p>
<p>태양 탐사 역사에서 Solar Orbiter의 독특한 점은 <span class="hl">태양 극지 관측</span>입니다. 지구는 태양 적도면에 거의 붙어 있어, 태양 극지는 기존 탐사선으로 관측하기 어려웠습니다. Solar Orbiter는 임무 후반으로 갈수록 궤도 기울기를 점차 높여 <span class="hl-warn">최대 33도</span> 기울기로 극지 상공을 관측할 예정입니다. NASA의 <span class="hl">Parker Solar Probe</span>가 태양에 훨씬 더 가까이 접근해 입자·자기장을 측정하는 반면, Solar Orbiter는 원격 고해상도 영상 관측에 강점을 두어 두 임무는 상호 보완 관계입니다.</p>
<p>태양 코로나 온도가 표면보다 수백 배 뜨거운 이유, 그리고 태양풍이 어떻게 형성·가속되는지는 수십 년 된 미해결 문제입니다. <span class="hl">우주 날씨(Space Weather)</span>는 태양 폭풍이 지구 자기권과 충돌할 때 전력망 교란, GPS 오류, 위성 궤도 감쇠, 항공기 통신 두절 등을 일으킬 수 있습니다. Solar Orbiter의 데이터가 태양풍 기원을 더 정확히 이해하게 되면, 수일 전 예보 정확도를 높여 <span class="hl-good">지구 인프라 보호에 직접 기여</span>할 수 있습니다.</p>
<p>앞으로 주목할 점은 Solar Orbiter가 점차 궤도 기울기를 높이며 태양 극지에 더 가까이 다가가는 관측 단계, 그리고 EUI·PHI 데이터의 논문 발표 시점입니다. 태양 극지 자기장 구조가 처음으로 고해상도로 포착되면 태양 활동 주기(약 11년) 예측 정확도에도 기여할 수 있습니다. Parker Solar Probe와의 동시 관측 데이터 결합이 어떤 새로운 그림을 만들어낼지도 태양 물리학계의 최대 관심사입니다.</p>`,
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
    sources: [
      { name: 'NASA JWST 미션', url: 'https://www.nasa.gov/missions/webb/', type: 'official', usedFor: 'JWST 55 Cancri e 관측 결과 기반 확인' },
      { name: 'STScI (Space Telescope Science Institute)', url: 'https://www.stsci.edu/', type: 'official', usedFor: 'JWST 관측 데이터 분석·용암 세계 유형 분류 배경' }
    ],
    body: `<p>제임스웹 우주망원경(<span class="hl">JWST</span>)이 지구에서 <span class="hl-warn">41광년</span> 떨어진 슈퍼-지구 <span class="hl">55 Cancri e</span>의 대기에서 이산화규소(SiO₂) 증기와 마그네슘 황화물(MgS) 구름 성분을 처음으로 직접 관측했다는 연구가 발표됐습니다. 55 Cancri e는 별에 극도로 가까이 붙어 표면 온도가 <span class="hl-warn">2,000°C 이상</span>인 '용암 세계(Lava World)'형 행성으로, 암석 행성 대기 직접 관측의 새로운 사례입니다.</p>
<p>JWST의 외계행성 대기 관측은 <span class="hl">트랜짓 분광법(Transit Spectroscopy)</span>을 기반으로 합니다. 행성이 별 앞을 지나갈 때, 별빛 일부가 행성 대기를 통과하면서 각 분자가 특정 파장 빛을 흡수합니다. 이 흡수 패턴을 분석하면 대기 성분을 알 수 있습니다. JWST의 <span class="hl">NIRSpec·MIRI 기기</span>는 허블·스피처 우주망원경보다 훨씬 넓은 적외선 파장 범위와 높은 감도를 제공해 이전에는 불가능했던 분자 신호 탐지가 가능해졌습니다.</p>
<p>허블 우주망원경 시대에는 수소·헬륨처럼 흡수 신호가 강한 기체만 일부 탐지할 수 있었고, 물(H₂O) 신호도 제한적으로 포착되는 수준이었습니다. <span class="hl-good">JWST는 CO₂·CH₄·SO₂·SiO₂ 같은 복잡한 분자를 중적외선 영역에서 구별하는 감도를 최초로 확보</span>했으며, 55 Cancri e는 그 능력을 처음으로 잘 보여준 암석 행성 사례 중 하나입니다.</p>
<p>이번 관측의 의의는 외계 암석 행성에 실제로 대기가 존재하며, 그 성분이 지구 대기와 전혀 다른 규산염 증기 기반일 수 있음을 직접 확인했다는 점입니다. 그러나 이 발견이 '생명체 탐색'과 직접 연결되지는 않습니다. 55 Cancri e는 온도가 극단적으로 높아 생명체 거주 가능성과는 거리가 멀며, 이번 연구는 암석 행성의 <span class="hl">맨틀·지각 조성과 행성 진화</span>를 이해하는 데 기여합니다.</p>
<p>JWST의 외계행성 대기 연구는 이제 시작 단계입니다. 향후 과제는 거주 가능 구역 내 암석 행성(지구 크기)의 대기 존재 여부와 성분 파악입니다. 별의 활동성(항성 플레어 등)이 관측 신호에 영향을 줄 수 있어 <span class="hl">항성 오염 보정</span>이 해석의 핵심 변수로 남습니다. 후속 관측과 독립 검증, 이론 대기 모델과의 비교를 통해 결론이 점진적으로 정교해지는 과정 자체가 외계행성 과학의 발전을 이끌게 됩니다.</p>`,
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
    sources: [
      { name: 'CNSA 중국국가항천국', url: 'https://www.cnsa.gov.cn/', type: 'official', usedFor: '창어 7호 착륙 지점·임무 구성 발표 확인' },
      { name: 'NASA Moon to Mars', url: 'https://www.nasa.gov/moon-to-mars/', type: 'background', usedFor: '아르테미스 착륙 후보 지점과의 자원 경쟁 배경' }
    ],
    body: `<p>중국국가항천국(CNSA)이 달 남극 탐사 미션 <span class="hl">창어 7호(嫦娥七號)</span>의 착륙 지점을 달 남극 <span class="hl">샤클턴 크레이터(Shackleton Crater)</span> 인근으로 최종 선정했습니다. 이 지점은 NASA의 아르테미스 달 착륙 후보 지역과 수십 km 이내 거리에 있어, 달 남극 자원을 둘러싼 선점 경쟁이 가시화되고 있습니다.</p>
<p>창어 7호는 <span class="hl-warn">궤도선·착륙선·로버·소형 비행체</span> 4개 요소로 구성된 복합 탐사 시스템입니다. 이 중 가장 주목받는 것은 일반 로버가 접근하기 어려운 영구 음영 크레이터(PSR) 내부로 직접 비행해 물 얼음 샘플을 채취하는 <span class="hl">소형 호핑 비행체(Mini Flying Detector)</span>입니다. 발사체는 창정 5호 로켓이며, <span class="hl-warn">2026년 하반기</span> 발사가 계획되어 있습니다.</p>
<p><span class="hl">창어 프로그램</span>은 단계적으로 달 탐사 역량을 구축해왔습니다. 창어 1·2호(2007·2010년)는 달 궤도 탐사선으로 달 지도를 제작했고, 창어 3호(2013년)는 아폴로 이후 최초의 달 연착륙에 성공했습니다. 창어 4호(2019년)는 역사상 최초로 달 뒷면에 연착륙했으며, 창어 5호(2020년)는 달 표면 샘플을 지구로 귀환시켰습니다. <span class="hl-good">창어 6호(2024년)는 달 뒷면 샘플 귀환이라는 인류 최초의 성과를 달성했습니다.</span></p>
<p>달 남극의 영구 음영 크레이터 내부에는 <span class="hl">물 얼음(water ice)</span>이 매장되어 있을 가능성이 높습니다. 이 얼음은 식수·호흡용 산소·수소 로켓 연료로 분리될 수 있어, 지구에서 자원을 모두 운반해야 하는 비용을 줄이는 현지 자원 활용(ISRU)의 핵심입니다. 달 남극 탐사는 순수 과학 임무를 넘어 장기 달 기지 건설의 실현 가능성을 가늠하는 전략적 시험대이기도 합니다.</p>
<p>중국은 러시아와 함께 <span class="hl">국제 달 연구기지(ILRS)</span> 구축을 추진하며 <span class="hl-warn">2035년 이후</span> 달 남극 상주 기지를 목표로 합니다. 미국 주도의 아르테미스 체계와 중국·러시아 주도의 ILRS라는 두 틀이 동시에 진행되는 가운데, 창어 7호의 성공 여부는 달 남극 탐사 경쟁에서 중국의 입지를 결정짓는 중요한 분기점이 될 것입니다.</p>`,
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
    sources: [
      { name: 'NASA Mars Sample Return', url: 'https://mars.nasa.gov/msr/', type: 'official', usedFor: 'MSR 재설계안·예산·2031년 귀환 일정 확인' },
      { name: 'ESA Mars Sample Return', url: 'https://www.esa.int/Science_Exploration/Space_Science/Mars_Sample_Return', type: 'official', usedFor: '유럽 측 지구 귀환 우주선(ERO) 역할 배경' }
    ],
    body: `<p>NASA와 ESA가 공동으로 추진하는 <span class="hl">화성 샘플 귀환(Mars Sample Return, MSR)</span> 임무의 재설계안이 최종 승인됐습니다. 2022년 독립 검토 보고서에서 비용이 최대 <span class="hl-warn">110억 달러</span>까지 치솟을 수 있다는 경고가 나온 이후 중단됐던 프로젝트가, 예산을 <span class="hl-warn">80억 달러 이내</span>로 줄이고 <span class="hl-warn">2031년</span> 지구 귀환을 목표로 재출발합니다.</p>
<p>MSR 임무는 복잡한 릴레이 구조로 이루어집니다. 먼저 <span class="hl">샘플 귀환 착륙선(SRL)</span>이 화성에 내려 퍼서비어런스가 수집해둔 샘플 튜브를 소형 상승 로켓(MAV)으로 화성 궤도에 올립니다. 이후 ESA가 제공하는 <span class="hl">지구 귀환 궤도선(ERO)</span>이 궤도에서 샘플을 포획해 지구로 가져옵니다. 인류가 처음으로 다른 행성에서 로켓을 발사하는 역사적인 도전이기도 합니다.</p>
<p>현재 화성의 예제로 크레이터에는 <span class="hl">퍼서비어런스 탐사차</span>가 수집한 <span class="hl-warn">43개</span> 티타늄 샘플 튜브가 두 곳의 캐시 지점에 보관되어 있습니다. 예제로 크레이터는 <span class="hl-warn">35~38억 년</span> 전 고대 호수와 삼각주가 있었던 곳으로, 유기물과 생명 흔적이 보존되기에 적합한 환경으로 꼽힙니다.</p>
<p>MSR 재설계의 배경에는 예산 문제만 있지 않습니다. MAV 소형 로켓의 신뢰성 확보, 궤도 랑데부·샘플 포획 기술, 그리고 지구로 가져올 때의 생물학적 오염 방지(격리 시설) 등 기술 난도가 매우 높습니다. <span class="hl-good">재설계안은 임무 아키텍처를 단순화하고 민간 기업 참여를 늘리는 방향으로 수정됐습니다.</span></p>
<p>화성 암석 샘플을 지구 실험실에서 분석하면 얻을 수 있는 정보는 어떤 탐사선 원격 장비로도 대체할 수 없습니다. <span class="hl">동위원소 연대 측정</span>으로 화성의 지질 역사를 정밀하게 복원하고, 유기물 분자와 광물 조성 분석으로 수십억 년 전 화성에 생명 활동이 있었는지 직접 검증할 수 있습니다. 이것이 MSR을 인류 역사상 가장 중요한 과학 임무 중 하나로 부르는 이유입니다.</p>
<p>앞으로 주목할 변수는 세 가지입니다. ① <span class="hl">미국 의회의 예산 승인</span> 여부(MSR은 매년 NASA 예산 심의에서 논란이 됩니다), ② <span class="hl-warn">2031년</span> 귀환 일정 달성을 위한 SRL 제작 계획 확정, ③ 대체 아키텍처(민간 기업 참여 확대) 채택 여부입니다. 어느 방향이든 이 임무의 성패는 향후 수십 년간 화성 탐사의 방향을 결정짓게 됩니다.</p>`,
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
    sources: [
      { name: 'KASA 한국우주항공청', url: 'https://www.kasa.go.kr/', type: 'official', usedFor: '달 탐사 로드맵·예산·목표 연도 확인' },
      { name: 'KARI 한국항공우주연구원', url: 'https://www.kari.re.kr/', type: 'background', usedFor: '누리호 개량형·차세대발사체 기술 배경' }
    ],
    body: `<p>한국우주항공청(<span class="hl">KASA</span>)이 설립 1주년을 맞아 '한국형 달 탐사 중장기 로드맵'을 공식 발표했습니다. <span class="hl-warn">2032년 달 궤도선 투입, 2035년 달 착륙</span>을 핵심 목표로 삼는 이 계획은 약 <span class="hl-warn">3조 원</span> 규모의 예산을 포함하며, 한국이 독자적인 달 탐사 역량을 갖추겠다는 의지를 공식화한 것입니다.</p>
<p>KASA는 <span class="hl-warn">2024년 5월</span> 출범한 정부 기관으로, 기존 한국항공우주연구원(KARI)이 담당하던 국가 우주개발 총괄 기능을 이어받았습니다. 우주항공청 설립은 우주개발을 연구 중심에서 정책·산업 중심으로 전환하려는 의도를 반영합니다. KARI는 연구개발 기관으로 계속 존재하면서 기술 개발을 담당합니다.</p>
<p>한국의 우주개발은 단계적으로 이루어져 왔습니다. <span class="hl">누리호(KSLV-II)</span>는 한국이 독자 기술로 개발한 첫 우주발사체로, 2022년 2차 발사에서 실용 위성 궤도 투입에 성공했습니다. 달 궤도선 <span class="hl-good">다누리(KPLO)는 2022년 8월 발사되어 2022년 말 달 궤도에 성공적으로 진입했고 현재도 운용 중</span>입니다. 이 두 성과가 이번 달 탐사 로드맵의 출발점입니다.</p>
<p>이번 로드맵은 그 다음 단계를 구체화합니다: ① <span class="hl-warn">2028년</span> 누리호 성능 개량형으로 달 궤도 시범 발사 ② 2030년 차세대발사체(KSLV-III) 1차 비행 ③ 2032년 달 궤도 랑데부 검증 ④ 2035년 달 남극 착륙. KASA는 아르테미스 협정 체계에서 NASA·ESA와의 공동 임무도 검토하고 있습니다.</p>
<p>앞으로 주목할 변수는 세 가지입니다. 첫째, <span class="hl-warn">3조 원</span> 규모 예산이 실제로 연도별 국회 심의를 통과하고 집행될 수 있는지입니다. 둘째, 차세대발사체 개발 일정입니다. 2030년 1차 비행은 누리호 대비 훨씬 높은 기술 수준을 요구합니다. 셋째, 국내 민간 우주기업의 역량이 얼마나 빠르게 성장하느냐입니다.</p>
<p>한국의 달 탐사 로드맵은 미국 아르테미스, 중국 창어 시리즈, 인도 찬드라얀이 경쟁하는 글로벌 달 탐사 흐름과 맞닿아 있습니다. <span class="hl">독자 달 착륙 역량 확보</span>는 과학 성과를 넘어 우주 강국으로서의 입지를 공고히 하는 전략적 의미를 가집니다. <span class="hl-good">KASA 설립 1년간 국내 우주 산업계의 관련 계약 수주가 4,200억 원에 달했다</span>는 점은 산업 생태계 활성화 조짐으로 긍정적으로 평가됩니다.</p>`,
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
    sources: [
      { name: 'NASA SLS 미션', url: 'https://www.nasa.gov/exploration/systems/sls/', type: 'official', usedFor: 'SLS 2호 조립 완료·열차폐재 개선 사항 확인' },
      { name: 'NASA Artemis II', url: 'https://www.nasa.gov/mission/artemis-ii/', type: 'background', usedFor: 'SLS 2호와 아르테미스 II 발사 연계 배경' }
    ],
    body: `<p>NASA의 케네디우주센터 <span class="hl">Vehicle Assembly Building(VAB)</span>에서 아르테미스 II 임무용 우주발사시스템(SLS) 2호 로켓의 조립이 완료됐습니다. 2022년 아르테미스 I에서 발견된 오리온 캡슐 열차폐재 박리 문제를 개선하고 발사 준비를 마무리한 단계입니다.</p>
<p><span class="hl">SLS(Space Launch System)</span>는 아르테미스 프로그램의 핵심 발사체입니다. 4기의 RS-25 주 엔진과 2기의 고체로켓부스터(SRB)가 조합되어 달 방향 궤도에 유인 캡슐을 투입할 수 있는 NASA의 초대형 발사체입니다. RS-25는 원래 우주왕복선(Space Shuttle)에 사용된 엔진을 개량한 것입니다. SLS 로켓에 오리온 캡슐과 ESA가 제공하는 <span class="hl">유럽 서비스 모듈(ESM)</span>이 결합되어 아르테미스 임무의 핵심 조합을 이룹니다.</p>
<p>SLS 개발은 2011년 시작돼 당초 예정보다 수년 지연됐습니다. 첫 비행인 <span class="hl">아르테미스 I</span>은 <span class="hl-warn">2022년 11월</span> 무인 달 궤도 비행으로 완료됐습니다. 당시 재진입 단계에서 오리온 열차폐재 일부가 예상보다 크게 박리된 것이 확인됐고, NASA는 약 2년에 걸쳐 접합부 설계를 수정했습니다.</p>
<p>이번 SLS 2호의 핵심 변경점은 <span class="hl">오리온 열차폐재 접합 방식 개선</span>입니다. NASA는 박리 원인을 분석해 코어 스테이지와 오리온 캡슐 연결부의 설계를 수정했습니다. <span class="hl-good">아르테미스 II 임무는 이후 2026년 4월 계획대로 발사됐으며, 4명의 승무원이 달 궤도 근처를 비행하고 무사 귀환했습니다.</span></p>
<p>앞으로의 SLS 일정에서 주목할 점은 생산 지속성입니다. SLS는 엔진을 재사용하지 않는 소모형 발사체로 발사마다 새로 제작해야 합니다. 아르테미스 III(<span class="hl-warn">2027년 7월 예정</span>)을 위한 SLS 3호 준비도 이미 진행 중이지만, 높은 제작 비용과 생산 속도 문제는 장기적으로 해결해야 할 과제로 꼽힙니다.</p>`,
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
    whyItMatters: '저궤도 위성군이 오지·해양·항공기에 인터넷 접근을 확대하는 한편, 궤도 혼잡·천문 관측 방해 등 과제도 동시에 제기.',
    lastFactChecked: '2026-05-01',
    editorNote: '⚠️ v3 위성 발사 날짜 및 누적 위성 수는 SpaceX 공식 발사 기록 페이지에서 재확인 권장. v3 용량 수치(2.3배 등) 공식 출처 독립 확인 필요.',
    sources: [
      { name: 'SpaceX 발사 기록', url: 'https://www.spacex.com/launches/', type: 'official', usedFor: 'Starlink v3 발사 날짜·위성 수 확인' },
      { name: 'Starlink 공식', url: 'https://www.starlink.com/', type: 'background', usedFor: 'Starlink 서비스 현황·v3 용량 개선 배경' }
    ],
    body: `<p>SpaceX가 3세대 스타링크(<span class="hl">Starlink v3</span>) 위성 <span class="hl-warn">50기</span>를 팰컨 9 로켓으로 일괄 발사하는 데 성공했습니다. 누적 운용 위성 수가 <span class="hl-warn">8,200기</span>를 돌파하며 단일 사업자 기준 역대 최대 규모의 위성군을 운용하게 됐습니다.</p>
<p><span class="hl">스타링크(Starlink)</span>는 SpaceX가 구축 중인 저궤도 위성 인터넷 서비스입니다. 수천 기의 위성을 고도 <span class="hl-warn">540~570km</span> 저궤도에 배치해 지상 기지국이 없는 오지·해양·항공기에도 광대역 인터넷을 제공하는 것이 목표입니다. 현재 전 세계 100개국 이상에서 서비스 중입니다.</p>
<p>스타링크는 2019년 첫 발사 이후 빠르게 세대 교체를 거쳤습니다. v1.5부터 위성 간 레이저 링크(ISL)가 도입됐고, v2부터는 위성 크기와 용량이 대폭 늘어났습니다. v3는 이전 세대 대비 단일 위성당 처리 용량이 향상된 것으로 알려져 있으나, <span class="hl">구체적인 성능 수치는 SpaceX 공식 발표로 독립 확인이 필요</span>합니다. v3는 향후 스타십으로 대량 발사하는 것도 설계 목표 중 하나입니다.</p>
<p>스타링크 확장에는 긍정적 측면과 우려가 공존합니다. 전 세계 인터넷 소외 지역 해소와 재난·분쟁 지역 통신 유지라는 공익적 효과가 있는 반면, 천문학계는 <span class="hl-warn">위성 밝기와 전파 간섭</span>이 지상 망원경 관측을 방해한다고 지속적으로 문제를 제기합니다. 저궤도 혼잡과 충돌 위험도 함께 높아지고 있습니다.</p>
<p>앞으로 주목할 변수는 스타십과의 결합입니다. 스타십이 대량 발사 역할을 본격적으로 맡기 시작하면 위성 투입 비용이 더 낮아지고 군집 규모도 빠르게 늘어날 수 있습니다. <span class="hl">아마존 카이퍼, 유텔샛 원웹</span> 등 경쟁 서비스도 성장하면서 저궤도 위성 인터넷 시장 경쟁이 본격화되고 있습니다.</p>`,
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
    sources: [
      { name: 'KARI 한국항공우주연구원', url: 'https://www.kari.re.kr/', type: 'official', usedFor: 'CAS500-3 운용 개시·센서 스펙 확인' },
      { name: 'KASA 한국우주항공청', url: 'https://www.kasa.go.kr/', type: 'background', usedFor: '위성 활용·수요 기관 연계 배경' }
    ],
    body: `<p>한국항공우주연구원(KARI)이 독자 개발한 <span class="hl">차세대중형위성 3호(CAS500-3)</span>가 약 1년의 궤도 검증 기간을 마치고 정식 운용에 돌입했습니다. <span class="hl-warn">0.5m급</span> 광학 카메라와 <span class="hl-warn">0.8m급</span> 열적외선(TIR) 센서를 복합 탑재한 국산 지구관측 위성입니다.</p>
<p><span class="hl">차세대중형위성(CAS500) 사업</span>은 한국이 독자적인 500kg급 표준 위성 플랫폼을 개발하는 프로젝트입니다. 위성 본체(버스)와 핵심 부품의 국산화를 통해 개발 비용을 낮추고, 다양한 임무 장비(탑재체)를 교체 탑재할 수 있는 유연한 구조를 목표로 합니다. 이 표준 플랫폼이 안정화되면 다양한 임무의 위성을 더 빠르게 반복 생산할 수 있게 됩니다.</p>
<p>한국 위성 개발은 1999년 <span class="hl">아리랑 1호(KOMPSAT-1)</span> 발사 이후 KOMPSAT 시리즈로 이어져 왔으나, 상당 부분이 외국 기술 협력이나 해외 발사체에 의존했습니다. <span class="hl-good">CAS500-1이 2021년 3월, CAS500-2가 2022년 3월 발사되며 국산 표준 플랫폼의 기반을 확립</span>했습니다. CAS500-3은 앞선 두 위성의 경험을 바탕으로 광학과 열적외선을 동시 탑재한 복합 관측 위성으로 발전했습니다.</p>
<p>이 위성이 중요한 이유는 활용 범위 때문입니다. 광학과 열적외선 복합 관측은 산불·홍수 등 재난 조기 감지, 농업·산림 현황 파악, 도시 열섬 모니터링 등에 활용될 수 있습니다. <span class="hl">국토교통부·환경부 등 수요 기관</span>에 위성 영상을 공급해 국가 위성정보 자립도를 높이는 효과도 있습니다.</p>
<p>앞으로 주목할 것은 민간 산업으로의 기술 이전입니다. CAS500 사업의 목표 중 하나는 위성 제작 기술을 국내 산업체에 이전해 민간 우주산업 생태계를 육성하는 것입니다. 국내 기업들이 위성 개발에 참여하면서 이전보다 넓은 산업 기반이 형성되고 있으며, <span class="hl">KASA 달 탐사 로드맵</span>의 목표를 실현하려면 이러한 위성 기술 기반의 지속적 강화가 선행 조건이 됩니다.</p>`,
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
    sources: [
      { name: 'SpaceX 발사 기록', url: 'https://www.spacex.com/launches/', type: 'official', usedFor: 'IFT-8 날짜·재진입·열차폐재 결과 확인' },
      { name: 'SpaceX Starship', url: 'https://www.spacex.com/starship', type: 'background', usedFor: '스타십 우주선 재사용·Mechazilla 포쉝 배경' }
    ],
    body: `<p>SpaceX의 <span class="hl">스타십(Starship)</span>이 제8차 통합비행시험(IFT-8)에서 상단부(Ship)의 대기권 재진입을 완료했습니다. 수퍼헤비 부스터는 발사대 <span class="hl">Mechazilla</span> 팔에 포착됐으며, SpaceX는 재진입 시 열차폐 타일 손상이 이전 비행에 비해 크게 줄었다고 밝혔습니다. 세부 결과는 SpaceX 공식 발표를 통한 독립 확인이 권장됩니다.</p>
<p>스타십은 1단인 <span class="hl">수퍼헤비(Super Heavy)</span>와 2단인 스타십 상단(Ship)으로 구성된 완전 재사용 2단형 발사체입니다. 33기의 랩터(Raptor) 엔진을 탑재한 수퍼헤비는 이제까지 개발된 발사체 중 최대 추력 수준을 제공하며, 상단부는 지구 궤도 진입, 달·화성 비행, 대용량 화물 수송을 목표로 합니다.</p>
<p>IFT 시리즈는 빠른 반복 시험을 통한 기술 개선이 핵심 철학입니다. 초기 비행에서 비정상 상황이 발생해도 SpaceX는 이를 데이터 수집 기회로 활용하며 빠르게 개선합니다. IFT-5에서는 수퍼헤비 부스터의 Mechazilla 포착에, IFT-6에서는 완전 궤도 비행에 성공하는 등 비행마다 주요 이정표를 달성해 왔습니다. <span class="hl-good">IFT-8에서는 재진입 열차폐 성능 개선이 확인</span>됐습니다.</p>
<p>이번 비행의 의미는 스타십의 핵심 임무와 직결됩니다. NASA 아르테미스 III의 <span class="hl">달 착륙선(HLS, Human Landing System)</span>으로 스타십이 선정돼 있어, 재진입·재사용 신뢰성은 유인 달 임무 인증의 전제 조건입니다. 또한 지구 궤도에서 연료를 보충한 뒤 달이나 화성으로 향하는 장기 목표에도 재사용 성능이 필수적입니다.</p>
<p>SpaceX가 밝힌 다음 단계는 <span class="hl">궤도상 연료 보급(In-Space Refueling)</span> 시험입니다. 이 기술은 스타십이 달과 화성에 충분한 연료를 갖고 도달하기 위해 반드시 검증해야 하는 항목입니다. 연료 보급 기술의 완성 시점과 아르테미스 HLS 인증 일정이 어떻게 맞물릴지가 앞으로 가장 중요한 변수입니다.</p>`,
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
    sources: [
      { name: 'CNSA 중국국가항천국', url: 'https://www.cnsa.gov.cn/', type: 'official', usedFor: '선저우-22 발사 날짜·도킹 확인' },
      { name: 'China Manned Space (CMS)', url: 'https://www.cmse.gov.cn/', type: 'background', usedFor: '선저우·틈궁 운용·늬 탐사 관련 배경' }
    ],
    body: `<p>중국국가항천국(CNSA)이 <span class="hl">선저우-22호(神舟二十二號)</span> 유인 우주선을 지우취안 위성발사센터에서 발사했습니다. 약 <span class="hl-warn">6.5시간</span>의 추적 비행 끝에 천궁 우주정거장 핵심 모듈 톈허(天和)에 정확히 도킹하며, 3명의 우주비행사가 약 6개월의 장기 체류 임무를 시작했습니다.</p>
<p><span class="hl">선저우(神舟) 프로그램</span>은 중국의 유인 우주비행 프로그램으로, 1999년 무인 시험 비행을 시작으로 2003년 선저우-5에서 첫 유인 비행에 성공했습니다. 발사체는 장정 2F(長征二F) 로켓을 사용하며, 우주선은 귀환 캡슐·궤도 모듈·추진 모듈의 3단 구조로 이루어집니다.</p>
<p>천궁 우주정거장은 핵심 모듈 <span class="hl">톈허(天和)</span>와 실험 모듈 원톈(問天)·멍톈(夢天)으로 구성된 T자형 구조입니다. 2021년부터 단계적으로 조립돼 2022년 말 기본 구성이 완료됐습니다. 선저우 유인선과 톈저우 화물선이 정기적으로 도킹해 승무원 교대와 물자 보급을 수행하며, 현재 상주 승무원 <span class="hl-warn">3명</span> 체제로 운용 중입니다.</p>
<p>이번 임무가 중요한 이유는 중국이 독자 우주정거장 운용 역량을 꾸준히 축적하고 있기 때문입니다. ISS는 <span class="hl-warn">2030년 전후</span> 운용 종료가 예상되는 가운데, 독자 우주정거장의 안정적 유지는 장기 우주 체류 기술의 핵심 기반입니다. CNSA는 이를 바탕으로 <span class="hl">2030년 달 유인 탐사</span>를 목표로 하고 있습니다.</p>
<p>앞으로 주목할 점은 달 탐사와의 연결입니다. 천궁에서 축적되는 랑데부·도킹 자동화, 장기 우주 체류 의학 데이터, 우주 유영 기술은 달 임무를 위한 전제 조건입니다. 중국의 <span class="hl">창어 7·8호</span> 달 착륙·기지 구축 계획과 선저우 시리즈의 유인 체류 경험이 어떻게 연결될지가 장기적 관점에서 주목됩니다.</p>`,
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
    sources: [
      { name: 'NASA Roman Space Telescope', url: 'https://roman.gsfc.nasa.gov/', type: 'official', usedFor: '로먼 망원경 발사 일정·WFI 테스트·과학 목표 확인' },
      { name: 'STScI Roman', url: 'https://www.stsci.edu/roman', type: 'background', usedFor: '로먼 WFI 사양·외계행성 통계 조사 배경' }
    ],
    body: `<p>NASA의 <span class="hl">낸시 그레이스 로먼 우주망원경(Nancy Grace Roman Space Telescope)</span>이 최종 극저온 진공 테스트를 성공적으로 통과했습니다. 고다드 우주비행센터에서 진행된 이 시험에서 <span class="hl-warn">230메가픽셀</span> 광시야 카메라(WFI)의 노이즈 성능이 목표치를 상회했으며, <span class="hl-warn">2026년 6월 케네디우주센터 인도, 9월 발사</span>를 향한 마지막 준비 단계에 들어갔습니다.</p>
<p>로먼 망원경은 허블 우주망원경과 동일한 <span class="hl-warn">2.4m 주경</span>을 사용하지만 시야각이 약 <span class="hl-warn">100배</span> 넓습니다. 허블이 특정 천체를 좁고 깊게 보는 망원경이라면, 로먼은 한 번에 넓은 하늘 영역을 담는 역할입니다. JWST가 개별 천체의 세밀한 적외선 관측에 특화됐다면, <span class="hl">로먼은 광대한 우주를 동시에 조망하는 통계 조사 도구</span>입니다. 이 차이가 로먼이 채울 수 있는 고유한 과학적 빈칸을 결정합니다.</p>
<p>망원경의 이름은 <span class="hl">낸시 그레이스 로먼(Nancy Grace Roman)</span>에서 따왔습니다. 로먼은 NASA 최초의 천문학 수석(Chief of Astronomy)으로, 1960년대에 허블 우주망원경 계획을 최초로 제안한 선구자입니다. 이 망원경은 원래 WFIRST(Wide Field Infrared Survey Telescope)로 불렸으며, 2020년 NASA의 결정으로 현재 이름이 됐습니다.</p>
<p>로먼의 세 가지 핵심 과학 목표는 ① <span class="hl">마이크로렌징 탐사</span>를 통한 외계행성 100만 개 이상 통계 분석 ② 초신성 조사를 통한 암흑에너지 성질 정밀 측정 ③ 우리 은하와 이웃 은하의 적외선 광시야 지도 제작입니다. 특히 마이크로렌징 방식은 JWST나 Kepler로도 감지하기 어려운 자유 부유 행성(항성 없이 표류하는 행성)을 탐지할 수 있어 주목받습니다.</p>
<p>발사가 예정대로 진행된다면 <span class="hl-good">로먼 망원경은 허블·스피처·JWST로 이어진 NASA 대형 우주망원경 라인업에 합류</span>하며 설계 수명 최소 5년의 운용을 시작합니다. 2027년 이후 로먼과 JWST가 동시에 가동되면 서로 보완적인 관측 체계를 이루게 됩니다. 발사 일정은 공식 NASA 로먼 사이트에서 최신 상태를 확인하는 것이 권장됩니다.</p>`,
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
    sources: [
      { name: 'NASA Artemis III 미션', url: 'https://www.nasa.gov/mission/artemis-iii/', type: 'official', usedFor: '아르테미스 III 일정·착륙 지점·승무원 확인' },
      { name: 'SpaceX Starship HLS', url: 'https://www.spacex.com/starship', type: 'background', usedFor: '스타십 HLS 달 착륙선 역할·EVA 계획 배경' }
    ],
    body: `<p>NASA가 <span class="hl">아르테미스 III</span> 달 착륙 임무 시행 일정을 <span class="hl-warn">2027년 7월</span>로 공식 발표했습니다. 이 임무가 성공하면 아폴로 17호(1972년) 이후 <span class="hl-warn">55년</span> 만에 인류가 다시 달 표면을 밟게 됩니다. 착륙 지점은 달 남극 약 89°S 부근 영구 음영 지역(PSR) 가장자리로 예정돼 있습니다.</p>
<p>아르테미스 III는 바로 앞선 아르테미스 II와 핵심적으로 다릅니다. 아르테미스 II는 4명이 달 궤도 근처를 비행한 뒤 귀환한 임무였지만, 아르테미스 III에서는 2명이 실제로 달 표면에 하강합니다. 이번 임무에서는 <span class="hl">최초의 여성 우주비행사와 유색인종 우주비행사</span>가 달 표면을 걷는 역사적 기록도 세우게 됩니다.</p>
<p>임무 아키텍처는 두 단계로 이루어집니다. <span class="hl">SLS 로켓과 오리온 캡슐</span>로 달 궤도에 도달한 뒤, 미리 달 궤도에 대기 중인 SpaceX 스타십 HLS(달 착륙선)에 탑승해 달 표면으로 하강합니다. 달 체류 시간은 약 <span class="hl-warn">6.5일</span>이며, EVA(선외활동) 2~4회와 달 남극 물 얼음 샘플 채취가 계획돼 있습니다. NASA의 새 월면 우주복 AxEMU도 이 임무에서 처음 사용됩니다.</p>
<p>이 임무가 중요한 이유는 단순 복귀 이상입니다. 달 남극의 <span class="hl">영구 음영 지역(PSR)</span>에 물 얼음이 매장됐을 가능성이 높으며, 직접 채취·분석하면 미래 달 기지의 현지 자원 활용(ISRU) 가능성을 검증할 수 있습니다. 아르테미스 III는 과학 탐사이자 장기 달 체류를 향한 핵심 시험대입니다.</p>
<p>앞으로 주목할 변수는 여러 가지입니다. <span class="hl-warn">2027년 7월</span> 일정은 스타십 HLS 인증 진행 상황과 궤도상 연료 보급 기술 검증 결과에 따라 조정될 수 있습니다. 새 우주복(AxEMU)의 달 표면 적합성 인증도 남아 있으며, SLS 3호 제작 일정도 변수입니다. NASA는 아르테미스 II 데이터 분석 결과를 반영해 최종 일정을 확정할 예정입니다.</p>`,
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
    sources: [
      { name: 'ESA Ariane 6', url: 'https://www.esa.int/Enabling_Support/Space_Transportation/Ariane_6', type: 'official', usedFor: '아리안 6 3차 발사 성공·엔진 재점화 개선 확인' },
      { name: 'ArianeGroup', url: 'https://www.ariane.group/', type: 'background', usedFor: '아리안스페이스 발사 계약·A64 생산 무리 배경' }
    ],
    body: `<p>유럽의 차세대 대형 발사체 <span class="hl">아리안 6(Ariane 6)</span>가 세 번째 비행에서 두 기의 상업 통신 위성을 <span class="hl">정지천이궤도(GTO)</span>에 투입하는 데 성공했습니다. 초기 1·2차 비행에서 문제가 됐던 상단 엔진 재점화 결함이 개선됐으며, 이를 통해 유럽의 대형 발사체 상업 서비스가 안정적으로 재개됐습니다.</p>
<p><span class="hl">아리안 6</span>는 ESA와 ArianeGroup이 개발한 모듈형 발사체입니다. 하단 코어 스테이지에 Vulcain 2.1 엔진 1기를 탑재하며, A62는 SRB 2기, A64는 SRB 4기를 붙인 두 가지 구성이 있습니다. 상단에는 재점화 가능한 Vinci 엔진을 장착해 여러 궤도에 순차 투입하거나 임무 종료 후 자체 디오비팅이 가능합니다. 프랑스령 기아나 쿠루의 ELA-4 발사대에서 운용됩니다.</p>
<p>아리안 6 개발은 아리안 5의 높은 비용과 SpaceX Falcon 9의 저가 공세에 대응하기 위해 2014년 결정됐습니다. 그러나 개발 지연이 거듭됐고, 아리안 5는 <span class="hl-warn">2023년 7월</span> 마지막 비행 후 퇴역했습니다. 이 공백 기간 동안 Vega-C 발사체도 2022년 임무 실패 후 운용 중단됐으며, 러시아-우크라이나 전쟁으로 <span class="hl">소유즈 발사 서비스</span>도 사용 불가 상태가 됐습니다.</p>
<p>3차 비행 성공이 중요한 이유는 유럽의 우주 접근 독립성 회복을 의미하기 때문입니다. 독자 발사 능력은 안보·과학·경제적 자주성의 핵심입니다. <span class="hl-good">아리안 6의 안정적 운용이 궤도에 오르면서 유럽 발사체 공백이 사실상 해소됐다고 평가됩니다.</span></p>
<p>앞으로 주목할 것은 상업 경쟁력 확보 속도입니다. 아리안스페이스는 A62·A64 합산 <span class="hl-warn">12건</span> 이상의 발사 계약을 보유하고 있으며 <span class="hl-warn">2027년까지 연간 6회</span> 발사를 목표로 합니다. 그러나 SpaceX Falcon 9의 빠른 재사용 주기와 낮은 가격에 비해 비용 경쟁력을 어떻게 확보할지가 장기적 과제입니다. ArianeGroup은 향후 재사용 요소 도입도 검토하고 있습니다.</p>`,
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
    sources: [
      { name: 'Rocket Lab 공식', url: 'https://www.rocketlabusa.com/', type: 'official', usedFor: 'Electron 60차 발사 날짜·페이로드 확인' },
      { name: 'Rocket Lab Electron', url: 'https://www.rocketlabusa.com/launch/electron/', type: 'background', usedFor: 'Electron 기체·재사용 전략 배경' }
    ],
    body: `<p>뉴질랜드 마히아 반도 발사장에서 Rocket Lab의 <span class="hl">Electron 로켓</span>이 <span class="hl-warn">60번째</span> 발사에 성공했습니다. <span class="hl-warn">2017년</span> 첫 비행 이후 약 9년 만에 달성한 누적 기록으로, 소형 전용 발사 시장에서 꾸준한 신뢰성을 쌓아온 발사체임을 보여줍니다.</p>
<p><span class="hl">Electron</span>은 높이 약 17m의 2단형 소형 발사체로, 저궤도(LEO)에 최대 약 300kg의 페이로드를 투입할 수 있습니다. 1·2단 모두 3D 프린팅으로 제작된 Rutherford 엔진을 사용하며, 이는 제작 시간 단축과 비용 절감에 기여합니다. 소형 위성 전용 발사 서비스로, 고객이 원하는 시기에 원하는 궤도로 정확히 투입하는 유연성이 특징입니다.</p>
<p>Rocket Lab은 2015년 설립된 뉴질랜드·미국 발사 기업으로, 2018년부터 상업 발사를 시작했습니다. 초기 시험 비행을 거쳐 점진적으로 발사 성공률을 높였으며, 1단 로켓을 <span class="hl">헬기 공중 포획 방식</span>으로 회수하는 재사용 프로그램도 진행해 왔습니다. 마히아 반도 외에도 버지니아주 왈롭스 섬 발사장을 운용해 미국 정부·방위 고객도 지원합니다.</p>
<p>60번째 발사가 의미 있는 이유는 소형 발사체 전용 시장에서 신뢰성이 얼마나 중요한지 보여주기 때문입니다. 소형 위성 운용 기업들은 대형 발사체의 라이드셰어보다 <span class="hl">전용 발사(dedicated launch)</span>를 선호하는 경우가 많습니다. 원하는 궤도·고도·발사 시간을 보장받을 수 있기 때문입니다. 누적 발사 기록이 쌓일수록 고객의 신뢰도 비례해 높아집니다.</p>
<p>앞으로 주목할 것은 <span class="hl">Neutron 중형 발사체</span> 개발입니다. Rocket Lab은 약 8톤급 재사용 중형 발사체 Neutron을 개발 중이며, 소형 위성 전용 시장을 넘어 중형 위성 및 승무원 수송 시장 진입을 목표로 합니다. Neutron이 언제 첫 비행에 나설지, 그리고 Falcon 9와 같은 기성 중형 발사체와 어떻게 경쟁할지가 앞으로 지켜볼 주요 변수입니다.</p>`,
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
    sources: [
      { name: 'SpaceX 발사 기록', url: 'https://www.spacex.com/launches/', type: 'official', usedFor: 'IFT-6 날짜·완전 궤도 비행·Mechazilla 포쉝 확인' },
      { name: 'SpaceX Starship', url: 'https://www.spacex.com/starship', type: 'background', usedFor: '스타십 완전 재사용·화성 임무 연계 배경' }
    ],
    body: `<p>SpaceX의 스타십이 제6차 통합비행시험(<span class="hl">IFT-6</span>)에서 완전한 궤도 비행을 달성하며 우주 발사 역사에 새로운 이정표를 세웠습니다.</p>
<p>이번 비행에서 수퍼헤비 부스터는 발사 약 <span class="hl-warn">7분</span> 후 발사 기지로 돌아와 <span class="hl">Mechazilla 포착 팔</span>에 정확히 안착됐으며, 스타십 상단부는 궤도를 <span class="hl-warn">1.25바퀴</span> 돌고 인도양 목표 지점에 수직 하강으로 정밀 착수했습니다.</p>
<p>스타십은 높이 약 <span class="hl-warn">120m</span>의 <span class="hl">Super Heavy 부스터</span>(1단)와 <span class="hl">Ship</span>(2단)으로 구성된 완전 재사용 발사 시스템입니다. 저궤도 기준 최대 페이로드 <span class="hl-warn">150톤</span>을 목표로 설계됐으며, 두 단 모두 회수해 재비행하는 것이 핵심 설계 목표입니다. 이는 팰컨 9처럼 1단만 재사용하는 방식을 넘어서는 완전 재사용 개념입니다.</p>
<p>스타십 통합비행시험은 <span class="hl-warn">2023년 4월</span> IFT-1 이후 단계적으로 진행됐습니다. IFT-1·2는 비행 중 비정상 종료됐고, IFT-3(2024년 3월)부터 비행 거리가 점진적으로 늘었습니다. IFT-5(2024년 10월)에서 Super Heavy의 Mechazilla 포착이 처음 시도됐으며, <span class="hl-good">IFT-6는 부스터와 상단부 양쪽의 회수를 모두 확인한 비행</span>으로 보고됐습니다.</p>
<p>스타십은 <span class="hl">NASA Artemis HLS(Human Landing System)</span> 계약 발사체로 선정돼, Artemis III 달 착륙 임무에서 우주인을 달 표면에 내려보낼 착륙선으로 활용될 예정입니다. 화성 임무를 위한 <span class="hl">궤도 급유(on-orbit refueling)</span> 기술 검증도 앞으로의 핵심 과제로, 두 스타십이 궤도에서 연결해 연료를 보충하는 방식입니다.</p>
<p>앞으로 주목할 점은 실제 페이로드(Starlink 위성 등) 투입 비행으로의 전환, 궤도 급유 시험 일정, 그리고 Artemis HLS 인증 심사 진행 상황입니다. 매 비행마다 <span class="hl">FAA 발사 허가</span> 취득 과정도 변수로 작용하며, 시험 데이터 분석 결과가 인증 타임라인에 직접 영향을 미칩니다.</p>`,
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
    sources: [
      { name: 'Nature Astronomy', url: 'https://www.nature.com/natastron/', type: 'paper', usedFor: 'K2-18b CO₂·CH₄·DMS 검출 논문 원문 확인' },
      { name: 'NASA JWST 미션', url: 'https://www.nasa.gov/missions/webb/', type: 'official', usedFor: 'JWST NIRSpec 분광관측 배경·K2-18b 화학 조성 설명' }
    ],
    body: `<p>제임스웹 우주망원경(<span class="hl">JWST</span>)이 지구로부터 약 <span class="hl-warn">40광년</span> 떨어진 외계행성 <span class="hl">K2-18b</span>의 대기에서 이산화탄소(CO₂)와 메탄(CH₄)을 동시 검출하고, 생물학적 기원 가능성이 있는 <span class="hl">디메틸설파이드(DMS)</span>의 약한 신호도 포착했다는 연구가 Nature Astronomy에 게재됐습니다.</p>
<p>K2-18b는 지구 질량의 약 <span class="hl-warn">8.6배</span>인 슈퍼-지구로, 적색왜성 K2-18을 공전합니다. 연구진은 K2-18b를 <span class="hl">하이션 세계(Hycean world)</span>의 후보로 분류합니다. 하이션 세계란 두꺼운 수소-헬륨 대기 아래 광대한 액체 바다가 존재할 가능성이 있는 행성 유형으로, 지구형 암석 행성이나 가스 거성과는 구별되는 제3의 유형입니다.</p>
<p>K2-18b는 항성으로부터 적절한 거리에 위치한 <span class="hl">거주 가능 구역(habitable zone)</span> 안에 있습니다. JWST의 <span class="hl">NIRSpec 분광기</span>는 행성이 별 앞을 지날 때 별빛이 행성 대기를 통과하면서 각 분자가 특정 파장의 빛을 흡수하는 것을 측정해 대기 성분을 분석합니다. CO₂와 CH₄가 함께 존재하면, 지구 대기처럼 생명 활동이 유지하는 화학적 불평형 상태일 수 있습니다.</p>
<p>이번 논쟁의 핵심은 <span class="hl">DMS(디메틸설파이드)</span> 신호입니다. 지구에서 DMS는 주로 해양 식물성 플랑크톤이 생성하는 분자로 알려져 있습니다. 그러나 K2-18b에서의 신호는 미약하며, 연구진 자신도 잠정적인 탐지라고 명시했습니다. 비생물적 화학 반응으로도 DMS가 만들어질 수 있는지는 학계에서 여전히 검토 중입니다.</p>
<p>연구진은 이번 발견을 <span class="hl">'생명체 발견'이 아닌 '유망 후보 확인'</span>으로 명확히 표현했습니다. CO₂·CH₄의 동시 존재는 생명 활동이 아닌 지질 과정으로도 설명될 수 있으므로, 결론보다는 <span class="hl-good">외계행성 대기 관측 역사에서 가장 주목할 만한 바이오시그니처 후보 데이터</span>로 평가하는 것이 적절합니다.</p>
<p>앞으로 JWST의 <span class="hl">MIRI 중적외선 기기</span>를 이용한 후속 관측과 다른 연구팀의 독립 검증이 핵심 과제입니다. '생명체가 사는 외계행성'이라는 결론을 내리기까지는 여러 단계의 추가 검증이 필요하며, 이 과정 자체가 외계생명체 탐색 과학의 발전을 이끌게 될 것입니다.</p>`,
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
    sources: [
      { name: 'ISRO 공식', url: 'https://www.isro.gov.in/', type: 'official', usedFor: 'PSLV-C61 / EOS-09 발사 날짜·궤도 확인' },
      { name: 'ISRO Chandrayaan', url: 'https://www.isro.gov.in/Chandrayaan4.html', type: 'background', usedFor: '시차라얄-4 달 남극 다음 임무 배경' }
    ],
    body: `<p>인도우주연구기구(<span class="hl">ISRO</span>)가 <span class="hl">PSLV-C61 로켓</span>으로 지구관측 위성 <span class="hl">EOS-09</span>(Earth Observation Satellite-09)를 <span class="hl-warn">태양동기궤도(SSO) 528km</span>에 성공적으로 투입했습니다. EOS-09는 <span class="hl">C-Band 합성개구레이더(SAR)</span>를 탑재해 주야간·악천후 관계없이 지표면을 관측할 수 있는 지구관측 위성입니다.</p>
<p><span class="hl">PSLV(Polar Satellite Launch Vehicle)</span>는 인도가 독자 개발한 중형 발사체로, 4단 추진 방식(고체-액체-고체-액체)을 채택합니다. 태양동기궤도와 저궤도에 <span class="hl-warn">1~1.8톤</span>급 위성을 투입할 수 있으며, ISRO의 발사체 중 가장 많이 사용되는 주력 로켓입니다.</p>
<p>PSLV는 <span class="hl-warn">1993년 첫 비행</span> 이후 수십 회의 발사를 통해 높은 신뢰도를 쌓아 왔습니다. 인도 정부 위성뿐 아니라 외국 상업 위성도 다수 탑재 발사하면서 <span class="hl-good">소형·중형 위성 발사 시장에서 경쟁력 있는 발사 서비스 제공자</span>로 자리잡았으며, Cartosat·RISAT 등 EOS 계열 위성을 꾸준히 궤도에 올려왔습니다.</p>
<p>EOS-09의 C-Band SAR는 <span class="hl-warn">1m급 해상도</span>로 농업 작황 예측, 산림 자원 조사, 홍수·산사태 피해 파악, 국경 감시 등 다양한 분야에 활용됩니다. 독자 위성 관측 역량은 타국 데이터 의존도를 줄이고 인도의 안보·재난 대응 주권을 강화하는 데 기여합니다.</p>
<p>ISRO는 PSLV 외에도 대형 위성 전용 <span class="hl">LVM3(GSLV Mk III)</span>, 소형 위성 전용 <span class="hl">SSLV</span>를 운용하며 발사체 다양성을 확보하고 있습니다. 앞으로 주목할 점은 PSLV의 상업 발사 서비스 확대, 정부 EOS 계열 위성 추가 발사 계획, 그리고 달 남극 탐사를 목표로 하는 <span class="hl">찬드라얀-4 임무</span> 준비 진행 상황입니다.</p>`,
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
    sources: [
      { name: 'ULA Vulcan', url: 'https://www.ulalaunch.com/rockets/vulcan', type: 'official', usedFor: 'Vulcan 2차 발사 날짜·NSSL Phase 3 계약 확인' },
      { name: 'Blue Origin BE-4 엔진', url: 'https://www.blueorigin.com/engines', type: 'background', usedFor: 'BE-4 엔진 사양·Vulcan 1단 구성 배경' }
    ],
    body: `<p><span class="hl">ULA(United Launch Alliance)</span>의 차세대 발사체 <span class="hl">Vulcan Centaur</span>가 두 번째 비행에서 성공을 거두며 미국 국가안보 우주 발사(<span class="hl">NSSL Phase 3</span>) 계약 이행을 본격화했습니다. 이번 임무에서 미국 국가정찰국(<span class="hl">NRO</span>) 위성을 고고도 궤도에 투입했습니다.</p>
<p>Vulcan Centaur는 <span class="hl">Blue Origin이 개발한 BE-4 엔진</span>(액체산소/액화메탄, 2기) 기반 1단 부스터와 고성능 <span class="hl">Centaur V 상단</span>을 결합한 2단 발사체입니다. 저궤도 <span class="hl-warn">27.2톤</span>, 정지천이궤도(GTO) <span class="hl-warn">7.7톤</span> 투입 능력을 갖추며, ULA의 이전 발사체인 Atlas V와 Delta IV를 대체하도록 설계됐습니다.</p>
<p>ULA는 보잉과 록히드마틴의 합작 발사 서비스 회사로, <span class="hl-warn">2006년</span> 창립 이후 Atlas V와 Delta IV로 미국 정부·군사 위성을 발사해 왔습니다. Atlas V는 러시아제 RD-180 엔진을 사용했는데, 러시아 침공 이후 미국 의회가 국내산 엔진 전환을 촉구했고 Vulcan은 <span class="hl-good">BE-4 기반의 완전 미국산 발사체</span>로 개발됐습니다.</p>
<p>NSSL Phase 3 계약은 국가안보 위성 발사 임무를 SpaceX Falcon Heavy와 ULA Vulcan에 배분하는 구조입니다. Vulcan 2차 비행 성공은 반복 운용 전 단계인 인증 진전을 보여주는 데이터를 제공합니다. 1단 부스터는 회수·재사용 설계가 없어 SpaceX 대비 단가 경쟁력이 제한적이나, 고성능 페이로드 투입 능력과 신뢰성을 앞세웁니다.</p>
<p>앞으로 주목할 점은 Vulcan의 NSSL Phase 3 인증 공식 완료 시기, 연간 발사 빈도 확대 계획, 그리고 <span class="hl">BE-4 엔진</span> 공급 안정성입니다. SpaceX Falcon 9·Falcon Heavy와의 시장 경쟁, 미국 국가안보 발사의 공급 다변화 정책 지속 여부가 Vulcan의 장기적 역할을 결정하는 핵심 변수입니다.</p>`,
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
    sources: [
      { name: 'Polaris Program', url: 'https://polarisprogram.com/', type: 'official', usedFor: 'Polaris Dawn 2 승무원·목표 고도·일정 확인' },
      { name: 'SpaceX Crew Dragon', url: 'https://www.spacex.com/human-spaceflight/crew/', type: 'background', usedFor: 'Crew Dragon 기체·EVA 스유트 배경' }
    ],
    body: `<p>억만장자 <span class="hl">Jared Isaacman</span>이 이끄는 민간 우주 탐사 프로그램 <span class="hl">Polaris</span>의 두 번째 임무인 <span class="hl">Polaris Dawn 2</span> 승무원 4명이 공식 확정됐습니다. 목표 고도 <span class="hl-warn">1,400km</span>는 아폴로 시대 이후 인간이 도달하는 가장 높은 궤도 중 하나가 될 전망입니다.</p>
<p><span class="hl">Polaris 프로그램</span>은 민간 자금으로 운영되는 유인 우주 탐사 이니셔티브로, Crew Dragon을 활용한 단계적 심우주 비행 시험을 거쳐 최종적으로 <span class="hl">스타십 첫 유인 비행(Polaris Dawn 3)</span>까지 이어지도록 설계됐습니다. 과학 데이터 수집, EVA 기술 발전, 방사선 환경 측정 등 민간 주도의 심우주 비행 연구를 목표로 합니다.</p>
<p>첫 번째 임무인 <span class="hl">Polaris Dawn</span>은 <span class="hl-warn">2024년 9월</span> 발사돼 Crew Dragon으로 고도 약 <span class="hl-warn">1,400km</span>까지 상승했습니다. 이 비행에서 <span class="hl-good">사상 최초의 민간인 우주 유영(EVA)</span>이 수행됐으며, 새로 개발된 SpaceX EVA 우주복의 실제 비행 검증도 이루어졌습니다. 반 앨런 방사선대를 통과하는 고도 비행 중 방사선 측정 데이터도 수집됐습니다.</p>
<p>Polaris Dawn 2의 핵심 목표는 첫 번째 임무에서 축적한 데이터를 바탕으로 더욱 심도 있는 <span class="hl">방사선 측정</span>과 EVA 시험을 수행하는 것으로 알려져 있습니다. 반 앨런 내대 인근 고도에서 인체에 미치는 방사선 영향 데이터는 화성처럼 자기권 보호가 없는 환경에서의 장기 유인 임무를 위한 필수 기초 자료입니다.</p>
<p>앞으로 주목할 점은 최종 발사 일정 확정, 과학 실험 및 EVA 계획의 구체적 발표입니다. Polaris Dawn 3는 스타십의 첫 유인 비행으로 계획돼 있으나, 구체적 시기와 내용은 <span class="hl">스타십 개발 진행 상황</span>과 FAA 인증 절차에 달려 있습니다. 민간 자금으로 운영되는 이 프로그램이 NASA 주도 심우주 탐사를 어떻게 보완하는지도 지켜볼 대목입니다.</p>`,
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
    sources: [
      { name: 'Blue Origin New Shepard', url: 'https://www.blueorigin.com/new-shepard', type: 'official', usedFor: 'NS-33 임무·탑재 내용·회수 확인' },
      { name: 'NASA Flight Opportunities', url: 'https://www1.nasa.gov/directorates/spacetech/flightopportunities/index.html', type: 'background', usedFor: '준궤도 미세중력 과학 실험 정책 배경' }
    ],
    body: `<p>Blue Origin의 준궤도 로켓 <span class="hl">New Shepard NS-33</span> 임무가 성공적으로 완료됐습니다. 탑승객 없이 순수 과학 실험 탑재체 <span class="hl-warn">6종</span>만을 싣고 비행한 무인 임무로, 최고 고도 <span class="hl-warn">107km</span>를 돌파하며 캡슐과 부스터 모두 안전하게 회수됐습니다.</p>
<p><span class="hl">New Shepard</span>는 준궤도(suborbital) 비행 전용 발사체입니다. 준궤도 비행은 우주 경계선인 <span class="hl-warn">카르만 선(100km)</span>을 넘지만, 지구를 일주하는 궤도 속도에는 도달하지 않습니다. 전체 비행 시간은 약 <span class="hl-warn">11분</span>으로 짧고, 그 중 약 4분간 승객과 탑재체가 무중력 상태를 경험합니다.</p>
<p>Blue Origin은 <span class="hl-warn">2015년</span> New Shepard의 첫 수직 착륙 시험에 성공했으며, 이후 무인·유인 비행을 반복하며 준궤도 재사용 발사체의 안정성을 입증해 왔습니다. <span class="hl-warn">2021년 7월</span> Jeff Bezos와 승무원이 탑승한 첫 유인 비행(NS-16) 이후 상업 우주관광 비행도 진행됐습니다. <span class="hl-good">NS-33은 재사용 캡슐의 반복 운용 실적을 추가로 쌓은 비행</span>입니다.</p>
<p>NS-33처럼 탑승객 없이 과학 실험 탑재체만 싣는 비행은 <span class="hl">NASA Flight Opportunities 프로그램</span>을 통해 연구기관이 미세중력 실험을 수행하는 데 활용됩니다. 궤도 실험에 비해 비용과 대기 시간이 적어 소규모 연구팀이나 대학도 접근하기 쉬우며, 재사용 캡슐 덕분에 실험 반복 횟수를 늘릴 수 있습니다.</p>
<p>Blue Origin은 준궤도의 New Shepard와 별개로, 궤도급 대형 발사체 <span class="hl">New Glenn</span>도 운용 중입니다. New Shepard가 우주관광·소형 실험 플랫폼에 특화된 반면, New Glenn은 대형 상업 위성 및 정부 임무를 수행합니다. 앞으로 주목할 점은 New Shepard의 유인 비행 빈도 확대, 과학 탑재체 서비스의 상업화, 그리고 Blue Origin 전체 사업이 <span class="hl">New Glenn</span> 중심으로 어떻게 이동하는지입니다.</p>`,
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
    sources: [
      { name: 'NASA ISS Expeditions', url: 'https://www.nasa.gov/international-space-station/expeditions/', type: 'official', usedFor: 'Crew-11 승무원·도킹 일정 확인' },
      { name: 'SpaceX Crew Dragon', url: 'https://www.spacex.com/human-spaceflight/crew/', type: 'background', usedFor: 'Crew Dragon 연속 성공 실적·ISS 2030 이양 배경' }
    ],
    body: `<p>SpaceX <span class="hl">Crew Dragon 캡슐</span>이 Crew-11 승무원 4명을 탑재하고 케네디우주센터에서 발사, 약 <span class="hl-warn">27시간</span> 비행 후 국제우주정거장(ISS)에 도킹했습니다. 미국·일본·러시아·캐나다 4개국 승무원으로 구성된 다국적 팀이 <span class="hl-warn">약 6개월</span>간의 ISS 체류 임무를 시작했습니다.</p>
<p><span class="hl">Commercial Crew Program(상업 승무원 프로그램)</span>은 NASA가 민간 기업에 유인 우주선 개발·운용을 맡기는 방식으로, <span class="hl-warn">2011년 우주왕복선 퇴역</span> 이후 러시아 소유즈에 의존하던 미국 독자 유인 발사 역량을 회복하기 위해 추진됐습니다. SpaceX Crew Dragon은 <span class="hl-warn">2020년 5월</span> Demo-2 비행으로 첫 유인 임무를 수행하며 이 프로그램의 핵심 발사 수단이 됐습니다.</p>
<p>ISS 장기 체류 임무(보통 6개월)에서 승무원은 <span class="hl">미세중력 과학 실험, 우주 의학 연구, 기술 검증, 지구 관측</span> 등 다양한 활동을 수행합니다. 뼈 밀도 감소·근육 위축·심혈관 변화 같은 장기 우주 체류 의학 데이터는 미래 화성 임무를 위한 핵심 정보로 활용됩니다. ISS에는 항상 <span class="hl-warn">6~7명</span>의 승무원이 교대로 체류하며, Crew Dragon과 소유즈 캡슐이 승무원 교대 역할을 나누고 있습니다.</p>
<p>Crew-11 도킹은 SpaceX가 <span class="hl-good">Commercial Crew 유인 발사에서 연속 성공 실적</span>을 쌓고 있음을 보여줍니다. 이는 미국이 자국 로켓으로 자국 우주인을 보내는 역량을 안정적으로 운용하고 있다는 신호이기도 합니다. ISS 내에 상시 체류하는 다국적 팀은 국제 과학 협력의 상징이자, 유인 우주 비행 기술의 지속 검증 플랫폼 역할을 합니다.</p>
<p>앞으로 주목할 점은 ISS 운용 종료 예정 시점과 그 이후의 전환입니다. NASA는 ISS를 <span class="hl-warn">2030년경</span> 퇴역시키고, Axiom Space·Starlab 등 민간 우주정거장으로 저궤도 연구 기능을 이전하는 계획을 검토 중입니다. Crew Dragon의 후속 세대, 스타십의 유인 비행 가능성, 그리고 <span class="hl">저궤도 경제(LEO Economy)</span>가 어떻게 형성될지가 ISS 이후 시대의 핵심 변수입니다.</p>`,
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
    sources: [
      { name: 'JAXA MMX 미션', url: 'https://www.isas.jaxa.jp/en/missions/spacecraft/current/mmx.html', type: 'official', usedFor: 'MMX 포보스 근접 촬영·샘플 저넥 일정 확인' },
      { name: 'ESA MMX', url: 'https://www.esa.int/Science_Exploration/Space_Science/Hera/MMX', type: 'background', usedFor: 'MMX ESA 파트너십·포보스 기원 연구 배경' }
    ],
    body: `<p>일본항공우주연구기구(JAXA)의 화성 위성 탐사선 <span class="hl">MMX(Martian Moons eXploration)</span>가 화성 내위성 <span class="hl">포보스(Phobos)</span> 표면 <span class="hl-warn">50km 상공</span>에서 지금까지 중 최고 해상도의 지형 촬영에 성공했습니다. 이 데이터를 바탕으로 샘플 채취 착륙 후보 지점 선정 작업이 시작됐습니다.</p>
<p><span class="hl">MMX</span>는 화성의 두 위성, 포보스와 데이모스를 탐사하고 포보스 표면 샘플을 지구로 가져오는 임무입니다. 포보스는 지름 약 <span class="hl-warn">22km</span>의 작고 불규칙한 천체로, 화성에서 불과 <span class="hl-warn">6,000km</span> 거리에서 공전합니다. 샘플 채취는 탐사선이 표면에 잠깐 접촉하는 <span class="hl">터치다운 방식</span>으로, JAXA의 하야부사 시리즈에서 쌓은 기술을 계승합니다.</p>
<p>포보스와 데이모스의 기원은 아직 밝혀지지 않은 행성과학의 미스터리입니다. 크게 두 가지 가설이 경쟁합니다. 하나는 소행성이 화성 중력에 포획됐다는 <span class="hl">소행성 포획설</span>이고, 다른 하나는 과거 대형 천체가 화성과 충돌하면서 파편이 모여 위성이 됐다는 <span class="hl">거대 충돌설</span>입니다. 포보스 샘플은 두 가설을 구분할 수 있는 동위원소·광물 조성 데이터를 제공할 수 있습니다. 일본은 <span class="hl">하야부사(2010년)</span>와 <span class="hl">하야부사2(2020년)</span>로 소행성 류구 샘플 귀환에 성공하며 샘플 귀환 기술 분야의 선두에 있습니다.</p>
<p>화성 탐사에서 '위성'을 연구하는 것은 '화성 본체'를 직접 탐사하는 것과 다른 방식의 접근입니다. 포보스는 화성 중력권 안에 있어, 만약 포획된 소행성이라면 태양계 초기 소행성대의 물질을 보존하고 있을 수 있습니다. 반대로 거대 충돌 기원이라면 화성 지각 물질이 담겨 있을 것입니다. <span class="hl-good">포보스 샘플은 이 두 기원 중 어느 쪽인지를 결정할 수 있는 유일한 직접 증거</span>가 될 수 있습니다.</p>
<p>앞으로 주목할 점은 착륙 후보 지점 최종 선정, 터치다운 시도 일정, 그리고 샘플을 담은 귀환 캡슐의 지구 귀환 예정 시점입니다. MMX는 이미 일정이 여러 차례 변경된 이력이 있으므로, 공식 JAXA 발표를 통해 최신 임무 상황을 확인하는 것이 중요합니다. ESA도 MMX에 착륙기를 탑재하는 방식으로 참여하고 있어, 국제 협력 샘플 귀환 임무로서의 의미도 있습니다.</p>`,
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
    sources: [
      { name: 'Rocket Lab Neutron', url: 'https://www.rocketlabusa.com/launch/neutron/', type: 'official', usedFor: 'Neutron 첫 비행 일정·Archimedes 엔진 시험 현황 확인' },
      { name: 'Rocket Lab 공식', url: 'https://www.rocketlabusa.com/', type: 'background', usedFor: 'Neutron 중형 재사용 발사체 시장 주의 배경' }
    ],
    body: `<p>Rocket Lab이 개발 중인 중형 재사용 발사체 <span class="hl">Neutron</span>의 주 엔진 <span class="hl">Archimedes(아르키메데스)</span>가 버지니아주 왈롭스 섬 시험장에서 정적 연소 시험을 성공적으로 완료했습니다. 이는 첫 비행을 위한 중요한 개발 이정표입니다. 목표 탑재 능력은 <span class="hl-warn">저궤도 기준 13톤</span>이며, 1단 재사용을 설계에 포함하고 있습니다.</p>
<p>Neutron은 Rocket Lab의 소형 발사체 <span class="hl">Electron</span>(탑재 능력 약 300kg)과는 완전히 다른 발사체입니다. Electron이 소형 전용 위성 발사에 특화된 반면, Neutron은 중형 위성 군집(constellation), 국가안보 화물, 중형 탑재물 시장을 겨냥합니다. Archimedes 엔진은 <span class="hl">액체산소/메탄 연료</span>를 사용하며, SpaceX Raptor·Blue Origin BE-4와 같은 계열의 연료 조합입니다.</p>
<p>Rocket Lab은 <span class="hl-warn">2017년</span> Electron 첫 발사 이후 소형 위성 전용 발사 시장에서 빠르게 성장했습니다. <span class="hl-good">Electron은 60회 이상의 비행을 통해 높은 발사 성공률을 쌓은</span> 소형 발사체입니다. Rocket Lab이 Neutron 개발에 나선 배경에는 소형 발사만으로는 성장에 한계가 있고, 대형 위성 군집 발사 수요가 급증하고 있다는 시장 판단이 있습니다. 뉴질랜드와 버지니아에 발사장을 보유하고 있으며, Neutron은 버지니아 왈롭스에서 발사될 예정입니다.</p>
<p>중형 재사용 발사체 시장에서 Neutron이 갖는 의미는 SpaceX Falcon 9에 대한 대안 공급자 역할입니다. 현재 중형 발사 시장은 Falcon 9이 압도적 점유율을 보이며, 국가안보 발사 분야에서도 SpaceX 의존도가 높아지고 있습니다. Neutron이 경쟁력 있는 단가와 발사 빈도를 확보한다면, 위성 군집 운영사와 정부 기관에게 <span class="hl">공급망 다변화</span> 선택지를 제공할 수 있습니다.</p>
<p>앞으로 주목할 점은 Archimedes 엔진의 추가 시험 결과, 1단 재사용 착륙 기술 검증 계획, 그리고 실제 첫 비행 일정입니다. 첫 비행 목표 시점은 공식 발표 기준으로 확인이 필요하며, 발사체 개발 특성상 일정이 조정될 수 있습니다. Rocket Lab이 <span class="hl">Electron과 Neutron</span>을 동시 운용하는 복합 발사 서비스 기업으로 어떻게 자리잡을지가 중형 발사 시장의 향후 경쟁 지형을 좌우하는 변수입니다.</p>`,
    image: { url: '', alt: '', caption: '', credit: '', license: '', sourceUrl: '' }
  }
];
