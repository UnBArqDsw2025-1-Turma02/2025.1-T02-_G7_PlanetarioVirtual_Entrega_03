import json
from pathlib import Path
from typing import List, Optional
from ..models.postagem_model import PostCreate
from ..data_classes.postagem_data import PostData

DB_PATH = Path("db.json")

class PostService:
    def __init__(self, db_path: Path = DB_PATH):
        self.db_path = db_path

    def _load_db(self) -> dict:
        if not self.db_path.exists():
            return {"usuarios": [], "postagens": []}
        with open(self.db_path, "r", encoding="utf-8") as f:
            return json.load(f)

    def _save_db(self, db: dict):
        with open(self.db_path, "w", encoding="utf-8") as f:
            json.dump(db, f, indent=2, ensure_ascii=False)

    def get_all_posts(self) -> List[PostData]:
        db = self._load_db()
        return [PostData(**post_data) for post_data in db.get("postagens", [])]

    def create_post(self, post_data: PostCreate) -> PostData:
        db = self._load_db()
        postagens = db.get("postagens", [])

        existing_ids = [int(p["id"]) for p in postagens if str(p["id"]).isdigit()]
        next_id = max(existing_ids) + 1 if existing_ids else 1

        new_post = {
            "id": next_id,
            "titulo": post_data.titulo,
            "conteudo": post_data.conteudo,
            "autor_id": post_data.autor_id
        }

        db["postagens"].append(new_post)
        self._save_db(db)

        return PostData(**new_post)
    def delete_post(self, id_post: int) -> dict:
        db = self._load_db()
        postagens = db.get("postagens", [])
        new_postagens = [p for p in postagens if p["id"] != id_post]
        if len(new_postagens) == len(postagens):
            raise ValueError(f"Post com ID {id_post} não encontrado.")
        db["postagens"] = new_postagens
        self._save_db(db)
        return {"message": f"Post {id_post} excluído com sucesso."}

# Instância global
post_service = PostService()
