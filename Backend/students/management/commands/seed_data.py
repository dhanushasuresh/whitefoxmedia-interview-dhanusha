from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

from students.models import Student


STUDENTS = [
    ("Aarav", "Sharma", "aarav.sharma@example.com", "9876543210", "2005-01-15", "Male", "12 MG Road, Bengaluru"),
    ("Ananya", "Menon", "ananya.menon@example.com", "9876543211", "2006-03-22", "Female", "45 Anna Salai, Chennai"),
    ("Vihaan", "Patel", "vihaan.patel@example.com", "9876543212", "2005-07-09", "Male", "78 CG Road, Ahmedabad"),
    ("Diya", "Nair", "diya.nair@example.com", "9876543213", "2007-11-30", "Female", "23 Marine Drive, Kochi"),
    ("Kabir", "Singh", "kabir.singh@example.com", "9876543214", "2004-05-18", "Male", "19 Civil Lines, Delhi"),
    ("Meera", "Iyer", "meera.iyer@example.com", "9876543215", "2006-09-12", "Female", "31 T Nagar, Chennai"),
    ("Arjun", "Reddy", "arjun.reddy@example.com", "9876543216", "2005-12-04", "Male", "56 Jubilee Hills, Hyderabad"),
    ("Sara", "Khan", "sara.khan@example.com", "9876543217", "2007-02-27", "Female", "9 Park Street, Kolkata"),
    ("Rohan", "Das", "rohan.das@example.com", "9876543218", "2004-08-21", "Male", "67 Boring Road, Patna"),
    ("Nisha", "Verma", "nisha.verma@example.com", "9876543219", "2006-06-06", "Female", "14 FC Road, Pune"),
]


class Command(BaseCommand):
    help = "Create the default admin user and 10 sample students."

    def handle(self, *args, **options):
        User = get_user_model()
        admin, _ = User.objects.update_or_create(
            username="admin",
            defaults={
                "email": "admin@example.com",
                "is_staff": True,
                "is_superuser": True,
                "is_active": True,
            },
        )
        admin.set_password("admin123")
        admin.save()

        created = 0
        updated = 0
        for first_name, last_name, email, phone, dob, gender, address in STUDENTS:
            _, was_created = Student.objects.update_or_create(
                email=email,
                defaults={
                    "first_name": first_name,
                    "last_name": last_name,
                    "phone": phone,
                    "date_of_birth": dob,
                    "gender": gender,
                    "address": address,
                },
            )
            created += int(was_created)
            updated += int(not was_created)

        self.stdout.write(self.style.SUCCESS("Admin user ready: admin / admin123"))
        self.stdout.write(self.style.SUCCESS(f"Students seeded: {created} created, {updated} updated"))
