# 🧪 Teste Rápido - SASA Viewer

## ✅ O Que Foi Corrigido

Se o **botão "Test Viewer" funciona** mas a proteína do SASA **não aparece**, o problema estava na forma como o color scheme customizado era registrado.

### **Mudanças:**

1. ✅ **Cartoon sempre aparece** com cores padrão (residueindex)
2. ✅ **Color scheme único** para cada carregamento (evita conflitos)
3. ✅ **Fallback em múltiplas camadas** se algo falhar
4. ✅ **Logs detalhados** em cada etapa

---

## 🔬 Teste Agora

### **Passo 1: Recarregue a página**
```
Ctrl+F5  (Windows/Linux)
Cmd+Shift+R  (Mac)
```

### **Passo 2: Abra Console**
```
F12 → aba Console
```

### **Passo 3: Cole este PDB mínimo:**

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

### **Passo 4: Calculate SASA**

Click no botão "Calculate SASA" e aguarde.

---

## 📊 O Que Você Deve Ver

### **No Console:**

```
SASA Viewer: loadStructureWithSASA called
SASA Viewer: NGL Ready: true
SASA Viewer: Stage exists: true
SASA Viewer: Atoms count: 9
SASA Viewer: Loading PDB structure...
SASA Viewer: Structure loaded successfully
SASA Viewer: Component atomCount: 9
SASA Viewer: Adding basic representations...
SASA Viewer: Cartoon representation added
SASA Viewer: Attempting SASA color scheme...
SASA Viewer: Color scheme factory called
SASA Viewer: Max SASA: XX.XX
SASA Viewer: SASA color scheme registered as: sasa-TIMESTAMP
SASA Viewer: Surface representation with SASA colors added
SASA Viewer: Auto-view complete - Structure should be visible now!
SASA Viewer: Render requested
```

### **Na Tela:**

- ✅ Seção "3D Visualization" aparece
- ✅ **Cartoon da proteína** (estrutura em cartoon/fita)
- ✅ **Superfície colorida** (gradiente azul→vermelho)
- ✅ Estrutura centralizada automaticamente

---

## 🎨 Cores Esperadas

- 🔵 **Azul**: Regiões enterradas (baixo SASA)
- 🟦 **Cyan**: SASA baixo-médio
- 🟢 **Verde**: SASA médio
- 🟡 **Amarelo**: SASA médio-alto
- 🔴 **Vermelho**: Regiões expostas (alto SASA)

---

## ❌ Se Ainda Não Funcionar

### **Cenário 1: Cartoon aparece mas sem superfície**

**Veja no console:**
```
SASA Viewer: Error adding representations: [erro]
SASA Viewer: Falling back to basic representation
```

**Isso significa:** Surface está falhando, mas cartoon funciona.

**Solução:** Desabilite temporariamente a superfície.

### **Cenário 2: Nada aparece**

**Execute no console:**

```javascript
// Verificar componente
console.log('Component:', component);
console.log('Representations:', component?.reprList?.length);

// Forçar cartoon simples
if (component) {
    component.removeAllRepresentations();
    component.addRepresentation('cartoon', { color: 'chainindex' });
    component.addRepresentation('ball+stick', { sele: 'protein' });
    component.autoView();
    stage.viewer.requestRender();
}
```

### **Cenário 3: Console mostra erro**

**Me envie:**
1. A mensagem de erro completa
2. Screenshot do console
3. Qual PDB você está usando

---

## 🔧 Comando de Emergência

Se nada funcionar, cole isso no console para forçar visualização simples:

```javascript
// Resetar tudo
const viewport = document.getElementById('viewport');
const pdbText = document.getElementById('pdb-input').value;

if (stage) stage.dispose();

stage = new NGL.Stage(viewport, { backgroundColor: 'black' });

const blob = new Blob([pdbText], { type: 'text/plain' });
stage.loadFile(blob, { ext: 'pdb' }).then((comp) => {
    component = comp;
    comp.addRepresentation('cartoon', { color: 'residueindex' });
    comp.addRepresentation('ball+stick', { 
        sele: 'protein',
        aspectRatio: 2
    });
    comp.autoView();
    console.log('✅ Manual load complete!');
});

document.getElementById('viewer-container').style.display = 'block';
```

---

## 📝 Checklist de Sucesso

- [ ] Página recarregada (Ctrl+F5)
- [ ] Console aberto (F12)
- [ ] PDB colado no textarea
- [ ] "Calculate SASA" clicado
- [ ] Logs aparecem no console
- [ ] "Structure loaded successfully" aparece
- [ ] "Cartoon representation added" aparece
- [ ] Container do viewer visível (box preto)
- [ ] **VEJo CARTOON da proteína**
- [ ] Vejo superfície colorida
- [ ] Posso rotacionar com mouse

**Se todos marcados:** ✅ **FUNCIONOU!**

---

## 🎯 Diferença Entre Test e SASA

### **Test Viewer:**
- Usa `ball+stick` (sempre funciona)
- Não usa color scheme customizado
- Estrutura minimalista

### **SASA Viewer:**
- Usa `cartoon` + `surface`
- Usa color scheme SASA customizado
- Estrutura complexa

**Por isso Test pode funcionar enquanto SASA falha!**

---

## 💡 Dica Final

Se você vê o **cartoon mas não a superfície**, é NORMAL para estruturas muito pequenas ou PDBs incompletos. A superfície molecular precisa de átomos suficientes para ser gerada.

**Para testar superfície:** Use um PDB maior (100+ átomos).

---

Teste e me diga o resultado! 🚀
