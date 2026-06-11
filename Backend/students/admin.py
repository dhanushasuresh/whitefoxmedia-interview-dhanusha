from django.contrib import admin
from .models import Student


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'email', 'phone', 'gender', 'date_of_birth', 'created_at')
    search_fields = ('first_name', 'last_name', 'email', 'phone')
    list_filter = ('gender',)
    ordering = ('-created_at',)
