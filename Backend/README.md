# School Management System Backend

This is the Django REST Framework backend for the Student Management Module.

## Requirements

- Python 3.11+ / 3.10+
- Django
- Django REST Framework
- SimpleJWT
- django-cors-headers

## Installation

1. Create a virtual environment:

```bash
python -m venv venv
```

2. Activate the environment:

```bash
venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Run migrations:

```bash
python manage.py migrate
```

This backend includes a default administrator user created by migrations:

- username: `admin`
- password: `admin123`

If you want to add another admin user:

```bash
python manage.py createsuperuser
```

## Running the backend

```bash
python manage.py runserver
```

The API will be available at `http://127.0.0.1:8000/api/`.

## API Endpoints

- `POST /api/login/` - JWT token obtain
- `GET /api/students/` - List students with search and pagination
- `POST /api/students/` - Create student
- `GET /api/students/{id}/` - Retrieve student
- `PUT /api/students/{id}/` - Update student
- `DELETE /api/students/{id}/` - Delete student

## Deployment

- Use SQLite for development and small deployments.
- For Render, set `DEBUG=False`, configure `ALLOWED_HOSTS`, and add static file handling.
- Use `python manage.py collectstatic` if static files are served by the platform.
