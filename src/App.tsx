import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import AddEarning from '@pages/AddEarning';
import AddExpense from '@pages/AddExpense';
import Home from '@pages/Home';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Home />} />
        <Route path="/add/expense" element={<AddExpense />} />
        <Route path="/add/earning" element={<AddEarning />} />
      </Routes>
    </BrowserRouter>
  );
}
