import json
from pathlib import Path
from typing import List
from ..models.comentario_model import CommentCreate
from ..data_classes.comentario_data import CommentData

DB_PATH = Path("db.json")

class CommentService:
    def __init__(self, db_path: Path = DB_PATH):
        self.db_path = db_path

    def _load_db(self) -> dict:
        if not self.db_path.exists():
            return {"comentarios": []}
        with open(self.db_path, "r", encoding="utf-8") as f:
            return json.load(f)

    def _save_db(self, db: dict):
        with open(self.db_path, "w", encoding="utf-8") as f:
            json.dump(db, f, indent=2, ensure_ascii=False)

    def get_all_comments(self) -> List[CommentData]:
        db = self._load_db()
        return [CommentData(**c) for c in db.get("comentarios", [])]

    def create_comment(self, comment_data: CommentCreate) -> CommentData:
        db = self._load_db()
        comentarios = db.get("comentarios", [])

        existing_ids = [int(c["id"]) for c in comentarios if str(c["id"]).isdigit()]
        next_id = max(existing_ids) + 1 if existing_ids else 1

        new_comment = {
            "id": next_id,
            "conteudo": comment_data.conteudo,
            "autor_id": comment_data.autor_id,
            "postagem_id": comment_data.postagem_id
        }

        db.setdefault("comentarios", []).append(new_comment)
        self._save_db(db)

        return CommentData(**new_comment)
    def delete_comment(self, id_comment: int) -> dict:
        db = self._load_db()
        comentarios = db.get("comentarios", [])
        new_comentarios = [c for c in comentarios if c["id"] != id_comment]
        if len(new_comentarios) == len(comentarios):
            raise ValueError(f"Comentário com ID {id_comment} não encontrado.")
        db["comentarios"] = new_comentarios
        self._save_db(db)
        return {"message": f"Comentário {id_comment} excluído com sucesso."}

# Instância global
comment_service = CommentService()
