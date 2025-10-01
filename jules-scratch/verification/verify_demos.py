from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    base_url = "http://localhost:3000/en/how-to-use"
    pages_to_verify = [
        "spin",
        "share",
        "templates",
        "original-roulette",
    ]

    for page_path in pages_to_verify:
        url = f"{base_url}/{page_path}"
        page.goto(url, wait_until="networkidle")
        page.screenshot(path=f"jules-scratch/verification/{page_path}.png", full_page=True)
        print(f"Screenshot taken for {url}")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)