/* ===================================================
   COSMOS BRIEF - Star Canvas & Interactive JS
   =================================================== */

/* ---- Star Canvas Background ---- */
(function initStarCanvas() {
  const canvas = document.getElementById('star-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, stars = [], animId;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randBetween(a, b) { return a + Math.random() * (b - a); }

  function createStars(n) {
    stars = [];
    for (let i = 0; i < n; i++) {
      stars.push({
        x: randBetween(0, W),
        y: randBetween(0, H),
        r: randBetween(0.3, 1.8),
        alpha: randBetween(0.2, 0.9),
        speed: randBetween(0.0003, 0.002),
        phase: randBetween(0, Math.PI * 2),
        color: Math.random() > 0.85 ? '#b3c8ff' : (Math.random() > 0.6 ? '#ccddff' : '#ffffff')
      });
    }
  }

  function drawStars(t) {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      const alpha = s.alpha * (0.5 + 0.5 * Math.sin(s.phase + t * s.speed * 1000));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.globalAlpha = alpha;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  function loop(t) {
    drawStars(t);
    animId = requestAnimationFrame(loop);
  }

  resize();
  createStars(Math.floor(W * H / 4000));
  loop(0);

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animId);
    resize();
    createStars(Math.floor(W * H / 4000));
    loop(0);
  });
})();

/* ---- Navbar scroll effect ---- */
(function navScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
})();

/* ---- Scroll reveal ---- */
(function scrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  targets.forEach(t => io.observe(t));
})();

/* ---- Keyword bar animation ---- */
(function animateKeywordBars() {
  const bars = document.querySelectorAll('.keyword-bar-fill');
  if (!bars.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = e.target.getAttribute('data-width') || e.target.style.width;
        e.target.style.width = '0%';
        requestAnimationFrame(() => {
          setTimeout(() => { e.target.style.width = target; }, 50);
        });
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => {
    b.setAttribute('data-width', b.style.width || window.getComputedStyle(b).width);
    io.observe(b);
  });
})();

/* ---- Difficulty filter (Knowledge page) ---- */
(function difficultyFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.knowledge-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const level = btn.dataset.filter;
      cards.forEach(card => {
        if (level === 'all' || card.dataset.difficulty === level) {
          card.style.display = '';
          card.style.animation = 'fadeInUp 0.4s ease both';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
})();

/* ---- Topic tabs ---- */
(function topicTabs() {
  const tabs = document.querySelectorAll('.topic-tab');
  if (!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
})();

/* ---- Source pill filter (Trends page) ---- */
(function sourcePills() {
  const pills = document.querySelectorAll('.source-pill');
  if (!pills.length) return;
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });
})();

/* ---- Article card click -> Modal ---- */
(function articleModal() {
  const overlay = document.getElementById('article-modal');
  if (!overlay) return;

  const closeBtn = overlay.querySelector('.modal-close');
  function openModal(data) {
    overlay.querySelector('#modal-tags').innerHTML = (data.tags || []).map(t => `<span class="article-tag tag-${t.cls}">${t.label}</span>`).join('');
    overlay.querySelector('#modal-title').textContent = data.title;
    overlay.querySelector('#modal-source').textContent = data.source;
    overlay.querySelector('#modal-date').textContent = data.date;
    overlay.querySelector('#modal-body').innerHTML = data.body;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-article]').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.article;
      const data = ARTICLE_DATA[key];
      if (data) openModal(data);
    });
  });
})();

/* ---- Animated counter for hero stats ---- */
(function animateCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const duration = 1500;
      const start = performance.now();
      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = (Number.isInteger(target) ? Math.round(ease * target) : (ease * target).toFixed(1)) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => io.observe(c));
})();

/* ---- Mobile menu ---- */
(function mobileMenu() {
  const toggle = document.querySelector('.nav-mobile-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
    links.style.flexDirection = 'column';
    links.style.position = 'absolute';
    links.style.top = '70px';
    links.style.left = '0';
    links.style.right = '0';
    links.style.background = 'rgba(3,6,15,0.98)';
    links.style.padding = '1rem 2rem';
    links.style.borderBottom = '1px solid rgba(79,142,247,0.15)';
  });
})();

/* ============================================
   KNOWLEDGE ARTICLES
   itemId → { title, tags, readTime, difficulty, date, body }
   ============================================ */
