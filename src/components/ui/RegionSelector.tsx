'use client';

import { useRegion } from '@/hooks/useRegion';

export function RegionSelector() {
  const { currency, setCurrency, isReady } = useRegion();

  if (!isReady) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex bg-zinc-900 border border-zinc-700 rounded-full p-1 shadow-lg">
      <button
        onClick={() => setCurrency('ARS')}
        className={`px-4 py-1 rounded-full text-sm font-bold transition-all ${
          currency === 'ARS' ? 'bg-primary text-white' : 'text-zinc-400 hover:text-white'
        }`}
      >
        🇦🇷 ARS
      </button>
      <button
        onClick={() => setCurrency('USD')}
        className={`px-4 py-1 rounded-full text-sm font-bold transition-all ${
          currency === 'USD' ? 'bg-primary text-white' : 'text-zinc-400 hover:text-white'
        }`}
      >
        🌎 USD
      </button>
    </div>
  );
}
