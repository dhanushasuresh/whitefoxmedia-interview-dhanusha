from django.urls import path

from .views import student_detail, student_list

urlpatterns = [
    path('students/', student_list, name='student-list'),
    path('students/<int:pk>/', student_detail, name='student-detail'),
]
