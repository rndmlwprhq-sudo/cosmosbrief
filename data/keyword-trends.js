/**
 * COSMOS BRIEF — 글로벌 우주 키워드 트렌드 데이터
 * 최종 업데이트: 2026-05-01
 *
 * ⚠️  중요: 이 파일의 모든 keyword mentionCount / articleCount / trendScore / rank 값은
 *     현재 null입니다. 실제 뉴스 수집 파이프라인이 완성되기 전까지 임의의 숫자를
 *     생성하지 않습니다.
 *
 * 데이터 수집 파이프라인 미완성 상태 — 실제 값은 파이프라인 구축 후 업데이트 예정.
 */

window.KEYWORD_TRENDS = {
  analysisDate: "2026-05-01",
  periodStart:  "2026-04-09",
  periodEnd:    "2026-05-01",

  /* 수집 방법 */
  method: "manual_sample",

  /* 데이터 수집 소스 목록 */
  dataSources: [
    {
      name: "SpaceNews",
      url: "https://spacenews.com/",
      type: "media",
      status: "sampled_manually",
      note: "2026.04~05 주요 기사 제목 수동 확인"
    },
    {
      name: "NASA News",
      url: "https://www.nasa.gov/news/",
      type: "official",
      status: "sampled_manually",
      note: "NASA 뉴스룸 헤드라인 수동 확인"
    },
    {
      name: "ESA Newsroom",
      url: "https://www.esa.int/Newsroom",
      type: "official",
      status: "sampled_manually",
      note: "ESA 보도자료 수동 확인"
    },
    {
      name: "CNSA / 中国航天",
      url: "https://www.cnsa.gov.cn/",
      type: "official",
      status: "not_collected",
      note: "자동화 수집 파이프라인 미구축"
    },
    {
      name: "JAXA Topics",
      url: "https://www.jaxa.jp/topics/",
      type: "official",
      status: "not_collected",
      note: "자동화 수집 파이프라인 미구축"
    },
    {
      name: "ArXiv astro-ph",
      url: "https://arxiv.org/list/astro-ph/recent",
      type: "academic",
      status: "not_collected",
      note: "논문 키워드 수집 파이프라인 미구축"
    }
  ],

  /* 검색 쿼리 (향후 파이프라인 구축 시 사용 예정) */
  query: "(space OR astronomy OR NASA OR ESA OR CNSA OR JAXA OR ISRO OR satellite OR rocket OR Moon OR Mars OR asteroid OR telescope OR orbit OR spacecraft) lang:ko OR lang:en",
  languageScope: ["en", "ko"],

  /* ⚠️  수집된 실제 기사 수치 없음 — 파이프라인 미완성 */
  articleCountTotal: null,
  deduplicatedArticleCount: null,

  note: "자동화 뉴스 수집 파이프라인이 아직 구축되지 않았습니다. 현재 모든 키워드 수치(mentionCount, articleCount, trendScore, rank)는 수집되지 않은 상태(null)입니다. 임의 수치를 생성하지 않습니다. 실제 데이터 수집 후 이 파일을 업데이트할 예정입니다.",

  /* 키워드 목록 — 실제 수치는 파이프라인 완성 후 업데이트 */
  keywords: [
    {
      keyword: "아르테미스",
      aliases: ["Artemis", "아르테미스 프로그램", "Artemis Program"],
      mentionCount: null,
      articleCount: null,
      trendScore: null,
      rank: null,
      confidence: "not_collected_yet",
      explanation: "NASA 아르테미스 유인 달 탐사 프로그램. 2026년 4월 아르테미스 II 성공으로 전 세계적 관심 증가 예상."
    },
    {
      keyword: "달 탐사",
      aliases: ["달탐사", "Lunar exploration", "Moon exploration", "lunar mission"],
      mentionCount: null,
      articleCount: null,
      trendScore: null,
      rank: null,
      confidence: "not_collected_yet",
      explanation: "달 자원 탐사 및 유인 착륙 관련 키워드. NASA 문베이스 발표, 창어 7호, DARPA LASSO 등 관련 뉴스 다수."
    },
    {
      keyword: "스타십",
      aliases: ["Starship", "SpaceX Starship", "IFT", "Integrated Flight Test"],
      mentionCount: null,
      articleCount: null,
      trendScore: null,
      rank: null,
      confidence: "not_collected_yet",
      explanation: "SpaceX 완전 재사용 초대형 발사체. IFT-8 성공(2026.03) 및 HLS 달 착륙선 개발 관련 뉴스."
    },
    {
      keyword: "우주잔해",
      aliases: ["space debris", "orbital debris", "케슬러 신드롬", "Kessler Syndrome"],
      mentionCount: null,
      articleCount: null,
      trendScore: null,
      rank: null,
      confidence: "not_collected_yet",
      explanation: "ESA 우주잔해 경고 보고서(2026.04) 발표 이후 관련 논의 증가 예상."
    },
    {
      keyword: "위성군집",
      aliases: ["satellite constellation", "메가 컨스텔레이션", "mega-constellation", "Starlink", "Amazon Leo", "Project Kuiper"],
      mentionCount: null,
      articleCount: null,
      trendScore: null,
      rank: null,
      confidence: "not_collected_yet",
      explanation: "스타링크 v3, Amazon Leo 등 대형 위성군집 관련 뉴스. 2026년 LEO 혼잡도 이슈와 연계."
    },
    {
      keyword: "외계행성",
      aliases: ["exoplanet", "exo-planet", "K2-18b", "바이오시그니처", "biosignature", "55 Cancri e"],
      mentionCount: null,
      articleCount: null,
      trendScore: null,
      rank: null,
      confidence: "not_collected_yet",
      explanation: "JWST 외계행성 대기 관측 연구 결과 지속 발표 중."
    },
    {
      keyword: "화성 탐사",
      aliases: ["Mars exploration", "Mars Sample Return", "MSR", "Perseverance", "퍼서비어런스"],
      mentionCount: null,
      articleCount: null,
      trendScore: null,
      rank: null,
      confidence: "not_collected_yet",
      explanation: "NASA/ESA 화성 샘플 귀환(MSR) 재설계 승인 및 관련 뉴스."
    },
    {
      keyword: "우주 태양광",
      aliases: ["space solar power", "우주태양광발전", "SSPIDR", "SPS"],
      mentionCount: null,
      articleCount: null,
      trendScore: null,
      rank: null,
      confidence: "not_collected_yet",
      explanation: "다양한 국가 및 기관에서 추진 중인 우주 태양광 발전 개발 동향."
    },
    {
      keyword: "달 자원 활용",
      aliases: ["ISRU", "In-Situ Resource Utilization", "달 물 얼음", "lunar water ice", "달 헬륨3"],
      mentionCount: null,
      articleCount: null,
      trendScore: null,
      rank: null,
      confidence: "not_collected_yet",
      explanation: "달 남극 물 얼음 탐사 및 현지 자원 활용 기술 개발 관련 키워드."
    },
    {
      keyword: "소형 위성",
      aliases: ["smallsat", "CubeSat", "큐브위성", "나노위성", "nanosat"],
      mentionCount: null,
      articleCount: null,
      trendScore: null,
      rank: null,
      confidence: "not_collected_yet",
      explanation: "소형·초소형 위성 기술 발전과 관련 시장 성장 동향."
    },
    {
      keyword: "재사용 발사체",
      aliases: ["reusable rocket", "reusable launch vehicle", "RLV", "New Glenn", "Neutron"],
      mentionCount: null,
      articleCount: null,
      trendScore: null,
      rank: null,
      confidence: "not_collected_yet",
      explanation: "스타십, 뉴 글렌, Neutron 등 재사용 발사체 개발 및 운용 동향."
    },
    {
      keyword: "아르테미스 협정",
      aliases: ["Artemis Accords", "아르테미스 어코즈"],
      mentionCount: null,
      articleCount: null,
      trendScore: null,
      rank: null,
      confidence: "not_collected_yet",
      explanation: "2026년 4~5월 라트비아, 요르단, 모로코 등 잇달아 서명. 총 64개국. 달 탐사 국제 협력 프레임워크."
    },
    {
      keyword: "ISS 퇴역",
      aliases: ["ISS deorbit", "국제우주정거장 퇴역", "ISS retirement", "우주정거장", "commercial space station"],
      mentionCount: null,
      articleCount: null,
      trendScore: null,
      rank: null,
      confidence: "not_collected_yet",
      explanation: "ISS 2030년 퇴역 계획 및 민간 후속 우주정거장 개발 관련 논의."
    },
    {
      keyword: "James Webb 우주망원경",
      aliases: ["JWST", "Webb telescope", "제임스웹", "James Webb Space Telescope"],
      mentionCount: null,
      articleCount: null,
      trendScore: null,
      rank: null,
      confidence: "not_collected_yet",
      explanation: "JWST의 외계행성 대기 및 초기 우주 관측 결과 지속 발표 중."
    },
    {
      keyword: "CLPS",
      aliases: ["Commercial Lunar Payload Services", "달 착륙선", "Intuitive Machines", "Firefly", "Astrobotic", "Blue Origin Blue Moon"],
      mentionCount: null,
      articleCount: null,
      trendScore: null,
      rank: null,
      confidence: "not_collected_yet",
      explanation: "NASA CLPS 계약 상한 $4.2B으로 증가(2026.05.01). 달 월별 착륙 목표 향해 가속화 중."
    }
  ],

  /* 방법론 (수집 파이프라인 완성 후 업데이트 예정) */
  methodology: {
    collectionMethod: "미구축 — 수동 샘플링으로 키워드 목록만 작성. 실제 count 값은 null.",
    deduplication: "미구축",
    keywordExtraction: "미구축 — 향후 TF-IDF 또는 KeyBERT 기반 추출 예정",
    synonymMerge: "수동 aliases 배열로 관리",
    scoring: "미구축 — 향후 mention빈도 + 기사 수 + 최근성 가중 점수 예정",
    limitations: [
      "현재 자동화 수집 파이프라인 없음 — 모든 count는 null",
      "키워드 목록은 편집자 판단 기반 수동 작성",
      "영문/한글 동의어 병합이 불완전할 수 있음",
      "중국어 소스(CNSA 등) 미수집",
      "학술 논문(arXiv) 미수집"
    ]
  }
};
