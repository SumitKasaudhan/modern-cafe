'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { FiShoppingBag, FiCalendar, FiUsers, FiMenu, FiDollarSign } from 'react-icons/fi';

const stats = [
  { label: 'Total Orders', value: '142', change: '+12%', icon: FiShoppingBag, color: 'bg-blue-500/20 text-blue-400' },
  { label: 'Revenue', value: '$12,840', change: '+8%', icon: FiDollarSign, color: 'bg-gold-400/20 text-gold-400' },
  { label: 'Reservations', value: '38', change: '+5%', icon: FiCalendar, color: 'bg-purple-500/20 text-purple-400' },
  { label: 'Customers', value: '891', change: '+15%', icon: FiUsers, color: 'bg-green-500/20 text-green-400' },
];

const quickLinks = [
  { href: '/admin/menu', icon: FiMenu, label: 'Manage Menu', desc: 'Add, edit, delete items' },
  { href: '/admin/orders', icon: FiShoppingBag, label: 'Orders', desc: 'View and manage orders' },
  { href: '/admin/reservations', icon: FiCalendar, label: 'Reservations', desc: 'Manage table bookings' },
];

export default function AdminPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <main className="min-h-screen pt-20 bg-dark-900 flex items-center justify-center"><div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" /></main>;
  }

  if (status === 'unauthenticated' || (session?.user as any)?.role !== 'admin') {
    redirect('/login');
  }

  return (
    <main className="min-h-screen pt-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-4xl font-bold text-cream">Admin Dashboard</h1>
            <p className="text-cream/50 mt-1">Welcome back, {session?.user?.name}</p>
          </div>
          <Link href="/" className="px-4 py-2 border border-white/20 text-cream/60 hover:text-cream rounded-xl text-sm transition-colors">
            View Site
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-5 border border-white/10">
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon size={20} />
              </div>
              <p className="text-2xl font-bold text-cream font-serif">{stat.value}</p>
              <p className="text-sm text-cream/50 mt-1">{stat.label}</p>
              <span className="text-xs text-green-400 mt-1 inline-block">{stat.change} this month</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickLinks.map(({ href, icon: Icon, label, desc }) => (
            <Link key={href} href={href} className="glass rounded-2xl p-6 border border-white/10 hover:border-gold-400/30 transition-all group">
              <Icon size={28} className="text-gold-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-cream mb-1">{label}</h3>
              <p className="text-sm text-cream/40">{desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
