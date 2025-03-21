from app.extensions import db
from datetime import datetime, timezone

class Utilisateur(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(50), nullable=False)
    prenom = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    mot_de_passe_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default="client")
    date_creation = db.Column(db.DateTime, default=datetime.now(timezone.utc))  

class ModeleVoiture(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    marque = db.Column(db.String(50), nullable=False)
    modele = db.Column(db.String(50), nullable=False)
    annee = db.Column(db.Integer, nullable=False)
    prix_par_jour = db.Column(db.Numeric(10, 2), nullable=False)
    categorie = db.Column(db.String(30), nullable=True)
    image_voiture = db.Column(db.LargeBinary, nullable=True)  # Image en BLOB

class Voiture(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    modele_id = db.Column(db.Integer, db.ForeignKey('modele_voiture.id'), nullable=False)
    immatriculation = db.Column(db.String(20), unique=True, nullable=False)
    disponible = db.Column(db.Boolean, default=True)
    etat = db.Column(db.String(20), default="Neuve")

class Location(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    utilisateur_id = db.Column(db.Integer, db.ForeignKey('utilisateur.id'), nullable=False)
    voiture_id = db.Column(db.Integer, db.ForeignKey('voiture.id'), nullable=False)
    date_debut = db.Column(db.Date, nullable=False)
    date_fin = db.Column(db.Date, nullable=False)
    prix_total = db.Column(db.Numeric(10, 2), nullable=False)
    status = db.Column(db.String(20), default="En cours")