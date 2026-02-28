'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { FiCheck, FiX } from 'react-icons/fi';
import { formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function AdminReservationsPage() {
  const { data: session, status } = useSession();
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/reservations').then(r => r.json()).then(d => { setReservations(Array.isArray(d) ? d : []); setLoading(false); }).catch(() => setLoading(false));
    }
  }, [status]);

  if (status === 'loading') return <main className="min-h-screen pt-20 bg-dark-900 flex items-center justify-center"><div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" /></main>;
  if (status === 'unauthenticated' || (session?.user as any)?.role !== 'admin') redirect('/login');

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/reservations/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: newStatus }) });
      setReservations(prev => prev.map(r => r._id === id ? { ...r, status: newStatus } : r));
      toast.success(`Reservation ${newStatus}`);
    } catch { toast.error('Failed to update'); }
  };

  const statusColors: Record<string, string> = {
    pending: 'text-yellow-400 bg-yellow-500/10',
    confirmed: 'text-green-400 bg-green-500/10',
    cancelled: 'text-red-400 bg-red-500/10',
  };

  return (
    <main className="min-h-screen pt-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-serif text-4xl font-bold text-cream mb-8">Reservation Management</h1>
        {loading ? <div className="text-center text-cream/40">Loading...</div> : reservations.length === 0 ? (
          <div className="text-center py-20 text-cream/40">No reservations yet</div>
        ) : (
          <div className="space-y-4">
            {reservations.map((res) => (
              <div key={res._id} className="glass rounded-xl p-5 border border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                  <div>
                    <p className="font-semibold text-cream">{res.name}</p>
                    <p className="text-sm text-cream/60">{res.email} · {res.phone}</p>
                    <p className="text-sm text-gold-400">{formatDate(res.date)} at {res.time} · {res.partySize} guests</p>
                    {res.occasion && <p className="text-xs text-cream/40">{res.occasion}</p>}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[res.status] || 'text-cream/40 bg-dark-600'}`}>{res.status}</span>
                    {res.status === 'pending' && (
                      <>
                        <button onClick={() => updateStatus(res._id, 'confirmed')} className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"><FiCheck size={14} /></button>
                        <button onClick={() => updateStatus(res._id, 'cancelled')} className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"><FiX size={14} /></button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
