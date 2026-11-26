# Lab Lighting: website handoff (v3 official logo)

Official logo (v3): a thin Red #C5322D rule between LAB and LIGHTING, exactly as wide as LAB. The icon stays one color.
These files are staged only. Nothing here changes the live site until someone swaps them in.

| File | Replaces on the live site (main) | Notes |
|---|---|---|
| `logo-light.png` | `/logo-light.png` | 1284x348 RGBA, transparent. Bone #F6F3EE lockup + red rule. Used in the headers of privacy.html, terms.html, legal/privacy.html, tools/quote.html and qbo/connect.html. |
| `logo-dark.png` | `/logo-dark.png` | 1284x348 RGBA, transparent. Ink #151515 lockup + red rule. |
| `og.jpg` | `/media/og.jpg` | 1200x630. Built from the live og (main @ ea3b93a): same photo, panel, "LIGHT, BY DESIGN." line and caption; only the lockup now has the red rule. |
| `lockup-symbol_with-rule.html` | the `<symbol id="lockup">` block in `/index.html` (+ one CSS line) | Adds `<rect class="lk-rule" x="236.5" y="137" width="414" height="5.5"/>` and `.lk-rule{fill:#C5322D}` (or `var(--red)`). |
| `header-logo_light-on-dark.svg` | no live file; optional | Standalone outlined SVG (Bone + red rule) for dark headers, if a page wants an SVG instead of the inline symbol or PNG. |
| `header-logo_dark-on-light.svg` | no live file; optional | Same in Ink + red rule for light backgrounds. |

Rules
- Red appears in the logo only as the rule under LAB. Never in the icon: favicon.svg, favicon.ico, favicon-32.png, favicon.png, apple-touch-icon.png and icon-512.png stay as they are.
- The PNG and SVG lockups use the brand-kit geometry, which is slightly wider than the site's inline symbol, so in the 1284x348 PNGs the logo sits a few px shorter than the old one.
- The inline-symbol rule was checked in Chrome with the site font (archivo-latin-var.woff2): it spans exactly the inked width of LAB and sits centered in the LAB/LIGHTING gap.
