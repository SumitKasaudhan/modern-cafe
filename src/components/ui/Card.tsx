import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
}

export default function Card({ children, className, glass = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl overflow-hidden',
        glass
          ? 'glass border border-white/10'
          : 'bg-dark-700 border border-white/5',
        className
      )}
    >
      {children}
    </div>
  );
}
