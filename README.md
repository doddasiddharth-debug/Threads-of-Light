# Strands of Life

Website for **Strands of Life**, a youth-led nonprofit that raises awareness of a
different medical issue every month through the stories of the people living it.

Plain static HTML, CSS, and JavaScript. No build step, no dependencies, and it
deploys to GitHub Pages as-is.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home: mission, the current month's spotlight, featured stories |
| `about.html` | Who we are, our values, and how stories are handled |
| `stories.html` | Story archive with category filters |
| `calendar.html` | The twelve-month awareness calendar |
| `share-your-story.html` | Submission process, form, and FAQ |
| `get-involved.html` | Volunteer roles, chapters, other ways to help |
| `contact.html` | Contact details and message form |

Shared styles live in `assets/css/style.css` and shared behavior in
`assets/js/main.js`.

## Brand and design system

| File | Use |
| --- | --- |
| `assets/images/logo.png` | Transparent PNG, cropped to the mark. Used in the header, footer, favicon, and as the faint watermark behind the dark bands |
| `assets/images/logo-white-bg.png` | Same mark on solid white, for slides and print |

The visual language takes its cues from cancerkidsfirst.org: bold colour
blocking, big airy type, pill buttons, and one serif italic used as a
counterpoint. The colours are the organisation's own.

**Colour.** `--brand` (#3434AA), `--brand-deep` (#262682) and `--brand-darkest`
(#171756) are sampled from the mark — the butterfly is #3030A8, the ring runs
to violet, and `--violet` (#4A2C86) carries that into the sweeps behind the
action cards. They carry the nav, the page headers, the full-bleed bands and
the footer. `--gold` (#FFD34D) is for the big numbers, one word in a heading,
the "this month" flag and the outline on the action cards — loud and rare.
`--bg` is a warm off-white with a faint SVG grain. All of it lives in the
`:root` block at the top of `style.css`; retoning the site is an edit to the
three `--brand` lines.

The four month tones (`--rose`, `--sage`, `--sky`, `--plum`) sit deliberately
outside the brand palette: a story tag, a calendar card and an action card
need to be tellable apart at a glance. Each has a `-tint` for grounds and an
`-ink` that clears 4.5:1 on it.

Amber (`--warn`) is reserved for `.notice` — placeholder warnings and the
crisis line — so a warning never reads as brand decoration. It is darker and
oranger than the gold and always sits behind an icon in a bordered box.

**Type.** One geometric sans, **Outfit**, from the 62px hero down to the 11px
labels, plus **Libre Baskerville italic** for the pull quote and the story
quote card and nothing else. Big headings are set *light* — `h1` is weight 400
with tight tracking, `h2` is 500 — and weight comes back as size drops, so
card titles are 800 at 19–20px. Body is 17px. Don't put the serif on a second
element in the same viewport; it only works as the exception.

**Eyebrows** are 11px, 700, uppercase, 0.14em tracking, used as a *label* on a
block ("OUR MISSION", "CHAPTERS"), not as a rule-and-caps decoration above
every heading.

**Buttons** are all pills, 16px, 1px border on every variant so filled and
outlined sit at the same height, no shadow, no hover lift. On a dark ground
the outline goes white and the solid goes white-on-indigo (`.btn-light`,
`.btn-on-image`).

**Sections** are tall (`clamp(80px, 10vw, 140px)`) and alternate paper / indigo.
Every inner page opens on a `.page-hero` in `--brand`, so the nav runs straight
into it. There are no rules or borders between bands; the colour does the
separating.

**The logo is never recoloured** in the chrome. Its outer edge is its own
violet ring, so the cropped PNG is itself the nav disc: `.brand-mark` gives it
a white ground and a 2px inset. The only place it is filtered to white is as a
faint watermark (`.hero-mark`, `.tile-mark`) behind the indigo bands, where it
stands in for the photography the site doesn't have yet.

**Homepage blocks**, top to bottom: the hero band with the spotlight card and
the mark as watermark; the twelve-month strip (`.month-marquee`, rendered from
`AWARENESS_MONTHS`); the three "what we do" cards; the pull quote; the stat
mosaic (`.stat-mosaic`, three tiles); the four steps; the featured stories
(placeholders, with their notice); and the three tilted action cards
(`.action-section`).

**No photographs yet.** The design leans on photography of real people, and
the site has none. Every place a photo belongs is built to take one: add an
`<img>` as the first child of a `.stat-tile` or `.action-card` and the overlay
handles it; swap `.split-media` for an `<img>`; give a `.story-thumb` a
background image. Until then the mark and the month tones fill those slots.

**Cache-busting.** GitHub Pages serves CSS and JS with a ten-minute cache, so
`style.css` and `main.js` are linked with `?v=N` on every page. Bump N on every
change to either file, or visitors keep the old one.

## Running it locally

```bash
python3 -m http.server 4173
```

Then open <http://localhost:4173>. Any static file server works.

## Before you launch

The site ships with placeholder content so the layout is visible. Replace it:

1. **Stories** — swap the example cards in `stories.html` and `index.html` for
   real published submissions, then delete the yellow "Placeholder content"
   notices. Keep each card's `data-tag` matching one of the filter buttons.
2. **Team** — put real names, roles, and photos into `about.html`.
3. **Email addresses** — `hello@strandsoflife.org` and
   `stories@strandsoflife.org` appear across the site. Find and replace them
   with your real inboxes.
4. **Social links** — the Instagram links point at `instagram.com`. Update them
   in the footer (every page) and in `contact.html`.
   The logo files are ~330KB / ~255KB. If page weight matters, run them through an
   image compressor or export a small `logo-32.png` for the favicon.
5. **Forms** — the forms on `share-your-story.html` and `contact.html` post to
   `https://formspree.io/f/your-form-id`. A static site cannot send mail on its
   own, so create a free endpoint (Formspree, Getform, or a Google Form) and
   paste the URL into each `action`.
6. **Awareness months** — verify each month against a current source before
   campaigning on it. Awareness months differ by country and are occasionally
   reassigned.

## Editing the awareness calendar

The twelve months are defined once, in the `AWARENESS_MONTHS` array at the top
of `assets/js/main.js`. Editing an entry there updates both the calendar page
and the homepage spotlight, and the card for the current month is highlighted
automatically.

## Deploying to GitHub Pages

1. Push to `main`.
2. In the repository, go to **Settings → Pages**.
3. Under **Source**, pick **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. Save. The site publishes at `https://doddasiddharth-debug.github.io/Threads-of-Light/`.

## A note on medical content

Stories are personal experience, not medical advice, and the site says so in the
footer. Publish nothing without the storyteller's written approval, and take
anything down on request.
