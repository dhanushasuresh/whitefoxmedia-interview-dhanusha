from rest_framework import serializers
from .models import Student


class StudentSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    first_name = serializers.CharField(required=True, max_length=120)
    last_name = serializers.CharField(required=True, max_length=120)
    phone = serializers.CharField(required=True, max_length=30)

    class Meta:
        model = Student
        fields = [
            'id',
            'first_name',
            'last_name',
            'email',
            'phone',
            'date_of_birth',
            'gender',
            'address',
            'created_at',
            'updated_at',
        ]

    def validate_email(self, value):
        student_id = self.instance.id if self.instance else None
        if Student.objects.exclude(id=student_id).filter(email=value).exists():
            raise serializers.ValidationError('A student with this email already exists.')
        return value
