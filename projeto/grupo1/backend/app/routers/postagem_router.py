from fastapi import APIRouter, HTTPException, status
from typing import List
from app.models.postagem_model import PostCreate, PostResponse
import httpx

router = APIRouter(
    prefix="/posts",
    tags=["Postagens"]
)

JSON_SERVER_URL = "http://localhost:3001/posts"
client: httpx.AsyncClient | None = None

@router.on_event("startup")
async def startup_event():
    global client
    client = httpx.AsyncClient()

@router.on_event("shutdown")
async def shutdown_event():
    global client
    if client:
        await client.aclose()

@router.get("/", response_model=List[PostResponse])
async def listar_posts():
    response = await client.get(JSON_SERVER_URL)
    response.raise_for_status()
    return response.json()

@router.post("/", response_model=PostResponse, status_code=status.HTTP_201_CREATED)
async def criar_post(post: PostCreate):
    response = await client.post(JSON_SERVER_URL, json=post.dict())
    response.raise_for_status()
    return response.json()
