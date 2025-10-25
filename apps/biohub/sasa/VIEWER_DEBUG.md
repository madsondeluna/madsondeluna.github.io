# 🔍 SASA Viewer - Guia de Diagnóstico Atualizado

## ⚡ O Que Mudou?

O visualizador SASA agora tem:
- ✅ **Espera inteligente** para carregar NGL
- ✅ **Logs extremamente detalhados** em cada etapa
- ✅ **Botão de teste** para verificar se o viewer funciona
- ✅ **Retry automático** se falhar na primeira tentativa
- ✅ **Alertas visuais** quando algo dá errado

---

## 🧪 PASSO 1: Teste Rápido do Viewer

### **Abra a página SASA Calculator**

1. Vá para `/apps/biohub/sasa/index.html`
2. Abra o Console (F12 → aba Console)
3. **Ignore** o PDB upload por enquanto
4. **Scroll down** até a seção "Results"
5. Procure o botão **🔍 "Test Viewer"** (botão amarelo)

### **Click no botão "Test Viewer"**

O botão vai:
- ✅ Mostrar o container do viewer 3D
- ✅ Carregar uma molécula de teste (alanina)
- ✅ Exibir em representação "ball+stick"
- ✅ Centralizar automaticamente

**Resultado esperado:**
```
✅ Viewer is working! If you see a structure, the viewer is functional.
```

**Se aparecer esta mensagem E você vir uma estrutura 3D pequena:**
→ **O viewer está funcionando!** O problema está em outro lugar.

**Se der erro:**
→ Veja a seção "Troubleshooting" abaixo.

---

## 📊 PASSO 2: Verificar Logs do Console

Após clicar "Test Viewer", você deve ver no console:

### **✅ Sequência de Sucesso:**

```
=== VIEWER DIAGNOSTIC TEST ===
NGL Ready: true
NGL Defined: true
Stage: Stage { ... }
Viewport: <div id="viewport">
Viewer Container: <div id="viewer-container">
Viewer container shown
Loading test structure (1 residue)...
Test structure loaded!
Test visualization complete - you should see a small molecule!
```

### **❌ Possíveis Erros:**

#### **Erro 1: NGL não carregou**
```
NGL Ready: false
NGL Defined: false
```
**Causa:** CDN do NGL fora do ar ou bloqueado  
**Solução:** 
- Verifique conexão com internet
- Teste em outro navegador
- Verifique firewall/antivírus

#### **Erro 2: Viewport não encontrado**
```
Viewport: null
```
**Causa:** HTML não tem `<div id="viewport">`  
**Solução:** Recarregue a página (Ctrl+F5)

#### **Erro 3: Stage não inicializa**
```
Stage: null
Failed to initialize stage
```
**Causa:** Problema com NGL ou WebGL  
**Solução:** 
- Verifique se navegador suporta WebGL
- Teste em: https://get.webgl.org/
- Atualize drivers de vídeo

---

## 🧬 PASSO 3: Teste com SASA Real

Se o "Test Viewer" funcionou, agora teste o SASA:

### **Use este PDB mínimo:**

```pdb
ATOM      1  N   ALA A   1       0.000   0.000   0.000  1.00  0.00           N
ATOM      2  CA  ALA A   1       1.458   0.000   0.000  1.00  0.00           C
ATOM      3  C   ALA A   1       2.009   1.420   0.000  1.00  0.00           C
ATOM      4  O   ALA A   1       1.251   2.390   0.000  1.00  0.00           O
ATOM      5  CB  ALA A   1       1.962  -0.773  -1.232  1.00  0.00           C
ATOM      6  N   GLY A   2       3.331   1.545   0.000  1.00  0.00           N
ATOM      7  CA  GLY A   2       4.012   2.832   0.000  1.00  0.00           C
ATOM      8  C   GLY A   2       5.527   2.705   0.000  1.00  0.00           C
ATOM      9  O   GLY A   2       6.116   1.623   0.000  1.00  0.00           O
END
```

### **Passos:**

1. Cole o PDB acima no textarea
2. Click "Calculate SASA"
3. Aguarde 1-2 segundos
4. Verifique console

### **Logs Esperados:**

```
SASA Viewer: loadStructureWithSASA called
SASA Viewer: NGL Ready: true
SASA Viewer: Stage exists: true
SASA Viewer: Atoms count: 9
SASA Viewer: Stage is ready, atoms array length: 9
SASA Viewer: Viewer container displayed
SASA Viewer: Loading PDB structure...
SASA Viewer: Structure loaded successfully
SASA Viewer: Component: Component { ... }
SASA Viewer: Custom color scheme registered
SASA Viewer: Cartoon representation added
SASA Viewer: Surface representation added
SASA Viewer: Auto-view complete - Structure should be visible now!
SASA Viewer: Render requested
```

**Se todos esses logs aparecerem:**
→ A estrutura DEVE estar visível!

**Se a estrutura NÃO aparece mas os logs estão OK:**
→ Problema de CSS/visibilidade. Veja próxima seção.

---

## 🎨 PASSO 4: Verificar Visibilidade do Viewport

Abra o console e execute:

```javascript
// Verificar se viewer-container está visível
const container = document.getElementById('viewer-container');
console.log('Container display:', container.style.display);
console.log('Container visible:', container.offsetHeight > 0);

// Verificar viewport
const viewport = document.getElementById('viewport');
console.log('Viewport dimensions:', viewport.offsetWidth, 'x', viewport.offsetHeight);
console.log('Viewport background:', viewport.style.background);

// Forçar visibilidade
container.style.display = 'block';
viewport.style.border = '5px solid red'; // Deixar viewport visível
```

