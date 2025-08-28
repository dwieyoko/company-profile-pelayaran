# PT Pelayaran Nusantara - Company Profile Website

Website profil perusahaan untuk PT Pelayaran Nusantara, perusahaan pelayaran terkemuka di Indonesia yang menyediakan layanan transportasi laut dan logistik maritim.

## 🚢 Tentang Proyek

Website ini dibuat untuk menampilkan profil lengkap PT Pelayaran Nusantara, termasuk layanan, armada kapal, proyek yang telah dikerjakan, informasi investor, dan kesempatan karier.

## 📋 Fitur Utama

### Halaman-halaman Website:
1. **Beranda (index.html)** - Landing page dengan hero slider dan overview perusahaan
2. **Tentang Kami (tentang-kami.html)** - Sejarah, visi misi, dan tim manajemen
3. **Layanan (layanan.html)** - Detail layanan yang ditawarkan
4. **Armada Kapal (armada-kapal.html)** - Katalog kapal dan spesifikasi
5. **Proyek & Galeri (proyek-galeri.html)** - Portfolio proyek dan galeri foto
6. **Berita & Artikel (berita-artikel.html)** - Update berita dan artikel edukatif
7. **Investor (investor.html)** - Informasi untuk investor dan laporan keuangan
8. **Karier (karier.html)** - Lowongan kerja dan informasi karier
9. **Hubungi Kami (hubungi-kami.html)** - Informasi kontak dan form komunikasi

### Fitur Interaktif:
- **Responsive Design** - Optimal di desktop, tablet, dan mobile
- **Hero Slider** - Slideshow otomatis dengan navigasi manual
- **Interactive Forms** - Form kontak, aplikasi kerja, dan newsletter
- **Modal Windows** - Detail kapal, aplikasi kerja, dan galeri foto
- **Filter & Search** - Filter proyek, kapal, berita, dan lowongan kerja
- **Smooth Animations** - Transisi halus dan animasi scroll
- **WhatsApp Integration** - Tombol floating WhatsApp
- **Print Friendly** - Optimized untuk pencetakan

## 🛠️ Teknologi yang Digunakan

- **HTML5** - Struktur semantic dan modern
- **CSS3** - Styling dengan CSS Grid, Flexbox, dan CSS Variables
- **JavaScript (ES6+)** - Interaktivitas dan dynamic content
- **Font Awesome** - Icon library
- **Google Fonts** - Typography (Roboto & Montserrat)
- **Chart.js** - Grafik untuk halaman investor

## 📁 Struktur Proyek

```
company-profile-pelayaran/
├── index.html                 # Halaman beranda
├── tentang-kami.html         # Halaman tentang kami
├── layanan.html              # Halaman layanan
├── armada-kapal.html         # Halaman armada kapal
├── proyek-galeri.html        # Halaman proyek & galeri
├── berita-artikel.html       # Halaman berita & artikel
├── investor.html             # Halaman investor
├── karier.html               # Halaman karier
├── hubungi-kami.html         # Halaman hubungi kami
├── assets/
│   ├── css/
│   │   ├── style.css         # Main stylesheet
│   │   └── responsive.css    # Responsive styles
│   ├── js/
│   │   ├── main.js          # Core JavaScript
│   │   ├── gallery.js       # Gallery functionality
│   │   ├── news.js          # News page functionality
│   │   ├── investor.js      # Investor page functionality
│   │   ├── career.js        # Career page functionality
│   │   └── contact.js       # Contact page functionality
│   └── images/              # Image assets
└── README.md                # Dokumentasi proyek
```

## 🎨 Design System

### Color Palette:
- **Primary**: #1e3a8a (Navy Blue)
- **Secondary**: #3b82f6 (Blue)
- **Accent**: #0ea5e9 (Sky Blue)
- **Light Blue**: #dbeafe
- **Dark Blue**: #1e40af
- **Text Dark**: #1f2937
- **Text Light**: #6b7280
- **White**: #ffffff
- **Gray Variants**: #f9fafb, #f3f4f6, #e5e7eb

### Typography:
- **Headings**: Montserrat (400, 500, 600, 700)
- **Body Text**: Roboto (300, 400, 500, 700)

### Breakpoints:
- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: < 480px

## 🚀 Cara Menjalankan

1. **Clone atau download** proyek ini
2. **Buka file index.html** di web browser
3. Atau gunakan **local server** untuk development:
   ```bash
   # Menggunakan Python
   python -m http.server 8000
   
   # Menggunakan Node.js (http-server)
   npx http-server
   
   # Menggunakan PHP
   php -S localhost:8000
   ```

## 📱 Responsive Design

Website ini fully responsive dan telah dioptimasi untuk:
- **Desktop** (1024px+)
- **Tablet** (768px - 1023px)
- **Mobile** (480px - 767px)
- **Small Mobile** (< 480px)

## ⚡ Performance Features

- **Optimized Images** - Compressed dan lazy loading
- **Minified CSS/JS** - Reduced file sizes
- **Semantic HTML** - SEO friendly structure
- **Fast Loading** - Optimized for speed
- **Accessibility** - WCAG compliant

## 🔧 Customization

### Mengubah Warna:
Edit CSS variables di `assets/css/style.css`:
```css
:root {
    --primary-color: #1e3a8a;
    --secondary-color: #3b82f6;
    /* ... */
}
```

### Menambah Halaman Baru:
1. Buat file HTML baru
2. Copy struktur dari halaman existing
3. Update navigation di semua halaman
4. Tambahkan styling khusus jika diperlukan

### Mengubah Konten:
- **Teks**: Edit langsung di file HTML
- **Gambar**: Replace file di folder `assets/images/`
- **Styling**: Modify `assets/css/style.css`
- **Functionality**: Update file JavaScript terkait

## 📞 Kontak & Support

Untuk pertanyaan atau dukungan terkait website ini:
- **Email**: info@pelayarannusantara.com
- **Phone**: +62 21 1234 567
- **WhatsApp**: +62 812 3456 7890

## 📄 License

© 2024 PT Pelayaran Nusantara. All rights reserved.

---

**Dibuat dengan ❤️ untuk PT Pelayaran Nusantara**

## 🚀 Live Website
Website ini dapat diakses di: https://company-profile-pelayaran.netlify.app/

## 🔄 Auto Deployment
Website ini menggunakan auto deployment dari GitHub ke Netlify. Setiap perubahan di branch `main` akan otomatis ter-deploy.
