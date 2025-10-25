# SASA 3D Viewer - Debugging Guide

## 🔍 Como Verificar se o Viewer 3D está Funcionando

### **Passo 1: Abrir Console do Navegador**
1. Abra o SASA Calculator no navegador
2. Pressione **F12** (ou Cmd+Option+I no Mac)
3. Clique na aba **"Console"**

### **Passo 2: Fazer Upload e Calcular**
1. Upload um arquivo PDB (ou cole texto PDB)
2. Clique em **"Calculate SASA"**
3. Aguarde o cálculo terminar

### **Passo 3: Verificar Logs no Console**

Você deve ver essas mensagens **em ordem**:

```
✅ SASA Viewer: Initializing NGL stage...
✅ SASA Viewer: NGL stage initialized successfully
✅ SASA Viewer: loadStructureWithSASA called
✅ SASA Viewer: Stage is ready, atoms array length: XXX
✅ SASA Viewer: Viewer container displayed
✅ SASA Viewer: Loading PDB structure...
✅ SASA Viewer: Structure loaded successfully
✅ SASA Viewer: Custom color scheme registered
✅ SASA Viewer: Representations added
✅ SASA Viewer: Auto-view complete
```

---

## ❌ Possíveis Erros e Soluções

### **Erro 1: "viewport element not found"**
```
❌ SASA Viewer: viewport element not found
```

**Causa:** O HTML não tem o elemento `<div id="viewport">`

**Solução:** 
- Verifique se o arquivo `index.html` está atualizado
- O viewport deve estar dentro de `viewer-container`

---

### **Erro 2: "NGL library not loaded"**
```
❌ SASA Viewer: NGL library not loaded
```

**Causa:** Script do NGL não carregou

**Solução:**
1. Verifique conexão com internet
2. Confirme que há esta linha no `<head>` do HTML:
   ```html
   <script src="https://unpkg.com/ngl@2.0.0-dev.38/dist/ngl.js"></script>
   ```
3. Tente recarregar a página (Ctrl+F5 / Cmd+Shift+R)

---

### **Erro 3: "Stage not initialized!"**
```
❌ SASA Viewer: Stage not initialized!
❌ SASA Viewer: Failed to initialize stage
```

**Causa:** NGL não conseguiu criar o stage

**Soluções:**
1. Verifique se NGL carregou (veja console)
2. Limpe cache do navegador
3. Tente outro navegador (Chrome, Firefox, Edge)

---

### **Erro 4: "viewer-container element not found"**
```
❌ SASA Viewer: viewer-container element not found
```

**Causa:** HTML está desatualizado

**Solução:** 
- Confirme que existe `<div id="viewer-container">` no HTML
- Recarregue a página

---

### **Erro 5: "Error loading structure"**
```
❌ SASA Viewer: Error loading structure: [mensagem de erro]
```

**Causas possíveis:**
- PDB com formato inválido
- PDB muito grande
- Falta de memória

**Soluções:**
1. Verifique se o PDB está válido (tem linhas ATOM ou HETATM)
2. Teste com PDB menor (< 1000 átomos)
3. Feche outras abas do navegador

---

## ✅ O que Esperar Quando Funciona

### **Visual:**
1. Após clicar "Calculate SASA", você verá:
   - ✅ Resumo do SASA total
   - ✅ **Seção "3D Visualization" aparece**
   - ✅ **Estrutura 3D colorida** (azul a vermelho)
   - ✅ Botões "Toggle Spin" e "Center View" funcionam
   - ✅ Legenda de cores (Buried → Exposed)

2. Cores na estrutura:
   - 🔵 **Azul**: Átomos enterrados (baixo SASA)
   - 🟢 **Verde**: SASA médio
   - 🟡 **Amarelo**: SASA alto
   - 🔴 **Vermelho**: Átomos muito expostos (alto SASA)

### **Interação:**
- ✅ Arrastar mouse: rotaciona estrutura
- ✅ Scroll: zoom in/out
- ✅ Click direito + arrastar: translação
- ✅ "Toggle Spin": ativa/desativa rotação automática
- ✅ "Center View": centraliza estrutura

---

## 🧪 Teste Rápido

Use este PDB mínimo para testar:

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

**Passos:**
1. Cole esse PDB no textarea
2. Click "Calculate SASA"
3. Espere 1-2 segundos
4. Veja estrutura 3D aparecer
5. Teste os botões de controle

---

## 📊 Checklist de Diagnóstico

Use esta lista para verificar o problema:

- [ ] Console aberto (F12)
- [ ] PDB válido colado/uploadado
- [ ] Cliquei "Calculate SASA"
- [ ] Vi mensagens de log no console
- [ ] Não há erros em vermelho no console
- [ ] Seção "3D Visualization" apareceu
- [ ] Vejo o box preto do viewport
- [ ] Estrutura apareceu no viewport
- [ ] Posso rotacionar com mouse
- [ ] Botões funcionam

**Se todos marcados:** ✅ Viewer está funcionando!

**Se algum falhou:** Veja seção de erros acima ou me informe qual etapa falhou.

---

## 🛠️ Troubleshooting Avançado

### **Limpar Estado:**
```javascript
// Cole no console e pressione Enter:
localStorage.clear();
sessionStorage.clear();
location.reload();
```

### **Verificar NGL Carregado:**
```javascript
// Cole no console:
console.log('NGL loaded:', typeof NGL !== 'undefined');
console.log('NGL version:', NGL?.version);
```

### **Forçar Reinicialização:**
```javascript
// Cole no console:
if (stage) {
    stage.dispose();
    stage = null;
}
initializeViewer();
```

---

## 📞 Se Nada Funcionar

Me envie:
1. Screenshot do console (F12)
2. Primeira linha do PDB que você está usando
3. Navegador e versão (ex: Chrome 120)
4. Sistema operacional (Windows/Mac/Linux)

Vou ajudar a resolver! 🚀
