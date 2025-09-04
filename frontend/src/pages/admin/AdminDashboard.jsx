import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axiosConfig';

function AdminDashboard() {
  const [beritaList, setBeritaList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil data berita
  const fetchBerita = async () => {
    try {
      const response = await api.get('/berita/');
      setBeritaList(response.data);
    } catch (err) {
      console.error("Gagal memuat berita:", err);
    } finally {
      setLoading(false);
    }
  };

  // Panggil fetchBerita saat komponen dimuat
  useEffect(() => {
    fetchBerita();
  }, []);

  // Fungsi untuk menghapus berita
  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
      try {
        await api.delete(`/berita/${id}/`);
        // Setelah berhasil dihapus, ambil ulang daftar berita
        fetchBerita(); 
      } catch (err) {
        console.error("Gagal menghapus berita:", err);
        alert('Gagal menghapus berita.');
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <Link to="/admin/tambah" className="btn btn-primary">
        + Tambah Berita Baru
      </Link>
      
      <table className="admin-table">
        <thead>
          <tr>
            <th>Judul</th>
            <th>Kategori</th>
            <th>Penulis</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {beritaList.map((berita) => (
            <tr key={berita.id}>
              <td>{berita.judul}</td>
              <td>{berita.kategori}</td>
              <td>{berita.penulis}</td>
              <td>
                <Link to={`/admin/edit/${berita.id}`} className="btn btn-secondary">
                  Edit
                </Link>
                <button 
                  onClick={() => handleDelete(berita.id)} 
                  className="btn btn-danger"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;