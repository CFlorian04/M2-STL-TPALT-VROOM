# backend/Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

ENV SQLALCHEMY_DATABASE_URI=postgresql://admin:zStHuhyDHR9XdUW8rMMQgUo9Ag83H339@dpg-cvn8pmfgi27c73bivi4g-a/car_rental_db_rv72
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV FLASK_APP=run.py
ENV FLASK_ENV=development

# Appliquer les migrations et démarrer l'application
CMD ["sh", "-c", "flask db upgrade && flask run --host=0.0.0.0 --port=5000"]
