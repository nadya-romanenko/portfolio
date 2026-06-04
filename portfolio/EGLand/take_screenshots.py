"""
Playwright script to capture EGE Land funnel screenshots.
Navigates through the parent journey on egeland.ru and saves screenshots.
"""
import asyncio
import os
from pathlib import Path
from playwright.async_api import async_playwright, TimeoutError as PlaywrightTimeoutError

SCREENSHOTS_DIR = Path(__file__).parent / "screenshots"
SCREENSHOTS_DIR.mkdir(exist_ok=True)

async def safe_screenshot(page, name, label):
    path = SCREENSHOTS_DIR / name
    await page.screenshot(path=str(path), full_page=False)
    print(f"[OK] {label} -> {name}")
    return str(path)

async def try_click(page, selectors, label="element"):
    for sel in selectors:
        try:
            el = page.locator(sel).first
            await el.wait_for(state="visible", timeout=5000)
            await el.click()
            print(f"[OK] Clicked: {label} via '{sel}'")
            return True
        except Exception:
            continue
    print(f"[WARN] Could not click: {label}")
    return False

async def main():
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=True, args=["--no-sandbox"])
        context = await browser.new_context(viewport={"width": 1440, "height": 900})
        page = await context.new_page()

        screenshots = []

        # ── Step 1: Landing page ──────────────────────────────────────────
        print("\n[1] Opening egeland.ru ...")
        await page.goto("https://egeland.ru", wait_until="domcontentloaded", timeout=30000)
        await page.wait_for_timeout(2500)

        # Try clicking "Родитель" tab
        await try_click(page, [
            "text=Родитель",
            "[data-tab='parent']",
            "button:has-text('Родитель')",
            "a:has-text('Родитель')",
            ".tab:has-text('Родитель')",
        ], "Родитель tab")
        await page.wait_for_timeout(1500)

        path = await safe_screenshot(page, "01_landing.png", "Landing page")
        screenshots.append(path)

        # ── Step 2: Fill landing form (name + class) ──────────────────────
        print("\n[2] Filling landing form ...")
        # Fill name field
        filled_name = False
        for sel in ["input[placeholder*='имя']", "input[placeholder*='Имя']", "input[name='name']",
                    "input[type='text']:first-of-type", ".form__input[type='text']"]:
            try:
                el = page.locator(sel).first
                await el.wait_for(state="visible", timeout=4000)
                await el.fill("Надя")
                print(f"[OK] Filled name via '{sel}'")
                filled_name = True
                break
            except Exception:
                continue
        if not filled_name:
            print("[WARN] Name field not found")

        # Try to find class selector / dropdown
        for sel in ["select", "input[placeholder*='класс']", "input[placeholder*='Класс']",
                    ".select", "[data-field='class']"]:
            try:
                el = page.locator(sel).first
                await el.wait_for(state="visible", timeout=3000)
                tag = await el.evaluate("el => el.tagName.toLowerCase()")
                if tag == "select":
                    await el.select_option(label="9")
                else:
                    await el.fill("9")
                print(f"[OK] Set class via '{sel}'")
                break
            except Exception:
                continue

        # Click primary CTA button
        clicked_cta = await try_click(page, [
            "text=Узнать подробнее",
            "text=Узнать подробности",
            "button:has-text('Узнать')",
            "a:has-text('Узнать')",
            ".btn--primary",
            "button[type='submit']",
        ], "CTA button")
        await page.wait_for_timeout(2000)

        path = await safe_screenshot(page, "02_after_cta.png", "After CTA click")
        screenshots.append(path)

        # ── Step 3: Multi-step form — "Кто вы" ───────────────────────────
        print("\n[3] Step: Кто вы ...")
        await try_click(page, [
            "text=Я родитель",
            "button:has-text('родитель')",
            "label:has-text('родитель')",
            ".role-card:has-text('родитель')",
            "[data-role='parent']",
        ], "Я родитель")
        await page.wait_for_timeout(1500)

        path = await safe_screenshot(page, "03_role_selection.png", "Role selection")
        screenshots.append(path)

        # ── Step 4: Class selection ───────────────────────────────────────
        print("\n[4] Step: Класс ...")
        await try_click(page, [
            "text=9 класс",
            "text=В 9 классе",
            "button:has-text('9')",
            "label:has-text('9')",
            ".class-card:has-text('9')",
            "[data-class='9']",
        ], "9 класс")
        await page.wait_for_timeout(1500)

        path = await safe_screenshot(page, "04_class_selection.png", "Class selection")
        screenshots.append(path)

        # ── Step 5: Subject selection ─────────────────────────────────────
        print("\n[5] Step: Предметы ...")
        await try_click(page, [
            "text=Математика",
            "label:has-text('Математика')",
            ".subject:has-text('Математика')",
            "[data-subject='math']",
        ], "Математика ОГЭ")
        await page.wait_for_timeout(800)

        await try_click(page, [
            "text=Русский",
            "label:has-text('Русский')",
            ".subject:has-text('Русский')",
            "[data-subject='russian']",
        ], "Русский ОГЭ")
        await page.wait_for_timeout(800)

        # Click next / confirm subjects
        await try_click(page, [
            "text=Далее",
            "text=Продолжить",
            "text=Следующий шаг",
            "button:has-text('Далее')",
            "button[type='submit']",
        ], "Next after subjects")
        await page.wait_for_timeout(1500)

        path = await safe_screenshot(page, "05_subjects.png", "Subjects selection")
        screenshots.append(path)

        # ── Step 6: Upsell / 3rd subject offer ───────────────────────────
        print("\n[6] Step: Апселл ...")
        await page.wait_for_timeout(1500)
        path = await safe_screenshot(page, "06_upsell.png", "Upsell screen")
        screenshots.append(path)

        # Try to proceed past upsell
        await try_click(page, [
            "text=Пропустить",
            "text=Нет, спасибо",
            "text=Далее",
            "text=Продолжить",
            "button:has-text('Далее')",
        ], "Skip upsell")
        await page.wait_for_timeout(1500)

        # ── Step 7: Tariff Standard ───────────────────────────────────────
        print("\n[7] Step: Тарифы ...")
        path = await safe_screenshot(page, "07_tariff_standard.png", "Tariff Standard")
        screenshots.append(path)

        # Try to click Standard tariff / scroll to see premium
        await try_click(page, [
            "text=Стандарт",
            "text=Выбрать стандарт",
            ".tariff:has-text('Стандарт')",
        ], "Стандарт tariff")
        await page.wait_for_timeout(1500)
        await page.evaluate("window.scrollBy(0, 400)")
        await page.wait_for_timeout(800)

        path = await safe_screenshot(page, "08_tariff_premium.png", "Tariff Premium")
        screenshots.append(path)

        # ── Step 8: Payment screen ────────────────────────────────────────
        print("\n[8] Step: Оплата ...")
        await try_click(page, [
            "text=Купить",
            "text=Оплатить",
            "text=Записаться",
            "button:has-text('Купить')",
            "button:has-text('Оплатить')",
            ".btn-pay",
        ], "Payment button")
        await page.wait_for_timeout(2000)

        path = await safe_screenshot(page, "09_payment.png", "Payment screen")
        screenshots.append(path)

        await browser.close()

        print(f"\n✅ Done. {len(screenshots)} screenshots saved to {SCREENSHOTS_DIR}")
        for s in screenshots:
            print(f"   {s}")

if __name__ == "__main__":
    asyncio.run(main())
