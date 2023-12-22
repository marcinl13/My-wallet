import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Add from '@pages/Add';
import Edit from '@pages/Edit';
import Home from '@pages/Home';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Home />} />
        <Route path="/add/:type" element={<Add />} />
        <Route path="/edit/:type/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}
