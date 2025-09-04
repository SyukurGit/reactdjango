# django/core/urls.py
from django.contrib import admin
from django.urls import path
from .views import ping

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/ping/', ping),
]
