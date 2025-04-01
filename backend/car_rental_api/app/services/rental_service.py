from app.models import Location, Voiture
from app.extensions import db

def get_all_rentals():
    return Location.query.all()

def create_rental(data):
    voiture = Voiture.query.get(data["voiture_id"])
    if not voiture or not voiture.disponible:
        return None, "Voiture indisponible"

    new_rental = Location(
        utilisateur_id=data["utilisateur_id"],
        voiture_id=data["voiture_id"],
        date_debut=data["date_debut"],
        date_fin=data["date_fin"],
        prix_total=data["prix_total"],
        status=data["status"]
    )
    
    voiture.disponible = False  # Marquer la voiture comme louée
    db.session.add(new_rental)
    db.session.commit()
    
    return new_rental, None

def delete_rental(rental):
    voiture = Voiture.query.get(rental.voiture_id)
    voiture.disponible = True  # Rendre la voiture disponible après suppression de la location
    db.session.delete(rental)
    db.session.commit()