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
   ARTICLE DATA (추후 CMS/API로 대체 예정)
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
