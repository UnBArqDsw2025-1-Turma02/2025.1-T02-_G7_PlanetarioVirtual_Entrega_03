from fastapi import APIRouter, status,Request
from typing import List
from ..services.comentario_service import comment_service
from ..models.comentario_model import CommentCreate, CommentResponse
from app.decorators.auth_decorator import verificar_moderador_por_id

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

@router.delete("/{id_comentario}")
@verificar_moderador_por_id
async def deletar_comentario(id_comentario: int, request: Request):
    return comment_service.delete_comentario(id_comentario)