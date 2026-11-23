# Eranga & Piyumi — Digital Wedding Invitation

A lightweight, mobile-first wedding invitation website built with React and Vite.
No backend, no database, no paid services. It deploys free on GitHub Pages.

## What's inside

- Opening screen with an "Open Invitation" button
- Hero, invitation message, live countdown, wedding details, venue with Google Maps directions, day schedule, closing
- Responsive navigation and smooth scrolling
- Background music with a play/pause button (never autoplays)
- Floral artwork drawn in SVG, so there are no image files to load

## Before you share it — things to fill in

Everything is in **one file: [`src/config/wedding.js`](src/config/wedding.js)**.

| What | Where in `wedding.js` | Notes |
| --- | --- | --- |
| Wedding date and time | `date.iso` | Date is set to 21 Dec 2026. **The time (9:00 AM) is still a placeholder.** Format: `2026-12-21T09:00:00+05:30` |
| Show the exact date | `date.isConfirmed` | While `false` the site shows "December 2026". The countdown always counts to `date.iso`. |
| Show the exact time | `date.isTimeConfirmed` | While `false` the site shows "Time to be announced" and the calendar entry is saved as all-day. Set to `true` once the time in `date.iso` is correct. |
| Flower cover on the calendar | `date.revealHint` | White and rose flowers hide the calendar days until a guest touches or hovers over them. This is the text shown on the flowers. |
| Calendar entry length | `date.durationHours` | Used by the "Save to Calendar" button, which appears once `isConfirmed` is `true`. The mini calendar circles the wedding day at the same time. |
| Names | `couple` | |
| Venue and map link | `venue` | To use an exact map pin: open the venue in Google Maps → Share → copy link → paste into `venue.mapsUrl`. |
| Invitation wording | `opening`, `hero`, `invitation`, `closing` | |
| Photographs | `photos` | Put `preshoot-1.jpg` (top of the page) and `preshoot-2.jpg` ("Our Story") in `public/images/`. Portrait or landscape both work and nothing is cropped. Until a file is there, that photo is simply left out. Save each about 1600 px on the longest side, under ~400 KB. `photos.story.caption` and `photos.story.text` hold the Our Story wording. |
| Share button | `closing.shareLabel`, `closing.shareText` | Opens WhatsApp with the text and the site's link. |
| RSVP | `rsvp` | `rsvp.whatsappContacts` lists who receives replies (`number` in digits only, international format, e.g. `94771234567`; `name` is the button text, or leave `''` to show the number). Guests choose "Joyfully Accept" or "Regretfully Decline", then tap a contact, which opens WhatsApp with the reply already written. With an empty list, guests are asked to reply to the message that brought the invitation. `rsvp.enabled: false` removes the section. |
| Schedule | `schedule` | Add, remove or reorder events. Leave `time: ''` to show "Time to be announced", or set e.g. `time: '9:00 AM'`. |
| Music | `music` | See below. |

Colours and fonts are at the top of [`src/styles/index.css`](src/styles/index.css).

## Sending a personal invitation (guest names)

Add `?to=` and the guest's name to the end of your link. Use `+` for spaces.

| Link you send | What the guest sees |
| --- | --- |
| `https://YOUR-USERNAME.github.io/wedding/` | No name (general invitation) |
| `https://YOUR-USERNAME.github.io/wedding/?to=Nimal+Perera` | "Dear Nimal Perera" |
| `https://YOUR-USERNAME.github.io/wedding/?to=Mr.+%26+Mrs.+Silva` | "Dear Mr. & Mrs. Silva" |
| `https://YOUR-USERNAME.github.io/wedding/?to=Kamal+and+Family` | "Dear Kamal and Family" |

The name appears on the opening screen and above the invitation message. Nothing needs rebuilding or redeploying: one site, a different link per guest.

- Write `&` as `%26` (or simply use the word "and").
- To change the word "Dear", edit `guest.greeting` in `wedding.js`.

## Adding the music

1. Choose a song you own or are licensed to use (or a royalty-free track).
2. Save it as `public/music/wedding-song.mp3`. Keep it under about 3 MB (MP3, 96–128 kbps) so it loads quickly on mobile data.
3. That's it. Guests tap the round music button (bottom-right) to play or pause.

Options in `wedding.js` → `music`:

- `playOnOpen: true` — start the music when the guest taps "Open Invitation".
- `enabled: false` — remove the music button entirely.
- `file` — use a different file name.

## Run it on your computer

You need [Node.js](https://nodejs.org) 18 or newer (the LTS version is fine).

```bash
npm install
```

```bash
npm run dev
```

Open the address it prints (usually http://localhost:5173). To test on your phone, run `npm run dev -- --host` and open the "Network" address while on the same Wi-Fi.

To make a production build and preview it:

```bash
npm run build
```

```bash
npm run preview
```

## Deploy free on GitHub Pages

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds and publishes the site every time you push.

1. Create a free account at [github.com](https://github.com) if you don't have one.
2. Create a new **public** repository, for example `wedding`. Don't add a README or .gitignore.
3. In this project folder, run (replace `YOUR-USERNAME` and `wedding`):

   ```bash
   git init
   git add .
   git commit -m "Wedding invitation"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/wedding.git
   git push -u origin main
   ```

4. On GitHub, open the repository → **Settings** → **Pages** → under **Build and deployment**, set **Source** to **GitHub Actions**.
5. Open the **Actions** tab and wait for "Deploy to GitHub Pages" to show a green tick (about a minute). If it ran before step 4, click **Re-run all jobs**.
6. Your invitation is live at `https://YOUR-USERNAME.github.io/wedding/`. Share that link on WhatsApp.

To update the invitation later, edit the files, then:

```bash
git add .
git commit -m "Update details"
git push
```

The site republishes automatically.

**About the Vite base path:** `vite.config.js` uses `base: './'`, so the site works under any repository name without changes.

## Project structure

```
├── index.html                  Page title, link-preview text, fonts
├── vite.config.js              Vite + GitHub Pages base path
├── public/
│   ├── favicon.svg
│   └── music/                  Put wedding-song.mp3 here
├── .github/workflows/deploy.yml
└── src/
    ├── config/wedding.js       ← all wedding details
    ├── App.jsx
    ├── main.jsx
    ├── styles/index.css        Colours, fonts and all styling
    ├── hooks/useCountdown.js
    ├── utils/date.js
    └── components/
        ├── OpeningScreen.jsx
        ├── Navbar.jsx
        ├── Hero.jsx
        ├── InvitationMessage.jsx
        ├── Countdown.jsx
        ├── WeddingDetails.jsx
        ├── Schedule.jsx
        ├── Closing.jsx
        ├── MusicPlayer.jsx
        ├── CoupleNames.jsx
        ├── SectionHeading.jsx
        ├── Reveal.jsx          Scroll-in animation wrapper
        └── decor/Florals.jsx   SVG roses, lavender and dividers
```

## WhatsApp link preview (optional)

The title and description shown when the link is pasted into WhatsApp are in `index.html` (`og:title`, `og:description`). To add a preview picture, put an image (1200×630) in `public/`, then add this line to `index.html` using your full site address:

```html
<meta property="og:image" content="https://YOUR-USERNAME.github.io/wedding/preview.jpg" />
```
