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
  'const-north': knowledgeArticle(
    '어떻게 별을 보고 길을 찾을까?',
    '밤하늘의 별은 모두 움직이는 듯 보이지만, 지구 자전축 가까운 북쪽 하늘은 방향을 찾는 기준이 됩니다.',
    `<p>별로 길을 찾는 방법은 하늘이 거대한 방향표처럼 보인다는 사실에서 시작합니다. 지구가 자전하기 때문에 밤새 별들은 동쪽에서 서쪽으로 흐르는 듯 보이지만, 북쪽 하늘의 북극성은 자전축 방향 가까이에 있어 위치가 크게 달라지지 않습니다. 북반구에서 북극성을 찾으면 대략 북쪽을 알 수 있고, 지평선에서 북극성까지의 높이는 관측자의 위도와도 가까운 관계를 가집니다.</p>
    <p>북극성은 가장 밝은 별이라서 기준이 된 것이 아닙니다. 큰곰자리의 북두칠성이나 카시오페이아처럼 알아보기 쉬운 별무리를 먼저 찾고, 그 모양을 따라 북극성까지 이어 가는 방식이 실용적입니다. 하늘이 흐리거나 도심 조명이 강하면 별이 적게 보이므로 한 번에 많은 별자리를 외우기보다 밝은 기준 별과 계절별 위치 변화를 함께 익히는 편이 좋습니다.</p>
    <p>별길 찾기는 항해와 여행의 역사에서 오래 쓰였지만, 현대 관측자에게도 의미가 있습니다. 망원경을 들기 전 맨눈으로 동서남북과 하늘의 회전 방향을 읽을 수 있어야 원하는 천체를 더 빨리 찾을 수 있기 때문입니다. 별은 지도 위 점이 아니라 지구의 운동을 드러내는 좌표입니다.</p>`,
    ['북극성은 북반구 밤하늘에서 북쪽 방향을 읽는 대표 기준이다.', '북두칠성과 카시오페이아는 북극성을 찾는 길잡이로 자주 쓰인다.', '별의 일주 운동은 지구가 자전한다는 사실을 관측으로 보여준다.'],
    ['북극성', '북두칠성', '일주 운동', '위도', '항성시']
  ),
  'const-origin': knowledgeArticle(
    '별자리는 어떻게 만들어졌을까?',
    '별자리는 실제로 가까이 모인 별들의 가족이라기보다, 사람이 하늘을 기억하고 나누기 위해 만든 지도입니다.',
    `<p>별자리는 점처럼 보이는 별들을 이어 하늘에 모양과 이야기를 붙인 결과입니다. 같은 밤하늘을 보더라도 농사 시기를 읽어야 했던 사람, 바다에서 방향을 찾던 사람, 왕실 천문 기록을 남기던 사람은 서로 다른 구획과 이름을 만들었습니다. 그래서 별자리에는 과학적 좌표와 문화적 상상력이 함께 남아 있습니다.</p>
    <p>오늘날 천문학에서 별자리는 그림만 뜻하지 않습니다. 국제천문연맹이 정한 88개 영역이 하늘 전체를 나누며, 어떤 천체가 하늘의 어느 구역에 있는지 말할 때 주소처럼 쓰입니다. 우리가 오리온자리라고 부르는 영역 안의 별들은 실제 거리가 크게 다를 수 있고, 지구에서 본 방향이 비슷해 하나의 모양으로 보일 뿐입니다.</p>
    <p>이 구분을 이해하면 별자리 감상이 더 단단해집니다. 별자리 선을 외우는 일은 시작일 뿐이고, 그 선이 계절 변화와 관측 위치, 문화권의 기록 방식에 따라 어떻게 읽혔는지를 보면 하늘은 한 장의 그림이 아니라 여러 시대가 겹친 지도처럼 보입니다.</p>`,
    ['별자리는 하늘을 기억하고 전달하기 위한 인간의 구획이다.', '현대 천문학의 별자리는 하늘 전체를 나누는 공식 영역이기도 하다.', '같은 별자리의 별들이 실제 공간에서 서로 가까운 것은 아니다.'],
    ['별자리', '국제천문연맹', '천구', '오리온자리', '하늘 지도']
  ),
  meteor: knowledgeArticle(
    '별똥별은 정말 별이 떨어지는 걸까?',
    '별똥별은 별이 아니라 작은 우주 먼지와 암석 조각이 대기와 만나 밝게 빛나는 짧은 현상입니다.',
    `<p>밤하늘을 가로지르는 짧은 빛줄기는 별이 떨어지는 모습처럼 보여 별똥별이라 불립니다. 실제 주인공은 대개 먼지 알갱이에서 작은 자갈 크기까지의 유성체입니다. 이 조각이 지구 대기로 매우 빠르게 들어오면 주변 공기가 압축되고 가열되며 밝은 빛을 냅니다. 우리가 보는 빛나는 현상은 유성, 땅까지 남아 도달한 조각은 운석이라고 구분합니다.</p>
    <p>유성우는 지구가 혜성이나 소행성이 남긴 잔해 흐름을 통과할 때 두드러집니다. 한 지점에서 빛줄기가 퍼져 나오는 것처럼 보이는 이유는 평행한 길을 따라 들어오는 유성들이 원근 효과 때문에 한 방향에서 오는 듯 보이기 때문입니다. 관측할 때는 망원경보다 넓은 하늘을 볼 수 있는 맨눈이 오히려 유리합니다.</p>
    <p>대부분의 작은 조각은 대기에서 사라지므로 유성은 지구가 우주 먼지와 끊임없이 만난다는 흔적에 가깝습니다. 동시에 대기는 많은 작은 침입자를 태워 지표까지 오는 양을 줄여 주는 보호막이기도 합니다.</p>`,
    ['유성은 대기에서 빛나는 현상이고, 운석은 지표까지 남은 물질이다.', '유성우는 지구가 잔해 흐름을 지날 때 관측 수가 늘어난다.', '넓은 하늘을 오래 보는 관측 방식이 유성 관측에 잘 맞는다.'],
    ['유성', '유성우', '운석', '혜성 잔해', '대기권']
  ),
  'moon-phases': knowledgeArticle(
    '달은 왜 매일 모양이 달라질까?',
    '달의 모양 변화는 달 자체가 변해서가 아니라, 태양빛을 받은 달을 지구에서 보는 각도가 달라져 생깁니다.',
    `<p>달은 스스로 빛나는 천체가 아니라 태양빛을 반사합니다. 달의 절반은 늘 태양빛을 받고 있지만, 달이 지구 주위를 돌면서 우리가 그 밝은 절반을 바라보는 방향이 달라집니다. 그래서 가느다란 초승달, 반달, 둥근 보름달이 차례로 나타납니다. 이 과정을 달의 위상 변화라고 합니다.</p>
    <p>초승달에서 보름달로 가는 동안 밝게 보이는 면이 늘어나고, 보름달 뒤에는 다시 줄어듭니다. 약 한 달의 주기가 반복되지만 매일 달이 뜨는 시각과 위치도 조금씩 바뀌기 때문에 같은 시간에 같은 자리를 올려다보면 달이 사라진 듯 느껴질 수 있습니다. 달의 위상과 달의 출몰 시각을 함께 보면 변화가 훨씬 명확해집니다.</p>
    <p>달의 모양 변화는 지구 그림자가 달을 가려서 일어나는 현상이 아닙니다. 지구 그림자가 달에 드리워지는 특별한 경우는 월식입니다. 평소의 위상 변화와 식 현상을 구분하는 순간, 태양과 지구와 달이 만드는 기하학이 눈앞의 관측으로 이어집니다.</p>`,
    ['달의 위상은 햇빛을 받은 면을 바라보는 각도 차이로 생긴다.', '달의 모양과 뜨는 시각은 함께 변한다.', '평소 위상 변화는 지구 그림자가 만드는 월식과 다르다.'],
    ['달의 위상', '초승달', '보름달', '공전', '월식']
  ),
  'bright-city-stars': knowledgeArticle(
    '도시에서도 볼 수 있는 밝은 별들',
    '도시 하늘에서는 희미한 별이 먼저 사라지지만, 밝기 등급이 낮은 별과 행성은 여전히 관측의 출발점이 됩니다.',
    `<p>도시의 밤하늘은 가로등과 건물 조명 때문에 배경이 밝습니다. 그 결과 어두운 별은 하늘과 구별되기 어렵고, 별자리 선도 끊겨 보입니다. 이때 유용한 기준이 겉보기 등급입니다. 숫자가 작을수록 더 밝게 보이며, 아주 밝은 천체는 0보다 작은 등급으로 표시되기도 합니다. 이 값은 실제 에너지 출력뿐 아니라 거리와 관측 조건의 영향을 함께 받은 밝기입니다.</p>
    <p>도시에서 처음 찾기 좋은 대상은 계절마다 눈에 띄는 밝은 별과 행성입니다. 겨울의 시리우스, 봄의 아크투루스, 여름의 베가, 가을 밤에 눈에 들어오는 밝은 행성들은 하늘 위치를 익히는 닻이 됩니다. 행성은 별보다 유난히 밝게 보이거나 반짝임이 덜한 경우가 많지만, 대기 상태와 고도에 따라 인상은 달라질 수 있습니다.</p>
    <p>도시 관측의 목표는 어두운 하늘을 흉내 내는 것이 아니라 보이는 하늘을 정확히 읽는 것입니다. 밝은 천체 몇 개를 계절 순서로 알아보면 다음 관측 때 별자리와 달, 행성의 위치 변화가 훨씬 쉽게 이어집니다.</p>`,
    ['겉보기 등급은 지구에서 보이는 밝기를 나타낸다.', '도시에서는 밝은 별과 행성이 관측 기준점이 된다.', '광공해가 있어도 계절별 하늘 읽기 연습은 가능하다.'],
    ['겉보기 등급', '광공해', '시리우스', '베가', '밝은 행성']
  ),
  eclipses: knowledgeArticle(
    '일식과 월식은 왜 일어날까?',
    '식은 태양, 지구, 달이 특별한 줄맞춤을 이룰 때 그림자와 관측 위치가 함께 만드는 현상입니다.',
    `<p>일식은 달이 태양과 지구 사이에 들어와 태양빛 일부 또는 전부를 가릴 때 일어납니다. 월식은 반대로 지구가 태양과 달 사이에 놓여 지구 그림자가 달에 드리워질 때 보입니다. 달이 매달 지구를 돌고 보름달과 그믐 무렵이 반복되는데도 식이 매번 생기지 않는 이유는 달 궤도가 지구 공전 궤도면에 대해 조금 기울어져 있기 때문입니다.</p>
    <p>일식은 관측 위치에 따라 개기일식, 부분일식, 금환일식처럼 다르게 보입니다. 달의 본그림자가 지표를 지나가는 좁은 경로 안에서는 태양이 완전히 가려질 수 있고, 그 바깥에서는 일부만 가려집니다. 월식은 지구의 그림자가 훨씬 커서 밤인 넓은 지역에서 함께 볼 수 있습니다. 개기월식 때 달이 붉게 보이는 것은 지구 대기를 지난 붉은 빛이 그림자 속 달에 도달하기 때문입니다.</p>
    <p>식 현상은 우연한 장관을 넘어 천체 운동을 입체적으로 보여 줍니다. 단, 일식은 반드시 검증된 태양 관측 보호 장비로 보아야 하며 맨눈이나 일반 선글라스로 직접 보면 눈을 다칠 수 있습니다.</p>`,
    ['일식과 월식은 태양, 지구, 달의 줄맞춤과 그림자로 생긴다.', '달 궤도의 기울기 때문에 식은 매달 일어나지 않는다.', '일식 관측에는 전용 보호 장비가 필요하다.'],
    ['일식', '월식', '본그림자', '금환일식', '궤도면']
  ),
  aurora: knowledgeArticle(
    '오로라는 왜 생기는 걸까?',
    '오로라는 태양에서 온 입자와 지구 자기장, 상층 대기가 함께 만드는 빛입니다.',
    `<p>오로라는 단순히 차가운 지방의 아름다운 빛이 아니라 태양과 지구가 연결되어 있음을 보여 주는 현상입니다. 태양은 빛뿐 아니라 전하를 띤 입자의 흐름인 태양풍도 내보냅니다. 지구 자기장은 그 입자 대부분을 막거나 우회시키지만, 일부는 자기장 선을 따라 극지방 상층 대기로 들어갑니다.</p>
    <p>들어온 입자가 산소와 질소 같은 대기 원자와 분자에 에너지를 전달하면, 이들이 다시 안정한 상태로 돌아오며 특정 색의 빛을 냅니다. 높이와 성분에 따라 녹색, 붉은색, 보랏빛 인상이 달라집니다. 태양 플레어나 코로나 질량 방출 뒤 지구 주변 입자 환경이 크게 흔들리면 오로라가 평소보다 강해지거나 더 낮은 위도까지 확장될 수 있습니다.</p>
    <p>그래서 오로라 관측은 풍경 감상과 우주 날씨 이해를 동시에 품습니다. 같은 태양 활동은 위성 운용, 전파 통신, 전력망에도 영향을 줄 수 있어 연구 대상입니다. 극지 하늘의 빛은 멀리서 온 태양 입자가 지구의 보호막을 스치며 남긴 흔적입니다.</p>`,
    ['태양풍 입자는 지구 자기장과 상층 대기를 만나 오로라를 만든다.', '오로라 색은 충돌한 대기 성분과 높이에 따라 달라진다.', '강한 태양 활동은 오로라와 우주 날씨를 함께 바꿀 수 있다.'],
    ['오로라', '태양풍', '자기권', '코로나 질량 방출', '우주 날씨']
  ),
  'solar-overview': knowledgeArticle(
    '태양계는 어떻게 생겨났을까?',
    '태양계는 회전하던 가스와 먼지 구름이 중력으로 수축하고, 남은 원반에서 행성과 작은 천체가 자라며 형성되었습니다.',
    `<p>태양계의 시작은 이미 완성된 행성들이 한꺼번에 등장한 장면이 아닙니다. 약 46억 년 전 성간 공간의 가스와 먼지 구름 일부가 중력으로 수축하며 중심에는 원시 태양이, 주변에는 회전하는 원반이 만들어졌습니다. 원반 안의 먼지 알갱이는 부딪히고 달라붙어 더 큰 덩어리가 되었고, 그중 일부가 행성의 씨앗으로 성장했습니다.</p>
    <p>태양 가까운 곳은 뜨거워 암석과 금속이 남기 쉬웠고, 더 먼 곳은 얼음 성분도 함께 모일 수 있었습니다. 이 차이는 안쪽 암석형 행성과 바깥쪽 거대 행성의 성격을 이해하는 중요한 실마리입니다. 성장 과정은 매끈하지 않았습니다. 충돌과 이동, 중력 상호작용이 이어졌고 남은 조각은 소행성, 혜성, 먼 얼음 천체로 남았습니다.</p>
    <p>오늘날 태양계의 배열은 형성 초기의 흔적을 품고 있습니다. 행성의 공전면이 대체로 비슷한 이유, 원반 모양의 잔해 지대가 남은 이유, 운석이 초기 물질 기록을 보존하는 이유가 여기에 연결됩니다. 태양계를 읽는 일은 한 가족의 현재 모습으로 탄생 과정을 거슬러 올라가는 일입니다.</p>`,
    ['태양계는 원시 태양과 원반에서 성장한 행성계다.', '온도 차이는 안쪽과 바깥쪽 천체의 재료 차이에 영향을 주었다.', '소행성과 혜성은 형성 뒤 남은 기록 보관소 역할을 한다.'],
    ['성운 가설', '원시행성계 원반', '행성 형성', '소행성', '혜성']
  ),
  sun: knowledgeArticle(
    '태양은 일생동안 어떤 변화를 겪을까?',
    '태양은 중심 핵융합으로 오랫동안 빛나는 주계열성이며, 아주 먼 미래에는 적색거성과 백색왜성 단계를 거칩니다.',
    `<p>태양은 태양계의 중심일 뿐 아니라 별의 생애를 이해하는 좋은 기준입니다. 지금 태양 중심에서는 수소가 헬륨으로 바뀌는 핵융합이 일어나고, 이 과정에서 나온 에너지가 내부를 지나 표면에서 빛과 열로 방출됩니다. 중력이 태양을 안쪽으로 누르고 내부 압력과 에너지 흐름이 버티는 균형 덕분에 태양은 수십억 년 동안 비교적 안정한 밝기를 유지합니다.</p>
    <p>하지만 별의 연료와 구조는 영원히 같지 않습니다. 중심 수소가 줄어들면 내부 균형이 바뀌고 태양은 훗날 크게 부풀어 오르는 적색거성 단계로 들어갑니다. 그 시기의 정확한 주변 환경은 복잡하지만, 현재의 태양계와는 매우 다른 조건이 될 것입니다. 태양처럼 질량이 아주 크지 않은 별은 초신성으로 폭발하기보다 바깥층을 우주로 흘려보내고 뜨거운 중심핵을 남깁니다.</p>
    <p>그 남은 핵이 백색왜성입니다. 태양의 일생은 하늘에서 늘 같은 원반처럼 보이는 별도 긴 시간 축에서는 변화한다는 사실을 보여 줍니다. 오늘의 햇빛은 안정된 중년 별의 모습이고, 그 안정성이 지구의 기후와 생명 진화에 긴 시간을 허락했습니다.</p>`,
    ['현재 태양의 에너지원은 중심부 수소 핵융합이다.', '태양은 미래에 적색거성 단계를 거쳐 백색왜성으로 남는다.', '별의 질량은 생애 후반의 경로를 크게 좌우한다.'],
    ['태양', '핵융합', '주계열성', '적색거성', '백색왜성']
  ),
  mercury: knowledgeArticle(
    '태양계 첫번째 행성, 수성',
    '수성은 태양에 가장 가까운 작은 암석 행성으로, 극단적인 낮밤 환경과 오래된 충돌 흔적을 함께 보여 줍니다.',
    `<p>수성은 태양계의 첫 번째 행성이며, 크기는 작지만 관측과 탐사에서 흥미로운 질문을 많이 남깁니다. 태양에 가깝고 공전 주기가 짧아 하늘에서 태양 근처를 벗어나기 어렵기 때문에 맨눈 관측 창이 제한적입니다. 두꺼운 대기가 거의 없어 표면은 충돌 분화구가 오래 남고, 낮과 밤의 온도 차이도 매우 큽니다.</p>
    <p>수성의 하루를 이해하려면 자전과 공전을 함께 보아야 합니다. 수성은 태양을 두 바퀴 도는 동안 세 번 자전하는 공명 상태에 있어, 태양이 하늘을 가로지르는 리듬이 지구와 다릅니다. 표면은 달처럼 낡아 보이지만 내부에는 큰 금속 핵이 있고 약한 자기장도 있어 단순한 돌덩어리로 보기 어렵습니다.</p>
    <p>흥미롭게도 수성의 극지 일부 분화구 바닥은 햇빛이 거의 닿지 않아 얼음이 보존될 수 있는 차가운 함정이 됩니다. 가장 태양 가까운 행성에 얼음 흔적이 있다는 점은 천체 환경이 거리 하나로만 결정되지 않음을 알려 줍니다. 수성은 태양 가까운 세계의 물리 조건을 압축해 보여 주는 행성입니다.</p>`,
    ['수성은 두꺼운 대기가 거의 없어 표면 변화가 오래 남는다.', '자전과 공전의 공명 때문에 수성의 태양일은 지구와 크게 다르다.', '극지 영구 음영 지역은 얼음 보존 가능성을 보여 준다.'],
    ['수성', '암석 행성', '자전 공명', '충돌 분화구', '극지 얼음']
  ),
  venus: knowledgeArticle(
    '태양계에서 가장 불타는 행성, 금성',
    '금성은 태양에서 두 번째 행성이지만 짙은 대기와 강한 온실효과 때문에 가장 뜨거운 표면 환경을 가집니다.',
    `<p>금성은 크기와 질량이 지구와 비슷해 한때 지구의 쌍둥이라고 불렸지만, 현재의 표면 환경은 매우 다릅니다. 두꺼운 이산화탄소 대기와 황산 구름이 행성을 감싸며, 햇빛으로 데워진 열이 쉽게 빠져나가지 못해 표면은 극도로 뜨겁고 압력도 큽니다. 태양에 더 가까운 수성보다 금성이 더 뜨거운 이유가 여기에 있습니다.</p>
    <p>금성은 자전도 독특합니다. 매우 느리게 돌고, 많은 행성과 반대 방향으로 자전합니다. 지표는 구름 아래 가려져 가시광선으로 보기 어렵지만 레이더 관측과 탐사선 자료로 화산 지형과 넓은 평원을 연구해 왔습니다. 금성의 대기 순환은 상층에서 빠르게 흐르며, 표면과 구름층은 전혀 다른 관측 인상을 줍니다.</p>
    <p>금성을 공부하는 이유는 단순히 극한 행성을 구경하기 위해서가 아닙니다. 비슷한 크기의 암석 행성이 왜 지구와 그렇게 다른 길을 걸었는지 묻는 과정은 대기, 물, 기후 안정성의 중요성을 다시 보게 합니다. 금성은 가까운 이웃이면서 행성 기후의 경고 사례입니다.</p>`,
    ['금성은 강한 온실효과 때문에 태양계에서 가장 뜨거운 표면을 가진다.', '짙은 구름 때문에 레이더와 탐사 자료가 지표 연구에 중요하다.', '지구와 비슷한 크기라도 대기 진화는 매우 다른 결과를 만든다.'],
    ['금성', '온실효과', '이산화탄소 대기', '레이더 관측', '암석 행성']
  ),
  earth: knowledgeArticle(
    '우주에서 가장 찬란한 푸른점, 지구',
    '지구는 액체 물, 대기, 자기장, 지질 활동이 함께 작동하며 생명이 오래 머물 수 있는 환경을 만든 행성입니다.',
    `<p>우주에서 본 지구는 푸른 바다와 흰 구름이 두드러지는 암석 행성입니다. 생명체가 존재한다는 사실이 가장 특별하지만, 그 배경에는 여러 물리 조건이 겹쳐 있습니다. 태양으로부터 받은 에너지가 지나치게 많지도 적지도 않은 범위에 있고, 표면에는 액체 물이 넓게 존재하며, 대기는 열과 물질 순환을 조절합니다.</p>
    <p>지구는 내부도 활발합니다. 판 운동과 화산 활동은 지표를 바꾸고 긴 시간 규모의 탄소 순환에 관여합니다. 자기장은 태양풍과 상호작용하며 대기와 기술 인프라가 놓인 우주 환경을 이해하는 데 중요한 보호막 역할을 합니다. 달은 조석을 만들고 밤하늘의 변화를 이끄는 가까운 동반자입니다.</p>
    <p>지구를 태양계 안에서 비교하면 익숙한 환경이 얼마나 조건부인지 보입니다. 금성은 대기와 열의 다른 결말을, 화성은 얇은 대기와 물의 흔적을 보여 줍니다. 지구는 단지 관측자의 출발점이 아니라 행성 과학의 기준점입니다. 푸른 점을 연구하는 일은 다른 세계를 이해하는 가장 가까운 실험입니다.</p>`,
    ['지구의 액체 물과 대기는 생명 환경의 핵심 조건이다.', '지질 활동과 자기장은 행성의 장기 환경을 이해하는 데 중요하다.', '다른 암석 행성과 비교할수록 지구의 조건이 선명해진다.'],
    ['지구', '액체 물', '자기장', '판 운동', '생명 가능 환경']
  ),
  mars: knowledgeArticle(
    '인류의 다음정착지, 화성',
    '화성은 메마른 현재와 물이 흘렀던 과거의 흔적을 함께 품어 탐사와 거주 가능성 논의를 이끄는 행성입니다.',
    `<p>화성은 붉은 표면과 비교적 익숙한 하루 길이 덕분에 인간이 상상하기 쉬운 행성입니다. 하지만 표면은 차갑고 대기는 매우 얇으며 방사선 환경도 지구와 다릅니다. 모래폭풍, 낮은 기압, 먼지 많은 지형은 탐사 장비와 미래 거주 개념 모두에 까다로운 조건을 줍니다.</p>
    <p>그럼에도 화성이 특별한 이유는 과거 기록입니다. 계곡 지형, 광물, 퇴적 구조는 오래전 물이 표면과 지하에서 중요한 역할을 했음을 가리킵니다. 현재도 얼음과 지하 환경은 핵심 연구 대상입니다. 그래서 탐사 로버와 궤도선은 단순히 풍경을 찍는 것이 아니라 화성의 기후가 어떻게 바뀌었는지, 생명에 유리한 환경이 한때 있었는지 묻고 있습니다.</p>
    <p>정착지라는 표현은 매력적이지만 현실은 공학적 과제의 묶음입니다. 물과 에너지 확보, 생명 유지, 먼지와 방사선 대응, 지구와의 긴 통신 지연을 함께 해결해야 합니다. 화성은 다음 집이라는 결론보다, 다른 행성에서 인간 활동이 무엇을 요구하는지 가장 구체적으로 보여 주는 시험장에 가깝습니다.</p>`,
    ['화성의 현재 환경은 인간에게 매우 가혹하다.', '물의 흔적은 화성의 과거 기후와 생명 가능성 연구를 이끈다.', '화성 거주는 자원, 방사선, 통신 문제를 함께 풀어야 한다.'],
    ['화성', '로버', '물의 흔적', '방사선', '행성 거주']
  ),
  jupiter: knowledgeArticle(
    '가장 큰 태양계 행성, 목성',
    '목성은 거대한 질량과 강한 자기장, 복잡한 위성계를 지닌 태양계 바깥 행성 연구의 중심입니다.',
    `<p>목성은 태양계 행성 가운데 가장 크며, 대기 대부분은 수소와 헬륨으로 이루어져 있습니다. 표면에 발을 디딜 단단한 경계가 뚜렷하지 않고, 구름띠와 거대한 폭풍이 상층 대기의 움직임을 보여 줍니다. 유명한 대적점은 오래 지속된 거대한 폭풍의 사례지만 그 크기와 세부 변화는 시간에 따라 달라집니다.</p>
    <p>목성의 영향력은 크기만으로 끝나지 않습니다. 빠른 자전과 내부 구조는 강한 자기권을 만들고, 주변에는 다양한 위성이 모여 있습니다. 이오의 화산 활동, 유로파의 얼음 아래 바다 가능성, 가니메데의 규모는 목성계를 작은 행성계처럼 보이게 합니다. 행성 하나를 연구하는 일이 동시에 여러 다른 세계를 연구하는 일로 확장됩니다.</p>
    <p>목성의 중력은 소행성과 혜성의 궤도 진화에도 큰 영향을 줍니다. 이를 단순히 지구의 방패라고만 말하기는 어렵지만, 태양계 구조를 조율하는 큰 질량이라는 점은 분명합니다. 목성은 거대 행성이 행성계의 날씨와 위성, 궤도 역사에 얼마나 넓게 작용하는지 보여 줍니다.</p>`,
    ['목성은 태양계에서 가장 큰 거대 행성이다.', '목성의 위성계는 각기 다른 지질과 환경을 보여 준다.', '큰 질량은 주변 작은 천체의 궤도 역사에 영향을 준다.'],
    ['목성', '대적점', '유로파', '자기권', '거대 행성']
  ),
  saturn: knowledgeArticle(
    '고리의 신비, 토성',
    '토성은 얼음 조각이 만든 밝은 고리와 다양한 위성으로 태양계의 중력 구조를 눈에 보이게 하는 행성입니다.',
    `<p>토성의 첫인상은 고리입니다. 멀리서 보면 얇고 매끈한 원반처럼 보이지만, 실제로는 얼음과 암석이 섞인 수많은 조각이 토성 주위를 돌며 만든 구조입니다. 고리의 틈과 물결무늬에는 위성의 중력과 입자들의 충돌, 공명 효과가 흔적으로 남습니다. 고리는 장식이 아니라 궤도 역학을 관측할 수 있는 거대한 실험장입니다.</p>
    <p>토성 자체는 수소와 헬륨이 주성분인 거대 행성이며 빠르게 자전합니다. 대기에는 띠와 폭풍이 나타나고, 극지의 독특한 구름 구조도 연구 대상입니다. 위성 타이탄은 두꺼운 대기와 액체 탄화수소 순환으로 유명하고, 엔셀라두스는 얼음 표면 아래 바다 가능성을 시사하는 분출 기둥 때문에 주목받습니다.</p>
    <p>고리가 언제 어떻게 생겼는지는 계속 연구되는 주제입니다. 부서진 위성이나 얼음 천체의 잔해가 관련되었을 수 있지만, 세부 역사와 지속 시간은 관측과 모형이 함께 다듬고 있습니다. 토성은 아름다운 모습만큼이나 질문을 오래 남기는 행성입니다.</p>`,
    ['토성 고리는 수많은 입자가 궤도를 이루는 구조다.', '타이탄과 엔셀라두스는 토성계 연구의 핵심 위성이다.', '고리의 기원과 수명은 계속 연구되는 문제다.'],
    ['토성', '행성 고리', '타이탄', '엔셀라두스', '궤도 공명']
  ),
  uranus: knowledgeArticle(
    '청개구리 행성, 청록 빛의 천왕성',
    '천왕성은 크게 기울어진 자전축과 청록빛 대기로 계절과 행성 진화가 얼마나 다양할 수 있는지 보여 줍니다.',
    `<p>천왕성은 멀리서 보면 고요한 청록색 원반처럼 보이지만, 기본 자세부터 독특합니다. 자전축이 공전 궤도면에 거의 눕듯이 기울어져 있어 태양을 돌며 극지와 적도에 들어오는 햇빛 배치가 다른 행성과 크게 다릅니다. 이 극단적인 기울기는 과거 큰 충돌이나 복잡한 형성 역사를 떠올리게 하지만 정확한 과정은 연구 대상입니다.</p>
    <p>천왕성의 색에는 대기 중 메탄이 관여합니다. 붉은빛 일부를 흡수해 푸른 계열 인상을 강화하기 때문입니다. 목성과 토성보다 얼음 성분의 비중이 큰 거대 행성으로 분류되며, 해왕성과 함께 얼음 거인이라는 이름으로 다뤄집니다. 희미한 고리와 위성들도 있어 겉보기보다 풍부한 계를 이룹니다.</p>
    <p>천왕성은 탐사 자료가 아직 제한적인 행성이기도 합니다. 한 번의 근접 비행이 남긴 정보와 망원경 관측을 바탕으로 계절 변화, 내부 열, 대기 활동을 해석합니다. 그래서 천왕성은 이상한 예외가 아니라 아직 충분히 가까이 보지 못한 태양계의 큰 질문입니다.</p>`,
    ['천왕성은 매우 크게 기울어진 자전축을 가진다.', '메탄은 천왕성의 청록빛 인상에 영향을 준다.', '얼음 거인 연구는 거대 행성의 다양성을 넓힌다.'],
    ['천왕성', '얼음 거인', '자전축 기울기', '메탄', '행성 계절']
  ),
  neptune: knowledgeArticle(
    '푸른색 미지의 행성, 해왕성',
    '해왕성은 태양에서 가장 먼 주요 행성으로, 어두운 태양빛 아래에서도 활발한 대기와 위성계를 드러냅니다.',
    `<p>해왕성은 맨눈으로 발견된 행성이 아니라 천왕성 궤도의 미세한 차이를 설명하려는 계산과 관측이 이어져 확인된 행성입니다. 태양에서 멀어 받는 에너지는 적지만 대기에는 빠른 바람과 폭풍 구조가 나타납니다. 멀고 차갑다는 인상만으로는 행성의 내부 에너지와 대기 역학을 설명하기 어렵다는 점을 보여 줍니다.</p>
    <p>푸른빛에는 천왕성과 마찬가지로 메탄이 관여하지만, 해왕성의 색과 대기 세부 구조는 단순한 한 성분만으로 끝나지 않습니다. 해왕성도 얼음 거인으로 분류되며, 내부에는 물과 암모니아, 메탄과 관련된 고압 물질 상태가 중요하게 논의됩니다. 위성 트리톤은 역행 궤도와 독특한 표면 활동 흔적으로 해왕성계의 역사를 묻는 대상입니다.</p>
    <p>해왕성은 태양계 바깥 경계로 가는 관문처럼 보입니다. 그 너머에는 카이퍼 벨트 천체들이 이어지고, 행성의 중력은 그들의 궤도 구조에도 흔적을 남깁니다. 멀리 있다는 이유로 단순해지는 것이 아니라, 멀리 있어서 더 적은 자료로 더 정교하게 해석해야 하는 세계입니다.</p>`,
    ['해왕성은 계산과 관측이 함께 발견을 이끈 행성이다.', '해왕성 대기는 먼 거리에도 활발한 구조를 보인다.', '트리톤과 카이퍼 벨트는 해왕성계 이해와 연결된다.'],
    ['해왕성', '얼음 거인', '트리톤', '대기 역학', '카이퍼 벨트']
  ),
  kuiper: knowledgeArticle(
    '태양계 끝에는 무엇이 있을까?',
    '해왕성 너머에는 명왕성을 포함한 얼음 천체들이 모인 카이퍼 벨트와 더 먼 태양계 경계 질문이 이어집니다.',
    `<p>태양계의 끝은 선 하나로 단정하기 어렵습니다. 행성 배열을 기준으로 보면 해왕성 바깥이 낯선 외곽처럼 느껴지지만, 그 너머에도 태양 주위를 도는 많은 얼음 천체가 있습니다. 카이퍼 벨트는 이 먼 천체들이 모인 대표 영역이며, 명왕성과 여러 왜소행성, 짧은 주기 혜성의 역사와 연결됩니다.</p>
    <p>카이퍼 벨트 천체는 차갑고 작지만 중요합니다. 행성 형성 뒤 남은 재료와 거대 행성의 이동 흔적을 품었을 가능성이 있기 때문입니다. 명왕성 탐사는 이 외곽 천체가 단순한 얼음 덩어리가 아니라 다양한 지형과 활동의 단서를 가질 수 있음을 보여 주었습니다. 먼 곳일수록 오래 보존된 기록이 남을 수 있다는 기대도 연구를 이끕니다.</p>
    <p>태양계 영향권을 더 넓게 보면 태양풍이 약해지는 경계, 장주기 혜성의 근원으로 추정되는 오르트 구름까지 여러 기준이 있습니다. 그래서 태양계 끝을 묻는 질문은 어디까지가 행성 가족인지가 아니라, 태양의 중력과 입자 환경이 어디까지 흔적을 남기는지 묻는 질문이 됩니다.</p>`,
    ['카이퍼 벨트는 해왕성 너머 얼음 천체들의 중요한 영역이다.', '명왕성은 태양계 외곽 연구의 대표 대상이다.', '태양계 경계는 행성 배열, 태양풍, 중력 영향 등 기준에 따라 달라진다.'],
    ['카이퍼 벨트', '명왕성', '왜소행성', '태양권', '얼음 천체']
  ),
  'dwarf-planet': knowledgeArticle(
    '명왕성은 왜 행성에서 쫓겨났을까?',
    '명왕성의 분류 변화는 천체의 가치를 낮춘 사건이 아니라, 행성이라는 기준을 더 분명히 하려는 과정이었습니다.',
    `<p>명왕성은 오랫동안 아홉 번째 행성으로 불렸습니다. 그러나 해왕성 바깥에서 비슷한 성격의 천체들이 잇따라 발견되면서 질문이 커졌습니다. 태양을 돌고 둥근 모양에 가까운 모든 천체를 행성이라 부를 것인지, 아니면 궤도 주변에서 지배적인 역할을 하는지까지 볼 것인지 정해야 했습니다.</p>
    <p>국제천문연맹의 현재 정의에서 행성은 태양을 돌고, 자체 중력으로 거의 둥글며, 궤도 주변을 충분히 정리한 천체입니다. 명왕성은 앞의 조건에는 들어가지만 해왕성 너머의 많은 천체와 궤도 영역을 공유하므로 왜소행성으로 분류됩니다. 이 표현은 작거나 덜 흥미롭다는 뜻이 아니라 분류 체계의 자리입니다.</p>
    <p>오히려 분류 변화 뒤 명왕성은 더 풍부하게 보였습니다. 위성과의 관계, 얼음 지형, 카이퍼 벨트라는 맥락이 함께 드러났기 때문입니다. 천문학의 이름 붙이기는 관측이 늘어날수록 바뀔 수 있습니다. 명왕성은 그 변화가 지식을 잃는 일이 아니라 더 정확한 질문을 얻는 일임을 보여 줍니다.</p>`,
    ['명왕성 분류 변화는 행성 정의를 다듬는 과정에서 나왔다.', '현재 기준은 궤도 주변을 지배적으로 정리했는지도 본다.', '왜소행성은 과학적 가치가 낮다는 뜻이 아니다.'],
    ['명왕성', '왜소행성', '행성 정의', '국제천문연맹', '카이퍼 벨트']
  ),
  'oort-cloud': knowledgeArticle(
    '혜성의 고향, 오르트 구름',
    '오르트 구름은 아주 먼 태양계에 장주기 혜성의 저장소가 있을 것이라는 가설적 구조입니다.',
    `<p>혜성 가운데 어떤 것들은 태양계 안쪽을 자주 오가지만, 어떤 것들은 매우 긴 주기로 멀리서 찾아옵니다. 이 장주기 혜성의 궤도를 설명하기 위해 제안된 구조가 오르트 구름입니다. 태양에서 극도로 먼 곳에 얼음 천체들이 구형에 가깝게 넓게 퍼져 있을 수 있다는 그림이며, 아직 그 전체 모습을 직접 촬영한 것은 아닙니다.</p>
    <p>오르트 구름 천체는 태양계 형성 초기에 거대 행성들과 중력 상호작용을 겪으며 먼 궤도로 흩어진 얼음 물질일 수 있습니다. 가까운 별의 중력이나 은하 환경의 미세한 교란이 일부 천체의 궤도를 바꾸면, 그중 하나가 태양계 안쪽으로 들어와 혜성으로 관측될 수 있습니다. 따라서 혜성은 멀리 있는 저장소의 간접 전령처럼 다뤄집니다.</p>
    <p>이 영역을 연구하기 어려운 이유는 거리와 어두움입니다. 하지만 혜성 궤도 통계와 태양계 형성 모형을 함께 읽으면 외곽 구조를 추론할 수 있습니다. 오르트 구름은 아직 보이지 않는 태양계의 경계가 관측 가능한 혜성 꼬리와 이어져 있음을 보여 주는 개념입니다.</p>`,
    ['오르트 구름은 장주기 혜성의 근원을 설명하는 가설적 구조다.', '형성 초기 물질이 거대 행성 중력으로 먼 곳에 흩어졌을 수 있다.', '직접 관측보다 혜성 궤도와 모형이 연구의 핵심 단서다.'],
    ['오르트 구름', '장주기 혜성', '태양계 외곽', '중력 교란', '혜성 궤도']
  ),
  star: article('별은 어떤 일생을 보낼까?', '별의 질량은 핵융합의 속도와 생애 길이, 마지막 모습까지 좌우합니다.'),
  nebula: article('별은 어디에서 어떻게 생길까?', '가스와 먼지가 모인 성운 안에서 밀도 높은 부분이 중력으로 수축하면 별의 탄생이 시작됩니다.'),
  'blackhole-shadow': article('블랙홀은 어떻게 만들어질까?', '아주 무거운 별의 핵이 붕괴하거나 더 큰 블랙홀이 성장하는 과정에서 강한 중력의 경계가 만들어집니다.'),
  galaxy: article('별들의 도시, 은하', '은하는 별과 가스, 먼지, 암흑물질이 중력으로 묶인 거대한 구조이며 우리 태양도 우리은하 안에 있습니다.'),
  'telescope-history': article('망원경은 인류에게 어떤 영향을 미쳤을까?', '망원경은 보이지 않던 천체를 관측 가능한 증거로 바꾸며 우주관과 과학의 질문을 넓혔습니다.'),
  spectrum: article('빛을 분해해서 보는 방법', '스펙트럼은 빛을 파장별로 나누어 온도, 구성 원소, 움직임의 단서를 읽는 관측 방법입니다.'),
  rocket: article('로켓은 어떻게 지구를 벗어날까', '로켓은 추력과 속도를 쌓아 지구 중력권 안에서 궤도 운동을 시작합니다.'),
  'solar-explore': article('탐사선은 어떻게 길을 잃지 않을까?', '탐사선은 별 추적기, 관성 장치, 지상 관제와의 전파 교신으로 위치와 자세를 보정합니다.'),
  'exoplanet-search': article('다른 별 주변의 행성을 어떻게 찾을까?', '외계행성은 별빛 감소와 별의 흔들림 같은 간접 신호를 읽어 발견합니다.'),
  'famous-astronomers': article('세상을 바꾼 천문학자들의 기발한 질문들', '천문학의 큰 변화는 익숙한 하늘을 다른 질문으로 바라본 사람들에게서 시작되었습니다.'),
  'const-east': article('동아시아의 별자리는 하늘을 어떻게 나누었을까?', '동아시아 전통 천문학은 하늘을 28수와 여러 별자리 체계로 나누어 계절, 의례, 국가 운영과 연결했습니다.'),
  distance: article('우주의 거리는 어떻게 잴까?', '가까운 별은 시차로, 먼 은하까지는 표준촛불과 적색편이 같은 여러 방법을 이어 거리 사다리를 만듭니다.'),
  brightness: article('별의 밝기는 어떻게 측정하는가?', '겉보기 등급과 절대등급을 구분하면 하늘에서 보이는 밝기와 별 자체의 밝기를 함께 읽을 수 있습니다.'),
  dynamics: article('중력은 어떻게 궤도를 만들까?', '궤도 운동은 앞으로 나아가는 속도와 중력으로 떨어지는 운동이 균형을 이루는 결과입니다.'),
  theory: article('상대성이론은 천문학을 어떻게 바꾸었을까?', '상대성이론은 시간과 공간이 고정된 배경이 아니라 속도와 중력에 따라 달라질 수 있음을 보여주었습니다.'),
  au: article('천문단위는 왜 필요할까?', '천문단위(AU)는 지구와 태양 사이 평균 거리를 기준으로 한 단위입니다. 태양계 안의 거리를 말할 때 유용합니다.'),
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

