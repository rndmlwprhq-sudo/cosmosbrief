export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { text, apiKey } = req.body || {};
  const key = process.env.OPENAI_API_KEY || apiKey;

  if (!key) {
    res.status(400).json({ error: 'API 키가 없습니다. 설정(⚙️)에서 OpenAI API 키를 입력해주세요.' });
    return;
  }
  if (!text || text.trim().length < 80) {
    res.status(400).json({ error: '원문 텍스트가 너무 짧습니다. 기사 본문 전체를 붙여넣어주세요.' });
    return;
  }

  const trimmed = text.trim().slice(0, 5000);

  const prompt = `당신은 COSMOS BRIEF의 편집장입니다. 아래 우주·천문학 뉴스 원문을 읽고, 한국 독자를 위한 초안을 다음 JSON 형식으로만 작성하세요 (JSON 이외의 텍스트는 절대 출력하지 마세요).

--- 원문 ---
${trimmed}
--- 원문 끝 ---

응답 형식 (JSON only):
{
  "title": "독자의 호기심을 강하게 자극하는 재치있는 한국어 제목 (25자 이내, 이모지 1개 포함 가능)",
  "summary": [
    "핵심 팩트 1 — 명사형 종결 한 문장",
    "핵심 팩트 2 — 명사형 종결 한 문장",
    "핵심 팩트 3 — 명사형 종결 한 문장"
  ],
  "insight": "이 기술·발견이 인류에게 주는 가치와 의미에 대한 단상. 인간의 시야를 넓히는 방향으로, 2~3문장.",
  "body": "전문 용어를 이해하기 쉽게 풀어쓴 본문. 3~4단락, 각 단락은 \\n\\n으로 구분. 고등학생도 읽을 수 있는 수준으로."
}`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1800,
        temperature: 0.75,
        response_format: { type: 'json_object' },
      }),
      signal: AbortSignal.timeout(45000),
    });

    if (!response.ok) {
      let errMsg = 'OpenAI API 오류';
      try { const e = await response.json(); errMsg = e.error?.message || errMsg; } catch {}
      res.status(response.status).json({ error: errMsg });
      return;
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '{}';
    const parsed = JSON.parse(content);
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json(parsed);
  } catch (e) {
    res.status(500).json({ error: e.message || '서버 오류' });
  }
}
