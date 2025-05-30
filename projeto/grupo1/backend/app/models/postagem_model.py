from pydantic import BaseModel, Field
from typing import Literal
from datetime import datetime

class PostCreate(BaseModel):
    conteudo: str = Field(..., min_length=5, description="Conteúdo da postagem")
    autor_id: int = Field(..., description="ID do autor da postagem")#colocar nome do autor
   

class PostResponse(PostCreate):
    id: int
    data_criacao: datetime
    nome_autor: str = Field(..., description="Nome do autor da postagem")
