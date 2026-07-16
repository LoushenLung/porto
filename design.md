# Design Guide — My Portfolio

Dokumen ini berisi aturan dan panduan desain profesional yang wajib diikuti selama pengembangan portfolio ini. Tujuannya adalah menjaga konsistensi visual, aksesibilitas, dan kualitas UX di seluruh halaman.

---

## 1. Design Philosophy

- **Clarity first** — setiap elemen harus punya tujuan yang jelas. Hindari dekorasi yang tidak memberi nilai.
- **Content-driven** — layout mengikuti konten, bukan sebaliknya.
- **Progressive enhancement** — tampilan dasar harus berfungsi penuh, fitur lanjutan bersifat tambahan.
- **Accessible by default** — desain dirancang agar bisa digunakan oleh semua orang, termasuk pengguna assistive technology.

---

## 2. Color System

### Palette Utama

| Token              | Value (Light) | Value (Dark) | Kegunaan                          |
|--------------------|---------------|--------------|-----------------------------------|
| `--color-bg`       | `#FAFAFA`     | `#0A0A0A`    | Background halaman utama          |
| `--color-surface`  | `#FFFFFF`     | `#111111`    | Card, modal, panel                |
| `--color-primary`  | `#1A1A1A`     | `#F5F5F5`    | Teks utama, heading               |
| `--color-secondary`| `#6B6B6B`     | `#A0A0A0`    | Teks sekunder, caption            |
| `--color-accent`   | `#2563EB`     | `#60A5FA`    | CTA button, link aktif, highlight |
| `--color-border`   | `#E5E5E5`     | `#2A2A2A`    | Garis pemisah, border card        |
| `--color-error`    | `#DC2626`     | `#F87171`    | Error state, validasi             |

### Aturan Warna

- Rasio kontras teks terhadap background minimal **4.5:1** (WCAG AA).
- Jangan gunakan warna sebagai satu-satunya cara menyampaikan informasi.
- Accent color hanya untuk elemen interaktif — bukan dekorasi.

---

## 3. Typography

### Font Stack

