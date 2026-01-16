#!/bin/bash

echo "🚀 Deploy Automático - FinanGestão Pro"
echo "========================================="
echo ""

# Verifica se está no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ ERRO: Execute este script na raiz do projeto!"
    exit 1
fi

# Adiciona todas as mudanças
echo "📦 Adicionando arquivos..."
git add .

# Commit
echo "💾 Fazendo commit..."
git commit -m "fix: Corrige tela branca - adiciona loading, error handling e otimiza build"

# Push
echo "☁️  Enviando para o GitHub..."
git push origin main

echo ""
echo "✅ Deploy enviado com sucesso!"
echo ""
echo "🔍 Próximos passos:"
echo "1. Acesse: https://vercel.com e aguarde o build"
echo "2. Configure VITE_API_URL nas variáveis de ambiente"
echo "3. Aguarde 1-2 minutos e teste o site"
echo ""
echo "🌐 Seu site: https://financier-pro-five.vercel.app"
echo ""