**Resultado esperado:**
- Container display: `"block"`
- Container visible: `true`
- Viewport dimensions: algo como `600 x 400` (não `0 x 0`)
- Você deve ver um **box vermelho** onde está o viewport

**Se o box vermelho aparece mas está preto/vazio:**
→ NGL stage existe mas não está renderizando. Execute:

```javascript
if (stage) {
    console.log('Stage components:', stage.compList.length);
    console.log('Stage viewer:', stage.viewer);
    stage.viewer.requestRender();
}
```

---

## 🔧 Soluções Avançadas

### **Solução 1: Forçar Re-render**

Cole no console:

```javascript
if (stage && component) {
    stage.viewer.requestRender();
    component.autoView();
    console.log('Forced re-render');
}
```

### **Solução 2: Recriar Stage**

Cole no console:

```javascript
const viewport = document.getElementById('viewport');
if (stage) {
    stage.dispose();
}
stage = new NGL.Stage(viewport, { backgroundColor: 'black' });
console.log('Stage recreated:', stage);
```

### **Solução 3: Carregar Manualmente**

```javascript
const testPDB = `ATOM      1  CA  ALA A   1       0.000   0.000   0.000  1.00  0.00           C
END`;
const blob = new Blob([testPDB], { type: 'text/plain' });

if (stage) {
    stage.loadFile(blob, { ext: 'pdb' }).then((comp) => {
        comp.addRepresentation('spacefill');
        comp.autoView();
        console.log('Manual load successful!');
    });
}
```

---

## 📋 Checklist Completo

Use esta lista para diagnosticar:

### **Inicialização:**
- [ ] Console aberto (F12)
- [ ] Página carregada completamente
- [ ] Log "SASA: NGL loaded successfully" apareceu
- [ ] Log "SASA Viewer: NGL stage initialized successfully" apareceu

### **Teste do Viewer:**
- [ ] Botão "Test Viewer" clicado
- [ ] Container do viewer apareceu (fundo preto visível)
- [ ] Estrutura de teste carregou
- [ ] Mensagem "✅ Viewer is working!" apareceu
- [ ] Vejo molécula 3D na tela

### **Teste SASA:**
- [ ] PDB colado no textarea
- [ ] "Calculate SASA" clicado
- [ ] Cálculos completaram (vejo resumo de SASA)
- [ ] Log "loadStructureWithSASA called" apareceu
- [ ] Log "Structure loaded successfully" apareceu
- [ ] Log "Auto-view complete" apareceu
- [ ] Container do viewer visível (display: block)
- [ ] Vejo estrutura 3D colorida

### **Se TUDO passou mas não vejo estrutura:**
- [ ] Viewport tem dimensões > 0
- [ ] Viewport tem background preto
- [ ] Stage.compList.length > 0
- [ ] Executei `stage.viewer.requestRender()`
- [ ] Testei em outro navegador

---

## 🐛 Problemas Conhecidos

### **Problema: Tudo funciona mas estrutura invisível**

**Possíveis causas:**
1. **CSS z-index:** Viewport está atrás de outros elementos
2. **Cores iguais:** Estrutura com cor igual ao background
3. **Camera muito longe:** autoView() não funcionou
4. **WebGL context lost:** Navegador perdeu contexto WebGL

**Teste:**
```javascript
// Mudar background para branco
stage.viewer.setBackground('#FFFFFF');

// Forçar zoom
if (component) {
    component.autoView(2000); // 2 segundos de animação
}

// Verificar contexto WebGL
console.log('WebGL context:', stage.viewer.renderer.context);
```

### **Problema: Funciona no Test mas não no SASA**

**Causa:** Problema com color scheme customizado

**Solução:** Use esquema de cores padrão temporariamente:

```javascript
// No console, após calcular SASA:
if (component) {
    component.removeAllRepresentations();
    component.addRepresentation('cartoon', { color: 'residueindex' });
    component.addRepresentation('surface', { color: 'hydrophobicity' });
    component.autoView();
}
```

Se isso funcionar → problema está no custom color scheme.

---

## 📞 Informações para Debug

Se nada funcionar, me envie:

1. **Logs completos do console** (Ctrl+A no console → copiar)
2. **Screenshot da tela** (com console visível)
3. **Resultado do Test Viewer** (funcionou ou não?)
4. **Resultado deste comando no console:**

```javascript
console.log({
    nglReady: nglReady,
    nglDefined: typeof NGL !== 'undefined',
    nglVersion: NGL?.version,
    stageExists: !!stage,
    componentExists: !!component,
    viewportDimensions: [
        document.getElementById('viewport')?.offsetWidth,
        document.getElementById('viewport')?.offsetHeight
    ],
    containerDisplay: document.getElementById('viewer-container')?.style.display,
    atomsCount: atoms.length,
    webglSupport: (() => {
        try {
            const canvas = document.createElement('canvas');
            return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
        } catch(e) {
            return false;
        }
    })()
});
```

5. **Navegador e versão** (ex: Chrome 120, Firefox 115)
6. **Sistema operacional** (Windows/Mac/Linux)

---

## 🎯 Resumo Rápido

1. **Click "Test Viewer"** → Se funciona, viewer está OK
2. **Calcule SASA** → Verifique logs no console
3. **Se logs OK mas sem visual** → Problema de CSS/WebGL
4. **Cole comandos de debug** → Verifique dimensões e contexto
5. **Me envie informações** → Vou ajudar a resolver!

**O viewer DEVE funcionar se:**
- ✅ NGL carrega (veja `typeof NGL !== 'undefined'`)
- ✅ Stage inicializa (veja `!!stage`)
- ✅ WebGL suporta (teste em https://get.webgl.org/)
- ✅ Viewport tem dimensões > 0

Vamos descobrir o problema! 🚀
