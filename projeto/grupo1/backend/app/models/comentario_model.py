from pydantic import BaseModel, Field

class CommentCreate(BaseModel):
    conteudo: str = Field(..., min_length=1)
    autor_id: int
    postagem_id: int

class CommentResponse(CommentCreate):
    id: int
