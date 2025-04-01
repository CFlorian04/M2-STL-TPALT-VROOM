from app.extensions import db
from app.models import ModeleVoiture, Voiture
import base64

# Services

def get_all_models():
    return ModeleVoiture.query.all()

def create_model(data, image):
    new_model = ModeleVoiture(
        marque=data["marque"],
        modele=data["modele"],
        annee=data["annee"],
        prix_par_jour=data["prix_par_jour"],
        categorie=data.get("categorie"),
        image_voiture=image
    )
    db.session.add(new_model)
    db.session.commit()
    return new_model

def update_model(model_id, data, image=None):
    model = ModeleVoiture.query.get_or_404(model_id)
    model.marque = data.get("marque", model.marque)
    model.modele = data.get("modele", model.modele)
    model.annee = data.get("annee", model.annee)
    model.prix_par_jour = data.get("prix_par_jour", model.prix_par_jour)
    model.categorie = data.get("categorie", model.categorie)

    if image:
        model.image_voiture = image

    db.session.commit()
    return model

def delete_model(model_id):
    model = ModeleVoiture.query.get_or_404(model_id)
    db.session.delete(model)
    db.session.commit()

def get_all_cars():
    return Voiture.query.all()

def create_car(data):
    new_car = Voiture(
        modele_id=data["modele_id"],
        immatriculation=data["immatriculation"],
        disponible=data.get("disponible", True),
        etat=data.get("etat")
    )
    db.session.add(new_car)
    db.session.commit()
    return new_car

def delete_car(car_id):
    car = Voiture.query.get_or_404(car_id)
    db.session.delete(car)
    db.session.commit()
