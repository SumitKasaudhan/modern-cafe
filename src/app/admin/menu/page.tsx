'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { FiPlus, FiEdit, FiTrash2, FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import { MenuItem } from '@/types';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function AdminMenuPage() {
  const { data: session, status } = useSession();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/menu').then(r => r.json()).then(d => { setItems(d); setLoading(false); }).catch(() => setLoading(false));
    }
  }, [status]);

  if (status === 'loading') return <main className="min-h-screen pt-20 bg-dark-900 flex items-center justify-center"><div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" /></main>;
  if (status === 'unauthenticated' || (session?.user as any)?.role !== 'admin') redirect('/login');

  const toggleAvailability = async (item: MenuItem) => {
    try {
      await fetch(`/api/menu/${item._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ available: !item.available }) });
      setItems(prev => prev.map(i => i._id === item._id ? { ...i, available: !i.available } : i));
      toast.success(`${item.name} ${item.available ? 'disabled' : 'enabled'}`);
    } catch { toast.error('Failed to update item'); }
  };

  const deleteItem = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;
    try {
      await fetch(`/api/menu/${id}`, { method: 'DELETE' });
      setItems(prev => prev.filter(i => i._id !== id));
      toast.success('Item deleted');
    } catch { toast.error('Failed to delete item'); }
  };

  return (
    <main className="min-h-screen pt-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-4xl font-bold text-cream">Menu Management</h1>
          <button className="flex items-center gap-2 px-4 py-2 bg-gold-400 text-dark-900 font-semibold rounded-xl hover:bg-gold-500 transition-colors">
            <FiPlus size={16} /> Add Item
          </button>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array(6).fill(0).map((_, i) => <div key={i} className="h-24 bg-dark-700 rounded-xl animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <div key={item._id} className="glass rounded-xl p-4 border border-white/10 flex gap-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-cream text-sm line-clamp-1">{item.name}</p>
                  <p className="text-gold-400 text-sm">{formatPrice(item.price)}</p>
                  <p className="text-xs text-cream/40">{item.category}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <button onClick={() => toggleAvailability(item)} className="text-cream/40 hover:text-gold-400 transition-colors">
                    {item.available ? <FiToggleRight size={18} className="text-green-400" /> : <FiToggleLeft size={18} />}
                  </button>
                  <button className="text-cream/40 hover:text-gold-400 transition-colors"><FiEdit size={14} /></button>
                  <button onClick={() => deleteItem(item._id, item.name)} className="text-cream/40 hover:text-red-400 transition-colors"><FiTrash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
