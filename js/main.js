/* Radiant Blue Dot - common interactions */

(function initStarCanvas() {
  const canvas = document.getElementById('star-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let stars = [];
  let raf = null;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    stars = Array.from({ length: Math.max(80, Math.floor(width * height / 5200)) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 0.4 + Math.random() * 1.4,
      a: 0.25 + Math.random() * 0.65,
      p: Math.random() * Math.PI * 2,
      s: 0.0004 + Math.random() * 0.0014,
      c: Math.random() > 0.82 ? '#b9cfff' : '#ffffff',
    }));
  }

  function draw(t) {
    ctx.clearRect(0, 0, width, height);
    stars.forEach(star => {
      ctx.globalAlpha = star.a * (0.55 + 0.45 * Math.sin(star.p + t * star.s));
      ctx.fillStyle = star.c;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(draw);
  }

  resize();
  draw(0);
  window.addEventListener('resize', () => {
    if (raf) cancelAnimationFrame(raf);
    resize();
    draw(0);
  });
})();

(function navScroll() {
  const nav = document.querySelector('.nav, .navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();

(function mobileMenus() {
  const legacyToggle = document.querySelector('.nav-mobile-toggle');
  const legacyLinks = document.querySelector('.nav-links');
  if (legacyToggle && legacyLinks) {
    legacyToggle.addEventListener('click', () => {
      legacyLinks.style.display = legacyLinks.style.display === 'flex' ? 'none' : 'flex';
      legacyLinks.style.flexDirection = 'column';
      legacyLinks.style.position = 'absolute';
      legacyLinks.style.top = '70px';
      legacyLinks.style.left = '0';
      legacyLinks.style.right = '0';
      legacyLinks.style.background = 'rgba(3,6,15,0.98)';
      legacyLinks.style.padding = '1rem 2rem';
      legacyLinks.style.borderBottom = '1px solid rgba(79,142,247,0.15)';
      legacyLinks.style.zIndex = '1000';
    });
  }

  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', () => menu.classList.toggle('open'));
  }
})();

(function scrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  targets.forEach(target => observer.observe(target));
})();

(function animateCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.target || 0);
      const suffix = el.dataset.suffix || '';
      const start = performance.now();
      const duration = 1400;
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(counter => observer.observe(counter));
})();

const ARTICLE_DATA = {
  'starship-ift6': {
    tags: [{ cls: 'launch', label: '발사체' }, { cls: 'mission', label: 'SpaceX' }],
    title: '스타십 시험비행이 보여주는 재사용 로켓의 방향',
    source: 'Radiant Blue Dot 요약',
    date: '2026.03.05',
    body: '<p>스타십 같은 완전 재사용 발사체는 우주 접근 비용을 낮추려는 시도입니다. 시험비행은 성공과 실패를 동시에 축적하며, 달 착륙선과 화성 수송 같은 장기 계획의 기술 기반을 다집니다.</p>',
  },
  'jwst-exo': {
    tags: [{ cls: 'science', label: '외계행성' }, { cls: 'mission', label: 'JWST' }],
    title: '제임스웹은 외계행성 대기에서 무엇을 읽을까?',
    source: 'Radiant Blue Dot 요약',
    date: '2026.02.18',
    body: '<p>제임스웹 우주망원경은 외계행성이 별 앞을 지날 때 대기를 통과한 빛을 분석합니다. 그 빛의 스펙트럼에는 물, 이산화탄소, 메탄 같은 분자의 흔적이 남을 수 있습니다.</p>',
  },
  'blackhole-shadow': {
    tags: [{ cls: 'science', label: '블랙홀' }],
    title: '블랙홀은 무엇인가?',
    source: 'Radiant Blue Dot 기초 지식',
    date: '2026.03.01',
    body: '<p>블랙홀은 중력이 너무 강해 빛조차 빠져나오기 어려운 천체입니다. 사건의 지평선은 물리적 표면이라기보다 되돌아올 수 없는 경계에 가깝습니다.</p>',
  },
};

