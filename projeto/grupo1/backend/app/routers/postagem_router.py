from fastapi import APIRouter, HTTPException, status,Request
from typing import List
from ..services.postagem_service import post_service
from ..models.postagem_model import PostCreate, PostResponse
from app.decorators.auth_decorator import VerificadorPermissaoFactory

router = APIRouter(
    prefix="/postagens",
    tags=["Postagens"]
)

@router.get("/", response_model=List[PostResponse])
async def listar_postagens():
    return post_service.get_all_posts()

@router.post("/", response_model=PostResponse, status_code=status.HTTP_201_CREATED)
async def criar_postagem(post: PostCreate):
    return post_service.create_post(post)

@router.get("/{id_post}/comentarios")
async def listar_comentarios_por_postagem(id_post: int):
    comentarios = post_service.get_comments_by_post_id(id_post)
    post = post_service.get_post_by_id(id_post)
    if post is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Postagem não encontrada.")
    
    if comentarios is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Postagem não encontrada.")

    return {
        "conteudo_post": post.conteudo,
        "postagem_id": id_post,
        "numero_comentarios": len(comentarios),
        "comentarios": comentarios
    }


@router.delete("/{id_post}/{user_id}")  # ou é o autor
@VerificadorPermissaoFactory.criar_verificador("post")
async def delete_post(id_post: int, user_id: int):
    return post_service.delete_post(id_post, user_id)


