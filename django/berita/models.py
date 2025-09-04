from django.db import models

# Create your models here.
class Berita(models.Model):
    judul = models.CharField(max_length=200)
    isi = models.TextField()
    kategori = models.CharField(max_length=100)
    penulis = models.CharField(max_length=100)
    tanggal_publikasi = models.DateTimeField(auto_now_add=True)
    gambar = models.ImageField(upload_to='gambar_berita/', blank=True, null=True)

    def __str__(self):
        return self.judul