(function articleModal() {
  const overlay = document.getElementById('article-modal');
  if (!overlay) return;
  const closeBtn = overlay.querySelector('.modal-close');

  function openModal(data) {
    overlay.querySelector('#modal-tags').innerHTML = (data.tags || [])
      .map(tag => `<span class="article-tag tag-${escapeHtml(tag.cls)}">${escapeHtml(tag.label)}</span>`)
      .join('');
    overlay.querySelector('#modal-title').textContent = data.title || '';
    overlay.querySelector('#modal-source').textContent = data.source || '';
    overlay.querySelector('#modal-date').textContent = data.date || '';
    overlay.querySelector('#modal-body').innerHTML = data.body || '';
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', event => {
    if (event.target === overlay) closeModal();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeModal();
  });
  document.querySelectorAll('[data-article]').forEach(card => {
    card.addEventListener('click', () => {
      const data = ARTICLE_DATA[card.dataset.article];
      if (data) openModal(data);
    });
  });
})();

const KNOWLEDGE_ARTICLES = {
  'solar-overview': article('태양계는 어떻게 태어났을까?', '거대한 가스와 먼지 구름이 중력으로 뭉치며 태양이 만들어졌고, 남은 물질이 원반을 이루며 행성과 작은 천체가 되었습니다.'),
  sun: article('태양은 일생 동안 어떤 변화를 겪을까?', '태양은 중심부 핵융합으로 빛을 냅니다. 아주 먼 미래에는 적색거성으로 부풀고, 바깥층을 잃은 뒤 백색왜성으로 남게 됩니다.'),
  mars: article('화성은 왜 인류의 다음 목적지처럼 보일까?', '화성은 하루 길이와 계절이 지구와 비교적 비슷하고, 과거 물의 흔적을 품고 있어 탐사와 거주 가능성을 함께 상상하게 합니다.'),
  saturn: article('토성의 고리는 왜 생겼을까?', '토성의 고리는 얼음과 암석 조각이 토성의 중력 안에서 얇게 퍼진 구조입니다. 사라진 위성의 잔해일 가능성도 연구되고 있습니다.'),
  kuiper: article('태양계의 끝에는 무엇이 있을까?', '해왕성 너머 카이퍼 벨트에는 명왕성 같은 왜소행성과 얼음 천체가 많습니다. 태양계 형성 초기의 단서를 간직한 지역입니다.'),
  star: article('별은 어떻게 태어나서 빛나기 시작할까?', '차갑고 밀도 높은 성운 일부가 중력으로 수축하면 중심 온도가 올라갑니다. 핵융합이 시작되는 순간 별은 스스로 빛나는 천체가 됩니다.'),
  nebula: article('성운은 왜 별의 요람이라고 불릴까?', '성운은 가스와 먼지가 모인 영역입니다. 그 안에서 물질이 뭉치면 새로운 별과 행성계가 태어날 수 있습니다.'),
  'blackhole-shadow': article('블랙홀은 정말 모든 것을 삼킬까?', '블랙홀은 가까운 물질에 강한 중력을 미치지만 우주 전체를 빨아들이는 구멍은 아닙니다. 충분히 멀리 떨어져 있으면 다른 천체처럼 중력원으로 작용합니다.'),
  galaxy: article('은하는 별들의 도시일까?', '은하는 수많은 별과 가스, 먼지, 암흑물질이 중력으로 묶인 거대한 구조입니다. 우리 태양은 우리은하의 한 나선팔에 자리합니다.'),
  'telescope-history': article('망원경은 인류의 우주관을 어떻게 바꾸었을까?', '망원경은 달의 표면, 목성의 위성, 은하의 존재를 보여주며 인간이 우주에서 차지하는 위치를 다시 생각하게 만들었습니다.'),
  spectrum: article('빛을 쪼개면 별의 비밀이 보일까?', '스펙트럼은 빛을 파장별로 나눈 기록입니다. 별빛의 스펙트럼에는 온도, 구성 원소, 움직임에 대한 정보가 담깁니다.'),
  rocket: article('로켓은 어떻게 지구를 벗어날까?', '로켓은 연료를 뒤로 빠르게 내보내며 앞으로 나아갑니다. 궤도에 오르려면 높이 올라가는 것뿐 아니라 충분한 옆 방향 속도가 필요합니다.'),
  'solar-explore': article('탐사선은 어떻게 수십 년 동안 길을 잃지 않을까?', '탐사선은 별 추적기, 관성 장치, 지상 관제와의 전파 교신을 이용해 위치와 방향을 보정합니다.'),
  'exoplanet-search': article('다른 별 주변의 행성은 어떻게 찾을까?', '외계행성은 별빛이 주기적으로 어두워지는 통과법, 별의 미세한 흔들림을 보는 시선속도법 등으로 찾습니다.'),
  'famous-astronomers': article('천문학자들은 어떤 질문으로 세상을 바꾸었을까?', '코페르니쿠스, 갈릴레이, 케플러, 허블 같은 사람들은 관측과 수학으로 익숙한 우주관을 바꾸었습니다.'),
  'const-east': article('동아시아의 별자리는 하늘을 어떻게 나누었을까?', '동아시아 전통 천문학은 하늘을 28수와 여러 별자리 체계로 나누어 계절, 의례, 국가 운영과 연결했습니다.'),
  'const-north': article('북쪽 하늘에서는 무엇을 기준으로 길을 찾을까?', '북극성은 지구 자전축 방향 가까이에 있어 밤하늘에서 거의 움직이지 않는 기준점처럼 보입니다.'),
  'const-origin': article('별자리는 누가 처음 이름 붙였을까?', '별자리는 여러 문명이 하늘을 기억하고 계절을 읽기 위해 만든 별들의 지도입니다. 오늘날 공식 별자리는 88개입니다.'),
  meteor: article('별똥별은 정말 별이 떨어지는 걸까?', '별똥별은 작은 우주 먼지나 암석 조각이 지구 대기에서 타며 빛나는 현상입니다.'),
  distance: article('우주의 거리는 어떻게 잴까?', '가까운 별은 시차로, 먼 은하까지는 표준촛불과 적색편이 같은 여러 방법을 이어 거리 사다리를 만듭니다.'),
  brightness: article('별의 밝기는 왜 거리와 함께 생각해야 할까?', '겉보기 밝기는 거리의 영향을 크게 받습니다. 실제 밝기와 겉보기 밝기를 구분해야 별의 성질을 이해할 수 있습니다.'),
  dynamics: article('중력은 어떻게 궤도를 만들까?', '궤도 운동은 앞으로 나아가는 속도와 중력으로 떨어지는 운동이 균형을 이루는 결과입니다.'),
  theory: article('상대성이론은 우주를 보는 방식을 어떻게 바꾸었을까?', '상대성이론은 시간과 공간이 고정된 배경이 아니라 속도와 중력에 따라 달라질 수 있음을 보여주었습니다.'),
  au: article('천문단위는 왜 필요한 걸까?', '천문단위(AU)는 지구와 태양 사이 평균 거리를 기준으로 한 단위입니다. 태양계 안의 거리를 말할 때 유용합니다.'),
};

