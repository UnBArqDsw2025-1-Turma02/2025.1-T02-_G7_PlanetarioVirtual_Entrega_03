from fastapi import FastAPI
from .routers import user_router, postagem_router, comentario_router

app = FastAPI(
    title="Planetário Virtual API",
    description="API para o backend do fórum do Planetário Virtual.",
    version="0.1.0"
)

app.include_router(user_router.router, prefix="/api")
app.include_router(postagem_router.router, prefix="/api")
app.include_router(comentario_router.router, prefix ="/api")

@app.get("/health", tags=["Status"])
async def health_check():
    return {"status": "ok", "message": "API está funcionando!"}
