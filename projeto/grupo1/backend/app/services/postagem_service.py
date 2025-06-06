import json
from pathlib import Path
from typing import List, Optional
from ..models.postagem_model import PostCreate
from ..data_classes.postagem_data import PostData
from datetime import datetime

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
    
    def get_comments_by_post_id(self, post_id: int) -> List[dict]:
        db = self._load_db()
        comentarios = db.get("comentarios", [])
        return [c for c in comentarios if c.get("postagem_id") == post_id]
    
    def create_post(self, post_data: PostCreate) -> PostData:
        db = self._load_db()
        postagens = db.get("postagens", [])

        existing_ids = [int(p["id"]) for p in postagens if str(p["id"]).isdigit()]
        next_id = max(existing_ids) + 1 if existing_ids else 1

        numero_comentarios = len(self.get_comments_by_post_id(next_id))

        nome_autor = next((u["nome"] for u in db.get("usuarios", []) if u["id"] == post_data.autor_id), "Autor Desconhecido")
        if not nome_autor:
            raise ValueError(f"Autor com ID {post_data.autor_id} não encontrado.")

        new_post = {
            "id": next_id,
            "conteudo": post_data.conteudo,
            "autor_id": post_data.autor_id,
            "data_criacao": datetime.now().isoformat(),  # Usando a data atual
            "numero_comentarios": numero_comentarios,
            "nome_autor": nome_autor  # Placeholder, deve ser substituído pelo nome real do autor
        }

        db["postagens"].append(new_post)
        self._save_db(db)

        return PostData(**new_post)
    def delete_post(self, id_post: int, user_id: int) -> dict:
        db = self._load_db()
      
        
        # Remove a postagem
        postagens = db.get("postagens", [])
        new_postagens = [p for p in postagens if p["id"] != id_post]
        if len(new_postagens) == len(postagens):
            raise ValueError(f"Post com ID {id_post} não encontrado.")
        db["postagens"] = new_postagens

        # Remove os comentários relacionados à postagem
        comentarios = db.get("comentarios", [])
        db["comentarios"] = [c for c in comentarios if c.get("postagem_id") != id_post]

        self._save_db(db)
        return {"message": f"Post {id_post} e seus comentários foram excluídos com sucesso."}
    def get_post_by_id(self, post_id: int) -> Optional[PostData]:
        db = self._load_db()
        post = next((p for p in db.get("postagens", []) if p["id"] == post_id), None)
        return PostData(**post) if post else None
    
# Instância global
post_service = PostService()
