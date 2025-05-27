from fastapi import APIRouter, HTTPException, status
from typing import List
from app.models.user_model import UserCreate, UserResponse
import httpx

router = APIRouter(
    prefix="/usuarios",
    tags=["Usuários"]
)

JSON_SERVER_URL = "http://localhost:3001/usuarios"

@router.get("/", response_model=List[UserResponse])
async def listar_usuarios():
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(JSON_SERVER_URL)
            response.raise_for_status()
            return response.json()
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar usuários: {str(e)}")

@router.get("/{id_usuario}", response_model=UserResponse)
async def buscar_usuario(id_usuario: int):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{JSON_SERVER_URL}/{id_usuario}")
            if response.status_code == 404:
                raise HTTPException(status_code=404, detail="Usuário não encontrado")
            response.raise_for_status()
            return response.json()
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar usuário: {str(e)}")

@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def criar_usuario(user: UserCreate):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(JSON_SERVER_URL, json=user.dict())
            response.raise_for_status()
            return response.json()
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"Erro ao criar usuário: {str(e)}")

@router.put("/{id_usuario}", response_model=UserResponse)
async def atualizar_usuario(id_usuario: int, user: UserCreate):
    try:
        async with httpx.AsyncClient() as client:
            get_resp = await client.get(f"{JSON_SERVER_URL}/{id_usuario}")
            if get_resp.status_code == 404:
                raise HTTPException(status_code=404, detail="Usuário não encontrado")

            response = await client.put(f"{JSON_SERVER_URL}/{id_usuario}", json=user.dict())
            response.raise_for_status()
            return response.json()
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"Erro ao atualizar usuário: {str(e)}")

@router.delete("/{id_usuario}", status_code=status.HTTP_204_NO_CONTENT)
async def deletar_usuario(id_usuario: int):
    try:
        async with httpx.AsyncClient() as client:
            get_resp = await client.get(f"{JSON_SERVER_URL}/{id_usuario}")
            if get_resp.status_code == 404:
                raise HTTPException(status_code=404, detail="Usuário não encontrado")

            response = await client.delete(f"{JSON_SERVER_URL}/{id_usuario}")
            response.raise_for_status()
            return
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"Erro ao deletar usuário: {str(e)}")
