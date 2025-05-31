from fastapi import APIRouter, status,Request
from typing import List
from ..services.comentario_service import comment_service
from ..models.comentario_model import CommentCreate, CommentResponse
from app.decorators.auth_decorator import verificar_moderador_ou_autor_post,verificar_moderador_ou_autor_comentario

router = APIRouter(
    prefix="/comentarios",
    tags=["Comentários"]
)

@router.get("/", response_model=List[CommentResponse])
async def listar_comentarios():
    return comment_service.get_all_comments()


@router.post("/{id_post}", response_model=CommentResponse, status_code=status.HTTP_201_CREATED)
async def criar_comentario(id_post: int, comment: CommentCreate):
    return comment_service.create_comment(id_post, comment)

@router.delete("/{id_comentario}/{user_id}")  # ou é o autor
@verificar_moderador_ou_autor_comentario
async def deletar_comentario(id_comentario: int, user_id: int):
    return comment_service.delete_comment(id_comentario, user_id)
