# Grupo 2: O Pipeline de Dados do Planetário e Visualização

Foco do Módulo: Gerenciar a obtenção, adaptação e apresentação dos dados astronômicos que formam a base do planetário virtual.

## Padrões a Implementar:

- **Criacional**: Singleton (para um ServicoPlanetario que gerencia o acesso aos dados dos planetas).
- **Estrutural**: Adapter (para integrar dados de uma API externa de astronomia, adaptando-os ao modelo do sistema).
- **Comportamental**: Strategy (para permitir diferentes formas de ordenar/filtrar a exibição dos planetas, ex: por tamanho, distância do sol).

> **Justificativa da Integração**: Este grupo foca no fluxo de dados: o Singleton centraliza o acesso; o Adapter busca e transforma os dados; a Strategy define como esses dados são processados para exibição.

### Adicione nesta pasta, grupo2, toda(s) a(s) aplicação(ões) desenvolvidas que apliquem os padrões escolhidos pelo grupo, e em cada uma, um README explicativo de como rodar, guia de instalação etc.