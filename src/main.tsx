import React from 'react';
import ReactDOM from 'react-dom/client';
import Dexie, { Table } from 'dexie';

import App from '@/App.tsx';
import { StorageProvider } from '@context/Storage';
import { ToastNotificationProvider } from '@context/ToastNotification';
import { Transaction } from '@const/Transaction';

import '@/index.css';

export class DexieDB extends Dexie {
  transactions!: Table<Transaction>;

  constructor() {
    super('transactions');
    this.version(1).stores({
      transactions: '++id, type, amount, text, group, category, createdAt' // Primary key and indexed props
    });
  }
}

const db = new DexieDB();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastNotificationProvider>
      <StorageProvider db={db}>
        <App />
      </StorageProvider>
    </ToastNotificationProvider>
  </React.StrictMode>
);
