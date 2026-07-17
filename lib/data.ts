export type ProjectCategory = "All" | "Web" | "Mobile" | "Design";

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: Exclude<ProjectCategory, "All">;
  tech: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  icon: string; // SVG path or URL
  category: "Frontend" | "Backend" | "Mobile" | "Tools";
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
}

export const personalInfo = {
  name: "Abdulloh Hisyam",
  role: "Junior Full-Stack Developer",
  taglines: [
    "Building modern web experiences",
    "Crafting clean, scalable code",
    "Turning ideas into products",
    "Exploring AI-powered solutions",
  ],
  bio: "Junior Full-Stack Developer yang berdedikasi dan adaptif, dengan fondasi kuat pada pengembangan web modern menggunakan Node.js, TypeScript, dan database relational. Senang mengeksplorasi teknologi baru — baik AI maupun non-AI — untuk memecahkan masalah nyata secara efisien.",
  experience: "2+ Tahun Belajar",
  projectsCount: "3+ Proyek Selesai",
  school: "SMK Telkom Malang",
  email: "sehunbolt@gmail.com",
  github: "https://github.com/AbdullohH12Y4M",
  linkedin: "https://linkedin.com/in/abdulloh-hisyam",
  twitter: "https://twitter.com/abdullohhisyam",
  cvUrl: "/cv.pdf",
  avatar: "/avatar.jpg",
  location: "Malang, Jawa Timur",
};

export const projects: Project[] = [
  {
    slug: "pdam-web-suite",
    title: "PDAM Web Suite",
    description: "Aplikasi web pengelolaan utilitas publik dengan visualisasi data konsumsi air real-time.",
    longDescription:
      "Aplikasi berbasis web yang dirancang khusus untuk pengelolaan utilitas publik (PDAM). Mempermudah pengelolaan tagihan pelanggan, verifikasi pembayaran, serta menyajikan visualisasi data konsumsi air secara real-time bagi administrator. Menerapkan SSR tingkat lanjut pada Next.js untuk mempercepat pemuatan awal dan query optimasi dengan Prisma ORM — berhasil meningkatkan TTI sebesar 30.2%.",
    category: "Web",
    tech: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "Prisma ORM", "Tailwind CSS", "Git"],
    image: "/DAshbord-PDAM.jpeg",
    githubUrl: "https://github.com/AbdullohH12Y4M/pdam",
    featured: true,
  },
  {
    slug: "tefa-catalog",
    title: "Tefa Catalog",
    description: "Platform katalog digital untuk memamerkan produk inovasi Teaching Factory SMK Telkom Malang.",
    longDescription:
      "Platform katalog digital yang memamerkan dan mengarsipkan produk, inovasi, serta karya kreatif Teaching Factory (Tefa) siswa SMK Telkom Malang. Menggunakan MongoDB yang fleksibel dikombinasikan dengan Prisma ORM untuk type safety, dan ISR pada Next.js agar halaman statis tetap cepat namun dinamis. Berhasil mengintegrasikan 50+ produk inovasi dengan load time di bawah 1.5 detik.",
    category: "Web",
    tech: ["NestJS", "Next.js", "MongoDB", "Prisma ORM", "TypeScript"],
    image: "/Catalog.jpeg",
    githubUrl: "https://github.com/LoushenLung/Tefa-Our-Website-Catalog-",
    featured: true,
  },
  {
    slug: "sneaker-ecommerce",
    title: "Sneaker E-Commerce",
    description: "Aplikasi mobile e-commerce sneaker cross-platform dengan pengalaman belanja yang mulus.",
    longDescription:
      "Aplikasi mobile e-commerce khusus penjualan produk sneaker yang memberikan pengalaman belanja cepat dan interaktif secara cross-platform. Dilengkapi katalog interaktif, manajemen keranjang, proses checkout, dan integrasi pengiriman pesanan ke admin. Hasil refactor arsitektur berhasil meningkatkan kelancaran navigasi dan zero-latency pada pengiriman data formulir.",
    category: "Mobile",
    tech: ["React Native", "Expo", "TypeScript", "RESTful API", "Git"],
    image: "/Sneaker-ECommerce.jpeg",
    githubUrl: "https://github.com/AbdullohH12Y4M/FE_Sneaker",
    featured: true,
  },
];

export const skills: Skill[] = [
  // Frontend
  { name: "HTML", icon: "html5", category: "Frontend" },
  { name: "CSS", icon: "css3", category: "Frontend" },
  { name: "React", icon: "react", category: "Frontend" },
  { name: "Next.js", icon: "nextdotjs", category: "Frontend" },
  { name: "TypeScript", icon: "typescript", category: "Frontend" },
  { name: "Tailwind CSS", icon: "tailwindcss", category: "Frontend" },
  // Backend
  { name: "Node.js", icon: "nodedotjs", category: "Backend" },
  { name: "NestJS", icon: "nestjs", category: "Backend" },
  { name: "PostgreSQL", icon: "postgresql", category: "Backend" },
  { name: "MongoDB", icon: "mongodb", category: "Backend" },
  { name: "Prisma", icon: "prisma", category: "Backend" },
  { name: "RESTful API", icon: "fastapi", category: "Backend" },
  // Mobile
  { name: "React Native", icon: "react", category: "Mobile" },
  { name: "Expo", icon: "expo", category: "Mobile" },
  // Tools
  { name: "Git", icon: "git", category: "Tools" },
  { name: "GitHub", icon: "github", category: "Tools" },
  { name: "Vercel", icon: "vercel", category: "Tools" },
];

export const testimonials: Testimonial[] = [];
