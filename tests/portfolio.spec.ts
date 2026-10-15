import { test, expect, type Page, type APIRequestContext } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const origin = "http://localhost:3310";
const password = "local-test-password-only-2026";
const control = (request: APIRequestContext, data: object) => request.post("http://127.0.0.1:3311/__control", { data });
async function home(page: Page) {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Sambono");
}
async function terminal(page: Page) {
  await page.getByText("Explore the interactive terminal", { exact: false }).click();
  const input = page.getByRole("textbox", { name: "Terminal command" });
  await expect(input).toBeVisible();
  return input;
}
async function admin(page: Page) {
  await home(page);
  const input = await terminal(page);
  await input.fill("admin"); await input.press("Enter");
  const secret = page.getByLabel("Admin password", { exact: true });
  await secret.fill(password); await secret.press("Enter");
  await expect(page.getByRole("dialog", { name: "Portfolio editor" })).toBeVisible();
}
async function login(request: APIRequestContext) {
  const response = await request.post("/api/auth", { headers: { Origin: origin }, data: { password } });
  expect(response.status()).toBe(200);
  return response;
}
test.beforeEach(async ({ request }) => { await control(request, { reset: true }); });

for (const width of [320, 360, 390, 412, 1350]) {
  test(`scroll and layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width > 1000 ? 940 : 844 });
    const errors: string[] = []; page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    await home(page);
    for (const id of ["projects", "experience", "certs", "contact"]) {
      await page.locator("#" + id).scrollIntoViewIfNeeded();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    await page.getByRole("contentinfo").scrollIntoViewIfNeeded();
    expect(errors).toEqual([]);
  });
}
test("mobile primary actions are visible without scrolling", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 }); await home(page);
  for (const name of ["View Projects", "Contact Me"]) await expect(page.getByRole("link", { name, exact: true })).toBeInViewport({ ratio: 1 });
});
test("mobile menu anchors clear the sticky header", async ({ page }) => {
  await home(page);
  for (const [name, id] of [["Projects", "projects"], ["Experience", "experience"], ["Certs", "certs"], ["Contact", "contact"]]) {
    await page.getByLabel("Open main navigation menu").click();
    await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name, exact: true }).click();
    await expect.poll(async () => (await page.locator("#" + id).boundingBox())!.y).toBeGreaterThanOrEqual(56);
    await expect(page.getByLabel("Open main navigation menu")).toBeVisible();
    expect((await page.locator("#" + id).boundingBox())!.y).toBeLessThan(250);
  }
});
test("project filters and real overview links work", async ({ page }) => {
  await home(page);
  await page.getByRole("button", { name: "Filter projects by Docker", exact: true }).click();
  await expect(page.locator("#projects h3")).toHaveCount(1);
  await expect(page.locator("#projects h3")).toContainText("Self-Hosted");
  await page.getByRole("link", { name: /Read project overview/ }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Self-Hosted Cloud Infrastructure");
  await expect(page.getByRole("link", { name: "Discuss this project" })).toHaveAttribute("href", "/#contact");
  expect(await page.locator('a[href="#"]').count()).toBe(0);
});
test("resume provides a printable document", async ({ page }) => {
  await page.goto("/resume");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Sambono");
  await expect(page.getByRole("button", { name: /Print|PDF/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "orville@rville.dev" })).toHaveAttribute("href", "mailto:orville@rville.dev");
});
test("public content and navigation work with JavaScript disabled", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage(); await home(page);
  await expect(page.locator("#projects h3")).toHaveCount(3);
  await page.locator('header summary').click();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Resume", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Sambono");
  await context.close();
});
for (const denied of [false, true]) {
  test(`clipboard ${denied ? "denial is handled" : "success is truthful"}`, async ({ page }) => {
    await page.addInitScript(deny => {
      Object.defineProperty(navigator, "clipboard", { value: { writeText: async (value: string) => {
        if (deny) throw new DOMException("Denied", "NotAllowedError");
        (window as Window & { copiedEmail?: string }).copiedEmail = value;
      } } });
    }, denied);
    const errors: string[] = []; page.on("pageerror", error => errors.push(error.message));
    await home(page); await page.getByRole("button", { name: "Copy", exact: true }).click();
    await expect(page.locator("#contact [role=status]")).toHaveText(denied ? /Could not copy/ : "Email address copied.");
    if (!denied) expect(await page.evaluate(() => (window as Window & { copiedEmail?: string }).copiedEmail)).toBe("orville@rville.dev");
    expect(errors).toEqual([]);
  });
}
test("terminal commands, history, autocomplete and keyboard exit work", async ({ page }) => {
  await home(page); const input = await terminal(page);
  await input.fill("hel"); await input.press("Control+Space"); await expect(input).toHaveValue("help");
  await input.press("Enter"); await expect(page.getByRole("log")).toContainText("Tab moves between controls");
  await input.fill("contact"); await input.press("Enter"); await expect(page.getByRole("log")).toContainText("orville@rville.dev");
  await input.press("ArrowUp"); await expect(input).toHaveValue("contact");
  await input.press("ArrowDown"); await expect(input).toHaveValue("");
  await input.press("Tab"); await expect(page.getByRole("button", { name: "Run command" })).toBeFocused();
  await input.focus(); await input.press("Shift+Tab"); await expect(input).not.toBeFocused();
});
test("accessibility scan includes scrolled content and opened terminal", async ({ page }) => {
  await home(page); await terminal(page);
  await page.getByRole("contentinfo").scrollIntoViewIfNeeded();
  const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(result.violations).toEqual([]);
});
test("SEO, PWA icons and public API use the new domain", async ({ page, request }) => {
  await home(page);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://rville.dev");
  for (const path of ["/robots.txt", "/sitemap.xml"]) {
    const body = await (await request.get(path)).text();
    expect(body).toContain("https://rville.dev"); expect(body).not.toContain("rville.site");
  }
  const response = await request.get("/api/portfolio");
  expect(response.headers()["cache-control"]).toContain("no-store");
  const manifest = await (await request.get("/manifest.json")).json();
  expect(manifest.icons.map((icon: { sizes: string }) => icon.sizes)).toEqual(expect.arrayContaining(["192x192", "512x512"]));
  for (const icon of manifest.icons) expect((await request.get(icon.src)).ok()).toBe(true);
  expect((await request.get("/opengraph-image")).status()).toBe(200);
});
test("admin manages email, CV, profile and project photos with durable persistence", async ({ page, request, browser }) => {
  await page.route("https://images.example.test/**", route => route.fulfill({ path: "public/profile.webp", contentType: "image/webp" }));
  await admin(page);
  await page.getByLabel("Contact email", { exact: true }).fill("hello@rville.dev");
  await page.getByLabel("Profile photo URL", { exact: true }).fill("https://images.example.test/portrait.webp");
  await page.getByLabel("CV / resume URL", { exact: true }).fill("https://example.test/cv.pdf");
  await page.getByRole("button", { name: "Projects", exact: true }).click();
  await page.getByLabel("Summary", { exact: true }).first().fill("A verified project description from the editor.");
  await page.getByLabel("Project photo URL (optional)", { exact: true }).first().fill("https://images.example.test/project.webp");
  await page.getByLabel("Photo description (accessibility)", { exact: true }).first().fill("Project dashboard screenshot");
  await page.getByLabel("GitHub URL (optional)", { exact: true }).first().fill("https://github.com/Orville610/portofolio");
  await page.getByRole("button", { name: "Achievement", exact: true }).click();
  await page.getByLabel("Proof URL (optional)", { exact: true }).fill("https://example.test/proof");
  const axe = await new AxeBuilder({ page }).include("dialog").withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(axe.violations).toEqual([]);
  await page.getByRole("button", { name: "Save Changes", exact: true }).click();
  await expect(page.getByRole("dialog").getByRole("status")).toHaveText("Changes saved for all visitors.");
  await page.getByLabel("Close Admin Panel").click();
  await expect(page.getByRole("link", { name: "Send Email" })).toHaveAttribute("href", "mailto:hello@rville.dev");
  await page.reload();
  await expect(page.locator("#projects")).toContainText("A verified project description from the editor.");
  await page.getByLabel("Open main navigation menu").click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Resume", exact: true })).toHaveAttribute("href", "https://example.test/cv.pdf");
  const anonymous = await browser.newContext();
  const fresh = await anonymous.request.get(origin + "/api/portfolio");
  expect((await fresh.json()).settings.email).toBe("hello@rville.dev");
  const freshPage = await anonymous.newPage(); await freshPage.goto(origin + "/");
  await expect(freshPage.locator("#projects")).toContainText("A verified project description from the editor.");
  expect((await (await request.get("/api/portfolio")).json()).projects[0].imageUrl).toBe("https://images.example.test/project.webp");
  await anonymous.close();
});
test("storage failure preserves the admin draft and expired sessions can reauthenticate", async ({ page, request }) => {
  await admin(page); await page.getByLabel("Contact email", { exact: true }).fill("draft@rville.dev");
  await control(request, { failWrites: true });
  await page.getByRole("button", { name: "Save Changes", exact: true }).click();
  await expect(page.getByRole("dialog").getByRole("alert")).toContainText("temporarily unavailable");
  await expect(page.getByLabel("Contact email", { exact: true })).toHaveValue("draft@rville.dev");
  expect((await (await request.get("/api/portfolio")).json()).settings.email).toBe("orville@rville.dev");
  await control(request, { failWrites: false, expireSessions: true });
  await page.getByRole("button", { name: "Save Changes", exact: true }).click();
  await expect(page.getByRole("dialog").getByRole("alert")).toContainText("session has expired");
  await page.getByLabel("Admin password", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Sign in again" }).click();
  await expect(page.getByRole("dialog").getByRole("status")).toContainText("Your draft is ready");
  await page.getByRole("button", { name: "Save Changes", exact: true }).click();
  await expect(page.getByRole("dialog").getByRole("status")).toHaveText("Changes saved for all visitors.");
});
test("API blocks unauthorized, cross-origin, malformed and oversized writes", async ({ request }) => {
  const data = await (await request.get("/api/portfolio")).json();
  expect((await request.post("/api/portfolio", { headers: { Origin: origin }, data })).status()).toBe(401);
  expect((await request.post("/api/auth", { headers: { Origin: "https://attacker.example" }, data: { password } })).status()).toBe(403);
  const auth = await login(request);
  const cookie = auth.headers()["set-cookie"];
  expect(cookie).toMatch(/HttpOnly/i); expect(cookie).toMatch(/Secure/i); expect(cookie).toMatch(/SameSite=strict/i); expect(cookie).toMatch(/Path=\/api/i);
  expect((await request.post("/api/portfolio", { headers: { Origin: "https://attacker.example" }, data })).status()).toBe(403);
  expect((await request.post("/api/portfolio", { headers: { Origin: origin }, data: { ...data, settings: { email: "not-an-email" } } })).status()).toBe(400);
  expect((await request.post("/api/portfolio", { headers: { Origin: origin }, data: { ...data, settings: { email: "hello@rville.dev", resumeUrl: "javascript:alert(1)" } } })).status()).toBe(400);
  expect((await request.post("/api/portfolio", { headers: { Origin: origin }, data: { ...data, projects: [data.projects[0], data.projects[0]] } })).status()).toBe(400);
  expect((await request.post("/api/portfolio", { headers: { Origin: origin, "Content-Type": "application/json" }, data: "{" })).status()).toBe(400);
  expect((await request.post("/api/portfolio", { headers: { Origin: origin }, data: { ...data, junk: "x".repeat(70000) } })).status()).toBe(413);
});
test("failed login is rate limited and logout revokes the server session", async ({ request }) => {
  for (let attempt = 0; attempt < 5; attempt++) expect((await request.post("/api/auth", { headers: { Origin: origin }, data: { password: "wrong" } })).status()).toBe(401);
  expect((await request.post("/api/auth", { headers: { Origin: origin }, data: { password } })).status()).toBe(429);
  await control(request, { reset: true }); await login(request);
  const cookies = await request.storageState();
  expect((await (await request.get("/api/auth")).json()).authenticated).toBe(true);
  expect((await request.delete("/api/auth", { headers: { Origin: origin } })).status()).toBe(200);
  const oldCookie = cookies.cookies.find(cookie => cookie.name === "portfolio_admin")!;
  expect((await (await request.get("/api/auth", { headers: { Cookie: oldCookie.name + "=" + oldCookie.value } })).json()).authenticated).toBe(false);
});
test("legacy stored content gains settings without losing project edits", async ({ request }) => {
  const data = await (await request.get("/api/portfolio")).json();
  delete data.settings; delete data.achievement;
  data.projects[0].description = "Previously saved project content.";
  data.projects[0].githubUrl = "#";
  await control(request, { legacy: data });
  const loaded = await (await request.get("/api/portfolio")).json();
  expect(loaded.settings.email).toBe("orville@rville.dev");
  expect(loaded.projects[0].description).toBe("Previously saved project content.");
  expect(loaded.projects[0].githubUrl).toBeUndefined();
});
test("service worker excludes API and RSC while supporting offline navigation", async ({ page, context }) => {
  await home(page);
  await page.evaluate(async () => { await navigator.serviceWorker.ready; });
  await page.reload();
  await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBe(true);
  await page.evaluate(async () => {
    await fetch("/api/portfolio");
    await fetch("/api/auth");
    await fetch("/?_rsc=test", { headers: { RSC: "1" } });
  });
  const cached = await page.evaluate(async () => (await Promise.all((await caches.keys()).map(async key => (await (await caches.open(key)).keys()).map(request => request.url)))).flat());
  expect(cached.some(url => url.includes("/api/") || url.includes("_rsc"))).toBe(false);
  await context.setOffline(true);
  await page.goto("/unvisited-offline-page");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/offline/i);
  await context.setOffline(false);
});

test("direct admin page signs in and stays out of search indexing", async ({ page }) => {
  await page.goto("/admin");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await page.getByLabel("Admin password", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Portfolio editor" })).toBeVisible();
  await page.getByLabel("Close Admin Panel").click();
  await page.getByRole("button", { name: "Sign out", exact: true }).click();
  await expect(page.getByRole("button", { name: "Sign in", exact: true })).toBeVisible();
});

test("project tags save immediately when submitting with Enter", async ({ page, request }) => {
  await admin(page);
  await page.getByRole("button", { name: "Projects", exact: true }).click();
  const tags = page.getByLabel("Tags (comma separated)", { exact: true }).first();
  await tags.fill("Linux, Docker, Playwright, "); await tags.press("Enter");
  await expect(page.getByRole("dialog").getByRole("status")).toHaveText("Changes saved for all visitors.");
  expect((await (await request.get("/api/portfolio")).json()).projects[0].tags).toEqual(["Linux", "Docker", "Playwright"]);
});

test("hiding the achievement persists after reload", async ({ page, request }) => {
  await admin(page); await page.getByRole("button", { name: "Achievement", exact: true }).click();
  await page.getByLabel("Show achievement", { exact: true }).uncheck();
  await page.getByRole("button", { name: "Save Changes", exact: true }).click();
  await expect(page.getByRole("dialog").getByRole("status")).toHaveText("Changes saved for all visitors.");
  expect((await (await request.get("/api/portfolio")).json()).achievement).toBeNull();
  await page.getByLabel("Close Admin Panel").click(); await page.reload();
  await expect(page.getByRole("heading", { name: "National Finalist — Cloud Computing" })).toHaveCount(0);
});
