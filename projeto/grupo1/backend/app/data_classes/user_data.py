# app/data_classes/user_data.py
from dataclasses import dataclass

@dataclass
class UserData:
    id: int
    nome: str
    tipo: str  # "comum" ou "moderador"