from pydantic import BaseModel

class CommentData(BaseModel):
    id: int
    conteudo: str
    autor_id: int
    postagem_id: int