```
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Type Scale

| Token          | Size     | Line Height | Weight | Kegunaan               |
|----------------|----------|-------------|--------|------------------------|
| `text-xs`      | 12px     | 1.5         | 400    | Label kecil, metadata  |
| `text-sm`      | 14px     | 1.5         | 400    | Body kecil, caption    |
| `text-base`    | 16px     | 1.6         | 400    | Body utama             |
| `text-lg`      | 18px     | 1.5         | 500    | Subheading             |
| `text-xl`      | 20px     | 1.4         | 600    | Section title          |
| `text-2xl`     | 24px     | 1.3         | 700    | Heading medium         |
| `text-4xl`     | 36px     | 1.2         | 700    | Hero heading           |
| `text-6xl`     | 60px     | 1.1         | 800    | Display / nama         |

### Aturan Tipografi

- Maksimal **2 font family** dalam satu halaman.
- Gunakan font mono hanya untuk kode atau label teknis.
- Hindari `text-justify` — gunakan `text-left` untuk keterbacaan.
- Line length ideal: **60–80 karakter** per baris untuk body text.

---

## 4. Spacing System

Berbasis skala **4px** (Tailwind default spacing scale).

| Token    | Value  | Kegunaan umum                    |
|----------|--------|----------------------------------|
| `space-1`| 4px    | Gap antar ikon dan label         |
| `space-2`| 8px    | Padding internal elemen kecil    |
| `space-4`| 16px   | Padding card, gap antar item     |
| `space-6`| 24px   | Margin antar komponen            |
| `space-8`| 32px   | Padding section kecil            |
| `space-12`| 48px  | Margin antar section besar       |
| `space-16`| 64px  | Padding section hero             |
| `space-24`| 96px  | Jarak vertikal antar section     |

### Aturan Spacing

- Gunakan spacing yang konsisten dari skala — jangan magic number seperti `13px` atau `37px`.
- Padding vertikal section minimal **64px** di desktop, **40px** di mobile.
- Elemen dalam grup yang sama menggunakan spacing yang sama.

---

## 5. Layout & Grid

### Breakpoints

| Nama     | Min Width | Keterangan           |
|----------|-----------|----------------------|
| `sm`     | 640px     | Ponsel landscape     |
| `md`     | 768px     | Tablet               |
| `lg`     | 1024px    | Laptop               |
| `xl`     | 1280px    | Desktop              |
| `2xl`    | 1536px    | Wide screen          |

### Container

- Max width konten: **1200px**, centered dengan padding horizontal `24px` di mobile, `48px` di desktop.
- Gunakan CSS Grid untuk layout multi-kolom, Flexbox untuk alignment satu dimensi.

### Aturan Layout

- **Mobile-first** — desain mulai dari layar kecil, lalu scale up.
- Hindari horizontal scroll pada semua breakpoint.
- Section hero: full viewport height (`min-h-screen`) atau setidaknya **80vh**.
- Gambar dan media selalu menggunakan dimensi yang `responsive` dengan `max-width: 100%`.

---

## 6. Component Patterns

### Buttons

```
Primary   → bg-accent text-white, hover: opacity 90%, border-radius: 8px
Secondary → border border-primary text-primary, hover: bg-surface
Ghost     → text-accent, hover: underline atau bg-accent/10
Disabled  → opacity: 40%, cursor: not-allowed
```

- Ukuran minimum touch target: **44×44px** (WCAG 2.5.5).
- Semua button wajib punya `focus-visible` ring yang jelas.
- Teks button: singkat, action-oriented (`Download CV`, bukan `Click here`).

### Cards

- Border radius: `12px` (medium), `16px` (large).
- Shadow: subtle — gunakan `box-shadow: 0 1px 3px rgba(0,0,0,0.1)`, hindari shadow dramatis.
- Hover state: slight lift (`translateY(-2px)`) atau border color change.
- Padding internal card: minimal `24px`.

### Links

- Link navigasi: tanpa underline, gunakan warna atau weight untuk membedakan.
- Link inline dalam teks: selalu underline, warna accent.
- External link: tambahkan ikon external (`↗`) dan `target="_blank" rel="noopener noreferrer"`.

### Form Elements

- Label selalu visible (bukan placeholder-only).
- Focus state: border accent + outline ring.
- Error message: merah, di bawah field, dengan ikon.
- Input height: minimal `44px`.

---

## 7. Icons & Imagery

### Icons

- Gunakan satu library icon secara konsisten (direkomendasikan: **Lucide Icons** atau **Heroicons**).
- Ukuran default: `20px` (inline), `24px` (standalone).
- Icon dekoratif: `aria-hidden="true"`.
- Icon fungsional (tanpa label teks): wajib punya `aria-label`.

### Imagery

- Format: gunakan **WebP** dengan fallback PNG/JPG.
- Semua `<img>` wajib punya `alt` attribute yang deskriptif.
- Avatar/foto profil: rasio **1:1**, border-radius `50%` atau nilai besar.
- Project screenshot: rasio **16:9** atau **4:3**, konsisten di seluruh halaman.

---

## 8. Animation & Motion

### Prinsip

- Animasi harus **purposeful** — bantu pengguna memahami perubahan state, bukan sekadar indah.
- Durasi: pendek (**150–300ms**) untuk micro-interaction, maksimal **600ms** untuk transisi halaman.
- Easing: gunakan `ease-out` untuk elemen masuk, `ease-in` untuk elemen keluar.

### Aturan

- Selalu hormati `prefers-reduced-motion` — nonaktifkan animasi non-esensial jika aktif.
- Jangan animasi lebih dari **3 elemen sekaligus** dalam satu viewport.
- Scroll-triggered animation: hanya untuk konten yang sudah di-render, bukan yang masih loading.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 9. Accessibility (a11y)

- Struktur heading hierarkis: `h1` → `h2` → `h3`, tidak boleh loncat level.
- Semua halaman wajib bisa dinavigasi penuh menggunakan keyboard saja.
- Focus order harus logis dan mengikuti urutan visual.
- Color contrast minimum **4.5:1** untuk teks normal, **3:1** untuk teks besar (18px+).
- Gunakan semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) — bukan hanya `<div>`.
- Landmark regions wajib ada: satu `<main>`, satu `<header>`, satu `<footer>`.

---

## 10. Dark Mode

- Implementasi via CSS custom properties yang diubah di `:root[data-theme="dark"]` atau `@media (prefers-color-scheme: dark)`.
- Jangan sekadar invert warna — surface dan shadow perlu penyesuaian khusus.
- Pastikan semua state (hover, focus, active) tetap jelas di dark mode.
- Image dengan background transparan mungkin perlu variasi khusus untuk dark mode.

---

## 11. Performance

- Optimasi gambar: gunakan `next/image` untuk lazy loading dan format otomatis.
- Font loading: gunakan `font-display: swap` untuk mencegah invisible text.
- Hindari layout shift (CLS) — berikan dimensi eksplisit pada gambar dan media.
- Critical CSS di-inline, non-critical di-load async.
- Target Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1.

---

## 12. Naming Conventions (CSS / Tailwind)

- Gunakan Tailwind utility classes sebagai default.
- Custom class hanya jika pola diulang **3+ kali** dan tidak bisa diatasi dengan Tailwind.
- Nama custom class: kebab-case, deskriptif (`project-card`, `nav-link-active`).
- Hindari inline style kecuali untuk nilai dinamis yang tidak bisa di-handle Tailwind.

---

---

## 13. Page Structure — Recommended Sections

Urutan section berikut adalah susunan ideal untuk portfolio profesional. Ikuti urutan ini kecuali ada alasan kuat untuk menyimpang.

### 13.1 Navbar (Sticky + Minimal)

- Sticky di atas (`position: sticky; top: 0`) dengan `backdrop-blur` agar konten di belakangnya tetap terbaca.
- Konten: logo/nama di kiri, link navigasi di kanan, toggle dark mode (opsional).
- Di mobile: hamburger menu atau bottom nav.
- Hindari navbar yang terlalu penuh — maksimal **5 link navigasi**.
- Transisi background: transparan saat di hero, solid saat scroll ke bawah.

```
[ Logo / Nama ]          [ About  Skills  Projects  Contact ]  [ Dark Mode Toggle ]
```

### 13.2 Hero Section (Nama Besar + Tagline + Tombol)

- Tinggi: `min-h-screen` atau `100svh`.
- Hierarki visual yang jelas:
  1. **Nama** — `text-6xl`, font weight 800, paling dominan.
  2. **Role/Tagline** — `text-xl` atau `text-2xl`, warna sekunder.
  3. **Deskripsi singkat** — 1–2 kalimat, `text-base`, maks 80 karakter per baris.
  4. **CTA Buttons** — Primary (`Download CV`) + Secondary (`View Projects` atau `Contact Me`).
- Elemen pendukung opsional: foto/avatar, animasi typing, subtle background pattern.
- Scroll indicator di bagian bawah (panah atau teks "Scroll down").

### 13.3 About Me (Foto + Bio + Pengalaman Singkat)

- Layout dua kolom di desktop: foto di satu sisi, teks di sisi lain.
- Foto: rasio 1:1 atau 3:4, border-radius besar, objek `object-cover`.
- Konten teks:
  - Bio singkat (3–5 kalimat): siapa kamu, apa yang kamu kerjakan, apa yang kamu pedulikan.
  - Highlight pengalaman: tahun pengalaman, jumlah project, atau pencapaian kunci.
  - Link ke CV/resume (tombol sekunder atau ghost).
- Hindari menceritakan terlalu banyak — fokus pada nilai yang kamu bawa.

### 13.4 Skills / Tech Stack (Dengan Ikon)

- Tampilkan hanya skill yang benar-benar dikuasai — kualitas > kuantitas.
- Layout: grid ikon dengan label, atau grouped per kategori (Frontend, Backend, Tools).
- Gunakan ikon resmi dari **Simple Icons** (`simpleicons.org`) atau **Devicons**.
- Opsional: progress bar atau level indicator (gunakan dengan hati-hati, jangan overpromise).
- Urutan: teknologi utama dulu, lalu supporting tools.

```
[ React ]  [ Next.js ]  [ TypeScript ]  [ Tailwind ]  [ Node.js ]  [ PostgreSQL ]
```

### 13.5 Featured Projects (3–6 Project Terbaik)

- Ini adalah section terpenting — investasikan waktu di sini.
- Layout: grid 2–3 kolom di desktop, 1 kolom di mobile.
- Setiap project card wajib berisi:
  - **Screenshot/thumbnail** — rasio 16:9 atau 4:3, konsisten.
  - **Nama project** — jelas dan deskriptif.
  - **Deskripsi singkat** — 1–2 kalimat, fokus pada masalah yang diselesaikan.
  - **Tech stack** — badge/chip kecil.
  - **Link** — Live demo + Source code (GitHub).
- Featured project (terbaik): tampilkan lebih besar, layout landscape.
- Filter by category opsional jika project banyak (>6).

### 13.6 Testimonials (Opsional tapi Powerful)

- Hanya tambahkan jika punya testimoni nyata — jangan buat yang palsu.
- Layout: carousel atau grid 2–3 kolom.
- Setiap testimonial wajib:
  - Kutipan langsung dalam tanda petik.
  - Nama lengkap + jabatan + perusahaan.
  - Foto profil (opsional tapi meningkatkan kepercayaan).
- Sumber: LinkedIn recommendations, klien, atau kolega.

### 13.7 Contact / CTA

- Section terakhir sebelum footer — pastikan mudah ditemukan.
- Opsi layout:
  - **Minimalis**: Heading besar + email yang bisa diklik + tombol.
  - **Form**: Input nama, email, pesan + tombol kirim.
- Sertakan link ke platform lain: GitHub, LinkedIn, Twitter/X.
- CTA utama harus satu dan jelas: "Let's Work Together" atau "Get in Touch".
- Hindari form yang terlalu panjang — nama + email + pesan sudah cukup.

### 13.8 Footer

- Konten minimal: copyright, nama, link navigasi sekunder, social icons.
- Bukan tempat untuk konten penting — user yang sampai footer berarti sudah scroll penuh.
- Warna: sedikit lebih gelap dari background, atau dengan border atas tipis.

```
© 2025 Nama Kamu  ·  Built with Next.js  ·  [ GitHub ]  [ LinkedIn ]  [ Twitter ]
```

---

## 14. Design Tips

### Font

- **Inter** — pilihan aman, sangat readable, cocok untuk portfolio technical.
- **Satoshi** — lebih modern dan stylish, cocok untuk portfolio creative/full-stack.
- Gunakan hanya **satu font family** untuk portfolio — variasi lewat weight dan size, bukan family berbeda.
- Load via `next/font` untuk performa optimal dan zero layout shift.

```tsx
// Contoh dengan next/font
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'], display: 'swap' })
```

### Warna

- Gunakan **1 accent color** + warna netral — cukup, tidak perlu lebih.
- **Dark theme lebih modern** untuk portfolio developer — gunakan sebagai default, dengan opsi light.
- Rekomendasi accent: `#2563EB` (biru klasik), `#7C3AED` (ungu modern), `#059669` (hijau fresh), atau `#F59E0B` (amber bold).
- Background dark: `#0A0A0A` (hampir hitam) atau `#0F172A` (slate dark) — hindari `#000000` murni.

### Tooling

- Gunakan **[v0.dev](https://v0.dev)** untuk generate komponen UI dengan cepat menggunakan prompt teks.
- Hasilnya sudah berbasis React + Tailwind — langsung bisa di-paste ke project Next.js.
- Gunakan sebagai starting point, lalu sesuaikan dengan design system di dokumen ini.

---

*Dokumen ini hidup dan dapat diperbarui seiring perkembangan proyek. Setiap perubahan signifikan pada sistem desain harus direfleksikan di sini.*
