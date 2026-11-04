import { Logo, BrandName } from './Logo';

export function Footer() {
  return (
    <footer className="bg-brand-navy-dark text-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="bg-white rounded-xl p-2"><Logo className="h-9 w-auto" /></span>
            <BrandName className="text-2xl [&_span:first-child]:!text-white" />
          </div>
          <p className="mt-4 max-w-sm text-sm text-blue-200">Ride • Share • Save. Travel together, go further.</p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-white mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>About us</li><li>Careers</li><li>Press</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold text-white mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>Help centre</li><li>Safety</li><li>Terms &amp; Privacy</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-blue-300">
        © {new Date().getFullYear()} Go Together. All rights reserved.
      </div>
    </footer>
  );
}
