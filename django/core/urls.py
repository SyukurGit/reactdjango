# django/core/urls.py

from django.contrib import admin
from django.urls import path, include

# Impor wajib untuk menampilkan gambar
from django.conf import settings
from django.conf.urls.static import static

# Daftar URL utama aplikasi
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('berita.urls')),
]

# Baris sakti untuk menyajikan file media saat development (DEBUG=True)
# Pastikan ini ada di bagian paling bawah, di luar daftar urlpatterns
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)