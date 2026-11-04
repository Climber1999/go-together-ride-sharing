import { Search, MapPin, Calendar, ShieldCheck, Leaf, Wallet } from 'lucide-react';
import heroImage from '../assets/hero.jpg';
import { Button } from './ui/button';
import { useState } from 'react';

export function Hero({ onNavigate }) {
  const [leaving, setLeaving] = useState('');
  const [going, setGoing] = useState('');
  const [date, setDate] = useState('');
  const [leavingSuggestions, setLeavingSuggestions] = useState([]);
  const [goingSuggestions, setGoingSuggestions] = useState([]);
  const [showLeavingDropdown, setShowLeavingDropdown] = useState(false);
  const [showGoingDropdown, setShowGoingDropdown] = useState(false);
  const [selectedLeaving, setSelectedLeaving] = useState(null);
  const [selectedGoing, setSelectedGoing] = useState(null);

  // Call your backend endpoint that proxies Map My India API
  const fetchSuggestions = async (query, setSuggestions) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(`http://localhost:9090/api/places?address=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error('Failed to fetch suggestions');
      const data = await res.json();
      if (Array.isArray(data)) {
        setSuggestions(data);
      } else if (data.suggestedLocations && Array.isArray(data.suggestedLocations)) {
        setSuggestions(data.suggestedLocations);
      } else {
        setSuggestions([]);
      }
    } catch (e) {
      console.error('Error fetching suggestions:', e);
      setSuggestions([]);
    }
  };

  const handleSearch = () => {
    if (!leaving.trim()) {
      alert('Please select a departure location');
      return;
    }
    if (!going.trim()) {
      alert('Please select a destination');
      return;
    }
    if (!date) {
      alert('Please select a date');
      return;
    }

    // Navigate to search results with search parameters
    onNavigate('search', {
      leaving,
      going,
      date
    });
  };

  const fieldCls =
    'flex items-center h-14 pl-4 bg-white border border-slate-200 rounded-xl transition focus-within:border-brand-blue focus-within:ring-4 focus-within:ring-brand-blue/15';
  const inputCls =
    'flex-1 h-full min-w-0 px-0 border-none bg-transparent text-[15px] text-slate-800 placeholder:text-slate-400 focus:outline-none';
  const labelCls = 'block text-xs font-semibold uppercase tracking-wide text-brand-navy/70 mb-1.5 pl-1';

  const Suggestions = ({ items, onPick }) => (
    <div className="absolute left-0 top-full mt-2 z-50 w-full bg-white border border-brand-blue/20 rounded-xl shadow-xl max-h-60 overflow-auto">
      {items.map((s, i) => (
        <div
          key={i}
          className="px-4 py-2.5 cursor-pointer text-sm flex justify-between gap-3 border-b border-slate-100 last:border-b-0 text-brand-navy hover:bg-brand-sky"
          onMouseDown={() => onPick(s)}
        >
          <span className="truncate">{s.placeName}</span>
          <span className="text-slate-400 shrink-0">{s.state}</span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="gt-sky-bg relative overflow-hidden pt-8 sm:pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand banner */}
        <div className="relative rounded-[28px] overflow-hidden shadow-[0_30px_70px_-30px_rgba(20,40,107,.45)] ring-1 ring-brand-navy/10">
          <img
            src={heroImage}
            alt="Go Together – Ride, Share, Save. Travel together, go further!"
            className="w-full h-[320px] sm:h-[440px] lg:h-[560px] object-cover object-[50%_42%]"
            fetchPriority="high"
          />
        </div>

        {/* Search card overlapping the banner */}
        <div className="relative z-10 -mt-6 sm:-mt-8 mx-auto max-w-5xl gt-card p-5 sm:p-7 shadow-[0_30px_60px_-25px_rgba(20,40,107,.45)]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-brand-navy">
                Where are you <span className="text-brand-orange">going</span> today?
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">Find a ride that fits your route, time and budget.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            {/* Leaving from */}
            <div className="relative md:col-span-3">
              <label className={labelCls}>Leaving from</label>
              <div className={fieldCls}>
                <MapPin className="h-5 w-5 text-brand-blue flex-shrink-0 mr-3" />
                <input
                  value={leaving}
                  onChange={(e) => {
                    setLeaving(e.target.value);
                    fetchSuggestions(e.target.value, setLeavingSuggestions);
                    setShowLeavingDropdown(true);
                    setSelectedLeaving(null);
                  }}
                  onBlur={() => setTimeout(() => setShowLeavingDropdown(false), 200)}
                  onFocus={() => leavingSuggestions.length > 0 && setShowLeavingDropdown(true)}
                  placeholder="City, town or address"
                  className={inputCls}
                  autoComplete="off"
                />
              </div>
              {showLeavingDropdown && leavingSuggestions.length > 0 && (
                <Suggestions
                  items={leavingSuggestions}
                  onPick={(s) => {
                    setLeaving(s.placeName);
                    setSelectedLeaving(s);
                    setShowLeavingDropdown(false);
                  }}
                />
              )}
            </div>

            {/* Going to */}
            <div className="relative md:col-span-3">
              <label className={labelCls}>Going to</label>
              <div className={fieldCls}>
                <MapPin className="h-5 w-5 text-brand-orange flex-shrink-0 mr-3" />
                <input
                  value={going}
                  onChange={(e) => {
                    setGoing(e.target.value);
                    fetchSuggestions(e.target.value, setGoingSuggestions);
                    setShowGoingDropdown(true);
                    setSelectedGoing(null);
                  }}
                  onBlur={() => setTimeout(() => setShowGoingDropdown(false), 200)}
                  onFocus={() => goingSuggestions.length > 0 && setShowGoingDropdown(true)}
                  placeholder="City, town or address"
                  className={inputCls}
                  autoComplete="off"
                />
              </div>
              {showGoingDropdown && goingSuggestions.length > 0 && (
                <Suggestions
                  items={goingSuggestions}
                  onPick={(s) => {
                    setGoing(s.placeName);
                    setSelectedGoing(s);
                    setShowGoingDropdown(false);
                  }}
                />
              )}
            </div>

            {/* Date */}
            <div className="md:col-span-3">
              <label className={labelCls}>Date</label>
              <div className={fieldCls + ' pr-3'}>
                <Calendar className="h-5 w-5 text-brand-blue flex-shrink-0 mr-3" />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
              </div>
            </div>

            {/* Search */}
            <div className="md:col-span-3">
              <Button className="gt-btn-orange w-full h-14 rounded-xl text-base" size="lg" onClick={handleSearch}>
                <Search className="h-5 w-5" />
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Value props */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 max-w-5xl mx-auto">
          {[
            { icon: Wallet, title: 'Save', text: 'Split fuel costs and travel for far less.', color: 'text-brand-orange bg-orange-50' },
            { icon: ShieldCheck, title: 'Ride safe', text: 'Verified drivers and rated community.', color: 'text-brand-blue bg-blue-50' },
            { icon: Leaf, title: 'Go green', text: 'Fewer cars on the road, lower emissions.', color: 'text-emerald-600 bg-emerald-50' },
          ].map(({ icon: Icon, title, text, color }) => (
            <div key={title} className="flex items-center gap-4 px-2">
              <span className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 ${color}`}>
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <div className="font-display font-semibold text-brand-navy">{title}</div>
                <div className="text-sm text-slate-500">{text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
