import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';

function TambahBerita() {
  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');
  const [kategori, setKategori] = useState('');
  const [penulis, setPenulis] = useState('');
  const [gambar, setGambar] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('judul', judul);
    formData.append('isi', isi);
    formData.append('kategori', kategori);
    formData.append('penulis', penulis);
    if (gambar) {
      formData.append('gambar', gambar);
    }

    try {
      await api.post('/berita/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Jika berhasil, kembali ke halaman admin
      navigate('/admin');
    } catch (err) {
      console.error("Gagal menambah berita:", err);
      alert('Gagal menambah berita. Cek konsol untuk detail.');
    }
  };

  return (
    <div className="container">
      <h1>Tambah Berita Baru</h1>
      <form onSubmit={handleSubmit} className="berita-form">
        <div className="form-group">
          <label>Judul</label>
          <input
            type="text"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Isi Berita</label>
          <textarea
            value={isi}
            onChange={(e) => setIsi(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Kategori</label>
          <input
            type="text"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Penulis</label>
          <input
            type="text"
            value={penulis}
            onChange={(e) => setPenulis(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Gambar</label>
          <input
            type="file"
            onChange={(e) => setGambar(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-primary">Simpan</button>
      </form>
    </div>
  );
}

export default TambahBerita;