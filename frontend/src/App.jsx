import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Impor Halaman-Halaman
import HomePage from './pages/public/HomePage';
import BeritaDetail from './pages/public/BeritaDetail';
import AdminDashboard from './pages/admin/AdminDashboard';
import TambahBerita from './pages/admin/TambahBerita';
import EditBerita from './pages/admin/EditBerita';
import Navbar from './components/Navbar'; // <-- Impor Navbar


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* Rute untuk Publik */}
        <Route path="/" element={<HomePage />} />
        <Route path="/berita/:id" element={<BeritaDetail />} />

        {/* Rute untuk Panel Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/tambah" element={<TambahBerita />} />
        <Route path="/admin/edit/:id" element={<EditBerita />} />
      </Routes>
    </div>
  );
}

export default App;