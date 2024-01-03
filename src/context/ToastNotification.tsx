import { createContext, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const NotificationContext = createContext(undefined);

export const ToastNotificationProvider = ({ children }: { children: ReactNode }) => {
  return (
    <NotificationContext.Provider value={undefined}>
      <ToastContainer position="top-center" theme="light" hideProgressBar role="alert" />

      {children}
    </NotificationContext.Provider>
  );
};
