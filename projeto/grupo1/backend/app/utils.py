import json
from threading import Lock

DB_PATH = "./app/db.json"
lock = Lock()

def ler_db():
    with lock:
        with open(DB_PATH, "r", encoding="utf-8") as f:
            return json.load(f)

def salvar_db(data):
    with lock:
        with open(DB_PATH, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4, ensure_ascii=False)

def proximo_id(lista):
    if not lista:
        return 1
    return max(item["id"] for item in lista) + 1
