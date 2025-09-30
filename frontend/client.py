import requests
import socketio

join_url = "http://127.0.0.1:5000/join"
data = {"name": "theuszin", "server": "pipoca"}
resp = requests.post(join_url, json=data)
resp_json = resp.json()

if not resp_json.get("ok"):
    print("Erro ao entrar no servidor:", resp_json.get("error"))
    exit()

session_id = resp_json["session"]["session_id"]
print("Sessão criada com ID:", session_id)

sio = socketio.Client()

@sio.event
def connect():
    print("Conectado ao servidor via SocketIO!")
    # enviar session_id ao servidor
    sio.emit("authenticate", {"session_id": session_id})

@sio.on("message")
def handle_message(data):
    print("Mensagem do servidor:", data)

@sio.event
def disconnect():
    print("Desconectado do servidor")

# Conectar ao SocketIO (mesmo host do Flask)
sio.connect("http://127.0.0.1:5000")
sio.wait()
