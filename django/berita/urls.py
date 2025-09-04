from rest_framework.routers import DefaultRouter
from .views import BeritaViewSet

router = DefaultRouter()
router.register(r'berita', BeritaViewSet, basename='berita')

urlpatterns = router.urls