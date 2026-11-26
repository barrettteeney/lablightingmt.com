# Photo sources

Every photograph and graphic used by `brand-test/index.html`, where it came from, and where it appears.

## How the photos were chosen

- Only photos **already in this repository** are used. No new photo was downloaded.
- Celebright's own website could not be reached from the build environment (the host is blocked there), so **no additional official Celebright photos were fetched**. If more are wanted (a daytime shot showing the color-matched track, product close-ups, the app), add them to the repo or allow `celebright.com` in the environment and they can be added the same way.
- No photo is presented as a Lab Lighting install. Every caption reads "Celebright permanent lighting" plus a neutral description, and the footer and gallery carry the credit "Photos courtesy of Celebright".
- Photos the live site describes as a specific Flathead Valley home were **left out** (see "Not used").

## Provenance, as far as the repo records it

The repository does not record the original download URL for any photo. What it does record:

- The live homepage (`index.html` on `main`) captions its gallery "Photos: Celebright system installations" and its footer says "Photos courtesy of Celebright".
- All eight photos below are used on the live homepage today.

**Barrett: please confirm** that these eight are Celebright marketing photos Lab Lighting may use as an authorized dealer, and that none is a customer's home.

## Photos used

Each photo is published as WebP with a JPG fallback, in several widths, under `brand-test/media/`. Originals in `img/` are untouched.

| # | Used in | Published files (`brand-test/media/`) | Original in repo | Caption on the page | Alt text |
|---|---------|----------------------------------------|------------------|---------------------|----------|
| 1 | Hero plate; also the base of the share image `og.jpg` | `hero-800`, `hero-1200`, `hero-1613` (`.webp` + `.jpg`) | `img/hero.jpg` (1613 x 1017) | Celebright permanent lighting / Warm white | Two-story home at night with warm white permanent lighting along every roofline |
| 2 | Work section, "Night" half of the day/night panel | `warm-white-600`, `-900`, `-1200` | `img/warm-white.jpg` (1200 x 757) | Night / Warm white, every night. Photo: Celebright permanent lighting | Home at night with warm white permanent lighting along its gables and rooflines |
| 3 | Gallery, large tile | `blue-hour-600`, `-900`, `-1200` | `img/blue-hour.jpg` (1200 x 757) | Celebright permanent lighting / Cool accent scene | Home at dusk with cool teal and violet permanent lighting on its gables |
| 4 | Gallery | `two-tone-600`, `-900`, `-1200` | `img/two-tone.jpg` (1200 x 757) | Celebright permanent lighting / Two color zones | Home with separate color zones on its upper and lower rooflines |
| 5 | Gallery | `winter-roofline-600`, `-900`, `-1200` | `img/winter-roofline.jpg` (1200 x 757) | Celebright permanent lighting / Roofline in snow | Permanent lighting along a snow-covered roofline |
| 6 | Gallery | `multi-color-600`, `-900`, `-1200` | `img/multi-color.jpg` (1200 x 757) | Celebright permanent lighting / Multi-color scene | Home lit in a multi-color scene |
| 7 | Gallery | `pergola-600`, `-900`, `-1200` | `img/pergola.jpg` (1200 x 757) | Celebright permanent lighting / Pergola | Pergola lit with permanent lighting at night |
| 8 | Gallery, wide tile | `backyard-pool-600`, `-900`, `-1200` | `img/backyard-pool.jpg` (1200 x 757) | Celebright permanent lighting / Pool and fence line | Pool and fence line lit with permanent lighting |

Processing: resized with Lanczos, WebP quality 74, progressive JPG quality 78. No retouching, cropping in the file, flipping or color changes. Cropping on the page is done by the layout only.

## Not used, and why

| File | Why it was left out |
|------|---------------------|
| `img/modern-home.jpg` | The live site's process section says its example images are "the real plan and preview we made for a Flathead Valley home". This is the same house. Until Barrett confirms it is not a customer's home, it stays out. It would be the best match for the brand (dark modern exterior), so it is worth confirming. |
| `img/process-day.jpg`, `img/process-night.jpg`, `img/process-preview.jpg`, `img/process-photo-measure.jpg` | Same house as above (lights edited off/on, or measured over). Same reason. |
| `img/process-plan.jpg`, `img/process-estimate.jpg`, `img/process-measure.png` | Sample plan, estimate and roof-measurement graphics for that same house, in the old visual style. The new page draws its own diagrams. |
| `assets/fit/fit-tier1-v3`, `fit-tier2-v3`, `fit-tier3-v3` (`.jpg`/`.webp`) | Small (343 to 556 px wide), too low-resolution for the new layout. Captioned "Example installs" on the live site; origin not recorded. |
| `ads/LAB_Static_A_Last_Year_On_The_Ladder.jpg`, `ads/LAB_Static_B_Never_Come_Down.jpg`, `ads/LAB_Static_C_Every_Night.jpg` | Finished ad creatives with headline text, the old logo and a "Free design visit" button baked in. They reuse photos 1, 2 and 6 above. |

## There is no daytime photo

The day/night section needs a matched pair. The repo has no true daytime photo that is safe to use, so the "Day" half is a **drawing** (an eave section showing the track at the soffit edge) and only the "Night" half is a photograph. A real daytime photo showing the color-matched track would make this section stronger.

## Graphics made for this page (not photographs)

| File | What it is |
|------|------------|
| `media/og.jpg` (1200 x 630) | Share image: photo 1 with the Lab Lighting lockup, tagline and "Kalispell, MT / Flathead Valley" set over it. |
| `favicon.svg`, `favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`, `icon-512.png` | The Lattice L mark on the brand's near black. Drawn for this project. |
| `brand/logo-light.png`, `brand/logo-dark.png` | The new lockup as transparent PNGs, for the optional logo swap on the legal, QuickBooks and tool pages (see `LAUNCH.md`). |
| Inline SVG drawings in `index.html` | Logo, eave section, takeoff, scenes, finish match and app schematic. Drawn for this project. |

## Fonts

`media/fonts/` holds the latin subsets of Archivo and IBM Plex Mono, self-hosted so the page makes no third-party font request. Both are under the SIL Open Font License 1.1. Details in `media/fonts/README.txt`.
