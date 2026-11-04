import { Menu, User, X, Bookmark, Plus, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { Logo, BrandName } from './Logo';

export function Navbar({ onNavigate, user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fullName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : '';
  const initials = user
    ? `${(user.firstName || '?').charAt(0)}${(user.lastName || '').charAt(0)}`.toUpperCase()
    : '';

  const scrollTo = (id) => {
    onNavigate('home');
    setMobileMenuOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 60);
  };

  const linkCls =
    'relative text-[15px] font-medium text-slate-600 hover:text-brand-navy transition-colors after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-0 after:bg-brand-orange after:rounded-full after:transition-all hover:after:w-full';

  const go = (page, arg) => {
    onNavigate(page, arg);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-brand-navy/10 bg-white/85 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px]">
          {/* Logo */}
          <button onClick={() => go('home')} className="flex items-center gap-2.5 group" aria-label="Go Together home">
            <Logo className="h-10 w-auto transition-transform group-hover:scale-105" />
            <BrandName className="text-2xl hidden sm:inline" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-9">
            <button onClick={() => scrollTo('rides')} className={linkCls}>Find a Ride</button>
            <button onClick={() => go('offerride')} className={linkCls}>Offer a Ride</button>
            <button onClick={() => scrollTo('how-it-works')} className={linkCls}>How It Works</button>
            <button onClick={() => scrollTo('help')} className={linkCls}>Help</button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <button
                  onClick={() => go('mybookings')}
                  className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-brand-navy transition-colors px-2"
                >
                  <Bookmark className="h-4 w-4" />
                  My Bookings
                </button>
                <button
                  onClick={() => go('profile', user)}
                  className="flex items-center gap-2 rounded-full border border-brand-navy/10 bg-brand-sky pl-1 pr-3 py-1 hover:border-brand-blue/40 transition-colors"
                >
                  <span className="bg-brand-navy text-white rounded-full h-8 w-8 flex items-center justify-center text-xs font-semibold">
                    {initials}
                  </span>
                  <span className="text-sm font-medium text-brand-navy max-w-[120px] truncate">{fullName}</span>
                </button>
                <Button className="gt-btn-orange rounded-full px-5" onClick={() => go('postride')}>
                  <Plus className="h-4 w-4" /> Publish a Ride
                </Button>
                <Button variant="ghost" size="icon" onClick={onLogout} title="Logout" aria-label="Logout">
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" className="rounded-full text-brand-navy" onClick={() => go('login')}>
                  <User className="h-4 w-4" />
                  Sign In
                </Button>
                <Button className="gt-btn-orange rounded-full px-6" onClick={() => go('signup')}>
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-brand-navy hover:bg-brand-sky"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-brand-navy/10">
            <div className="flex flex-col gap-1">
              {[
                ['Find a Ride', () => scrollTo('rides')],
                ['Offer a Ride', () => go('offerride')],
                ['How It Works', () => scrollTo('how-it-works')],
                ['Help', () => scrollTo('help')],
              ].map(([label, fn]) => (
                <button key={label} onClick={fn} className="text-left px-3 py-2.5 rounded-lg font-medium text-slate-700 hover:bg-brand-sky">
                  {label}
                </button>
              ))}
              <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-brand-navy/10">
                {user ? (
                  <>
                    <button onClick={() => go('mybookings')} className="flex items-center gap-2 px-3 py-2.5 hover:bg-brand-sky rounded-lg text-slate-700">
                      <Bookmark className="h-4 w-4" /> My Bookings
                    </button>
                    <button onClick={() => go('profile', user)} className="flex items-center gap-3 px-3 py-2.5 hover:bg-brand-sky rounded-lg">
                      <span className="bg-brand-navy text-white rounded-full h-8 w-8 flex items-center justify-center text-xs font-semibold">{initials}</span>
                      <span className="text-slate-700">{fullName}</span>
                    </button>
                    <Button className="w-full gt-btn-orange rounded-full" onClick={() => go('postride')}>Publish a Ride</Button>
                    <Button variant="ghost" className="w-full justify-start" onClick={() => { onLogout(); setMobileMenuOpen(false); }}>
                      <LogOut className="h-4 w-4" /> Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="w-full rounded-full" onClick={() => go('login')}>
                      <User className="h-4 w-4" /> Sign In
                    </Button>
                    <Button className="w-full gt-btn-orange rounded-full" onClick={() => go('signup')}>Sign Up</Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
