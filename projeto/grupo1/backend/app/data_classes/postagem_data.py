from pydantic import BaseModel
from datetime import datetime

class PostData(BaseModel):
    id: int
    conteudo: str
    autor_id: int
    data_criacao: datetime
    nome_autor: str 
