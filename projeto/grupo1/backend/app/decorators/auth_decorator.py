from functools import wraps
from fastapi import HTTPException
from app.services.forum_service import forum_service
from app.services.postagem_service import post_service

def verificar_moderador_ou_autor_post(func):
    @wraps(func)
    async def wrapper(id_post: int, user_id: int, *args, **kwargs):
        user = forum_service.get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="Usuário não encontrado.")

        if user.tipo == "moderador":
            return await func(id_post=id_post, user_id=user_id, *args, **kwargs)

        post = post_service.get_post_by_id(id_post)
        if not post:
            raise HTTPException(status_code=404, detail="Postagem não encontrada.")

        if post.autor_id == user.id:
            return await func(id_post=id_post, user_id=user_id, *args, **kwargs)

        raise HTTPException(status_code=403, detail="Apenas o autor ou moderador pode excluir esta postagem.")
    return wrapper
