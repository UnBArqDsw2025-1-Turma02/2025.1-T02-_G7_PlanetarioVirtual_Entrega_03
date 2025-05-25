# Grupo 3: Gerenciamento de Usuários, Estruturas Complexas e Ações Específicas

Foco do Módulo: Lidar com a criação detalhada de usuários, a modelagem de estruturas hierárquicas do sistema (como sistemas planetários) e a execução de ações específicas do usuário.

## Padrões a Implementar:

- **Criacional**: Builder (para a construção complexa de objetos Usuario).
- **Estrutural**: Composite (para modelar o sistema solar como uma estrutura em árvore: Planeta contendo Luas, ambos CorposCelestes).
- **Comportamental**: Command (para encapsular ações como "curtir" e "não curtir" Postagem ou Comentario como objetos).

> **Justificativa da Integração**: Este grupo foca na infraestrutura do usuário e suas interações: o Builder cria o usuário; o Composite modela os objetos complexos com os quais ele interage; o Command processa suas ações de forma desacoplada.

### Adicione nesta pasta, grupo3, toda(s) a(s) aplicação(ões) desenvolvidas que apliquem os padrões escolhidos pelo grupo, e em cada uma, um README explicativo de como rodar, guia de instalação etc.