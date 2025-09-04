# django/core/urls.py

from django.contrib import admin
from django.urls import path, include

# 1. Impor dua baris ini
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('berita.urls')),
]

# 2. Tambahkan blok 'if' ini di bagian paling bawah file
#    Ini memberitahu Django untuk menyajikan file dari folder MEDIA_ROOT saat mode DEBUG aktif
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)