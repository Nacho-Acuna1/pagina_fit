'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type Currency = 'ARS' | 'USD';

interface RegionContextType {
  currency: Currency | null;
  setCurrency: (c: Currency) => void;
  isReady: boolean;
}

const RegionContext = createContext<RegionContextType | null>(null);

export function RegionProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency | null>(null);

  useEffect(() => {
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (timeZone && (timeZone.includes('Argentina') || timeZone.includes('Buenos_Aires'))) {
        setCurrency('ARS');
      } else {
        setCurrency('USD');
      }
    } catch {
      setCurrency('USD');
    }
  }, []);

  return (
    <RegionContext.Provider value={{ currency, setCurrency, isReady: currency !== null }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const ctx = useContext(RegionContext);
  if (!ctx) {
    throw new Error('useRegion must be used within a RegionProvider');
  }
  return ctx;
}
