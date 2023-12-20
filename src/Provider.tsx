import { createContext, ReactNode, useContext } from "react";

import { DexieDB } from "./main";

const StorageContext = createContext<{ db: DexieDB } | null>(null);

export const StorageProvider = ({ db, children }: { children: ReactNode; db: DexieDB }) => {
  return (
    <StorageContext.Provider
      value={{
        db,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};

export const useStorageContext = () => {
  const context = useContext(StorageContext);

  if (!context) throw new Error("StorageContext must be called from within the StorageProvider");

  return context;
};
