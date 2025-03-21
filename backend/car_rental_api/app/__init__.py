from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
# from flask_jwt_extended import JWTManager
# from flask_cors import CORS
# from app.config import Config

# jwt = JWTManager()

# def create_app():
#     app = Flask(__name__)
#     app.config.from_object(Config)

#     db = SQLAlchemy(app)
#     migrate = Migrate(app, db)
    
#     app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://admin:password@db:5432/car_rental_db"
#     app.config["JWT_SECRET_KEY"] = "supersecretkey"

#     db.init_app(app)
#     migrate.init_app(app, db)
#     jwt.init_app(app)
#     CORS(app)

#     # Importer et enregistrer les routes
#     from app.routes.auth_routes import auth_bp
#     from app.routes.user_routes import user_bp
#     from app.routes.car_routes import car_bp
#     from app.routes.rental_routes import rental_bp

#     app.register_blueprint(auth_bp, url_prefix='/auth')
#     app.register_blueprint(user_bp, url_prefix='/users')
#     app.register_blueprint(car_bp, url_prefix='/cars')
#     app.register_blueprint(rental_bp, url_prefix='/rentals')

#     return app

from flask import Flask
from .extensions import db
from flask_migrate import Migrate
import os
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from app.config import Config

migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)

    # Configuration de la base de données PostgreSQL
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialisation de l'extension SQLAlchemy
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    CORS(app)

    # Importer et enregistrer les routes
    from app.routes.auth_routes import auth_bp
    from app.routes.user_routes import user_bp
    from app.routes.car_routes import car_bp
    from app.routes.rental_routes import rental_bp

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(user_bp, url_prefix='/users')
    app.register_blueprint(car_bp, url_prefix='/cars')
    app.register_blueprint(rental_bp, url_prefix='/rentals')

    return app