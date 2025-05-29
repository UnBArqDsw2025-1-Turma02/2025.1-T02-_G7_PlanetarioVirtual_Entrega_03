from fastapi import APIRouter, HTTPException, status
from typing import List

from app.models.user_model import UserCreate, UserResponse
from app.services.forum_service import forum_service

router = APIRouter(
    prefix="/usuarios",
    tags=["Usuários"]
)

@router.get("/", response_model=List[UserResponse])
async def listar_usuarios():
    return forum_service.get_all_users()

@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def criar_usuario(user: UserCreate):
    try:
        return forum_service.create_user(user)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{id_usuario}", status_code=status.HTTP_200_OK)
async def deletar_usuario(id_usuario: int):
    try:
        return forum_service.delete_user(id_usuario)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))