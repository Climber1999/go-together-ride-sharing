import { Search, CalendarCheck, Car, Users, ShieldCheck, Wallet } from 'lucide-react';
import { Button } from './ui/button';

const steps = [
  { icon: Search, title: 'Search', text: 'Enter where you are leaving from, where you are going and when.', tint: 'bg-blue-50 text-brand-blue' },
  { icon: CalendarCheck, title: 'Book your seat', text: 'Pick a verified driver and reserve your seat in a few taps.', tint: 'bg-orange-50 text-brand-orange' },
  { icon: Car, title: 'Ride together', text: 'Meet your driver, share the journey and split the cost.', tint: 'bg-sky-50 text-sky-600' },
];

const stats = [
  { value: '2M+', label: 'Trusted drivers' },
  { value: '50+', label: 'Countries' },
  { value: '30M+', label: 'Rides shared' },
];

export function HowItWorks({ onNavigate }) {
  return (
    <>
      {/* Stats */}
      <section className="bg-brand-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-3 gap-4 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl sm:text-5xl font-bold text-brand-orange">{s.value}</div>
              <div className="mt-1 text-xs sm:text-base text-blue-100">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block rounded-full bg-brand-sky text-brand-blue text-xs font-semibold tracking-wide uppercase px-3 py-1">How it works</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mt-4">
              Ride <span className="text-brand-orange">•</span> Share <span className="text-brand-orange">•</span> Save
            </h2>
            <p className="text-slate-500 mt-3">Three simple steps to travel together and go further.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map(({ icon: Icon, title, text, tint }, i) => (
              <div key={title} className="gt-card gt-card-hover p-8 text-center relative">
                <span className="absolute top-5 right-6 font-display text-5xl font-extrabold text-brand-navy/5">{i + 1}</span>
                <span className={`mx-auto h-16 w-16 rounded-2xl flex items-center justify-center ${tint}`}>
                  <Icon className="h-8 w-8" />
                </span>
                <h3 className="text-xl font-semibold text-brand-navy mt-5">{title}</h3>
                <p className="text-slate-500 mt-2">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Help */}
      <section id="help" className="gt-sky-bg scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="rounded-[28px] bg-gradient-to-br from-brand-navy to-brand-navy-dark text-white p-8 sm:p-14 grid md:grid-cols-2 gap-10 items-center overflow-hidden relative">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-orange/20 blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold">Driving somewhere? <span className="text-brand-orange">Take company.</span></h2>
              <p className="mt-4 text-blue-100 max-w-md">
                Publish your trip, fill the empty seats and cover your fuel costs while making the journey more fun.
              </p>
              <Button className="gt-btn-orange rounded-full h-12 px-8 mt-7" onClick={() => onNavigate('offerride')}>
                Offer a ride
              </Button>
            </div>
            <div className="relative grid gap-4">
              {[
                { icon: ShieldCheck, t: 'Verified community', d: 'ID and phone verification for drivers and riders.' },
                { icon: Wallet, t: 'Fair, shared costs', d: 'Transparent price per seat – no surprises.' },
                { icon: Users, t: 'Travel with good people', d: 'Ratings and reviews on every ride.' },
              ].map(({ icon: Icon, t, d }) => (
                <div key={t} className="flex gap-4 items-start rounded-2xl bg-white/10 backdrop-blur p-4 ring-1 ring-white/10">
                  <span className="h-10 w-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0"><Icon className="h-5 w-5 text-brand-orange" /></span>
                  <div>
                    <div className="font-semibold">{t}</div>
                    <div className="text-sm text-blue-100">{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
