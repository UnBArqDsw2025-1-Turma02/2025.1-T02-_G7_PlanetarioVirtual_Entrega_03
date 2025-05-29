from functools import wraps
from fastapi import HTTPException

from app.services.forum_service import forum_service  # ou o caminho correto

def verificar_moderador_por_id(func):
    @wraps(func)
    async def wrapper(*args, user_id: int = None, **kwargs):
        user = forum_service.get_user_by_id(user_id)
        if not user or user.tipo != "moderador":
            raise HTTPException(status_code=403, detail="Usuário não é moderador.")
        return await func(*args, user_id=user_id, **kwargs)
    return wrapper
