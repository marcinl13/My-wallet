import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import AddEarning from '@pages/AddEarning';
import AddExpense from '@pages/AddExpense';
import EditEarning from '@pages/EditEarning';
import EditExpense from '@pages/EditExpense';
import Home from '@pages/Home';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Home />} />
        <Route path="/add/expense" element={<AddExpense />} />
        <Route path="/add/earning" element={<AddEarning />} />
        <Route path="/earning/:id" element={<EditEarning />} />
        <Route path="/expense/:id" element={<EditExpense />} />
      </Routes>
    </BrowserRouter>
  );
}
