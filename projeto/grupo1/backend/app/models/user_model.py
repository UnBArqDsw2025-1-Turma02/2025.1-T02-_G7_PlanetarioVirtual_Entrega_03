from pydantic import BaseModel, Field
from typing import Literal

class UserCreate(BaseModel):
    nome: str = Field(..., min_length=3)
    tipo: Literal["comum", "moderador"]

class UserResponse(UserCreate):
    id: int
