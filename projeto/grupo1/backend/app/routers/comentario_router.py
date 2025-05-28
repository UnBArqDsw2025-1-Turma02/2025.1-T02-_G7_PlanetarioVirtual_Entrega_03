from fastapi import APIRouter, status
from typing import List
from ..services.comentario_service import comment_service
from ..models.comentario_model import CommentCreate, CommentResponse

router = APIRouter(
    prefix="/comentarios",
    tags=["Comentários"]
)

@router.get("/", response_model=List[CommentResponse])
async def listar_comentarios():
    return comment_service.get_all_comments()

@router.post("/", response_model=CommentResponse, status_code=status.HTTP_201_CREATED)
async def criar_comentario(comment: CommentCreate):
    return comment_service.create_comment(comment)
