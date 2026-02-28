'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import Input from '@/components/ui/Input';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', terms: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name) errs.name = 'Name is required';
    if (!form.email) errs.email = 'Email is required';
    if (form.password.length < 8) errs.password = 'Password must be at least 8 characters';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    if (!form.terms) errs.terms = 'You must accept the terms';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      if (res.ok) { toast.success('Account created! Please sign in.'); router.push('/login'); }
      else { const data = await res.json(); toast.error(data.error || 'Registration failed'); }
    } catch { toast.error('Something went wrong'); } finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen pt-20 bg-dark-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="glass rounded-3xl p-8 border border-white/10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gold-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-dark-900 font-serif font-bold text-2xl">M</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-cream">Join Modern Café</h1>
            <p className="text-cream/50 text-sm mt-2">Create your account to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name" placeholder="John Smith" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} icon={<FiUser size={14} />} error={errors.name} />
            <Input label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} icon={<FiMail size={14} />} error={errors.email} />
            <Input label="Password" type="password" placeholder="Min. 8 characters" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} icon={<FiLock size={14} />} error={errors.password} />
            <Input label="Confirm Password" type="password" placeholder="Confirm your password" value={form.confirmPassword} onChange={(e) => setForm({...form, confirmPassword: e.target.value})} icon={<FiLock size={14} />} error={errors.confirmPassword} />
            <div>
              <label className="flex items-start gap-3">
                <input type="checkbox" checked={form.terms} onChange={(e) => setForm({...form, terms: e.target.checked})} className="mt-0.5 accent-gold-400" />
                <span className="text-sm text-cream/60">I agree to the <Link href="/terms" className="text-gold-400 hover:text-gold-300">Terms of Service</Link> and <Link href="/privacy" className="text-gold-400 hover:text-gold-300">Privacy Policy</Link></span>
              </label>
              {errors.terms && <p className="mt-1 text-xs text-red-400">{errors.terms}</p>}
            </div>
            <button type="submit" disabled={loading} className="w-full py-4 bg-gold-400 hover:bg-gold-500 text-dark-900 font-bold rounded-xl transition-colors disabled:opacity-70">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-cream/40 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-gold-400 hover:text-gold-300 font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
