# Management Article - Platform Manajemen Artikel

Platform manajemen artikel modern yang dibangun dengan Next.js untuk mengelola, menampilkan, dan berbagi artikel dengan antarmuka yang responsif dan user-friendly.

## 👨‍💻 Pembuat

**Fatwa Akbar Jiwani**

## 🚀 Fitur Utama

### 📝 Manajemen Artikel

- **CRUD Artikel**: Buat, baca, update, dan hapus artikel
- **Kategori**: Organisasi artikel berdasarkan kategori
- **Pencarian**: Fitur pencarian artikel berdasarkan judul
- **Filter**: Filter artikel berdasarkan kategori
- **Pagination**: Navigasi halaman yang smooth

### 👤 Sistem Autentikasi

- **Registrasi**: Pendaftaran user baru
- **Login**: Autentikasi user
- **Profil User**: Manajemen profil pengguna
- **Dashboard**: Panel kontrol untuk user

### 🎨 Antarmuka Modern

- **Responsive Design**: Optimal di desktop, tablet, dan mobile
- **Modern UI**: Menggunakan Tailwind CSS dan komponen modern
- **Loading States**: Indikator loading yang smooth
- **Error Handling**: Penanganan error yang user-friendly

## 🛠️ Teknologi yang Digunakan

### Frontend

- **Next.js 15.3.4** - React framework dengan App Router
- **React 19** - Library UI
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling framework
- **Lucide React** - Icon library

### Form & Validation

- **React Hook Form** - Form management
- **Zod** - Schema validation
- **@hookform/resolvers** - Form validation integration

### UI Components

- **Radix UI** - Accessible UI primitives
- **Class Variance Authority** - Component variants

### Utilities

- **Axios** - HTTP client
- **SweetAlert2** - Beautiful alerts

## 📁 Struktur Project

```
management_article/
├── app/                    # Next.js App Router
│   ├── account/           # Halaman profil user
│   ├── detailArticles/    # Halaman detail artikel
│   ├── logins/           # Halaman login
│   ├── registers/        # Halaman registrasi
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Halaman utama
├── components/           # Reusable components
│   ├── ArticleCard.tsx   # Komponen kartu artikel
│   ├── AuthCard.tsx      # Komponen autentikasi
│   ├── Footer.tsx        # Footer
│   ├── listArticles.tsx  # Daftar artikel
│   ├── Navbar.tsx        # Navigation bar
│   └── UserProfile.tsx   # Profil user
├── public/              # Static assets
└── package.json         # Dependencies
```

## 🚀 Cara Menjalankan Project

### Prerequisites

- Node.js (versi 18 atau lebih baru)
- npm, yarn, pnpm, atau bun

### Instalasi

1. **Clone repository**

```bash
git clone <repository-url>
cd management_article
```

2. **Install dependencies**

```bash
npm install
# atau
yarn install
# atau
pnpm install
# atau
bun install
```

3. **Setup environment variables**
   Buat file `.env.local` di root project:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000/api
```

4. **Jalankan development server**

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
# atau
bun dev
```

5. **Buka browser**
   Kunjungi [http://localhost:3000](http://localhost:3000) untuk melihat aplikasi.

## 📝 Scripts yang Tersedia

- `npm run dev` - Menjalankan development server dengan Turbopack
- `npm run build` - Build aplikasi untuk production
- `npm run start` - Menjalankan production server

## 🎯 Fitur Detail

### Halaman Utama

- Hero section dengan background image
- Filter kategori dropdown
- Search bar untuk pencarian artikel
- Grid layout untuk menampilkan artikel
- Pagination untuk navigasi

### Komponen Artikel

- Gambar thumbnail artikel
- Judul dan konten preview
- Kategori dan author tags
- Tanggal publikasi
- Click untuk melihat detail

### Responsive Design

- Mobile-first approach
- Breakpoints untuk tablet dan desktop
- Flexible grid system
- Touch-friendly interface

## 🔧 Konfigurasi

### Tailwind CSS

Project menggunakan Tailwind CSS v4 dengan konfigurasi custom untuk:

- Custom colors dan spacing
- Responsive breakpoints
- Component variants

### TypeScript

- Strict type checking
- Interface definitions untuk data models
- Type safety untuk props dan state

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Kontribusi

Kontribusi selalu diterima! Silakan buat pull request atau laporkan issues.

## 📄 Lisensi

Project ini dibuat untuk tujuan pembelajaran dan pengembangan.

---

**Dibuat dengan ❤️ oleh Fatwa Akbar Jiwani**
