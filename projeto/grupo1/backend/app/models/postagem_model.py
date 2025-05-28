from pydantic import BaseModel, Field
from typing import Literal

class PostCreate(BaseModel):
    titulo: str = Field(..., min_length=3, description="Título da postagem")
    conteudo: str = Field(..., min_length=5, description="Conteúdo da postagem")
    autor_id: int = Field(..., description="ID do autor da postagem")

class PostResponse(PostCreate):
    id: int
