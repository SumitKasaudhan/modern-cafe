import type { Metadata } from 'next';
import Image from 'next/image';
import SectionHeading from '@/components/shared/SectionHeading';
import ScrollReveal from '@/components/shared/ScrollReveal';

export const metadata: Metadata = { title: 'About Us' };

const team = [
  { name: 'Elena Laurent', role: 'Executive Chef', bio: 'Michelin-starred chef with 20 years of fine dining experience across Paris, New York, and Tokyo.', image: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=400' },
  { name: 'Marco Rossi', role: 'Head Barista', bio: 'World Barista Championship finalist with a passion for specialty coffee and innovative brewing techniques.', image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400' },
  { name: 'Sophie Williams', role: 'Pastry Chef', bio: 'Trained at Le Cordon Bleu, Sophie creates exquisite pastries that are as beautiful as they are delicious.', image: 'https://images.unsplash.com/photo-1588516903720-8ceb67f96d37?w=400' },
  { name: 'James Chen', role: 'General Manager', bio: 'Hospitality veteran ensuring every guest experience at Modern Café exceeds all expectations.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400' },
];

const timeline = [
  { year: '2009', event: 'Modern Café opens its doors in downtown Manhattan' },
  { year: '2011', event: 'Awarded Best New Restaurant by New York Magazine' },
  { year: '2014', event: 'Expanded to a second location in Brooklyn' },
  { year: '2016', event: 'Launched online ordering and delivery services' },
  { year: '2019', event: 'Received Michelin recommendation for culinary excellence' },
  { year: '2022', event: 'Introduced the Afternoon Tea Experience' },
  { year: '2024', event: 'Celebrating 15 years of exceptional dining' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20 bg-dark-900">
      {/* Hero */}
      <div className="relative h-64 overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920" alt="About" fill className="object-cover" />
        <div className="absolute inset-0 bg-dark-900/70 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gold-400 text-sm tracking-widest uppercase mb-2">Our Story</p>
            <h1 className="font-serif text-4xl font-bold text-cream">About Modern Café</h1>
          </div>
        </div>
      </div>

      {/* Story */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <p className="text-gold-400 text-sm tracking-widest uppercase mb-4">Our Mission</p>
              <h2 className="font-serif text-4xl font-bold text-cream mb-6">Crafting Moments of Pure Luxury</h2>
              <p className="text-cream/60 leading-relaxed mb-4">Modern Café was founded on a simple philosophy: that extraordinary experiences should be accessible, and that every guest deserves to be treated with the highest level of care and attention.</p>
              <p className="text-cream/60 leading-relaxed mb-4">Our team of world-class chefs, baristas, and hospitality professionals work in harmony to deliver an experience that transcends the ordinary. From our hand-selected coffee beans to our seasonal menus crafted from locally sourced ingredients, every detail is considered.</p>
              <p className="text-cream/60 leading-relaxed">We believe that a café is more than a place to eat and drink—it is a sanctuary, a meeting place, a space where memories are made. This belief drives everything we do.</p>
            </ScrollReveal>
            <ScrollReveal direction="left">
              <div className="relative h-96 rounded-3xl overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800" alt="Our café" fill className="object-cover" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-dark-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="Our Journey" title="A Legacy of Excellence" />
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gold-400/20" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <ScrollReveal key={item.year} delay={i * 0.1}>
                  <div className="flex gap-6 items-start">
                    <div className="relative z-10 w-16 h-16 rounded-full bg-dark-700 border-2 border-gold-400 flex items-center justify-center flex-shrink-0">
                      <span className="text-gold-400 font-bold text-xs">{item.year}</span>
                    </div>
                    <div className="glass rounded-xl p-4 flex-1 border border-white/10">
                      <p className="text-cream/70">{item.event}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="The People Behind the Magic" title="Meet Our Team" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.1}>
                <div className="glass rounded-2xl overflow-hidden border border-white/10 text-center p-6">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-gold-400">
                    <Image src={member.image} alt={member.name} fill className="object-cover" />
                  </div>
                  <h3 className="font-serif font-semibold text-cream text-lg">{member.name}</h3>
                  <p className="text-gold-400 text-sm mb-3">{member.role}</p>
                  <p className="text-cream/50 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
