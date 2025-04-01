from flask import Blueprint, request, jsonify
from app.services.auth_service import register_user, authenticate_user
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.extensions import db  # Import relatif correct

auth_bp = Blueprint("auth_bp", __name__, url_prefix="/auth")

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    if "email" not in data or "mot_de_passe" not in data:
        return jsonify({"message": "Champs requis manquants"}), 400

    user = register_user(data)
    token = authenticate_user(data["email"], data["mot_de_passe"])
    return jsonify({"message": "Utilisateur créé", "id": user.id, "token": token}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    token = authenticate_user(data["email"], data["mot_de_passe"])

    if not token:
        return jsonify({"message": "Identifiants invalides"}), 401

    return jsonify({"access_token": token})

@auth_bp.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    user_info = get_jwt_identity()
    return jsonify({"message": "Profil utilisateur", "user_info": user_info})
