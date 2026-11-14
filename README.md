# V-Day from Sergjo 💌

A tiny, playful web page that asks one question: **"Will you be my Valentine?"**
Anyone can make their own version in seconds: type your name and hers, get a link, send it.

### 👉 Live site: https://djsergio88.github.io/V-Day-from-me/

## How it works

1. Open the **link maker** (the site's home page).
2. Type **your name** and **her name**, then tap **Make my link**.
3. Send her the link. Only the two names change; everything else is already done.

On her side:

- The **Yes** button grows every time she tries **No**.
- After a few tries, the **No** button gets shy and starts dodging.
- Run out of excuses and **Yes** takes over the whole screen.
- Say yes and confetti flies, then she picks a date plan (dinner, coffee walk, movie night, or a surprise) and sends her answer straight back to you.

Built with plain HTML, CSS and JavaScript. No frameworks, no build step, no images to host.

## Files

```
index.html   the link maker (home page)
ask.html     the question page she sees (ask view + yes view)
create.js    the link maker's logic
script.js    the question page's behavior, plus a CONFIG block to edit
style.css    the look: gradient, glass card, falling hearts, animations
```

## Link format

The question page reads two names from the link:

```
https://djsergio88.github.io/V-Day-from-me/ask.html?from=YourName&to=HerName
```

The link maker builds this for you. Names are limited to 30 characters and are always shown as plain text.

## Make it yours

Open `script.js` and edit the `CONFIG` block at the top:

| Setting | What it does |
| --- | --- |
| `from` | Default sender name, used only if a link has no `?from=` |
| `noMessages` | What the "No" button says each time it's clicked |
| `dodgeAfter` | How many "No" clicks before the button starts running away |
| `growthPerNo` | How much bigger "Yes" gets per "No" click |
| `hearts` | The emoji that fall in the background |

To change the question or the date plans, edit `ask.html` (the `<h1>` and the `.plan` buttons).

## Run it locally

Open `index.html` in a browser. That's it.

## Put it online (GitHub Pages)

1. Push these files to the repo's `main` branch.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then **Save**.
4. After a minute or two it's live at `https://djsergio88.github.io/V-Day-from-me/`.

The repo needs to be public for Pages on a free GitHub account.

## Notes

- Respects `prefers-reduced-motion`: falling hearts and confetti are turned off for people who ask their device for less motion.
- Works on phones and desktop.

Made with ❤️ by Sergjo.
