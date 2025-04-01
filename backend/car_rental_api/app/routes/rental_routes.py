from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.rental_service import get_all_rentals, create_rental, delete_rental
from app.extensions import db  # Import relatif correct

rental_bp = Blueprint("rental_bp", __name__, url_prefix="/rentals")


@rental_bp.route("/", methods=["GET"])
@jwt_required()
def fetch_rentals():
    rentals = get_all_rentals()
    return jsonify([{
        "id": r.id,
        "voiture_id": r.voiture_id,
        "date_debut": str(r.date_debut),
        "date_fin": str(r.date_fin),
        "prix_total": str(r.prix_total),
        "status": str(r.status)
    } for r in rentals])

@rental_bp.route("/", methods=["POST"])
@jwt_required()
def rent_car():
    data = request.json
    user_id = get_jwt_identity()
    data["utilisateur_id"] = user_id  # Associer la location à l'utilisateur connecté
    
    rental, error = create_rental(data)
    if error:
        return jsonify({"message": error}), 400
    
    return jsonify({"message": "Location enregistrée", "id": rental.id}), 201

@rental_bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def cancel_rental(id):
    rental = delete_rental(id)
    return jsonify({"message": "Location annulée"})