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
    readTime: '12', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>지금 이 순간, 우리는 우주 공간 어딘가를 여행하고 있어요. 초속 약 <span class="hl">30km</span>로 태양 주위를 도는 지구에 올라타서요. 그리고 그 태양도 우리 은하 중심을 향해 초속 <span class="hl">220km</span>로 달려가고 있죠. 우리가 가만히 앉아있는 것처럼 느껴지지만, 우주적 관점에서는 엄청난 속도로 이동 중이에요.</p>

      <div class="callout"><span class="callout-icon">🌌 태양계의 구성</span>태양(1개) + 행성(8개) + 왜소행성(수십 개) + 소행성(100만 개 이상) + 혜성(수백만 개 이상) + 성간 먼지와 가스 — 이 모든 것이 <span class="hl-gold">태양의 중력 아래 묶여 있어요.</span></div>

      <p>태양계는 약 <span class="hl">46억 년 전</span>, 거대한 성간 가스와 먼지 구름이 중력에 의해 수축하면서 형성됐어요. 수축 과정에서 회전이 시작되고, 원반 모양으로 납작해졌죠. 가운데 모인 질량이 태양이 됐고, 나머지 부분에서 행성들이 뭉쳐서 만들어졌어요. 이 과정을 <span class="hl">행성 형성 이론(Nebular Hypothesis)</span>이라 부르는데, 현재 천문학계에서 가장 널리 받아들여지는 모델이에요.</p>
      <span class="term-note">Nebular Hypothesis(성운 가설): 태양계가 회전하는 가스·먼지 구름에서 수축하며 생겨났다는 이론. 1755년 칸트, 1796년 라플라스가 독립적으로 제안했어요.</span>

      <p>8개 행성은 두 그룹으로 나눌 수 있어요. 태양에 가까운 <span class="hl">암석형 행성</span>(수성, 금성, 지구, 화성)과 멀리 있는 <span class="hl-gold">가스 거인</span>(목성, 토성, 천왕성, 해왕성)이에요. 암석형 행성은 단단하고 작고 밀도가 높아요. 가스 거인은 엄청나게 크지만 대부분 기체나 얼음으로 이루어져 있죠. 태양계 전체 질량의 <span class="hl">99.86%</span>가 태양이고, 남은 0.14% 중 절반 이상이 목성이에요.</p>

      <div class="callout"><span class="callout-icon">📏 태양계의 크기</span>만약 태양을 농구공(약 24cm) 크기로 줄이면, 지구는 2mm짜리 구슬이고 태양에서 <span class="hl">약 26m</span> 떨어진 곳에 있어요. 명왕성은 1km 이상 떨어진 곳에 있는 작은 모래알이에요. 태양계는 정말 거의 대부분이 빈 공간이에요.</div>

      <p>행성 너머에는 <span class="hl">카이퍼 벨트</span>(해왕성 궤도 밖, 얼음 천체들의 집), 그리고 가장 바깥쪽에는 <span class="hl">오르트 구름</span>(혜성의 고향, 태양에서 최대 1광년 거리)이 있어요. 오르트 구름까지 포함하면 태양계의 영향권은 실로 어마어마하죠. 지구에서 봤을 때 가장 가까운 별인 프록시마 센타우리까지 약 4.2광년인데, 태양계의 경계는 이미 그 1/4에 해당하는 약 1광년까지 뻗어 있어요.</p>

      <p>태양계 탐사는 인류 역사상 가장 담대한 프로젝트예요. 1977년 발사된 <span class="hl">보이저 1호</span>는 현재 태양에서 225억 km 이상 떨어진 <span class="hl-gold">성간 공간(Interstellar Space)</span>에 진입했고, 지금도 초속 17km로 날아가고 있어요. 인류가 만든 구조물 중 가장 멀리 나간 물체예요. 그 속에는 지구 문명을 소개하는 황금 레코드판이 실려 있답니다.</p>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>우리가 사는 이 작은 행성은 우주의 광대함 속에서 한 알의 티끌에 불과해요. 하지만 <span class="hl-gold">이 티끌 위에서 우주를 이해하려는 인류</span>의 호기심과 탐구심은, 그 어떤 별보다 밝게 빛납니다.</p></div>
    `,
    chapters: [
      {
        icon: '☀️', title: '태양 — 태양계의 심장',
        body: `<p>태양은 단순한 불덩어리가 아니에요. 지름 약 <span class="hl">139만 km</span>, 질량은 지구의 33만 배인 거대한 핵융합 반응로예요. 중심부 온도는 약 <span class="hl">1500만°C</span>로, 매 초 6억 2000만 톤의 수소를 헬륨으로 변환하며 에너지를 뿜어냅니다.</p>
        <p>태양이 없다면 지구의 평균 기온은 영하 270°C에 가까워져요. 광합성도 없고, 바람도 없고, 물의 순환도 없죠. 태양 에너지가 지구의 모든 기상 현상, 생태계, 나아가 인류 문명의 근본 동력이에요.</p>
        <div class="callout"><span class="callout-icon">🌡️ 태양의 층 구조</span>핵(Core) → 복사층 → 대류층 → 광구(표면) → 채층 → 코로나(Crown). 특히 <span class="hl-gold">코로나</span>는 표면보다 100~300배 뜨거운 수백만 °C인데, 그 이유는 아직 완전히 밝혀지지 않은 미스터리예요.</div>
        <p>태양 활동의 11년 주기인 <span class="hl">태양 활동 주기(Solar Cycle)</span>는 지구 기후에도 영향을 줘요. 활동 극대기에는 태양 플레어와 CME(코로나 질량 방출)가 잦아져 위성 통신 장애, GPS 오류, 오로라 증가를 일으킵니다.</p>`
      },
      {
        icon: '🪨', title: '암석형 행성 — 수성·금성·지구·화성',
        body: `<p>태양에 가까운 4개 행성은 모두 단단한 암석과 금속으로 이루어져 있어요. 하지만 각자 놀랍도록 다른 환경을 가지고 있죠.</p>
        <ul>
          <li><strong>수성</strong>: 대기가 거의 없어 낮에는 430°C, 밤에는 -180°C. 태양 가장 가까이 있지만 가장 뜨거운 행성은 아니에요.</li>
          <li><strong>금성</strong>: 짙은 이산화탄소 대기로 온실효과가 극단으로 치달아 표면 온도 <span class="hl">460°C</span>. 납도 녹는 지옥 같은 환경이에요.</li>
          <li><strong>지구</strong>: 유일하게 액체 물이 있고 생명이 사는 행성. 자기장이 태양풍으로부터 대기를 보호해요.</li>
          <li><strong>화성</strong>: 과거엔 물이 흘렀고, 지금도 극지방에 얼음이 있어요. 인류의 미래 거점 후보 1순위예요.</li>
        </ul>
        <div class="callout"><span class="callout-icon">🌍 지구가 특별한 이유</span>지구는 태양으로부터 <span class="hl-gold">생명체 거주 가능 구역(Habitable Zone)</span> 안에 있어요. 너무 뜨겁지도, 차갑지도 않은 '골디락스 존'이라고도 불러요. 이 위치, 자기장, 달의 인력이 복합적으로 작용해 지구의 생명 조건을 만들어냈어요.</div>`
      },
      {
        icon: '🪐', title: '가스 거인 — 목성·토성·천왕성·해왕성',
        body: `<p>소행성대 너머, 태양에서 더 멀리 떨어진 곳에는 거대한 가스/얼음으로 이루어진 행성 4개가 있어요.</p>
        <ul>
          <li><strong>목성</strong>: 지름 지구의 11배, 질량 지구의 318배. <span class="hl">대적점</span>은 300년 넘게 지속되는 초대형 폭풍이에요. 79개 이상의 위성이 있으며, 위성 유로파는 얼음 지각 아래 바다가 있어요.</li>
          <li><strong>토성</strong>: 얼음과 암석 조각으로 이루어진 화려한 고리가 특징. 밀도가 물보다 낮아 거대한 물통에 넣으면 뜰 수 있어요.</li>
          <li><strong>천왕성</strong>: <span class="hl">자전축이 98° 기울어져</span> 옆으로 굴러다니듯 공전해요. 메탄 성분 때문에 청록색을 띠어요.</li>
          <li><strong>해왕성</strong>: 수학 계산으로 먼저 존재를 예측하고 나중에 발견한 행성. 시속 2000km의 강풍이 불어요.</li>
        </ul>
        <p>가스 거인들은 지구-태양 충돌 소행성을 중력으로 빨아들이는 <span class="hl-gold">'방패 행성'</span> 역할을 하기도 해요. 특히 목성이 없었다면 지구는 훨씬 더 많은 소행성 충돌을 겪었을 거예요.</p>`
      },
      {
        icon: '☄️', title: '카이퍼 벨트와 오르트 구름',
        body: `<p>해왕성 궤도(30AU) 너머, 태양계에는 아직 탐사가 거의 이루어지지 않은 신비로운 영역이 있어요.</p>
        <p><span class="hl">카이퍼 벨트(Kuiper Belt)</span>는 30~50AU 구간에 얼음 천체들이 고리처럼 분포하는 곳이에요. 명왕성, 에리스, 마케마케 같은 왜소행성이 여기 살아요. 2015년 뉴허라이즌스 탐사선이 명왕성을 근접 비행하며 처음으로 그 모습을 보여줬어요.</p>
        <span class="term-note">왜소행성(Dwarf Planet): 태양 주위를 돌고 구형에 가깝지만, 자신의 궤도 주변을 충분히 '청소'하지 못한 천체. 2006년 IAU가 재정의하며 명왕성이 여기에 포함됐어요.</span>
        <p><span class="hl-gold">오르트 구름(Oort Cloud)</span>은 2000~10만 AU에 분포하는 구형의 구름 같은 천체 집합이에요. 장주기 혜성의 고향으로 추정되며, 아직 직접 관측된 적은 없어요. 태양의 중력이 미치는 가장 먼 경계가 바로 이 오르트 구름까지예요.</p>
        <div class="callout"><span class="callout-icon">🛸 인류 최원거리 탐사</span>1977년 발사된 보이저 1·2호는 현재 태양권계면을 넘어 성간 공간에 진입했어요. 보이저 1호는 <span class="hl">225억 km</span> 이상 — 통신 신호가 지구 도달까지 약 21시간 걸려요. 탐사선이 오르트 구름에 도착하려면 앞으로 수백 년이 걸릴 거예요.</div>`
      }
    ]
  },

  /* ── 태양 ── */
  'sun': {
    title: '태양 — 생명을 주는 별, 그리고 언젠가 죽는 별',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '13', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>지금 이 순간 태양 중심에서는 <span class="hl">매초 6억 2000만 톤의 수소</span>가 헬륨으로 바뀌고 있어요. 이 과정에서 태양 질량의 약 0.7%가 에너지로 변환되고 — 바로 그 에너지가 지구로 날아와 식물을 자라게 하고, 우리 피부를 따뜻하게 해요. 지금 당신이 느끼는 온기가 바로 핵융합의 결과예요.</p>

      <div class="callout"><span class="callout-icon">☀️ 태양 기본 정보</span>지름: 지구의 <span class="hl">109배</span> (약 139만 km) · 질량: 태양계 전체의 <span class="hl-gold">99.86%</span> · 표면 온도: 5,500°C · 중심 온도: 약 1500만°C · 나이: 약 46억 년 · 수명: 약 100억 년 (앞으로 50억 년 남음)</div>

      <p>태양의 에너지는 중심부에서 만들어져 표면까지 전달되는 데 약 <span class="hl">10만 년</span>이 걸려요. 그렇게 표면에 도달한 빛이 지구까지 날아오는 데는 단 <span class="hl">8분 20초</span>. 즉 지금 당신이 보는 태양빛은 10만 년 전에 만들어진 에너지예요. 중심에서 표면까지의 여정이 그만큼 험난하다는 뜻이죠 — 광자 하나가 끝없이 흡수되고 재방출되며 무작위로 튀어다니는 <span class="hl-gold">랜덤워크(Random Walk)</span> 과정이에요.</p>
      <span class="term-note">랜덤워크(Random Walk): 확률적으로 무작위 방향으로 이동하는 과정. 태양 내부에서 광자는 평균 1cm마다 다른 입자에 흡수·재방출되어 느리게 표면으로 이동해요.</span>

      <p>태양 표면에는 흑점, 홍염, 플레어 같은 활동이 있어요. 특히 <span class="hl">태양 플레어(Solar Flare)</span>가 크게 발생하면 강력한 입자들이 지구로 쏟아져 위성 통신을 방해하고 오로라를 만들죠. 이 '우주 날씨'는 우리 일상과 점점 더 깊이 연결되어 있어요. 2025년과 2026년은 <span class="hl">태양 극대기(Solar Maximum)</span>에 해당해 특히 강력한 태양 활동이 관측되고 있어요.</p>

      <div class="callout"><span class="callout-icon">🔴 태양의 미래</span>약 50억 년 후, 태양은 수소를 다 소진하고 <span class="hl">적색거성</span>으로 부풀어 올라요. 그 크기가 지금의 100~200배 — 지구 궤도까지 팽창할 가능성이 있어요. 그 후 외층은 <span class="hl-gold">행성상 성운</span>으로 흩어지고, 중심엔 <span class="hl">백색왜성</span>이 남을 거예요.</div>

      <p>인류는 태양을 더 자세히 이해하려 탐사선을 보내기 시작했어요. 2018년 발사된 NASA의 <span class="hl">파커 태양 탐사선(Parker Solar Probe)</span>은 태양에서 약 610만 km까지 접근한 역대 최근접 탐사선이에요. 태양 코로나를 직접 통과하며 '우주 날씨' 예측을 위한 데이터를 보내오고 있어요.</p>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>태양도 언젠가 죽어요. 50억 년이라는 시간이 너무 멀게 느껴지지만 — 사실 우주의 나이(138억 년) 관점에서 보면 얼마 남지 않았어요. 모든 빛나는 것들이 그렇듯, 태양도 <span class="hl-gold">유한하기 때문에 아름다운지도 몰라요.</span></p></div>
    `,
    chapters: [
      {
        icon: '🔥', title: '핵융합 — 태양이 빛나는 원리',
        body: `<p>태양은 왜 빛날까요? 답은 <span class="hl">핵융합(Nuclear Fusion)</span>이에요. 수소 원자 4개가 합쳐져 헬륨 1개가 되는 과정에서 질량의 0.7%가 순수 에너지로 변환돼요. 아인슈타인의 공식 <span class="hl-gold">E = mc²</span>이 바로 이것을 설명해요.</p>
        <div class="formula-block"><div class="formula-text">4H → He + 에너지</div><div class="formula-desc">수소 4개가 헬륨 1개로 — 줄어든 질량이 빛과 열로 변환</div></div>
        <p>태양 중심은 온도 1500만°C, 압력이 지구 대기의 2500억 배예요. 이 극한 환경에서만 수소 핵들이 서로 가까이 다가가 융합할 수 있어요. 뜨거울수록, 밀도가 높을수록 핵융합이 활발해져요.</p>
        <p>지구에서도 핵융합을 만들려는 도전이 계속되고 있어요. 한국의 <span class="hl">KSTAR(한국형 인공태양)</span>는 2024년 플라즈마를 1억°C에서 48초 유지하는 데 성공했어요. 실용적 핵융합 발전이 실현되면 무한에 가까운 청정 에너지를 얻을 수 있어요.</p>`
      },
      {
        icon: '🌊', title: '태양풍과 우주 날씨',
        body: `<p>태양은 끊임없이 전하를 띤 입자를 사방으로 뿜어내요 — 이것이 <span class="hl">태양풍(Solar Wind)</span>이에요. 초속 400~800km로 날아와 지구 자기장과 부딪히며 아름다운 <span class="hl-gold">오로라(Aurora)</span>를 만들죠.</p>
        <p>하지만 태양 활동이 강할 때는 위험해요. <span class="hl">CME(코로나 질량 방출)</span>가 발생하면 수십억 톤의 플라즈마가 지구 방향으로 돌진해요. 강한 CME는:</p>
        <ul>
          <li>GPS 오류 및 위성 통신 장애</li>
          <li>항공기 항법 장치 오작동</li>
          <li>지상 전력망 과부하 및 정전</li>
          <li>우주 비행사 방사선 피폭 위험</li>
        </ul>
        <p>1859년의 <span class="hl">캐링턴 이벤트(Carrington Event)</span>는 역사상 가장 강력한 태양 폭풍으로, 당시 전신망을 모두 마비시켰어요. 현대 사회에서 이 정도의 태양 폭풍이 닥치면 피해 규모는 상상을 초월할 거예요. NASA와 NOAA는 지금도 24시간 태양 활동을 감시하고 있어요.</p>`
      },
      {
        icon: '🔴', title: '태양의 일생과 죽음',
        body: `<p>태양은 현재 <span class="hl">주계열성(Main Sequence Star)</span> 단계에 있어요. 수소 연료를 천천히 태우는 안정된 상태죠. 앞으로 약 50억 년 더 지속될 거예요.</p>
        <p>수소가 고갈되면 태양은 부풀어 올라 <span class="hl">적색거성(Red Giant)</span>이 돼요. 반지름이 지금의 100~200배 — 수성, 금성, 어쩌면 지구까지 삼킬 수 있어요. 표면은 지금보다 차갑지만, 워낙 커서 전체 밝기는 훨씬 강해져요.</p>
        <div class="callout"><span class="callout-icon">⚪ 백색왜성의 탄생</span>적색거성 단계를 넘기면 외층이 <span class="hl-gold">행성상 성운(Planetary Nebula)</span>으로 흩어지고, 남은 핵이 냉각되며 <span class="hl">백색왜성(White Dwarf)</span>이 돼요. 지구 크기만 하지만 태양 질량의 절반 이상이 압축된, 엄청나게 밀도 높은 천체예요. 이것이 태양의 최후예요.</div>
        <p>흥미롭게도 태양 적색거성 단계가 되기 훨씬 전, 약 10억 년 후부터 태양 밝기가 지금보다 10% 강해져 지구가 너무 뜨거워질 거예요. 인류가 그때까지 존재한다면 다른 행성으로 이주를 고민해야 할 거예요.</p>`
      }
    ]
  },

  /* ── 화성 ── */
  'mars': {
    title: '화성 — 인류가 100년 뒤 이민 갈 붉은 행성',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '14', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>화성은 왜 붉게 보일까요? 표면 전체가 <span class="hl">산화철(녹)</span>로 덮여 있기 때문이에요. 즉, 화성 전체가 녹슨 행성이에요. 이 붉은 색이 고대인들에게는 피의 색, 전쟁의 색으로 보였고, 그래서 <span class="hl-gold">전쟁의 신 마르스(Mars)</span>의 이름을 붙였죠.</p>

      <div class="callout"><span class="callout-icon">🔴 화성 기본 정보</span>지름: 지구의 약 <span class="hl">53%</span> · 하루: 24시간 37분 · 1년: 지구의 687일 · 표면 온도: -125°C ~ +20°C · 대기압: 지구의 <span class="hl-gold">0.6%</span> (거의 진공) · 위성: 포보스, 디모스</div>

      <p>화성에는 태양계 최대의 화산 <span class="hl">올림푸스 몬스(Olympus Mons)</span>가 있어요. 높이가 무려 21km — 에베레스트의 2.5배예요. 그리고 태양계 최대의 협곡 <span class="hl">발레스 마리네리스(Valles Marineris)</span>도 있는데, 길이가 4,000km로 미국 대륙 너비와 비슷해요. 화성 전체 지표의 1/5에 달하는 거대한 지형이에요.</p>

      <p>무엇보다 흥미로운 건 화성의 <span class="hl">과거</span>예요. 30억~40억 년 전에는 강이 흐르고, 바다가 있었다는 증거가 쌓이고 있어요. 지금도 극지방에는 <span class="hl-gold">드라이아이스와 물 얼음</span>이 있고, 지하에도 물이 있을 가능성이 있죠. 물이 있다면 — 과거나 현재에 생명체가 있었을 가능성도 완전히 배제할 수 없어요.</p>

      <div class="callout"><span class="callout-icon">🚀 현재 화성 탐사</span>현재 화성에서 활동 중인 탐사 로버는 NASA의 <span class="hl">퍼서비어런스(Perseverance)</span>예요. 암석 샘플을 채취하고 있으며, 2030년대에 지구로 가져올 계획이에요. 또 소형 헬리콥터 <span class="hl-gold">인지뉴어티(Ingenuity)</span>는 화성에서 처음으로 비행한 항공기가 됐어요.</div>

      <p>화성 이주를 현실로 만들려는 도전도 계속돼요. SpaceX의 <span class="hl">스타십(Starship)</span>은 화성까지 사람을 실어 나르도록 설계된 최초의 완전 재사용 가능 로켓이에요. 2020년대 후반 무인 화성 착륙, 2030년대 초 유인 착륙을 목표로 개발 중이에요. 화성에 정착하기 위해서는 방사선 차단, 식량 자급, 대기 생성 등 수없이 많은 난제를 해결해야 해요.</p>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>일론 머스크는 2050년까지 화성에 100만 명을 정착시키겠다고 해요. 터무니없어 보이지만, 100년 전 사람들은 달을 밟는 것도 불가능하다고 했죠. <span class="hl-gold">인류의 이야기는 언제나 불가능해 보이는 꿈에서 시작했어요.</span></p></div>
    `,
    chapters: [
      {
        icon: '🏔️', title: '화성의 지형 — 극한의 자연',
        body: `<p>화성의 지형은 지구 못지않게 다채로워요. 태양계에서 가장 큰 화산, 가장 깊은 협곡이 모두 화성에 있어요.</p>
        <ul>
          <li><strong>올림푸스 몬스(Olympus Mons)</strong>: 높이 21km, 지름 약 600km. 너무 넓어서 화성 표면에 서 있으면 지평선 너머로 사라져 한눈에 안 보여요.</li>
          <li><strong>발레스 마리네리스(Valles Marineris)</strong>: 길이 4,000km, 깊이 최대 7km. 지구의 그랜드캐니언(446km)과 비교하면 어마어마한 규모예요.</li>
          <li><strong>헬라스 분지(Hellas Planitia)</strong>: 직경 2,300km, 깊이 약 9km의 거대한 충돌 분화구. 태양계에서 가장 큰 충돌 지형 중 하나예요.</li>
        </ul>
        <div class="callout"><span class="callout-icon">🌪️ 화성의 모래폭풍</span>화성에서는 지구 전체를 덮을 만한 <span class="hl">전 지구적 모래폭풍</span>이 주기적으로 발생해요. 시속 100km 이상의 바람이 수개월간 지속될 수 있어요. 2018년 모래폭풍이 태양광 패널을 막아 사망한 오퍼튜니티 로버가 유명해요. 미래의 화성 정착지는 이 폭풍을 견딜 구조물이 필요해요.</div>`
      },
      {
        icon: '💧', title: '물과 생명 — 화성의 잃어버린 바다',
        body: `<p>화성에 물이 있었다는 증거는 점점 쌓이고 있어요. 강이 흐른 흔적인 <span class="hl">강바닥 지형(river channel)</span>, 삼각주, 호수 바닥 퇴적층 등이 발견됐어요.</p>
        <p>30억~40억 년 전 화성은 지금보다 훨씬 두꺼운 대기와 자기장이 있었어요. 강이 흐르고, 북쪽에는 거대한 얕은 바다가 있었을 가능성이 높아요. 하지만 태양풍에 대기를 빼앗기고, 핵이 식어 자기장을 잃으면서 급격히 황폐해졌죠.</p>
        <div class="callout"><span class="callout-icon">🧊 현재도 남은 물</span>현재 화성에는 극지방에 <span class="hl">드라이아이스(고체 CO₂)와 물 얼음</span>이 섞인 극관이 있어요. 2018년에는 남극 극관 아래 약 20km 크기의 <span class="hl-gold">액체 소금물 호수</span>가 발견됐어요(MARSIS 레이더). 그리고 퍼서비어런스 로버는 예제로 분화구에서 과거 강 삼각주 지형을 탐사 중이에요.</div>
        <p>생명의 흔적을 찾는 미션 — <span class="hl">MSR(Mars Sample Return)</span> 프로젝트는 퍼서비어런스가 수집한 암석 샘플을 2030년대에 지구로 가져와 분석하는 계획이에요. 이 샘플이 화성 생명체 존재 여부를 결정지을 가장 중요한 단서가 될 거예요.</p>`
      },
      {
        icon: '🏠', title: '화성 정착 — 현실적인 도전들',
        body: `<p>화성에 사람이 살려면 엄청난 문제를 해결해야 해요. 낭만적인 이야기 뒤에 숨은 현실적인 도전들을 살펴볼게요.</p>
        <ul>
          <li><strong>방사선</strong>: 화성은 자기장이 거의 없어 우주 방사선에 그대로 노출돼요. 화성 표면에서 1년 체류하면 지구에서 1000년 동안 받는 방사선과 비슷해요. 지하 거주지가 필수예요.</li>
          <li><strong>대기</strong>: 대기압이 지구의 0.6%, 구성이 95% 이산화탄소예요. 숨을 쉬려면 완전 밀폐 환경이 필요해요. NASA의 모시(MOXIE) 장치는 화성 대기에서 CO₂를 분해해 산소를 만드는 시험에 성공했어요.</li>
          <li><strong>식량</strong>: 화성 토양은 독성 화합물인 <span class="hl">퍼클로레이트(perchlorate)</span>가 포함되어 직접 농사가 어려워요. 밀폐 온실에서 수경재배가 현실적 대안이에요.</li>
          <li><strong>통신 지연</strong>: 지구-화성 거리에 따라 전파 왕복에 <span class="hl">3분~44분</span>이 걸려요. 실시간 소통이 불가능해 화성 정착민은 상당한 자율성이 필요해요.</li>
        </ul>
        <p>이 모든 도전에도 불구하고, 화성 이주는 단순한 꿈이 아닌 <span class="hl-gold">인류 생존 전략</span>으로 진지하게 논의되고 있어요. 문명을 다행성으로 퍼뜨리는 것이 소행성 충돌, 기후변화 같은 지구 위협으로부터 인류를 보호하는 방법일 수 있죠.</p>`
      }
    ]
  },

  /* ── 항성 ── */
  'star': {
    title: '항성 — 스스로 빛나는 우주의 등불들',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '13', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>밤하늘에 빛나는 별들은 모두 '항성(恒星)'이에요 — 스스로 핵융합을 통해 에너지를 만들어 빛을 내는 거대한 가스 덩어리죠. 우리 태양도 항성이에요. 일반적으로 태양은 평범한 별 중 하나지만, 우리에겐 물론 <span class="hl-gold">우주에서 가장 소중한 별</span>이에요.</p>

      <div class="callout"><span class="callout-icon">⭐ 항성의 분류 (OBAFGKM)</span>천문학자들은 별 표면 온도에 따라 분류해요: <span class="hl">O형(파란색, 3만°C+)</span> → B → A → F → G → K → <span class="hl-gold">M형(적색, 3천°C)</span>. 우리 태양은 <span class="hl">G형</span>이에요. 기억법: "Oh Be A Fine Girl, Kiss Me!"</div>

      <p>별들의 일생을 살펴보면 흥미로워요. 모든 별은 <span class="hl">성운</span>(가스와 먼지 구름)에서 태어나요. 질량에 따라 운명이 달라지는데 — 태양 질량의 별은 적색거성이 된 후 <span class="hl">백색왜성</span>으로 조용히 마무리해요. 반면 태양 질량의 8배 이상인 별은 초신성 폭발 후 <span class="hl-gold">중성자별</span>이나 <span class="hl-gold">블랙홀</span>이 돼요.</p>

      <p>별의 색깔이 온도를 나타낸다는 사실도 알고 계셨나요? <span class="hl">파란 별</span>이 가장 뜨겁고(30,000°C 이상), <span class="hl">빨간 별</span>이 가장 차가워요(3,000°C 정도). 사람 눈으로도 별 색깔을 구별할 수 있어요 — 겨울밤 오리온자리의 베텔게우스(붉은색)와 리겔(파란색)을 비교해보세요!</p>

      <div class="callout"><span class="callout-icon">💀 별의 죽음이 우리를 만들었어요</span>인간 몸속의 철, 칼슘, 산소 등 탄소보다 무거운 원소들은 모두 <span class="hl">초신성 폭발</span>에서 만들어진 거예요. 우리는 문자 그대로 <span class="hl-gold">별의 무덤에서 태어난 존재</span>예요. 천문학자 칼 세이건이 말했죠: "우리는 별의 물질로 만들어졌다(We are made of star stuff)".</div>

      <p>우리 은하에는 <span class="hl">2000억~4000억 개</span>의 항성이 있어요. 하지만 가장 수가 많은 항성은 화려한 파란 별이 아니라 차갑고 작은 <span class="hl">적색왜성(M형)</span>이에요. 전체 항성의 약 70~75%가 적색왜성이에요. 이 작은 별들은 수천억 년을 살아남는 초장수 별이에요 — 우주의 나이인 138억 년이 지나도 아직 죽지 않아요.</p>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>밤하늘의 별을 올려다볼 때, 그 빛들은 수십에서 수천 년 전에 출발한 빛이에요. <span class="hl-gold">과거의 빛이 지금 당신의 눈에 닿는 순간</span>, 그 별의 역사 전체가 당신에게로 와 닿는 거예요.</p></div>
    `,
    chapters: [
      {
        icon: '🌱', title: '별의 탄생 — 성운에서 항성으로',
        body: `<p>별은 우주 공간에 퍼진 <span class="hl">성간 가스와 먼지</span>가 중력으로 뭉치는 것에서 시작해요. 이 구름이 수축하면 온도와 압력이 올라가고, 결국 중심부에서 핵융합이 점화되면 별이 태어나요.</p>
        <p>별이 태어나는 장소가 바로 <span class="hl">성운(Nebula)</span>이에요. 허블 우주망원경이 찍은 '창조의 기둥(Pillars of Creation)' 사진은 독수리 성운 안에서 지금 이 순간 새로운 별들이 태어나는 현장을 포착한 것이에요.</p>
        <span class="term-note">원시별(Protostar): 핵융합이 시작되기 전, 중력 수축 단계에 있는 별의 전 단계. 수십만~수백만 년에 걸쳐 주계열성으로 안정돼요.</span>
        <div class="callout"><span class="callout-icon">⚖️ 중력 vs 핵융합</span>별의 일생은 <span class="hl">안으로 당기는 중력</span>과 <span class="hl-gold">밖으로 밀어내는 핵융합 에너지</span>의 균형이에요. 이 균형이 유지되는 동안이 주계열성 단계. 연료가 떨어지면 균형이 무너지며 별의 죽음이 시작돼요.</div>`
      },
      {
        icon: '💥', title: '초신성 — 별의 장렬한 죽음',
        body: `<p>태양 질량의 8배 이상인 별들은 일생을 우주의 가장 극적인 사건 중 하나로 마무리해요 — <span class="hl">초신성(Supernova)</span> 폭발이에요.</p>
        <p>별 중심에 더 이상 핵융합이 불가능한 <span class="hl">철(Fe) 핵</span>이 쌓이면, 핵이 갑자기 붕괴해요. 이 붕괴가 반동을 일으켜 별 전체가 폭발하죠. 이 순간의 밝기는 <span class="hl-gold">은하 전체보다 밝고</span>, 수주간 맨눈으로도 볼 수 있을 정도예요.</p>
        <p>초신성 폭발에서 나온 충격파가 주변 성운을 압축해 다음 세대 별의 탄생을 촉진해요. 그리고 폭발에서 생성된 금, 우라늄, 철 등 무거운 원소들이 우주 공간으로 퍼져나가요 — 이 원소들이 나중에 행성과 생명체의 재료가 되죠.</p>
        <div class="callout"><span class="callout-icon">🌌 초신성 잔해</span>초신성 폭발 후 남는 가스 구름이 <span class="hl">초신성 잔해(Supernova Remnant)</span>예요. 유명한 예가 게자리 성운(Crab Nebula) — 1054년 중국 천문학자들이 기록한 초신성 폭발의 잔해예요. 중심에는 <span class="hl-gold">초속 30회 자전하는 중성자별(펄사)</span>이 있어요.</div>`
      },
      {
        icon: '⚫', title: '블랙홀 — 별의 궁극적 운명',
        body: `<p>가장 무거운 별들(태양 질량 20배 이상)이 초신성 폭발 후 남기는 것이 <span class="hl">블랙홀(Black Hole)</span>이에요. 물질이 너무 작은 공간에 압축되어 중력이 빛조차 탈출하지 못할 정도로 강해진 천체예요.</p>
        <span class="term-note">사건의 지평선(Event Horizon): 블랙홀에서 빛도 탈출할 수 없는 경계면. 이 경계를 넘으면 어떤 정보도 밖으로 나올 수 없어요.</span>
        <p>블랙홀을 직접 볼 수는 없지만, 주변에 미치는 영향으로 존재를 알 수 있어요. 빛을 구부리는 <span class="hl">중력 렌즈 효과</span>, 주변 별이 공전하는 모습, 강착 원반에서 나오는 X선 방출 등이에요.</p>
        <p>2019년 인류는 처음으로 블랙홀의 '그림자'를 이미지로 포착했어요 — 6500만 광년 떨어진 M87 천체의 초질량 블랙홀이에요. 2022년에는 우리 은하 중심의 <span class="hl-gold">궁수자리 A*(Sgr A*)</span> 블랙홀 이미지도 공개됐어요. 질량이 태양의 400만 배에요.</p>`
      }
    ]
  },

  /* ── 은하 ── */
  'galaxy': {
    title: '은하 — 수천억 별들의 도시, 우리는 어디에 사나?',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '13', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>우리 은하 '밀키웨이(Milky Way)'는 <span class="hl">약 3000억 개의 별</span>로 이루어진 거대한 나선 은하예요. 지름은 약 10만 광년 — 빛의 속도로 달려도 10만 년이 걸리는 거리예요. 우리 태양은 이 거대한 원반 가장자리 근처, 중심에서 약 <span class="hl">2만 6000광년</span> 떨어진 곳에 있어요.</p>

      <div class="callout"><span class="callout-icon">🌌 은하의 종류</span><span class="hl">나선 은하</span>(우리 은하처럼 팔이 나선형으로 뻗음) · <span class="hl">타원 은하</span>(공 모양, 오래된 별만 있음) · <span class="hl-gold">불규칙 은하</span>(형태가 없음, 충돌 영향 받은 경우 많음). 관측 가능한 우주에는 이런 은하가 약 <span class="hl">2조 개</span>!</div>

      <p>우리 은하 중심부에는 <span class="hl">태양 질량의 400만 배</span>에 달하는 초질량 블랙홀 '궁수자리 A*'가 있어요. 2022년 인류는 처음으로 이 블랙홀의 이미지를 포착했죠. 엄청난 질량 때문에 주변 별들의 공전에 영향을 미쳐 그 존재를 알 수 있었어요.</p>

      <p>우리 은하는 혼자가 아니에요. 안드로메다 은하, 마젤란 성운 등과 함께 <span class="hl">국부 은하군(Local Group)</span>을 형성하고 있어요. 약 <span class="hl-gold">45억 년 후</span>에는 우리 은하와 안드로메다 은하가 충돌할 예정이에요. 하지만 두 은하는 대부분 빈 공간이라 별끼리의 직접 충돌 확률은 매우 낮아요.</p>

      <div class="callout"><span class="callout-icon">📸 역사적인 사진</span>2022년 EHT(Event Horizon Telescope) 팀이 공개한 '궁수자리 A*' 블랙홀 이미지는 전 세계를 뒤흔들었어요. 우리 은하 중심의 블랙홀을 <span class="hl">직접 시각적으로 확인</span>한 첫 번째 사건이었죠. 지구 곳곳에 설치된 8개 전파 망원경을 하나처럼 연결해서 달걀 하나를 볼 수 있을 만큼의 <span class="hl-gold">초고해상도</span>를 만들어냈어요.</div>

      <p>우주 전체에서 은하들은 마치 거대한 거품 구조처럼 배열돼 있어요. 은하들이 모인 <span class="hl">은하단</span>, 은하단이 모인 <span class="hl">초은하단</span>, 그리고 그 사이를 가로지르는 <span class="hl-gold">우주 거대 구조(Cosmic Web)</span>가 있어요. 이 거대 구조는 빅뱅 직후 양자 요동의 흔적을 담고 있어요.</p>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>2조 개의 은하, 각각 3000억 개의 별 — 이 숫자는 인간의 뇌가 진정으로 이해하기 어려운 스케일이에요. 하지만 그 광대한 우주 안에서 <span class="hl-gold">호기심 하나로 별을 세고 싶어 하는 인간</span>이 있다는 것도, 어쩌면 우주에서 가장 경이로운 사실일지 몰라요.</p></div>
    `,
    chapters: [
      {
        icon: '🌀', title: '우리 은하의 구조',
        body: `<p>우리 은하는 위에서 보면 아름다운 나선 팔이 뻗은 <span class="hl">나선 은하(Spiral Galaxy)</span>예요. 옆에서 보면 중심이 볼록한 원반 모양이죠. 주요 구성 요소를 살펴볼게요.</p>
        <ul>
          <li><strong>은하 핵(Bulge)</strong>: 중심의 밀도 높은 별 집단. 여기에 초질량 블랙홀 '궁수자리 A*'가 있어요.</li>
          <li><strong>나선 팔(Spiral Arms)</strong>: 별 탄생이 활발한 지역. 우리 태양은 오리온 팔(Orion Arm)에 위치해요.</li>
          <li><strong>은하 헤일로(Halo)</strong>: 원반을 둘러싼 구형 영역. 오래된 별 집단인 구상성단들이 있고, 암흑물질이 분포해요.</li>
        </ul>
        <div class="callout"><span class="callout-icon">🌑 암흑물질</span>은하들의 회전 속도를 보면 눈에 보이는 물질만으로는 설명이 안 돼요. 보이지 않는 <span class="hl-gold">암흑물질(Dark Matter)</span>이 전체 질량의 약 85%를 차지한다고 추정해요. 정체는 아직 모르지만, 은하의 형태를 유지하는 보이지 않는 골격 역할을 해요.</div>`
      },
      {
        icon: '💥', title: '은하 충돌 — 45억 년 후의 우리',
        body: `<p>현재 안드로메다 은하(M31)는 우리 은하를 향해 초속 <span class="hl">약 110km</span>로 돌진하고 있어요. 약 45억 년 후, 두 은하는 충돌하기 시작할 거예요.</p>
        <p>하지만 '충돌'이라고 해서 격렬한 파괴를 상상하면 안 돼요. 두 은하 모두 대부분 빈 공간이라, 별끼리의 직접 충돌 확률은 극히 낮아요. 대신 수십억 년에 걸쳐 두 은하가 서로를 통과하고 뒤섞이며 <span class="hl-gold">거대한 타원 은하(Milkomeda)</span>로 합쳐질 거예요.</p>
        <p>이미 허블 망원경은 수억 광년 밖에서 은하 충돌의 여러 단계를 촬영했어요. 충돌 중인 은하에서는 강력한 중력 상호작용으로 별 탄생이 폭발적으로 증가하는 <span class="hl">스타버스트(Starburst)</span> 현상이 일어나요.</p>`
      },
      {
        icon: '🌐', title: '우주 대규모 구조 — 거품 속 거품',
        body: `<p>가장 큰 스케일에서 우주를 바라보면, 은하들이 마치 비누 거품처럼 배열된 <span class="hl">우주 거대 구조(Cosmic Web)</span>가 보여요.</p>
        <ul>
          <li><strong>은하군(Group)</strong>: 수십 개의 은하 집단. 우리 국부 은하군도 여기에 속해요.</li>
          <li><strong>은하단(Cluster)</strong>: 수백~수천 개의 은하 집단. 처녀자리 은하단이 가장 가까운 은하단이에요.</li>
          <li><strong>초은하단(Supercluster)</strong>: 수십 개 은하단의 집합. 우리는 '라니아케아(Laniakea)' 초은하단에 속해요.</li>
          <li><strong>우주 필라멘트(Filament)</strong>: 초은하단들이 실처럼 연결된 구조. 그 사이의 빈 공간이 <span class="hl-gold">보이드(Void)</span>예요.</li>
        </ul>
        <p>이 전체 구조는 빅뱅 직후 양자 요동이 씨앗이 되어 암흑물질이 먼저 뭉치고, 그 중력으로 일반 물질이 모여 은하를 이룬 결과예요. 즉, 지금 우주의 대규모 구조는 <span class="hl">138억 년 전 양자 세계의 흔적</span>이에요.</p>`
      }
    ]
  },

  /* ── 망원경의 역사 ── */
  'telescope-history': {
    title: '망원경의 역사 — 갈릴레오부터 제임스 웹까지',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '14', difficulty: '⭐⭐ 중급', date: '2026년',
    body: `
      <p>1609년 어느 날, 갈릴레오 갈릴레이는 손수 만든 망원경을 밤하늘로 향했어요. 그가 본 것은 충격이었죠 — 달에는 완벽한 구 모양이 아닌 <span class="hl">산과 계곡</span>이 있었고, 목성에는 <span class="hl-gold">4개의 위성</span>이 공전하고 있었어요. 이 관찰 하나가 "지구가 우주의 중심"이라는 수천 년의 믿음을 무너뜨리기 시작했어요.</p>

      <div class="callout"><span class="callout-icon">🔭 망원경의 종류</span><span class="hl">굴절 망원경</span>(렌즈로 빛을 모음, 갈릴레오가 사용) · <span class="hl">반사 망원경</span>(거울로 빛을 반사, 뉴턴이 발명, 현대 대형 망원경의 기본) · <span class="hl-gold">전파 망원경</span>(가시광선 외 전파를 관측, 블랙홀 이미지에 사용) · 적외선·X선 망원경 등</div>

      <p>1990년 발사된 <span class="hl">허블 우주 망원경</span>은 지구 대기 밖에서 촬영하는 최초의 대형 우주망원경이에요. 발사 후 거울 제작 오류로 흐릿한 사진을 찍어 실망을 안겼지만, 1993년 우주 비행사들이 직접 수리했어요 — 마치 안경을 씌워주듯이요. 이후 허블은 <span class="hl-gold">수십억 광년 밖 은하 사진</span>을 보내오며 인류의 우주관을 바꿨어요.</p>

      <p>2021년 발사된 <span class="hl">제임스 웹 우주망원경(JWST)</span>은 허블의 후계자예요. 주경 지름이 6.5m — 허블(2.4m)의 2.7배예요. 적외선 관측에 특화되어 있어 우주 초기, <span class="hl">빅뱅 이후 수억 년 내의 최초 은하</span>를 관측할 수 있어요. 2022년 첫 이미지 공개 때 전 세계가 놀랐죠. JWST가 찍은 사진 한 장에 담긴 작은 점 하나하나가 모두 은하예요.</p>

      <div class="callout"><span class="callout-icon">🌟 다음 단계: 로먼 우주망원경</span>2026년 발사 예정인 <span class="hl">낸시 그레이스 로먼 우주망원경</span>은 허블과 같은 2.4m 거울을 가지지만 시야각이 <span class="hl-gold">100배</span>예요. 허블이 맞춤정장이라면, 로먼은 광각 드론 카메라예요. 단 한 번의 노출로 허블 수천 장 분량을 찍을 수 있어요.</div>

      <p>지상에서도 혁신은 계속돼요. 칠레 아타카마 사막에 건설 중인 <span class="hl">ELT(극대 망원경, Extremely Large Telescope)</span>는 주경 지름이 39m로, 완성 시 역대 최대 규모 망원경이 될 거예요. 대기 왜곡을 실시간으로 보정하는 적응 광학 기술과 결합해, 외계행성 대기 분석까지 가능할 거예요.</p>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>갈릴레오는 종교재판을 받으면서도 진실을 포기하지 않았어요. 그로부터 400년이 지난 지금, 우리는 138억 광년 밖을 보고 있어요. <span class="hl-gold">인류의 시야는 멈추지 않았어요</span> — 그리고 앞으로도.</p></div>
    `,
    chapters: [
      {
        icon: '🔬', title: '광학 망원경의 역사',
        body: `<p>망원경의 역사는 인류 지식의 확장 역사예요. 약 400년간의 여정을 살펴봐요.</p>
        <ul>
          <li><strong>1608년</strong>: 네덜란드 안경업자 한스 리퍼르세이가 최초로 특허를 신청한 망원경 발명. 배율 3배짜리였어요.</li>
          <li><strong>1609년</strong>: 갈릴레오가 직접 망원경을 제작, 배율을 20배까지 올려 천문 관측에 활용.</li>
          <li><strong>1668년</strong>: 아이작 뉴턴이 거울을 사용한 <span class="hl">반사 망원경</span> 발명. 더 선명하고 색수차가 없어요.</li>
          <li><strong>1845년</strong>: 윌리엄 파슨스가 지름 1.8m 거울 망원경을 만들어 은하가 나선형임을 최초 확인.</li>
          <li><strong>1948년</strong>: 팔로마 산천문대 5.1m 헤일 망원경 완성. 수십 년간 세계 최대 광학 망원경이었어요.</li>
        </ul>
        <p>현대 대형 망원경들은 <span class="hl-gold">적응 광학(Adaptive Optics)</span>을 사용해요. 레이저 '인공 별'을 쏘아 대기 왜곡을 실시간 측정하고, 수천 개의 작동기로 거울 형태를 1000분의 1초마다 보정해요. 덕분에 지상 망원경도 우주 망원경에 버금가는 선명도를 낼 수 있어요.</p>`
      },
      {
        icon: '🛸', title: '우주 망원경의 시대',
        body: `<p>지구 대기는 천문 관측의 가장 큰 장애물이에요. 가시광선만 약간 통과시키고, 자외선·X선·감마선은 대부분 차단해요. 그래서 대기 밖의 우주 망원경이 필요해요.</p>
        <div class="callout"><span class="callout-icon">우주 망원경 라인업</span>
          <strong>허블(HST, 1990~)</strong>: 가시광선·자외선·근적외선. 우주 나이와 팽창률 측정에 기여 |
          <strong>찬드라(Chandra, 1999~)</strong>: X선 관측. 블랙홀 주변 고에너지 현상 연구 |
          <strong>스피처(Spitzer, 2003~2020)</strong>: 적외선. 별 탄생 지역과 외계행성 대기 관측 |
          <span class="hl">JWST(2021~)</span>: 근적외선~중적외선. 우주 최초 은하, 외계행성 대기 분석
        </div>
        <p>JWST는 지구에서 약 150만 km 떨어진 <span class="hl">L2 라그랑주점</span>에 위치해요. 태양·지구·달의 중력이 균형을 이루는 이 지점에서 지구와 같은 속도로 태양을 공전하며, 항상 태양 반대 방향을 관측할 수 있어요. 온도는 영하 233°C로 유지해 적외선 관측에 최적화했어요.</p>
        <span class="term-note">라그랑주점(Lagrange Point): 두 천체의 중력이 작은 천체에 작용하는 원심력과 균형을 이루는 5개의 특별한 위치. L1~L5가 있으며, L2는 태양-지구 계에서 지구 너머 150만 km 지점이에요.</span>`
      },
      {
        icon: '📡', title: '전파·적외선·X선 망원경',
        body: `<p>가시광선만이 우주를 보는 유일한 창이 아니에요. 각 파장대는 다른 천체 현상을 보여줘요.</p>
        <ul>
          <li><span class="hl">전파 망원경</span>: 블랙홀(EHT), 중성자별 펄사, 우주 배경 복사 관측. FAST(중국, 지름 500m)는 세계 최대 단일 전파 망원경.</li>
          <li><span class="hl">적외선 망원경</span>: 먼지에 가려진 별 탄생 지역, 적색이동된 먼 은하 관측. JWST의 주 관측 파장.</li>
          <li><span class="hl">X선 망원경</span>: 블랙홀 강착원반, 초신성 잔해, 은하단 내 고온 가스 관측. 대기가 X선을 차단해 우주에 설치 필수.</li>
          <li><span class="hl-gold">중력파 검출기(LIGO/Virgo)</span>: 엄밀히 망원경은 아니지만, 빛 대신 시공간 파동으로 블랙홀·중성자별 충돌을 '듣는' 새로운 관측 수단이에요.</li>
        </ul>
        <p>미래에는 탐지 수단이 더 다양해질 거예요. 우주 기반 중력파 검출기 LISA, 뉴트리노 망원경, 암흑물질 검출기 등 — <span class="hl-gold">인류의 우주 '감각'은 계속 확장되고 있어요.</span></p>`
      }
    ]
  },

  /* ── 외계생명체 ── */
  'alien': {
    title: '외계생명체 찾기 — 우리는 우주에서 혼자일까?',
    tags: [{ cls: 'intermediate', label: '⭐⭐ 중급' }],
    readTime: '13', difficulty: '⭐⭐ 중급', date: '2026년',
    body: `
      <p>1950년, 물리학자 엔리코 페르미가 점심을 먹다가 이런 말을 했어요. "그래서, 다들 어디 있는 거야?(But where is everybody?)" — 우주가 이렇게 광대하고 별이 이렇게 많다면, 외계 문명들은 왜 아직 연락이 없는 걸까요? 이것이 바로 <span class="hl">페르미 역설(Fermi Paradox)</span>이에요.</p>

      <div class="callout"><span class="callout-icon">🧮 드레이크 방정식</span>1961년 천문학자 프랭크 드레이크는 우리 은하 내 교신 가능한 문명 수를 추정하는 공식을 만들었어요. 낙관적으로 계산하면 수만~수백만 개의 문명이, 비관적으로 계산하면 우리만 있을 수도 있어요. 방정식 자체보다 <span class="hl-gold">무엇을 모르는지 명확히 해주는 도구</span>로서 가치가 있어요.</div>

      <p>현재 가장 유력한 외계생명체 후보지는 어디일까요? 놀랍게도 우리 태양계 안에도 있어요. 목성의 위성 <span class="hl">유로파(Europa)</span>는 얼음 지각 아래 광대한 액체 바다가 있고, 토성의 위성 <span class="hl-gold">엔셀라두스(Enceladus)</span>는 바다에서 수증기와 유기물을 우주로 뿜어내고 있어요. 생명에 필요한 조건인 '물 + 에너지 + 유기물'이 모두 있죠.</p>

      <p>1977년 오하이오주립대 전파망원경이 포착한 <span class="hl">'와우! 신호(Wow! Signal)'</span>는 아직도 미스터리예요. 72초 동안 잡힌 강력한 전파 신호는 그 이후 다시는 나타나지 않았어요. 자연 현상인지, 외계 문명의 신호인지 확인되지 않은 채로 남아 있죠.</p>

      <div class="callout"><span class="callout-icon">🔭 현재 SETI 활동</span><span class="hl">SETI(Search for Extra-Terrestrial Intelligence)</span> 연구소와 NASA는 지금도 외계 문명을 탐색하고 있어요. 제임스 웹 망원경은 외계행성 대기에서 <span class="hl-gold">산소나 메탄 같은 생명 징표</span>를 찾을 수 있을 정도로 정밀해요. 2025년 이후 발표될 결과가 기대됩니다.</div>

      <p>최근 UFO/UAP(미확인 항공 현상) 연구가 미국 의회 차원에서 공식화됐어요. 2021년 미 국방부는 공식 UAP 보고서를 발표했고, 2023년에는 의회 청문회까지 열렸어요. 대부분은 자연 현상이나 군사 기술로 설명되지만, 일부는 여전히 미설명 상태로 남아 있어요. 과학계는 신중하지만 진지하게 데이터를 분석하고 있어요.</p>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>만약 우리가 정말로 우주에서 유일한 지적 생명체라면? 그것은 굉장히 외로운 사실이에요. 하지만 반대로 — <span class="hl-gold">이 광대한 우주를 이해하려는 책임이 우리에게만 있다는 뜻</span>이기도 해요. 그건 어쩌면 굉장히 경이로운 사명 아닐까요?</p></div>
    `,
    chapters: [
      {
        icon: '🧮', title: '페르미 역설과 드레이크 방정식',
        body: `<p><span class="hl">드레이크 방정식(Drake Equation)</span>은 우리 은하에서 현재 교신 가능한 문명 수 N을 7가지 변수의 곱으로 표현해요:</p>
        <div class="formula-block"><div class="formula-text">N = R★ × fp × ne × fl × fi × fc × L</div><div class="formula-desc">별 형성 속도 × 행성 가진 별 비율 × 거주 가능 행성 수 × 생명 발생 확률 × 지성 발생 확률 × 통신 가능 확률 × 문명 지속 기간</div></div>
        <p>낙관적 값을 넣으면 수만~수백만 개의 문명이, 비관적 값을 넣으면 우리 은하에 우리뿐이라는 결론이 나와요. 문제는 아직 변수 대부분의 실제 값을 모른다는 거예요.</p>
        <p>그렇다면 <span class="hl">페르미 역설</span>은 어떻게 설명될까요? 대표적 가설들:</p>
        <ul>
          <li><strong>대필터 이론(Great Filter)</strong>: 문명이 발전하는 과정에 거의 모든 문명이 넘지 못하는 장벽이 있다.</li>
          <li><strong>우주 동물원 이론(Zoo Theory)</strong>: 고등 문명이 일부러 우리와 접촉을 피하고 있다.</li>
          <li><strong>희귀 지구 이론(Rare Earth)</strong>: 복잡한 생명이 탄생하는 조건이 지구처럼 특수한 환경에서만 가능하다.</li>
          <li><strong>거리의 문제</strong>: 우주가 너무 광대해 신호가 닿기 전에 문명이 사라진다.</li>
        </ul>`
      },
      {
        icon: '🌊', title: '태양계 내 생명 가능 후보지',
        body: `<p>외계 생명을 찾으러 멀리 갈 필요 없어요. 우리 태양계 안에도 유망한 후보지가 있답니다.</p>
        <ul>
          <li><span class="hl">유로파(Europa, 목성 위성)</span>: 얼음 껍질 아래 깊이 100km의 액체 바다 추정. 조석 가열로 바다 유지. NASA의 유로파 클리퍼 탐사선이 2024년 발사됐어요.</li>
          <li><span class="hl-gold">엔셀라두스(Enceladus, 토성 위성)</span>: 2005년 카시니 탐사선이 남극에서 수증기와 유기물 기둥 발견. 바다에서 직접 샘플링 가능한 유일한 천체.</li>
          <li><span class="hl">타이탄(Titan, 토성 위성)</span>: 두꺼운 질소 대기와 메탄 호수가 있음. 물 대신 메탄을 용매로 쓰는 생명체 가능성 연구 중.</li>
          <li><span class="hl">화성</span>: 과거 물이 있었고, 지하에 액체 물이 있을 가능성. 지하 미생물 가능성 배제 못함.</li>
        </ul>
        <div class="callout"><span class="callout-icon">🔍 생명의 기준</span>과학자들이 생명 가능성을 평가할 때 찾는 조건: <span class="hl">액체 용매(주로 물)</span> + <span class="hl">에너지원</span> + <span class="hl-gold">유기 화합물</span>. 지구 생명의 극한 환경 발견(심해 열수구, 산성 광산, 남극 빙하 아래)은 생명의 범위가 우리 예상보다 훨씬 넓을 수 있음을 시사해요.</div>`
      },
      {
        icon: '📡', title: '외계 문명 탐색 — SETI와 메시지',
        body: `<p><span class="hl">SETI(외계 지성체 탐색)</span>는 1960년 프랭크 드레이크의 첫 전파 탐색 실험(Project Ozma)에서 시작됐어요. 현재는 전 세계 수십 개 전파 망원경과 수백만 명의 자원봉사자 컴퓨터(SETI@home 프로젝트)가 참여했어요.</p>
        <p>인류도 우주에 신호를 보냈어요:</p>
        <ul>
          <li><strong>아레시보 메시지(1974)</strong>: 이진수로 인류·DNA·태양계 정보를 담은 1679자리 전파 신호. M13 구상성단을 향해 발사. 도달 예상 2만 5천 년 후.</li>
          <li><strong>보이저 황금 레코드(1977)</strong>: 지구의 소리, 음악, 사진, 인사말 55개 언어를 금도금 원반에 담아 탐사선에 실었어요.</li>
          <li><strong>코스믹 콜(1999~2003)</strong>: 러시아 전파망원경에서 여러 별을 향해 디지털 메시지 전송.</li>
        </ul>
        <p>단 비판도 있어요. 스티븐 호킹은 생전에 "외계 문명에 능동적으로 신호를 보내는 것은 위험할 수 있다"고 경고했어요. 콜럼버스가 아메리카에 왔을 때 원주민에게 어떤 일이 벌어졌는지 생각해보면 — <span class="hl-gold">기술적으로 더 앞선 문명과의 접촉이 항상 좋은 결과를 낳는다는 보장은 없어요.</span></p>`
      }
    ]
  },

  /* ── 위대한 천문학자들 ── */
  'famous-astronomers': {
    title: '위대한 천문학자들 — 코페르니쿠스부터 호킹까지',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '14', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>"그래도 지구는 돈다(E pur si muove)." 갈릴레오 갈릴레이의 이 말은 실제로 그가 종교재판 후 했다는 전설이지만, 그 정신은 진짜예요 — <span class="hl">진리 앞에서는 권위에 굴복하지 않는다</span>는 정신. 천문학의 역사는 이런 불굴의 인물들로 가득해요.</p>

      <div class="callout"><span class="callout-icon">📜 시대를 바꾼 인물들</span>
        <strong>코페르니쿠스(1473–1543)</strong> — 지동설 이론 정립 · <strong>갈릴레오(1564–1642)</strong> — 망원경 관측으로 지동설 증명 시작 · <strong>케플러(1571–1630)</strong> — 행성 운동 3법칙 · <strong>뉴턴(1643–1727)</strong> — 만유인력 법칙으로 천체운동 통합 · <strong>허블(1889–1953)</strong> — 우주 팽창 발견 · <strong>호킹(1942–2018)</strong> — 블랙홀 이론, 호킹 복사</div>

      <p>에드윈 허블은 1929년 은하들이 우리에게서 <span class="hl">멀어지고 있다</span>는 걸 발견했어요. 더 멀리 있을수록 더 빠르게 멀어지죠. 이것이 <span class="hl-gold">우주 팽창의 증거</span>이며, 역으로 추산하면 약 138억 년 전 모든 것이 한 점에서 시작됐다는 — 빅뱅 이론의 관측적 기초가 됐어요.</p>

      <p>루게릭병으로 전신이 마비된 <span class="hl">스티븐 호킹</span>은 어떻게요? 그는 뺨 근육 하나로 컴퓨터를 제어하며 블랙홀, 시간, 빅뱅 등 우주의 근본 질문들을 평생 탐구했어요. 물리적 한계가 지적 한계가 아님을 온 몸으로 보여준 사람이에요.</p>

      <div class="callout"><span class="callout-icon">👩‍🔬 숨겨진 영웅들</span><span class="hl">헨리에타 레빗</span>은 세페이드 변광성으로 우주 거리 측정법을 발견했고, <span class="hl">세실리아 페인</span>은 별이 주로 수소로 이루어졌다는 걸 밝혔어요. 하지만 오랫동안 인정받지 못했죠. <span class="hl-gold">숨겨진 기여자들의 발굴도 과학사의 중요한 역할이에요.</span></div>

      <p>현대 천문학의 혁신을 이끄는 인물들도 있어요. JWST를 통해 우주 최초 은하를 관측하는 연구자들, 중력파를 처음 검출한 LIGO 팀의 킵 손(노벨상 수상), 블랙홀 이미지를 만든 <span class="hl">케이티 바우먼(Katie Bouman)</span> — 그녀는 블랙홀 사진을 위한 알고리즘을 개발한 컴퓨터 과학자예요. 천문학은 이제 물리학, 수학, 컴퓨터 공학이 융합된 학문이에요.</p>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>코페르니쿠스부터 호킹까지, 그들이 공통으로 가진 것은 <span class="hl-gold">'모른다는 용기'</span>였어요. 당연하게 여겨진 것들에 의문을 품고, 틀릴 수도 있다는 두려움을 이기고 나아간 사람들 — 과학은 그 용기의 축적이에요.</p></div>
    `,
    chapters: [
      {
        icon: '🌍', title: '코페르니쿠스·갈릴레오·케플러 — 혁명의 시대',
        body: `<p>16~17세기, 세 명의 위인이 인류의 우주관을 완전히 뒤집었어요.</p>
        <p><span class="hl">니콜라우스 코페르니쿠스(1473–1543)</span>는 지구가 아닌 <span class="hl">태양이 중심</span>이라는 지동설을 수학적으로 정립했어요. 하지만 종교적 탄압이 두려워 죽기 직전에야 책을 출판했죠. 그의 이름을 딴 '코페르니쿠스적 전환'은 지금도 '패러다임을 완전히 바꾸는 혁명'을 의미해요.</p>
        <p><span class="hl">갈릴레오 갈릴레이(1564–1642)</span>는 망원경으로 코페르니쿠스를 증명했어요. 달의 산, 목성의 4개 위성, 금성의 위상 변화 — 이 모두가 지동설을 뒷받침했어요. 그는 종교재판에 회부되어 가택 연금 상태로 생을 마쳤지만, 진실은 그와 함께 살아남았어요.</p>
        <div class="callout"><span class="callout-icon">📐 케플러의 행성 운동 3법칙</span><span class="hl">요하네스 케플러(1571–1630)</span>는 티코 브라헤의 정밀 관측 데이터로 행성 궤도의 수학적 법칙을 발견했어요: 1) 행성은 타원 궤도로 공전 2) 행성은 같은 시간에 같은 면적을 쓸어 지나감 3) 공전 주기 제곱 ∝ 궤도 반장축 세제곱. 이 법칙은 뉴턴의 만유인력 발견으로 이어지는 다리가 됐어요.</div>`
      },
      {
        icon: '🍎', title: '뉴턴과 허블 — 중력과 팽창',
        body: `<p><span class="hl">아이작 뉴턴(1643–1727)</span>은 케플러의 법칙을 한 공식으로 통합했어요 — <span class="hl-gold">만유인력 법칙(F = GMm/r²)</span>이에요. 사과가 떨어지는 이유와 달이 지구를 도는 이유가 같은 힘이라는 통찰은 당시로서는 혁명적이었어요.</p>
        <p>뉴턴의 역학은 이후 200년간 우주를 설명하는 완벽한 도구였어요. 1846년 수학자들이 뉴턴 역학으로 아직 발견되지 않은 <span class="hl">해왕성의 위치를 예측</span>하고 실제로 그 위치에서 발견한 사건은 과학사의 명장면이에요.</p>
        <p><span class="hl">에드윈 허블(1889–1953)</span>은 1920년대 세페이드 변광성을 이용해 안드로메다 성운이 우리 은하 밖 독립된 은하임을 증명했어요. 그리고 1929년, 은하들의 적색이동을 관측해 <span class="hl-gold">우주가 팽창하고 있다</span>는 결론을 내렸죠. 이것은 빅뱅 이론의 핵심 증거예요.'허블 상수'가 그의 이름을 딴 것이에요.</p>`
      },
      {
        icon: '👩‍🔬', title: '숨겨진 천재들 — 역사가 잊은 이름들',
        body: `<p>천문학의 역사에는 탁월한 업적을 남겼지만 충분히 인정받지 못한 이름들이 많아요.</p>
        <p><span class="hl">헨리에타 스완 레빗(1868–1921)</span>은 하버드 천문대에서 '인간 컴퓨터'로 일하며 세페이드 변광성의 주기-광도 관계를 발견했어요. 이 발견이 허블이 안드로메다 거리를 측정하는 데 사용한 '우주 거리 사다리'의 핵심이었어요.</p>
        <p><span class="hl">세실리아 페인(1900–1979)</span>은 박사 논문에서 별이 주로 <span class="hl-gold">수소와 헬륨</span>으로 이루어졌다는 것을 밝혔어요. 당시 지도교수는 "그럴 리 없다"며 논문에 의혹을 달았지만, 나중에 페인이 옳았음이 증명됐어요.</p>
        <p><span class="hl">베라 루빈(1928–2016)</span>은 은하 회전 속도를 연구하다 눈에 보이지 않는 물질이 중력을 만들고 있다는 증거를 발견했어요 — 이것이 <span class="hl-gold">암흑물질(Dark Matter)</span>의 존재를 강하게 시사하는 첫 번째 관측 증거예요. 그녀는 여러 차례 노벨상 후보로 거론됐지만 끝내 받지 못했어요.</p>
        <div class="callout"><span class="callout-icon">💡 다양성이 과학을 풍요롭게 해요</span>이 숨겨진 천재들의 이야기는 단순한 불공평함의 기록이 아니에요. <span class="hl-gold">누가 과학에 기여하도록 허용받는가</span>라는 질문이 과학의 발전 속도에도 영향을 미쳐요. 더 다양한 시각이 허용될수록, 과학은 더 빠르게 진보할 수 있어요.</div>`
      }
    ]
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
    <span>🗓 ${data.date || '2026년'}</span>
  `;

  // Store chapters globally for switchChapter to access
  window._currentChapters = data.chapters || [];

  const bodyEl = overlay.querySelector('#reader-body');
  bodyEl.innerHTML = data.body;

  // Inject chapter navigation below intro body if chapters exist
  if (data.chapters && data.chapters.length) {
    const navHtml = `<div class="chapter-nav" id="chapter-nav">
      <div class="chapter-nav-title">📚 세부 항목</div>
      ${data.chapters.map((ch, i) =>
        `<button class="chapter-btn" data-idx="${i}" onclick="switchChapter(this,${i})">${ch.icon ? ch.icon + ' ' : ''}${ch.title}</button>`
      ).join('')}
    </div>
    <div id="chapter-content-area"></div>`;
    bodyEl.insertAdjacentHTML('beforeend', navHtml);
  }

  overlay.querySelector('#reader-related').innerHTML = generateRelated(catId, itemId);

  overlay.classList.add('open');
  overlay.scrollTop = 0;
  document.body.style.overflow = 'hidden';

  // Progress bar (replace listener to avoid stacking)
  const bar = overlay.querySelector('.reader-progress');
  const onScroll = () => {
    const pct = overlay.scrollTop / (overlay.scrollHeight - overlay.clientHeight) * 100;
    if (bar) bar.style.width = pct + '%';
  };
  overlay.removeEventListener('scroll', overlay._scrollHandler);
  overlay._scrollHandler = onScroll;
  overlay.addEventListener('scroll', onScroll, { passive: true });
}

function switchChapter(btn, idx) {
  const chapters = window._currentChapters;
  if (!chapters || !chapters[idx]) return;
  const ch = chapters[idx];

  // Highlight active button
  btn.closest('.chapter-nav').querySelectorAll('.chapter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const area = document.getElementById('chapter-content-area');
  if (!area) return;
  area.innerHTML = `<div class="chapter-body">
    <div class="chapter-breadcrumb" onclick="clearChapter()">← 소개글로 돌아가기</div>
    <h2>${ch.icon ? ch.icon + ' ' : ''}${ch.title}</h2>
    ${ch.body}
  </div>`;
  area.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function clearChapter() {
  const area = document.getElementById('chapter-content-area');
  if (area) area.innerHTML = '';
  document.querySelectorAll('.chapter-btn').forEach(b => b.classList.remove('active'));
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