const KNOWLEDGE_ARTICLES = {

  /* ── 태양계 개요 ── */
  'solar-overview': {
    title: '태양계 개요 — 우리의 우주적 집',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '8', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>지금 이 순간, 우리는 우주 공간 어딘가를 여행하고 있어요. 초속 약 <span class="hl">30km</span>로 태양 주위를 도는 지구에 올라타서요. 그리고 그 태양도 우리 은하 중심을 향해 초속 <span class="hl">220km</span>로 달려가고 있죠. 우리가 가만히 앉아있는 것처럼 느껴지지만, 우주적 관점에서는 엄청난 속도로 이동 중이에요.</p>

      <div class="callout"><span class="callout-icon">🌌 태양계의 구성</span>태양(1개) + 행성(8개) + 왜소행성(수십 개) + 소행성(100만 개 이상) + 혜성(수백만 개 이상) + 성간 먼지와 가스 — 이 모든 것이 <span class="hl-gold">태양의 중력 아래 묶여 있어요.</span></div>

      <p>태양계는 약 <span class="hl">46억 년 전</span>, 거대한 성간 가스와 먼지 구름이 중력에 의해 수축하면서 형성됐어요. 수축 과정에서 회전이 시작되고, 원반 모양으로 납작해졌죠. 가운데 모인 질량이 태양이 됐고, 나머지 부분에서 행성들이 뭉쳐서 만들어졌어요.</p>

      <p>8개 행성은 두 그룹으로 나눌 수 있어요. 태양에 가까운 <span class="hl">암석형 행성</span>(수성, 금성, 지구, 화성)과 멀리 있는 <span class="hl-gold">가스 거인</span>(목성, 토성, 천왕성, 해왕성)이에요. 암석형 행성은 단단하고 작고 밀도가 높아요. 가스 거인은 엄청나게 크지만 대부분 기체나 얼음으로 이루어져 있죠.</p>

      <div class="callout"><span class="callout-icon">📏 태양계의 크기</span>만약 태양을 농구공(약 24cm) 크기로 줄이면, 지구는 2mm짜리 구슬이고 태양에서 <span class="hl">약 26m</span> 떨어진 곳에 있어요. 명왕성은 1km 이상 떨어진 곳에 있는 작은 모래알이에요. 태양계는 정말 거의 대부분이 빈 공간이에요.</div>

      <p>행성 너머에는 <span class="hl">카이퍼 벨트</span>(해왕성 궤도 밖, 얼음 천체들의 집), 그리고 가장 바깥쪽에는 <span class="hl">오르트 구름</span>(혜성의 고향, 태양에서 최대 1광년 거리)이 있어요. 오르트 구름까지 포함하면 태양계의 영향권은 실로 어마어마하죠.</p>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>우리가 사는 이 작은 행성은 우주의 광대함 속에서 한 알의 티끌에 불과해요. 하지만 <span class="hl-gold">이 티끌 위에서 우주를 이해하려는 인류</span>의 호기심과 탐구심은, 그 어떤 별보다 밝게 빛납니다.</p></div>
    `
  },

  /* ── 태양 ── */
  'sun': {
    title: '태양 — 생명을 주는 별, 그리고 언젠가 죽는 별',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '9', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>지금 이 순간 태양 중심에서는 <span class="hl">매초 6억 2000만 톤의 수소</span>가 헬륨으로 바뀌고 있어요. 이 과정에서 태양 질량의 약 0.7%가 에너지로 변환되고 — 바로 그 에너지가 지구로 날아와 식물을 자라게 하고, 우리 피부를 따뜻하게 해요. 지금 당신이 느끼는 온기가 바로 핵융합의 결과예요.</p>

      <div class="callout"><span class="callout-icon">☀️ 태양 기본 정보</span>지름: 지구의 <span class="hl">109배</span> (약 139만 km) · 질량: 태양계 전체의 <span class="hl-gold">99.86%</span> · 표면 온도: 5,500°C · 중심 온도: 약 1500만°C · 나이: 약 46억 년 · 수명: 약 100억 년 (앞으로 50억 년 남음)</div>

      <p>태양의 에너지는 중심부에서 만들어져 표면까지 전달되는 데 약 <span class="hl">10만 년</span>이 걸려요. 그렇게 표면에 도달한 빛이 지구까지 날아오는 데는 단 <span class="hl">8분 20초</span>. 즉 지금 당신이 보는 태양빛은 10만 년 전에 만들어진 에너지예요.</p>

      <p>태양 표면에는 흑점, 홍염, 플레어 같은 활동이 있어요. 특히 <span class="hl">태양 플레어(Solar Flare)</span>가 크게 발생하면 강력한 입자들이 지구로 쏟아져 위성 통신을 방해하고 오로라를 만들죠. 이 '우주 날씨'는 우리 일상과 점점 더 깊이 연결되어 있어요.</p>

      <div class="callout"><span class="callout-icon">🔴 태양의 미래</span>약 50억 년 후, 태양은 수소를 다 소진하고 <span class="hl">적색거성</span>으로 부풀어 올라요. 그 크기가 지금의 100~200배 — 지구 궤도까지 팽창할 가능성이 있어요. 그 후 외층은 <span class="hl-gold">행성상 성운</span>으로 흩어지고, 중심엔 <span class="hl">백색왜성</span>이 남을 거예요.</div>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>태양도 언젠가 죽어요. 50억 년이라는 시간이 너무 멀게 느껴지지만 — 사실 우주의 나이(138억 년) 관점에서 보면 얼마 남지 않았어요. 모든 빛나는 것들이 그렇듯, 태양도 <span class="hl-gold">유한하기 때문에 아름다운지도 몰라요.</span></p></div>
    `
  },

  /* ── 화성 ── */
  'mars': {
    title: '화성 — 인류가 100년 뒤 이민 갈 붉은 행성',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '10', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>화성은 왜 붉게 보일까요? 표면 전체가 <span class="hl">산화철(녹)</span>로 덮여 있기 때문이에요. 즉, 화성 전체가 녹슨 행성이에요. 이 붉은 색이 고대인들에게는 피의 색, 전쟁의 색으로 보였고, 그래서 <span class="hl-gold">전쟁의 신 마르스(Mars)</span>의 이름을 붙였죠.</p>

      <div class="callout"><span class="callout-icon">🔴 화성 기본 정보</span>지름: 지구의 약 <span class="hl">53%</span> · 하루: 24시간 37분 · 1년: 지구의 687일 · 표면 온도: -125°C ~ +20°C · 대기압: 지구의 <span class="hl-gold">0.6%</span> (거의 진공) · 위성: 포보스, 디모스</div>

      <p>화성에는 태양계 최대의 화산 <span class="hl">올림푸스 몬스(Olympus Mons)</span>가 있어요. 높이가 무려 21km — 에베레스트의 2.5배예요. 그리고 태양계 최대의 협곡 <span class="hl">발레스 마리네리스(Valles Marineris)</span>도 있는데, 길이가 4,000km로 미국 대륙 너비와 비슷해요.</p>

      <p>무엇보다 흥미로운 건 화성의 <span class="hl">과거</span>예요. 30억~40억 년 전에는 강이 흐르고, 바다가 있었다는 증거가 쌓이고 있어요. 지금도 극지방에는 <span class="hl-gold">드라이아이스와 물 얼음</span>이 있고, 지하에도 물이 있을 가능성이 있죠. 물이 있다면 — 과거나 현재에 생명체가 있었을 가능성도 완전히 배제할 수 없어요.</p>

      <div class="callout"><span class="callout-icon">🚀 현재 화성 탐사</span>현재 화성에서 활동 중인 탐사 로버는 NASA의 <span class="hl">퍼서비어런스(Perseverance)</span>예요. 암석 샘플을 채취하고 있으며, 2030년대에 지구로 가져올 계획이에요. 또 소형 헬리콥터 <span class="hl-gold">인지뉴어티(Ingenuity)</span>는 화성에서 처음으로 비행한 항공기가 됐어요.</div>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>일론 머스크는 2050년까지 화성에 100만 명을 정착시키겠다고 해요. 터무니없어 보이지만, 100년 전 사람들은 달을 밟는 것도 불가능하다고 했죠. <span class="hl-gold">인류의 이야기는 언제나 불가능해 보이는 꿈에서 시작했어요.</span></p></div>
    `
  },

  /* ── 항성 ── */
  'star': {
    title: '항성 — 스스로 빛나는 우주의 등불들',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '9', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>밤하늘에 빛나는 별들은 모두 '항성(恒星)'이에요 — 스스로 핵융합을 통해 에너지를 만들어 빛을 내는 거대한 가스 덩어리죠. 우리 태양도 항성이에요. 일반적으로 태양은 평범한 별 중 하나지만, 우리에겐 물론 <span class="hl-gold">우주에서 가장 소중한 별</span>이에요.</p>

      <div class="callout"><span class="callout-icon">⭐ 항성의 분류 (OBAFGKM)</span>천문학자들은 별 표면 온도에 따라 분류해요: <span class="hl">O형(파란색, 3만°C+)</span> → B → A → F → G → K → <span class="hl-gold">M형(적색, 3천°C)</span>. 우리 태양은 <span class="hl">G형</span>이에요. 기억법: "Oh Be A Fine Girl, Kiss Me!"</div>

      <p>별들의 일생을 살펴보면 흥미로워요. 모든 별은 <span class="hl">성운</span>(가스와 먼지 구름)에서 태어나요. 질량에 따라 운명이 달라지는데 — 태양 질량의 별은 적색거성이 된 후 <span class="hl">백색왜성</span>으로 조용히 마무리해요. 반면 태양 질량의 8배 이상인 별은 초신성 폭발 후 <span class="hl-gold">중성자별</span>이나 <span class="hl-gold">블랙홀</span>이 돼요.</p>

      <p>별의 색깔이 온도를 나타낸다는 사실도 알고 계셨나요? <span class="hl">파란 별</span>이 가장 뜨겁고(30,000°C 이상), <span class="hl">빨간 별</span>이 가장 차가워요(3,000°C 정도). 사람 눈으로도 별 색깔을 구별할 수 있어요 — 겨울밤 오리온자리의 베텔게우스(붉은색)와 리겔(파란색)을 비교해보세요!</p>

      <div class="callout"><span class="callout-icon">💀 별의 죽음이 우리를 만들었어요</span>인간 몸속의 철, 칼슘, 산소 등 탄소보다 무거운 원소들은 모두 <span class="hl">초신성 폭발</span>에서 만들어진 거예요. 우리는 문자 그대로 <span class="hl-gold">별의 무덤에서 태어난 존재</span>예요. 천문학자 칼 세이건이 말했죠: "우리는 별의 물질로 만들어졌다(We are made of star stuff)".</div>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>밤하늘의 별을 올려다볼 때, 그 빛들은 수십에서 수천 년 전에 출발한 빛이에요. <span class="hl-gold">과거의 빛이 지금 당신의 눈에 닿는 순간</span>, 그 별의 역사 전체가 당신에게로 와 닿는 거예요.</p></div>
    `
  },

  /* ── 은하 ── */
  'galaxy': {
    title: '은하 — 수천억 별들의 도시, 우리는 어디에 사나?',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '10', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>우리 은하 '밀키웨이(Milky Way)'는 <span class="hl">약 3000억 개의 별</span>로 이루어진 거대한 나선 은하예요. 지름은 약 10만 광년 — 빛의 속도로 달려도 10만 년이 걸리는 거리예요. 우리 태양은 이 거대한 원반 가장자리 근처, 중심에서 약 <span class="hl">2만 6000광년</span> 떨어진 곳에 있어요.</p>

      <div class="callout"><span class="callout-icon">🌌 은하의 종류</span><span class="hl">나선 은하</span>(우리 은하처럼 팔이 나선형으로 뻗음) · <span class="hl">타원 은하</span>(공 모양, 오래된 별만 있음) · <span class="hl-gold">불규칙 은하</span>(형태가 없음, 충돌 영향 받은 경우 많음). 관측 가능한 우주에는 이런 은하가 약 <span class="hl">2조 개</span>!</div>

      <p>우리 은하 중심부에는 <span class="hl">태양 질량의 400만 배</span>에 달하는 초질량 블랙홀 '궁수자리 A*'가 있어요. 2022년 인류는 처음으로 이 블랙홀의 이미지를 포착했죠. 엄청난 질량 때문에 주변 별들의 공전에 영향을 미쳐 그 존재를 알 수 있었어요.</p>

      <p>우리 은하는 혼자가 아니에요. 안드로메다 은하, 마젤란 성운 등과 함께 <span class="hl">국부 은하군(Local Group)</span>을 형성하고 있어요. 약 <span class="hl-gold">45억 년 후</span>에는 우리 은하와 안드로메다 은하가 충돌할 예정이에요. 하지만 두 은하는 대부분 빈 공간이라 별끼리의 직접 충돌 확률은 매우 낮아요.</p>

      <div class="callout"><span class="callout-icon">📸 역사적인 사진</span>2022년 EHT(Event Horizon Telescope) 팀이 공개한 '궁수자리 A*' 블랙홀 이미지는 전 세계를 뒤흔들었어요. 우리 은하 중심의 블랙홀을 <span class="hl">직접 시각적으로 확인</span>한 첫 번째 사건이었죠. 지구 곳곳에 설치된 8개 전파 망원경을 하나처럼 연결해서 달걀 하나를 볼 수 있을 만큼의 <span class="hl-gold">초고해상도</span>를 만들어냈어요.</div>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>2조 개의 은하, 각각 3000억 개의 별 — 이 숫자는 인간의 뇌가 진정으로 이해하기 어려운 스케일이에요. 하지만 그 광대한 우주 안에서 <span class="hl-gold">호기심 하나로 별을 세고 싶어 하는 인간</span>이 있다는 것도, 어쩌면 우주에서 가장 경이로운 사실일지 몰라요.</p></div>
    `
  },

  /* ── 망원경의 역사 ── */
  'telescope-history': {
    title: '망원경의 역사 — 갈릴레오부터 제임스 웹까지',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '11', difficulty: '⭐⭐ 중급', date: '2026년',
    body: `
      <p>1609년 어느 날, 갈릴레오 갈릴레이는 손수 만든 망원경을 밤하늘로 향했어요. 그가 본 것은 충격이었죠 — 달에는 완벽한 구 모양이 아닌 <span class="hl">산과 계곡</span>이 있었고, 목성에는 <span class="hl-gold">4개의 위성</span>이 공전하고 있었어요. 이 관찰 하나가 "지구가 우주의 중심"이라는 수천 년의 믿음을 무너뜨리기 시작했어요.</p>

      <div class="callout"><span class="callout-icon">🔭 망원경의 종류</span><span class="hl">굴절 망원경</span>(렌즈로 빛을 모음, 갈릴레오가 사용) · <span class="hl">반사 망원경</span>(거울로 빛을 반사, 뉴턴이 발명, 현대 대형 망원경의 기본) · <span class="hl-gold">전파 망원경</span>(가시광선 외 전파를 관측, 블랙홀 이미지에 사용) · 적외선·X선 망원경 등</div>

      <p>1990년 발사된 <span class="hl">허블 우주 망원경</span>은 지구 대기 밖에서 촬영하는 최초의 대형 우주망원경이에요. 발사 후 거울 제작 오류로 흐릿한 사진을 찍어 실망을 안겼지만, 1993년 우주 비행사들이 직접 수리했어요 — 마치 안경을 씌워주듯이요. 이후 허블은 <span class="hl-gold">수십억 광년 밖 은하 사진</span>을 보내오며 인류의 우주관을 바꿨어요.</p>

      <p>2021년 발사된 <span class="hl">제임스 웹 우주망원경(JWST)</span>은 허블의 후계자예요. 주경 지름이 6.5m — 허블(2.4m)의 2.7배예요. 적외선 관측에 특화되어 있어 우주 초기, <span class="hl">빅뱅 이후 수억 년 내의 최초 은하</span>를 관측할 수 있어요. 2022년 첫 이미지 공개 때 전 세계가 놀랐죠.</p>

      <div class="callout"><span class="callout-icon">🌟 다음 단계: 로먼 우주망원경</span>2026년 발사 예정인 <span class="hl">낸시 그레이스 로먼 우주망원경</span>은 허블과 같은 2.4m 거울을 가지지만 시야각이 <span class="hl-gold">100배</span>예요. 허블이 맞춤정장이라면, 로먼은 광각 드론 카메라예요. 단 한 번의 노출로 허블 수천 장 분량을 찍을 수 있어요.</div>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>갈릴레오는 종교재판을 받으면서도 진실을 포기하지 않았어요. 그로부터 400년이 지난 지금, 우리는 138억 광년 밖을 보고 있어요. <span class="hl-gold">인류의 시야는 멈추지 않았어요</span> — 그리고 앞으로도.</p></div>
    `
  },

  /* ── 외계생명체 ── */
  'alien': {
    title: '외계생명체 찾기 — 우리는 우주에서 혼자일까?',
    tags: [{ cls: 'intermediate', label: '⭐⭐ 중급' }],
    readTime: '10', difficulty: '⭐⭐ 중급', date: '2026년',
    body: `
      <p>1950년, 물리학자 엔리코 페르미가 점심을 먹다가 이런 말을 했어요. "그래서, 다들 어디 있는 거야?(But where is everybody?)" — 우주가 이렇게 광대하고 별이 이렇게 많다면, 외계 문명들은 왜 아직 연락이 없는 걸까요? 이것이 바로 <span class="hl">페르미 역설(Fermi Paradox)</span>이에요.</p>

      <div class="callout"><span class="callout-icon">🧮 드레이크 방정식</span>1961년 천문학자 프랭크 드레이크는 우리 은하 내 교신 가능한 문명 수를 추정하는 공식을 만들었어요. 낙관적으로 계산하면 수만~수백만 개의 문명이, 비관적으로 계산하면 우리만 있을 수도 있어요. 방정식 자체보다 <span class="hl-gold">무엇을 모르는지 명확히 해주는 도구</span>로서 가치가 있어요.</div>

      <p>현재 가장 유력한 외계생명체 후보지는 어디일까요? 놀랍게도 우리 태양계 안에도 있어요. 목성의 위성 <span class="hl">유로파(Europa)</span>는 얼음 지각 아래 광대한 액체 바다가 있고, 토성의 위성 <span class="hl-gold">엔셀라두스(Enceladus)</span>는 바다에서 수증기와 유기물을 우주로 뿜어내고 있어요. 생명에 필요한 조건인 '물 + 에너지 + 유기물'이 모두 있죠.</p>

      <p>1977년 오하이오주립대 전파망원경이 포착한 <span class="hl">'와우! 신호(Wow! Signal)'</span>는 아직도 미스터리예요. 72초 동안 잡힌 강력한 전파 신호는 그 이후 다시는 나타나지 않았어요. 자연 현상인지, 외계 문명의 신호인지 확인되지 않은 채로 남아 있죠.</p>

      <div class="callout"><span class="callout-icon">🔭 현재 SETI 활동</span><span class="hl">SETI(Search for Extra-Terrestrial Intelligence)</span> 연구소와 NASA는 지금도 외계 문명을 탐색하고 있어요. 제임스 웹 망원경은 외계행성 대기에서 <span class="hl-gold">산소나 메탄 같은 생명 징표</span>를 찾을 수 있을 정도로 정밀해요. 2025년 이후 발표될 결과가 기대됩니다.</div>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>만약 우리가 정말로 우주에서 유일한 지적 생명체라면? 그것은 굉장히 외로운 사실이에요. 하지만 반대로 — <span class="hl-gold">이 광대한 우주를 이해하려는 책임이 우리에게만 있다는 뜻</span>이기도 해요. 그건 어쩌면 굉장히 경이로운 사명 아닐까요?</p></div>
    `
  },

  /* ── 위대한 천문학자들 ── */
  'famous-astronomers': {
    title: '위대한 천문학자들 — 코페르니쿠스부터 호킹까지',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '10', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>"그래도 지구는 돈다(E pur si muove)." 갈릴레오 갈릴레이의 이 말은 실제로 그가 종교재판 후 했다는 전설이지만, 그 정신은 진짜예요 — <span class="hl">진리 앞에서는 권위에 굴복하지 않는다</span>는 정신. 천문학의 역사는 이런 불굴의 인물들로 가득해요.</p>

      <div class="callout"><span class="callout-icon">📜 시대를 바꾼 인물들</span>
        <strong>코페르니쿠스(1473–1543)</strong> — 지동설 이론 정립 · <strong>갈릴레오(1564–1642)</strong> — 망원경 관측으로 지동설 증명 시작 · <strong>케플러(1571–1630)</strong> — 행성 운동 3법칙 · <strong>뉴턴(1643–1727)</strong> — 만유인력 법칙으로 천체운동 통합 · <strong>허블(1889–1953)</strong> — 우주 팽창 발견 · <strong>호킹(1942–2018)</strong> — 블랙홀 이론, 호킹 복사</div>

      <p>에드윈 허블은 1929년 은하들이 우리에게서 <span class="hl">멀어지고 있다</span>는 걸 발견했어요. 더 멀리 있을수록 더 빠르게 멀어지죠. 이것이 <span class="hl-gold">우주 팽창의 증거</span>이며, 역으로 추산하면 약 138억 년 전 모든 것이 한 점에서 시작됐다는 — 빅뱅 이론의 관측적 기초가 됐어요.</p>

      <p>루게릭병으로 전신이 마비된 <span class="hl">스티븐 호킹</span>은 어떻게요? 그는 뺨 근육 하나로 컴퓨터를 제어하며 블랙홀, 시간, 빅뱅 등 우주의 근본 질문들을 평생 탐구했어요. 물리적 한계가 지적 한계가 아님을 온 몸으로 보여준 사람이에요.</p>

      <div class="callout"><span class="callout-icon">👩‍🔬 숨겨진 영웅들</span><span class="hl">헨리에타 레빗</span>은 세페이드 변광성으로 우주 거리 측정법을 발견했고, <span class="hl">세실리아 페인</span>은 별이 주로 수소로 이루어졌다는 걸 밝혔어요. 하지만 오랫동안 인정받지 못했죠. <span class="hl-gold">숨겨진 기여자들의 발굴도 과학사의 중요한 역할이에요.</span></div>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>코페르니쿠스부터 호킹까지, 그들이 공통으로 가진 것은 <span class="hl-gold">'모른다는 용기'</span>였어요. 당연하게 여겨진 것들에 의문을 품고, 틀릴 수도 있다는 두려움을 이기고 나아간 사람들 — 과학은 그 용기의 축적이에요.</p></div>
    `
  }

};

