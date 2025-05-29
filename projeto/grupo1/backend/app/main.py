# app/main.py
from fastapi import FastAPI
from .routers import user_router  # Adicione outros routers aqui futuramente (post_router, comment_router)
# from .routers import post_router, comment_router # Exemplo para quando adicionar mais

app = FastAPI(
    title="Planetário Virtual API",
    description="API para o backend do fórum do Planetário Virtual.",
    version="0.1.0"
)

# Incluir os routers com prefixo "/api"
app.include_router(user_router.router, prefix="/api")
# app.include_router(post_router.router, prefix="/api")
# app.include_router(comment_router.router, prefix="/api")


@app.get("/health", tags=["Status"])
async def health_check():
    return {"status": "ok", "message": "API está funcionando!"}

# Eventos de startup/shutdown, se necessário
# @app.on_event("startup")
# async def startup_event():
#     print("Aplicação iniciando...")

# @app.on_event("shutdown")
# async def shutdown_event():
#     print("Aplicação encerrando...")
