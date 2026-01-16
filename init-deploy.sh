#!/bin/bash

echo "🎯 Inicializando Git e fazendo primeiro deploy"
echo "================================================"
echo ""

# Inicializa git se não existir
if [ ! -d ".git" ]; then
    echo "📦 Inicializando repositório Git..."
    git init
    git branch -M main
    echo "✅ Git inicializado!"
    echo ""
fi

# Adiciona todas as mudanças
echo "📝 Adicionando arquivos..."
git add .

# Commit
echo "💾 Fazendo commit..."
git commit -m "fix: Corrige tela branca - adiciona loading, error handling e otimiza build" || echo "Nada para commitar ou commit já feito"

echo ""
echo "✅ Preparado para deploy!"
echo ""
echo "🔗 PRÓXIMOS PASSOS:"
echo ""
echo "1. Se ainda não conectou ao GitHub:"
echo "   git remote add origin https://github.com/SEU_USUARIO/financier-pro.git"
echo "   git push -u origin main"
echo ""
echo "2. No Vercel (https://vercel.com):"
echo "   - Import Project → Seu repositório GitHub"
echo "   - Framework Preset: Vite"
echo "   - Root Directory: ./"
echo "   - Build Command: npm run build"
echo "   - Output Directory: dist"
echo ""
echo "3. Adicionar variável de ambiente:"
echo "   Settings → Environment Variables"
echo "   VITE_API_URL = https://financiar-ie3x.onrender.com"
echo ""
echo "4. Deploy!"
echo ""