function article(title, summary) {
  return {
    title,
    tags: [{ cls: 'beginner', label: '지식 지도' }],
    readTime: '5',
    difficulty: '입문',
    date: '2026',
    body: `<p>${escapeHtml(summary)}</p><div class="callout"><span class="callout-icon">더 깊게 보기</span>이 글은 지식허브 확장에 맞춰 더 긴 본문, 그림 설명, 관련 질문으로 보강될 예정입니다.</div>`,
  };
}

const KNOWLEDGE_HUB = [
  cat('sky-observation', '하늘과 관측', '🌙', 'hub-sky', '오늘 밤 하늘에서 출발하는 첫 번째 지식 지도', [
    item('const-north', '🧭', '북쪽 하늘에서는 무엇을 기준으로 길을 찾을까?', '북극성, 큰곰자리, 계절별 하늘 읽기'),
    item('const-origin', '✨', '별자리는 누가 처음 이름 붙였을까?', '신화와 항해, 농사의 달력'),
    item('meteor', '☄️', '별똥별은 정말 별이 떨어지는 걸까?', '유성, 유성우, 대기권의 빛'),
    item('moon-phases', '🌗', '달은 왜 매일 모양이 달라질까?', '위상, 공전, 관측 습관', 'planned'),
  ]),
  cat('solar-system-trip', '태양계 여행', '🪐', 'hub-solar', '태양에서 왜소행성까지, 우리 동네 우주 산책', [
    item('solar-overview', '🌌', '태양계는 어떻게 태어났을까?', '가스 구름에서 행성 가족으로'),
    item('sun', '☀️', '태양은 일생 동안 어떤 변화를 겪을까?', '핵융합, 빛, 미래의 태양'),
    item('mars', '🔴', '화성은 왜 인류의 다음 목적지처럼 보일까?', '물의 흔적과 탐사 로버'),
    item('saturn', '🪐', '토성의 고리는 왜 생겼을까?', '얼음 조각, 중력, 얇은 원반'),
    item('kuiper', '🧊', '태양계의 끝에는 무엇이 있을까?', '카이퍼 벨트와 먼 얼음 천체'),
  ]),
  cat('stars-life', '별의 삶과 죽음', '⭐', 'hub-celestial', '별이 태어나고 빛나다가 사라지는 방식', [
    item('star', '⭐', '별은 어떻게 태어나서 빛나기 시작할까?', '성운, 중력, 핵융합'),
    item('nebula', '🌫️', '성운은 왜 별의 요람이라고 불릴까?', '가스와 먼지, 별 탄생 지역'),
    item('blackhole-shadow', '🕳️', '블랙홀은 정말 모든 것을 삼킬까?', '사건의 지평선과 중력'),
    item('supernova', '💥', '초신성은 왜 우주의 재활용 과정일까?', '무거운 원소와 폭발', 'planned'),
  ]),
  cat('galaxies-cosmos', '은하와 우주', '🌌', 'hub-galaxy', '은하, 빅뱅, 보이지 않는 우주의 큰 구조', [
    item('galaxy', '🌌', '은하는 별들의 도시일까?', '우리은하와 수많은 외부 은하'),
    item('big-bang', '🫧', '빅뱅은 정말 폭발이었을까?', '공간의 팽창과 초기 우주', 'planned'),
    item('dark-matter', '🕯️', '보이지 않는 물질은 어떻게 우주를 붙잡고 있을까?', '암흑물질과 은하 회전', 'planned'),
    item('cosmic-scale', '📏', '우주는 얼마나 큰 걸까?', '광년, 관측 가능한 우주', 'planned'),
  ]),
  cat('telescopes-tech', '망원경과 관측기술', '🔭', 'hub-telescope', '인류의 눈을 더 멀리 보내는 도구들', [
    item('telescope-history', '🔭', '망원경은 인류의 우주관을 어떻게 바꾸었을까?', '갈릴레이에서 우주망원경까지'),
    item('spectrum', '🌈', '빛을 쪼개면 별의 비밀이 보일까?', '스펙트럼과 원소의 흔적'),
    item('space-telescope', '🛰️', '망원경을 왜 우주로 올려 보낼까?', '대기, 적외선, 허블과 제임스웹', 'planned'),
    item('radio-astronomy', '📡', '보이지 않는 전파로도 우주를 볼 수 있을까?', '전파망원경과 우주의 다른 얼굴', 'planned'),
  ]),
  cat('space-exploration', '우주탐사와 우주개발', '🚀', 'hub-exploration', '로켓, 탐사선, 우주정거장과 인간의 도전', [
    item('rocket', '🚀', '로켓은 어떻게 지구를 벗어날까?', '추력, 질량, 궤도 진입'),
    item('solar-explore', '🛰️', '탐사선은 어떻게 수십 년 동안 길을 잃지 않을까?', '보이저와 심우주 통신'),
    item('exoplanet-search', '🪐', '다른 별 주변의 행성은 어떻게 찾을까?', '통과법과 흔들림'),
    item('space-station', '🏗️', '우주정거장은 왜 실험실이자 집일까?', '미세중력과 장기 체류', 'planned'),
    item('moon-base', '🌕', '달 기지는 정말 가능할까?', '자원, 전력, 생활권', 'planned'),
  ]),
  cat('history-people', '천문학의 역사와 사람들', '🧑‍🚀', 'hub-history', '별을 보며 세계관을 바꾼 사람들의 이야기', [
    item('famous-astronomers', '🧑‍🔬', '천문학자들은 어떤 질문으로 세상을 바꾸었을까?', '코페르니쿠스, 갈릴레이, 허블'),
    item('const-east', '📜', '동아시아의 별자리는 하늘을 어떻게 나누었을까?', '28수와 전통 천문'),
    item('calendar-history', '🗓️', '달력은 왜 천문학에서 시작되었을까?', '계절과 농사, 시간의 규칙', 'planned'),
    item('women-astronomy', '🌟', '천문학 뒤편의 여성 과학자들은 누구였을까?', '계산, 분류, 발견의 역사', 'planned'),
  ]),
  cat('basic-physics', '천문학 기초 물리', '⚛️', 'hub-physics', '우주를 이해하는 데 필요한 작고 단단한 개념들', [
    item('distance', '📐', '우주의 거리는 어떻게 잴까?', '시차, 표준촛불, 거리 사다리'),
    item('brightness', '💡', '별의 밝기는 왜 거리와 함께 생각해야 할까?', '등급과 실제 밝기'),
    item('dynamics', '🌀', '중력은 어떻게 궤도를 만들까?', '케플러와 뉴턴의 관점'),
    item('theory', '🧠', '상대성이론은 우주를 보는 방식을 어떻게 바꾸었을까?', '시간, 공간, 질량과 에너지'),
    item('au', '📏', '천문단위는 왜 필요한 걸까?', 'AU, 광년, 파섹'),
  ]),
];

