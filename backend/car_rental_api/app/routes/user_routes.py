from flask import Blueprint, request, jsonify
from app.services.user_service import get_all_users, get_user_by_id, create_user, update_user, delete_user
from app.extensions import db  # Import relatif correct

user_bp = Blueprint("user_bp", __name__, url_prefix="/users")


@user_bp.route("/", methods=["GET"])
def fetch_users():
    users = get_all_users()
    return jsonify([{"id": u.id, "nom": u.nom, "email": u.email} for u in users])

@user_bp.route("/<int:id>", methods=["GET"])
def fetch_user(id):
    user = get_user_by_id(id)
    if not user:
        return jsonify({"message": "Utilisateur non trouvé"}), 404
    return jsonify({"id": user.id, "nom": user.nom, "email": user.email})

@user_bp.route("/", methods=["POST"])
def create_new_user():
    data = request.json
    user = create_user(data)
    return jsonify({"message": "Utilisateur créé", "id": user.id}), 201

@user_bp.route("/<int:id>", methods=["PUT"])
def modify_user(id):
    user = get_user_by_id(id)
    if not user:
        return jsonify({"message": "Utilisateur non trouvé"}), 404

    data = request.json
    updated_user = update_user(user, data)
    return jsonify({"message": "Utilisateur mis à jour", "id": updated_user.id})

@user_bp.route("/<int:id>", methods=["DELETE"])
def remove_user(id):
    user = get_user_by_id(id)
    if not user:
        return jsonify({"message": "Utilisateur non trouvé"}), 404

    delete_user(user)
    return jsonify({"message": "Utilisateur supprimé"})