import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import FeaturedItems from '@/components/home/FeaturedItems';
import AboutPreview from '@/components/home/AboutPreview';
import Testimonials from '@/components/home/Testimonials';
import Stats from '@/components/home/Stats';
import SpecialOffer from '@/components/home/SpecialOffer';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'Modern Café — Premium Luxury Dining Experience',
  description: 'Welcome to Modern Café, where luxury meets culinary artistry. Experience premium coffee, exquisite cuisine, and unparalleled ambiance.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedItems />
      <Stats />
      <AboutPreview />
      <SpecialOffer />
      <Testimonials />
      <CTASection />
    </>
  );
}
