import base64
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.services.car_service import (
    get_all_models, create_model, update_model, delete_model,
    get_all_cars, create_car, delete_car
)

from app.extensions import db  # Import relatif correct

car_bp = Blueprint("car_bp", __name__, url_prefix="/cars")

# Récupérer tous les modèles
@car_bp.route("/models", methods=["GET"])
def fetch_models():
    models = get_all_models()
    return jsonify([{
        "id": m.id,
        "marque": m.marque,
        "modele": m.modele,
        "annee": m.annee,
        "prix_par_jour": float(m.prix_par_jour),
        "categorie": m.categorie,
        "image_voiture": base64.b64encode(m.image_voiture).decode('utf-8') if m.image_voiture else None
    } for m in models])

# Créer un nouveau modèle
@car_bp.route("/models", methods=["POST"])
@jwt_required()
def create_new_model():
    data = request.json
    image = base64.b64decode(data["image_voiture"]) if "image_voiture" in data else None
    model = create_model(data, image)
    return jsonify({"message": "Modèle ajouté", "id": model.id}), 201

# Modifier un modèle existant
@car_bp.route("/models/<int:id>", methods=["PUT"])
@jwt_required()
def update_existing_model(id):
    data = request.json
    image = base64.b64decode(data["image_voiture"]) if "image_voiture" in data else None
    model = update_model(id, data, image)
    return jsonify({"message": "Modèle mis à jour", "id": model.id})

# Supprimer un modèle
@car_bp.route("/models/<int:id>", methods=["DELETE"])
@jwt_required()
def remove_model(id):
    delete_model(id)
    return jsonify({"message": "Modèle supprimé"})

# Récupérer toutes les voitures
@car_bp.route("/", methods=["GET"])
def fetch_cars():
    cars = get_all_cars()
    return jsonify([{
        "id": c.id,
        "immatriculation": c.immatriculation,
        "disponible": c.disponible,
        "etat": c.etat
    } for c in cars])

# Créer une nouvelle voiture
@car_bp.route("/", methods=["POST"])
@jwt_required()
def create_new_car():
    data = request.json
    car = create_car(data)
    return jsonify({"message": "Voiture ajoutée", "id": car.id}), 201

# Supprimer une voiture
@car_bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def remove_car(id):
    delete_car(id)
    return jsonify({"message": "Voiture supprimée"})
