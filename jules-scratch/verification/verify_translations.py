from playwright.sync_api import sync_playwright, Page, expect

def verify_how_to_use_page(page: Page):
    """
    Navigates to the 'How to Use' page in Japanese and verifies its content.
    """
    # Navigate to the Japanese "How to Use" page
    page.goto("http://localhost:3000/ja/how-to-use")

    # Wait for the network to be idle to ensure all content is loaded
    page.wait_for_load_state('networkidle')

    # Check for the main title to be correctly translated, with an increased timeout
    title = page.get_by_role("heading", name="使い方")
    expect(title).to_be_visible(timeout=30000)

    # Take a screenshot of the main "How to Use" page
    page.screenshot(path="jules-scratch/verification/how-to-use-ja.png", full_page=True)

    # Navigate to the "create" sub-page
    create_link = page.get_by_role("link", name="ルーレットの作成方法")
    expect(create_link).to_be_visible(timeout=30000)
    create_link.click()

    # Wait for the sub-page to load
    page.wait_for_load_state('networkidle')

    # Check for the title on the "create" sub-page, with an increased timeout
    create_title = page.get_by_role("heading", name="ルーレットの作成方法")
    expect(create_title).to_be_visible(timeout=30000)

    # Take a screenshot of the "create" sub-page
    page.screenshot(path="jules-scratch/verification/how-to-use-create-ja.png", full_page=True)


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        verify_how_to_use_page(page)
        browser.close()

if __name__ == "__main__":
    main()