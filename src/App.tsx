import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Home from '@pages/Home';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