/* ============================================
   KNOWLEDGE HUB DATA
   카테고리 → 소주제 → 티저 → 글
   ============================================ */
const KNOWLEDGE_HUB = [
  {
    id: "solar",
    name: "태양계",
    icon: "☀️",
    cls: "hub-solar",
    desc: "우리가 살고 있는 우주의 집",
    count: "16개 주제",
    items: [
      { id: "solar-overview", icon: "🌌", name: "태양계 개요", preview: "태양계는 어떻게 생겼을까?",
        teaser: "우리 태양계는 수십억 년 전 거대한 <span class='hook-highlight'>성간 가스 구름</span>이 중력으로 뭉쳐 탄생했어요. 태양 하나와 행성 8개, 수백만 개의 소행성과 혜성으로 이루어진 이 거대한 시스템 — <span class='hook-gold'>우리는 그 안에 있어요.</span>" },
      { id: "sun", icon: "☀️", name: "태양", preview: "지구에서 1억 5천만 km 떨어진 별",
        teaser: "지금 이 순간에도 태양 중심에서는 <span class='hook-highlight'>매초 6억 톤의 수소가 헬륨으로 변환</span>되고 있어요. 그 에너지가 지구까지 닿는 데 걸리는 시간은 단 8분 — 그 빛이 지금 당신의 피부를 따뜻하게 하고 있죠. <span class='hook-gold'>태양이 없으면 지구의 생명도 없어요.</span>" },
      { id: "mercury", icon: "⚫", name: "수성", preview: "태양에 가장 가까운 행성",
        teaser: "수성은 태양에서 가장 가까운 행성이지만, <span class='hook-highlight'>가장 뜨거운 행성은 아니에요</span>. 낮에는 430°C, 밤에는 -180°C — 하루 사이 온도 차가 600도! <span class='hook-gold'>왜 그럴까요? 그 비밀은 대기에 있어요.</span>" },
      { id: "venus", icon: "🟡", name: "금성", preview: "지구의 '쌍둥이'이자 지옥별",
        teaser: "금성은 크기도 지구와 비슷하고 질량도 비슷해서 '쌍둥이 행성'이라 불려요. 하지만 표면 온도가 <span class='hook-highlight'>460°C</span> — 납도 녹아내리는 온도예요. <span class='hook-gold'>왜 지구와 이렇게 달라졌을까요? 기후변화의 극단적 사례를 금성에서 배울 수 있어요.</span>" },
      { id: "earth", icon: "🌍", name: "지구", preview: "지금까지 알려진 유일한 생명의 행성",
        teaser: "우리가 살고 있는 지구, 사실 얼마나 특별한지 생각해본 적 있나요? <span class='hook-highlight'>액체 물이 존재하는 행성</span>은 우리가 아는 한 지구뿐이에요. 우주적 관점에서 지구는 한 줄기 빛 속의 <span class='hook-gold'>아주 작은 창백한 점(Pale Blue Dot)</span>입니다." },
      { id: "mars", icon: "🔴", name: "화성", preview: "인류가 100년 뒤 마을을 지을 곳",
        teaser: "화성은 지구와 같이 <span class='hook-highlight'>사계절이 있고 하루가 약 24시간 37분</span>이에요. 거대한 화산, 깊은 협곡, 그리고 과거에 존재했던 강의 흔적들 — 우리가 미래에 <span class='hook-gold'>이웃 행성에 마을을 짓고 여행을 갈 수 있을지도 몰라요.</span> 지금 바로 탐사 중인 화성의 이야기를 들어볼까요?" },
      { id: "jupiter", icon: "🪐", name: "목성", preview: "태양계 최대 행성, 지구의 1300배",
        teaser: "목성의 대적점(Great Red Spot)은 <span class='hook-highlight'>300년 넘게 지속되는 폭풍</span>이에요. 그 크기가 지구 두 개를 합친 것보다 크죠. 목성이 없었다면 수많은 소행성이 지구에 충돌했을 거라는 이야기도 있어요. <span class='hook-gold'>목성은 우리의 보호막이었을까요?</span>" },
      { id: "saturn", icon: "🪐", name: "토성", preview: "고리의 왕, 태양계의 보석",
        teaser: "토성의 고리는 얼음과 암석으로 이루어진 수십만 개의 조각들이에요. 두께는 놀랍도록 얇아서 <span class='hook-highlight'>평균 10m 정도</span>밖에 안 돼요. 하지만 넓이는 지구~달 거리의 70%! <span class='hook-gold'>이 아름다운 고리는 앞으로 1억 년 후면 사라질 수도 있어요.</span>" },
      { id: "uranus", icon: "🔵", name: "천왕성", preview: "옆으로 누워 도는 행성",
        teaser: "천왕성은 <span class='hook-highlight'>자전축이 98도 기울어져</span> 옆으로 굴러다니듯 공전해요. 왜 이럴까요? 옛날 거대한 천체와 충돌했기 때문이에요. 그리고 메탄 때문에 아름다운 <span class='hook-gold'>청록색</span>을 띠고 있죠." },
      { id: "neptune", icon: "🔵", name: "해왕성", preview: "태양계 끝의 푸른 거인",
        teaser: "해왕성은 <span class='hook-highlight'>직접 본 적이 없이 수학으로만 예측해서 발견한 행성</span>이에요. 최강 바람이 시속 2,000km — 지구 최강 태풍의 10배! <span class='hook-gold'>수학이 행성을 발견한 이야기, 정말 신기하지 않나요?</span>" },
      { id: "dwarf", icon: "⚪", name: "왜소행성", preview: "명왕성은 왜 행성에서 쫓겨났을까?",
        teaser: "2006년, 명왕성은 갑자기 행성 지위를 잃었어요. 과학자들이 규칙을 바꿨거든요. <span class='hook-highlight'>행성이 되려면 3가지 조건</span>을 모두 만족해야 해요. 명왕성은 그 중 하나를 못 채웠죠. <span class='hook-gold'>과학은 언제나 새로운 발견 앞에서 기준을 다시 세워요.</span>" },
      { id: "asteroid", icon: "🪨", name: "소행성", preview: "지구를 위협하는 우주의 돌덩이들",
        teaser: "태양계 초창기 행성이 만들어지고 남은 찌꺼기들 — 그것이 소행성이에요. <span class='hook-highlight'>현재 NASA는 잠재적 위험 소행성 수천 개를 추적 중</span>이에요. 6600만 년 전 공룡 멸종도 소행성 충돌로 일어났죠. <span class='hook-gold'>우리는 지금 어떻게 지구를 지킬 준비를 하고 있을까요?</span>" },
      { id: "comet", icon: "☄️", name: "혜성", preview: "꼬리 달린 천체의 비밀",
        teaser: "혜성은 얼음과 먼지로 된 천체예요. 태양에 가까워지면 얼음이 증발하며 <span class='hook-highlight'>수백만 km의 빛나는 꼬리</span>를 만들어요. 지구의 물이 사실 혜성이 가져온 것일 수도 있다는 가설도 있어요. <span class='hook-gold'>생명의 씨앗을 운반한 별똥별?</span>" },
      { id: "meteor", icon: "🌠", name: "유성", preview: "별똥별의 진짜 정체",
        teaser: "소원을 빌게 하는 별똥별! 사실 유성은 <span class='hook-highlight'>대기와 마찰하며 타는 작은 돌가루</span>예요. 대부분 완두콩만 한 크기죠. 매년 여름 페르세우스자리 유성우처럼 <span class='hook-gold'>수십 개씩 쏟아지는 장관을 볼 수 있어요.</span>" },
      { id: "kuiper", icon: "💫", name: "카이퍼 벨트", preview: "해왕성 너머의 신비로운 영역",
        teaser: "해왕성 궤도 너머, 수십억 개의 얼음 천체들이 태양을 도는 영역 — 그것이 카이퍼 벨트예요. 명왕성도 여기 살아요. <span class='hook-highlight'>뉴허라이즌스 탐사선이 2015년 처음으로 이 영역을 탐사</span>했죠. <span class='hook-gold'>우주의 냉동 창고에는 무엇이 있을까요?</span>" },
      { id: "oort", icon: "🌐", name: "오르트 구름", preview: "태양계의 진짜 끝",
        teaser: "가수 <span class='hook-highlight'>윤하의 노래 제목으로도 유명한 오르트 구름</span>은 태양계 끝자락, 수많은 얼음덩어리와 바위로 된 천체들이 사는 미지의 영역이에요. 윤하의 노래는 태양계 영역을 탐사하는 보이저 탐사선의 희망과 꿈을 담은 노래예요. <span class='hook-gold'>태양계의 진짜 경계는 어디일까요?</span>" },
    ]
  },
  {
    id: "celestial",
    name: "천체",
    icon: "⭐",
    cls: "hub-celestial",
    desc: "별에서 은하까지, 우주의 구성원들",
    count: "3개 주제",
    items: [
      { id: "star", icon: "⭐", name: "항성", preview: "스스로 빛나는 별들",
        teaser: "밤하늘의 별들은 모두 <span class='hook-highlight'>스스로 핵융합으로 빛을 만드는 항성</span>이에요. 우리 은하에만 2000억~4000억 개의 항성이 있어요. 그 중 가장 가까운 것은 4.2광년 떨어진 프록시마 센타우리. <span class='hook-gold'>빛의 속도로 달려도 4년이 걸리는 곳에 이웃이 있어요.</span>" },
      { id: "nebula", icon: "🌫️", name: "성운·성단", preview: "별이 태어나는 우주의 요람",
        teaser: "성운은 우주의 <span class='hook-highlight'>가스와 먼지가 모인 거대한 구름</span>이에요. 허블 망원경이 찍은 '창조의 기둥' 사진을 본 적 있나요? 그 안에서 지금 이 순간에도 새로운 별들이 태어나고 있어요. <span class='hook-gold'>우주는 지금도 멈추지 않고 창조 중이에요.</span>" },
      { id: "galaxy", icon: "🌌", name: "은하", preview: "수천억 개 별들의 도시",
        teaser: "우리 은하 '밀키웨이'에는 <span class='hook-highlight'>3000억 개의 별</span>이 있어요. 그리고 관측 가능한 우주에는 이런 은하가 2조 개! 모든 은하의 중심에는 초질량 블랙홀이 있어요. <span class='hook-gold'>우리는 2조 개 도시 중 하나의 변두리 동네에 살고 있어요.</span>" },
    ]
  },
  {
    id: "astrophysics",
    name: "천체물리",
    icon: "⚡",
    cls: "hub-astrophysics",
    desc: "우주를 이해하는 물리학의 언어",
    count: "9개 주제",
    items: [
      { id: "distance", icon: "📏", name: "행성 거리", preview: "우주 거리를 어떻게 잴까?",
        teaser: "자로 잴 수 없는 거리를 어떻게 알까요? 천문학자들은 <span class='hook-highlight'>빛이 이동하는 시간, 시차, 세페이드 변광성</span> 등 여러 '우주 거리 사다리'를 써요. <span class='hook-gold'>수십억 광년 거리를 측정하는 방법이 있다는 게 놀랍지 않나요?</span>" },
      { id: "brightness", icon: "💡", name: "밝기", preview: "별의 밝기를 재는 방법",
        teaser: "고대 그리스 히파르코스는 맨눈으로 별 밝기를 1~6등급으로 나눴어요. 현대에도 이 시스템을 써요! <span class='hook-highlight'>1등급 차이가 밝기 2.5배 차이</span>예요. <span class='hook-gold'>2000년 전 사람들이 만든 척도가 지금도 쓰인다는 사실!</span>" },
      { id: "spectrum", icon: "🌈", name: "스펙트럼", preview: "빛을 쪼개면 별의 성분이 보인다",
        teaser: "빨주노초파남보, 맞아요 무지개의 색상이죠! 천문학에서는 빛 연구가 굉장히 중요한데, 이를 고급 장비로 분해해서 보는 걸 <span class='hook-highlight'>스펙트럼</span>이라고 해요. 스펙트럼을 보면 어떤 별에 어떤 물질이 있는지 알 수 있죠. <span class='hook-gold'>하지만 그게 다가 아니에요! 별의 속도까지 알 수 있답니다!</span>" },
      { id: "color-temp", icon: "🌡️", name: "색깔과 온도", preview: "파란 별이 빨간 별보다 뜨겁다",
        teaser: "별의 색깔은 온도를 나타내요. <span class='hook-highlight'>빨간 별은 약 3000°C, 파란 별은 30000°C 이상</span>이에요. 우리 태양은 노란색으로 약 5500°C. 색깔만 봐도 온도를 알 수 있어요. <span class='hook-gold'>별은 색깔로 말하고 있었어요.</span>" },
      { id: "position", icon: "🗺️", name: "별의 위치", preview: "하늘을 지도로 만드는 방법",
        teaser: "천문학자들은 하늘을 <span class='hook-highlight'>적경·적위</span>로 나눠서 별의 위치를 정확히 표시해요. 지구의 위도·경도와 비슷한 개념이죠. <span class='hook-gold'>밤하늘 전체를 지도로 만든 사람들의 이야기를 들어볼까요?</span>" },
      { id: "star-distance", icon: "🔭", name: "별의 거리", preview: "시차로 별까지 거리를 재다",
        teaser: "손가락을 눈 앞에 세우고 한쪽 눈씩 감으면 손가락이 움직여 보이죠? 이것이 <span class='hook-highlight'>시차</span>의 원리예요. 천문학자들도 같은 방법으로 가까운 별까지 거리를 측정해요. <span class='hook-gold'>일상의 원리가 우주를 측정하는 데 쓰인다는 사실!</span>" },
      { id: "dynamics", icon: "🔄", name: "역학", preview: "케플러와 뉴턴이 밝힌 천체의 운동",
        teaser: "케플러는 행성이 <span class='hook-highlight'>타원 궤도</span>로 공전한다는 걸 밝혔고, 뉴턴은 그 이유를 중력으로 설명했어요. 뉴턴이 사과 나무 아래서 떠올린 아이디어가 우주선 궤도 계산에 쓰여요. <span class='hook-gold'>사과 한 개가 우주 시대를 열었어요.</span>" },
      { id: "theory", icon: "📐", name: "이론", preview: "상대성 이론부터 양자역학까지",
        teaser: "아인슈타인은 <span class='hook-highlight'>E=mc²</span> 하나로 질량과 에너지가 같다는 걸 보였어요. 이 공식이 별이 빛나는 이유를 설명해줘요. <span class='hook-gold'>가장 간단한 공식이 가장 많은 것을 설명한다는 게 천재성의 증거예요.</span>" },
      { id: "au", icon: "📡", name: "천문단위", preview: "우주 거리를 재는 자",
        teaser: "1천문단위(AU) = 지구에서 태양까지 거리 = 약 1억 5천만 km. <span class='hook-highlight'>명왕성은 태양에서 40AU</span> 떨어져 있어요. 오르트 구름은 10만AU! <span class='hook-gold'>이 엄청난 거리를 다루기 위해 천문학자들이 만든 단위, 지금부터 배워봐요.</span>" },
    ]
  },
  {
    id: "exploration",
    name: "우주탐사",
    icon: "🚀",
    cls: "hub-exploration",
    desc: "인류가 우주로 뻗어나간 역사",
    count: "5개 주제",
    items: [
      { id: "rocket", icon: "🚀", name: "로켓의 발달", preview: "폭죽에서 스타십까지",
        teaser: "최초의 로켓은 중국의 <span class='hook-highlight'>불화살</span>이었어요. 지금은 재사용 가능한 로켓으로 화성을 꿈꿔요. 100년 만에 하늘을 가로질러 우주까지 — <span class='hook-gold'>인류의 가장 빠른 기술 진보 이야기를 들어볼까요?</span>" },
      { id: "shuttle", icon: "🛸", name: "우주왕복선", preview: "날개 달린 우주선의 시대",
        teaser: "우주왕복선은 <span class='hook-highlight'>30년간 135번 비행</span>하며 허블 망원경을 수리하고 ISS를 건설했어요. 2011년 마지막 비행 후 은퇴했지만, 그 유산은 지금도 이어지고 있어요. <span class='hook-gold'>챌린저와 컬럼비아의 비극도 기억해야 할 역사예요.</span>" },
      { id: "solar-explore", icon: "🛰️", name: "태양계 탐사", preview: "보이저에서 뉴허라이즌스까지",
        teaser: "1977년 발사된 보이저 1호는 지금도 날아가고 있어요. 태양에서 <span class='hook-highlight'>225억 km</span> — 인류가 만든 가장 멀리 간 물체예요. <span class='hook-gold'>45년 된 탐사선이 아직도 신호를 보내오고 있다는 것, 감동적이지 않나요?</span>" },
      { id: "exoplanet-search", icon: "🔍", name: "외계행성 찾기", preview: "수천 광년 밖 행성을 어떻게 찾나?",
        teaser: "지금까지 발견된 외계행성은 <span class='hook-highlight'>5,500개 이상</span>이에요. 별빛이 행성에 가려져 잠깐 어두워지는 '통과법'으로 발견해요. <span class='hook-gold'>수천 광년 밖의 세계를 빛의 깜빡임으로 찾아내는 방법이 궁금하지 않나요?</span>" },
      { id: "alien", icon: "👾", name: "외계생명체 찾기", preview: "우리는 혼자일까?",
        teaser: "드레이크 방정식에 따르면 우리 은하에만 수천~수백만 개의 문명이 있을 수 있어요. 하지만 아직 아무 신호도 받지 못했죠 — <span class='hook-highlight'>이것을 '페르미 역설'</span>이라 해요. <span class='hook-gold'>광대한 우주에서 우리는 왜 혼자인 것처럼 느껴질까요?</span>" },
    ]
  },
  {
    id: "constellation",
    name: "별자리",
    icon: "✨",
    cls: "hub-constellation",
    desc: "신화와 계절이 담긴 밤하늘의 그림",
    count: "5개 주제",
    items: [
      { id: "const-origin", icon: "📜", name: "기원과 상식", preview: "별자리는 누가 처음 만들었을까?",
        teaser: "별자리는 <span class='hook-highlight'>약 5000년 전 메소포타미아</span>에서 시작됐어요. 농사 시기를 알기 위한 달력이었죠. 현재 공식 별자리는 88개예요. <span class='hook-gold'>고대인들의 지혜가 오늘날 천문학의 기초가 됐어요.</span>" },
      { id: "const-north", icon: "⬆️", name: "북반구 별자리", preview: "오리온, 큰곰, 작은곰자리",
        teaser: "북두칠성을 알고 있나요? 그건 큰곰자리의 일부예요. <span class='hook-highlight'>북극성은 작은곰자리</span>에 있고, 항상 북쪽을 가리켜요. 나침반이 없던 시절 별이 GPS였죠. <span class='hook-gold'>오늘 밤 맨눈으로 찾아볼 수 있는 별자리를 소개해 드릴게요.</span>" },
      { id: "const-south", icon: "⬇️", name: "남반구 별자리", preview: "호주에서 보이는 밤하늘",
        teaser: "남반구에서는 <span class='hook-highlight'>남십자성</span>이 보여요. 밤하늘의 구성이 완전히 달라지죠. 지구 반대편의 밤하늘을 상상해본 적 있나요? <span class='hook-gold'>같은 우주, 다른 시선으로 본다면 어떨까요?</span>" },
      { id: "const-legend", icon: "🧝", name: "별자리 전설", preview: "그리스 로마 신화와 별자리",
        teaser: "오리온은 사냥꾼이었고, 카시오페이아는 허영심 강한 왕비였죠. <span class='hook-highlight'>그리스 로마 신화의 주인공들이 밤하늘에 새겨졌어요.</span> 별자리를 알면 신화가 더 재미있고, 신화를 알면 별자리가 더 생생해요. <span class='hook-gold'>밤하늘이 하나의 거대한 신화책이에요.</span>" },
      { id: "const-east", icon: "🐉", name: "동양 별자리", preview: "용과 봉황이 사는 동쪽 하늘",
        teaser: "서양 별자리와 달리 동양에서는 하늘을 <span class='hook-highlight'>28개 별자리(이십팔수)</span>로 나눴어요. 청룡, 백호, 주작, 현무 사신이 하늘을 지켜요. <span class='hook-gold'>같은 별인데 전혀 다른 이야기가 담겨있어요. 문화가 다르면 우주도 달리 보여요.</span>" },
    ]
  },
  {
    id: "telescope",
    name: "망원경",
    icon: "🔭",
    cls: "hub-telescope",
    desc: "인류의 눈을 우주로 확장한 도구",
    count: "1개 주제",
    items: [
      { id: "telescope-history", icon: "🔭", name: "망원경의 역사와 종류", preview: "갈릴레오부터 JWST까지",
        teaser: "1609년 갈릴레오가 처음 망원경으로 밤하늘을 봤을 때, 달에 산이 있고 목성에 위성이 있다는 걸 알았어요. <span class='hook-highlight'>그 하나의 행동이 코페르니쿠스 혁명을 완성</span>했어요. 지금의 JWST는 138억 광년 밖을 보고 있죠. <span class='hook-gold'>인류의 눈은 얼마나 멀리까지 닿을까요?</span>" },
    ]
  },
  {
    id: "astronomer",
    name: "천문학자",
    icon: "👩‍🔬",
    cls: "hub-astronomer",
    desc: "별을 연구한 위대한 인물들",
    count: "1개 주제",
    items: [
      { id: "famous-astronomers", icon: "👨‍🏫", name: "위대한 천문학자들", preview: "코페르니쿠스부터 호킹까지",
        teaser: "<span class='hook-highlight'>갈릴레오는 종교재판을 받으면서도 '그래도 지구는 돈다'</span>고 했어요. 허블은 우주가 팽창한다는 걸 발견했고, 호킹은 블랙홀도 빛을 낼 수 있다는 걸 증명했어요. <span class='hook-gold'>진리를 찾기 위해 온 삶을 바친 사람들의 이야기는 어느 소설보다 드라마틱해요.</span>" },
    ]
  }
];

