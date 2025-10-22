# 📸 Galeria de Imagens - Instruções

## ✅ O que foi adicionado

Foi criada uma nova seção **Gallery** na página principal do seu site, localizada logo após a seção de **Publications** e antes de **Conference & Invited Talks**.

### Características da galeria:

✨ **Design responsivo** - Adapta-se automaticamente a diferentes tamanhos de tela
✨ **Grid moderno** - Layout em grade que mostra até 3 imagens por linha em telas grandes
✨ **Efeitos hover** - Animações suaves ao passar o mouse sobre as imagens
✨ **Legendas** - Cada imagem tem espaço para uma descrição
✨ **Totalmente integrada** - Mantém a mesma estética visual do resto do site

## 📝 Como adicionar suas próprias imagens

### Passo 1: Adicionar as imagens
1. Coloque suas imagens na pasta `gallery/`
2. Use formatos web-friendly: JPG, PNG ou WebP
3. Nomeie os arquivos de forma descritiva (ex: `protein_structure.jpg`, `md_simulation.png`)

### Passo 2: Editar o HTML
Abra o arquivo `index.html` e procure pela seção `<section id="gallery">`.

Substitua os itens da galeria com suas próprias imagens. Exemplo:

```html
<div class="gallery-item">
    <img src="gallery/sua-imagem.jpg" alt="Descrição detalhada da imagem">
    <div class="gallery-caption">
        <p>Título ou legenda da sua imagem</p>
    </div>
</div>
```

### Passo 3: Salvar e visualizar
Salve o arquivo e abra `index.html` no navegador para ver as mudanças.

## 🎨 Personalização

### Adicionar mais imagens
Para adicionar mais imagens, copie e cole este bloco de código dentro da `<div class="gallery-grid">`:

```html
<div class="gallery-item">
    <img src="gallery/nova-imagem.jpg" alt="Descrição">
    <div class="gallery-caption">
        <p>Legenda da nova imagem</p>
    </div>
</div>
```

### Remover imagens
Simplesmente delete o bloco `<div class="gallery-item">...</div>` correspondente.

### Alterar o número de colunas
No arquivo `style.css`, procure por `.gallery-grid` e ajuste o valor `minmax()`:
- Para 4 colunas: `minmax(220px, 1fr)`
- Para 2 colunas: `minmax(400px, 1fr)`

## 💡 Dicas importantes

1. **Otimize suas imagens** antes de adicionar:
   - Use ferramentas como TinyPNG, ImageOptim ou Squoosh
   - Tamanho recomendado: 800-1200px de largura
   - Isso garante carregamento rápido da página

2. **Mantenha proporções similares**:
   - Imagens landscape (horizontal) funcionam melhor
   - Proporção recomendada: 16:9 ou 4:3

3. **Use nomes de arquivo sem espaços**:
   - ✅ Correto: `protein_structure.jpg` ou `protein-structure.jpg`
   - ❌ Evite: `protein structure.jpg`

4. **Textos ALT são importantes**:
   - Descrevem a imagem para acessibilidade
   - Ajudam no SEO do seu site

## 🔧 Localização dos arquivos

- **HTML da galeria**: `/index.html` (procure por `<section id="gallery">`)
- **CSS da galeria**: `/style.css` (procure por `/* Gallery Section */`)
- **Pasta de imagens**: `/gallery/` (coloque suas imagens aqui)

## 📱 Visualização

A galeria está configurada para exibir:
- **Desktop (tela grande)**: 3 imagens por linha
- **Tablet**: 2 imagens por linha
- **Mobile**: 1 imagem por linha

---

**Observação**: Atualmente a galeria usa imagens placeholder temporárias. Substitua-as com suas próprias imagens de trabalhos e renderizações seguindo as instruções acima.
