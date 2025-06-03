# Grupo 3: Gerenciamento de Usuários, Estruturas Complexas e Ações Específicas

Foco do Módulo: Lidar com a criação detalhada de usuários, a modelagem de estruturas hierárquicas do sistema (como sistemas planetários) e a execução de ações específicas do usuário.

## Padrões a Implementar:

- **Criacional**: Builder (para a construção complexa de objetos Usuario).
- **Estrutural**: Composite (para modelar o sistema solar como uma estrutura em árvore: Planeta contendo Luas, ambos CorposCelestes).
- **Comportamental**: Command (para encapsular ações como "curtir" e "não curtir" Postagem ou Comentario como objetos).

> **Justificativa da Integração**: Este grupo foca na infraestrutura do usuário e suas interações: o Builder cria o usuário; o Composite modela os objetos complexos com os quais ele interage; o Command processa suas ações de forma desacoplada.

### Adicione nesta pasta, grupo3, toda(s) a(s) aplicação(ões) desenvolvidas que apliquem os padrões escolhidos pelo grupo, e em cada uma, um README explicativo de como rodar, guia de instalação etc.

# Como Rodar o Projeto Spring Java

Este etapa te guiará sobre como configurar e executar o projeto Spring Java localmente.

---

## 🚀 Primeiros Passos

Para rodar este projeto, você precisará ter o **Java 17** e o **Maven** instalados em sua máquina.

---

## 🛠️ Configuração do Ambiente

1.  **Clone o Repositório:**

    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd <NOME_DO_SEU_PROJETO>
    ```

2.  **Crie o Arquivo `.env`:**

    Na raiz do projeto, crie um arquivo chamado `.env` e adicione as seguintes as variáveis de ambiente do seu banco de dados:

    ```
    DB_PASSWORD=xxxxx
    DB_URL=xxxxxx
    DB_USERNAME=xxxx
    JWT_SECRET=xxxx
    PORT=8080
    ```

    **Importante:** Mantenha seu `JWT_SECRET` seguro e nunca o exponha publicamente.

---

## ▶️ Como Rodar

Após configurar as variáveis de ambiente, você pode iniciar o projeto localmente

### Com Maven

```bash
mvn spring-boot:run -Dspring-boot.run.main=com.seuprojeto.PlanetarioVirtualBackendApplication
```

Substitua com.seuprojeto pelo pacote correto da sua aplicação.

## 📚 Acessando a Documentação 

### Swagger
Uma vez que o projeto esteja rodando, você pode acessar a documentação interativa da API (Swagger) através do seguinte link no seu navegador:

http://localhost:8080/swagger-ui/index.html ou http://worthy-latia-planetario-virtual-02f6584c.koyeb.app/swagger-ui/index.html

### Postman

Você pode testar nossas rotas por meio da URL de deploy http://worthy-latia-planetario-virtual-02f6584c.koyeb.app/