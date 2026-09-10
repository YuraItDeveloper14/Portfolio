"""Smoke test: the site opens in a real browser, shows its headline and runs without
script errors, on load and while the page is scrolled.

Run it with `python -m pytest -q tests` (needs `pip install pytest playwright` and
`python -m playwright install chromium`). Set SITE_URL to test a running server
instead of serving the files in SITE_DIR.
"""
import functools
import http.server
import os
import pathlib
import re
import threading

import pytest
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
SITE_DIR = ROOT / os.environ.get("SITE_DIR", '.')
TITLE = 'Yurii Dmytrenko'
HEADLINE = 'Yurii Dmytrenko'


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def squash(text):
    return re.sub(r"\s+", "", text or "")


@pytest.fixture(scope="module")
def site():
    if os.environ.get("SITE_URL"):
        yield os.environ["SITE_URL"]
        return
    handler = functools.partial(QuietHandler, directory=str(SITE_DIR))
    server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    yield f"http://127.0.0.1:{server.server_address[1]}/"
    server.shutdown()


@pytest.fixture(scope="module")
def opened(site):
    with sync_playwright() as p:
        # swiftshader keeps WebGL working on CI machines that have no GPU
        browser = p.chromium.launch(executable_path=os.environ.get("CHROMIUM_PATH") or None,
                                    args=["--use-angle=swiftshader", "--enable-unsafe-swiftshader"])
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        errors = []
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.goto(site, wait_until="load")
        page.wait_for_timeout(1500)
        yield page, errors
        browser.close()


def test_title(opened):
    page, _ = opened
    assert TITLE in page.title()


def test_headline_is_visible(opened):
    page, _ = opened
    if HEADLINE is None:
        assert len(page.inner_text("body").strip()) > 50, "the app rendered nothing"
        return
    h1 = page.locator("h1").first
    assert h1.is_visible()
    shown = h1.get_attribute("aria-label") or h1.inner_text()
    assert squash(HEADLINE) in squash(shown)


def test_no_script_errors_on_load(opened):
    assert opened[1] == []


def test_scrolling_keeps_the_page_healthy(opened):
    page, errors = opened
    for _ in range(6):
        page.mouse.wheel(0, 900)
        page.wait_for_timeout(250)
    assert errors == []
