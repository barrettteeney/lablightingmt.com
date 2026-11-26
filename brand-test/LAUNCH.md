# Launch guide: swapping the new homepage in

This is the step-by-step for replacing the live homepage with the page in `brand-test/`. **Nothing here has been run.** `main` is untouched and nothing is deployed until Barrett says go.

The site is served by GitHub Pages from the `main` branch (root folder, custom domain in `CNAME`). Whatever is merged into `main` goes live a minute or two later.

## What launches

| Launch-ready file (on the `brand-test` branch) | Becomes (on `main`) | Effect |
|---|---|---|
| `brand-test/index.html` | `/index.html` | Replaces the homepage |
| `brand-test/media/` (photos, share image, fonts) | `/media/` | New folder. Nothing on the live site uses this name today |
| `brand-test/favicon.ico`, `favicon-32.png`, `apple-touch-icon.png` | same names at `/` | Replace the old bulb icon everywhere, including legal and QuickBooks pages, which already link to these names |
| `brand-test/favicon.svg`, `icon-512.png` | `/favicon.svg`, `/icon-512.png` | New files. `icon-512.png` is the logo named in the page's business data |
| `brand-test/sitemap.xml` | `/sitemap.xml` | Same two URLs as today; set the homepage date to launch day |
| `brand-test/brand/logo-light.png`, `logo-dark.png` | `/logo-light.png`, `/logo-dark.png` | **Optional.** Puts the new logo in the header of the legal, QuickBooks and quote-tool pages without editing them |

The homepage uses relative paths for its own files (`media/...`, `favicon.svg`) and root paths for other pages (`/privacy.html`, `/terms.html`), so it works unchanged once it sits at the root.

## What stays exactly as it is

- `CNAME`, `robots.txt`
- `privacy.html`, `terms.html`, `legal/*`, `qbo/*`, `tools/quote.html`
- `pricing.html`, `process.html`, `system.html`, `faq.html`, `book.html` (see the mapping below)
- `img/`, `ads/`, `assets/`, `logo-*.png` (unless you take the optional logo swap). Keep `img/hero.jpg`: older ads and social shares still point at it.
- The lead form endpoint (FormSubmit to `info@lablightingmt.com`), the Meta Pixel (`1125681833186931`) and the Google address lookup key. The new page carries all three over unchanged.

## Page mapping: old URLs to the new design

No new redirects are needed. The four section pages and the booking page are already tiny redirect stubs on the live site, and the new homepage keeps the anchor names they point to.

| Old URL | What it is today | After launch |
|---|---|---|
| `/pricing.html` | Redirect to `/#pricing` | Unchanged file. Lands on the new **Pricing** section |
| `/process.html` | Redirect to `/#process` | Unchanged file. Lands on the new **How it works** section |
| `/system.html` | Redirect to `/#system` | Unchanged file. Lands on the new **System** section |
| `/faq.html` | Redirect to `/#faq` | Unchanged file. Lands on the new **FAQ** section |
| `/book.html` | Redirect to `/#book` | Unchanged file. Lands on the new **measurement form** |
| `/privacy.html`, `/terms.html` | Full pages | Unchanged. Linked from the new footer |
| `/legal/*`, `/qbo/*`, `/tools/quote.html` | Full pages, not linked from the homepage | Unchanged |

Old in-page links from ads or bookmarks also keep working. The new page answers every anchor the old homepage had:

| Old anchor | Lands on |
|---|---|
| `#top`, `#system`, `#process`, `#pricing`, `#faq`, `#book` | The section of the same name |
| `#services`, `#why` | Work |
| `#app` | How it works |
| `#track` | System |
| `#quote` | Pricing (the calculator) |
| `#scenes` | Gallery |
| `#about` | Measurement form |
| `#coverage`, `#contact` | Footer |

Later, if you want the stubs or the legal pages rebuilt in the new look, that is a separate job; none of it blocks launch.

## Before you start

1. Settle the open items in the hand-off message (photo confirmation, the three specs taken from the current site, what was dropped from the old page).
2. Pick a quiet time. The swap itself takes about five minutes.

## The swap

These exact commands, plus the merge-revert and restore-from-tag rollbacks below, were dry-run in a throwaway copy of the repo; both rollbacks returned the files to exactly the pre-launch state. Run them from a clone of the repo. Lines starting with `#` are comments.

