# Grupo 1: O Núcleo do Fórum Social e Interações do Usuário

Foco do Módulo: Construir a espinha dorsal da interação social no fórum: criação de conteúdo, definição de papéis de usuário e notificações sobre atividades.

## Padrões a Implementar:

- **Criacional**: Factory Method (para criar Postagem e Comentario).
- **Estrutural**: Decorator (para adicionar papéis/permissões a Usuario, como UsuarioModerador).
- **Comportamental**: Observer (para notificar Usuarios sobre novos comentários em Postagems que seguem).

> **Justificativa da Integração:** Este grupo constrói um ciclo de interação social: o Factory Method cria o conteúdo; o Decorator define quem pode interagir e como; o Observer notifica sobre essas interações.


### Adicione nesta pasta, grupo1, toda(s) a(s) aplicação(ões) desenvolvidas que apliquem os padrões escolhidos pelo grupo, e em cada uma, um README explicativo de como rodar, guia de instalação etc.