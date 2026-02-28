'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiPlus, FiMinus, FiTrash2, FiCheck, FiTruck, FiShoppingBag } from 'react-icons/fi';
import { MenuItem } from '@/types';
import { formatPrice, calculateTax, calculateDeliveryFee } from '@/lib/utils';
import { useCartStore } from '@/stores/cartStore';
import { MenuItemSkeleton } from '@/components/ui/Skeleton';
import Input from '@/components/ui/Input';
import toast from 'react-hot-toast';

export default function OrderPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deliveryType, setDeliveryType] = useState<'delivery'|'pickup'>('pickup');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [address, setAddress] = useState({ street: '', city: '', state: '', zipCode: '' });
  const { items, addItem, removeItem, updateQuantity, clearCart, getTotal } = useCartStore();

  useEffect(() => {
    fetch('/api/menu').then(r => r.json()).then(d => { setMenuItems(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const subtotal = getTotal();
  const tax = calculateTax(subtotal);
  const deliveryFee = deliveryType === 'delivery' ? calculateDeliveryFee(subtotal) : 0;
  const total = subtotal + tax + deliveryFee;

  const handlePlaceOrder = async () => {
    if (items.length === 0) { toast.error('Your cart is empty'); return; }
    setIsCheckingOut(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, deliveryType, deliveryAddress: deliveryType === 'delivery' ? address : undefined, paymentMethod: 'card' }),
      });
      if (res.ok) {
        const order = await res.json();
        setOrderNumber(order.orderNumber);
        clearCart();
        setOrderPlaced(true);
        toast.success('Order placed successfully!');
      } else { toast.error('Failed to place order'); }
    } catch { toast.error('Something went wrong'); } finally { setIsCheckingOut(false); }
  };

  if (orderPlaced) {
    return (
      <main className="min-h-screen pt-20 bg-dark-900 flex items-center justify-center">
        <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} className="max-w-md w-full mx-4 glass rounded-3xl p-10 text-center border border-gold-400/30">
          <div className="w-20 h-20 bg-gold-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck size={36} className="text-gold-400" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-cream mb-4">Order Placed!</h2>
          <p className="text-cream/60 mb-2">Your order number is:</p>
          <p className="text-gold-400 font-mono font-bold text-xl mb-6">{orderNumber}</p>
          <div className="space-y-3 mb-8">
            {['Order Received', 'Preparing', 'Ready'].map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i === 0 ? 'bg-gold-400' : 'bg-dark-600'}`}>
                  {i === 0 ? <FiCheck size={14} className="text-dark-900" /> : <span className="text-cream/40 text-xs">{i+1}</span>}
                </div>
                <span className={i === 0 ? 'text-cream' : 'text-cream/40'}>{step}</span>
              </div>
            ))}
          </div>
          <button onClick={() => setOrderPlaced(false)} className="px-8 py-3 bg-gold-400 text-dark-900 font-semibold rounded-xl hover:bg-gold-500">
            Order Again
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-serif text-4xl font-bold text-cream mb-8">Order Online</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-cream mb-4">Browse Menu</h2>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array(6).fill(0).map((_, i) => <MenuItemSkeleton key={i} />)}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {menuItems.map((item) => (
                  <div key={item._id} className="flex gap-3 p-4 bg-dark-700 rounded-xl border border-white/5">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-cream text-sm">{item.name}</p>
                      <p className="text-gold-400 text-sm font-semibold">{formatPrice(item.price)}</p>
                      <button onClick={() => { addItem(item); toast.success('Added!'); }} disabled={!item.available} className="mt-2 px-3 py-1 bg-gold-400 hover:bg-gold-500 text-dark-900 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50">
                        + Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart & Checkout */}
          <div className="space-y-4">
            <div className="glass rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-cream mb-4">Your Order</h2>
              {items.length === 0 ? (
                <div className="text-center py-8 text-cream/40">
                  <FiShoppingBag size={32} className="mx-auto mb-2" />
                  <p className="text-sm">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-4">
                    {items.map((item) => (
                      <div key={item.menuItem._id} className="flex items-center gap-3">
                        <div className="flex-1">
                          <p className="text-sm text-cream">{item.menuItem.name}</p>
                          <p className="text-xs text-gold-400">{formatPrice(item.menuItem.price)}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => updateQuantity(item.menuItem._id, item.quantity - 1)} className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center hover:border-gold-400"><FiMinus size={10} /></button>
                          <span className="text-xs text-cream w-5 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.menuItem._id, item.quantity + 1)} className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center hover:border-gold-400"><FiPlus size={10} /></button>
                          <button onClick={() => removeItem(item.menuItem._id)} className="ml-1 text-cream/40 hover:text-red-400"><FiTrash2 size={12} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
                    <div className="flex justify-between text-cream/60"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                    <div className="flex justify-between text-cream/60"><span>Tax (8%)</span><span>{formatPrice(tax)}</span></div>
                    {deliveryType === 'delivery' && <div className="flex justify-between text-cream/60"><span>Delivery</span><span>{deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</span></div>}
                    <div className="flex justify-between text-cream font-semibold text-base pt-2 border-t border-white/10"><span>Total</span><span className="text-gold-400">{formatPrice(total)}</span></div>
                  </div>
                </>
              )}
            </div>

            {/* Delivery options */}
            <div className="glass rounded-2xl p-6 border border-white/10">
              <h3 className="text-sm font-semibold text-cream mb-4">Order Type</h3>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {(['pickup', 'delivery'] as const).map((type) => (
                  <button key={type} onClick={() => setDeliveryType(type)} className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all ${deliveryType === type ? 'bg-gold-400 text-dark-900' : 'bg-dark-700 text-cream/60 border border-white/10'}`}>
                    {type === 'delivery' ? <FiTruck size={14} /> : <FiShoppingBag size={14} />}
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
              {deliveryType === 'delivery' && (
                <div className="space-y-3">
                  <Input label="Street Address" placeholder="123 Main St" value={address.street} onChange={(e) => setAddress({...address, street: e.target.value})} />
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="City" placeholder="New York" value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} />
                    <Input label="ZIP Code" placeholder="10001" value={address.zipCode} onChange={(e) => setAddress({...address, zipCode: e.target.value})} />
                  </div>
                </div>
              )}
            </div>

            <button onClick={handlePlaceOrder} disabled={isCheckingOut || items.length === 0} className="w-full py-4 bg-gold-400 hover:bg-gold-500 text-dark-900 font-bold rounded-xl transition-colors disabled:opacity-70">
              {isCheckingOut ? 'Placing Order...' : `Place Order · ${formatPrice(total)}`}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
