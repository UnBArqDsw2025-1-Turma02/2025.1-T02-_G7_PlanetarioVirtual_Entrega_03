import json
from pathlib import Path
from typing import List, Optional

from ..data_classes.user_data import UserData
from ..models.user_model import UserCreate

DB_PATH = Path("db.json")

class ForumService:
    def __init__(self, db_path: Path = DB_PATH):
        self.db_path = db_path

    def _load_db(self) -> dict:
        if not self.db_path.exists():
            return {"usuarios": []}
        with open(self.db_path, "r", encoding="utf-8") as f:
            return json.load(f)

    def _save_db(self, db: dict):
        with open(self.db_path, "w", encoding="utf-8") as f:
            json.dump(db, f, indent=2, ensure_ascii=False)

    def get_all_users(self) -> List[UserData]:
        db = self._load_db()
        return [UserData(**u) for u in db.get("usuarios", [])]

    def create_user(self, user_create_data: UserCreate) -> UserData:
        db = self._load_db()
        usuarios = db.get("usuarios", [])
        existing_ids = [int(u["id"]) for u in usuarios if str(u["id"]).isdigit()]
        next_id = max(existing_ids) + 1 if existing_ids else 1

        new_user = {
            "id": next_id,
            "nome": user_create_data.nome,
            "tipo": user_create_data.tipo
        }

        db["usuarios"].append(new_user)
        self._save_db(db)

        return UserData(**new_user)
    
    def delete_user(self, user_id: int) -> dict:
        db = self._load_db()
        usuarios = db.get("usuarios", [])

        new_usuarios = [u for u in usuarios if u["id"] != user_id]
        if len(new_usuarios) == len(usuarios):
            raise ValueError(f"Usuário com ID {user_id} não encontrado.")

        db["usuarios"] = new_usuarios
        self._save_db(db)

        return {"message": f"Usuário {user_id} excluído com sucesso."}
    
    def get_user_by_id(self, user_id: int) -> Optional[UserData]:
        db = self._load_db()
        user = next((u for u in db.get("usuarios", []) if u["id"] == user_id), None)
        return UserData(**user) if user else None

forum_service = ForumService()