function cat(id, name, icon, cls, desc, items) {
  return { id, name, icon, cls, desc, count: `${items.length}개 주제`, items };
}

function item(id, icon, name, preview, status = 'ready') {
  const teaser = status === 'planned'
    ? '곧 공개될 지식 글입니다. 지금은 질문과 읽을 방향을 먼저 열어두었습니다.'
    : `${preview}. 이 질문을 따라가며 우주를 조금 더 가까운 언어로 읽어봅니다.`;
  return { id, icon, name, preview, status, teaser };
}

(function renderKnowledgeHub() {
  const hub = document.getElementById('knowledge-hub');
  if (!hub) return;
  hub.innerHTML = KNOWLEDGE_HUB.map((category, index) => `
    <div class="hub-card ${escapeHtml(category.cls)}" data-cat="${escapeHtml(category.id)}" style="animation-delay:${index * 0.05}s">
      <div class="hub-icon-wrap float">${category.icon}</div>
      <div class="hub-card-name">${escapeHtml(category.name)}</div>
      <div class="hub-card-count">${escapeHtml(category.count)}</div>
    </div>
  `).join('');
  hub.querySelectorAll('.hub-card').forEach(card => {
    card.addEventListener('click', () => showSubcategory(card.dataset.cat));
  });
})();

