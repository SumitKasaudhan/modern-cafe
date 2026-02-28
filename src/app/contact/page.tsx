'use client';
import { useState } from 'react';
import Image from 'next/image';
import { FiMapPin, FiPhone, FiMail, FiClock, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import SectionHeading from '@/components/shared/SectionHeading';
import Input from '@/components/ui/Input';
import toast from 'react-hot-toast';

const faqs = [
  { q: 'Do you offer private dining?', a: 'Yes, we have a private dining room accommodating up to 20 guests. Contact us to discuss your requirements.' },
  { q: 'Is there parking available?', a: 'We offer validated parking at the adjacent garage. Please ask our staff for details.' },
  { q: 'Do you cater to dietary requirements?', a: 'Absolutely. We have extensive options for vegan, vegetarian, gluten-free, and other dietary needs. Please inform your server.' },
  { q: 'Can I modify my reservation?', a: 'Yes, you can modify or cancel reservations up to 24 hours in advance by contacting us directly.' },
  { q: 'Do you have a loyalty program?', a: 'Yes! Join Modern Rewards for exclusive benefits, early access to events, and personalized offers.' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { toast.success('Message sent successfully!'); setForm({ name: '', email: '', subject: '', message: '' }); }
      else toast.error('Failed to send message');
    } catch { toast.error('Something went wrong'); } finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen pt-20 bg-dark-900">
      <div className="relative h-64 overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920" alt="Contact" fill className="object-cover" />
        <div className="absolute inset-0 bg-dark-900/70 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gold-400 text-sm tracking-widest uppercase mb-2">Get In Touch</p>
            <h1 className="font-serif text-4xl font-bold text-cream">Contact Us</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h2 className="font-serif text-2xl font-semibold text-cream mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Name" placeholder="John Smith" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
                <Input label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required />
              </div>
              <Input label="Subject" placeholder="How can we help?" value={form.subject} onChange={(e) => setForm({...form, subject: e.target.value})} required />
              <div>
                <label className="block text-sm font-medium text-cream/70 mb-1.5">Message</label>
                <textarea value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} rows={5} required placeholder="Tell us more..." className="w-full bg-dark-700 border border-white/10 rounded-xl py-3 px-4 text-cream placeholder-cream/30 focus:outline-none focus:border-gold-400 resize-none" />
              </div>
              <button type="submit" disabled={loading} className="w-full py-4 bg-gold-400 hover:bg-gold-500 text-dark-900 font-bold rounded-xl transition-colors disabled:opacity-70">
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div className="glass rounded-2xl p-8 border border-white/10">
              <h3 className="font-serif text-xl font-semibold text-cream mb-6">Find Us</h3>
              <div className="space-y-4 text-cream/60">
                <div className="flex items-start gap-3"><FiMapPin className="text-gold-400 mt-0.5 flex-shrink-0" /><p>123 Luxury Avenue, Manhattan<br />New York, NY 10001</p></div>
                <div className="flex items-center gap-3"><FiPhone className="text-gold-400" /><p>+1 (212) 555-0190</p></div>
                <div className="flex items-center gap-3"><FiMail className="text-gold-400" /><p>hello@moderncafe.com</p></div>
                <div className="flex items-start gap-3"><FiClock className="text-gold-400 mt-0.5" /><div><p>Mon–Fri: 7:00 AM – 10:00 PM</p><p>Sat–Sun: 8:00 AM – 11:00 PM</p></div></div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden border border-white/10 h-48 bg-dark-700 flex items-center justify-center">
              <p className="text-cream/40 text-sm">Interactive Map — 123 Luxury Avenue, NYC</p>
            </div>

            {/* FAQ */}
            <div>
              <h3 className="font-serif text-xl font-semibold text-cream mb-4">FAQ</h3>
              <div className="space-y-2">
                {faqs.map((faq, i) => (
                  <div key={i} className="glass rounded-xl border border-white/10 overflow-hidden">
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left">
                      <span className="text-cream text-sm font-medium">{faq.q}</span>
                      {openFaq === i ? <FiChevronUp className="text-gold-400 flex-shrink-0" /> : <FiChevronDown className="text-cream/40 flex-shrink-0" />}
                    </button>
                    {openFaq === i && <div className="px-5 pb-4 text-sm text-cream/60">{faq.a}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
