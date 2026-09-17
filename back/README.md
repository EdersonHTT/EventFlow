# EventFlow Backend

Backend da aplicação EventFlow. É uma API REST responsável pelas regras de negócio, autenticação, gerenciamento de eventos, usuários, locais e ingressos.

## Tecnologias

- Node.js
- TypeScript
- Express
- TypeORM
- MySQL
- JWT para autenticação
- bcrypt para hash de senhas
- Zod para validação de dados
- Nodemailer para envio de ingressos por e-mail

## Estrutura

```text
back/
├── src/
│   ├── config/          Configuração da conexão com o banco
│   ├── controllers/     Controladores das requisições
│   ├── errors/          Erros da aplicação
│   ├── Middleware/      Autenticação, autorização, validação e logs
│   ├── models/          Entidades TypeORM
│   ├── repositories/    Acesso aos dados
│   ├── routes/          Rotas da API
│   ├── services/        Regras de negócio
│   ├── utils/           JWT, hash e bcrypt
│   └── validators/      Schemas de validação
├── .env
├── package.json
└── tsconfig.json
```

## Requisitos

- Node.js
- MySQL em execução
- Banco de dados criado para o EventFlow

## Configuração

Crie um arquivo `.env` dentro de `back/` com as variáveis usadas pela aplicação:

```env
PORT=3000
DB_NAME=eventflow
DB_PORT=3306
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_HOST=localhost
```

Não versionar o arquivo `.env` nem compartilhar credenciais do banco.

## Instalação e execução

Dentro da pasta `back/`, execute:

```bash
npm install
npm run dev
```

A API ficará disponível em:

```text
http://localhost:3000/api
```

O projeto usa `ts-node-dev` para executar o servidor TypeScript durante o desenvolvimento.

## Banco de dados

A conexão é configurada em `src/config/DataSource.ts`. O TypeORM está configurado com `synchronize: true`, portanto as entidades podem sincronizar a estrutura das tabelas automaticamente durante o desenvolvimento.

Essa opção deve ser avaliada com cuidado antes de usar o sistema em produção. Para produção, prefira migrations.

## Principais recursos da API

As rotas são registradas sob o prefixo `/api`:

- `/api/auth`: login e autenticação
- `/api/users`: cadastro, consulta, edição e exclusão de usuários
- `/api/events`: cadastro, consulta, edição e exclusão de eventos
- `/api/locations`: gerenciamento de locais
- `/api/tickets`: criação, consulta, atualização, exclusão e validação de ingressos

As rotas protegidas usam o cabeçalho:

```text
Authorization: Bearer <token>
```

Existem dois perfis principais:

- Administrador: gerencia usuários e possui visão administrativa dos dados.
- Usuário comum: cria e gerencia seus próprios eventos e acessa os ingressos relacionados a eles.

## Comandos

```bash
npm run dev       # inicia o servidor em modo de desenvolvimento
```
