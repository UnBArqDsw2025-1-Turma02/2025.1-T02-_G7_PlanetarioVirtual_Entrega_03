# app/clients/json_server_client.py
import httpx
from typing import List, Dict, Any
from ..core.config import JSON_SERVER_URL

JSON_SERVER_USER_ENDPOINT = f"{JSON_SERVER_URL}/usuarios"

async def fetch_all_users_from_server() -> List[Dict[str, Any]]:
    """
    Busca todos os usuários do json-server.
    """
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(JSON_SERVER_USER_ENDPOINT)
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError as e:
            print(f"Erro HTTP ao buscar usuários: {e.response.status_code} - {e.response.text}")
            raise
        except httpx.RequestError as e:
            print(f"Erro de requisição ao buscar usuários: {e}")
            raise

async def fetch_user_by_id_from_server(user_id: int) -> Dict[str, Any] | None:
    """
    Busca um usuário específico pelo ID do json-server.
    Retorna None se o usuário não for encontrado (404).
    """
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(f"{JSON_SERVER_USER_ENDPOINT}/{user_id}")
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError as e:
            if e.response.status_code == 404:
                return None
            print(f"Erro HTTP ao buscar usuário {user_id}: {e.response.status_code} - {e.response.text}")
            raise
        except httpx.RequestError as e:
            print(f"Erro de requisição ao buscar usuário {user_id}: {e}")
            raise

async def create_user_on_server(user_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Cria um novo usuário no json-server.
    json-server automaticamente adicionará um 'id'.
    """
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(JSON_SERVER_USER_ENDPOINT, json=user_data)
            response.raise_for_status()  # Garante que a resposta foi 201 Created
            return response.json() # Retorna o usuário criado, incluindo o ID
        except httpx.HTTPStatusError as e:
            print(f"Erro HTTP ao criar usuário: {e.response.status_code} - {e.response.text}")
            raise
        except httpx.RequestError as e:
            print(f"Erro de requisição ao criar usuário: {e}")
            raise