from django.urls import path
from . import views
from .views import delete_rule
from .views import edit_rule

urlpatterns = [
    path('', views.home, name='home'), 
    path('form/', views.form_view, name='form_view'),  
    path('details/<int:id>/', views.details, name='details'), 
    path('delete-rule/<int:rule_id>/', delete_rule, name='delete_rule'),
    path('edit-rule/<int:rule_id>/', edit_rule, name='edit_rule'), 


]
