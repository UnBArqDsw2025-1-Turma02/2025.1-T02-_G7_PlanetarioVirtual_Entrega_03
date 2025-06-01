# 🌌 API do Planetário Virtual

Esta API fornece funcionalidades para gerenciamento de usuários, postagens e comentários no sistema Planetário Virtual.

---

## 🔐 Usuários

### 📄 Listar Usuários

**GET** `/api/usuarios/`

**Parâmetros:** Nenhum

**Body:** Nenhum

**Resposta:**

```json
[
  {
    "nome": "string",
    "tipo": "comum",
    "id": 0
  }
]
```

---

### ➕ Criar Usuário

**POST** `/api/usuarios/`

**Parâmetros:** Nenhum

**Body:**

```json
{
  "nome": "Rafael",
  "tipo": "comum"
}
```

**Resposta:**

```json
{
  "nome": "Rafael",
  "tipo": "comum",
  "id": 2
}
```

---

### ❌ Excluir Usuário

**DELETE** `/api/usuarios/{id_usuario}`

**Parâmetros:**

| Nome        | Tipo    | Local | Obrigatório | Descrição     |
| ----------- | ------- | ----- | ----------- | ------------- |
| id\_usuario | integer | path  | Sim         | ID do usuário |

**Resposta:**

```json
{
  "message": "Usuário 2 excluído com sucesso."
}
```

---

## 📝 Postagens

### 📄 Listar Postagens

**GET** `/api/postagens/`

**Parâmetros:** Nenhum

**Body:** Nenhum

**Resposta:**

```json
[
  {
    "conteudo": "Teste1",
    "autor_id": 1,
    "id": 1,
    "data_criacao": "2025-05-30T14:48:10.002223",
    "nome_autor": "Milena"
  }
]
```

---

### ➕ Criar Postagem

**POST** `/api/postagens/`

**Descrição:** Cria uma nova postagem no sistema.

**Parâmetros:** Nenhum

**Body:**

```json
{
  "conteudo": "Teste1",
  "autor_id": 1
}
```

**Resposta:**

```json
{
  "conteudo": "Teste1",
  "autor_id": 1,
  "id": 1,
  "data_criacao": "2025-05-30T14:48:10.002223",
  "nome_autor": "Milena"
}
```

---

### ❌ Excluir Postagem

**DELETE** `/api/postagens/{id_post}`

**Descrição:** Remove uma postagem. Requer que o usuário seja o autor da postagem ou moderador. **Todos os comentários relacionados à postagem serão automaticamente excluídos.**

**Parâmetros:**

| Nome     | Tipo    | Local | Obrigatório | Descrição                 |
| -------- | ------- | ----- | ----------- | ------------------------- |
| id\_post | integer | path  | Sim         | ID da postagem            |
| user\_id | integer | query | Sim         | ID do usuário solicitante |

**Body:** Nenhum

**Exemplo de Requisição:**

```bash
curl -X 'DELETE' \
  'http://127.0.0.1:8000/api/postagens/1?user_id=2' \
  -H 'accept: application/json'
```

**Resposta:**

```json
{
  "detail": "Usuário não é moderador."
}
```

---

## 💬 Comentários

### 📄 Listar Comentários de uma Postagem

**GET** `/api/postagens/{id_post}/comentarios`

**Descrição:** Lista o conteúdo da postagem e todos os comentários associados.

**Parâmetros:**

| Nome     | Tipo    | Local | Obrigatório | Descrição      |
| -------- | ------- | ----- | ----------- | -------------- |
| id\_post | integer | path  | Sim         | ID da postagem |

**Resposta:**

```json
{
  "conteudo_post": "Teste1",
  "postagem_id": 1,
  "numero_comentarios": 0,
  "comentarios": []
}
```

---

### 📄 Listar Todos os Comentários

**GET** `/api/comentarios/`

**Parâmetros:** Nenhum

**Body:** Nenhum

**Resposta:**

```json
[
  {
    "conteudo": "string",
    "autor_id": 0,
    "id": 0,
    "data_criacao": "2025-05-30T18:25:00.577Z",
    "nome_autor": "string",
    "postagem_id": 0
  }
]
```

---

### ➕ Criar Comentário

**POST** `/api/comentarios/{id_post}`

**Descrição:** Adiciona um comentário a uma postagem existente.

**Parâmetros:**

| Nome     | Tipo    | Local | Obrigatório | Descrição      |
| -------- | ------- | ----- | ----------- | -------------- |
| id\_post | integer | path  | Sim         | ID da postagem |

**Body:**

```json
{
  "conteudo": "string",
  "autor_id": 0
}
```

**Resposta:**

```json
{
  "conteudo": "string",
  "autor_id": 0,
  "id": 0,
  "data_criacao": "2025-05-30T18:25:56.892Z",
  "nome_autor": "string",
  "postagem_id": 0
}
```

---

### ❌ Excluir Comentário

**DELETE** `/api/comentarios/{id_comentario}/{user_id}`

**Descrição:** Remove um comentário. Requer que o usuário seja autor do comentário ou moderador.

**Parâmetros:**

| Nome           | Tipo    | Local | Obrigatório | Descrição                 |
| -------------- | ------- | ----- | ----------- | ------------------------- |
| id\_comentario | integer | path  | Sim         | ID do comentário          |
| user\_id       | integer | path  | Sim         | ID do usuário solicitante |

**Resposta:**

```json
"Comentário removido com sucesso."
```

---

📌 *Ao excluir uma postagem, **todos os seus comentários também são excluídos automaticamente**. Para excluir uma postagem ou um comentário, o usuário precisa ser **autor ou moderador**.*

---

**Autor:** Equipe do Planetário Virtual
**Última atualização:** 30/05/2025

