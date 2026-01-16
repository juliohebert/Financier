# Documentação de Deploy - FinanGestão Pro

## 🚀 Correções Aplicadas para Tela Branca

### Problemas Identificados e Resolvidos:

1. **Error Boundary Implementado** ✅
   - Adicionado componente ErrorBoundary para capturar erros do React
   - Interface amigável quando ocorrer erro
   - Log detalhado no console para debug

2. **Vite Config Corrigido** ✅
   - Corrigida importação do `path` para compatibilidade ESM
   - Adicionadas configurações de build otimizadas
   - Suporte para variáveis de ambiente

3. **Tratamento de Erros no Index** ✅
   - Try-catch adicionado ao inicializar o React
   - Fallback HTML caso a aplicação não carregue
   - Mensagem de erro amigável ao usuário

4. **Configuração Vercel** ✅
   - Arquivo `vercel.json` criado para SPA routing
   - Cache configurado para assets estáticos
   - Rewrites para todas as rotas apontarem ao index.html

---

## 📦 Próximos Passos para Deploy

### 1. Configurar Variáveis de Ambiente

#### No Vercel (Frontend):
```bash
VITE_API_URL=https://seu-backend.onrender.com
```

#### No Render (Backend):
```bash
DATABASE_URL=sua_connection_string_do_neon
FRONTEND_URL=https://seu-app.vercel.app
JWT_SECRET=sua_chave_secreta_aqui
PORT=3001
```

### 2. Deploy no Vercel (Frontend)

```bash
# 1. Instalar Vercel CLI (se necessário)
npm i -g vercel

# 2. Login no Vercel
vercel login

# 3. Deploy
vercel --prod

# Ou pelo dashboard:
# - Conecte seu repositório GitHub
# - Configure variável VITE_API_URL
# - Deploy automático
```

### 3. Deploy no Render (Backend)

1. Acesse https://render.com
2. New → Web Service
3. Conecte seu repositório
4. Configurações:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
5. Adicione variáveis de ambiente (DATABASE_URL, JWT_SECRET, etc.)

### 4. Configurar Banco de Dados Neon

```bash
# 1. Acesse https://neon.tech
# 2. Crie um novo projeto PostgreSQL
# 3. Copie a Connection String
# 4. Adicione no Render como DATABASE_URL
```

---

## 🔍 Como Debugar se a Tela Continuar Branca

### 1. Abra o Console do Navegador (F12)
Procure por:
- Erros em vermelho
- Avisos sobre módulos não encontrados
- Problemas de CORS

### 2. Verifique o Network (Rede)
- Se as requisições ao backend estão falhando
- Status codes (404, 500, etc.)
- Timeout de conexão

### 3. Teste Local
```bash
# Frontend
npm run dev

# Backend (em outro terminal)
cd backend
npm run dev
```

### 4. Logs no Render
- Acesse o dashboard do Render
- Vá em "Logs" do seu serviço
- Verifique erros de conexão ao banco

---

## ⚠️ Checklist Importante

- [ ] Criar arquivo `.env` local baseado no `.env.example`
- [ ] Configurar VITE_API_URL no Vercel
- [ ] Configurar DATABASE_URL no Render
- [ ] Testar conexão do backend com Neon
- [ ] Verificar CORS no backend (origin configurado)
- [ ] Rotas do backend funcionando (teste via Postman/Thunder)
- [ ] Build local funciona: `npm run build` e `npm run preview`

---

## 🆘 Comandos Úteis

```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install

# Build de produção
npm run build

# Testar build local
npm run preview

# Ver erros detalhados no Vite
npm run dev -- --debug
```

---

## 📞 Próximos Passos

1. **Agora**: Crie um arquivo `.env` baseado no `.env.example`
2. **Teste local**: Rode `npm run dev` e verifique se está funcionando
3. **Deploy**: Faça o deploy no Vercel e Render
4. **Configure variáveis**: Adicione as env vars nos dashboards

Se a tela continuar branca após essas correções, abra o console (F12) e me mande os erros que aparecerem lá!
