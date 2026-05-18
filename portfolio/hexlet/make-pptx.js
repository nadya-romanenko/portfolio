const PptxGenJS = require('pptxgenjs');

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE'; // 13.33" x 7.5"

// ─── BRAND PALETTE ──────────────────────────────────────────────────────────
const C = {
  bg:       '1C1C2E',
  orange:   'FF6B35',
  violet:   'A78BFA',
  white:    'FFFFFF',
  secondary:'B0B0C3',
  card:     '2D2D44',
  green:    '4ADE80',
  red:      'F87171',
  darkCard: '252538',
};

const W = 13.33;
const H = 7.5;

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function slideBg(slide) {
  slide.background = { color: C.bg };
}

function addTitle(slide, text, y = 0.35, size = 36, color = C.white) {
  slide.addText(text, {
    x: 0.5, y, w: W - 1, h: 0.6,
    fontSize: size, fontFace: 'Arial Black',
    color, bold: true, align: 'left',
  });
}

function addAccentLine(slide, y = 0.92) {
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y, w: 1.2, h: 0.06,
    fill: { color: C.orange }, line: { color: C.orange },
  });
}

function card(slide, x, y, w, h, fillColor = C.card) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h,
    rectRadius: 0.12,
    fill: { color: fillColor },
    line: { color: fillColor },
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 1 — TITLE
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slideBg(slide);

  // Large decorative orange circle (right side) — clips right, stays within top/bottom
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 10.2, y: 0.0, w: 4.8, h: 4.8,
    fill: { color: C.orange, transparency: 82 },
    line: { color: C.orange, transparency: 70, width: 2 },
  });

  // Smaller violet circle
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 10.8, y: 4.0, w: 2.5, h: 2.5,
    fill: { color: C.violet, transparency: 75 },
    line: { color: C.violet, transparency: 60, width: 1 },
  });

  // Orange accent bar left
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 1.8, w: 0.12, h: 2.8,
    fill: { color: C.orange }, line: { color: C.orange },
  });

  // Main title
  slide.addText('IT-образование в России:', {
    x: 0.85, y: 1.85, w: 8.2, h: 0.85,
    fontSize: 42, fontFace: 'Arial Black',
    color: C.white, bold: true, align: 'left',
  });
  slide.addText('анализ рынка и позиции Хекслет', {
    x: 0.85, y: 2.65, w: 8.5, h: 0.85,
    fontSize: 38, fontFace: 'Arial Black',
    color: C.orange, bold: true, align: 'left',
  });

  // Subtitle tags
  slide.addText('TAM / SAM / SOM  ·  Конкуренты  ·  SERM  ·  SWOT  ·  Инсайты', {
    x: 0.85, y: 3.65, w: 9.0, h: 0.45,
    fontSize: 16, fontFace: 'Calibri',
    color: C.secondary, italic: true, align: 'left',
  });

  // Bottom date
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: H - 1.05, w: W - 1, h: 0.002,
    fill: { color: C.card }, line: { color: C.card },
  });
  slide.addText('Май 2026', {
    x: 0.5, y: H - 0.95, w: 4, h: 0.42,
    fontSize: 15, fontFace: 'Calibri',
    color: C.secondary, align: 'left',
  });
  slide.addText('hexlet.io', {
    x: W - 3, y: H - 0.95, w: 2.5, h: 0.42,
    fontSize: 15, fontFace: 'Calibri',
    color: C.violet, align: 'right',
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 2 — TAM / SAM / SOM
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slideBg(slide);
  addTitle(slide, 'Анализ рынка: TAM / SAM / SOM');
  addAccentLine(slide);

  const cards = [
    {
      label: 'TAM',
      title: '34–35 млрд руб.',
      sub: 'Весь онлайн IT-EdTech СНГ',
      desc: 'Россия ~30 млрд + Казахстан ~2 млрд + прочий СНГ ~2–3 млрд. Рост +20% г/г.',
      accent: C.violet,
    },
    {
      label: 'SAM',
      title: '22–24 млрд руб.',
      sub: 'B2C профпереподготовка взрослых в IT',
      desc: 'Исключая B2B-корпоративный сегмент (~20%) и детское образование (~34%).',
      accent: C.orange,
    },
    {
      label: 'SOM',
      title: '1,0–1,5 млрд сейчас',
      sub: 'Потенциал: 3–5 млрд руб.',
      desc: '17 000 студентов/мес × ~3 000 руб. Рост: B2B + IT-колледж + СНГ.',
      accent: C.green,
    },
  ];

  const cw = 3.8;
  const gap = 0.3;
  const startX = (W - (cw * 3 + gap * 2)) / 2;
  const cy = 1.15;
  const ch = 4.4;

  cards.forEach((c2, i) => {
    const x = startX + i * (cw + gap);

    // Card background
    card(slide, x, cy, cw, ch, C.card);

    // Top accent strip
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y: cy, w: cw, h: 0.08,
      rectRadius: 0.06,
      fill: { color: c2.accent }, line: { color: c2.accent },
    });

    // Label badge
    slide.addText(c2.label, {
      x: x + 0.25, y: cy + 0.22, w: cw - 0.5, h: 0.44,
      fontSize: 22, fontFace: 'Arial Black',
      color: c2.accent, bold: true, align: 'left',
    });

    // Amount
    slide.addText(c2.title, {
      x: x + 0.2, y: cy + 0.72, w: cw - 0.4, h: 0.62,
      fontSize: 20, fontFace: 'Arial Black',
      color: C.white, bold: true, align: 'left',
    });

    // Sub
    slide.addText(c2.sub, {
      x: x + 0.2, y: cy + 1.42, w: cw - 0.4, h: 0.52,
      fontSize: 14, fontFace: 'Calibri',
      color: c2.accent, italic: true, align: 'left',
    });

    // Divider
    slide.addShape(pptx.ShapeType.rect, {
      x: x + 0.2, y: cy + 2.05, w: cw - 0.4, h: 0.03,
      fill: { color: C.darkCard }, line: { color: C.darkCard },
    });

    // Desc
    slide.addText(c2.desc, {
      x: x + 0.2, y: cy + 2.18, w: cw - 0.4, h: 2.0,
      fontSize: 13, fontFace: 'Calibri',
      color: C.secondary, align: 'left', wrap: true,
    });
  });

  // Bottom note
  slide.addText('📈  Рынок вырос в 10 раз за 5 лет. CAGR IT-сегмента — ~12,8% в год.', {
    x: 0.5, y: H - 0.75, w: W - 1, h: 0.45,
    fontSize: 14, fontFace: 'Calibri',
    color: C.secondary, italic: true, align: 'center',
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 3 — COMPETITORS OVERVIEW
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slideBg(slide);
  addTitle(slide, 'Конкурентный ландшафт: 9 игроков');
  addAccentLine(slide);

  const comps = [
    { name: 'Яндекс Практикум', pos: 'Интенсивный bootcamp, бренд Яндекса', price: '147–225 тыс. руб.', hex: false },
    { name: 'Skillbox',          pos: '700+ программ, масс-маркет IT+digital',  price: '120–250 тыс. руб.', hex: false },
    { name: 'Нетология',         pos: 'Digital-университет, дипломы ДПО',       price: '90–240 тыс. руб.', hex: false },
    { name: 'GeekBrains',        pos: 'IT-университет, 100+ курсов по коду',    price: '120–220 тыс. руб.', hex: false },
    { name: 'SkillFactory',      pos: 'Data Science & ML, глубокий контент',    price: '90–180 тыс. руб.', hex: false },
    { name: 'Skypro',            pos: '100% гарантия трудоустройства',           price: '~163 тыс. руб.',   hex: false },
    { name: 'OTUS',              pos: 'Курсы для middle/senior разработчиков',  price: '80–160 тыс. руб.', hex: false },
    { name: 'Bang Bang Ed.',     pos: 'Design + creativetech',                  price: '80–200 тыс. руб.', hex: false },
    { name: '★ Хекслет',         pos: 'Инженерный подход, подписка, колледж',   price: '2 400–3 900 руб/мес', hex: true },
  ];

  const cols = 3;
  const rows = 3;
  const cw = 3.9;
  const ch = 1.62;
  const gx = 0.22;
  const gy = 0.22;
  const startX = 0.4;
  const startY = 1.1;

  comps.forEach((c2, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = startX + col * (cw + gx);
    const y = startY + row * (ch + gy);

    const bg    = c2.hex ? C.orange : C.card;
    const tc    = c2.hex ? C.bg    : C.white;
    const sc    = c2.hex ? C.bg    : C.secondary;
    const pc    = c2.hex ? C.bg    : C.orange;

    card(slide, x, y, cw, ch, bg);

    slide.addText(c2.name, {
      x: x + 0.18, y: y + 0.12, w: cw - 0.35, h: 0.38,
      fontSize: 14, fontFace: 'Arial Black',
      color: tc, bold: true, align: 'left',
    });
    slide.addText(c2.pos, {
      x: x + 0.18, y: y + 0.5, w: cw - 0.35, h: 0.52,
      fontSize: 11.5, fontFace: 'Calibri',
      color: sc, align: 'left', wrap: true,
    });
    slide.addText(c2.price, {
      x: x + 0.18, y: y + 1.08, w: cw - 0.35, h: 0.38,
      fontSize: 12, fontFace: 'Calibri',
      color: pc, bold: true, align: 'left',
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 4 — TOP-3 COMPETITORS DETAIL
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slideBg(slide);
  addTitle(slide, 'Топ-3 конкурента: детальный разбор');
  addAccentLine(slide);

  const cols = [
    {
      name: 'Яндекс Практикум',
      color: C.orange,
      utp: 'Бренд Яндекса + трудоустройство внутри экосистемы',
      price: '147–225 тыс. руб.',
      ca: '20–35 лет, новички, смена профессии',
      pro: '✅ Высокий NPS (64), узнаваемость, реальные проекты',
      con: '❌ Медленная проверка (до недели), баги тренажёров, жёсткие группы',
    },
    {
      name: 'Skillbox',
      color: C.violet,
      utp: '700+ программ — IT, дизайн, маркетинг, полный охват',
      price: '120–250 тыс. руб.',
      ca: '18–45 лет, широкая, не только IT',
      pro: '✅ Узнаваемость 73%, NPS=64, партнёрства',
      con: '❌ Кредиты под видом рассрочки, ЦК — профанация, устаревший контент',
    },
    {
      name: 'SkillFactory',
      color: C.green,
      utp: 'Самые глубокие программы Data Science и ML на рынке РФ',
      price: '90–180 тыс. руб.',
      ca: '25–40 лет, аналитики, офисные сотрудники → IT',
      pro: '✅ NPS=61, код-ревью, реальные датасеты',
      con: '❌ Слабый бренд вне Data-ниши, ограниченный охват',
    },
  ];

  const cw = (W - 1.2) / 3 - 0.15;
  const startX = 0.5;
  const gap = 0.22;
  const cy = 1.1;
  const ch = H - cy - 0.55;

  cols.forEach((col, i) => {
    const x = startX + i * (cw + gap);

    // Card
    card(slide, x, cy, cw, ch, C.card);

    // Header strip
    slide.addShape(pptx.ShapeType.rect, {
      x, y: cy, w: cw, h: 0.55,
      fill: { color: col.color }, line: { color: col.color },
    });

    slide.addText(col.name, {
      x: x + 0.15, y: cy + 0.07, w: cw - 0.3, h: 0.42,
      fontSize: 15, fontFace: 'Arial Black',
      color: C.bg, bold: true, align: 'center',
    });

    const rows = [
      { label: 'УТП',    val: col.utp },
      { label: 'Цена',   val: col.price },
      { label: 'ЦА',     val: col.ca },
      { label: 'Сила',   val: col.pro },
      { label: 'Слабость', val: col.con },
    ];

    let ry = cy + 0.68;
    rows.forEach(r => {
      slide.addText(r.label, {
        x: x + 0.15, y: ry, w: cw - 0.3, h: 0.28,
        fontSize: 11, fontFace: 'Arial Black',
        color: col.color, bold: true, align: 'left',
      });
      ry += 0.28;
      slide.addText(r.val, {
        x: x + 0.15, y: ry, w: cw - 0.3, h: 0.72,
        fontSize: 12, fontFace: 'Calibri',
        color: C.secondary, align: 'left', wrap: true,
      });
      ry += 0.75;
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 5 — SERM: HEXLET
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slideBg(slide);
  addTitle(slide, 'SERM: репутация Хекслет');
  addAccentLine(slide);

  const colW = (W - 1.3) / 2 - 0.1;
  const cy = 1.1;
  const ch = 4.35;

  // Left — Pros
  card(slide, 0.5, cy, colW, ch, C.card);
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: cy, w: colW, h: 0.52,
    fill: { color: C.green }, line: { color: C.green },
  });
  slide.addText('✅  Что хвалят', {
    x: 0.65, y: cy + 0.07, w: colW - 0.3, h: 0.4,
    fontSize: 17, fontFace: 'Arial Black',
    color: C.bg, bold: true, align: 'left',
  });

  const pros = [
    { h: 'Инженерный подход', d: '«Учат думать, а не копировать код» — формируют фундаментальные навыки, а не навык конкретного фреймворка.' },
    { h: 'Практика в реальной среде', d: 'Редактор, БД, серверы прямо в браузере с первого дня. Не игрушечный тренажёр — настоящий стек.' },
    { h: 'Гибкость и нет дедлайнов', d: 'Учись в своём темпе. Можно совмещать с работой. Подписку можно ставить на паузу.' },
  ];

  let py = cy + 0.68;
  pros.forEach(p => {
    slide.addText(p.h, {
      x: 0.65, y: py, w: colW - 0.3, h: 0.3,
      fontSize: 13, fontFace: 'Arial Black',
      color: C.green, bold: true, align: 'left',
    });
    slide.addText(p.d, {
      x: 0.65, y: py + 0.3, w: colW - 0.3, h: 0.82,
      fontSize: 12, fontFace: 'Calibri',
      color: C.secondary, align: 'left', wrap: true,
    });
    py += 1.2;
  });

  // Right — Cons
  const rx = 0.5 + colW + 0.2;
  card(slide, rx, cy, colW, ch, C.card);
  slide.addShape(pptx.ShapeType.rect, {
    x: rx, y: cy, w: colW, h: 0.52,
    fill: { color: C.orange }, line: { color: C.orange },
  });
  slide.addText('❌  На что жалуются', {
    x: rx + 0.15, y: cy + 0.07, w: colW - 0.3, h: 0.4,
    fontSize: 17, fontFace: 'Arial Black',
    color: C.bg, bold: true, align: 'left',
  });

  const cons = [
    { h: 'Замена менторов на тьюторов', d: '«Убрали опытных наставников, добавили студентов старших модулей за бесплатно. Поддержка деградировала».' },
    { h: 'Сложно для абсолютных новичков', d: '«Подача сухая, подходит людям с базой». Темп высокий, много самостоятельного погружения.' },
    { h: 'Мало видео, слабое сообщество', d: '«Всё текстом — устаёшь». Telegram-чаты фактически замерли, обмен опытом минимален.' },
  ];

  let cy2 = cy + 0.68;
  cons.forEach(c2 => {
    slide.addText(c2.h, {
      x: rx + 0.15, y: cy2, w: colW - 0.3, h: 0.3,
      fontSize: 13, fontFace: 'Arial Black',
      color: C.orange, bold: true, align: 'left',
    });
    slide.addText(c2.d, {
      x: rx + 0.15, y: cy2 + 0.3, w: colW - 0.3, h: 0.82,
      fontSize: 12, fontFace: 'Calibri',
      color: C.secondary, align: 'left', wrap: true,
    });
    cy2 += 1.2;
  });

  // Pain block at bottom
  card(slide, 0.5, cy + ch + 0.15, W - 1, 0.78, C.darkCard);
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: cy + ch + 0.15, w: 0.08, h: 0.78,
    fill: { color: C.violet }, line: { color: C.violet },
  });
  slide.addText('⚠️  Незакрытая боль:', {
    x: 0.75, y: cy + ch + 0.27, w: 2.6, h: 0.38,
    fontSize: 13, fontFace: 'Arial Black',
    color: C.violet, bold: true, align: 'left',
  });
  slide.addText('Нет карьерного трека после обучения — студенты не знают, что делать с портфолио и как попасть на реальное интервью.', {
    x: 3.3, y: cy + ch + 0.27, w: W - 4.0, h: 0.38,
    fontSize: 13, fontFace: 'Calibri',
    color: C.secondary, align: 'left',
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 6 — SERM: COMPETITORS
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slideBg(slide);
  addTitle(slide, 'SERM: репутация конкурентов');
  addAccentLine(slide);

  const items = [
    {
      name: 'Яндекс Практикум',
      rating: '★★★★☆  ~4.1 / 5',
      pro: '✅ Структурированная программа, чёткие этапы, реальные проекты',
      con: '❌ Медленная проверка (до 10 дней), баги тренажёров',
      pain: 'Нет реального трудоустройства вне экосистемы Яндекса',
      color: C.orange,
    },
    {
      name: 'Skillbox',
      rating: '★★★☆☆  ~3.6 / 5 (полярные)',
      pro: '✅ Широкий каталог, сильные преподаватели-практики',
      con: '❌ Кредит под видом рассрочки, ЦК-профанация',
      pain: 'Никто не учит реально искать работу: мок-интервью, CV, переговоры',
      color: C.violet,
    },
    {
      name: 'Нетология',
      rating: '★★★★☆  ~4.0 / 5',
      pro: '✅ Госдипломы ДПО, разнообразие digital-профессий',
      con: '❌ «Вода» в теории, слабый клиентский сервис',
      pain: 'Нет поддержки между модулями — студенты «зависают» и бросают',
      color: C.green,
    },
    {
      name: 'SkillFactory',
      rating: '★★★★☆  NPS = 61',
      pro: '✅ Глубокий Data-контент, код-ревью, реальные датасеты',
      con: '❌ Слабый бренд вне Data, малая аудитория',
      pain: 'Нет понятного пути для не-Data специальностей',
      color: C.secondary,
    },
  ];

  const cw = (W - 1.3) / 2 - 0.1;
  const ch = 2.65;
  const positions = [
    { x: 0.5,             y: 1.1 },
    { x: 0.5 + cw + 0.2, y: 1.1 },
    { x: 0.5,             y: 1.1 + ch + 0.2 },
    { x: 0.5 + cw + 0.2, y: 1.1 + ch + 0.2 },
  ];

  items.forEach((item, i) => {
    const { x, y } = positions[i];
    card(slide, x, y, cw, ch, C.card);

    // Top strip
    slide.addShape(pptx.ShapeType.rect, {
      x, y, w: cw, h: 0.45,
      fill: { color: item.color }, line: { color: item.color },
    });
    slide.addText(item.name, {
      x: x + 0.15, y: y + 0.05, w: cw * 0.6, h: 0.36,
      fontSize: 13, fontFace: 'Arial Black',
      color: C.bg, bold: true, align: 'left',
    });
    slide.addText(item.rating, {
      x: x + cw * 0.58, y: y + 0.08, w: cw * 0.42 - 0.15, h: 0.3,
      fontSize: 11, fontFace: 'Calibri',
      color: C.bg, align: 'right',
    });

    slide.addText(item.pro, {
      x: x + 0.15, y: y + 0.52, w: cw - 0.3, h: 0.55,
      fontSize: 12, fontFace: 'Calibri',
      color: C.green, align: 'left', wrap: true,
    });
    slide.addText(item.con, {
      x: x + 0.15, y: y + 1.1, w: cw - 0.3, h: 0.55,
      fontSize: 12, fontFace: 'Calibri',
      color: C.red, align: 'left', wrap: true,
    });

    // Pain
    slide.addShape(pptx.ShapeType.rect, {
      x: x + 0.15, y: y + 1.68, w: cw - 0.3, h: 0.02,
      fill: { color: C.darkCard }, line: { color: C.darkCard },
    });
    slide.addText('⚠️ ' + item.pain, {
      x: x + 0.15, y: y + 1.75, w: cw - 0.3, h: 0.72,
      fontSize: 11.5, fontFace: 'Calibri',
      color: C.secondary, italic: true, align: 'left', wrap: true,
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 7 — SWOT
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slideBg(slide);
  addTitle(slide, 'SWOT-анализ: Хекслет');
  addAccentLine(slide);

  const qw = (W - 1.3) / 2 - 0.1;
  const qh = (H - 1.8) / 2 - 0.1;
  const startX = 0.5;
  const startY = 1.1;

  const quads = [
    {
      emoji: '💪', label: 'Strengths', color: C.violet,
      x: startX, y: startY,
      items: [
        'Уникальный инженерный подход — нет аналогов на рынке РФ/СНГ',
        'Практика в реальной среде с первого урока',
        'Подписка 3 900 руб./мес. — минимальный барьер входа vs. 150+ тыс. конкурентов',
      ],
    },
    {
      emoji: '😟', label: 'Weaknesses', color: C.secondary,
      x: startX + qw + 0.2, y: startY,
      items: [
        'Замена менторов-практиков на тьюторов-студентов',
        'Низкая узнаваемость (vs. Skillbox 73%, Яндекс 65%)',
        'Нет карьерного трека: от сертификата до оффера',
      ],
    },
    {
      emoji: '🚀', label: 'Opportunities', color: C.orange,
      x: startX, y: startY + qh + 0.18,
      items: [
        'B2B: корпоративный онбординг джунов — ниша пуста',
        'IT-колледж hexly.ru: сегмент 15–18 лет без конкурентов',
        'СНГ-экспансия: Казахстан +20% г/г, локальных лидеров нет',
      ],
    },
    {
      emoji: '⚠️', label: 'Threats', color: C.red,
      x: startX + qw + 0.2, y: startY + qh + 0.18,
      items: [
        'VK-холдинг: Skillbox + GeekBrains + Нетология + огромные бюджеты',
        'Яндекс Практикум с экосистемой трудоустройства внутри Яндекса',
        'Насыщение рынка: «первая волна» уже обучилась',
      ],
    },
  ];

  quads.forEach(q => {
    card(slide, q.x, q.y, qw, qh, C.card);
    slide.addShape(pptx.ShapeType.rect, {
      x: q.x, y: q.y, w: qw, h: 0.5,
      fill: { color: q.color }, line: { color: q.color },
    });
    slide.addText(`${q.emoji}  ${q.label}`, {
      x: q.x + 0.15, y: q.y + 0.07, w: qw - 0.3, h: 0.38,
      fontSize: 15, fontFace: 'Arial Black',
      color: C.bg, bold: true, align: 'left',
    });
    let iy = q.y + 0.6;
    q.items.forEach(item => {
      slide.addText('→  ' + item, {
        x: q.x + 0.18, y: iy, w: qw - 0.35, h: 0.52,
        fontSize: 12.5, fontFace: 'Calibri',
        color: C.secondary, align: 'left', wrap: true,
      });
      iy += 0.62;
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 8 — TOP-3 MARKET PAINS
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slideBg(slide);
  addTitle(slide, 'Топ-3 незакрытые боли рынка IT-образования');
  addAccentLine(slide);

  const pains = [
    {
      num: '01',
      title: '«Выучился — и что дальше?»',
      desc: 'Нет реального пути от сертификата до оффера. Мок-интервью, переговоры о зарплате, работа с CV под вакансию — этого не даёт никто. «Центр карьеры» — маркетинговый ярлык, а не функция.',
    },
    {
      num: '02',
      title: '«Поддержка кончается после оплаты»',
      desc: 'До продажи — идеальный сервис. После — менторы недоступны, кураторы шаблонят, ревью затягивается. Обучение превращается в одиночный путь без живой обратной связи.',
    },
    {
      num: '03',
      title: '«Я не знаю, готов ли я к найму»',
      desc: 'Нет объективного внешнего бенчмарка. Оценки внутри платформы не коррелируют с рыночными ожиданиями. Студент не понимает, достаточно ли его знаний, пока не получит первый отказ.',
    },
  ];

  const ch = 1.98;
  const startY = 1.15;

  pains.forEach((p, i) => {
    const y = startY + i * (ch + 0.2);

    card(slide, 0.5, y, W - 1, ch, C.card);

    // Big number
    slide.addText(p.num, {
      x: 0.6, y: y + 0.22, w: 1.3, h: 1.5,
      fontSize: 58, fontFace: 'Arial Black',
      color: C.orange, bold: true, align: 'center',
    });

    // Vertical divider
    slide.addShape(pptx.ShapeType.rect, {
      x: 2.1, y: y + 0.25, w: 0.04, h: ch - 0.5,
      fill: { color: C.orange }, line: { color: C.orange },
    });

    // Title
    slide.addText(p.title, {
      x: 2.28, y: y + 0.2, w: W - 3.0, h: 0.45,
      fontSize: 18, fontFace: 'Arial Black',
      color: C.white, bold: true, align: 'left',
    });

    // Desc
    slide.addText(p.desc, {
      x: 2.28, y: y + 0.66, w: W - 3.1, h: 1.2,
      fontSize: 13, fontFace: 'Calibri',
      color: C.secondary, align: 'left', wrap: true,
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 9 — GROWTH WINDOWS
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slideBg(slide);
  addTitle(slide, 'Окна роста для Хекслет');
  addAccentLine(slide);

  const windows = [
    {
      icon: '🏢',
      title: 'B2B: корпоративный онбординг',
      tag: 'Ниша почти пуста',
      tagColor: C.orange,
      points: [
        'Инженерный подход Хекслет — идеальный онбординг для джунов',
        'Компании платят за каждого сотрудника, не конкурируют с B2C',
        '30+ партнёров уже есть — база для пилота B2B',
      ],
    },
    {
      icon: '🎓',
      title: 'IT-колледж hexly.ru',
      tag: 'Конкуренции нет',
      tagColor: C.green,
      points: [
        'Сегмент 15–18 лет: Яндекс и Skillbox туда не идут',
        'СПО-диплом + 80% трудоустройство за год — сильное УТП',
        'Государство субсидирует СПО — снижает стоимость привлечения',
      ],
    },
    {
      icon: '🔄',
      title: '«Второй шанс»',
      tag: 'Новая волна аудитории',
      tagColor: C.violet,
      points: [
        'Первая волна 2020–2023 уже обучилась у конкурентов',
        'Новая аудитория — разочарованные, ищут «настоящее» обучение',
        'Позиционирование: «курсы, после которых действительно берут»',
      ],
    },
  ];

  const cw = (W - 1.4) / 3 - 0.13;
  const ch = H - 1.8;
  const startX = 0.5;
  const cy = 1.12;

  windows.forEach((w2, i) => {
    const x = startX + i * (cw + 0.2);
    card(slide, x, cy, cw, ch, C.card);

    // Icon
    slide.addText(w2.icon, {
      x: x + 0.2, y: cy + 0.2, w: 0.7, h: 0.6,
      fontSize: 32, align: 'center',
    });

    // Tag badge
    slide.addShape(pptx.ShapeType.roundRect, {
      x: x + 0.2, y: cy + 0.88, w: cw - 0.4, h: 0.32,
      rectRadius: 0.08,
      fill: { color: w2.tagColor, transparency: 80 },
      line: { color: w2.tagColor, transparency: 50 },
    });
    slide.addText(w2.tag, {
      x: x + 0.2, y: cy + 0.88, w: cw - 0.4, h: 0.32,
      fontSize: 11, fontFace: 'Calibri',
      color: w2.tagColor, bold: true, align: 'center',
    });

    // Title
    slide.addText(w2.title, {
      x: x + 0.2, y: cy + 1.28, w: cw - 0.4, h: 0.62,
      fontSize: 15, fontFace: 'Arial Black',
      color: C.white, bold: true, align: 'left', wrap: true,
    });

    // Points
    let py = cy + 1.98;
    w2.points.forEach(pt => {
      slide.addText('→  ' + pt, {
        x: x + 0.2, y: py, w: cw - 0.4, h: 0.62,
        fontSize: 12, fontFace: 'Calibri',
        color: C.secondary, align: 'left', wrap: true,
      });
      py += 0.72;
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 10 — UNDERVALUED SEGMENTS
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slideBg(slide);
  addTitle(slide, 'Недооценённые сегменты аудитории');
  addAccentLine(slide);

  const segs = [
    {
      seg: 'Действующие разработчики',
      desc: 'Junior/middle, хотят систематизировать знания, нет пробелов',
      why: 'Все платформы заточены под новичков. OTUS — единственный конкурент',
      leader: true,
    },
    {
      seg: '15–18 лет (после 9 кл.)',
      desc: 'Хотят войти в IT без классического университета',
      why: 'IT-колледж слабо продвигается, прямых конкурентов почти нет',
      leader: true,
    },
    {
      seg: 'СНГ вне России',
      desc: 'Казахстан (+20% г/г), Узбекистан (+94% г/г), Беларусь',
      why: 'Локальных сильных игроков нет, российские слабо адаптированы',
      leader: true,
    },
    {
      seg: 'Переобучение внутри IT',
      desc: 'QA → разработчик, frontend → fullstack, смена стека',
      why: 'Никто не делает продукт «для тех, кто уже в IT, но меняет путь»',
      leader: false,
    },
    {
      seg: 'Женщины 30–45 в декрете',
      desc: 'Высокая мотивация, нужен гибкий асинхронный формат',
      why: 'IT-маркетинг нацелен на молодых мужчин, сегмент игнорируется',
      leader: false,
    },
  ];

  // Header row
  const hY = 1.08;
  const cols = [
    { label: 'Сегмент',             x: 0.5,   w: 2.8 },
    { label: 'Описание',            x: 3.45,  w: 3.5 },
    { label: 'Почему недооценён',   x: 7.1,   w: 4.0 },
    { label: 'Хекслет?',            x: 11.25, w: 1.6 },
  ];

  // Header bg
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: hY, w: W - 1, h: 0.45,
    fill: { color: C.orange }, line: { color: C.orange },
  });
  cols.forEach(c2 => {
    slide.addText(c2.label, {
      x: c2.x + 0.1, y: hY + 0.06, w: c2.w - 0.2, h: 0.35,
      fontSize: 13, fontFace: 'Arial Black',
      color: C.bg, bold: true, align: 'left',
    });
  });

  // Rows
  const rh = 0.98;
  segs.forEach((s, i) => {
    const y = hY + 0.45 + i * rh;
    const bg = i % 2 === 0 ? C.card : C.darkCard;
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5, y, w: W - 1, h: rh,
      fill: { color: bg }, line: { color: bg },
    });

    slide.addText(s.seg, {
      x: 0.6, y: y + 0.08, w: 2.7, h: 0.8,
      fontSize: 12.5, fontFace: 'Arial Black',
      color: s.leader ? C.orange : C.white, bold: true,
      align: 'left', wrap: true,
    });
    slide.addText(s.desc, {
      x: 3.55, y: y + 0.1, w: 3.3, h: 0.8,
      fontSize: 12, fontFace: 'Calibri',
      color: C.secondary, align: 'left', wrap: true,
    });
    slide.addText(s.why, {
      x: 7.2, y: y + 0.1, w: 3.8, h: 0.8,
      fontSize: 12, fontFace: 'Calibri',
      color: C.secondary, align: 'left', wrap: true,
    });
    slide.addText(s.leader ? '⭐ Лидер' : '—', {
      x: 11.35, y: y + 0.28, w: 1.4, h: 0.4,
      fontSize: 13, fontFace: 'Calibri',
      color: s.leader ? C.green : C.secondary,
      bold: s.leader, align: 'center',
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 11 — CONCLUSIONS
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slideBg(slide);
  addTitle(slide, 'Выводы и рекомендации');
  addAccentLine(slide);

  const insights = [
    {
      num: '1',
      color: C.violet,
      title: 'Рынок насыщен новичками — выигрывает тот, кто идёт вглубь',
      desc: 'Первая волна прошла. Новая аудитория — опытные, разочарованные, B2B. Хекслет уже стоит в нужной нише.',
    },
    {
      num: '2',
      color: C.orange,
      title: 'Главная незакрытая боль: путь от сертификата до оффера',
      desc: 'Кто первым выстроит полный трек «учёба → портфолио → мок-интервью → оффер» — заберёт сегмент с максимальным LTV.',
    },
    {
      num: '3',
      color: C.green,
      title: 'Хекслет стоит в уникальной нише — защитить и масштабировать',
      desc: 'Вернуть менторов-практиков. Запустить B2B-продукт. Масштабировать IT-колледж. Выйти в Казахстан и Узбекистан.',
    },
  ];

  const ch = 1.62;
  let y = 1.1;

  insights.forEach(ins => {
    card(slide, 0.5, y, W - 1, ch, C.card);

    // Color left bar
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5, y, w: 0.1, h: ch,
      fill: { color: ins.color }, line: { color: ins.color },
    });

    // Number
    slide.addText(ins.num, {
      x: 0.72, y: y + 0.28, w: 0.7, h: 1.0,
      fontSize: 42, fontFace: 'Arial Black',
      color: ins.color, bold: true, align: 'center',
    });

    // Title
    slide.addText(ins.title, {
      x: 1.55, y: y + 0.18, w: W - 2.3, h: 0.5,
      fontSize: 17, fontFace: 'Arial Black',
      color: C.white, bold: true, align: 'left',
    });

    // Desc
    slide.addText(ins.desc, {
      x: 1.55, y: y + 0.72, w: W - 2.3, h: 0.72,
      fontSize: 13, fontFace: 'Calibri',
      color: C.secondary, align: 'left', wrap: true,
    });

    y += ch + 0.2;
  });

  // CTA block
  const ctaY = y + 0.05;
  card(slide, 0.5, ctaY, W - 1, H - ctaY - 0.3, C.darkCard);
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: ctaY, w: W - 1, h: 0.04,
    fill: { color: C.orange }, line: { color: C.orange },
  });
  slide.addText('Контактная информация', {
    x: 0.7, y: ctaY + 0.1, w: 5, h: 0.32,
    fontSize: 14, fontFace: 'Arial Black',
    color: C.secondary, align: 'left',
  });
  slide.addText('_____________________________', {
    x: 6.0, y: ctaY + 0.12, w: W - 6.7, h: 0.28,
    fontSize: 13, fontFace: 'Calibri',
    color: C.card, align: 'right',
  });
}

// ─── SAVE ────────────────────────────────────────────────────────────────────
pptx.writeFile({ fileName: 'hexlet-research.pptx' })
  .then(() => console.log('✅ hexlet-research.pptx saved'))
  .catch(e => { console.error(e); process.exit(1); });
