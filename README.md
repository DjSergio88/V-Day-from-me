# V-Day from Sergjo 💌

A tiny, playful web page that asks one question: **"Will you be my Valentine?"**

- The **Yes** button grows every time she tries **No**.
- After a few tries, the **No** button gets shy and starts dodging.
- Run out of excuses and **Yes** takes over the whole screen.
- Say yes and confetti flies, then she picks a date plan (dinner, coffee walk, movie night, or a surprise) and sends her answer straight back to me.

Built with plain HTML, CSS and JavaScript. No frameworks, no build step, no images to host.

## Files

```
index.html   the page (ask view + yes view)
style.css    the look: gradient, glass card, falling hearts, animations
script.js    the behavior, plus a CONFIG block at the top to edit
```

## Make it yours

Open `script.js` and edit the `CONFIG` block at the top:

| Setting | What it does |
| --- | --- |
| `from` | Your name, shown on the send button and in the page text |
| `noMessages` | What the "No" button says each time it's clicked |
| `dodgeAfter` | How many "No" clicks before the button starts running away |
| `growthPerNo` | How much bigger "Yes" gets per "No" click |
| `hearts` | The emoji that fall in the background |

To change the question or the date plans, edit `index.html` (the `<h1>` and the `.plan` buttons).

## Personalize the link

Add her name to the URL and it shows up on the page:

```
https://djsergio88.github.io/V-Day-from-Sergjo/?to=HerName
```

## Run it

Open `index.html` in a browser. That's it.

## Put it online (GitHub Pages)

1. Push these files to the repo's `main` branch.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then **Save**.
4. After a minute or two it's live at `https://djsergio88.github.io/V-Day-from-Sergjo/`.

## Notes

- Respects `prefers-reduced-motion`: falling hearts and confetti are turned off for people who ask their device for less motion.
- Works on phones and desktop.

Made with ❤️ by Sergjo.
