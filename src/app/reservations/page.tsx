'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import SectionHeading from '@/components/shared/SectionHeading';
import Input from '@/components/ui/Input';
import toast from 'react-hot-toast';
import Image from 'next/image';

const timeSlots = ['12:00 PM','12:30 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM','6:00 PM','6:30 PM','7:00 PM','7:30 PM','8:00 PM','8:30 PM','9:00 PM'];
const occasions = ['Birthday','Anniversary','Business Lunch','Business Dinner','Date Night','Family Gathering','Casual Dining'];

export default function ReservationsPage() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', date:'', time:'', partySize:'2', occasion:'', specialRequests:'' });
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name) errs.name = 'Name is required';
    if (!form.email) errs.email = 'Email is required';
    if (!form.phone) errs.phone = 'Phone is required';
    if (!form.date) errs.date = 'Date is required';
    if (!form.time) errs.time = 'Time is required';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, partySize: parseInt(form.partySize) }),
      });
      if (res.ok) {
        setConfirmed(true);
        toast.success('Reservation confirmed!');
      } else {
        toast.error('Failed to book reservation');
      }
    } catch { toast.error('Something went wrong'); } finally { setLoading(false); }
  };

  if (confirmed) {
    return (
      <main className="min-h-screen pt-20 bg-dark-900 flex items-center justify-center">
        <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} className="max-w-md w-full mx-4 glass rounded-3xl p-10 text-center border border-gold-400/30">
          <div className="w-20 h-20 bg-gold-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck size={36} className="text-gold-400" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-cream mb-4">Reservation Confirmed!</h2>
          <p className="text-cream/60 mb-2">Thank you, <strong className="text-cream">{form.name}</strong>!</p>
          <p className="text-cream/60 mb-6">We look forward to welcoming you on <strong className="text-gold-400">{form.date}</strong> at <strong className="text-gold-400">{form.time}</strong> for <strong className="text-gold-400">{form.partySize} guests</strong>.</p>
          <p className="text-cream/40 text-sm">A confirmation has been sent to {form.email}</p>
          <button onClick={() => setConfirmed(false)} className="mt-6 px-8 py-3 bg-gold-400 text-dark-900 font-semibold rounded-xl hover:bg-gold-500 transition-colors">
            Make Another Reservation
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20 bg-dark-900">
      <div className="relative h-64 overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920" alt="Reservations" fill className="object-cover" />
        <div className="absolute inset-0 bg-dark-900/70 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gold-400 text-sm tracking-widest uppercase mb-2">Book Your Experience</p>
            <h1 className="font-serif text-4xl font-bold text-cream">Make a Reservation</h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 border border-white/10 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input label="Full Name" placeholder="John Smith" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} error={errors.name} />
            <Input label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} error={errors.email} />
            <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} error={errors.phone} />
            <div>
              <label className="block text-sm font-medium text-cream/70 mb-1.5">Party Size</label>
              <select value={form.partySize} onChange={(e) => setForm({...form, partySize: e.target.value})} className="w-full bg-dark-700 border border-white/10 rounded-xl py-3 px-4 text-cream focus:outline-none focus:border-gold-400">
                {Array.from({length: 20}, (_, i) => i+1).map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-cream/70 mb-1.5">Date</label>
              <input type="date" value={form.date} min={new Date().toISOString().split('T')[0]} onChange={(e) => setForm({...form, date: e.target.value})} className={`w-full bg-dark-700 border rounded-xl py-3 px-4 text-cream focus:outline-none focus:border-gold-400 ${errors.date ? 'border-red-500' : 'border-white/10'}`} />
              {errors.date && <p className="mt-1 text-xs text-red-400">{errors.date}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-cream/70 mb-1.5">Occasion (Optional)</label>
              <select value={form.occasion} onChange={(e) => setForm({...form, occasion: e.target.value})} className="w-full bg-dark-700 border border-white/10 rounded-xl py-3 px-4 text-cream focus:outline-none focus:border-gold-400">
                <option value="">Select occasion...</option>
                {occasions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-cream/70 mb-2">Select Time</label>
            {errors.time && <p className="mb-2 text-xs text-red-400">{errors.time}</p>}
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setForm({...form, time: slot})}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${form.time === slot ? 'bg-gold-400 text-dark-900' : 'bg-dark-700 text-cream/60 hover:text-cream border border-white/10'}`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-cream/70 mb-1.5">Special Requests</label>
            <textarea
              value={form.specialRequests}
              onChange={(e) => setForm({...form, specialRequests: e.target.value})}
              rows={3}
              placeholder="Dietary requirements, special arrangements..."
              className="w-full bg-dark-700 border border-white/10 rounded-xl py-3 px-4 text-cream placeholder-cream/30 focus:outline-none focus:border-gold-400 resize-none"
            />
          </div>

          <button type="submit" disabled={loading} className="w-full py-4 bg-gold-400 hover:bg-gold-500 text-dark-900 font-bold rounded-xl text-base transition-colors disabled:opacity-70">
            {loading ? 'Confirming...' : 'Confirm Reservation'}
          </button>
        </form>
      </div>
    </main>
  );
}
