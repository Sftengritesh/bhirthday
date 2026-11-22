# 🖼️ IMAGE GUIDE — Pranjal's Birthday Universe

This guide explains exactly which images go where, what filenames to use, recommended sizes, and how to swap them out.

---

## 📂 Directory Structure

```
public/
├── images/
│   ├── portrait/
│   │   └── pranjal-dotted-portrait.jpg       ← Main portrait (REQUIRED)
│   ├── memories/
│   │   ├── photo-1.jpg
│   │   ├── photo-2.jpg
│   │   ├── photo-3.jpg
│   │   ├── photo-4.jpg
│   │   └── photo-5.jpg
│   ├── kittens/
│   │   ├── kitten-1.png
│   │   ├── kitten-2.png
│   │   ├── kitten-3.png
│   │   └── kitten-4.png
│   ├── decorations/
│   │   ├── flowers.png
│   │   ├── balloons.png
│   │   ├── butterflies.png
│   │   ├── coconut.png
│   │   └── hearts.png
│   └── cake/
│       ├── cake-base.png
│       └── cake-decoration.png
└── audio/
    ├── background-music.mp3
    └── cake-celebration.mp3
```

---

## 🎭 Portrait (Page 01 — Portrait Reveal)

| Filename | `public/images/portrait/pranjal-dotted-portrait.jpg` |
|----------|------------------------------------------------------|
| Format   | JPG or PNG                                           |
| Size     | Recommended: 800×960px (portrait orientation)        |
| Notes    | Should be a black-and-white or high-contrast portrait. The particle system samples this image to reconstruct it from thousands of glowing dots. The original dotted/stipple texture will be preserved. |

**To replace:** Simply overwrite `pranjal-dotted-portrait.jpg` with your image.  
**If missing:** The app shows a beautiful procedurally-generated placeholder portrait automatically.

---

## 📸 Memory Photos (Page 04 — Moments Worth Keeping)

| File       | Caption (editable in `src/pages/Memories.jsx`) |
|------------|------------------------------------------------|
| `photo-1.jpg` | "That smile."                               |
| `photo-2.jpg` | "Simply being you."                         |
| `photo-3.jpg` | "A moment worth remembering."               |
| `photo-4.jpg` | "Some pictures need no explanation."        |
| `photo-5.jpg` | "Rare and radiant."                         |

**Recommended size:** 800×1000px (portrait) or 1000×800px (landscape) — both work.  
**Format:** JPG or PNG  
**If missing:** An elegant dark placeholder with a camera icon appears automatically.

### How to edit captions:
Open `src/pages/Memories.jsx` and find the `PHOTOS` array near the top. Edit the `caption` and `sub` fields:

```js
const PHOTOS = [
  { id: 1, src: '/images/memories/photo-1.jpg', caption: 'Your caption here', sub: 'Sub caption here' },
  ...
]
```

### How to add more photos:
Add more entries to the `PHOTOS` array in `Memories.jsx` and add corresponding files to `public/images/memories/`.

---

## 🐱 Kitten Images (Page 09 — Kitten Parade)

The kittens are currently emoji-based with beautiful card animations. If you want to use custom kitten illustrations:

| File          | Used for                |
|---------------|-------------------------|
| `kitten-1.png` | Birthday hat kitten    |
| `kitten-2.png` | Flower-holding kitten  |
| `kitten-3.png` | Gift-box kitten        |
| `kitten-4.png` | Heart-holding kitten   |

**Recommended size:** 400×400px square  
**Format:** PNG with transparent background preferred  
To use them, update `src/pages/Kittens.jsx` and replace emoji with `<img>` tags.

---

## 🎂 Cake Images (Page 08 — Cake Cutting)

The cake is currently built with CSS/SVG animations (no image needed). If you want to use custom cake artwork:

| File               | Used for                |
|--------------------|-------------------------|
| `cake-base.png`    | Custom cake base image  |
| `cake-decoration.png` | Decorative overlay  |

**Recommended size:** 600×600px  
To use: Edit `src/pages/Cake.jsx` and replace the SVG `<CakeIllustration>` component.

---

## 🎵 Audio Files

| File                | Used for                                        |
|---------------------|-------------------------------------------------|
| `background-music.mp3` | Ambient romantic background music (optional) |
| `cake-celebration.mp3` | Celebration burst on cake cut (optional)    |

**Notes:**
- Audio does **not** autoplay — only triggers after user interaction
- Use properly licensed royalty-free audio (e.g., from Pixabay, Free Music Archive, ccMixter)
- Recommended formats: MP3 (best compatibility) or OGG
- Background music: soft instrumental, romantic, ~3–5 min looping
- Celebration sound: short burst ~3–5 seconds

---

## ✏️ How to Customize

### Change captions in memories:
Edit the `PHOTOS` array in `src/pages/Memories.jsx`

### Change personality card text:
Edit the `CARDS` array in `src/pages/CoconutGirl.jsx`

### Change letter content:
Edit the `LETTER_LINES` array in `src/pages/Letter.jsx`

### Change kitten messages:
Edit the `KITTENS` array in `src/pages/Kittens.jsx`

### Change colors:
Edit `tailwind.config.js` — the color palette is in the `extend.colors` section.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

*All images are optional — the app gracefully shows beautiful placeholders when images are missing.*
