import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'react-hot-toast';
import Providers from './providers';

export const metadata: Metadata = {
  title: {
    default: 'Modern Café — Premium Luxury Dining',
    template: '%s | Modern Café',
  },
  description: 'Experience the pinnacle of luxury dining at Modern Café. Premium coffee, exquisite cuisine, and an unparalleled atmosphere.',
  keywords: ['luxury cafe', 'premium coffee', 'fine dining', 'restaurant'],
  openGraph: {
    title: 'Modern Café — Premium Luxury Dining',
    description: 'Experience the pinnacle of luxury dining at Modern Café.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-dark-900 text-cream font-sans antialiased">
        <Providers>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1a1a1a',
                color: '#f5f0e8',
                border: '1px solid #d4af37',
              },
              success: {
                iconTheme: {
                  primary: '#d4af37',
                  secondary: '#1a1a1a',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
