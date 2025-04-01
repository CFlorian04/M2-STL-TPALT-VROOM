# backend/Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV FLASK_APP=run.py
ENV FLASK_ENV=development

# Appliquer les migrations et démarrer l'application
CMD ["sh", "-c", "flask db upgrade && flask run --host=0.0.0.0 --port=5000"]
