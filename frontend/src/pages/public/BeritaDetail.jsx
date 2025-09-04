import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axiosConfig';

function BeritaDetail() {
  const { id } = useParams(); // Mengambil 'id' dari URL
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBeritaDetail = async () => {
      try {
        const response = await api.get(`/berita/${id}/`);
        setBerita(response.data);
      } catch (err) {
        setError('Gagal memuat detail berita.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBeritaDetail();
  }, [id]); // Efek ini akan berjalan lagi jika 'id' berubah

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!berita) return <p>Berita tidak ditemukan.</p>;

  return (
    <div className="container">
      <div className="berita-detail-card">
        <h1>{berita.judul}</h1>
        <p className="meta">
          Oleh: {berita.penulis} | Kategori: {berita.kategori}
        </p>
         {berita.gambar && (
          <img
            src={berita.gambar} // Ubah baris ini
            alt={berita.judul}
            className="berita-detail-image"
          />
        )}
        <div className="isi-berita">
          {berita.isi}
        </div>
        <Link to="/" className="back-link">
          &larr; Kembali ke Home
        </Link>
      </div>
    </div>
  );
}

export default BeritaDetail;