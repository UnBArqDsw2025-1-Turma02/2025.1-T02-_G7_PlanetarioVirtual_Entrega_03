from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
from .routers import user_router, postagem_router, comentario_router

app = FastAPI(
    title="Planetário Virtual API",
    description="API para o backend do fórum do Planetário Virtual.",
    version="0.1.0"
)

origins_permitidas = ["*"] 

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins_permitidas,  
    allow_credentials=True, 
    allow_methods=["*"],    
    allow_headers=["*"],    
)

app.include_router(user_router.router, prefix="/api")
app.include_router(postagem_router.router, prefix="/api")
app.include_router(comentario_router.router, prefix ="/api")

@app.get("/health", tags=["Status"])
async def health_check():
    return {"status": "ok", "message": "API está funcionando!"}

