from pydantic import BaseModel, Field
from datetime import datetime

class CommentCreate(BaseModel):
    conteudo: str = Field(..., min_length=1)
    autor_id: int
    

class CommentResponse(CommentCreate):
    id: int
    data_criacao: datetime
    nome_autor: str 
    postagem_id: int