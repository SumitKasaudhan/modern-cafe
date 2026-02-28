'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { FiUser, FiPackage, FiCalendar, FiSettings } from 'react-icons/fi';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  if (status === 'unauthenticated') redirect('/login');

  if (status === 'loading') {
    return <main className="min-h-screen pt-20 bg-dark-900 flex items-center justify-center"><div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" /></main>;
  }

  return (
    <main className="min-h-screen pt-20 bg-dark-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-serif text-4xl font-bold text-cream mb-8">My Profile</h1>
        <div className="glass rounded-3xl p-8 border border-white/10">
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/10">
            {session?.user?.image ? (
              <Image src={session.user.image} alt={session.user.name || 'User'} width={80} height={80} className="rounded-full border-2 border-gold-400" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gold-400/20 flex items-center justify-center border-2 border-gold-400">
                <FiUser size={32} className="text-gold-400" />
              </div>
            )}
            <div>
              <h2 className="font-serif text-2xl font-semibold text-cream">{session?.user?.name}</h2>
              <p className="text-cream/50">{session?.user?.email}</p>
              <span className="text-xs bg-gold-400/20 text-gold-400 border border-gold-400/30 px-3 py-1 rounded-full mt-2 inline-block">
                {(session?.user as any)?.role || 'Member'}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[{ icon: FiPackage, label: 'My Orders', desc: 'View order history' }, { icon: FiCalendar, label: 'Reservations', desc: 'Manage bookings' }, { icon: FiSettings, label: 'Settings', desc: 'Account preferences' }].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="p-4 rounded-xl bg-dark-700 border border-white/5 hover:border-gold-400/30 transition-colors cursor-pointer">
                <Icon size={24} className="text-gold-400 mb-2" />
                <p className="font-medium text-cream text-sm">{label}</p>
                <p className="text-xs text-cream/40">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
