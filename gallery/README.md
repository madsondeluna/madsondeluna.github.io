# Gallery Images

## Como adicionar suas imagens

1. Adicione suas imagens nesta pasta (`gallery/`)
2. Nomeie as imagens de forma descritiva (ex: `protein_structure_1.jpg`, `md_simulation_1.png`)
3. Formatos recomendados: JPG, PNG, WebP
4. Tamanho recomendado: mínimo 600x400px para melhor qualidade
5. Otimize as imagens antes de fazer upload (use ferramentas como TinyPNG ou ImageOptim)

## Editando a galeria

Para adicionar ou modificar itens da galeria, edite o arquivo `index.html` e procure pela seção `<section id="gallery">`.

### Exemplo de item da galeria:

```html
<div class="gallery-item">
    <img src="gallery/sua-imagem.jpg" alt="Descrição da imagem">
    <div class="gallery-caption">
        <p>Título ou descrição curta</p>
    </div>
</div>
```

## Imagens placeholder

Até você adicionar suas próprias imagens, o site mostrará imagens de placeholder. Para substituí-las:

1. Adicione suas imagens nesta pasta
2. Atualize os caminhos no HTML (ex: `gallery/placeholder1.jpg` → `gallery/sua-imagem.jpg`)
3. Atualize o texto `alt` e a legenda para descrever sua imagem

## Dicas

- Use nomes de arquivo sem espaços (use hífens ou underscores)
- Mantenha uma proporção similar entre as imagens (recomendado: landscape 16:9 ou 4:3)
- Comprima as imagens para web para melhor performance
