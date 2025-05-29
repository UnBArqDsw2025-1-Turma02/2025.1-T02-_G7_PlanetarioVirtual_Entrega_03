from pydantic import BaseModel
from typing import Literal

class UserData(BaseModel):
    id: int
    nome: str
    tipo: Literal["comum", "moderador"]