/* ---- Knowledge Hub 렌더링 ---- */
(function renderKnowledgeHub() {
  const hub = document.getElementById('knowledge-hub');
  if (!hub) return;

  hub.innerHTML = KNOWLEDGE_HUB.map((cat, i) => `
    <div class="hub-card ${cat.cls}" data-cat="${cat.id}" style="animation-delay:${i * 0.07}s">
      <div class="hub-icon-wrap float">${cat.icon}</div>
      <div class="hub-card-name">${cat.name}</div>
      <div class="hub-card-count">${cat.count}</div>
    </div>
  `).join('');

  hub.querySelectorAll('.hub-card').forEach(card => {
    card.addEventListener('click', () => showSubcategory(card.dataset.cat));
  });
})();

/* ---- 서브카테고리 패널 ---- */
function showSubcategory(catId) {
  const cat = KNOWLEDGE_HUB.find(c => c.id === catId);
  if (!cat) return;

  const panel = document.getElementById('subcategory-panel');
  const hub = document.getElementById('knowledge-hub-wrap');
  if (!panel || !hub) return;

  hub.style.display = 'none';

  panel.innerHTML = `
    <div class="subcategory-breadcrumb" onclick="showHub()">
      ← 지식 카테고리 &nbsp;/&nbsp; <span>${cat.name}</span>
    </div>
    <div class="subcategory-title-bar">
      <div class="cat-icon-lg" style="background:var(--gradient-card); border:1px solid var(--color-border);">${cat.icon}</div>
      <div>
        <h2>${cat.name}</h2>
        <p>${cat.desc}</p>
      </div>
    </div>
    <div class="subcategory-grid">
      ${cat.items.map(item => `
        <div class="subcat-item" data-item="${item.id}" data-cat="${cat.id}">
          <span class="subcat-icon">${item.icon}</span>
          <div class="subcat-info">
            <div class="subcat-name">${item.name}</div>
            <div class="subcat-preview">${item.preview}</div>
          </div>
          <span class="subcat-arrow">→</span>
        </div>
      `).join('')}
    </div>
  `;

  panel.classList.add('active');

  panel.querySelectorAll('.subcat-item').forEach(el => {
    el.addEventListener('click', () => showTeaser(el.dataset.cat, el.dataset.item));
  });
}

