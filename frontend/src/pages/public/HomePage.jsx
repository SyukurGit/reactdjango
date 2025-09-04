import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axiosConfig'; // Impor konfigurasi axios kita

function HomePage() {
  const [beritaList, setBeritaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const response = await api.get('/berita/');
        setBeritaList(response.data);
      } catch (err) {
        setError('Gagal memuat berita.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, []); // [] berarti efek ini hanya berjalan sekali saat komponen dimuat

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h1>Portal Berita</h1>
      <div className="berita-grid">
        {beritaList.map((berita) => (
          <div key={berita.id} className="berita-card">
        
            {berita.gambar && (
              <img
                src={berita.gambar} // Cukup gunakan ini
                alt={berita.judul}
                className="berita-image"
              />
            )}

            <h2>{berita.judul}</h2>
            <p>oleh {berita.penulis}</p>
            <Link to={`/berita/${berita.id}`}>Baca Selengkapnya</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;