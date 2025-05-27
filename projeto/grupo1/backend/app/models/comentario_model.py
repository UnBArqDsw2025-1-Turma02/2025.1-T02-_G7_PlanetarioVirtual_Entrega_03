# app/models/comment_model.py
from pydantic import BaseModel, Field
from typing import Optional

class CommentBase(BaseModel):
    texto: str = Field(..., min_length=1, description="Texto do comentário")

class CommentCreate(CommentBase):
    # Pode incluir validações específicas para criação no futuro
    pass

class CommentResponse(CommentBase):
    id: int = Field(..., description="ID único do comentário")
    autorId: int = Field(..., description="ID do usuário autor do comentário")
    postagemId: int = Field(..., description="ID da postagem associada ao comentário")
    dataCriacao: Optional[str] = Field(None, description="Data de criação do comentário no formato ISO 8601")

    class Config:
        orm_mode = True
        # from_attributes = True  # Descomente se usar Pydantic v2
