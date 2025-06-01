# app/decorators/factory/verificador_factory.py

from functools import wraps
from fastapi import HTTPException
from app.services.forum_service import forum_service
from app.services.postagem_service import post_service
from app.services.comentario_service import comment_service


class VerificadorPermissaoFactory:
    @staticmethod
    def criar_verificador(tipo_entidade: str):
        if tipo_entidade == "post":
            return VerificadorPermissaoFactory._verificar_post
        elif tipo_entidade == "comentario":
            return VerificadorPermissaoFactory._verificar_comentario
        else:
            raise ValueError("Tipo de entidade inválido para verificação de permissão.")

    @staticmethod
    def _verificar_post(func):
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

    @staticmethod
    def _verificar_comentario(func):
        @wraps(func)
        async def wrapper(id_comentario: int, user_id: int, *args, **kwargs):
            user = forum_service.get_user_by_id(user_id)
            if not user:
                raise HTTPException(status_code=404, detail="Usuário não encontrado.")

            if user.tipo == "moderador":
                return await func(id_comentario=id_comentario, user_id=user_id, *args, **kwargs)

            comentario = comment_service.get_comment_by_id(id_comentario)
            if not comentario:
                raise HTTPException(status_code=404, detail="Comentário não encontrado.")

            if comentario.autor_id == user.id:
                return await func(id_comentario=id_comentario, user_id=user_id, *args, **kwargs)

            raise HTTPException(status_code=403, detail="Apenas o autor ou moderador pode excluir este comentário.")
        return wrapper
