# ⚡ Personal Portfolio v2 — Code. Create. Conquer.

A dark, poster-inspired Full Stack Developer portfolio with Matrix rain, AOS animations, custom cursor, and a working direct message contact form.

## ✨ Features

- 🟢 Neon green "Coder" poster theme
- 🌧️ Matrix rain background (canvas)
- 🖱️ Custom neon cursor with trail
- 💻 Loader screen with progress bar
- ✍️ Typewriter role animation
- 📸 Scan-line photo frame with corner brackets
- 🔢 Animated stat counters
- 🎞️ AOS scroll animations (third-party)
- 📩 **Working contact form** via Formspree (no backend!)
- 📱 Fully responsive + mobile menu
- ♿ Reduced motion support

## 📁 File Structure

```
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   ├── photo.jpg     ← Add your photo here
│   └── resume.pdf    ← Add your CV here
└── README.md
```

## ✏️ Quick Customization Checklist

### index.html — Replace These:
| Placeholder | Replace With |
|------------|-------------|
| `Your Name` | Your actual name |
| `YN` (logo) | Your initials |
| `your@email.com` | Your email |
| `yourusername` | Your GitHub / LinkedIn handle |

### js/main.js — Change Roles:
```js
const roles = [
  'Full Stack Developer',
  'React & Node.js Engineer',
  // Add your own roles here
];
```

### Add Your Photo:
In `index.html`, find `.photo-placeholder` div and replace it with:
```html
<img src="assets/photo.jpg" alt="Your Name" />
```

## 📩 Setting Up the Contact Form

The form uses **Formspree** (free, no backend needed).

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form → copy your **Form ID** (e.g. `xpwrqdkz`)
3. Open `js/main.js` and replace:
   ```js
   const FORMSPREE_ID = 'YOUR_FORM_ID'; // ← paste your ID here
   ```
4. Done! Messages will be emailed to you directly.

> Until you add a real form ID, the form runs in **demo mode** — it shows a success message but doesn't send anything.

## 🚀 Deploy to GitHub Pages

1. Create a GitHub repo named `portfolio` (or `yourusername.github.io`)
2. Upload all files (drag & drop on GitHub)
3. Go to **Settings → Pages → Source → main → / (root) → Save**

Live at: `https://yourusername.github.io/portfolio/`

## 🎨 Change Colors

Edit the CSS variables at the top of `css/style.css`:

```css
:root {
  --neon:    #39ff78;  /* Main green neon */
  --bg:      #080c0a;  /* Background */
  /* Change to blue (#00b4ff), purple (#a855f7), etc. */
}
```

---

*Code. Create. Conquer.* 🚀
