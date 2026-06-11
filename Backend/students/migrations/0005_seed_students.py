from django.contrib.auth.hashers import make_password
from django.conf import settings
from django.db import migrations


STUDENTS = [
    {
        "first_name": "Aarav",
        "last_name": "Sharma",
        "email": "aarav.sharma@example.com",
        "phone": "9876543210",
        "date_of_birth": "2005-01-15",
        "gender": "Male",
        "address": "12 MG Road, Bengaluru",
    },
    {
        "first_name": "Ananya",
        "last_name": "Menon",
        "email": "ananya.menon@example.com",
        "phone": "9876543211",
        "date_of_birth": "2006-03-22",
        "gender": "Female",
        "address": "45 Anna Salai, Chennai",
    },
    {
        "first_name": "Vihaan",
        "last_name": "Patel",
        "email": "vihaan.patel@example.com",
        "phone": "9876543212",
        "date_of_birth": "2005-07-09",
        "gender": "Male",
        "address": "78 CG Road, Ahmedabad",
    },
    {
        "first_name": "Diya",
        "last_name": "Nair",
        "email": "diya.nair@example.com",
        "phone": "9876543213",
        "date_of_birth": "2007-11-30",
        "gender": "Female",
        "address": "23 Marine Drive, Kochi",
    },
    {
        "first_name": "Kabir",
        "last_name": "Singh",
        "email": "kabir.singh@example.com",
        "phone": "9876543214",
        "date_of_birth": "2004-05-18",
        "gender": "Male",
        "address": "19 Civil Lines, Delhi",
    },
    {
        "first_name": "Meera",
        "last_name": "Iyer",
        "email": "meera.iyer@example.com",
        "phone": "9876543215",
        "date_of_birth": "2006-09-12",
        "gender": "Female",
        "address": "31 T Nagar, Chennai",
    },
    {
        "first_name": "Arjun",
        "last_name": "Reddy",
        "email": "arjun.reddy@example.com",
        "phone": "9876543216",
        "date_of_birth": "2005-12-04",
        "gender": "Male",
        "address": "56 Jubilee Hills, Hyderabad",
    },
    {
        "first_name": "Sara",
        "last_name": "Khan",
        "email": "sara.khan@example.com",
        "phone": "9876543217",
        "date_of_birth": "2007-02-27",
        "gender": "Female",
        "address": "9 Park Street, Kolkata",
    },
    {
        "first_name": "Rohan",
        "last_name": "Das",
        "email": "rohan.das@example.com",
        "phone": "9876543218",
        "date_of_birth": "2004-08-21",
        "gender": "Male",
        "address": "67 Boring Road, Patna",
    },
    {
        "first_name": "Nisha",
        "last_name": "Verma",
        "email": "nisha.verma@example.com",
        "phone": "9876543219",
        "date_of_birth": "2006-06-06",
        "gender": "Female",
        "address": "14 FC Road, Pune",
    },
]


def seed_students_and_admin(apps, schema_editor):
    User = apps.get_model("auth", "User")
    Student = apps.get_model("students", "Student")

    admin, _ = User.objects.update_or_create(
        username="admin",
        defaults={
            "email": "admin@example.com",
            "password": make_password("admin123"),
            "is_staff": True,
            "is_superuser": True,
            "is_active": True,
        },
    )
    admin.save()

    for student in STUDENTS:
        Student.objects.update_or_create(
            email=student["email"],
            defaults=student,
        )


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("students", "0004_remove_student_photo"),
    ]

    operations = [
        migrations.RunPython(seed_students_and_admin, migrations.RunPython.noop),
    ]