function showHub() {
  const panel = document.getElementById('subcategory-panel');
  const hub = document.getElementById('knowledge-hub-wrap');
  if (panel) panel.classList.remove('active');
  if (hub) hub.style.display = '';
}

/* ---- Teaser Modal ---- */
function showTeaser(catId, itemId) {
  const cat = KNOWLEDGE_HUB.find(c => c.id === catId);
  if (!cat) return;
  const item = cat.items.find(i => i.id === itemId);
  if (!item) return;

  const overlay = document.getElementById('teaser-overlay');
  if (!overlay) return;

  overlay.querySelector('#teaser-icon').textContent = item.icon;
  overlay.querySelector('#teaser-badge').textContent = cat.name;
  overlay.querySelector('#teaser-name').textContent = item.name;
  overlay.querySelector('#teaser-hook').innerHTML = item.teaser;
  overlay.querySelector('#btn-deep-dive').onclick = () => {
    closeTeaserModal();
    openReader(catId, itemId);
  };

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeTeaserModal() {
  const overlay = document.getElementById('teaser-overlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

/* ---- Reader (Deep Dive) ---- */
function openReader(catId, itemId) {
  const data = KNOWLEDGE_ARTICLES[itemId] || generatePlaceholderArticle(catId, itemId);
  const overlay = document.getElementById('reader-overlay');
  if (!overlay) return;

  overlay.querySelector('#reader-tags').innerHTML = (data.tags || []).map(t =>
    `<span class="article-tag tag-${t.cls}">${t.label}</span>`).join('');
  overlay.querySelector('#reader-title').textContent = data.title;
  overlay.querySelector('#reader-meta').innerHTML = `
    <span>📖 읽는 시간 ${data.readTime || '10'}분</span>
    <span>${data.difficulty || '⭐ 입문'}</span>
    <span>🗓 ${data.date || '2026년 3월'}</span>
  `;
  overlay.querySelector('#reader-body').innerHTML = data.body;
  overlay.querySelector('#reader-related').innerHTML = generateRelated(catId, itemId);

  overlay.classList.add('open');
  overlay.scrollTop = 0;
  document.body.style.overflow = 'hidden';

  // Progress bar
  const bar = overlay.querySelector('.reader-progress');
  overlay.addEventListener('scroll', () => {
    const pct = overlay.scrollTop / (overlay.scrollHeight - overlay.clientHeight) * 100;
    if (bar) bar.style.width = pct + '%';
  });
}

function closeReader() {
  const overlay = document.getElementById('reader-overlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function generateRelated(catId, itemId) {
  const cat = KNOWLEDGE_HUB.find(c => c.id === catId);
  if (!cat) return '';
  const others = cat.items.filter(i => i.id !== itemId).slice(0, 4);
  if (!others.length) return '';
  return `<h3>이것도 읽어보세요</h3><div class="related-grid">` +
    others.map(o => `
      <div class="related-card" onclick="showTeaser('${catId}', '${o.id}')">
        <div class="rel-icon">${o.icon}</div>
        <div class="rel-name">${o.name}</div>
        <div class="rel-cat">${cat.name} · ${o.preview}</div>
      </div>`).join('') + `</div>`;
}

function generatePlaceholderArticle(catId, itemId) {
  const cat = KNOWLEDGE_HUB.find(c => c.id === catId);
  const item = cat ? cat.items.find(i => i.id === itemId) : null;
  return {
    title: item ? item.name : '준비 중',
    tags: [{ cls: 'beginner', label: '입문' }],
    readTime: '10',
    difficulty: '⭐ 입문',
    date: '2026년',
    body: `<p>이 주제의 심층 글은 현재 작성 중이에요. 곧 업데이트될 예정입니다! 🚀</p>
    <div class="callout"><span class="callout-icon">📌 Coming Soon</span>양질의 콘텐츠를 위해 열심히 준비 중이에요. 다른 주제를 먼저 탐험해보시겠어요?</div>
    <div class="humanistic-close"><span class="hc-label">💫 잠깐, 생각해보기</span><p>천문학을 공부한다는 건 우주의 광대함 앞에서 겸손해지는 연습이에요. 아직 알지 못하는 것들이 많다는 게, 오히려 설레지 않나요?</p></div>`
  };
}

/* ---- TTS (Text to Speech) Stub ---- */
(function ttsStub() {
  let ttsActive = false;
  let utterance = null;
  let ttsBar;

  function getTtsBtn() { return document.getElementById('btn-tts'); }
  function getTtsBar() { return document.getElementById('tts-bar'); }

  window.toggleTTS = function() {
    if (!ttsActive) {
      ttsBar = getTtsBar();
      if (ttsBar) ttsBar.classList.add('open');
      ttsActive = true;
      const btn = getTtsBtn();
      if (btn) { btn.classList.add('active'); btn.innerHTML = '⏹ 음성 중지'; }
      startTTS();
    } else {
      stopTTS();
    }
  };

  function startTTS() {
    if (!window.speechSynthesis) {
      showLoginPrompt('이 브라우저는 음성 기능을 지원하지 않아요.');
      ttsActive = false; return;
    }
    const body = document.getElementById('reader-body');
    if (!body) return;
    const text = body.innerText.slice(0, 2000);
    utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);

    // Progress simulate
    let prog = 0;
    const fill = document.getElementById('tts-fill');
    const timer = setInterval(() => {
      prog += 0.5;
      if (fill) fill.style.width = Math.min(prog, 100) + '%';
      if (prog >= 100 || !ttsActive) clearInterval(timer);
    }, 300);

    utterance.onend = () => stopTTS();
  }

  function stopTTS() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    ttsActive = false;
    const ttsBar = getTtsBar();
    if (ttsBar) ttsBar.classList.remove('open');
    const btn = getTtsBtn();
    if (btn) { btn.classList.remove('active'); btn.innerHTML = '🔊 듣기'; }
    const fill = document.getElementById('tts-fill');
    if (fill) fill.style.width = '0%';
  }

  window.setTTSSpeed = function(sel) {
    if (utterance && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      utterance.rate = parseFloat(sel.value);
      window.speechSynthesis.speak(utterance);
    }
  };
})();

/* ---- Like / Save (로그인 필요) Stub ---- */
let userLikes = JSON.parse(localStorage.getItem('cb_likes') || '{}');
let userSaves = JSON.parse(localStorage.getItem('cb_saves') || '{}');
let isLoggedIn = false; // 추후 실제 인증으로 교체

window.toggleLike = function(articleId) {
  if (!isLoggedIn) { showLoginPrompt('좋아요 기능은 로그인 후 이용할 수 있어요 🔐'); return; }
  userLikes[articleId] = !userLikes[articleId];
  localStorage.setItem('cb_likes', JSON.stringify(userLikes));
  const btn = document.getElementById('btn-like');
  if (btn) btn.classList.toggle('liked', userLikes[articleId]);
};

window.toggleSave = function(articleId) {
  if (!isLoggedIn) { showLoginPrompt('스크랩 기능은 로그인 후 이용할 수 있어요 🔐'); return; }
  userSaves[articleId] = !userSaves[articleId];
  localStorage.setItem('cb_saves', JSON.stringify(userSaves));
  const btn = document.getElementById('btn-save');
  if (btn) btn.classList.toggle('saved', userSaves[articleId]);
};

/* ---- Login Prompt Toast ---- */
function showLoginPrompt(msg) {
  let prompt = document.getElementById('login-prompt');
  if (!prompt) {
    prompt = document.createElement('div');
    prompt.id = 'login-prompt';
    prompt.className = 'login-prompt';
    document.body.appendChild(prompt);
  }
  prompt.textContent = msg;
  prompt.classList.add('show');
  setTimeout(() => prompt.classList.remove('show'), 3000);
}

/* ---- Algorithm Feed 렌더링 (홈/지식 페이지) ---- */
(function renderAlgoFeed() {
  const feed = document.getElementById('algo-feed');
  if (!feed) return;

  // 모든 아이템을 섞어서 추천 형태
  const allItems = KNOWLEDGE_HUB.flatMap(cat =>
    cat.items.map(item => ({ ...item, catId: cat.id, catName: cat.name }))
  );
  const shuffled = allItems.sort(() => Math.random() - 0.5).slice(0, 6);

  feed.innerHTML = shuffled.map(item => `
    <div class="algo-item" onclick="showTeaser('${item.catId}', '${item.id}')">
      <span class="algo-icon">${item.icon}</span>
      <div class="algo-info">
        <div class="algo-name">${item.name}</div>
        <div class="algo-meta">${item.catName} · ${item.preview}</div>
      </div>
      <span class="algo-badge">추천</span>
    </div>
  `).join('');
})();

/* ============================================
   ARTICLE DATA (개발동향 모달용)
   ============================================ */
const ARTICLE_DATA = {
  "starship-ift6": {
    tags: [{ cls: "launch", label: "발사체" }, { cls: "mission", label: "SpaceX" }],
    title: "스타십 IFT-6: 궤도 진입 완전 성공, 화성을 향한 이정표",
    source: "SpaceX 공식 발표 요약",
    date: "2026년 3월 5일",
    body: `
      <p>스페이스X의 스타십이 여섯 번째 통합 비행 시험(IFT-6)에서 사상 최초로 완전한 궤도 진입에 성공했습니다. 이는 인류 역사상 가장 큰 로켓이 재사용 가능한 방식으로 궤도에 오른 첫 사례입니다.</p>
      <h3>주요 성과</h3>
      <p>수퍼헤비 부스터는 발사 7분 후 발사 타워의 '기계 팔(Mechazilla)'에 정확히 포착되었으며, 스타십 상단은 인도양에 정밀 착수했습니다. 재진입 과정에서 열 차폐 타일의 성능이 크게 개선된 것이 확인되었습니다.</p>
      <h3>다음 단계</h3>
      <p>이 성공으로 NASA의 아르테미스 달 착륙선(HLS) 계약 이행에 청신호가 켜졌으며, 스페이스X는 2027년까지 화성 무인 화물 임무를 목표로 하고 있습니다.</p>
      <div class="humanistic-message">
        <p>우리가 두 번째 행성에 발을 딛는다는 것은 단순한 기술적 성취가 아닙니다. 그것은 인류가 처음으로 '지구 외 문명'이 될 수 있다는 가능성의 첫 문이 열리는 순간입니다. 우리는 멸종 위험을 분산하고, 미래 세대에게 더 넓은 우주를 유산으로 남길 의무가 있습니다 — 오늘의 로켓 엔지니어들이 그 의무를 이행하고 있습니다.</p>
      </div>
    `
  },
  "jwst-exo": {
    tags: [{ cls: "science", label: "외계행성" }, { cls: "mission", label: "JWST" }],
    title: "JWST, 40광년 외계행성 대기에서 이산화탄소·메탄 동시 검출",
    source: "Nature Astronomy 논문 요약",
    date: "2026년 2월 18일",
    body: `
      <p>제임스 웹 우주망원경(JWST)이 40광년 떨어진 슈퍼-지구 K2-18b의 대기에서 이산화탄소(CO₂)와 메탄(CH₄)을 동시에 높은 신뢰도로 검출했습니다. 이 두 분자가 함께 발견된 것은 표면이나 대기 중에 생화학적 과정이 존재할 가능성을 강력히 시사합니다.</p>
      <h3>왜 중요한가?</h3>
      <p>지구의 대기에서 메탄이 유지되는 것은 생물학적 활동 때문입니다. 비생물학적 과정만으로는 이 비율을 장기간 유지하기 어렵습니다. 연구팀은 디메틸 설파이드(DMS) 신호도 잠정적으로 포착했는데, 이는 지구에서 해양 미생물만이 생산하는 분자입니다.</p>
      <h3>주의사항</h3>
      <p>아직 '생명체 발견'을 주장하기에는 이릅니다. 복수의 독립적 관측 확인과 더 정밀한 분광 분석이 필요합니다. 그러나 천문학계는 이를 "지금까지 외계 생명체 존재 가능성에 가장 가까이 다가간 관측"으로 평가합니다.</p>
      <div class="humanistic-message">
        <p>우주에 우리만 있는가? 이 질문은 철학적이기 이전에 과학적 질문입니다. 만약 생명이 40광년 밖에도 존재한다면, 생명은 예외가 아니라 우주의 일반적인 현상입니다. 그것은 우리의 존재가 얼마나 소중한 동시에, 얼마나 외롭지 않은지를 동시에 알려줍니다.</p>
      </div>
    `
  },
  "blackhole-shadow": {
    tags: [{ cls: "science", label: "블랙홀" }],
    title: "블랙홀이란 무엇인가 — 빛조차 탈출할 수 없는 시공간의 끝",
    source: "COSMOS BRIEF 기초 천문 지식",
    date: "2026년 3월 1일",
    body: `
      <p>블랙홀은 물질이 극도로 압축되어 그 중력이 너무 강해 빛조차 탈출할 수 없는 시공간의 영역입니다. 단순한 구멍이 아니라, 공간 자체가 극단적으로 휘어진 '중력의 최전선'입니다.</p>
      <h3>어떻게 만들어지나?</h3>
      <p>태양보다 약 25배 이상 무거운 별이 핵연료를 모두 소진하면, 더 이상 핵융합으로 중력을 버티지 못해 자체 중력으로 붕괴합니다 — 이것이 핵붕괴형 초신성(Core-collapse Supernova)입니다. 이 과정에서 별의 핵이 수 킬로미터 크기로 압축되어 블랙홀이 됩니다.</p>
      <h3>사건 지평선 (Event Horizon)</h3>
      <p>블랙홀에는 '사건 지평선'이라는 경계가 있습니다. 이 경계 안쪽으로 들어가면 빛의 속도로 달려도 탈출할 수 없습니다. 이 경계 자체는 물질적 표면이 아닌 순수히 수학적인 경계입니다.</p>
      <h3>슈바르츠실트 반지름</h3>
      <p>어떤 질량 M을 블랙홀로 만들기 위한 최소 압축 반지름은 다음과 같습니다:</p>
      <p style="text-align:center; font-size:1.1rem; font-family: monospace; background: rgba(79,142,247,0.06); border-radius:8px; padding:1rem; margin:1rem 0;">
        r_s = 2GM / c²
      </p>
      <p>지구를 블랙홀로 만들려면 지름 약 9mm(호두알 크기)로 압축해야 합니다. 태양은 약 3km로 압축해야 하죠.</p>
      <div class="humanistic-message">
        <p>블랙홀은 파괴의 상징처럼 보이지만, 사실 은하의 중심에는 수백만~수십억 태양 질량의 초질량 블랙홀이 있으며, 이것이 은하 전체의 구조와 별 형성을 조율합니다. 파괴처럼 보이는 것이 사실은 창조의 근원이기도 합니다. 우주는 종종 우리의 직관을 배반하며 더 깊은 진실을 보여줍니다.</p>
      </div>
    `
  }
};
