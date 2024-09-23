from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),  # Home page
    path('form/', views.form_view, name='form_view'),  # Form page
    path('details/<int:id>/', views.details, name='details'),  # Details page with correct parameter name
]
