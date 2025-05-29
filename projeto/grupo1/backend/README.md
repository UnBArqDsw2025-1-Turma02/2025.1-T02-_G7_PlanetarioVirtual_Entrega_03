# 📘 Documentação da API de Usuários, Postagens e Comentários

## ▶️ Como Executar a API

Para executar a aplicação corretamente, utilize dois terminais:

### Terminal 1: Executar o banco de dados `json-server`

```bash
json-server --watch db.json --port 3000
```

Este comando inicia o servidor fake com os dados do arquivo db.json.

### Terminal 2: Executar o backend com FastAPI

```bash
uvicorn app.main:app --reload
```
Este comando inicia o backend da aplicação com recarregamento automático.

---

## 🔗 Endpoints da API

### 👤 Usuários

Método: GET  
Rota: /api/usuarios/  
Descrição: Listar todos os usuários

Método: POST  
Rota: /api/usuarios/  
Descrição: Criar um novo usuário

Método: DELETE  
Rota: /api/usuarios/{id_usuario}  
Descrição: Deletar um usuário pelo ID

---

### 📝 Postagens

Método: GET  
Rota: /api/postagens/  
Descrição: Listar todas as postagens

Método: POST  
Rota: /api/postagens/  
Descrição: Criar uma nova postagem

Método: DELETE  
Rota: /api/postagens/{id_post}?user_id={id_usuario}  
Descrição: Deletar uma postagem (com ID do post e ID do usuário)

⚠️ Importante: Para excluir uma postagem, forneça:
- id_post: ID da postagem
- id_usuario: ID do autor da postagem  
Exemplo: /api/postagens/123?user_id=1

---

### 💬 Comentários

Método: GET  
Rota: /api/comentarios/  
Descrição: Listar todos os comentários

Método: POST  
Rota: /api/comentarios/  
Descrição: Criar um novo comentário

Método: DELETE  
Rota: /api/comentarios/{id_comentario}?user_id={id_usuario}  
Descrição: Deletar um comentário (com ID do comentário e ID do usuário)

⚠️ Importante: Para excluir um comentário, forneça:
- id_comentario: ID do comentário
- id_usuario: ID do autor do comentário  
Exemplo: /api/comentarios/456?user_id=2

---

### 📊 Status da API

Método: GET  
Rota: /health  
Descrição: Verifica o status da aplicação

---

## 📑 Tabela de Rotas da API

### 👤 Usuários

| **Método** | **Rota** | **Descrição** | 
| ---------- | -------- | ------------- |
| GET | /api/usuarios/ | Listar todos os usuários |
| POST | /api/usuarios/ | Criar um novo usuário |
| DELETE | /api/usuarios/{id_usuario} | Deletar um usuário pelo ID |

---

### 📝 Postagens

| **Método** | **Rota** | **Descrição** |
| ---------- | -------- | ------------- |
| GET | /api/postagens/ | Listar todas as postagens |
| POST | /api/postagens/ | Criar uma nova postagem |
| DELETE | /api/postagens/{id_post}?user_id={id_usuario} | Deletar uma postagem (com ID do post e ID do usuário) |

⚠️ **Importante**: Para excluir uma postagem, forneça:  
- id_post: ID da postagem  
- id_usuario: ID do autor da postagem  

**Exemplo**:  
/api/postagens/123?user_id=1

---

### 💬 Comentários

| **Método** | **Rota** | **Descrição** |
| ---------- | -------- | ------------- |
| GET | /api/comentarios/ | Listar todos os comentários |
| POST | /api/comentarios/ | Criar um novo comentário |
| DELETE | /api/comentarios/{id_comentario}?user_id={id_usuario} | Deletar um comentário (com ID do comentário e ID do usuário) |

⚠️ **Importante**: Para excluir um comentário, forneça:  
- id_comentario: ID do comentário  
- id_usuario: ID do autor do comentário  

**Exemplo**:  
/api/comentarios/456?user_id=2

---

### 📊 Status da API

| **Método** | **Rota** | **Descrição** |
| ---------- | -------- | ------------- |
| GET | /health | Verifica o status da aplicação |

---

**Feito com FastAPI e json-server!** 

