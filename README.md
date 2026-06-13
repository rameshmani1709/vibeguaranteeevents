# Vibe Guarantee Events — Website

Premium, fully responsive static website. **Every Event. Guaranteed Vibes.**
Built with HTML + Tailwind CSS (Play CDN) + vanilla JS. No backend, no build step.

## Pages
- `index.html` — Home (hero, services, why-choose-us, about teaser, portfolio, testimonials, CTA)
- `about.html` — About Us (story, mission/vision/promise, why choose us)
- `services.html` — Services (6 services with details)
- `portfolio.html` — Portfolio / Gallery
- `contact.html` — Contact (form + details + Google Maps)
- `404.html` — Not-found page

## Brand
- Navy `#0A1F44` · Gold `#D4AF37` · White `#FFFFFF`
- Fonts: Marcellus (display) + Inter (body)
- Logo & favicons generated from your VG monogram → `assets/`

## ⚙️ Before you go live — edit these
1. **WhatsApp number** — replace `919999999999` with your real number (country code, no `+` or spaces) in `index.html`, `contact.html` and the generated pages. Search the project for `wa.me/919999999999`.
2. **Photos** — gallery/hero images currently use free Unsplash URLs. Swap them for your own event photos (drop files in `assets/` and update the `src`). Keep `loading="lazy"` and `alt` text.
3. **Google Maps** — the contact page embeds a Trichy map. To pin an exact address, open Google Maps → Share → Embed a map → paste the new `src` into the `<iframe>` in `contact.html`.
4. **Domain** — `CNAME` is set to `vibeguaranteeevents.com` (used by GitHub Pages). Remove it if you deploy elsewhere.

## Deploy (all free)
**GitHub Pages** — push these files to a repo → Settings → Pages → deploy from `main` branch, root. Keep `CNAME` for the custom domain.
**Netlify** — drag-and-drop this folder onto the Netlify dashboard, or connect the repo. No build command; publish directory = root.
**Vercel** — `vercel` / import repo. Framework preset = "Other"; output = root.

## SEO included
Unique titles/descriptions per page, canonical tags, Open Graph + Twitter cards, `robots.txt`, `sitemap.xml`, JSON-LD schema (LocalBusiness / EventManagement, Service list), `site.webmanifest`, and favicons.

## Notes
The contact form has no backend (static hosting). On submit it opens the visitor's email app pre-filled to `vibeguaranteeevents@gmail.com`. To capture submissions server-side later, connect a free form service (e.g. Formspree, Netlify Forms) by pointing the form's action there.

Tailwind runs via the Play CDN for zero-config hosting. For maximum performance you can later precompile Tailwind to a static CSS file, but it is not required.
