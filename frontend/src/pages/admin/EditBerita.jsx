import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';

function EditBerita() {
  const { id } = useParams(); // Ambil ID dari URL
  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');
  const [kategori, setKategori] = useState('');
  const [penulis, setPenulis] = useState('');
  const [gambar, setGambar] = useState(null);
  const [gambarPreview, setGambarPreview] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Langkah 1: Ambil data yang ada untuk mengisi form
  useEffect(() => {
    const fetchBeritaDetail = async () => {
      try {
        const response = await api.get(`/berita/${id}/`);
        const berita = response.data;
        setJudul(berita.judul);
        setIsi(berita.isi);
        setKategori(berita.kategori);
        setPenulis(berita.penulis);
        if (berita.gambar) {
          setGambarPreview(`http://127.0.0.1:8000${berita.gambar}`);
        }
      } catch (err) {
        console.error("Gagal mengambil detail berita:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBeritaDetail();
  }, [id]);

  // Langkah 2: Kirim data yang sudah diubah
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('judul', judul);
    formData.append('isi', isi);
    formData.append('kategori', kategori);
    formData.append('penulis', penulis);
    if (gambar) { // Hanya tambahkan gambar jika pengguna memilih file baru
      formData.append('gambar', gambar);
    }

    try {
      await api.put(`/berita/${id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/admin');
    } catch (err) {
      console.error("Gagal mengubah berita:", err);
      alert('Gagal mengubah berita.');
    }
  };

  if (loading) return <p>Loading data...</p>;

  return (
    <div className="container">
      <h1>Edit Berita</h1>
      <form onSubmit={handleSubmit} className="berita-form">
        <div className="form-group">
          <label>Judul</label>
          <input type="text" value={judul} onChange={(e) => setJudul(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Isi Berita</label>
          <textarea value={isi} onChange={(e) => setIsi(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Kategori</label>
          <input type="text" value={kategori} onChange={(e) => setKategori(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Penulis</label>
          <input type="text" value={penulis} onChange={(e) => setPenulis(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Gambar Saat Ini</label>
          {gambarPreview ? <img src={gambarPreview} alt="Preview" width="200" /> : <p>Tidak ada gambar</p>}
        </div>
        <div className="form-group">
          <label>Ubah Gambar (Opsional)</label>
          <input type="file" onChange={(e) => setGambar(e.target.files[0])} />
        </div>
        <button type="submit" className="btn btn-primary">Simpan Perubahan</button>
      </form>
    </div>
  );
}

export default EditBerita;