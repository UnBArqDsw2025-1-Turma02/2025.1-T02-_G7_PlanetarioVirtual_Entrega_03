from fastapi import APIRouter, HTTPException, status,Request
from typing import List
from ..services.postagem_service import post_service
from ..models.postagem_model import PostCreate, PostResponse
from app.decorators.auth_decorator import verificar_moderador_por_id


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


@router.delete("/{id_post}")
@verificar_moderador_por_id
async def delete_post(id_post: int, user_id: int):  # você passa o user_id como query param
    return post_service.delete_post(id_post)