```bash
# 1. Start from the current live code and mark it so you can always get back
git checkout main
git pull
git tag pre-rebrand
git push origin pre-rebrand

# 2. Work on a release branch
git checkout -b launch-rebrand

# 3. Bring the launch-ready folder over from the brand-test branch
git fetch origin brand-test
git checkout origin/brand-test -- brand-test

# 4. Put each file in its live place
git mv -f brand-test/index.html index.html
git mv brand-test/media media
git mv -f brand-test/favicon.ico favicon.ico
git mv -f brand-test/favicon-32.png favicon-32.png
git mv -f brand-test/apple-touch-icon.png apple-touch-icon.png
git mv brand-test/favicon.svg favicon.svg
git mv brand-test/icon-512.png icon-512.png
git mv -f brand-test/sitemap.xml sitemap.xml

# 5. OPTIONAL: new logo on the legal, QuickBooks and quote-tool pages
git mv -f brand-test/brand/logo-light.png logo-light.png
git mv -f brand-test/brand/logo-dark.png logo-dark.png

# 6. Keep the notes out of the public site, then remove the now-empty folder
mkdir -p docs
git mv brand-test/LAUNCH.md docs/LAUNCH.md
git mv brand-test/PHOTO-SOURCES.md docs/PHOTO-SOURCES.md
git rm -r -q --ignore-unmatch brand-test
rm -rf brand-test          # clears the empty folders git leaves behind
```

Then open `sitemap.xml` and set the first `<lastmod>` to today's date.

If you skip step 5, there is nothing extra to do: step 6 removes the unused logo files along with the rest of the folder.

```bash
# 7. Look at it before it goes anywhere
python3 -m http.server 8000
# open http://localhost:8000/ and click through; Ctrl+C to stop
#   (the address suggestions only work on lablightingmt.com, because the Google key is locked to that domain)

# 8. Commit and publish
git add -A
git commit -m "Launch the new homepage"
git push -u origin launch-rebrand
# open a pull request from launch-rebrand into main and merge it,
# or, to publish directly:
git checkout main
git merge --no-ff launch-rebrand -m "Launch the new homepage"
git push origin main
```

GitHub Pages rebuilds automatically. Give it two minutes, then hard-refresh.

## Checks right after launch

1. `https://lablightingmt.com/` shows the new page on a phone and a laptop.
2. **Send one real test request through the form** (use your own name and number). It should arrive at `info@lablightingmt.com` with the same subject line and table as before ("Website request: ..."). Send a second one with a photo attached.
3. Type an address in the form: Google suggestions appear and a pick shows "Verified".
4. With the Meta Pixel Helper browser extension: `PageView` on load, `Lead` after a successful request, `Contact` when you tap the phone number.
5. Open `/pricing.html`, `/process.html`, `/system.html`, `/faq.html`, `/book.html`: each jumps to its section.
6. Open `/privacy.html`, `/terms.html`, `/qbo/launch.html`, `/tools/quote.html`: all still load.
7. Paste the homepage URL into Facebook's Sharing Debugger and press "Scrape again" so shares pick up the new image.
8. In Google Search Console, resubmit `sitemap.xml` and request indexing of the homepage.

## Rollback

Nothing outside the repo changes at launch: same domain, same form inbox, same pixel. Rolling back is only a matter of putting the old files back.

**If you merged with a merge commit** (the commands above, or a normal pull request merge):

```bash
git checkout main
git pull
git revert -m 1 HEAD --no-edit   # HEAD must be the launch merge; otherwise use its hash in place of HEAD
git push origin main
```

**If you squash-merged the pull request:**

```bash
git checkout main
git pull
git revert HEAD --no-edit
git push origin main
```

**If in doubt**, restore the files from the tag made in step 1:

```bash
git checkout main
git checkout pre-rebrand -- .
git rm -r -q --ignore-unmatch media docs favicon.svg icon-512.png
git commit -m "Roll back to the previous homepage"
git push origin main
```

The old site is back within two minutes. Leads sent while the new page was live are unaffected; they are already in the inbox.

## Things the launch does not change (decide separately)

- `terms.html` still describes price adjustments "at the same per-foot rate". It shows no dollar figure, but the wording is from the old pricing.
- `tools/quote.html` (the internal quote tool, hidden from search engines) still works on a fixed per-foot figure. The public homepage no longer shows one.
- The legal, QuickBooks and quote-tool pages keep their current layout and typeface. With the optional logo swap they at least carry the new mark.
- The old homepage's extra scripts (smooth scrolling, the 3D intro) and `assets/` are no longer loaded by anything. They can be deleted in a later cleanup.
