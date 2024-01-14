import { createContext, ReactNode, useContext } from 'react';
import { IndexableType, PromiseExtended } from 'dexie';

import { DexieDB } from '@/main';
import { Transaction, TransactionId } from '@const/Transaction';

const StorageContext = createContext<{
  db: DexieDB;
  deleteTransaction: (id: TransactionId) => PromiseExtended<number>;
  updateTransaction: (id: TransactionId, data: Transaction) => PromiseExtended<number>;
} | null>(null);

export const StorageProvider = ({ db, children }: { children: ReactNode; db: DexieDB }) => {
  const deleteTransaction = (id: TransactionId) =>
    db.transactions
      .where('id')
      .equals(id as IndexableType)
      .delete();

  const updateTransaction = (id: TransactionId, data: Transaction) => db.transactions.update(id as IndexableType, data);

  return (
    <StorageContext.Provider
      value={{
        db,
        deleteTransaction,
        updateTransaction
      }}>
      {children}
    </StorageContext.Provider>
  );
};

export const useStorageContext = () => {
  const context = useContext(StorageContext);

  if (!context) throw new Error('StorageContext must be called from within the StorageProvider');

  return context;
};
