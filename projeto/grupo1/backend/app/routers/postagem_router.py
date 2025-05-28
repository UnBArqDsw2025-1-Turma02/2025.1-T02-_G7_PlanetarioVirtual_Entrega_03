from fastapi import APIRouter, HTTPException, status
from typing import List
from ..services.postagem_service import post_service
from ..models.postagem_model import PostCreate, PostResponse

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
