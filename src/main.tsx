import React from 'react';
import ReactDOM from 'react-dom/client';
import Dexie, { Table } from 'dexie';

import App from '@/App.tsx';
import { StorageProvider } from '@context/Storage';
import { ToastNotificationProvider } from '@context/ToastNotification';

import '@/index.css';
interface Expense {
  id?: number;
  type: string;
  amount: number;
  text: string;
  group: string;
  category: string;
  createdAt: Date;
}

export class DexieDB extends Dexie {
  expenses!: Table<Expense>;

  constructor() {
    super('Expense');
    this.version(1).stores({
      expenses: '++id, type, amount, text, group, category, createdAt' // Primary key and indexed props
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
