# Marketplace Web Project

## Project Description

This is a simple **Marketplace web application** developed as a student project for KBTU Web Development course.  
The project is built using **Django + Django REST Framework** for the backend and **Angular** for the frontend.

The application allows users to:

- Register and log in using **JWT authentication**
- View a list of products
- Add new products (for authenticated users)
- Edit or delete products they own
- Interact with products through forms and buttons (CRUD operations)
- Navigate between different pages via Angular routing

The project demonstrates:

- Full **frontend-backend integration** via REST API
- Use of Angular features such as `HttpClient`, `ngModel`, event handling, routing, loops, and conditional rendering
- Backend models with **ForeignKey relationships**
- Token-based authentication
- CORS configuration for frontend-backend communication
- Error handling and user feedback for failed API requests

---

## Project Structure

```text
web-dev-marketplace/
├── backend/ # Django REST Framework
│ ├── marketplace/ # Project settings
│ ├── apps/ # Core logic (users, products, orders)
│ └── requirements.txt
└── frontend/ # Angular Application
└── marketplace-front/
```

---

## Group Members

| Name                    | Role          |
| ----------------------- | ------------- |
| Anastassiya Zagvozdkina | Backend Lead  |
| Miras Zhumatayev        | Backend Lead  |
| Nurzhan Abdimanap       | Frontend Lead |

---

## Installation

### Backend

1. Navigate to backend folder:

```bash
cd backend
```

2. Create virtual environment and activate it:

```bash
python -m venv venv
source venv/bin/activate  # Mac/Linux
# venv\Scripts\activate    # Windows
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Apply migrations:

```bash
python manage.py migrate
```

5. Run the backend server:

```bash
python manage.py runserver
```

### Frontend

1. Navigate to frontend folder:

```bash
cd frontend/marketplace-front
```

2. Install Angular dependencies:

```bash
npm install
```

3. Run the frontend development server:

```bash
ng serve
```

The Angular app will be available at http://localhost:4200 and will communicate with the Django backend at http://127.0.0.1:8000.
