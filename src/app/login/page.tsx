'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiMail, FiLock, FiGithub } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import Input from '@/components/ui/Input';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn('credentials', { email, password, redirect: false });
    setLoading(false);
    if (res?.ok) { toast.success('Welcome back!'); router.push('/'); }
    else toast.error(res?.error || 'Invalid credentials');
  };

  return (
    <main className="min-h-screen pt-20 bg-dark-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="glass rounded-3xl p-8 border border-white/10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gold-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-dark-900 font-serif font-bold text-2xl">M</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-cream">Welcome Back</h1>
            <p className="text-cream/50 text-sm mt-2">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <Input label="Email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} icon={<FiMail size={14} />} required />
            <Input label="Password" type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} icon={<FiLock size={14} />} required />
            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-xs text-gold-400 hover:text-gold-300">Forgot password?</Link>
            </div>
            <button type="submit" disabled={loading} className="w-full py-4 bg-gold-400 hover:bg-gold-500 text-dark-900 font-bold rounded-xl transition-colors disabled:opacity-70">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
            <div className="relative flex justify-center"><span className="px-3 bg-dark-800 text-xs text-cream/40">Or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button onClick={() => signIn('google')} className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 hover:border-white/30 text-cream text-sm transition-colors">
              <FcGoogle size={18} /> Google
            </button>
            <button onClick={() => signIn('github')} className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 hover:border-white/30 text-cream text-sm transition-colors">
              <FiGithub size={18} /> GitHub
            </button>
          </div>

          <p className="text-center text-sm text-cream/40">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-gold-400 hover:text-gold-300 font-medium">Create one</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
