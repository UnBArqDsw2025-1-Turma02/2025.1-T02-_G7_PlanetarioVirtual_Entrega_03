from pydantic import BaseModel
from datetime import datetime
class CommentData(BaseModel):
    id: int
    conteudo: str
    autor_id: int
    postagem_id: int
    data_criacao: datetime
    nome_autor: str 