function showSubcategory(catId) {
  const category = KNOWLEDGE_HUB.find(cat => cat.id === catId);
  const panel = document.getElementById('subcategory-panel');
  const hub = document.getElementById('knowledge-hub-wrap');
  if (!category || !panel || !hub) return;
  hub.style.display = 'none';
  panel.innerHTML = `
    <div class="subcategory-breadcrumb" onclick="showHub()">지식 지도 / <span>${escapeHtml(category.name)}</span></div>
    <div class="subcategory-title-bar">
      <div class="cat-icon-lg" style="background:var(--gradient-card); border:1px solid var(--color-border);">${category.icon}</div>
      <div><h2>${escapeHtml(category.name)}</h2><p>${escapeHtml(category.desc)}</p></div>
    </div>
    <div class="subcategory-grid">
      ${category.items.map(it => `
        <div class="subcat-item ${it.status === 'planned' ? 'is-planned' : ''}" data-cat="${escapeHtml(category.id)}" data-item="${escapeHtml(it.id)}">
          <span class="subcat-icon">${it.icon}</span>
          <div class="subcat-info">
            <div class="subcat-name">${escapeHtml(it.name)}</div>
            <div class="subcat-preview">${escapeHtml(it.preview)}</div>
            ${it.status === 'planned' ? '<div class="subcat-status">준비 중 · 곧 공개될 지식 글입니다</div>' : ''}
          </div>
          <span class="subcat-arrow">${it.status === 'planned' ? '준비 중' : '→'}</span>
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

function showTeaser(catId, itemId) {
  const category = KNOWLEDGE_HUB.find(cat => cat.id === catId);
  const it = category?.items.find(entry => entry.id === itemId);
  const overlay = document.getElementById('teaser-overlay');
  if (!category || !it || !overlay) return;
  overlay.querySelector('#teaser-icon').textContent = it.icon;
  overlay.querySelector('#teaser-badge').textContent = it.status === 'planned' ? `${category.name} · 준비 중` : category.name;
  overlay.querySelector('#teaser-name').textContent = it.name;
  overlay.querySelector('#teaser-hook').innerHTML = escapeHtml(it.teaser);
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

function openReader(catId, itemId) {
  const data = KNOWLEDGE_ARTICLES[itemId] || generatePlaceholderArticle(catId, itemId);
  const overlay = document.getElementById('reader-overlay');
  if (!overlay) return;
  overlay.querySelector('#reader-tags').innerHTML = (data.tags || [])
    .map(tag => `<span class="article-tag tag-${escapeHtml(tag.cls)}">${escapeHtml(tag.label)}</span>`)
    .join('');
  overlay.querySelector('#reader-title').textContent = data.title || '';
  overlay.querySelector('#reader-title-small').textContent = data.title || '';
  overlay.querySelector('#reader-meta').innerHTML = `
    <span>읽는 시간 ${escapeHtml(data.readTime || '5')}분</span>
    <span>${escapeHtml(data.difficulty || '입문')}</span>
    <span>${escapeHtml(data.date || '준비 중')}</span>
  `;
  overlay.querySelector('#reader-body').innerHTML = data.body || '';
  overlay.querySelector('#reader-related').innerHTML = generateRelated(catId, itemId);
  overlay.classList.add('open');
  overlay.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

function generatePlaceholderArticle(catId, itemId) {
  const category = KNOWLEDGE_HUB.find(cat => cat.id === catId);
  const it = category?.items.find(entry => entry.id === itemId);
  return {
    title: it?.name || '준비 중',
    tags: [{ cls: 'beginner', label: '준비 중' }],
    readTime: '5',
    difficulty: '입문',
    date: '준비 중',
    body: `<p>이 주제의 본문은 아직 준비 중입니다. 빈 화면으로 남겨두지 않기 위해 핵심 질문과 읽을 방향을 먼저 열어두었습니다.</p>
      <div class="callout"><span class="callout-icon">곧 공개될 지식 글입니다</span>${escapeHtml(it?.preview || 'Radiant Blue Dot의 지식 지도에 맞춰 차근차근 채워질 예정입니다.')}</div>
      <div class="humanistic-close"><span class="hc-label">생각해보기</span><p>좋은 질문은 완성된 답보다 오래 남습니다. 이 항목은 앞으로 관측, 탐사, 물리 개념과 연결해 더 깊게 확장할 예정입니다.</p></div>`,
  };
}

function generateRelated(catId, itemId) {
  const category = KNOWLEDGE_HUB.find(cat => cat.id === catId);
  if (!category) return '';
  const related = category.items.filter(entry => entry.id !== itemId).slice(0, 4);
  if (!related.length) return '';
  return `<h3>같이 읽어볼 질문</h3><div class="related-grid">` + related.map(entry => `
    <div class="related-card" onclick="showTeaser('${escapeHtml(catId)}','${escapeHtml(entry.id)}')">
      <div class="rel-icon">${entry.icon}</div>
      <div class="rel-name">${escapeHtml(entry.name)}</div>
      <div class="rel-cat">${escapeHtml(category.name)} · ${entry.status === 'planned' ? '준비 중' : escapeHtml(entry.preview)}</div>
    </div>
  `).join('') + '</div>';
}

function closeReader() {
  const overlay = document.getElementById('reader-overlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}

let ttsActive = false;
let utterance = null;

function toggleTTS() {
  const body = document.getElementById('reader-body');
  if (!body || !window.speechSynthesis) {
    showLoginPrompt('이 브라우저에서는 음성 기능을 사용할 수 없습니다.');
    return;
  }
  if (ttsActive) {
    window.speechSynthesis.cancel();
    ttsActive = false;
    setTtsUi(false);
    return;
  }
  utterance = new SpeechSynthesisUtterance(body.innerText.slice(0, 2200));
  utterance.lang = 'ko-KR';
  utterance.rate = Number(document.querySelector('.tts-speed')?.value || 1);
  utterance.onend = () => {
    ttsActive = false;
    setTtsUi(false);
  };
  ttsActive = true;
  setTtsUi(true);
  window.speechSynthesis.speak(utterance);
}

function setTTSSpeed(select) {
  if (!utterance || !window.speechSynthesis || !ttsActive) return;
  window.speechSynthesis.cancel();
  utterance.rate = Number(select.value || 1);
  window.speechSynthesis.speak(utterance);
}

function setTtsUi(active) {
  document.getElementById('tts-bar')?.classList.toggle('open', active);
  const btn = document.getElementById('btn-tts');
  if (btn) {
    btn.classList.toggle('active', active);
    btn.textContent = active ? '⏹ 음성 중지' : '🔊 듣기';
  }
}

let userLikes = JSON.parse(localStorage.getItem('cb_likes') || '{}');
let userSaves = JSON.parse(localStorage.getItem('cb_saves') || '{}');
let isLoggedIn = false;

function toggleLike(articleId) {
  if (!isLoggedIn) {
    showLoginPrompt('좋아요 기능은 로그인 후 사용할 수 있어요.');
    return;
  }
  userLikes[articleId] = !userLikes[articleId];
  localStorage.setItem('cb_likes', JSON.stringify(userLikes));
  document.getElementById('btn-like')?.classList.toggle('liked', userLikes[articleId]);
}

function toggleSave(articleId) {
  if (!isLoggedIn) {
    showLoginPrompt('저장 기능은 로그인 후 사용할 수 있어요.');
    return;
  }
  userSaves[articleId] = !userSaves[articleId];
  localStorage.setItem('cb_saves', JSON.stringify(userSaves));
  document.getElementById('btn-save')?.classList.toggle('saved', userSaves[articleId]);
}

function showLoginPrompt(message) {
  let prompt = document.getElementById('login-prompt');
  if (!prompt) {
    prompt = document.createElement('div');
    prompt.id = 'login-prompt';
    prompt.className = 'login-prompt';
    document.body.appendChild(prompt);
  }
  prompt.textContent = message;
  prompt.classList.add('show');
  setTimeout(() => prompt.classList.remove('show'), 2800);
}

(function renderAlgoFeed() {
  const feed = document.getElementById('algo-feed');
  if (!feed) return;
  const entries = KNOWLEDGE_HUB.flatMap(category =>
    category.items.map(entry => ({ ...entry, catId: category.id, catName: category.name }))
  ).sort(() => Math.random() - 0.5).slice(0, 6);
  feed.innerHTML = entries.map(entry => `
    <div class="algo-item" onclick="showTeaser('${escapeHtml(entry.catId)}','${escapeHtml(entry.id)}')">
      <span class="algo-icon">${entry.icon}</span>
      <div class="algo-info">
        <div class="algo-name">${escapeHtml(entry.name)}</div>
        <div class="algo-meta">${escapeHtml(entry.catName)} · ${entry.status === 'planned' ? '준비 중' : escapeHtml(entry.preview)}</div>
      </div>
      <span class="algo-badge">${entry.status === 'planned' ? '예정' : '추천'}</span>
    </div>
  `).join('');
})();

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

window.showHub = showHub;
window.showTeaser = showTeaser;
window.closeTeaserModal = closeTeaserModal;
window.openReader = openReader;
window.closeReader = closeReader;
window.toggleTTS = toggleTTS;
window.setTTSSpeed = setTTSSpeed;
window.toggleLike = toggleLike;
window.toggleSave = toggleSave;
