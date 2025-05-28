from pydantic import BaseModel

class PostData(BaseModel):
    id: int
    titulo: str
    conteudo: str
    autor_id: int
