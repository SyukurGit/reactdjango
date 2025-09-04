from rest_framework import viewsets
from .models import Berita
from .serializers import BeritaSerializer

# Create your views here.
class BeritaViewSet(viewsets.ModelViewSet):
    queryset = Berita.objects.all()
    serializer_class = BeritaSerializer