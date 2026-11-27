# Lab Lighting: website + bid-app handoff (v4 official logo, Nov 26, 2026)

On the `brand-v4-logo` branch this folder is packaged as `brand/v4/lab-logo-v4.1.tgz.b64`. That is the v4.1 slope-fix of the official Eave L; do not use the earlier `lab-logo-v4.tgz.b64` once this is applied.


Official logo (v4 / v4.1): the Eave L with 2 lamp tabs in Red #C5322D, plus the red rule between LAB and LIGHTING. v4.1 (Nov 26, 2026): tab tops follow the sloped eave underside (no background wedge). In `lockup-symbol_v4.html`, the `.mk-tab` path is drawn before the eave/L path so the tabs sit under the eave.
The wordmark, tagline, palette and fonts are unchanged. One-color: the tabs and the rule take the logo color.
On a dark ground below about 40 px, use the 1-color 16-px grid mark.
**Staged only.** Nothing here has been pushed, deployed or copied into the website or bid-app repos.
Names, sizes and formats match `main` @ ea3b93a (checked Nov 26, 2026). `main` has no web manifest (`site.webmanifest`/`manifest.json`), so none is included.

| File here | Replaces on the live site (main) | Format | Notes |
|---|---|---|---|
| `logo-light.png` | `/logo-light.png` | 1284x348 PNG RGBA, transparent | Bone #F6F3EE lockup, red tabs + red rule, for dark backgrounds. Used in the headers of privacy.html, terms.html, legal/privacy.html, legal/qbo-app-terms.html, qbo/connect.html, qbo/disconnect.html, qbo/launch.html and tools/quote.html (they load `?v=4`, so bump that query to bust caches). |
| `logo-dark.png` | `/logo-dark.png` | 1284x348 PNG RGBA, transparent | Ink #151515 lockup, red tabs + red rule, for light backgrounds. |
| `og.jpg` | `/media/og.jpg` | 1200x630 JPEG | Built from the live og (main @ ea3b93a): same photo, caption and "LIGHT, BY DESIGN." line. Only the lockup panel is redrawn with the v4 lockup. |
| `favicon.svg` | `/favicon.svg` | SVG, 200x200 viewBox, Ink square | 1-color 16-px grid mark in Bone. It renders at 16-32 px in a browser tab, which falls under the dark/below-40-px rule. |
| `favicon.ico` | `/favicon.ico` | ICO, 16 + 32 | 1-color grid mark on Ink, pixel-aligned. |
| `favicon-32.png` | `/favicon-32.png` | 32x32 PNG RGB | Same as the ico's 32 px frame. |
| `apple-touch-icon.png` | `/apple-touch-icon.png` | 180x180 PNG RGB, opaque, square | Full Eave L, Bone with red tabs on Ink. iOS rounds the corners. |
| `icon-512.png` | `/icon-512.png` | 512x512 PNG RGB | Full Eave L with red tabs on Ink. This is the `logo` in the page's schema.org data. |
| `favicon.png` | `/favicon.png` | 512x512 PNG RGB | Same as icon-512. The live file (an old light-bulb icon) isn't linked from any page on main; replace it or delete it. |
| `lockup-symbol_v4.html` | two blocks in `/index.html`: `<g id="mark">…</g>` and `<symbol id="lockup">…</symbol>`, plus 2 CSS lines | inline SVG | New `#mark` is the Eave L in the same 200x200 box (so `.finish-chip` keeps working) with `class="mk-tab"` on the tabs. The new `#lockup` keeps the live LAB/LIGHTING `<text>` and adds the v3 rule `<rect class="lk-rule">`. Its viewBox keeps the 642:174 ratio, so the `<svg viewBox="0 0 642 174">` wrappers don't change. CSS: `.mk-tab,.lk-rule{fill:var(--logo-accent,var(--red))}`. For one color, set `--logo-accent:currentColor`. Tested in Chrome with the site font (archivo-latin-var.woff2): the rule spans exactly LAB's inked width, and the 1-color override works through `<use>`. |
| `header-logo_light-on-dark.svg` | no live file (optional) | outlined SVG | Bone + red tabs/rule, for dark headers. |
| `header-logo_dark-on-light.svg` | no live file (optional) | outlined SVG | Ink + red tabs/rule. |

## Bid app icons: `app-icon/` (not copied into the bid app)
- `app-icon_master_1024.png` (+ `app-icon_master.svg`): 1024x1024, opaque, square, full Eave L with red tabs on Ink.
- `ios/`: AppIcon.appiconset-ready (`Contents.json` included). Sizes 20, 29, 40, 58, 60, 76, 80, 87, 120, 152, 167, 180, 1024 px. All are opaque RGB with no rounding; iOS applies the mask.
- `macos/`: AppIcon.appiconset-ready (`Contents.json`). Sizes 16, 32, 64, 128, 256, 512, 1024 px, on a macOS rounded-rect plate with the standard transparent margin.
- Size rule: full mark at 60 px and up. Below 60, the 16-px grid mark snapped to whole pixels: red tabs at 40-59 px, 1-color at 16-39 px (dark ground).
- For a PWA or Android build: use `../icon-512.png` and `ios/icon-180.png` (or the 1024 master).

Rebuild: `cd src && python3 web.py && python3 appicons.py`. The v3 handoff files are kept outside the kit at /workspace/lab-brand-kit-web-v3-backup/.
