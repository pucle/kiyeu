import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Thiệp Mời Kỉ Yếu Của Púc',
  description: 'Thiệp mời kỉ yếu của Đình Púc - Ngày 18/4/2026 tại THPT Chuyên Lê Quý Đôn, Đà Nẵng. Chọn khung giờ chụp ảnh của bạn nhế :DD',
  openGraph: {
    title: 'Thiệp Mời Kỉ Yếu Của Púc',
    description: 'Thiệp mời kỉ yếu của Đình Púc - Ngày 18/4/2026 tại THPT Chuyên Lê Quý Đôn, Đà Nẵng. Chọn khung giờ chụp ảnh của bạn nhế :DD',
    url: 'https://kiyeu-jf8v.vercel.app/',
    siteName: 'Kỉ Yếu Của Púc',
    images: [
      {
        url: '/preview.png',
        width: 1200,
        height: 630,
        alt: 'Thiệp Mời Kỉ Yếu Của Púc',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thiệp Mời Kỉ Yếu Của Púc',
    description: 'Thiệp mời kỉ yếu của Đình Púc - Ngày 18/4/2026 tại THPT Chuyên Lê Quý Đôn, Đà Nẵng. Chọn khung giờ chụp ảnh của bạn nhế :DD',
    images: ['/preview.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Crimson+Pro:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Courier+Prime:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
