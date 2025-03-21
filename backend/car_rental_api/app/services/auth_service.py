from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from app.models import Utilisateur
from app.extensions import db
from datetime import timedelta

def register_user(data):
    """Créer un utilisateur avec mot de passe hashé"""
    hashed_password = generate_password_hash(data["mot_de_passe"], method="pbkdf2:sha256")

    new_user = Utilisateur(
        nom=data["nom"],
        prenom=data["prenom"],
        email=data["email"],
        mot_de_passe_hash=hashed_password,
        role=data["role"]
    )
    db.session.add(new_user)
    db.session.commit()

    return new_user

def authenticate_user(email, password):
    """Vérifie l'authentification et retourne un JWT si valide"""
    user = Utilisateur.query.filter_by(email=email).first()
    print(f"user.id: {user.id}, type: {type(user.id)}")
    
    if user and check_password_hash(user.mot_de_passe_hash, password):
        token = create_access_token(identity={
            "id": str(user.id),
            "nom": user.nom,
            "prenom": user.prenom,
            "email": user.email
        }, expires_delta=timedelta(hours=1))
        return token
    return None