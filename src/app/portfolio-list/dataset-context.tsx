"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { PUBLIC_DATA_SETS, verifyPassword, decryptDataSets } from "./data";
import type { DataSet } from "./data";

const AUTH_TTL_MS = 30 * 60 * 1000; // 30 minutes

interface DataSetContextValue {
  allDataSets: DataSet[];
  authed: boolean;
  activeDataSetIndex: number;
  setActiveDataSetIndex: (i: number) => void;
  /** Returns true on success */
  authenticate: (password: string) => Promise<boolean>;
  deauthenticate: () => void;
}

const DataSetContext = createContext<DataSetContextValue>({
  allDataSets: PUBLIC_DATA_SETS,
  authed: false,
  activeDataSetIndex: 0,
  setActiveDataSetIndex: () => {},
  authenticate: async () => false,
  deauthenticate: () => {},
});

export function useDataSetContext() {
  return useContext(DataSetContext);
}

export function DataSetProvider({ children }: { children: ReactNode }) {
  const [allDataSets, setAllDataSets] = useState<DataSet[]>(PUBLIC_DATA_SETS);
  const [authed, setAuthed] = useState(false);
  const [authedAt, setAuthedAt] = useState<number | null>(null);
  const [activeDataSetIndex, setActiveDataSetIndex] = useState(0);

  // Expire auth after TTL
  useEffect(() => {
    if (authedAt == null) return;
    const remaining = AUTH_TTL_MS - (Date.now() - authedAt);
    if (remaining <= 0) {
      setAuthed(false);
      setAuthedAt(null);
      setAllDataSets(PUBLIC_DATA_SETS);
      setActiveDataSetIndex(0);
      return;
    }
    const timer = setTimeout(() => {
      setAuthed(false);
      setAuthedAt(null);
      setAllDataSets(PUBLIC_DATA_SETS);
      setActiveDataSetIndex(0);
    }, remaining);
    return () => clearTimeout(timer);
  }, [authedAt]);

  const authenticate = useCallback(async (password: string): Promise<boolean> => {
    const ok = await verifyPassword(password);
    if (!ok) return false;
    try {
      const restricted = await decryptDataSets(password);
      setAllDataSets([...PUBLIC_DATA_SETS, ...restricted]);
      setAuthed(true);
      setAuthedAt(Date.now());
      return true;
    } catch {
      return false;
    }
  }, []);

  const deauthenticate = useCallback(() => {
    setAuthed(false);
    setAuthedAt(null);
    setAllDataSets(PUBLIC_DATA_SETS);
    setActiveDataSetIndex(0);
  }, []);

  return (
    <DataSetContext.Provider value={{ allDataSets, authed, activeDataSetIndex, setActiveDataSetIndex, authenticate, deauthenticate }}>
      {children}
    </DataSetContext.Provider>
  );
}
