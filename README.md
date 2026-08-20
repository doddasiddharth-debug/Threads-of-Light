# Threads of Light

Website for **Threads of Light**, a youth-led nonprofit that raises awareness of a
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

## Brand

| File | Use |
| --- | --- |
| `assets/images/logo.png` | Transparent PNG. Used in the header, footer, and favicon |
| `assets/images/logo-white-bg.png` | Same mark on solid white, for slides and print |

The palette is drawn from the logo: indigo `#4A4BC4` (the butterfly) and
`#3B3A9E` (the ring) as accents, deep plum `#251C38` for the footer and CTA
band, over a warm cream base. All of it lives in the `:root` block at the top of
`style.css`, so a single edit there recolors the whole site.

Amber is deliberately reserved for the `.notice` component, so placeholder
warnings and crisis resources never read as brand decoration.

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
3. **Email addresses** — `hello@threadsoflight.org` and
   `stories@threadsoflight.org` appear across the site. Find and replace them
   with your real inboxes.
4. **Social links** — the Instagram links point at `instagram.com`. Update them
   in the footer (every page) and in `contact.html`.
   The logo files are ~380KB each. If page weight matters, run them through an
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
