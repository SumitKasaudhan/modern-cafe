import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen pt-20 bg-dark-900 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-gold-400 text-sm tracking-widest uppercase mb-4">404 Error</p>
        <h1 className="font-serif text-7xl font-bold text-cream mb-4">404</h1>
        <p className="text-2xl font-serif text-cream/60 mb-4">Page Not Found</p>
        <p className="text-cream/40 max-w-md mx-auto mb-8">The page you&apos;re looking for has been moved or doesn&apos;t exist.</p>
        <Link href="/" className="inline-flex px-8 py-4 bg-gold-400 hover:bg-gold-500 text-dark-900 font-semibold rounded-full transition-all hover:scale-105">
          Return Home
        </Link>
      </div>
    </main>
  );
}
