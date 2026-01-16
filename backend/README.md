# Backend Financier

Este projeto é um backend Node.js com Express, conectado ao banco Neon (PostgreSQL), pronto para deploy no Render e integração com frontend hospedado no Vercel.

## Funcionalidades
- Autenticação JWT
- CRUD de clientes
- CRUD de empréstimos
- Fluxo de caixa

## Como rodar localmente
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Crie um arquivo `.env` com a variável:
   ```env
   DATABASE_URL=postgresql://<usuario>:<senha>@<host>/<database>?sslmode=require&channel_binding=require
   JWT_SECRET=sua_chave_secreta
   FRONTEND_URL=https://seu-frontend.vercel.app
   ```
3. Rode o servidor:
   ```bash
   npm run dev
   ```

## Deploy
- Configure as variáveis de ambiente no Render conforme o `.env`.
- O CORS já está liberado para o domínio do frontend.
