# app/models/user_model.py
from pydantic import BaseModel, Field
from typing import Literal

class UserBase(BaseModel):
    nome: str = Field(..., min_length=3, description="Nome do usuário")
    tipo: Literal["comum", "moderador"] = Field(..., description="Tipo de usuário: 'comum' ou 'moderador'")

class UserCreate(UserBase):
    # Nenhum campo adicional por enquanto, mas poderia ter validações específicas para criação
    pass

class UserResponse(UserBase):
    id: int = Field(..., description="ID único do usuário")

    class Config:
        # Para Pydantic V1 e FastAPI < 0.100.0
        orm_mode = True
        # Para Pydantic V2 e FastAPI >= 0.100.0, use from_attributes = True
        # from_attributes = True