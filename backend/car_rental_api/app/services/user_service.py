from app.models import Utilisateur
from app.extensions import db
from werkzeug.security import generate_password_hash

def get_all_users():
    return Utilisateur.query.all()

def get_user_by_id(user_id):
    return Utilisateur.query.get(user_id)

def create_user(data):
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

def update_user(user, data):
    user.nom = data.get("nom", user.nom)
    user.prenom = data.get("prenom", user.prenom)
    user.email = data.get("email", user.email)
    user.mot_de_passe_hash = generate_password_hash(data["mot_de_passe"], method="pbkdf2:sha256")
    user.role = data.get("role", user.role)
    db.session.commit()
    return user

def delete_user(user):
    db.session.delete(user)
    db.session.commit()