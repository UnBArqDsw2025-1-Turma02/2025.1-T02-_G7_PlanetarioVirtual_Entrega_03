# app/models/post_model.py
from pydantic import BaseModel, Field
from typing import List, Optional
from app.models.user_model import UserResponse
from app.models.comment_model import CommentResponse

class PostBase(BaseModel):
    texto: str = Field(..., min_length=1, description="Conteúdo da postagem")

class PostCreate(PostBase):
    # Pode incluir validações específicas para criação no futuro
    pass

class PostResponse(PostBase):
    id: int = Field(..., description="ID único da postagem")
    autorId: int = Field(..., description="ID do usuário autor da postagem")
    dataCriacao: Optional[str] = Field(None, description="Data de criação da postagem no formato ISO 8601")
    autor: Optional[UserResponse] = Field(None, description="Dados do autor da postagem")
    comentarios: Optional[List[CommentResponse]] = Field([], description="Lista de comentários associados à postagem")

    class Config:
        orm_mode = True
        # from_attributes = True  # Descomente se usar Pydantic v2
