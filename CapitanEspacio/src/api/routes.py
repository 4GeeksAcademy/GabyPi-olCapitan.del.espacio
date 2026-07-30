from flask import Blueprint, request, jsonify
from api.models import db, User
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

CORS(api)


# Registro de Usuario
@api.route('/signup', methods=['POST'])
def handle_signup():
    body = request.get_json()

    # Validación de payload
    if not body or 'email' not in body or 'password' not in body or 'nickname' not in body:
        return jsonify({"msg": "Email, contraseña y apodo son requeridos"}), 400

    email = body.get('email', '').strip().lower()
    password = body.get('password')
    nickname = body.get('nickname', '').strip()

    if not email or not password or not nickname:
        return jsonify({"msg": "Los campos no pueden estar vacíos"}), 400

    # Comprobación de duplicados en BD
    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "El correo electrónico ya está registrado"}), 400

    if User.query.filter_by(nickname=nickname).first():
        return jsonify({"msg": "El apodo ya está en uso por otro tripulante"}), 400

    # Creación y persistencia del nuevo usuario
    new_user = User(
        email=email,
        password=password,
        nickname=nickname,
        is_active=True
    )
    
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Tripulante registrado exitosamente"}), 201


# Login y Generación de JWT
@api.route('/token', methods=['POST'])
def create_token():
    body = request.get_json()

    if not body or 'email' not in body or 'password' not in body:
        return jsonify({"msg": "Credenciales incompletas"}), 400

    email = body.get('email', '').strip().lower()
    password = body.get('password')

    user = User.query.filter_by(email=email, password=password).first()

    if not user:
        return jsonify({"msg": "Email o contraseña incorrectos"}), 401

    # Generación de token
    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        "access_token": access_token,
        "user": user.serialize()
    }), 200


# Obtener Datos del Perfil
@api.route('/perfil', methods=['GET'])
@jwt_required()
def get_perfil():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    return jsonify({"user": user.serialize()}), 200


# Actualizar apodo del perfil
@api.route('/perfil', methods=['PUT'])
@jwt_required()
def update_perfil():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    body = request.get_json()
    new_nickname = body.get('nickname', '').strip() if body else ''

    if not new_nickname:
        return jsonify({"msg": "El apodo es obligatorio"}), 400

    # Verificar disponibilidad del apodo
    existing_user = User.query.filter_by(nickname=new_nickname).first()
    if existing_user and str(existing_user.id) != str(current_user_id):
        return jsonify({"msg": "Este apodo ya está en uso por otro tripulante"}), 400

    user.nickname = new_nickname
    db.session.commit()

    return jsonify({
        "msg": "Apodo actualizado correctamente",
        "user": user.serialize()
    }), 200