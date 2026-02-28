'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { formatPrice, formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';

const statuses = ['received', 'preparing', 'ready', 'out_for_delivery', 'delivered'];
const statusColors: Record<string, string> = {
  received: 'bg-blue-500/20 text-blue-400',
  preparing: 'bg-yellow-500/20 text-yellow-400',
  ready: 'bg-green-500/20 text-green-400',
  out_for_delivery: 'bg-orange-500/20 text-orange-400',
  delivered: 'bg-gray-500/20 text-gray-400',
};

export default function AdminOrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/orders').then(r => r.json()).then(d => { setOrders(Array.isArray(d) ? d : []); setLoading(false); }).catch(() => setLoading(false));
    }
  }, [status]);

  if (status === 'loading') return <main className="min-h-screen pt-20 bg-dark-900 flex items-center justify-center"><div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" /></main>;
  if (status === 'unauthenticated' || (session?.user as any)?.role !== 'admin') redirect('/login');

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/orders/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: newStatus }) });
      setOrders(prev => prev.map(o => o._id === id ? { ...o, status: newStatus } : o));
      toast.success('Order status updated');
    } catch { toast.error('Failed to update order'); }
  };

  return (
    <main className="min-h-screen pt-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-serif text-4xl font-bold text-cream mb-8">Order Management</h1>
        {loading ? <div className="text-center text-cream/40">Loading...</div> : orders.length === 0 ? (
          <div className="text-center py-20 text-cream/40">No orders yet</div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="glass rounded-xl p-5 border border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                  <div>
                    <p className="font-mono text-sm text-gold-400">{order.orderNumber}</p>
                    <p className="text-cream font-medium">{order.deliveryType === 'delivery' ? 'Delivery' : 'Pickup'} · {order.items?.length} items</p>
                    <p className="text-xs text-cream/40">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-cream font-semibold">{formatPrice(order.total)}</span>
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className={`text-xs px-3 py-1.5 rounded-full font-medium border-0 focus:outline-none ${statusColors[order.status] || 'bg-gray-500/20 text-gray-400'}`}
                    >
                      {statuses.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                    </select>
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
