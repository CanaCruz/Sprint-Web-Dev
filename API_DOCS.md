# 📚 Documentação da API - Passa a Bola

## 🔗 Endpoints Disponíveis

### 1. **Autenticação**

#### `POST /auth/login`
**Descrição**: Realiza login do usuário no sistema

**Parâmetros**:
```json
{
  "username": "string",
  "password": "string"
}
```

**Resposta de Sucesso** (200):
```json
{
  "success": true,
  "user": {
    "username": "admin",
    "loginTime": "2025-01-09T21:00:00.000Z"
  },
  "token": "jwt_token_here"
}
```

**Resposta de Erro** (401):
```json
{
  "success": false,
  "error": "Credenciais inválidas"
}
```

#### `POST /auth/logout`
**Descrição**: Realiza logout do usuário

**Resposta de Sucesso** (200):
```json
{
  "success": true,
  "message": "Logout realizado com sucesso"
}
```

---

### 2. **Jogadoras**

#### `GET /api/jogadoras`
**Descrição**: Lista todas as jogadoras cadastradas

**Headers**:
```
Authorization: Bearer <token>
```

**Resposta de Sucesso** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nome": "Lia Santos",
      "posicao": "Atacante"
    },
    {
      "id": 2,
      "nome": "Marina Faria",
      "posicao": "Meia"
    }
  ]
}
```

#### `POST /api/jogadoras`
**Descrição**: Adiciona uma nova jogadora

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Parâmetros**:
```json
{
  "nome": "string",
  "posicao": "string"
}
```

**Validações**:
- `nome`: obrigatório, mínimo 2 caracteres
- `posicao`: obrigatório

**Resposta de Sucesso** (201):
```json
{
  "success": true,
  "data": {
    "id": 3,
    "nome": "Nova Jogadora",
    "posicao": "Defensora"
  },
  "message": "Jogadora adicionada com sucesso"
}
```

**Resposta de Erro** (400):
```json
{
  "success": false,
  "error": "Nome é obrigatório"
}
```

#### `DELETE /api/jogadoras/:id`
**Descrição**: Remove uma jogadora pelo ID

**Headers**:
```
Authorization: Bearer <token>
```

**Parâmetros**:
- `id`: ID da jogadora (path parameter)

**Resposta de Sucesso** (200):
```json
{
  "success": true,
  "message": "Jogadora removida com sucesso"
}
```

**Resposta de Erro** (404):
```json
{
  "success": false,
  "error": "Jogadora não encontrada"
}
```

---

### 3. **Dashboard**

#### `GET /api/dashboard/seguidores`
**Descrição**: Retorna dados de seguidores para o gráfico

**Headers**:
```
Authorization: Bearer <token>
```

**Resposta de Sucesso** (200):
```json
{
  "success": true,
  "data": {
    "seguidores": [5000, 5600, 6200, 6900, 7600],
    "labels": ["Jan", "Fev", "Mar", "Abr", "Mai"],
    "total": 7600
  }
}
```

#### `GET /api/dashboard/estatisticas`
**Descrição**: Retorna estatísticas gerais do sistema

**Headers**:
```
Authorization: Bearer <token>
```

**Resposta de Sucesso** (200):
```json
{
  "success": true,
  "data": {
    "totalJogadoras": 5,
    "totalSeguidores": 7600,
    "crescimentoPercentual": 15.2,
    "ultimaAtualizacao": "2025-01-09T21:00:00.000Z"
  }
}
```

---

### 4. **Dados Externos**

#### `GET /api/external/users`
**Descrição**: Busca dados de usuários de API externa (JSONPlaceholder)

**Headers**:
```
Authorization: Bearer <token>
```

**Resposta de Sucesso** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz"
    }
  ],
  "source": "https://jsonplaceholder.typicode.com/users"
}
```

---

## 🔐 Autenticação

O sistema utiliza autenticação baseada em localStorage com os seguintes usuários de teste:

| Usuário | Senha | Permissões |
|---------|-------|------------|
| admin | 123456 | Acesso total |
| user | password | Acesso limitado |
| teste | teste123 | Acesso de teste |

---

## 📊 Códigos de Status HTTP

| Código | Descrição |
|--------|-----------|
| 200 | Sucesso |
| 201 | Criado com sucesso |
| 400 | Erro de validação |
| 401 | Não autorizado |
| 404 | Não encontrado |
| 500 | Erro interno do servidor |

---

## 🚨 Tratamento de Erros

### Estrutura Padrão de Erro
```json
{
  "success": false,
  "error": "Mensagem de erro",
  "code": "ERROR_CODE",
  "details": {
    "field": "campo específico com erro",
    "value": "valor inválido"
  }
}
```

### Códigos de Erro Comuns

| Código | Descrição |
|--------|-----------|
| `INVALID_CREDENTIALS` | Credenciais inválidas |
| `VALIDATION_ERROR` | Erro de validação de dados |
| `NOT_FOUND` | Recurso não encontrado |
| `DUPLICATE_ENTRY` | Entrada duplicada |
| `UNAUTHORIZED` | Acesso não autorizado |
| `EXTERNAL_API_ERROR` | Erro na API externa |

---

## 🔄 Exemplos de Uso

### Login
```javascript
const response = await fetch('/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'admin',
    password: '123456'
  })
});

const data = await response.json();
```

### Adicionar Jogadora
```javascript
const response = await fetch('/api/jogadoras', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nome: 'Nova Jogadora',
    posicao: 'Atacante'
  })
});
```

### Buscar Dados do Dashboard
```javascript
const response = await fetch('/api/dashboard/seguidores', {
  headers: {
    'Authorization': 'Bearer ' + token
  }
});
```

---

## 📝 Notas de Implementação

1. **Persistência**: Os dados são salvos no localStorage do navegador
2. **Validação**: Todas as entradas são validadas no frontend e backend
3. **Segurança**: Tokens de autenticação são armazenados no localStorage
4. **API Externa**: Integração com JSONPlaceholder para dados de exemplo
5. **Responsividade**: Interface adaptável para diferentes dispositivos

---

## 🧪 Testes

Execute os testes unitários abrindo o console do navegador e executando:
```javascript
runTests();
```

Os testes cobrem:
- Validação de dados
- Formatação de números
- Geração de IDs
- Autenticação
- Operações CRUD
- Tratamento de erros
