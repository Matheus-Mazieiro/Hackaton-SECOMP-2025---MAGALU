# app.py
from flask import Flask, request, jsonify
import uuid
from datetime import datetime
from flask_socketio import SocketIO, emit
import time
from threading import Thread
import threading
import time
app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")  # * apenas para teste

# Mock de servidores disponíveis
AVAILABLE_SERVERS = {
    "pipoca": {"name": "Servidor Pipoca", "host": "10.0.0.10", "port": 9000, "members": {}, "start_time": time.time()},
    "x": {"name": "Servidor X", "host": "10.0.0.5", "port": 1234, "members": {}, "start_time": time.time()},
}
sessions = {}
# dicionário para mapear session_id -> sid
USER_CONNECTIONS = {}

# Endpoint de teste
@app.route('/hello', methods=['GET'])
def hello():
    return jsonify({"message": "Olá, mundo!"})

# Endpoint para receber dados
@app.route('/echo', methods=['POST'])
def echo():
    data = request.json  # Recebe JSON enviado pelo cliente
    return jsonify({"received": data})

@app.route("/join", methods=["POST"])
def join_server():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"ok": False, "error": "Esperado JSON no body."}), 400

    nome = data.get("name")
    server_id = data.get("server")

    # validações simples
    if not nome or not isinstance(nome, str) or nome.strip() == "":
        return jsonify({"ok": False, "error": "Campo 'nome' obrigatório."}), 400
    if not server_id or not isinstance(server_id, str) or server_id.strip() == "":
        return jsonify({"ok": False, "error": "Campo 'server' obrigatório."}), 400

    server_id = server_id.lower().strip()
    if server_id not in AVAILABLE_SERVERS:
        return jsonify({"ok": False, "error": f"Servidor '{server_id}' não encontrado."}), 404

    # criar sessão simulada
    session_id = str(uuid.uuid4())
    session = {
        "session_id": session_id,
        "server": server_id,
        "user": nome.strip(),
        "created_at": datetime.utcnow().isoformat() + "Z"
    }
    sessions[session_id] = session

    server_info = AVAILABLE_SERVERS[server_id].copy()
    # remover campos sensíveis se houver (aqui não tem)
    return jsonify({
        "ok": True,
        "message": f"Usuário '{nome}' entrou no servidor '{server_id}'.",
        "session": session,
        "server": server_info
    }), 200

@app.route("/sessions", methods=["GET"])
def list_sessions():
    return jsonify({"count": len(sessions), "sessions": list(sessions.values())})

@app.route("/rezet_servers", methods=["GET"])
def rezet_servers():
    AVAILABLE_SERVERS = {
        "pipoca": {"name": "Servidor Pipoca", "host": "10.0.0.10", "port": 9000, "members": {}},
        "x": {"name": "Servidor X", "host": "10.0.0.5", "port": 1234, "members": {}},
    }
    sessions = {}
    return list_sessions()

@app.route("/call_break/<server_id>", methods=["GET"])
def call_break_server(server_id):
    server_id = server_id.lower().strip()
    if server_id not in AVAILABLE_SERVERS:
        return jsonify({"ok": False, "error": f"Servidor '{server_id}' não encontrado."}), 404

    msg = f"Hora do break no servidor '{server_id}'! ⏰"

    # Iterar sobre todos os usuários conectados
    for session_id, sid in USER_CONNECTIONS.items():
        user_session = sessions.get(session_id)
        if user_session and user_session["server"] == server_id:
            socketio.emit("message", {"msg": msg}, to=sid)

    return jsonify({"ok": True, "message": f"Mensagem de break enviada para todos os usuários do servidor '{server_id}'."})

@app.route("/list_servers", methods=["GET"])
def list_servers():
    return jsonify(AVAILABLE_SERVERS)

@socketio.on("connect")
def handle_connect():
    list_sessions()
    print("Cliente conectado")
    emit("message", {"msg": "Bem-vindo!"})  # envia mensagem inicial


@socketio.on("authenticate")
def handle_auth(data):
    session_id = data.get("session_id")
    if session_id in sessions:
        user = sessions[session_id]["user"]
        # salva a conexão
        USER_CONNECTIONS[session_id] = request.sid
        emit("message", {"msg": f"Usuário '{user}' autenticado com sucesso!"})
    else:
        emit("message", {"msg": "Session_id inválido!"})

def send_to_user(session_id, msg):
    sid = USER_CONNECTIONS.get(session_id)
    if sid:
        emit("message", {"msg": msg}, to=sid)
    else:
        print(f"Usuário com session_id {session_id} não está conectado")

def break_loop(server_id="pipoca", interval=10):
    while True:
        msg = f"Hora do break no servidor '{server_id}'! ⏰"
        for session_id, sid in USER_CONNECTIONS.items():
            user_session = sessions.get(session_id)
            if user_session and user_session["server"] == server_id:
                socketio.emit("message", {"msg": msg}, to=sid)
        time.sleep(interval)
threading.Thread(target=break_loop, daemon=True).start()



if __name__ == '__main__':
    socketio.run(app, debug=True)
