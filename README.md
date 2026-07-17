# Abdulloh Hisyam — Personal Portfolio

Portfolio website pribadi milik **Abdulloh Hisyam Alfaiyadh**, seorang Junior Full-Stack Developer dari Malang, Jawa Timur. Dibangun dengan Next.js 16, React 19, TypeScript, Tailwind CSS v4, dan Framer Motion.

---

## Daftar Isi

- [Tech Stack](#tech-stack)
- [Fitur](#fitur)
- [Struktur Proyek](#struktur-proyek)
- [Cara Kerja Aplikasi](#cara-kerja-aplikasi)
  - [Sistem Design Token](#sistem-design-token)
  - [Dark Mode](#dark-mode)
  - [Smooth Scroll](#smooth-scroll)
  - [Halaman Utama (Sections)](#halaman-utama-sections)
  - [Project Detail Page](#project-detail-page)
  - [Halaman 404](#halaman-404)
- [Data & Konfigurasi](#data--konfigurasi)
- [Komponen UI](#komponen-ui)
- [Cara Menjalankan](#cara-menjalankan)
- [Kustomisasi](#kustomisasi)
- [Build & Deploy](#build--deploy)

---

## Tech Stack

| Kategori | Library / Tool | Versi |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.10 |
| UI Library | React | 19.2.4 |
| Bahasa | TypeScript | ^5 |
| Styling | Tailwind CSS | ^4 |
| Animasi | Framer Motion | ^12 |
| Smooth Scroll | Lenis | ^1.3 |
| Icons | Lucide React + React Icons (FA6) | ^1.24 / ^5.7 |
| Font | Inter (via next/font/google) | — |
| Utilities | clsx + tailwind-merge | ^2 / ^3 |

---

## Fitur

- **Dark/Light Mode** — toggle dengan animasi, preferensi disimpan di localStorage
- **Smooth Scroll** — menggunakan Lenis untuk scrolling yang halus dan natural
- **Typing Animation** — tagline berubah secara dinamis dengan efek mengetik dan menghapus
- **Section Animations** — setiap section muncul dengan animasi saat masuk viewport (Framer Motion `useInView`)
- **Responsive** — mobile-first, tampil sempurna dari 320px hingga layar ultra-wide
- **Project Filter** — filter proyek berdasarkan kategori (All / Web / Mobile / Design) dengan animasi layout
- **Project Detail Page** — dynamic route `/projects/[slug]` dengan static generation
- **Copy Email** — tombol salin alamat email ke clipboard di section Contact
- **Download CV** — link langsung download file PDF
- **Social Links** — GitHub, LinkedIn, WhatsApp dengan spring hover animation dan tooltip
- **404 Page** — halaman not found dengan visual menarik
- **Loading Skeleton** — komponen skeleton siap pakai untuk project card
- **SEO** — metadata lengkap termasuk Open Graph di `layout.tsx`
- **Accessibility** — semantic HTML, focus-visible, aria-label, reduced-motion support

---

## Struktur Proyek

```
my-portfolio/
│
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout: font, metadata, providers
│   ├── page.tsx                  # Halaman utama (semua sections)
│   ├── globals.css               # Design tokens + base styles
│   ├── not-found.tsx             # Custom halaman 404
│   └── projects/
│       └── [slug]/
│           └── page.tsx          # Project detail (dynamic route)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Navbar sticky + dark mode toggle + mobile menu
│   │   └── Footer.tsx            # Footer dengan copyright + social links
│   │
│   ├── providers/
│   │   ├── ThemeProvider.tsx     # Context untuk dark/light mode
│   │   └── SmoothScrollProvider.tsx  # Inisialisasi Lenis
│   │
│   ├── sections/
│   │   ├── Hero.tsx              # Section hero: nama, typing, CTA, social
│   │   ├── About.tsx             # Section about: foto, bio, highlights
│   │   ├── Skills.tsx            # Section skills: grid ikon per kategori
│   │   ├── Projects.tsx          # Section projects: filter + card grid
│   │   ├── Testimonials.tsx      # Section testimonials (hidden jika kosong)
│   │   └── Contact.tsx           # Section contact: form + copy email
│   │
│   └── ui/
│       ├── ProjectCard.tsx       # Card komponen untuk setiap project
│       └── Skeleton.tsx          # Loading skeleton untuk project card
│
├── lib/
│   ├── data.ts                   # Semua data: personalInfo, projects, skills, testimonials
│   └── utils.ts                  # Helper: cn() untuk merge Tailwind classes
│
├── public/
│   ├── avatar.jpg                # Foto profil (perlu ditambahkan manual)
│   ├── cv.pdf                    # File CV untuk download (perlu ditambahkan manual)
│   └── projects/                 # Screenshot/thumbnail proyek (perlu ditambahkan manual)
│       ├── pdam.jpg
│       ├── tefa.jpg
│       └── sneaker.jpg
│
├── design.md                     # Panduan desain lengkap
├── myself.md                     # Data mentah dari resume/portofolio
├── next.config.ts                # Konfigurasi Next.js
├── tsconfig.json                 # Konfigurasi TypeScript
└── package.json
```

---

## Cara Kerja Aplikasi

### Sistem Design Token

Semua warna didefinisikan sebagai CSS custom properties di `app/globals.css`:

```css
:root {
  --color-bg:        #FAFAFA;   /* Background halaman */
  --color-surface:   #FFFFFF;   /* Background card/panel */
  --color-primary:   #1A1A1A;   /* Teks utama */
  --color-secondary: #6B6B6B;   /* Teks sekunder */
  --color-accent:    #2563EB;   /* Warna aksen (button, link) */
  --color-border:    #E5E5E5;   /* Border/garis */
  --color-error:     #DC2626;   /* State error */
}
```

Semua komponen menggunakan token ini via `var(--color-*)` sehingga tidak ada nilai warna hardcoded yang tersebar. Ketika dark mode aktif, `ThemeProvider` menambahkan attribute `data-theme="dark"` ke `<html>`, yang memicu override nilai token di CSS:

```css
[data-theme="dark"] {
  --color-bg:      #0A0A0A;
  --color-accent:  #60A5FA;
  /* dst... */
}
```

---

### Dark Mode

**File:** `components/providers/ThemeProvider.tsx`

Cara kerja:

1. Saat pertama kali load, `useEffect` membaca nilai dari `localStorage.getItem("theme")`.
2. Jika tidak ada, default ke `"dark"`.
3. Nilai theme disimpan dalam React state dan disebarkan via `ThemeContext`.
4. Setiap kali theme berubah, `ThemeProvider` menambah/menghapus class `.dark` dan attribute `data-theme` pada `document.documentElement`.
5. CSS custom properties langsung berubah, semua komponen ikut update tanpa re-render.
6. `suppressHydrationWarning` pada `<html>` di `layout.tsx` mencegah hydration mismatch antara SSR dan client.

Toggle dark mode ada di `Navbar.tsx` — menggunakan `AnimatePresence` dari Framer Motion untuk animasi rotate saat icon Sun/Moon berganti.

---

### Smooth Scroll

**File:** `components/providers/SmoothScrollProvider.tsx`

Menggunakan library **Lenis** yang menggantikan native scroll browser dengan scroll yang lebih mulus:

```ts
const lenis = new Lenis({
  duration: 1.2,           // Durasi animasi scroll
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Ease out expo
  touchMultiplier: 2,      // Kecepatan scroll di touchscreen
});
```

Lenis dijalankan lewat `requestAnimationFrame` loop agar sinkron dengan refresh rate layar. Cleanup dilakukan saat komponen unmount untuk mencegah memory leak.

---

### Halaman Utama (Sections)

**File:** `app/page.tsx`

Halaman utama merangkai semua sections secara berurutan:

```
Navbar → Hero → About → Skills → Projects → Testimonials → Contact → Footer
```

#### Navbar (`components/layout/Navbar.tsx`)

- Posisi `fixed` di atas, z-index 50.
- Scroll listener pasif memantau `window.scrollY`. Jika > 20px, background berubah dari `transparent` ke `bg/80 backdrop-blur-md` dengan border bawah.
- Link navigasi melakukan `scrollIntoView({ behavior: "smooth" })` ke section yang dituju.
- Di mobile (<768px), link tersembunyi dan diganti hamburger menu. Menu mobile muncul sebagai overlay dengan `AnimatePresence`.
- Dark mode toggle dengan rotasi animasi Sun ↔ Moon.

#### Hero (`components/sections/Hero.tsx`)

- **Background:** dua blur orb (gradient circle dengan `blur-[120px]`) dan dot grid pattern 28px.
- **Animasi masuk:** stagger animation — setiap child muncul berurutan dengan delay 120ms menggunakan `variants` Framer Motion.
- **Typing Animation:** state machine sederhana dengan 4 state: mengetik → pause → menghapus → ganti teks. Kecepatan 75ms/karakter saat mengetik, 35ms saat menghapus.
- **Nama:** dibagi dua bagian — first name warna solid, last name gradient CSS (`background-clip: text`).
- **Social buttons:** `SocialButton` component kecil dengan spring animation `whileHover`, warna hover berbeda per platform, tooltip muncul di atas.
- **Scroll indicator:** muncul setelah 1.8 detik, bounce animation infinite.

#### About (`components/sections/About.tsx`)

- Menggunakan `useInView` — animasi hanya trigger sekali saat section masuk viewport.
- **Foto dengan gradient border:** teknik tiga layer — div gradient sebagai background, div putih di atasnya sebagai "border", foto di dalam. Gradientnya 3 warna: biru → ungu → hijau.
- **Floating badge:** "Available for work" dengan ping animation hijau, diposisikan absolute di bawah foto.
- **Highlight cards:** 3 kartu (Pendidikan, Proyek, Spesialisasi) dengan warna ikon berbeda. Animasi stagger menggunakan `variants` container → children.
- **Tag cloud:** list skill/teknologi sebagai chips kecil dengan hover effect.

#### Skills (`components/sections/Skills.tsx`)

- Skills dikelompokkan per kategori: Frontend, Backend, Mobile, Tools.
- Icon diambil dari CDN **Simple Icons** (`https://cdn.simpleicons.org/{icon-name}`).
- Setiap icon card punya hover effect naik (`-translate-y-1`) dan border accent muncul.

#### Projects (`components/sections/Projects.tsx`)

- State `activeCategory` menyimpan filter aktif (default: "All").
- `useMemo` menyaring array `projects` setiap kali filter berubah.
- Grid menggunakan `motion.div` dengan `layout` prop — card yang masuk/keluar dianimasikan dengan `AnimatePresence mode="popLayout"`.
- Project pertama yang `featured: true` mendapat lebar 2 kolom (`sm:col-span-2 lg:col-span-2`).

#### Testimonials (`components/sections/Testimonials.tsx`)

- Jika array `testimonials` di `data.ts` kosong, seluruh section tidak dirender (`return null`).
- Aktifkan dengan mengisi array testimonials di `lib/data.ts`.

#### Contact (`components/sections/Contact.tsx`)

- **Copy email:** `navigator.clipboard.writeText()` menyalin email ke clipboard, icon berganti ke checkmark hijau selama 2 detik.
- **Form:** state `FormStatus` ("idle" | "sending" | "success" | "error"). Saat submit, spinner muncul di tombol. Saat ini disimulasikan dengan `setTimeout` — perlu diganti dengan integrasi EmailJS atau Resend.
- **Social links:** GitHub, LinkedIn, Twitter/X.

#### Footer (`components/layout/Footer.tsx`)

- Menampilkan tahun dinamis (`new Date().getFullYear()`), nama, dan social links.
- Icon brand menggunakan `react-icons/fa6` karena Lucide React v1.x sudah menghapus brand icons.

---

### Project Detail Page

**File:** `app/projects/[slug]/page.tsx`

- **Static Generation:** `generateStaticParams()` men-generate semua slug dari `lib/data.ts` saat build, sehingga setiap halaman proyek di-pre-render sebagai static HTML.
- **Metadata dinamis:** `generateMetadata()` menghasilkan `<title>` dan `<description>` unik per proyek.
- Jika slug tidak ditemukan di data, `notFound()` dipanggil untuk merender halaman 404.
- Menampilkan: hero image, judul, deskripsi panjang, tech stack badges, link GitHub + Live Demo, dan "More Projects" dari kategori yang sama.

---

### Halaman 404

**File:** `app/not-found.tsx`

- Angka "404" besar dengan efek blur glow di belakangnya (layer kedua blur + opacity rendah).
- Background dot grid pattern dengan CSS `radial-gradient`.
- Dua tombol navigasi: "Go home" dan "View projects".

---

## Data & Konfigurasi

Semua data terpusat di satu file: **`lib/data.ts`**

### `personalInfo`

Berisi semua info personal: nama, role, taglines typing animation, bio, email, URL sosial, path avatar, path CV, dan lokasi.

### `projects`

Array of `Project` objects. Setiap proyek memiliki:

| Field | Tipe | Keterangan |
|---|---|---|
| `slug` | string | ID unik, dipakai sebagai URL (`/projects/slug`) |
| `title` | string | Nama proyek |
| `description` | string | Deskripsi singkat (tampil di card) |
| `longDescription` | string | Deskripsi panjang (tampil di detail page) |
| `category` | "Web" / "Mobile" / "Design" | Kategori untuk filter |
| `tech` | string[] | Daftar teknologi yang dipakai |
| `image` | string | Path gambar di `/public/projects/` |
| `liveUrl` | string? | URL live demo (opsional) |
| `githubUrl` | string? | URL repository GitHub (opsional) |
| `featured` | boolean | Jika `true`, card tampil lebih besar di posisi pertama |

### `skills`

Array of `Skill` objects dengan field `name`, `icon` (slug Simple Icons), dan `category`.

### `testimonials`

Array of `Testimonial` objects. Kosongkan array ini jika belum punya testimoni — section otomatis tersembunyi.

---

## Komponen UI

### `ProjectCard`

Menerima props `project`, `index` (untuk stagger delay), dan `featured` (lebar 2 kolom).

### `Skeleton` & `ProjectCardSkeleton`

Komponen loading state dengan `animate-pulse`. `ProjectCardSkeleton` mereplikasi layout `ProjectCard` secara skeleton. Gunakan saat data sedang di-fetch.

### `cn()` utility

```ts
// lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

Dipakai untuk menggabungkan Tailwind classes secara kondisional tanpa konflik.

---

## Cara Menjalankan

### Prasyarat

- Node.js 18+
- npm / yarn / pnpm

### Instalasi

```bash
# Clone repo
git clone https://github.com/LoushenLung/porto.git
cd porto

# Install dependencies
npm install

# Jalankan dev server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Tambahkan Aset

Sebelum tampil sempurna, tambahkan file berikut ke folder `public/`:

```
public/
├── avatar.jpg          # Foto profil kamu
├── cv.pdf              # File CV untuk download
└── projects/
    ├── pdam.jpg        # Screenshot PDAM Web Suite
    ├── tefa.jpg        # Screenshot Tefa Catalog
    └── sneaker.jpg     # Screenshot Sneaker E-Commerce
```

---

## Kustomisasi

### Ganti Data Personal

Edit `lib/data.ts`, ubah objek `personalInfo`:

```ts
export const personalInfo = {
  name: "Nama Kamu",
  email: "email@kamu.com",
  github: "https://github.com/username",
  // dst...
};
```

### Tambah Proyek Baru

Tambahkan entry baru ke array `projects` di `lib/data.ts`:

```ts
{
  slug: "nama-proyek",          // URL-friendly, tanpa spasi
  title: "Nama Proyek",
  description: "Deskripsi singkat.",
  longDescription: "Deskripsi panjang untuk detail page.",
  category: "Web",              // "Web" | "Mobile" | "Design"
  tech: ["React", "Node.js"],
  image: "/projects/nama-proyek.jpg",
  liveUrl: "https://...",       // opsional
  githubUrl: "https://...",     // opsional
  featured: false,
}
```

### Setup Contact Form (EmailJS)

Di `components/sections/Contact.tsx`, ganti bagian simulasi dengan kode EmailJS:

```ts
import emailjs from "@emailjs/browser";

const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus("sending");
  try {
    await emailjs.send(
      "YOUR_SERVICE_ID",
      "YOUR_TEMPLATE_ID",
      { name: form.name, email: form.email, message: form.message },
      "YOUR_PUBLIC_KEY"
    );
    setStatus("success");
  } catch {
    setStatus("error");
  }
};
```

Install dulu: `npm install @emailjs/browser`

### Ganti Accent Color

Di `app/globals.css`, ubah `--color-accent`:

```css
:root {
  --color-accent: #7C3AED; /* ungu */
}
[data-theme="dark"] {
  --color-accent: #A78BFA;
}
```

---

## Build & Deploy

```bash
# Build production
npm run build

# Jalankan production server
npm start

# Lint
npm run lint
```

### Deploy ke Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Atau connect repo langsung di [vercel.com](https://vercel.com) untuk auto-deploy setiap push ke `main`.

---

## Lisensi

Proyek ini bersifat pribadi. Silakan gunakan sebagai referensi atau inspirasi.

---

*Dibuat oleh **Abdulloh Hisyam Alfaiyadh** — SMK Telkom Malang, Rekayasa Perangkat Lunak.*
