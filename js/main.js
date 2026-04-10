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

  /* ── 수성 ── */
  'mercury': {
    title: '수성 — 태양에 가장 가까운 행성의 극단적 세계',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '9', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>수성은 태양에서 가장 가까운 행성이에요. 태양까지 평균 거리는 약 <span class="hl">5790만 km</span> — 지구의 절반도 안 돼요. 그런데 놀랍게도 수성은 태양계에서 가장 뜨거운 행성이 아니에요. 그 타이틀은 금성이 가지고 있죠. 이유는 대기에 있어요.</p>

      <div class="callout"><span class="callout-icon">☿ 수성 기본 정보</span>지름: 지구의 <span class="hl">38%</span> (약 4,880km) · 하루: 지구 시간으로 <span class="hl-gold">59일</span> · 1년: 지구의 88일 · 낮 온도: 최고 430°C · 밤 온도: 최저 -180°C · 대기: 거의 없음</div>

      <p>수성에는 대기가 거의 없어요. 중력이 너무 약하고 태양풍이 강해서 대기를 붙들어둘 수 없거든요. 대기가 없으니 열을 저장하지 못하고, 낮과 밤의 온도 차이가 무려 <span class="hl">610°C</span>에 달해요. 낮에는 납이 녹고, 밤에는 이산화탄소가 얼어붙을 수 있는 온도예요.</p>

      <p>수성의 자전 속도는 매우 느려요. 공전(88일)보다 자전(59일)이 빠른 것처럼 보이지만, 실제로 수성 표면에서 보면 해가 뜨고 지는 한 낮이 <span class="hl">지구의 176일</span>에 해당해요. 게다가 수성에서 태양은 지구에서보다 3배 크게 보이고 밝기는 9배나 강해요.</p>

      <div class="callout"><span class="callout-icon">🛸 수성 탐사</span>2004년 발사된 NASA의 <span class="hl">메신저(MESSENGER)</span> 탐사선이 2011년 수성 궤도 진입에 성공했어요. 수성 표면 전체를 지도화하고, 북극 부근 영구 그늘진 분화구에 <span class="hl-gold">물 얼음</span>이 있다는 것도 발견했어요. 현재는 ESA/JAXA의 베피콜롬보 탐사선이 2025년 수성 도착을 목표로 비행 중이에요.</div>

      <p>수성 내부는 매우 특이해요. 행성 크기에 비해 <span class="hl">철 핵이 거대해서</span> 전체 부피의 약 85%를 차지해요. 왜 이렇게 핵이 클까요? 아주 오래전 거대한 천체가 충돌해 외층이 날아가 버렸기 때문이라는 이론이 유력해요.</p>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>수성은 가장 가까운 곳에 있지만 가장 알기 어려운 행성이기도 해요. 태양 근처라 관측이 어렵고, 탐사선을 보내기도 까다롭죠. <span class="hl-gold">가까이 있어도 이해하기 어려운 것들이 있어요</span> — 우주도, 사람도 마찬가지예요.</p></div>
    `
  },

  /* ── 금성 ── */
  'venus': {
    title: '금성 — 지구의 쌍둥이, 그러나 지옥 같은 세계',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '10', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>금성은 밤하늘에서 달 다음으로 밝게 보이는 천체예요. 서양에서는 샛별, 저녁별로 불렸고, 로마 신화의 사랑과 미의 여신 <span class="hl-gold">베누스(Venus)</span>의 이름을 붙였어요. 하지만 가까이서 보면, 금성은 지옥과 가장 닮은 행성이에요.</p>

      <div class="callout"><span class="callout-icon">♀ 금성 기본 정보</span>지름: 지구의 <span class="hl">95%</span> · 질량: 지구의 82% · 하루: 지구의 243일 (자전이 공전보다 느림!) · 1년: 지구의 225일 · 표면 온도: <span class="hl-gold">465°C</span> (항상, 낮밤 불문) · 대기: 96% 이산화탄소</div>

      <p>금성의 표면 온도는 <span class="hl">465°C</span>로, 태양계에서 가장 뜨거운 행성이에요. 수성보다 태양에서 두 배나 멀지만 훨씬 더 뜨거운 이유는 <span class="hl">극단적 온실효과</span> 때문이에요. 두꺼운 이산화탄소 대기가 열을 가두어 절대 식지 않아요. 지구 온난화가 극단으로 치달으면 어떻게 되는지 금성이 보여주는 거예요.</p>

      <p>금성은 또 <span class="hl">역방향으로 자전</span>해요. 다른 행성들(천왕성 제외)과 반대 방향이죠. 금성에서 태양은 서쪽에서 뜨고 동쪽으로 져요. 왜 역방향으로 자전하는지는 아직 완전히 밝혀지지 않았어요 — 초기 대형 충돌, 혹은 조석력의 영향이라는 이론이 있어요.</p>

      <div class="callout"><span class="callout-icon">🔴 황산 구름</span>금성 대기에는 짙은 <span class="hl">황산 구름</span>이 가득해요. 이 구름이 태양빛을 70% 반사해서 금성이 그렇게 밝게 보이는 거예요. 하지만 표면에 도달한 빛은 갇혀 빠져나오지 못하죠. 황산 비가 내리지만 뜨거운 대기에서 증발해 지면에 닿지도 못해요.</div>

      <p>金星(금성)이 지구와 비슷한 크기·질량이라 '쌍둥이 행성'이라 불려요. 하지만 둘의 운명은 왜 이렇게 달라졌을까요? 자기장의 유무, 물의 존재, 판구조론의 활성화 여부 등이 핵심 차이로 꼽혀요. 지구가 지금처럼 생명 친화적인 이유를 이해하는 데 <span class="hl-gold">금성의 재앙적 역사</span>가 역설적으로 큰 단서가 돼요.</p>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>금성은 지구에게 보내는 경고장 같아요. 온실가스가 통제 불능이 되면 어떤 행성이 되는지 — <span class="hl-gold">그 미래의 모습이 지금 밤하늘에서 반짝이고 있어요.</span></p></div>
    `
  },

  /* ── 지구 ── */
  'earth': {
    title: '지구 — 지금까지 알려진 유일한 생명의 행성',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '11', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>1990년 2월, 우주 탐사선 보이저 1호가 태양계 끝에서 카메라를 돌려 지구를 찍었어요. 사진에서 지구는 황량한 우주 공간 속 <span class="hl">0.12 픽셀짜리 점</span>이었어요. 칼 세이건은 이것을 "창백한 푸른 점(Pale Blue Dot)"이라 불렀어요. 그 점 위에 인류의 모든 역사, 모든 전쟁, 모든 사랑이 있었죠.</p>

      <div class="callout"><span class="callout-icon">🌍 지구 기본 정보</span>지름: 약 <span class="hl">12,742km</span> · 나이: 약 46억 년 · 표면 온도: 평균 15°C · 대기: 78% 질소, 21% 산소 · 위성: 달(1개) · 자전 주기: 23시간 56분 · 공전 주기: 365.25일</div>

      <p>지구가 생명 친화적인 이유는 무엇일까요? 첫째, 태양으로부터 딱 적당한 거리인 <span class="hl">생명 거주 가능 구역(골디락스 존)</span>에 있어요. 둘째, 액체 상태의 물이 표면을 덮고 있어요. 셋째, <span class="hl">자기장</span>이 태양풍으로부터 대기를 보호해요. 넷째, 달의 중력이 지구 자전축을 안정시켜 기후를 일정하게 유지해요. 이 조건들이 모두 맞아떨어진 건 정말 희귀한 우연이에요.</p>

      <p>지구는 살아있는 행성이에요. <span class="hl">판구조론(Plate Tectonics)</span>이 활발하게 작동해 대륙이 이동하고 화산이 폭발하며 산맥이 형성돼요. 이 과정이 탄소 순환을 통해 대기 성분을 조절하고, 생명에 필요한 원소들을 재순환시켜요. 판구조론이 없는 금성과 화성이 지구처럼 될 수 없었던 이유 중 하나예요.</p>

      <div class="callout"><span class="callout-icon">🌙 달이 없었다면?</span>달은 약 45억 년 전 화성 크기의 천체가 지구에 충돌해 튕겨나온 파편이 뭉쳐 형성됐어요. 달의 조석력은 지구 자전축(현재 23.5° 기울기)을 안정시켜요. 달이 없었다면 자전축이 수십 도씩 흔들려 <span class="hl-gold">기후가 대격변</span>했을 거예요. 달이 지구 생명의 숨은 수호자인 셈이에요.</div>

      <p>지금 지구는 <span class="hl">여섯 번째 대멸종</span> 시대를 맞고 있다고 과학자들이 경고해요. 과거 다섯 번의 대멸종은 소행성 충돌이나 거대 화산 폭발이 원인이었지만, 이번은 처음으로 하나의 생물종 — 인류 — 이 원인이에요. 지구는 46억 년의 역사를 이어왔지만, 앞으로 어떤 모습일지는 우리의 선택에 달려있어요.</p>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>칼 세이건은 말했어요: "우리의 작은 세계를 생각해보세요. 이 광대한 우주의 어둠 속 외로운 티끌 위에서 우리가 서로에게 얼마나 친절해야 하는지." <span class="hl-gold">지구가 얼마나 소중한지를 이해하는 것, 그게 천문학이 우리에게 주는 가장 값진 선물이에요.</span></p></div>
    `
  },

  /* ── 목성 ── */
  'jupiter': {
    title: '목성 — 태양계의 왕, 지구의 보호자',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '11', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>목성은 말 그대로 태양계의 왕이에요. 지름이 지구의 <span class="hl">11배</span>, 질량은 지구의 <span class="hl">318배</span>예요. 나머지 7개 행성을 모두 합쳐도 목성 질량의 절반밖에 안 돼요. 만약 목성이 지금보다 75배 더 무거웠다면 핵융합을 시작해 또 하나의 별이 됐을 거예요 — 우리 태양계는 쌍성 시스템이 됐을 수도 있었죠.</p>

      <div class="callout"><span class="callout-icon">🪐 목성 기본 정보</span>지름: 지구의 <span class="hl">11배</span> (약 142,984km) · 질량: 지구의 318배 · 하루: 약 10시간 (가장 빠른 자전) · 1년: 지구의 12년 · 위성 수: <span class="hl-gold">95개 이상</span> · 고리: 있음(희미)</div>

      <p>목성의 가장 유명한 특징은 <span class="hl">대적점(Great Red Spot)</span>이에요. 300년 넘게 지속되는 초대형 폭풍으로, 크기가 한때 지구 3개만 했어요. 최근 수십 년 동안 줄어들고 있지만 여전히 지구 하나보다 커요. 시속 430km의 강풍이 지속적으로 부는 이 폭풍이 왜 수백 년을 지속할 수 있는지는 아직 완전히 설명되지 않았어요.</p>

      <p>목성은 <span class="hl">태양계의 보호자</span>라고도 불려요. 강한 중력이 소행성과 혜성을 끌어당겨 지구 쪽으로 오는 것을 막아주거든요. 1994년 슈메이커-레비 9 혜성이 목성에 충돌하는 장면을 인류가 실시간으로 지켜봤는데, 그 에너지는 지구 핵무기 전체를 합친 것의 수백 배였어요. 목성이 없었다면 그 혜성이 지구를 향했을지도 몰라요.</p>

      <div class="callout"><span class="callout-icon">🌊 갈릴레이 위성</span>1610년 갈릴레오가 발견한 4개의 위성 — <span class="hl">이오, 유로파, 가니메데, 칼리스토</span> — 는 각각 독특한 세계예요. 이오는 태양계에서 가장 화산 활동이 활발하고, 유로파는 얼음 아래 생명체가 살 수 있는 바다가 있을 가능성이 높아요. 가니메데는 태양계에서 가장 큰 위성으로 수성보다도 크죠.</div>

      <p>NASA의 <span class="hl">주노(Juno)</span> 탐사선은 2016년부터 목성 궤도를 돌며 내부 구조와 자기장을 조사하고 있어요. 목성 내부에는 아직 불확실한 게 많아요 — 암석 핵이 있는지, 표면 아래에서 수소가 금속처럼 행동하는 <span class="hl-gold">금속성 수소</span> 층이 있는지 등을 연구 중이에요.</p>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>목성은 우리가 의식하지 못하는 사이에 수십억 년 동안 지구를 지켜왔을지도 몰라요. <span class="hl-gold">보이지 않는 곳에서 묵묵히 지키는 존재</span>의 소중함 — 우주에서도, 삶에서도 있어요.</p></div>
    `
  },

  /* ── 토성 ── */
  'saturn': {
    title: '토성 — 태양계의 보석, 고리의 신비',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '10', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>처음 망원경으로 토성을 본 갈릴레오는 당황했어요. 뭔가 옆에 붙어있는 것처럼 보였거든요. 나중에 네덜란드 천문학자 크리스티안 하위헌스가 진실을 밝혔어요 — 그것은 붙어있는 게 아니라 <span class="hl">거대한 고리</span>였어요. 태양계에서 가장 아름다운 천체, 토성이에요.</p>

      <div class="callout"><span class="callout-icon">🪐 토성 기본 정보</span>지름: 지구의 <span class="hl">9.5배</span> (약 120,536km) · 질량: 지구의 95배 · 밀도: 물보다 낮음 (<span class="hl-gold">물에 뜰 수 있는 유일한 행성!</span>) · 하루: 약 10.7시간 · 위성 수: 146개 이상 · 고리: 7개 주요 고리</div>

      <p>토성의 고리는 주로 <span class="hl">얼음과 암석 조각</span>으로 이루어져 있어요. 크기는 수 cm에서 수십 m까지 다양하죠. 고리의 총 지름은 약 27만 km로 엄청나지만, 두께는 평균 <span class="hl">10m 내외</span>로 종이처럼 얇아요. 만약 고리를 피자 크기로 줄이면 두께는 사람 머리카락보다 훨씬 얇아요.</p>

      <p>토성의 고리는 영원하지 않아요. 현재 토성의 중력이 고리 물질을 끌어당겨 <span class="hl">1억 년 후면 고리가 사라질 수 있다</span>는 연구가 있어요. 우리는 태양계 역사의 아주 특별한 순간 — 토성에 고리가 있는 시기 — 에 살고 있는 셈이에요.</p>

      <div class="callout"><span class="callout-icon">🌊 엔셀라두스의 비밀</span>토성의 위성 <span class="hl">엔셀라두스(Enceladus)</span>는 얼음 지각 아래 바다에서 수증기와 유기물을 우주로 뿜어내요. 카시니 탐사선이 이 기둥을 직접 통과하며 유기분자를 검출했어요. 토성의 E 고리가 바로 엔셀라두스가 뿜어낸 물질로 이루어져 있어요. <span class="hl-gold">태양계에서 생명체 존재 가능성 1위 후보</span>예요.</div>

      <p><span class="hl">카시니-하위헌스 탐사선</span>은 2004년부터 2017년까지 13년간 토성을 탐사했어요. 타이탄에 탐사 프로브 하위헌스를 투하해 메탄 호수를 발견했고, 엔셀라두스의 수증기 기둥도 발견했어요. 카시니는 연료 소진 후 토성 대기 속으로 의도적으로 뛰어들며 임무를 마쳤어요 — 혹시 있을 생명체에 오염을 남기지 않기 위해서요.</p>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>고리는 아름답지만 덧없어요. 1억 년 후엔 사라질지도 몰라요. 하지만 지금 이 순간, <span class="hl-gold">우리는 토성이 가장 아름다운 시대에 태어났어요.</span></p></div>
    `
  },

  /* ── 천왕성 ── */
  'uranus': {
    title: '천왕성 — 옆으로 굴러다니는 얼음 거인',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '9', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>천왕성은 태양계에서 유일하게 자전축이 <span class="hl">98도</span> 기울어진 행성이에요. 거의 옆으로 누워서 태양을 공전해요. 이 때문에 천왕성의 북극은 태양을 향해 42년을 보내고, 그 다음 42년은 암흑 속에 있어요. 극단적인 계절 변화를 겪는 행성이죠.</p>

      <div class="callout"><span class="callout-icon">🔵 천왕성 기본 정보</span>지름: 지구의 <span class="hl">4배</span> (약 51,118km) · 질량: 지구의 14.5배 · 하루: 약 17시간 · 1년: 지구의 84년 · 표면 온도: 약 <span class="hl-gold">-224°C</span> (태양계에서 가장 차가운 행성!) · 위성: 27개</div>

      <p>천왕성은 <span class="hl">메탄</span> 성분이 대기에 포함되어 있어 청록색을 띄고 있어요. 메탄이 붉은 빛을 흡수하고 파란-초록 빛을 반사하기 때문이에요. 해왕성과 함께 '얼음 거인(Ice Giant)'으로 분류되는데, 내부에 액체 상태의 물, 메탄, 암모니아 혼합물이 있는 것으로 추정돼요.</p>

      <p>천왕성의 자전축이 왜 이렇게 기울었을까요? 가장 유력한 가설은 태양계 형성 초기에 <span class="hl">지구 크기 천체와의 충돌</span>이에요. 이 대형 충돌이 자전축을 거의 직각으로 눕혀놓은 거예요. 비슷한 이유로 자전 방향도 다른 대부분의 행성과 반대예요.</p>

      <div class="callout"><span class="callout-icon">🛰️ 아직 탐사선이 없어요</span>천왕성을 가까이서 탐사한 탐사선은 <span class="hl">1986년 보이저 2호</span>가 유일해요. 불과 6시간 동안 근접 비행하며 데이터를 수집했죠. 이후 40년 가까이 천왕성 전용 탐사선이 없었어요. NASA의 10년 계획(2023~2032 Decadal Survey)에서 <span class="hl-gold">천왕성 탐사를 최우선 과제로 선정</span>해 2030년대 발사를 목표로 하고 있어요.</div>

      <p>천왕성은 오랫동안 '지루한 행성'으로 여겨졌어요. 보이저가 찍은 사진에서 특별한 특징이 없어 보였거든요. 하지만 최근 허블 망원경 관측에서 강력한 폭풍과 역동적인 대기 현상이 발견되고 있어요. 태양에서 가장 멀기 때문에 에너지가 적어 조용해 보였을 뿐이에요.</p>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>천왕성은 '지루하다'는 편견에 가장 오래 갇혀 있던 행성이에요. 하지만 가까이 들여다보면 충분히 흥미로운 세계예요. <span class="hl-gold">처음에 별 특징 없어 보이는 것들이, 사실 가장 흥미로운 이야기를 숨기고 있을 때가 많아요.</span></p></div>
    `
  },

  /* ── 해왕성 ── */
  'neptune': {
    title: '해왕성 — 수학으로 예측하고 발견한 푸른 거인',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '10', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>1846년, 천문학자 요한 갈레는 망원경을 특정 좌표로 향했어요. 동료 수학자 르베리에가 뉴턴 역학으로 미리 계산해 준 위치였죠. 망원경 시야 안에 전에 없던 천체가 있었어요 — <span class="hl">해왕성</span>이었어요. 눈으로 보기도 전에 수학으로 존재를 예측한 행성, 인류 과학사의 가장 극적인 순간 중 하나예요.</p>

      <div class="callout"><span class="callout-icon">🔵 해왕성 기본 정보</span>지름: 지구의 <span class="hl">3.9배</span> (약 49,244km) · 질량: 지구의 17배 · 하루: 약 16시간 · 1년: 지구의 <span class="hl-gold">165년</span> · 표면 온도: 약 -200°C · 위성: 16개 · 최고 풍속: 시속 2,100km</div>

      <p>해왕성은 태양계에서 <span class="hl">바람이 가장 강한 행성</span>이에요. 시속 2,100km — 지구 최강 허리케인의 10배 이상이에요. 태양에서 에너지를 가장 적게 받는 행성인데 왜 이렇게 강한 바람이 부는지는 아직 완전히 설명되지 않았어요. 내부 열 에너지와 회전이 복합적으로 작용한다고 추정해요.</p>

      <p>해왕성의 색깔도 흥미로워요. 천왕성처럼 메탄이 있어서 파란색인데, 천왕성보다 <span class="hl">훨씬 진한 파란색</span>이에요. 뭔가 다른 성분이 색깔에 영향을 미치는 것 같지만 아직 밝혀지지 않았어요. 태양계에서 가장 풀리지 않은 색의 미스터리예요.</p>

      <div class="callout"><span class="callout-icon">🌑 트리톤 — 거꾸로 도는 위성</span>해왕성의 가장 큰 위성 <span class="hl">트리톤(Triton)</span>은 특이하게도 해왕성의 자전 방향과 <span class="hl-gold">반대 방향으로 공전</span>해요. 역행 궤도는 이 위성이 해왕성계에서 태어난 게 아니라 카이퍼 벨트에서 포획됐다는 증거예요. 트리톤은 매우 서서히 해왕성에 가까워지고 있어, 약 35억 년 후 조석력에 의해 파괴될 运命이에요.</div>

      <p>해왕성을 탐사한 탐사선도 보이저 2호가 유일해요. 1989년 단 6시간의 근접 비행으로 우리가 가진 대부분의 해왕성 데이터를 수집했어요. 해왕성까지 빛의 속도로도 4시간이 걸리고, 탐사선으로는 수십 년이 걸리는 거리예요. 그만큼 <span class="hl-gold">접근 자체가 도전인 행성</span>이에요.</p>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>해왕성은 직접 보기도 전에 수학으로 먼저 찾아낸 행성이에요. 관측이 이론을 이끌 때도 있지만, <span class="hl-gold">이론이 관측보다 한 발 앞서갈 때 — 그때 과학은 가장 아름다워요.</span></p></div>
    `
  },

  /* ── 왜소행성 ── */
  'dwarf': {
    title: '왜소행성 — 명왕성은 왜 행성에서 쫓겨났을까?',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '9', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>2006년 8월 24일은 명왕성에게 잊지 못할 날이에요. 국제천문연맹(IAU) 총회에서 <span class="hl">명왕성이 행성에서 제외</span>됐거든요. 교과서를 다시 써야 했고, 전 세계 사람들이 충격을 받았어요. 심지어 미국에서는 "우리가 발견한 유일한 행성을 빼앗겼다"는 정서로 일부 주에서 '명왕성은 여전히 행성'이라는 법안까지 통과됐어요.</p>

      <div class="callout"><span class="callout-icon">📋 행성의 3가지 조건 (IAU 2006)</span>① 태양을 공전한다 ② <span class="hl">자체 중력으로 구형이 될 만큼 크다</span> ③ <span class="hl-gold">궤도 주변 공간을 지배했다 (청소했다)</span> — 명왕성은 ③번 조건을 충족 못했어요. 카이퍼 벨트 천체들과 공간을 공유하고 있거든요.</div>

      <p>명왕성이 쫓겨난 건 작아서가 아니에요. 실제로 명왕성은 달보다도 작지만, 그게 직접적인 이유는 아니에요. 진짜 이유는 <span class="hl">에리스(Eris)</span>의 발견이에요. 2005년 발견된 에리스는 명왕성보다 약간 크거나 비슷한 크기의 천체예요. 에리스를 행성으로 부르기 시작하면 앞으로 발견될 비슷한 천체들을 모두 행성이라 불러야 했어요. 그래서 과학자들이 '행성' 기준을 다시 정하면서 명왕성도 새 기준에 맞지 않게 됐죠.</p>

      <p>현재 공식으로 인정된 왜소행성은 <span class="hl">5개</span>예요: 명왕성, 에리스, 마케마케, 하우메아, 세레스(소행성대). 하지만 카이퍼 벨트와 그 너머에는 왜소행성 기준에 맞는 천체가 수백~수천 개 더 있을 것으로 추정돼요.</p>

      <div class="callout"><span class="callout-icon">❤️ 그래도 명왕성은 특별해요</span>2015년 NASA의 <span class="hl">뉴허라이즌스(New Horizons)</span> 탐사선이 명왕성을 근접 통과했어요. 그때 찍힌 사진 속 명왕성에는 거대한 하트 모양 질소 평원이 있었어요. 사람들은 "명왕성이 우리에게 하트를 보냈다"고 했죠. <span class="hl-gold">이름이 뭐든, 명왕성은 여전히 아름다운 세계예요.</span></div>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>명왕성 사태는 과학이 살아있다는 증거예요. 새로운 발견이 오래된 정의를 바꾸는 것 — <span class="hl-gold">틀릴 용기, 그리고 수정할 용기가 과학을 앞으로 나아가게 해요.</span></p></div>
    `
  },

  /* ── 소행성 ── */
  'asteroid': {
    title: '소행성 — 태양계의 화석, 그리고 지구의 위협',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '10', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>6600만 년 전, 지름 약 10km의 소행성이 지금의 멕시코 유카탄 반도에 충돌했어요. 충격으로 발생한 먼지구름이 수년간 태양을 가려 지구 기온이 급격히 떨어졌고, <span class="hl">공룡을 포함한 생물종의 75%가 멸종</span>했어요. 하지만 그 멸종이 포유류에게 기회를 줬고, 결국 인류가 탄생했죠. 소행성이 없었다면 우리도 없었을지 몰라요.</p>

      <div class="callout"><span class="callout-icon">🪨 소행성이란?</span>소행성은 태양계 형성 초기에 행성이 되지 못하고 남은 암석 천체예요. 대부분 화성과 목성 사이의 <span class="hl">소행성대(Asteroid Belt)</span>에 집중돼 있고, 수십만 개 이상이 목록에 올라 있어요. 크기는 수 m부터 수백 km까지 다양해요.</div>

      <p>소행성은 단순한 돌덩어리가 아니에요. 태양계 형성 초기의 원료 물질을 보존한 <span class="hl">우주의 화석</span>이에요. 소행성을 분석하면 태양계가 어떻게 만들어졌는지 알 수 있죠. NASA의 오시리스-렉스(OSIRIS-REx)는 소행성 베누(Bennu)에서 <span class="hl-gold">탄소 화합물과 물 성분</span>을 담은 샘플을 2023년 지구로 가져왔어요. 생명의 기원을 연구하는 중요한 단서가 됐어요.</p>

      <p>현재 NASA는 <span class="hl">잠재적 위험 소행성(PHAs)</span>을 2000개 이상 추적하고 있어요. 그 중 지름 140m 이상이며 지구 접근 거리 750만 km 이내로 오는 것들을 집중 감시해요. 인류 역사상 처음으로 2022년 NASA는 소행성 궤도를 실제로 바꾸는 데 성공했어요 — <span class="hl">DART 미션</span>이에요.</p>

      <div class="callout"><span class="callout-icon">🛸 DART — 인류의 첫 행성 방어</span>2022년 9월, NASA의 DART 탐사선이 소행성 디모르포스(Dimorphos)에 고의로 충돌해 <span class="hl">공전 주기를 32분 단축</span>시키는 데 성공했어요. 이는 우주 공학으로 소행성 궤도를 실제로 변경한 최초 사례예요. <span class="hl-gold">행성 방어 기술이 현실이 됐어요.</span></div>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>소행성이 공룡을 멸종시켰지만, 그 덕에 우리가 있어요. 그리고 지금 우리는 그 소행성으로부터 지구를 지키는 기술을 만들고 있죠. <span class="hl-gold">위협이 때론 진화의 동력이 돼요.</span></p></div>
    `
  },

  /* ── 혜성 ── */
  'comet': {
    title: '혜성 — 꼬리 달린 방랑자, 생명의 씨앗일지도',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '10', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>옛날 사람들에게 혜성은 재앙의 전조였어요. 불길하게 빛나는 꼬리별이 왕의 죽음이나 전쟁을 예고한다고 믿었죠. 1066년 영국 정복 전쟁 직전에 나타난 핼리 혜성은 바이외 타피스리에 기록되어 있어요. 하지만 이제 우리는 알아요 — 혜성은 재앙이 아니라 <span class="hl">우주의 방랑자이자 생명의 전령</span>일 수 있다는 걸.</p>

      <div class="callout"><span class="callout-icon">☄️ 혜성의 구조</span><span class="hl">핵(Nucleus)</span>: 얼음과 먼지로 된 본체, 수 km ~ 수십 km · <span class="hl">코마(Coma)</span>: 핵에서 증발한 가스와 먼지 구름 · <span class="hl-gold">꼬리</span>: 태양풍에 밀려 항상 태양 반대 방향으로 뻗음 (수백만 km 이상!)</div>

      <p>혜성은 <span class="hl">얼음과 먼지</span>로 이루어진 천체예요. 평소에는 태양계 외곽에서 얼어붙어 있다가, 태양 가까이 오면 열에 의해 얼음이 승화해 거대한 코마와 꼬리를 만들어요. 꼬리는 언제나 태양 반대 방향 — 우주를 여행하며 꼬리가 앞에서 끌기도 해요.</p>

      <p>혜성이 지구 생명과 연관될 수 있는 이유는 <span class="hl">유기 화합물</span> 때문이에요. 2004년 스타더스트 탐사선이 혜성 꼬리에서 글리신(아미노산의 일종)을 채취했어요. 2014년 로제타 탐사선이 착륙한 혜성 67P에서도 유기분자가 발견됐죠. 지구 초기에 혜성이 쏟아지면서 <span class="hl-gold">물과 유기분자를 가져다줬다는 가설</span>이 점점 설득력을 얻고 있어요.</p>

      <div class="callout"><span class="callout-icon">🌟 핼리 혜성</span>핼리 혜성은 약 <span class="hl">75~76년</span> 주기로 지구 가까이 오는 유명한 단주기 혜성이에요. 에드먼드 핼리가 1705년 여러 역사 기록의 혜성이 동일 천체임을 밝히고 다음 출현 시기를 예측했어요 — 정확히 맞았죠. 다음 핼리 혜성은 <span class="hl-gold">2061년</span>에 볼 수 있어요.</div>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>우리 몸속의 물이, 생명의 재료가 혜성에서 왔을 수도 있어요. 수십억 년 전 우주를 떠돌던 얼음 덩어리가 오늘의 당신을 만드는 재료가 됐다면 — <span class="hl-gold">우주와 나 사이의 거리가 생각보다 가깝지 않나요?</span></p></div>
    `
  },

  /* ── 유성 ── */
  'meteor': {
    title: '유성 — 별똥별의 진짜 정체와 유성우 이야기',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '9', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>"별똥별에 소원을 빌면 이루어진다"는 말, 들어보셨죠? 그 '별똥별'의 진짜 정체는 별이 아니에요. 우주 공간의 작은 먼지 알갱이나 돌조각이 지구 대기에 진입해 <span class="hl">대기와의 마찰로 타오르는 현상</span>이에요. 대부분은 완두콩만 한 크기죠.</p>

      <div class="callout"><span class="callout-icon">🌠 유성 관련 용어 구분</span><span class="hl">유성체(Meteoroid)</span>: 우주에 있는 암석 알갱이 · <span class="hl">유성(Meteor)</span>: 대기에서 타오르는 빛 현상 (별똥별) · <span class="hl-gold">운석(Meteorite)</span>: 다 타지 않고 지면에 떨어진 조각 · 유성우(Meteor Shower): 유성이 한꺼번에 쏟아지는 현상</div>

      <p>유성우는 지구가 혜성이 남기고 간 <span class="hl">먼지 흔적(Stream)</span>을 통과할 때 발생해요. 마치 차가 비를 운전하면 앞 유리에 빗방울이 쏟아지는 것처럼, 지구가 먼지 떼를 뚫고 지나가면 수십~수백 개의 유성이 한꺼번에 쏟아져요. 유성우 이름은 보통 방사점(유성이 나오는 것처럼 보이는 별자리)에서 따요: 페르세우스자리 유성우, 사자자리 유성우 등이에요.</p>

      <p>연간 주요 유성우들을 알아두면 맨눈으로도 장관을 볼 수 있어요. <span class="hl">페르세우스자리 유성우</span>(8월 중순, 시간당 50~100개)와 <span class="hl">쌍둥이자리 유성우</span>(12월 중순, 시간당 100~150개)가 가장 인기 있어요.</p>

      <div class="callout"><span class="callout-icon">💎 운석의 가치</span>지구에 떨어진 운석은 우주의 원시 물질이에요. 특히 화성이나 달에서 온 운석, 또는 탄소질 콘드라이트 운석은 <span class="hl-gold">그램당 수백만 원이 넘는 귀한 표본</span>이에요. 1984년 남극에서 발견된 ALH84001 운석은 화성에서 온 것으로, 한때 화성 생명체의 흔적이 있다는 주장이 있어 큰 화제가 됐어요.</div>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>소원을 빌 때 쓰는 그 순간은 사실 수백만 년을 우주를 떠돌다 지구와 만나는 먼지의 마지막 순간이에요. <span class="hl-gold">찰나의 빛 속에 긴 여정이 있어요.</span></p></div>
    `
  },

  /* ── 카이퍼 벨트 ── */
  'kuiper': {
    title: '카이퍼 벨트 — 해왕성 너머의 얼음 왕국',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '9', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>태양계는 해왕성으로 끝나지 않아요. 그 너머에는 눈에 잘 띄지 않지만 거대한 세계가 펼쳐져 있어요. <span class="hl">카이퍼 벨트(Kuiper Belt)</span>는 해왕성 궤도(30AU) 바깥부터 약 50AU까지, 수십억 개의 얼음 천체들이 고리처럼 둘러싸고 있는 영역이에요.</p>

      <div class="callout"><span class="callout-icon">💫 카이퍼 벨트 기본 정보</span>위치: 태양에서 <span class="hl">30~50AU</span> · 크기: 소행성대의 20배 이상 · 주요 천체: 명왕성, 에리스, 하우메아, 마케마케 · 주기: 단주기 혜성(200년 이하)의 고향 · 이름 유래: 천문학자 <span class="hl-gold">제라드 카이퍼</span>(1905~1973)</div>

      <p>카이퍼 벨트는 소행성대와 비슷하게 행성 형성 후 남은 찌꺼기예요. 하지만 소행성대(주로 암석)와 달리 카이퍼 벨트의 천체들은 대부분 <span class="hl">얼음, 메탄, 암모니아</span>로 이루어져 있어요. 태양에서 너무 멀어 형성 당시 온도가 낮아 얼음이 승화하지 않고 그대로 남아있는 거예요.</p>

      <p>2015년, NASA의 <span class="hl">뉴허라이즌스(New Horizons)</span> 탐사선이 최초로 명왕성을 가까이 지나갔어요. 사진 속 명왕성은 놀라울 만큼 다채로웠어요 — 질소 얼음으로 된 거대한 하트 모양 평원, 산과 계곡, 짙은 색의 지형들. 이 '지루해 보이는' 냉동 세계가 이렇게 활발한 지형을 가지고 있다는 게 과학자들을 놀라게 했어요.</p>

      <div class="callout"><span class="callout-icon">🌌 카이퍼 절벽 미스터리</span>50AU 근방에서 갑자기 카이퍼 벨트 천체 수가 급격히 줄어드는 현상을 <span class="hl">카이퍼 절벽(Kuiper Cliff)</span>이라 해요. 왜 이런 절벽이 생겼는지 아직 미스터리예요. <span class="hl-gold">알려지지 않은 대형 천체(Planet 9?)의 중력 영향</span>이라는 가설이 있어요.</div>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>카이퍼 벨트는 태양계 형성 초기의 모습을 냉동 보관한 타임캡슐이에요. <span class="hl-gold">가장 멀고 차가운 곳에 가장 오래된 이야기가 숨어 있어요.</span></p></div>
    `
  },

  /* ── 오르트 구름 ── */
  'oort': {
    title: '오르트 구름 — 태양계의 진짜 끝, 그리고 혜성의 고향',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '9', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>태양계의 진짜 경계는 어디일까요? 카이퍼 벨트보다 훨씬 더 먼 곳 — 태양에서 2000~10만 AU에 이르는 거대한 구형 껍질이 있어요. <span class="hl">오르트 구름(Oort Cloud)</span>이에요. 1950년 네덜란드 천문학자 얀 오르트가 장주기 혜성의 궤도를 분석해 그 존재를 제안했어요. 아직 직접 관측된 적은 없지만, 혜성들이 쏟아내는 단서들로 존재를 추정하고 있어요.</p>

      <div class="callout"><span class="callout-icon">🌐 오르트 구름 기본 정보</span>위치: 태양에서 <span class="hl">2,000~100,000 AU</span> (약 1광년) · 형태: 구형 껍질 (카이퍼 벨트는 원반형) · 추정 천체 수: 수조 개 · 역할: <span class="hl-gold">장주기 혜성(200년 이상)의 고향</span></div>

      <p>오르트 구름에 있는 천체들은 태양의 중력에 간신히 묶여 있어요. 근처를 지나가는 별의 중력이나 은하조석력에 의해 궤도가 흔들리면, 일부 천체가 태양 방향으로 낙하해 <span class="hl">장주기 혜성</span>이 돼요. 수천~수백만 년 주기로 태양 가까이 오는 혜성들이 바로 여기서 왔어요.</p>

      <p>오르트 구름의 가장 바깥 경계는 태양에서 약 <span class="hl">1광년</span>까지 뻗어 있어요. 4.2광년 거리인 가장 가까운 별 프록시마 센타우리까지 거리의 약 1/4이에요. 인류가 보낸 가장 빠른 탐사선 보이저 1호도 오르트 구름 내부에 도달하려면 앞으로 <span class="hl-gold">300년</span>, 완전히 빠져나오려면 3만 년이 걸려요.</p>

      <div class="callout"><span class="callout-icon">🎵 윤하의 노래처럼</span>가수 윤하의 노래 '오르트구름'은 광막한 우주 속에서 외롭게 탐사하는 보이저 탐사선의 시점으로 쓰인 노래예요. "<span class="hl">오르트구름을 넘어서</span>" — 그 가사처럼 오르트 구름은 태양계를 떠나 진짜 성간 공간으로 나아가는 마지막 관문이에요.</div>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>오르트 구름은 인류가 아직 한 번도 직접 보지 못한 태양계의 가장자리예요. 보이지 않아도 존재하는 것들 — <span class="hl-gold">우주에도, 삶에도 그런 것들이 있죠.</span></p></div>
    `
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
  },

  /* ── 성운·성단 ── */
  'nebula': {
    title: '성운과 성단 — 별의 요람과 별들의 가족',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '10', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>허블 우주망원경이 찍은 사진 중 가장 유명한 것 하나는 <span class="hl">독수리 성운의 창조의 기둥(Pillars of Creation)</span>이에요. 수광년 높이의 가스와 먼지 기둥 안에서 새로운 별들이 지금도 태어나고 있어요. 성운은 우주의 산부인과예요.</p>

      <div class="callout"><span class="callout-icon">🌌 성운(Nebula)의 종류</span><span class="hl">방출 성운</span>: 주변 별 빛에너지로 가스가 빛을 냄 · <span class="hl">반사 성운</span>: 별빛을 반사해 파랗게 보임 · <span class="hl">암흑 성운</span>: 뒤 별빛을 가려 어둡게 보임 · <span class="hl-gold">행성상 성운</span>: 죽어가는 별이 내뿜은 외피층 · <span class="hl-gold">초신성 잔해</span>: 거대 별 폭발 후 남은 구조</div>

      <p>성운에는 별의 탄생 장면만 있는 게 아니에요. '행성상 성운'은 우리 태양 같은 중소형 별이 <span class="hl">일생을 마치며 뿜어내는 가스 껍질</span>이에요. 이름에 '행성'이 들어간 건 과거 망원경으로 보면 행성처럼 보였기 때문이에요 — 실제로 행성과는 무관해요. 약 50억 년 후 태양도 이런 행성상 성운을 남기고 생을 마칠 거예요.</p>

      <p>성단은 같은 성운에서 동시에 태어난 <span class="hl">별들의 가족</span>이에요. <span class="hl">산개성단(Open Cluster)</span>은 수백~수천 개의 젊은 별이 느슨하게 모인 무리이고, <span class="hl">구상성단(Globular Cluster)</span>은 수만~수백만 개의 오래된 별이 공 모양으로 빽빽이 뭉친 천체예요. 우리 은하 주변에는 약 150개의 구상성단이 있어요.</p>

      <div class="callout"><span class="callout-icon">⭐ 플레이아데스와 오리온 성운</span><span class="hl">플레이아데스(좀생이별)</span>는 황소자리의 아름다운 산개성단으로, 맨눈으로 6~7개가 보여요. 동서양 모두 신화에 등장하는 별자리예요. <span class="hl-gold">오리온 성운(M42)</span>은 1,350광년 거리에 있는 거대 방출 성운으로, 쌍안경으로도 쉽게 볼 수 있는 별의 탄생 지역이에요.</div>

      <p>성운과 성단 관측은 아마추어 천문가들에게도 인기 높은 대상이에요. 프랑스 천문가 <span class="hl">샤를 메시에</span>가 18세기에 혜성으로 착각하기 쉬운 천체들을 목록화한 게 지금의 <span class="hl-gold">메시에 목록(M1~M110)</span>이에요. 오리온 성운은 M42, 게성운은 M1이에요.</p>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>우리 몸을 이루는 원자들은 오래전 성운에서 태어난 별 속에서 만들어졌어요. 그 별이 죽으며 우주로 뿌린 원소들이 다시 뭉쳐 새 별과 행성, 그리고 생명이 됐어요. <span class="hl-gold">우리는 별의 잔해에서 태어났어요.</span></p></div>
    `
  },

  /* ── 행성거리 ── */
  'distance': {
    title: '행성까지의 거리 — 우주를 숫자로 느끼는 법',
    tags: [{ cls: 'intermediate', label: '🔭 중급' }],
    readTime: '10', difficulty: '🔭 중급', date: '2026년',
    body: `
      <p>숫자로 들으면 실감이 안 나요. 화성까지 2억 km라고 해도 얼마나 먼지 감이 없죠. 그래서 천문학자들은 더 실감 나는 방식으로 거리를 설명해요. 예를 들어, 빛이 달까지 가는 데 걸리는 시간은 <span class="hl">약 1.3초</span>예요. 태양까지는 <span class="hl">8분 20초</span>. 화성이 가장 가까울 때는 약 3분, 멀 때는 22분.</p>

      <div class="callout"><span class="callout-icon">🌌 빛의 속도로 느끼는 태양계</span>달: <span class="hl">1.3초</span> · 태양: <span class="hl">8.3분</span> · 화성(가까울 때): 3분 · 목성: 35~52분 · 토성: 70~90분 · 해왕성: 4.2시간 · 보이저 1호(현재): <span class="hl-gold">약 23시간</span></div>

      <p>행성 사이의 거리는 일정하지 않아요. 지구와 화성이 같은 방향으로 태양을 공전하므로, 가까워질 때(충)와 멀어질 때 거리 차이가 커요. 화성이 가장 가까울 때 약 <span class="hl">5400만 km</span>, 가장 멀 때 약 <span class="hl">4억 km</span> — 7배 이상 차이 나요. 이런 거리 변화가 화성 탐사선 발사 시기를 결정해요 (약 2년 2개월마다 발사 '창문'이 열려요).</p>

      <p>태양계 행성 간 거리를 측정하는 방법 중 가장 정밀한 건 <span class="hl">레이더 반사</span>예요. 전파를 금성이나 화성에 쏘고 돌아오는 시간을 재서 거리를 계산해요. 빛의 속도를 이용한 이 방법으로 <span class="hl">천문단위(AU)</span>의 정확한 값이 확립됐어요.</p>

      <div class="callout"><span class="callout-icon">🚀 거리와 탐사의 관계</span>거리가 곧 통신 지연이에요. 현재 화성에 있는 탐사 로버에게 명령을 보내면 최소 3분(최대 22분) 후에야 명령이 도착해요. 로버가 위험에 처해도 즉시 대응 불가 — 그래서 화성 로버는 <span class="hl-gold">충분한 자율성</span>을 갖추도록 설계돼요.</div>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>우리가 지금 보는 태양은 8분 20초 전의 태양이에요. 밤하늘의 별은 수백~수천 년 전 빛이에요. 우리는 <span class="hl-gold">시간을 잘라내어 공간을 보고 있어요.</span></p></div>
    `
  },

  /* ── 밝기 ── */
  'brightness': {
    title: '천체의 밝기 — 등급으로 이해하는 별빛',
    tags: [{ cls: 'intermediate', label: '🔭 중급' }],
    readTime: '9', difficulty: '🔭 중급', date: '2026년',
    body: `
      <p>밤하늘에서 가장 밝은 별은 어떤 별일까요? 눈에 보이는 가장 밝은 별은 <span class="hl">시리우스</span>예요. 하지만 가장 멀리서 봐도 실제로 가장 밝은 별일까요? 꼭 그렇지는 않아요. 거기엔 '겉보기 밝기'와 '절대 밝기'의 차이가 있어요.</p>

      <div class="callout"><span class="callout-icon">⭐ 등급(Magnitude) 시스템</span>기원전 히파르코스가 별을 1등성(밝음)~6등성(희미)으로 분류했어요. 현대에는 수치화해서 <span class="hl">5등급 차이 = 100배의 밝기 차이</span>로 정의해요. 1등급 차이는 약 2.5배(정확히는 100의 5제곱근). · 겉보기 등급(Apparent): 지구에서 보이는 밝기 · <span class="hl-gold">절대 등급(Absolute)</span>: 10 파섹(32.6광년) 거리에 뒀을 때의 밝기</div>

      <p>시리우스의 겉보기 등급은 <span class="hl">-1.46</span>으로 밤하늘의 별 중 가장 밝아요. 하지만 절대 등급은 +1.4예요. 반면 우리 은하에서 가장 밝은 별로 알려진 <span class="hl">R136a1</span>은 태양보다 수백만 배 밝지만 너무 멀어서 맨눈으로는 보이지도 않아요. 진짜 밝기를 알려면 거리를 반드시 고려해야 해요.</p>

      <p>등급의 기준점은 <span class="hl">베가(Vega)</span>예요. 겉보기 등급 0.0으로 정의됐어요. 밤하늘에서 보이는 대부분의 별은 1~6등급, 허블 우주망원경은 최대 약 <span class="hl">30등급</span>까지 관측할 수 있어요. 6등성의 1600만 배 어두운 천체까지 볼 수 있다는 뜻이에요.</p>

      <div class="callout"><span class="callout-icon">🌟 태양계 천체의 겉보기 등급</span>태양: <span class="hl">-26.7</span> · 보름달: -12.6 · 금성(최대): -4.9 · 목성(최대): -2.9 · 시리우스: -1.46 · 알파 센타우리: -0.27 · 육안 한계: <span class="hl-gold">약 +6</span></div>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>겉으로 빛나 보이는 것이 가장 밝은 것은 아니에요. 가까이 있어서 밝아 보일 수도 있죠. <span class="hl-gold">진짜 빛을 알려면, 우선 거리를 알아야 해요.</span></p></div>
    `
  },

  /* ── 스펙트럼 ── */
  'spectrum': {
    title: '스펙트럼 분석 — 별빛에 숨겨진 암호를 해독하다',
    tags: [{ cls: 'intermediate', label: '🔭 중급' }],
    readTime: '11', difficulty: '🔭 중급', date: '2026년',
    body: `
      <p>1835년 철학자 오귀스트 콩트는 말했어요: "별의 화학적 성분은 영원히 알 수 없을 것이다." 그러나 불과 수십 년 후, 과학자들은 별빛을 프리즘으로 분해해 <span class="hl">빛 속에 새겨진 원소 서명</span>을 읽어내게 됐어요. 콩트의 예언은 완전히 틀렸어요.</p>

      <div class="callout"><span class="callout-icon">🌈 스펙트럼이란?</span>별빛(백색광)을 분산시키면 무지개 색 띠가 나타나요. 이 연속 스펙트럼에 특정 파장의 <span class="hl">어두운 선(흡수선)</span>이 나타나는데, 각 원소는 고유한 파장의 빛을 흡수해요. 이 '바코드'를 분석하면 <span class="hl-gold">수십억 광년 떨어진 별의 화학 성분</span>을 알 수 있어요.</div>

      <p>1868년, 과학자들이 개기일식 때 태양 스펙트럼을 분석해 지구에 없는 새 원소를 발견했어요 — <span class="hl">헬륨(Helium)</span>이에요. 그리스어로 태양을 뜻하는 '헬리오스(Helios)'에서 이름을 땄죠. 지구에서 발견되기 27년 전에 태양에서 스펙트럼으로 먼저 발견된 원소예요.</p>

      <p>스펙트럼에는 화학 성분 외에도 많은 정보가 담겨 있어요. 별이 우리를 향해 움직이면 스펙트럼이 <span class="hl">청색 이동(Blueshift)</span>, 멀어지면 <span class="hl">적색 이동(Redshift)</span>해요 — 소리의 도플러 효과와 같은 원리예요. 이것으로 별과 은하의 운동 속도를 측정할 수 있어요. 허블이 은하들의 적색이동을 발견해 우주 팽창을 증명한 것도 바로 이 방법이에요.</p>

      <div class="callout"><span class="callout-icon">🔬 분광학의 현재</span>현대 분광학은 외계행성 대기 분석에도 쓰여요. 별빛이 행성 대기를 통과할 때 특정 파장이 흡수되는 걸 분석해 <span class="hl-gold">행성 대기 성분</span>을 알아내요. 제임스 웹 우주망원경이 이 임무에서 탁월한 능력을 발휘하고 있어요.</div>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>별까지 날아가지 않아도, 별이 내뿜는 빛 속에 이미 모든 답이 있어요. <span class="hl-gold">무언가를 깊이 들여다보면, 처음에 보이지 않던 것들이 보이기 시작해요.</span></p></div>
    `
  },

  /* ── 색깔과 온도 ── */
  'color-temp': {
    title: '별의 색깔과 온도 — 붉은 별이 차갑고 파란 별이 뜨겁다?',
    tags: [{ cls: 'intermediate', label: '🔭 중급' }],
    readTime: '9', difficulty: '🔭 중급', date: '2026년',
    body: `
      <p>불꽃을 보면 가장자리는 주황-붉은색, 중심은 파란색이에요. 온도가 높을수록 파란색이죠. 별도 마찬가지예요. <span class="hl">별의 색깔은 표면 온도를 나타내는 바로미터</span>예요. 붉은 별은 차갑고, 파란 별은 뜨거워요 — 일상의 직관과 반대인 것처럼 느껴질 수 있어요.</p>

      <div class="callout"><span class="callout-icon">🌡️ 별의 분광형 (OBAFGKM)</span><span class="hl">O형</span>: 30,000K 이상, 청백색 · <span class="hl">B형</span>: 10,000~30,000K, 청백색 · <span class="hl">A형</span>: 7,500~10,000K, 흰색 · <span class="hl-gold">F·G형</span>: 5,000~7,500K, 노란백색 (태양은 G형) · <span class="hl">K형</span>: 3,500~5,000K, 주황색 · <span class="hl">M형</span>: 2,000~3,500K, 붉은색</div>

      <p>분광형을 외우는 유명한 영어 메모리 기법은 <span class="hl">"Oh Be A Fine Girl/Guy, Kiss Me"</span>예요. 뜨거운 별(O)에서 차가운 별(M)까지의 순서예요. 우리 태양은 G형 별 — 중간 온도의 노란 별이에요. 정확히는 표면 온도가 약 <span class="hl">5,778K</span>예요.</p>

      <p>색깔과 온도의 관계는 <span class="hl">흑체복사(Blackbody Radiation)</span>로 설명해요. 온도가 높을수록 방출하는 빛의 피크 파장이 짧아져요. 짧은 파장 = 파란빛, 긴 파장 = 붉은빛. 이 관계를 <span class="hl">빈의 변위 법칙</span>이라고 해요. 덕분에 별의 색깔만 보면 온도를 추정할 수 있어요.</p>

      <div class="callout"><span class="callout-icon">🔴 베텔게우스 — 붉은 초거성</span>오리온자리 어깨에 있는 <span class="hl">베텔게우스</span>는 대표적인 M형 적색 초거성이에요. 표면 온도는 3,500K 정도로 낮지만, 크기가 태양의 700배 이상이어서 밝기는 태양의 수만 배예요. <span class="hl-gold">가까운 미래(천문학적으로)에 초신성 폭발</span>할 예정으로, 폭발 시 낮에도 보일 만큼 밝아질 거예요.</div>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>붉은 빛이 뜨겁다는 건 일상의 느낌이지만, 별의 세계에서는 반대예요. <span class="hl-gold">익숙한 기준이 항상 옳은 건 아니에요 — 세계가 달라지면, 규칙도 달라져요.</span></p></div>
    `
  },

  /* ── 별의 위치 ── */
  'position': {
    title: '별의 위치 찾기 — 천구와 좌표계의 원리',
    tags: [{ cls: 'intermediate', label: '🔭 중급' }],
    readTime: '10', difficulty: '🔭 중급', date: '2026년',
    body: `
      <p>밤하늘의 별은 마치 거대한 구의 안쪽 면에 박힌 것처럼 보여요. 천문학자들은 이 가상의 구를 <span class="hl">천구(Celestial Sphere)</span>라고 불러요. 그리고 이 천구 위에서 각 별의 위치를 정확하게 나타내기 위한 좌표계가 발전했어요.</p>

      <div class="callout"><span class="callout-icon">📐 적도 좌표계</span>가장 많이 쓰이는 좌표계예요. 지구의 적도를 하늘로 연장한 <span class="hl">천구 적도</span>를 기준면으로 삼아요. · <span class="hl">적경(RA, Right Ascension)</span>: 경도에 해당, 0h~24h · <span class="hl-gold">적위(Dec, Declination)</span>: 위도에 해당, -90°~+90° · 기준점: 춘분점(태양이 천구 적도를 북쪽으로 지나는 점)</div>

      <p>별의 위치는 지구의 자전과 공전에 따라 밤마다, 계절마다 달라져 보여요. 하지만 별 사이의 상대 위치(별자리 모양)는 변하지 않아요 — 별까지의 거리가 너무 멀어서 지구 궤도 크기 정도의 이동으로는 별 위치가 바뀌어 보이지 않거든요. 이 현상을 <span class="hl">항성 시차가 없어 보임</span>이라고 해요.</p>

      <p>실제로 별은 우주에서 서서히 움직이고 있어요. 이것을 <span class="hl">고유 운동(Proper Motion)</span>이라 해요. 수천~수만 년 후에는 별자리 모양이 지금과 달라져 있을 거예요. 예를 들어 북두칠성은 약 5만 년 후에는 지금과 상당히 다른 모양이 돼요.</p>

      <div class="callout"><span class="callout-icon">🧭 천체 좌표계의 종류</span>· <span class="hl">지평 좌표계</span>: 방위각 + 고도각, 관측자 중심 · <span class="hl">황도 좌표계</span>: 태양 공전 궤도면 기준, 행성 위치에 유용 · <span class="hl-gold">은하 좌표계</span>: 은하 평면 기준, 은하계 소속 천체 위치에 사용</div>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>우리가 별의 위치를 정확히 알 수 있는 건, 수천 년에 걸쳐 하늘을 기록한 사람들의 노력 덕분이에요. <span class="hl-gold">지식은 한 세대가 만들지 않아요 — 수천 년의 관찰이 쌓여서 만들어져요.</span></p></div>
    `
  },

  /* ── 별의 거리 ── */
  'star-distance': {
    title: '별까지의 거리 — 시차에서 세페이드까지',
    tags: [{ cls: 'intermediate', label: '🔭 중급' }],
    readTime: '11', difficulty: '🔭 중급', date: '2026년',
    body: `
      <p>별까지의 거리를 직접 잴 수는 없어요. 대신 천문학자들은 영리한 간접 방법들을 개발했어요. 이 방법들은 서로 다른 거리 범위에서 사용되며, 순차적으로 쌓아올려요 — 이것을 <span class="hl">우주 거리 사다리(Cosmic Distance Ladder)</span>라고 해요.</p>

      <div class="callout"><span class="callout-icon">📏 우주 거리 사다리의 단계</span>① <span class="hl">삼각 시차법</span>: 지구 공전 반지름을 기반으로 가까운 별(약 1000광년 이내) · ② <span class="hl">세페이드 변광성</span>: 맥동 주기-밝기 관계로 수백만 광년까지 · ③ <span class="hl-gold">Ia형 초신성</span>: 일정한 최대 밝기로 수십억 광년까지 · ④ 허블 법칙: 은하 적색이동으로 우주 끝까지</div>

      <p>가장 기본이 되는 방법은 <span class="hl">삼각 시차법(Parallax)</span>이에요. 6개월 간격(지구 공전 반지름의 양 끝)으로 별을 관측하면 가까운 별은 배경 별들에 대해 위치가 조금 달라 보여요. 이 각도를 '시차'라 하고, 시차가 1초각(1 arcsecond)인 거리를 <span class="hl">1 파섹(parsec, 약 3.26광년)</span>이라 정의해요.</p>

      <p>세페이드 변광성 방법은 헨리에타 스완 레빗이 발견한 원리예요. 세페이드 변광성은 맥동 주기가 길수록 더 밝아요. 주기를 측정하면 절대 밝기를 알 수 있고, 겉보기 밝기와 비교하면 거리를 계산할 수 있어요. 허블이 안드로메다까지의 거리를 처음 측정할 때 바로 이 방법을 썼어요.</p>

      <div class="callout"><span class="callout-icon">🛸 가이아 위성</span>2013년 발사된 ESA의 <span class="hl">가이아(Gaia)</span> 위성은 지금까지 가장 정밀한 우주 거리 지도를 만들고 있어요. 약 <span class="hl-gold">20억 개의 별</span>까지의 거리와 운동을 마이크로초각 정밀도로 측정했어요. 천문학 역사상 가장 방대한 별 목록이에요.</div>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>우주의 거리를 재는 건 끝이 없는 도전이에요. 한 방법이 한계에 다다르면, 그 위에 다른 방법을 올려 더 멀리 보려고 해요. <span class="hl-gold">지식도 그렇게 쌓여요 — 이전 세대가 올린 사다리 위에서.</span></p></div>
    `
  },

  /* ── 역학 ── */
  'dynamics': {
    title: '천체역학 — 행성이 움직이는 법칙',
    tags: [{ cls: 'intermediate', label: '🔭 중급' }],
    readTime: '10', difficulty: '🔭 중급', date: '2026년',
    body: `
      <p>밤하늘을 긴 시간 동안 관찰하다 보면 행성들이 별들 사이를 이리저리 움직인다는 걸 알 수 있어요. '행성(Planet)'이라는 단어 자체가 그리스어로 <span class="hl">'방랑자'</span>예요. 이 방랑자들의 운동 법칙을 밝혀낸 것이 천체역학의 시작이에요.</p>

      <div class="callout"><span class="callout-icon">🔭 케플러의 3가지 법칙</span>① <span class="hl">타원 궤도 법칙</span>: 행성은 태양을 초점으로 하는 타원 궤도로 공전 · ② <span class="hl">면적 속도 일정 법칙</span>: 태양에 가까울수록 빠르게 움직임 · ③ <span class="hl-gold">조화 법칙</span>: 공전 주기의 제곱 = 공전 반지름의 세제곱 (T² ∝ a³)</div>

      <p>케플러가 관측 데이터에서 경험적으로 발견한 이 법칙들을 수십 년 후 뉴턴이 <span class="hl">만유인력의 법칙</span>으로 이론적으로 설명했어요. 뉴턴의 역학은 대포알에서 달의 운동까지, 사과가 떨어지는 원리와 행성이 도는 원리가 <span class="hl-gold">같은 힘</span>이라는 걸 보여줬어요. 역사상 가장 위대한 통합 중 하나예요.</p>

      <p>뉴턴 역학만으로는 완벽하지 않아요. 수성의 세차운동이 뉴턴 역학의 예측과 미세하게 달랐어요. 이 차이를 설명한 것이 아인슈타인의 <span class="hl">일반 상대성 이론(1915)</span>이에요. 질량이 시공간을 휘게 만들고, 그 휜 시공간을 따라 행성이 이동한다는 새로운 패러다임이 수성 궤도의 수수께끼를 풀었어요.</p>

      <div class="callout"><span class="callout-icon">🪐 행성 간 중력 간섭</span>실제 태양계는 태양과 하나의 행성으로만 이루어지지 않아요. 여러 행성이 서로 중력을 주고받으며 궤도가 미세하게 변해요. 이 '섭동(Perturbation)'을 계산하는 것이 천체역학의 핵심 과제예요. 해왕성의 발견도 이 계산으로 이루어졌어요.</div>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>사과가 떨어지는 것과 달이 지구를 도는 것이 같은 힘이라는 걸 깨달은 뉴턴처럼, <span class="hl-gold">겉으로 달라 보이는 것들을 하나로 연결하는 통찰 — 그것이 과학의 아름다움이에요.</span></p></div>
    `
  },

  /* ── 이론 ── */
  'theory': {
    title: '천문학의 이론들 — 빅뱅에서 다중우주까지',
    tags: [{ cls: 'intermediate', label: '🔭 중급' }],
    readTime: '12', difficulty: '🔭 중급', date: '2026년',
    body: `
      <p>우주는 어떻게 시작됐을까요? 왜 지금 이런 구조를 갖고 있을까요? 이 질문들에 답하려는 시도가 현대 우주론의 핵심이에요. 오늘날 우주론의 표준 모형은 <span class="hl">빅뱅(Big Bang) 이론</span>을 중심으로 인플레이션, 암흑물질, 암흑에너지를 포함한 복잡한 구조를 갖고 있어요.</p>

      <div class="callout"><span class="callout-icon">💥 빅뱅 이론의 증거</span>① <span class="hl">허블의 관측</span>: 은하들이 멀어지고 있음 → 과거엔 가까이 있었음 · ② <span class="hl">우주 마이크로파 배경복사(CMB)</span>: 빅뱅 38만 년 후의 빛이 우주 전역에서 균일하게 관측됨 · ③ <span class="hl-gold">경원소 존재비</span>: 수소 75%, 헬륨 25% — 빅뱅 핵합성으로 정확히 예측됨</div>

      <p>빅뱅 이론만으로는 설명 안 되는 게 있어요. 우주가 왜 이렇게 균일한지, 왜 공간이 완벽하게 편평한지 — 이를 설명하기 위해 <span class="hl">인플레이션(Inflation) 이론</span>이 제안됐어요. 빅뱅 직후 10⁻³⁶초에서 10⁻³²초 사이, 우주가 빛보다 빠른 속도로 지수함수적으로 팽창했다는 이론이에요.</p>

      <p>현대 우주론에서 가장 큰 미스터리는 <span class="hl">암흑물질과 암흑에너지</span>예요. 우주의 구성을 보면 우리가 볼 수 있는 일반 물질은 고작 <span class="hl">5%</span>예요. 27%는 암흑물질, 68%는 암흑에너지예요. 우주의 95%가 '모른다'는 뜻이에요. 암흑에너지는 우주 팽창을 가속시키는 원인으로 추정되지만 정체는 완전히 불명이에요.</p>

      <div class="callout"><span class="callout-icon">🌌 다중우주(Multiverse)</span>일부 이론에서는 우리 우주가 유일하지 않을 수 있다고 해요. 인플레이션 이론의 확장인 <span class="hl-gold">영구 인플레이션 이론</span>에 따르면 우리 우주는 수많은 평행 우주 중 하나일 수 있어요. 아직 검증 불가능한 가설이지만, 물리학의 다양한 가설들에서 반복적으로 등장해요.</div>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>우주의 95%를 모른다는 것 — 이것이 절망이 아니라 흥분이에요. <span class="hl-gold">우리는 아직 탐험의 초입에 있어요.</span></p></div>
    `
  },

  /* ── 천문단위 ── */
  'au': {
    title: '천문단위(AU) — 태양계를 재는 자',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '8', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>태양에서 지구까지의 거리를 킬로미터로 표현하면 약 <span class="hl">1억 4960만 km</span>예요. 이 숫자를 매번 쓰기 불편해서 천문학자들은 이 거리를 기준 단위로 삼았어요 — 이것이 <span class="hl">천문단위(Astronomical Unit, AU)</span>예요. 태양계 안에서 행성 거리를 표현할 때 가장 편리한 단위예요.</p>

      <div class="callout"><span class="callout-icon">📏 태양계 행성의 거리(AU)</span>수성: <span class="hl">0.39 AU</span> · 금성: 0.72 AU · 지구: 1 AU · 화성: 1.52 AU · 목성: 5.2 AU · 토성: 9.58 AU · 천왕성: 19.2 AU · 해왕성: <span class="hl-gold">30.1 AU</span> · 명왕성(원일점): 49.3 AU</div>

      <p>AU가 정확히 얼마냐는 오래도록 논쟁이 됐어요. 1676년 카시니가 화성의 시차를 이용해 처음 정밀 측정을 시도했고, 이후 금성 일면통과, 레이더 반사법 등 점점 정교한 방법이 개발됐어요. 2012년 IAU는 <span class="hl">1 AU = 149,597,870,700 m</span>으로 정확히 정의했어요.</p>

      <p>AU 너머 더 큰 우주를 이야기할 때는 <span class="hl">광년(light-year)</span>과 <span class="hl">파섹(parsec)</span>을 써요. 1 광년 = 63,241 AU, 1 파섹 = 206,265 AU예요. 가장 가까운 별 프록시마 센타우리는 4.2 광년(약 265,000 AU)이에요. AU로 표현하면 숫자가 너무 커지죠. 이처럼 천문학에서는 <span class="hl-gold">스케일에 맞는 단위 선택</span>이 중요해요.</p>

      <div class="callout"><span class="callout-icon">🚀 AU와 탐사선</span>보이저 1호는 현재 태양에서 약 <span class="hl">160 AU</span> 거리에 있어요(2024년 기준). 이는 해왕성 궤도보다 5배 이상 먼 거리예요. 보이저는 1977년 발사돼 47년째 비행 중이에요. 오르트 구름에 도달하려면 약 300년, 완전히 통과하려면 3만 년이 더 필요해요.</div>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>AU 하나가 1억 5천만 km예요. 그것을 1이라는 하나의 단위로 압축한 건, <span class="hl-gold">거대한 것을 어떻게든 이해 가능한 크기로 만들려는 인간의 노력이에요.</span></p></div>
    `
  },

  /* ── 로켓의 발달 ── */
  'rocket': {
    title: '로켓의 발달 — 꿈에서 엔진까지',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '11', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>인류가 하늘을 날고 싶어한 건 오래됐어요. 하지만 대기를 벗어나 우주로 나가는 건 전혀 다른 이야기예요. 총을 쏘거나 비행기를 띄우는 건 공기를 이용하지만, 우주에는 공기가 없어요. 거기서 움직이려면 <span class="hl">반작용의 법칙</span>에 의존한 로켓만이 답이에요.</p>

      <div class="callout"><span class="callout-icon">🔥 로켓의 원리</span>뉴턴의 제3법칙: 모든 작용에는 크기가 같고 방향이 반대인 반작용이 있어요. 로켓은 뒤로 가스를 분출해 앞으로 나아가요. 공기가 없어도 작동해요 — <span class="hl">우주에서도 가속 가능한 유일한 방식이에요.</span></div>

      <p>로켓 개발의 아버지는 세 명이에요. 러시아의 <span class="hl">콘스탄틴 치올콥스키</span>는 20세기 초 로켓 방정식을 이론화했어요. 미국의 <span class="hl">로버트 고다드</span>는 1926년 최초의 액체연료 로켓을 발사했어요. 독일의 <span class="hl">헤르만 오베르트</span>는 제자들과 함께 실용 로켓 개발을 이끌었어요. 이 세 사람의 연구가 이후 우주 시대의 기반이 됐어요.</p>

      <p>2차 세계대전은 아이러니하게도 로켓 기술을 비약적으로 발전시켰어요. 나치 독일이 개발한 <span class="hl">V-2 로켓</span>은 역사상 처음으로 우주 공간(100km 이상)에 도달한 물체예요. 종전 후 이 기술자들이 미국과 소련으로 흩어져 각각 <span class="hl-gold">NASA와 소련 우주 프로그램</span>의 핵심이 됐어요.</p>

      <div class="callout"><span class="callout-icon">🚀 현대 로켓의 혁명 — 재사용</span>전통적 로켓은 한 번 쓰면 버렸어요. 스페이스X의 <span class="hl">팰컨 9</span>은 2015년 처음으로 로켓 부스터를 되돌려 수직 착륙시키는 데 성공했어요. 이 재사용 기술로 발사 비용이 기존의 <span class="hl-gold">10분의 1 이하</span>로 줄어들었어요. 우주 접근의 민주화가 시작된 거예요.</div>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>100년 전만 해도 로켓으로 우주를 가겠다는 말은 농담이었어요. 지금은 민간 기업이 로켓을 재사용해요. <span class="hl-gold">꿈이 현실이 되는 데 필요한 건 시간과 집념이에요.</span></p></div>
    `
  },

  /* ── 우주왕복선 ── */
  'shuttle': {
    title: '우주왕복선 — 재사용 시대를 연 인류의 도전',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '11', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>1981년 4월, 컬럼비아 우주왕복선이 처음 하늘을 날았어요. 비행기처럼 활주로에 착륙하고, 다시 연료를 채워 재비행할 수 있는 — 그 개념 자체가 혁명이었어요. NASA는 <span class="hl">30년간 135회 비행</span>을 수행하며 허블 우주망원경 발사, 국제우주정거장(ISS) 건설이라는 거대 프로젝트를 이루어냈어요.</p>

      <div class="callout"><span class="callout-icon">🚀 우주왕복선 구성</span><span class="hl">궤도선(Orbiter)</span>: 승무원이 탑승하는 비행기 형태 본체 · <span class="hl">외부 연료 탱크(ET)</span>: 발사 후 분리, 재사용 불가 · <span class="hl-gold">고체 로켓 부스터(SRB)</span>: 2개, 발사 후 분리 → 해상 회수 → 재사용 가능</div>

      <p>하지만 우주왕복선의 역사에는 비극도 있어요. 1986년 <span class="hl">챌린저호 폭발 사고</span> — 발사 73초 만에 O링 결함으로 폭발, 7명 사망. 2003년 <span class="hl">컬럼비아호 공중 분해</span> — 귀환 중 단열재 손상으로 대기권 재진입 시 폭발, 7명 사망. 두 사고는 우주 탐사의 위험성을, 그리고 안전 문화의 중요성을 세계에 각인시켰어요.</p>

      <p>우주왕복선은 경제적으로도 당초 기대에 부응하지 못했어요. 재사용 가능하지만 정비와 준비에 막대한 비용이 들어, 한 번 발사 비용이 오히려 일회용 로켓보다 비쌌어요. 2011년 아틀란티스의 마지막 비행으로 프로그램이 종료됐어요. 이후 NASA는 민간 기업에 우주 수송을 맡기고 <span class="hl-gold">심우주 탐사에 집중</span>하는 방향으로 전환했어요.</p>

      <div class="callout"><span class="callout-icon">🏗️ ISS와 허블의 유산</span>우주왕복선이 이룬 두 가지 최대 업적이에요. <span class="hl">허블 우주망원경</span>: 궤도에서 직접 수리하며 성능을 개선했어요. <span class="hl-gold">국제우주정거장(ISS)</span>: 궤도에서 조각을 조립해 완성한, 인류가 만든 가장 큰 우주 구조물이에요.</div>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>14명이 우주왕복선 사고로 목숨을 잃었어요. 그 희생 위에 ISS가 있고, 허블이 있고, 지금의 우주 탐사가 있어요. <span class="hl-gold">역사의 진보는 언제나 용기 있는 사람들의 이름 위에 쓰여요.</span></p></div>
    `
  },

  /* ── 태양계 탐사 ── */
  'solar-explore': {
    title: '태양계 탐사 — 인류가 보낸 탐사선들의 여정',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '12', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>1972년, 아폴로 17호 우주인 해리슨 슈미트가 달에서 마지막으로 발걸음을 뗐어요. 그 이후 반세기가 지났지만 인류는 아직 달 너머로 사람을 보내지 못했어요. 하지만 로봇 탐사선들은 그 사이 태양계 구석구석을 탐사했어요. <span class="hl">탐사선 외교</span>의 시대예요.</p>

      <div class="callout"><span class="callout-icon">🚀 주요 태양계 탐사선</span><span class="hl">보이저 1·2호</span>(1977): 목성·토성·천왕성·해왕성 탐사 후 성간 공간으로 · <span class="hl">카시니-하위헌스</span>(1997): 13년간 토성 탐사 · <span class="hl">뉴허라이즌스</span>(2006): 명왕성 최초 근접 비행 · <span class="hl-gold">주노</span>(2011): 목성 탐사 진행 중</div>

      <p>화성은 현재 인류의 가장 활발한 탐사 대상이에요. 2021년 기준으로 화성에는 여러 나라의 탐사선과 로버가 활동하고 있어요. NASA의 <span class="hl">퍼서비어런스(Perseverance)</span> 로버는 고대 강 삼각주 지역을 탐사하며 생명의 흔적을 찾고 있어요. 중국의 <span class="hl">주롱(祝融)</span>도 화성 표면을 누비고 있어요. 그리고 오만의 <span class="hl-gold">호프(Hope)</span>는 화성 대기를 궤도에서 관측해요.</p>

      <p>외행성 탐사는 시간이 많이 걸려요. 목성까지 최소 수 년, 토성까지 7년, 해왕성까지는 12년 이상 걸려요. 그래서 탐사선은 <span class="hl">중력 도움(Gravity Assist)</span> 기법을 써요 — 행성 가까이 지나가며 행성의 중력을 이용해 속도를 높이는 거예요. 보이저 2호는 목성, 토성, 천왕성, 해왕성을 차례로 다 방문하는 희귀한 행성 정렬 기회를 활용했어요.</p>

      <div class="callout"><span class="callout-icon">🌏 아르테미스 프로그램</span>NASA는 2025년 이후 <span class="hl">아르테미스 프로그램</span>으로 달에 다시 인류를 보낼 계획이에요. 이번엔 달 표면에 기지를 건설하고, 더 나아가 화성 유인 탐사를 위한 발판을 마련하는 게 목표예요. 처음으로 <span class="hl-gold">여성 우주인이 달에 발을 딛는 역사</span>도 계획 중이에요.</div>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>보이저 1호는 지금도 시속 6만 km로 날고 있어요. 47년째 신호를 보내오는, 220억 km 밖에 있는 인류의 분신. <span class="hl-gold">우리가 만든 것이 우리를 대신해 우주를 탐험하고 있다는 게, 생각할수록 경이로워요.</span></p></div>
    `
  },

  /* ── 외계행성 찾기 ── */
  'exoplanet-search': {
    title: '외계행성 찾기 — 다른 태양의 품속에 있는 세계들',
    tags: [{ cls: 'intermediate', label: '🔭 중급' }],
    readTime: '11', difficulty: '🔭 중급', date: '2026년',
    body: `
      <p>1995년, 스위스 천문학자들이 페가수스자리 51번 별 주위에서 목성만 한 행성을 발견했어요. 최초의 <span class="hl">외계행성(Exoplanet)</span> 발견이에요. 이후 30년이 지난 지금, 5,700개 이상의 외계행성이 확인됐어요. 천문학에서 가장 역동적으로 성장하는 분야예요.</p>

      <div class="callout"><span class="callout-icon">🔭 외계행성 탐지 방법</span><span class="hl">통과법(Transit)</span>: 행성이 별 앞을 지나갈 때 별빛이 약간 어두워지는 것 감지 — 케플러 우주망원경이 주로 사용, 전체 발견의 70%+ · <span class="hl-gold">시선속도법(Radial Velocity)</span>: 행성 중력에 의한 별의 미세한 흔들림을 도플러 효과로 감지</div>

      <p>NASA의 <span class="hl">케플러 우주망원경</span>(2009~2018)은 하늘의 한 영역을 9년간 꾸준히 관찰해 2,600개 이상의 외계행성을 발견했어요. 후임인 <span class="hl">TESS</span>는 전체 하늘을 관찰하며 지금도 새 행성을 찾고 있어요. 통계적으로 우리 은하 내 별 하나당 평균 1개 이상의 행성이 있다는 게 밝혀졌어요 — 은하에 수천억 개의 행성이 있다는 뜻이에요.</p>

      <p>과학자들의 최대 관심사는 <span class="hl">생명 거주 가능 구역(골디락스 존)</span>에 있는 지구 크기 암석 행성이에요. 온도가 적당해서 액체 물이 존재할 수 있는 거리예요. 현재까지 수십 개의 후보가 발견됐고, 제임스 웹 우주망원경이 이 행성들의 대기를 분석하며 <span class="hl-gold">생명의 징후(바이오시그니처)</span>를 찾고 있어요.</p>

      <div class="callout"><span class="callout-icon">🌍 TRAPPIST-1 시스템</span>2017년 발표된 <span class="hl">TRAPPIST-1</span>은 약 40광년 거리의 차가운 적색 왜성으로, 7개의 지구 크기 행성이 공전해요. 그 중 3개가 생명 거주 가능 구역에 있어요. 현재 가장 집중 연구되는 외계행성 시스템이에요.</div>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>수천 개의 행성, 그 중 일부는 지구와 놀랍도록 닮은 세계. 그 행성에도 누군가 밤하늘을 보며 '저 별에 누가 있을까?' 생각할까요? <span class="hl-gold">우주에서 외롭다는 느낌도, 우주적 연대감도, 같은 하늘이 만들어요.</span></p></div>
    `
  },

  /* ── 별자리 기원 ── */
  'const-origin': {
    title: '별자리의 기원 — 인류가 하늘에 그린 이야기',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '10', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>별들은 하늘에 무작위로 흩어져 있어요. 하지만 인류는 그 점들을 연결해 <span class="hl">이야기를 만들었어요</span>. 사냥꾼, 여왕, 용, 전갈 — 하늘을 거대한 신화책으로 만든 거예요. 이것이 별자리의 시작이에요.</p>

      <div class="callout"><span class="callout-icon">📜 별자리의 역사</span>최초의 별자리 기록은 약 3,000년 전 <span class="hl">메소포타미아(바빌로니아)</span>에서 나타나요. 이후 그리스·이집트 천문학과 합쳐졌어요. 1930년 <span class="hl-gold">국제천문연맹(IAU)</span>이 전통 별자리를 공식화해 하늘 전체를 <span class="hl">88개 별자리</span>로 나눴어요. 각 별자리는 경계가 있는 하늘의 구역이에요.</div>

      <p>별자리의 기능은 항법이었어요. 오리온자리의 허리띠 세 별을 연장하면 시리우스가 나오고, 북두칠성을 이용하면 북극성을 찾을 수 있어요. 바다에서 GPX 없이 항해할 때, 사막에서 길을 찾을 때, 별자리는 <span class="hl">하늘의 지도</span>였어요.</p>

      <p>계절마다 보이는 별자리가 달라요. 지구가 태양 주위를 공전하면서 우리가 야간에 보는 하늘의 방향이 바뀌기 때문이에요. 봄에는 처녀자리, 여름에는 전갈자리, 가을에는 페가수스자리, 겨울에는 오리온자리가 대표 별자리예요. 그래서 별자리는 <span class="hl-gold">계절을 알리는 달력</span>이기도 했어요.</p>

      <div class="callout"><span class="callout-icon">⚠️ 별자리 vs 점성술</span>별자리와 점성술은 다른 거예요. 점성술은 출생 시 별자리 위치가 성격·운명에 영향을 준다는 믿음이에요. 현대 천문학은 이를 지지하지 않아요. 별자리는 천문학적 도구이자 신화·문화의 유산이에요 — <span class="hl">과학적 도구와 신화적 상상력, 둘 다로서 가치를 가져요.</span></div>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>같은 별인데, 그리스인은 오리온을, 한국인은 삼태성(세 형제)을, 중국인은 삼성(三星)을 봤어요. 하늘은 하나지만 보는 눈은 <span class="hl-gold">각자의 이야기를 만들어요.</span></p></div>
    `
  },

  /* ── 북반구 별자리 ── */
  'const-north': {
    title: '북반구 별자리 — 한국 하늘의 사계절',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '11', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>한국은 북위 33~38도에 위치해 있어요. 이 위도에서는 북쪽 하늘의 별자리들이 일 년 내내 보이고, 계절에 따라 남쪽 하늘의 별자리가 바뀌어요. 계절별 대표 별자리를 알아두면 아무 도구 없이도 밤하늘을 즐길 수 있어요.</p>

      <div class="callout"><span class="callout-icon">🧭 북극성 찾기</span>북두칠성(큰곰자리) 국자의 끝 두 별을 5배 연장하면 <span class="hl">북극성(Polaris)</span>이 나와요. 북극성은 항상 정북 방향에, 한국에서 약 37~38° 고도에 있어요. 계절이 바뀌어도 북극성은 움직이지 않아요 — <span class="hl-gold">나침반이 없을 때 북쪽을 찾는 가장 쉬운 방법이에요.</span></div>

      <p><span class="hl">봄</span>의 대표는 처녀자리 스피카에서 시작하는 '봄의 대삼각형(아르크투루스·스피카·데네볼라)'이에요. <span class="hl">여름</span>에는 베가·알타이르·데네브로 이루어진 '여름의 대삼각형'이 하늘을 수놓아요. 은하수가 가장 잘 보이는 계절이기도 해요. <span class="hl">가을</span>은 페가수스자리의 '가을의 대사각형', 안드로메다은하를 맨눈으로 볼 수 있는 계절이에요. <span class="hl-gold">겨울</span>은 오리온자리·큰개자리 시리우스·황소자리 플레이아데스 — 밤하늘이 가장 화려한 계절이에요.</p>

      <p>겨울 밤 오리온자리는 어디서나 금방 찾을 수 있어요. <span class="hl">오리온 벨트</span>(삼태성, 세 별이 나란한 부분)가 눈에 띄고, 오른쪽 위의 붉은 별이 <span class="hl">베텔게우스</span>, 왼쪽 아래의 파란 별이 <span class="hl">리겔</span>이에요. 오리온 벨트의 세 별 아래로 흐릿한 구름처럼 보이는 게 오리온 성운(M42)이에요.</p>

      <div class="callout"><span class="callout-icon">🌌 은하수 관측 팁</span>여름 밤 11시 이후가 은하수 관측 최적 시간이에요. 빛 공해가 없는 곳 — 산 정상이나 해안 외딴 곳에서 관측해야 해요. 맨눈으로도 흐릿한 빛의 띠가 보이는데, 그게 우리 은하의 중심 방향이에요. <span class="hl-gold">쌍안경으로 보면 수백만 개의 별이 보여요.</span></div>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>지금 바라보는 오리온자리 베텔게우스의 빛은 650년 전에 출발했어요. 즉 당신은 지금 650년 과거를 보고 있어요. <span class="hl-gold">밤하늘은 타임머신이에요.</span></p></div>
    `
  },

  /* ── 남반구 별자리 ── */
  'const-south': {
    title: '남반구 별자리 — 북반구에서 볼 수 없는 하늘',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '10', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>남반구에서 보는 밤하늘은 북반구와 크게 달라요. 오리온자리가 거꾸로 보이고, 무엇보다 <span class="hl">북극성이 없어요</span>. 대신 남십자성이 남쪽을 알려줘요. 그리고 북반구에서는 결코 볼 수 없는, 육안으로 보이는 <span class="hl">이웃 은하들</span>이 있어요.</p>

      <div class="callout"><span class="callout-icon">✝️ 남십자성(Southern Cross)</span>남반구의 상징적 별자리예요. 호주, 뉴질랜드, 브라질, 파푸아뉴기니의 국기에도 들어가 있어요. 4개의 밝은 별로 이루어진 작은 별자리지만 매우 잘 보여요. 긴 축의 방향을 연장하면 남쪽 하늘의 기준점인 <span class="hl-gold">'남천극'</span>을 가늠할 수 있어요.</div>

      <p>남반구의 최대 명물은 <span class="hl">대마젤란 성운(LMC)</span>과 <span class="hl">소마젤란 성운(SMC)</span>이에요. 각각 16만 광년, 20만 광년 거리에 있는 우리 은하의 위성 은하들이에요. 남반구에서는 구름처럼 보이는 이 성운들을 맨눈으로 쉽게 볼 수 있어요. 1987년에는 대마젤란 성운에서 맨눈으로 보이는 초신성 폭발(SN 1987A)이 일어나기도 했어요.</p>

      <p>남반구는 우리 은하 중심에 더 가까워요. 궁수자리 방향이 은하 중심이기 때문에, 남반구에서는 여름(남반구 기준 12~2월)에 <span class="hl">은하수가 훨씬 광활하고 밝게</span> 보여요. 칠레 아타카마 사막, 호주 오지, 남아프리카 등이 세계 최고의 천문 관측지로 꼽히는 이유예요.</p>

      <div class="callout"><span class="callout-icon">🔭 남반구 주요 천문대</span><span class="hl">VLT(Very Large Telescope)</span>: 칠레 파라날 사막, ESO 운영 · <span class="hl">ALMA</span>: 칠레 아타카마 고원, 전파 망원경 배열 · <span class="hl-gold">ELT(Extremely Large Telescope)</span>: 건설 중, 완공 시 세계 최대 광학 망원경 (지름 39m!)</div>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>같은 지구에 살지만, 반구가 달라지면 하늘이 달라져요. 어디에 서 있느냐에 따라 보이는 것이 달라진다는 건, <span class="hl-gold">별 이야기지만 사람 이야기이기도 해요.</span></p></div>
    `
  },

  /* ── 별자리 전설 ── */
  'const-legend': {
    title: '별자리 전설 — 하늘에 새겨진 신화들',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '11', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>별자리에는 수천 년 된 이야기들이 담겨 있어요. 그리스·로마 신화가 별자리로 가장 많이 남아있지만, 바빌로니아, 이집트, 마야, 한국과 중국 신화도 하늘에 새겨져 있어요. 밤하늘은 <span class="hl">인류 최초의 신화 백과사전</span>이에요.</p>

      <div class="callout"><span class="callout-icon">🏹 오리온 — 사냥꾼의 전설</span>오리온은 바다의 신 포세이돈의 아들인 거인 사냥꾼이에요. 달의 여신 아르테미스와 사랑에 빠졌지만, 오빠 아폴론의 계략으로 아르테미스가 실수로 화살로 쏘아 죽였어요. 슬픔에 잠긴 아르테미스가 오리온을 <span class="hl-gold">별자리로 하늘에 올린 것</span>이 오리온자리예요. 뒤를 쫓는 개들이 큰개자리·작은개자리이고, 쫓기는 토끼가 토끼자리예요.</div>

      <p>카시오페이아자리는 에티오피아 왕비 카시오페이아에서 왔어요. 자신의 딸 안드로메다가 가장 아름답다고 자랑했다가 바다 님프들의 분노를 샀고, 딸이 괴물 케투스에게 제물로 바쳐질 뻔했어요. 영웅 페르세우스가 메두사의 머리로 괴물을 물리치고 안드로메다를 구했죠 — <span class="hl">카시오페이아, 안드로메다, 페르세우스, 케투스</span> 모두 이웃한 별자리예요.</p>

      <p>여름철 밤하늘의 전갈자리와 오리온자리가 하늘 반대편에 있는 건 신화 때문이에요. 오리온이 어떤 동물도 잡을 수 있다고 자랑하자, 자연의 신이 전갈을 보내 오리온을 죽였어요. 신화에서도 둘은 앙숙 — 그래서 <span class="hl">둘이 동시에 하늘에 뜨지 않도록</span> 배치됐어요.</p>

      <div class="callout"><span class="callout-icon">🌟 황도 12궁의 기원</span>태양이 지나는 경로(황도)에 있는 12개 별자리가 <span class="hl-gold">황도 12궁</span>이에요: 양(Aries), 황소, 쌍둥이, 게, 사자, 처녀, 천칭, 전갈, 사수, 염소, 물병, 물고기. 이것이 점성술에서 별자리 운세의 기반이 됐어요. 천문학적으로는 태양의 연간 이동 경로를 표시하는 기준선이에요.</div>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>수천 년 전 그리스인이 만든 이야기가 지금도 하늘에 남아있어요. 그 별들을 보며 지금 우리가 같은 이야기를 읽죠. <span class="hl-gold">이야기는 별처럼 오래 살아요.</span></p></div>
    `
  },

  /* ── 동양 별자리 ── */
  'const-east': {
    title: '동양 별자리 — 28수와 동서남북의 수호신',
    tags: [{ cls: 'beginner', label: '⭐ 입문' }],
    readTime: '10', difficulty: '⭐ 입문', date: '2026년',
    body: `
      <p>별자리가 그리스 신화가 전부라고 생각하기 쉽지만, 동아시아에는 수천 년의 독자적인 천문 전통이 있어요. 중국, 한국, 일본이 공유한 전통 천문 체계는 하늘을 <span class="hl">28수(二十八宿)</span>로 나누어 달의 위치를 추적했어요.</p>

      <div class="callout"><span class="callout-icon">🐉 동방청룡·서방백호·남방주작·북방현무</span>동양 천문에서 하늘은 네 방위의 수호신이 지켜요. <span class="hl">동방청룡(東方靑龍)</span>: 뿔·항·저·방·심·미·기 7수 (봄 동쪽) · <span class="hl">서방백호(西方白虎)</span>: 규·루·위·묘·필·자·삼 7수 (가을 서쪽) · <span class="hl-gold">남방주작(南方朱雀)</span>: 정·귀·류·성·장·익·진 7수 (여름 남쪽) · <span class="hl-gold">북방현무(北方玄武)</span>: 두·우·여·허·위·실·벽 7수 (겨울 북쪽)</div>

      <p>28수는 달이 하루에 대략 하나씩 지나가는 구역이에요. 달의 위치로 날짜를 파악하는 음력의 기반이 됐어요. 서양의 황도 12궁이 태양의 위치 기준인 것과 달리, 동양의 28수는 <span class="hl">달의 운행 경로</span>를 기준으로 해요.</p>

      <p>한국 전통 천문에서 북두칠성(北斗七星)은 특별한 의미를 가졌어요. 수명을 관장하는 신이 산다고 믿었고, 칠성신 신앙, 칠성탱화 등 민간 신앙과 연결됐어요. 풍수지리에서도 북두칠성을 중요하게 여겼어요. 고구려 고분 벽화에도 별자리 그림이 남아있어요 — <span class="hl-gold">1,500년 전 한국인도 밤하늘을 같은 열정으로 바라봤어요.</span></p>

      <div class="callout"><span class="callout-icon">📜 천상열차분야지도</span>1395년 조선 태조 때 만든 <span class="hl">천상열차분야지도(天象列次分野之圖)</span>는 세계에서 두 번째로 오래된 석각 천문도예요. 돌에 새긴 별지도로, 1,467개의 별과 별자리가 표시되어 있어요. 고구려의 천문 전통을 이어받아 제작됐어요. 현재 국보 228호로 국립중앙박물관에 있어요.</div>

      <div class="humanistic-close"><span class="hc-label">💫 생각해보기</span><p>고구려인, 조선인, 그리고 지금의 우리가 같은 별을 봤어요. 문명이 달라져도, 하늘은 변하지 않아요. <span class="hl-gold">별은 과거와 현재를 잇는 다리예요.</span></p></div>
    `
  },

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
