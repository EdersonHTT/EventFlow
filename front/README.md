# EventFlow Frontend

Frontend da aplicação EventFlow. É a interface web usada por administradores, organizadores de eventos e participantes.

## Tecnologias

- React
- Vite
- React Router
- Tailwind CSS

## Funcionalidades

- Login e navegação por perfil de usuário
- Dashboard com resumo de eventos e atualização automática
- Cadastro e gerenciamento de eventos
- Gerenciamento de usuários para administradores
- Consulta de ingressos e recepção dos eventos
- Lista pública de eventos
- Compra pública de ingressos sem necessidade de cadastro

## Estrutura

```text
front/
├── public/             Arquivos públicos
├── src/
│   ├── assets/         Dados e recursos da aplicação
│   ├── components/     Componentes reutilizáveis e layout
│   ├── pages/          Páginas da aplicação
│   ├── routes/         Rotas públicas e privadas
│   ├── services/       Comunicação com a API
│   ├── App.jsx         Componente principal
│   ├── App.css         Estilos do aplicativo
│   └── index.css       Estilos globais
├── index.html
├── package.json
└── vite.config.js
```

## Requisitos

- Node.js
- Backend do EventFlow em execução

## Configuração da API

Por padrão, o frontend acessa o backend em:

```text
http://localhost:3000/api
```

Para usar outra URL, crie um arquivo `.env` dentro de `front/`:

```env
VITE_API_URL=http://localhost:3000/api
```

Depois de alterar variáveis `VITE_*`, reinicie o servidor do Vite.

## Instalação e execução

Dentro da pasta `front/`, execute:

```bash
npm install
npm run dev
```

O Vite exibirá no terminal o endereço local da aplicação, normalmente:

```text
http://localhost:5173
```

## Build de produção

Para gerar os arquivos otimizados:

```bash
npm run build
```

Para testar localmente o build gerado:

```bash
npm run preview
```

## Comunicação com o backend

A comunicação é centralizada em `src/services/api.js`. O serviço adiciona automaticamente o token salvo no `localStorage` ao cabeçalho `Authorization` quando o usuário está autenticado.

As páginas públicas de eventos e compra podem ser acessadas sem login. As áreas de dashboard, eventos, usuários, tickets e recepção dependem de autenticação e respeitam as permissões do perfil.
