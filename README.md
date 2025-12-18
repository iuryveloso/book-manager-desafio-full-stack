# 📘 Book Manager — Desafio Técnico Full-Stack

O objetivo do desafio é criar uma aplicação simples para gerenciamento de livros com autenticação JWT e CRUD completo.

## Objetivo
Construir uma aplicação full-stack chamada Book Manager, onde o usuário poderá:

- Criar conta
- Fazer login
- Listar livros
- Criar livros
- Editar livros
- Excluir livros

As páginas internas devem ser protegidas por autenticação.

## Tecnologias Obrigatórias
- Nest.js (backend)
- Next.js (frontend)
- TypeScript
- Postgres ou MySQL
- TailwindCSS

## Requisitos do Backend (Nest.js)

### Autenticação
Implementar JWT com os endpoints:

- /auth/register — Criar usuário
- /auth/login — Retornar token JWT

Rotas de livros devem exigir autenticação.

### CRUD de Livros

Rota      | Descrição |
-----------|------------|
 /books    | Listar livros (com busca opcional por título) |
 /books/create    | Criar livro |
 /books/:id| Buscar por ID |
 /books/:id| Atualizar livro |
 /books/:id| Remover livro |

### Modelo Book
- title — string, obrigatório
- author — string, obrigatório
- year — number, opcional
- description — string, opcional

### Banco
- Usar Postgres ou MySQL
- A estrutura do banco deve estar versionada no repositório, podendo ser feita de uma das formas:
  - Migrations (TypeORM ou Prisma)
  - Ou um arquivo SQL com a criação das tabelas (ex: `schema.sql`)

## Requisitos do Frontend (Next.js + Tailwind)

Criar interface contendo:

### Páginas obrigatórias
- /login
- /books — listagem
- /books/new — criação
- /books/[id]/edit — edição

### Funcionalidades
- Autenticação e armazenamento do token
- Proteção das páginas internas
- Formulários funcionais
- Estilização com Tailwind
- Busca de livros por título

## O que será avaliado
- Funcionamento do CRUD e autenticação
- Organização e clareza do código
- Boas práticas
- Uso correto das tecnologias solicitadas
- Estrutura de pastas backend/frontend

### Diferenciais
- Dockerização do frontend e/ou backend
- Deploy funcional da aplicação (com link)
- Paginação no endpoint de listagem de livros
  

```

## Entrega
Enviar o link do repositório contendo:

- Código do frontend e backend
- README com instruções de execução