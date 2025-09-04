# django/core/urls.py

from django.contrib import admin
from django.urls import path, include  # Tambahkan 'include' di sini
from django.urls import path
from .views import ping

# Impor dua baris ini
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
       path('api/', include('berita.urls')), # <-- UBAH/TAMBAHKAN BARIS INI

]

# Tambahkan baris ini di bagian bawah
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)