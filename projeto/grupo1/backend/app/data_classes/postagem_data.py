from pydantic import BaseModel
from datetime import date

class PostData(BaseModel):
    id: int
    titulo: str
    conteudo: str
    autor_id: int
    data_criacao: date
