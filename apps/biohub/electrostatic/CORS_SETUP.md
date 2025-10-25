# Como Usar o Electrostatic Surface Calculator

## 🔒 Problema: CORS (Cross-Origin Resource Sharing)

O navegador bloqueia requisições diretas ao servidor PDB2PQR por segurança. Existem 3 soluções:

---

## ✅ Solução 1: Extensão CORS (Recomendado para Teste)

### **Google Chrome / Edge:**

1. **Instale a extensão:**
   - Acesse: [CORS Unblock Extension](https://chrome.google.com/webstore)
   - Busque por: **"Allow CORS: Access-Control-Allow-Origin"** ou **"CORS Unblock"**
   - Clique em "Adicionar ao Chrome"

2. **Ative a extensão:**
   - Clique no ícone da extensão na barra do navegador
   - Ative o toggle para "ON"
   - A extensão ficará ativa apenas enquanto você usa

3. **Use o Electrostatic Calculator:**
   - Faça upload do PDB
   - Clique em "Calculate"
   - Aguarde o processamento no servidor

4. **⚠️ Importante:**
   - **DESATIVE** a extensão após usar (deixar sempre ativo reduz segurança)
   - Use apenas em sites confiáveis

### **Firefox:**

1. **Instale o Add-on:**
   - Acesse: Firefox Add-ons
   - Busque: **"CORS Everywhere"** ou **"Allow CORS"**
   - Clique em "Add to Firefox"

2. **Configure:**
   - Clique no ícone do add-on
   - Ative quando for usar o Electrostatic Calculator
   - Desative depois

---

## ✅ Solução 2: Executar PDB2PQR Localmente (Produção)

### **Instalação no Linux/macOS:**

```bash
# Instalar PDB2PQR
pip install pdb2pqr

# Instalar APBS
# Ubuntu/Debian
sudo apt-get install apbs

# macOS (Homebrew)
brew install apbs

# Ou compile do source:
git clone https://github.com/Electrostatics/apbs.git
cd apbs
mkdir build && cd build
cmake ..
make
sudo make install
```

### **Uso via linha de comando:**

```bash
# 1. Converter PDB para PQR
pdb2pqr --ff=AMBER --ph=7.0 input.pdb output.pqr

# 2. Calcular eletrostática com APBS
apbs apbs_input.in

# Os arquivos .dx contêm o potencial eletrostático
```

---

## ✅ Solução 3: Criar Backend Proxy (Para App em Produção)

Se você quiser hospedar o Electrostatic Calculator para outros usarem:

### **Opção A: Node.js Proxy**

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const FormData = require('form-data');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/pdb2pqr', async (req, res) => {
    try {
        const formData = new FormData();
        formData.append('pdb', req.body.pdb);
        formData.append('ff', req.body.ff);
        formData.append('ph', req.body.ph);
        
        const response = await fetch('https://server.poissonboltzmann.org/api/submit', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Proxy running on port 3000'));
```

### **Opção B: Python Flask Proxy**

```python
# proxy.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/api/pdb2pqr', methods=['POST'])
def proxy_pdb2pqr():
    try:
        data = request.get_json()
        
        response = requests.post(
            'https://server.poissonboltzmann.org/api/submit',
            json=data
        )
        
        return jsonify(response.json())
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=3000)
```

---

## 📊 Comparação das Soluções

| Solução | Vantagens | Desvantagens | Quando Usar |
|---------|-----------|--------------|-------------|
| **Extensão CORS** | ✅ Rápido<br>✅ Sem configuração<br>✅ Grátis | ⚠️ Reduz segurança<br>⚠️ Só local | Testes pessoais |
| **PDB2PQR Local** | ✅ Controle total<br>✅ Offline<br>✅ Privacidade | ⚠️ Requer instalação<br>⚠️ Linha de comando | Análises sérias |
| **Backend Proxy** | ✅ Compartilhável<br>✅ Sem extensão | ⚠️ Requer servidor<br>⚠️ Custos | App público |

---

## 🧪 Testar se Funcionou

1. **Abra o Console do Navegador** (F12)
2. **Clique em "Calculate"**
3. **Veja a aba "Network":**
   - ✅ Sucesso: Status 200, aparecem arquivos .pqr e .dx
   - ❌ Falha: CORS error ou status 403/500

4. **Mensagens esperadas:**
   - ✅ "Job submitted (ID: xxx)!"
   - ✅ "Calculation complete!"
   - ✅ Visualização 3D aparece

---

## 🆘 Troubleshooting

### **Erro: "CORS policy blocked"**
- **Causa:** Extensão CORS não instalada/ativa
- **Solução:** Instale e ative a extensão

### **Erro: "Server returned 500"**
- **Causa:** Servidor PDB2PQR fora do ar
- **Solução:** Tente mais tarde ou use PDB2PQR local

### **Erro: "No job ID returned"**
- **Causa:** API mudou formato
- **Solução:** Verifique logs do console, pode precisar atualizar código

### **Nada acontece ao clicar Calculate**
- **Causa:** JavaScript bloqueado
- **Solução:** Abra console (F12) e veja erros

---

## 📚 Recursos Adicionais

- **PDB2PQR Documentação:** https://pdb2pqr.readthedocs.io/
- **APBS Documentação:** https://apbs.readthedocs.io/
- **Tutorial APBS:** https://apbs-pdb2pqr.readthedocs.io/en/latest/
- **PyMOL APBS Plugin:** Para visualização avançada

---

## 💡 Dica para Produção

Para usar em **produção profissional**, recomendo:

1. Instale **PDB2PQR + APBS localmente**
2. Crie um **backend simples** (Node.js/Python)
3. Configure **HTTPS** no servidor
4. Adicione **rate limiting** para evitar abuso
5. Implemente **fila de jobs** para múltiplos usuários

Isso garante controle, privacidade e performance! 🚀
