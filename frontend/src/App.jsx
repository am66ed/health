import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import CertificatePage from './pages/CertificatePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminPage />} />
        <Route path="/certificate/:id" element={<CertificatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