function knowledgeArticle(title, summary, body, points, keywords, status = '임시 공개') {
  return {
    title,
    tags: [{ cls: 'beginner', label: '입문' }, { cls: 'mission', label: status }],
    readTime: '6',
    difficulty: '입문',
    date: `2026 · ${status}`,
    body: `<div class="callout"><span class="callout-icon">한 줄 요약</span>${escapeHtml(summary)}</div>
      ${body}
      <div class="fact-box"><div class="fact-title">핵심 포인트</div><ul>${points.map(point => `<li>${escapeHtml(point)}</li>`).join('')}</ul></div>
      <div class="callout"><span class="callout-icon">관련 키워드</span>${keywords.map(keyword => escapeHtml(keyword)).join(' · ')}</div>`,
  };
}

const KNOWLEDGE_HUB = [
  cat('sky-observation', '하늘과 관측', '🌙', 'hub-sky', '오늘 밤 하늘에서 출발하는 첫 번째 지식 지도', [
    item('const-north', '🧭', '어떻게 별을 보고 길을 찾을까?', '북극성, 큰곰자리, 계절별 하늘 읽기'),
    item('const-origin', '✨', '별자리는 어떻게 만들어졌을까?', '신화와 항해, 농사의 달력'),
    item('meteor', '☄️', '별똥별은 정말 별이 떨어지는 걸까?', '유성, 유성우, 대기권의 빛'),
    item('moon-phases', '🌗', '달은 왜 매일 모양이 달라질까?', '위상, 공전, 관측 습관'),
    item('bright-city-stars', '✦', '도시에서도 볼 수 있는 밝은 별들', '겉보기 등급, 밝은 천체 목록들'),
    item('eclipses', '🌘', '일식과 월식은 왜 일어날까?', '식 현상의 원리, 일식과 월식의 종류'),
    item('aurora', '🟢', '오로라는 왜 생기는 걸까?', '태양의 활동'),
  ]),
  cat('solar-system-trip', '태양계 여행', '🪐', 'hub-solar', '태양에서 왜소행성까지, 우리 동네 우주 산책', [
    item('solar-overview', '🌌', '태양계는 어떻게 생겨났을까?', '가스 구름에서 행성 가족으로'),
    item('sun', '☀️', '태양은 일생동안 어떤 변화를 겪을까?', '핵융합, 빛, 미래의 태양'),
    item('mercury', '☿', '태양계 첫번째 행성, 수성', '수성의 모든것'),
    item('venus', '♀', '태양계에서 가장 불타는 행성, 금성', '금성의 모든것'),
    item('earth', '🌍', '우주에서 가장 찬란한 푸른점, 지구', '지구의 모든것'),
    item('mars', '🔴', '인류의 다음정착지, 화성', '화성의 모든것'),
    item('jupiter', '♃', '가장 큰 태양계 행성, 목성', '목성의 모든것'),
    item('saturn', '🪐', '고리의 신비, 토성', '토성의 모든것'),
    item('uranus', '♅', '청개구리 행성, 청록 빛의 천왕성', '천왕성의 모든것'),
    item('neptune', '♆', '푸른색 미지의 행성, 해왕성', '해왕성의 모든것'),
    item('kuiper', '🧊', '태양계 끝에는 무엇이 있을까?', '명왕성과 카이퍼벨트'),
    item('dwarf-planet', '⚪', '명왕성은 왜 행성에서 쫓겨났을까?', '왜소행성의 정의'),
    item('oort-cloud', '☄️', '혜성의 고향, 오르트 구름', '오르트 구름의 형성, 연구, 구조'),
  ]),
  cat('stars-life', '별의 삶과 죽음', '⭐', 'hub-celestial', '별이 태어나고 빛나다가 사라지는 방식', [
    item('star', '⭐', '별은 어떤 일생을 보낼까?', '성운, 중력, 핵융합'),
    item('nebula', '🌫️', '별은 어디에서 어떻게 생길까?', '가스와 먼지, 별 탄생 지역'),
    item('blackhole-shadow', '🕳️', '블랙홀은 어떻게 만들어질까?', '사건의 지평선과 중력'),
    item('supernova', '💥', '원소의 재활용, 초신성 폭발', '무거운 원소와 폭발', 'planned'),
    item('early-stars', '✨', '우주 초기 별도 지금과 비슷했을까?', '별의 세대 분류', 'planned'),
  ]),
  cat('galaxies-cosmos', '은하와 우주', '🌌', 'hub-galaxy', '은하, 빅뱅, 보이지 않는 우주의 큰 구조', [
    item('galaxy', '🌌', '별들의 도시, 은하', '우리은하와 수많은 외부 은하'),
    item('big-bang', '🫧', '빅뱅은 어떻게 생겼을까?', '공간의 팽창과 초기 우주', 'planned'),
    item('cosmic-scale', '📏', '우주는 얼마나 큰걸까?', '광년, 관측 가능한 우주', 'planned'),
    item('galaxy-types', '🌀', '은하들에는 어떤 종류가 있을까?', '은하 분류법, 특성', 'planned'),
    item('large-scale-structure', '🕸️', '우주의 전체적인 구조는 어떻게 되어 있을까?', '우주 거대구조, 은하단', 'planned'),
  ]),
  cat('telescopes-tech', '망원경과 관측기술', '🔭', 'hub-telescope', '인류의 눈을 더 멀리 보내는 도구들', [
    item('telescope-history', '🔭', '망원경은 인류에게 어떤 영향을 미쳤을까?', '갈릴레이에서 우주망원경까지'),
    item('optical-telescope', '🔎', '별을 보기에 가장 좋은 망원경은?', '광학 망원경의 원리와 종류와 특성 비교', 'planned'),
    item('spectrum', '🌈', '빛을 분해해서 보는 방법', '스펙트럼과 원소의 흔적'),
    item('space-telescope', '🛰️', '망원경을 왜 우주로 올려 보낼까?', '대기, 적외선, 허블과 제임스웹', 'planned'),
    item('radio-astronomy', '📡', '전파로 보는 우주', '전파망원경의 원리와 활용', 'planned'),
  ]),
  cat('space-exploration', '우주탐사와 우주개발', '🚀', 'hub-exploration', '로켓, 탐사선, 우주정거장과 인간의 도전', [
    item('rocket', '🚀', '로켓은 어떻게 지구를 벗어날까', '추력, 질량, 궤도 진입'),
    item('exoplanet-search', '🪐', '다른 별 주변의 행성을 어떻게 찾을까?', '통과법과 흔들림'),
    item('solar-explore', '🛰️', '탐사선은 어떻게 길을 잃지 않을까?', '보이저와 심우주 통신'),
    item('space-history', '🧑‍🚀', '인류의 우주개발은 어떻게 이루어 졌나?', '인류 우주개발의 역사', 'planned'),
    item('moon-base', '🌕', '달기지 정말 가능할까?', '자원, 전력, 생활권', 'planned'),
    item('satellite-uses', '📡', '인공위성은 왜 필요할까?', '인공위성의 활용, 종류', 'planned'),
    item('satellite-orbits', '🛰️', '인공위성은 어떻게 쏘아올릴까?', '인공위성 궤도의 종류, 발전, 캐슬러 신드롬', 'planned'),
    item('space-telescope-history', '🔭', '우주망원경 개발의 역사, 어떻게 가능했을까?', '우주망원경 개발의 역사', 'planned'),
    item('space-station', '🏗️', '우주정거장은 어떻게 실험실이 되는가?', '미세중력과 장기 체류, 우주정거장의 필요성', 'planned'),
    item('space-industry', '🏭', '우주 산업은 왜 중요한가?', '우주기업의 민영화와 세계의 여러 기업들, 미래', 'planned'),
  ]),
  cat('history-people', '천문학의 역사와 사람들', '🧑‍🚀', 'hub-history', '별을 보며 세계관을 바꾼 사람들의 이야기', [
    item('famous-astronomers', '🧑‍🔬', '세상을 바꾼 천문학자들의 기발한 질문들', '코페르니쿠스, 갈릴레이, 허블'),
    item('const-east', '📜', '동아시아의 별자리는 하늘을 어떻게 나누었을까?', '28수와 전통 천문'),
    item('calendar-history', '🗓️', '달력의 시작, 천문학', '계절과 농사, 시간의 규칙', 'planned'),
    item('women-astronomy', '🌟', '천문학 뒤편의 여성 과학자들은 누구였을까?', '계산, 분류, 발견의 역사', 'planned'),
  ]),
  cat('basic-physics', '천문학 기초 물리', '⚛️', 'hub-physics', '우주를 이해하는 데 필요한 작고 단단한 개념들', [
    item('distance', '📐', '우주의 거리는 어떻게 잴까?', '시차, 표준촛불, 거리 사다리'),
    item('star-distance', '📍', '별의 거리는 어떻게 잴까?', '연주시차와 거리 측정', 'planned'),
    item('brightness', '💡', '별의 밝기는 어떻게 측정하는가?', '겉보기 등급과 절대등급'),
    item('dynamics', '🌀', '중력은 어떻게 궤도를 만들까?', '케플러와 뉴턴의 관점'),
    item('theory', '🧠', '상대성이론은 천문학을 어떻게 바꾸었을까?', '시간, 공간, 질량과 에너지'),
    item('au', '📏', '천문단위는 왜 필요할까?', 'AU, 광년, 파섹'),
    item('dark-sector', '🕯️', '우리가 모르는 95%의 미지의 정체는?', '암흑물질과 암흑 에너지', 'planned'),
    item('lambda-cdm', '🧩', '현대 우주론은 우주를 어떻게 설명하는가?', '람다 cdm 모델', 'planned'),
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
