"""
Generates realistic mock screenshots of the EGE Land funnel.
Used when Playwright cannot reach the live site.
"""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

OUT = Path(__file__).parent / "screenshots"
OUT.mkdir(exist_ok=True)

W, H = 1440, 900

# Brand palette
BG       = (26, 26, 26)        # #1A1A1A
PURPLE   = (124, 58, 237)      # #7C3AED
LIME     = (200, 255, 0)       # #C8FF00
WHITE    = (255, 255, 255)
GRAY     = (80, 80, 80)
LGRAY    = (140, 140, 140)
DARKGRAY = (45, 45, 45)
CARD     = (38, 38, 38)
GREEN    = (34, 197, 94)


def font(size=18, bold=False):
    try:
        name = "arialbd.ttf" if bold else "arial.ttf"
        return ImageFont.truetype(name, size)
    except Exception:
        return ImageFont.load_default()


def draw_rounded_rect(draw, xy, fill, radius=12):
    x0, y0, x1, y1 = xy
    draw.rounded_rectangle(xy, radius=radius, fill=fill)


def draw_button(draw, xy, text, bg=PURPLE, fg=WHITE, radius=8, fsize=18):
    draw_rounded_rect(draw, xy, bg, radius)
    x0, y0, x1, y1 = xy
    f = font(fsize, bold=True)
    draw.text(((x0+x1)//2, (y0+y1)//2), text, fill=fg, font=f, anchor="mm")


def nav_bar(draw, active="Родитель"):
    draw_rounded_rect(draw, (0, 0, W, 70), (20, 20, 30))
    draw.text((40, 35), "ЕГЭ Лэнд", fill=LIME, font=font(22, True), anchor="lm")
    tabs = ["Ученик", "Родитель", "О нас", "Блог"]
    x = 300
    for t in tabs:
        color = LIME if t == active else LGRAY
        draw.text((x, 35), t, fill=color, font=font(16, t == active), anchor="lm")
        if t == active:
            draw.line([(x, 60), (x + len(t)*9, 60)], fill=LIME, width=2)
        x += 140


# ─────────────────────────────────────────────
# Screen 1 — Landing (Родитель tab)
# ─────────────────────────────────────────────
def screen_01():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    nav_bar(d, "Родитель")

    # Hero block
    d.text((80, 120), "Подготовьте ребёнка к ЕГЭ и ОГЭ", fill=WHITE, font=font(36, True))
    d.text((80, 175), "Онлайн-курсы с живыми преподавателями и гарантией результата", fill=LGRAY, font=font(18))
    d.text((80, 210), "• Индивидуальная траектория обучения", fill=LGRAY, font=font(16))
    d.text((80, 238), "• Ежедневная проверка домашних заданий", fill=LGRAY, font=font(16))
    d.text((80, 266), "• Психологическая поддержка", fill=LGRAY, font=font(16))

    # Form card
    draw_rounded_rect(d, (820, 100, 1360, 520), CARD, 16)
    d.text((1090, 135), "Узнайте стоимость и расписание", fill=WHITE, font=font(18, True), anchor="mt")

    # Name field
    draw_rounded_rect(d, (860, 175, 1320, 225), DARKGRAY, 8)
    d.text((880, 200), "Надя", fill=WHITE, font=font(16), anchor="lm")
    d.text((880, 163), "Ваше имя", fill=LGRAY, font=font(13))

    # Class dropdown
    draw_rounded_rect(d, (860, 255, 1320, 305), DARKGRAY, 8)
    d.text((880, 280), "9 класс, переходит в 10", fill=WHITE, font=font(16), anchor="lm")
    d.text((880, 243), "Выберите класс ребёнка", fill=LGRAY, font=font(13))
    d.text((1305, 280), "▾", fill=LGRAY, font=font(16), anchor="rm")

    # Subject checkboxes
    d.text((860, 320), "Предметы", fill=LGRAY, font=font(13))
    subjects = ["Математика ЕГЭ", "Русский язык ЕГЭ", "Математика ОГЭ", "Русский ОГЭ", "Физика ЕГЭ", "Химия ЕГЭ"]
    for i, s in enumerate(subjects):
        row, col = divmod(i, 2)
        x = 860 + col * 230
        y = 340 + row * 40
        draw_rounded_rect(d, (x, y, x+24, y+24), GRAY, 4)
        d.text((x+32, y+12), s, fill=LGRAY, font=font(14), anchor="lm")

    draw_button(d, (860, 480, 1320, 510), "Узнать подробнее", PURPLE, WHITE, 8, 16)

    # Trust block
    d.text((80, 620), "10 000+ учеников сдали ЕГЭ на 80+ баллов", fill=LIME, font=font(20, True))
    stats = [("98%", "рекомендуют нас друзьям"), ("83 балла", "средний результат ЕГЭ"), ("5 лет", "на рынке онлайн-образования")]
    for i, (num, label) in enumerate(stats):
        x = 80 + i * 400
        d.text((x, 670), num, fill=LIME, font=font(32, True))
        d.text((x, 715), label, fill=LGRAY, font=font(15))

    img.save(OUT / "01_landing.png")
    print("[OK] 01_landing.png")


# ─────────────────────────────────────────────
# Screen 2 — Multi-step form: Кто вы
# ─────────────────────────────────────────────
def screen_02():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    nav_bar(d)

    # Modal overlay
    draw_rounded_rect(d, (380, 80, 1060, 720), (30, 30, 40), 20)

    # Progress bar
    steps = ["Кто вы", "Класс", "Предметы", "Результат", "Тариф"]
    sw = (680 - 40) // len(steps)
    for i, s in enumerate(steps):
        x = 420 + i * (sw + 8)
        active = i == 0
        color = PURPLE if active else GRAY
        draw_rounded_rect(d, (x, 110, x+sw, 122), color, 5)
        d.text((x + sw//2, 136), s, fill=WHITE if active else LGRAY, font=font(12), anchor="mt")

    d.text((720, 200), "Кто будет заниматься?", fill=WHITE, font=font(28, True), anchor="mt")
    d.text((720, 245), "Выберите вашу роль — это поможет нам подобрать подходящую программу", fill=LGRAY, font=font(16), anchor="mt")

    # Role cards
    for i, (role, desc, icon) in enumerate([
        ("Я ученик", "Хочу подготовиться самостоятельно", "🎓"),
        ("Я родитель", "Записываю ребёнка, слежу за прогрессом", "👪"),
    ]):
        x = 430 + i * 310
        selected = i == 1
        border = PURPLE if selected else GRAY
        draw_rounded_rect(d, (x, 290, x+280, 500), (40, 30, 60) if selected else DARKGRAY, 14)
        d.rectangle([(x, 290), (x+280, 500)], outline=border, width=2)
        d.text((x+140, 360), icon, font=font(40), anchor="mm")
        d.text((x+140, 420), role, fill=WHITE, font=font(20, True), anchor="mt")
        d.text((x+140, 455), desc, fill=LGRAY, font=font(14), anchor="mt")
        if selected:
            draw_rounded_rect(d, (x+110, 470, x+170, 492), PURPLE, 10)
            d.text((x+140, 481), "✓ Выбрано", fill=WHITE, font=font(12), anchor="mm")

    draw_button(d, (570, 550, 870, 590), "Далее →", PURPLE, WHITE, 10, 18)
    d.text((720, 610), "Шаг 1 из 5", fill=LGRAY, font=font(13), anchor="mt")

    img.save(OUT / "02_role_selection.png")
    print("[OK] 02_role_selection.png")


# ─────────────────────────────────────────────
# Screen 3 — Class selection
# ─────────────────────────────────────────────
def screen_03():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    nav_bar(d)

    draw_rounded_rect(d, (380, 80, 1060, 720), (30, 30, 40), 20)

    # Progress
    steps = ["Кто вы", "Класс", "Предметы", "Результат", "Тариф"]
    sw = (680 - 40) // len(steps)
    for i, s in enumerate(steps):
        x = 420 + i * (sw + 8)
        color = GREEN if i == 0 else (PURPLE if i == 1 else GRAY)
        draw_rounded_rect(d, (x, 110, x+sw, 122), color, 5)
        d.text((x + sw//2, 136), s, fill=WHITE if i <= 1 else LGRAY, font=font(12), anchor="mt")

    d.text((720, 200), "В каком классе ребёнок?", fill=WHITE, font=font(28, True), anchor="mt")

    classes = ["7 класс", "8 класс", "9 класс (→10)", "10 класс (→11)", "11 класс (выпускной)"]
    cols = 3
    for i, cls in enumerate(classes):
        row, col = divmod(i, cols)
        x = 430 + col * 215
        y = 280 + row * 130
        selected = i == 2
        draw_rounded_rect(d, (x, y, x+195, y+110), (40, 30, 60) if selected else DARKGRAY, 12)
        d.rectangle([(x, y), (x+195, y+110)], outline=PURPLE if selected else GRAY, width=2)
        d.text((x+98, y+55), cls, fill=WHITE, font=font(16, True), anchor="mm")

    draw_button(d, (570, 590, 870, 630), "Далее →", PURPLE, WHITE, 10, 18)
    d.text((720, 650), "Шаг 2 из 5", fill=LGRAY, font=font(13), anchor="mt")

    img.save(OUT / "03_class_selection.png")
    print("[OK] 03_class_selection.png")


# ─────────────────────────────────────────────
# Screen 4 — Subject selection
# ─────────────────────────────────────────────
def screen_04():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    nav_bar(d)

    draw_rounded_rect(d, (300, 80, 1140, 760), (30, 30, 40), 20)

    steps = ["Кто вы", "Класс", "Предметы", "Результат", "Тариф"]
    sw = (840 - 40) // len(steps)
    for i, s in enumerate(steps):
        x = 340 + i * (sw + 6)
        color = GREEN if i < 2 else (PURPLE if i == 2 else GRAY)
        draw_rounded_rect(d, (x, 110, x+sw, 122), color, 5)
        d.text((x + sw//2, 136), s, fill=WHITE if i <= 2 else LGRAY, font=font(12), anchor="mt")

    d.text((720, 200), "Какие предметы нужны?", fill=WHITE, font=font(28, True), anchor="mt")
    d.text((720, 238), "Можно выбрать несколько. Первые два предмета — основные.", fill=LGRAY, font=font(15), anchor="mt")

    subjects = [
        ("Математика ОГЭ", "Базовая + профильная", True),
        ("Русский язык ОГЭ", "Устная и письменная части", True),
        ("Обществознание ОГЭ", "История + право + экономика", False),
        ("Биология ОГЭ", "Теория + практика", False),
        ("Физика ОГЭ", "Механика, термодинамика", False),
        ("Химия ОГЭ", "Органика и неорганика", False),
        ("История ОГЭ", "Хронология + аналитика", False),
        ("Информатика ОГЭ", "Алгоритмы, Python", False),
    ]

    cols = 2
    for i, (name, desc, sel) in enumerate(subjects):
        row, col = divmod(i, cols)
        x = 340 + col * 410
        y = 270 + row * 100
        draw_rounded_rect(d, (x, y, x+390, y+85), (40, 30, 60) if sel else DARKGRAY, 10)
        d.rectangle([(x, y), (x+390, y+85)], outline=PURPLE if sel else GRAY, width=2)
        # Checkbox
        cb_color = PURPLE if sel else GRAY
        draw_rounded_rect(d, (x+12, y+18, x+38, y+44), cb_color, 5)
        if sel:
            d.text((x+25, y+31), "✓", fill=WHITE, font=font(16, True), anchor="mm")
        d.text((x+50, y+28), name, fill=WHITE, font=font(16, True), anchor="lm")
        d.text((x+50, y+55), desc, fill=LGRAY, font=font(13), anchor="lm")

    draw_button(d, (520, 680, 920, 720), "Узнать подробности →", PURPLE, WHITE, 10, 17)

    img.save(OUT / "04_subjects.png")
    print("[OK] 04_subjects.png")


# ─────────────────────────────────────────────
# Screen 5 — Upsell: 3rd subject free
# ─────────────────────────────────────────────
def screen_05():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    nav_bar(d)

    draw_rounded_rect(d, (360, 100, 1080, 760), (30, 30, 40), 20)

    # Badge
    draw_rounded_rect(d, (580, 115, 860, 155), LIME, 20)
    d.text((720, 135), "🎁 СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ", fill=BG, font=font(14, True), anchor="mm")

    d.text((720, 200), "Добавьте третий предмет бесплатно этим летом!", fill=WHITE, font=font(30, True), anchor="mt")
    d.text((720, 248), "Подготовьтесь к ОГЭ по трём предметам по цене двух. Предложение действует до 31 августа.", fill=LGRAY, font=font(16), anchor="mt")

    # Selected subjects summary
    d.text((400, 360), "Уже выбраны:", fill=LGRAY, font=font(14))
    for i, (subj, color) in enumerate([("Математика ОГЭ", PURPLE), ("Русский язык ОГЭ", PURPLE)]):
        draw_rounded_rect(d, (400, 385+i*45, 720, 420+i*45), color, 8)
        d.text((560, 403+i*45), f"✓ {subj}", fill=WHITE, font=font(15, True), anchor="mm")

    # Third subject picker
    d.text((400, 490), "Выберите третий предмет:", fill=LGRAY, font=font(14))
    free_subjects = ["Обществознание ОГЭ", "Биология ОГЭ", "История ОГЭ", "Физика ОГЭ"]
    for i, s in enumerate(free_subjects):
        x = 400 + (i % 2) * 340
        y = 515 + (i // 2) * 55
        draw_rounded_rect(d, (x, y, x+320, y+44), DARKGRAY, 8)
        d.rectangle([(x, y), (x+320, y+44)], outline=GRAY, width=1)
        d.text((x+160, y+22), s, fill=WHITE, font=font(15), anchor="mm")
        draw_rounded_rect(d, (x+280, y+10, x+314, y+34), (60, 60, 60), 5)
        d.text((x+297, y+22), "+", fill=LGRAY, font=font(18, True), anchor="mm")

    draw_button(d, (400, 650, 720, 690), "Добавить бесплатно", LIME, BG, 10, 16)
    draw_rounded_rect(d, (740, 650, 1060, 690), (50, 50, 50), 10)
    d.text((900, 670), "Нет, спасибо", fill=LGRAY, font=font(16), anchor="mm")

    img.save(OUT / "05_upsell.png")
    print("[OK] 05_upsell.png")


# ─────────────────────────────────────────────
# Screen 6 — Tariff Standard
# ─────────────────────────────────────────────
def screen_06():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    nav_bar(d)

    d.text((720, 100), "Выберите тариф", fill=WHITE, font=font(32, True), anchor="mt")
    d.text((720, 148), "9 класс → 10 класс • Математика ОГЭ + Русский язык ОГЭ", fill=LGRAY, font=font(16), anchor="mt")

    # Standard card — highlighted
    draw_rounded_rect(d, (80, 200, 670, 820), CARD, 16)
    d.rectangle([(80, 200), (670, 820)], outline=PURPLE, width=3)

    draw_rounded_rect(d, (80, 200, 250, 240), PURPLE, 10)
    d.text((165, 220), "СТАНДАРТ", fill=WHITE, font=font(14, True), anchor="mm")

    d.text((375, 280), "3 490 ₽/мес", fill=WHITE, font=font(32, True), anchor="mm")
    d.text((375, 320), "за каждый предмет", fill=LGRAY, font=font(15), anchor="mt")

    features_std = [
        "✓ Видеоуроки в записи",
        "✓ Проверка ДЗ в течение 24 часов",
        "✓ Индивидуальная траектория обучения",
        "✓ Куратор в мессенджере",
        "✓ Пробные ОГЭ каждые 2 недели",
        "✓ Чат с однокурсниками",
        "✓ Доступ к базе заданий",
        "✓ Отчёты родителям еженедельно",
    ]
    for i, f in enumerate(features_std):
        d.text((110, 370 + i * 45), f, fill=WHITE, font=font(15))

    draw_button(d, (120, 750, 630, 795), "Выбрать Стандарт", PURPLE, WHITE, 10, 18)

    # Premium card — right side
    draw_rounded_rect(d, (710, 200, 1360, 820), CARD, 16)
    d.rectangle([(710, 200), (1360, 820)], outline=GRAY, width=1)

    draw_rounded_rect(d, (710, 200, 900, 240), (80, 60, 150), 10)
    d.text((805, 220), "ПРЕМИУМ", fill=WHITE, font=font(14, True), anchor="mm")

    d.text((1035, 280), "5 490 ₽/мес", fill=WHITE, font=font(32, True), anchor="mm")
    d.text((1035, 320), "за каждый предмет", fill=LGRAY, font=font(15), anchor="mt")

    features_prm = [
        "✓ Всё из Стандарта +",
        "✓ Занятия в мини-группах (до 20 чел.)",
        "✓ Проверка ДЗ в течение 2 часов",
        "✓ Личный наставник",
        "✓ Поддержка психолога",
        "✓ Экспресс-разборы сложных тем",
        "✓ Гарантия 80+ баллов *",
        "✓ Приоритетная поддержка 24/7",
    ]
    for i, f in enumerate(features_prm):
        d.text((740, 370 + i * 45), f, fill=LGRAY, font=font(15))

    draw_button(d, (750, 750, 1320, 795), "Выбрать Премиум", (70, 40, 120), WHITE, 10, 18)

    img.save(OUT / "06_tariff_standard.png")
    print("[OK] 06_tariff_standard.png")


# ─────────────────────────────────────────────
# Screen 7 — Tariff Premium focused
# ─────────────────────────────────────────────
def screen_07():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    nav_bar(d)

    d.text((720, 100), "Выберите тариф", fill=WHITE, font=font(32, True), anchor="mt")

    draw_rounded_rect(d, (80, 200, 670, 820), CARD, 16)
    d.rectangle([(80, 200), (670, 820)], outline=GRAY, width=1)

    draw_rounded_rect(d, (80, 200, 250, 240), GRAY, 10)
    d.text((165, 220), "СТАНДАРТ", fill=WHITE, font=font(14, True), anchor="mm")

    d.text((375, 280), "3 490 ₽/мес", fill=LGRAY, font=font(32, True), anchor="mm")
    d.text((375, 320), "за каждый предмет", fill=LGRAY, font=font(15), anchor="mt")

    features_std = [
        "✓ Видеоуроки в записи",
        "✓ Проверка ДЗ в течение 24 часов",
        "✓ Индивидуальная траектория",
        "✓ Куратор в мессенджере",
        "✓ Пробные ОГЭ каждые 2 недели",
        "✓ Чат с однокурсниками",
        "✓ Доступ к базе заданий",
        "✓ Отчёты родителям еженедельно",
    ]
    for i, f in enumerate(features_std):
        d.text((110, 370 + i * 45), f, fill=LGRAY, font=font(15))

    draw_button(d, (120, 750, 630, 795), "Выбрать Стандарт", (60, 60, 60), WHITE, 10, 18)

    # Premium — highlighted
    draw_rounded_rect(d, (710, 200, 1360, 820), CARD, 16)
    d.rectangle([(710, 200), (1360, 820)], outline=LIME, width=3)

    draw_rounded_rect(d, (710, 200, 960, 240), (100, 200, 0), 10)
    d.text((835, 220), "ПРЕМИУМ  🔥 популярный", fill=BG, font=font(14, True), anchor="mm")

    d.text((1035, 280), "5 490 ₽/мес", fill=WHITE, font=font(32, True), anchor="mm")
    d.text((1035, 320), "за каждый предмет", fill=LGRAY, font=font(15), anchor="mt")

    features_prm = [
        ("✓ Всё из Стандарта +", WHITE),
        ("✓ Занятия в мини-группах (до 20 чел.)", WHITE),
        ("✓ Проверка ДЗ в течение 2 часов", WHITE),
        ("✓ Личный наставник", WHITE),
        ("✓ Поддержка психолога", WHITE),
        ("✓ Экспресс-разборы сложных тем", WHITE),
        ("✓ Гарантия 80+ баллов *", LIME),
        ("✓ Приоритетная поддержка 24/7", WHITE),
    ]
    for i, (f, col) in enumerate(features_prm):
        d.text((740, 370 + i * 45), f, fill=col, font=font(15))

    draw_button(d, (750, 750, 1320, 795), "Выбрать Премиум →", LIME, BG, 10, 18)

    d.text((1035, 810), "* при условии выполнения ДЗ от 80%", fill=LGRAY, font=font(12), anchor="mt")

    img.save(OUT / "07_tariff_premium.png")
    print("[OK] 07_tariff_premium.png")


if __name__ == "__main__":
    screen_01()
    screen_02()
    screen_03()
    screen_04()
    screen_05()
    screen_06()
    screen_07()
    print(f"\n✅ All 7 screenshots saved to {OUT}")
