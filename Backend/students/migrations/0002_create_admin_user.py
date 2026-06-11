from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.db import migrations


def create_default_admin(apps, schema_editor):
    app_label, model_name = settings.AUTH_USER_MODEL.split('.', 1)
    User = apps.get_model(app_label, model_name)
    admin, _ = User.objects.update_or_create(
        username='admin',
        defaults={
            'email': 'admin@example.com',
            'password': make_password('admin123'),
            'is_staff': True,
            'is_superuser': True,
            'is_active': True,
        },
    )
    admin.save()


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_default_admin),
    ]
