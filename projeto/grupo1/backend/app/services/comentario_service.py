import json
from pathlib import Path
from typing import List
from ..models.comentario_model import CommentCreate
from ..data_classes.comentario_data import CommentData
from datetime import datetime

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

    def create_comment(self, id_post: int, comment_data: CommentCreate) -> CommentData:
        db = self._load_db()
        comentarios = db.get("comentarios", [])

        existing_ids = [int(c["id"]) for c in comentarios if str(c["id"]).isdigit()]
        next_id = max(existing_ids) + 1 if existing_ids else 1
        nome_autor = next((u["nome"] for u in db.get("usuarios", []) if u["id"] == comment_data.autor_id), "Autor Desconhecido")
        if not nome_autor:
            raise ValueError(f"Autor com ID {comment_data.autor_id} não encontrado.")

        new_comment = {
            "id": next_id,
            "conteudo": comment_data.conteudo,
            "autor_id": comment_data.autor_id,
            "postagem_id": id_post,
            "data_criacao": datetime.now().isoformat() , # Usando a data atual
            "nome_autor": nome_autor
        }

        db.setdefault("comentarios", []).append(new_comment)
        self._save_db(db)

        return CommentData(**new_comment)
    
    def delete_comment(self, id_comment: int, user_id: int) -> dict:
        db = self._load_db()
        comentarios = db.get("comentarios", [])
        comentario = next((c for c in comentarios if c["id"] == id_comment), None)

        if not comentario:
            raise ValueError(f"Comentário com ID {id_comment} não encontrado.")

        # Remover o comentário da lista
        comentarios = [c for c in comentarios if c["id"] != id_comment]
        db["comentarios"] = comentarios

        self._save_db(db)
        return {"message": f"Comentário {id_comment} excluído com sucesso."}
    
    def get_comment_by_id(self, id_comment: int) -> CommentData:
        db = self._load_db()
        comentario = next((c for c in db.get("comentarios", []) if c["id"] == id_comment), None)

        if not comentario:
            raise ValueError(f"Comentário com ID {id_comment} não encontrado.")

        return CommentData(**comentario)



# Instância global
comment_service = CommentService()
