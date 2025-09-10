# 📚 Documentação da API - Passa a Bola

## Visão Geral
O sistema Passa a Bola utiliza uma arquitetura baseada em classes JavaScript para gerenciar autenticação e dados, simulando uma API REST.

## 🔐 Sistema de Autenticação

### AuthManager
Classe responsável por gerenciar login, logout e sessões de usuário.

#### Métodos

##### `login(username, password)`
Autentica um usuário no sistema.

**Parâmetros:**
- `username` (string): Nome de usuário
- `password` (string): Senha do usuário

**Retorno:**
- `boolean`: `true` se login bem-sucedido, `false` caso contrário

**Credenciais válidas:**
- `admin` / `123456`
- `user` / `password`
- `teste` / `teste123`

**Exemplo:**
```javascript
const authManager = new AuthManager();
const sucesso = authManager.login('admin', '123456');
```

##### `logout()`
Encerra a sessão do usuário atual.

**Retorno:**
- `void`

##### `showAlert(message, type)`
Exibe uma mensagem de alerta para o usuário.

**Parâmetros:**
- `message` (string): Mensagem a ser exibida
- `type` (string): Tipo do alerta (`success`, `error`, `warning`, `info`)

## 📊 Gerenciamento de Dados

### DataManager
Classe responsável por gerenciar dados das jogadoras e seguidores.

#### Métodos

##### `addJogadora(nome, posicao)`
Adiciona uma nova jogadora ao sistema.

**Parâmetros:**
- `nome` (string): Nome da jogadora
- `posicao` (string): Posição da jogadora

**Retorno:**
- `object`: Objeto da jogadora criada com ID único

**Exemplo:**
```javascript
const dataManager = new DataManager();
const jogadora = dataManager.addJogadora('Maria Silva', 'Atacante');
```

##### `removeJogadora(id)`
Remove uma jogadora do sistema.

**Parâmetros:**
- `id` (number): ID único da jogadora

**Retorno:**
- `void`

##### `updateSeguidores(seguidores)`
Atualiza os dados de seguidores.

**Parâmetros:**
- `seguidores` (array): Array com números de seguidores

**Retorno:**
- `void`

##### `fetchExternalData()`
Simula busca de dados externos via API.

**Retorno:**
- `Promise<array>`: Array com novos dados de seguidores

**Exemplo:**
```javascript
const dataManager = new DataManager();
const novosDados = await dataManager.fetchExternalData();
```

## 🎯 Funções Principais

### `carregarDashboard()`
Carrega e exibe o dashboard com gráfico de seguidores.

**Funcionalidades:**
- Atualiza total de seguidores
- Cria gráfico interativo com Chart.js
- Formata números em padrão brasileiro

### `carregarJogadoras()`
Carrega e exibe a lista de jogadoras cadastradas.

**Funcionalidades:**
- Renderiza lista de jogadoras
- Inclui botão de remoção para cada jogadora
- Exibe mensagem quando não há jogadoras

### `adicionarJogadora()`
Adiciona uma nova jogadora ao sistema.

**Validações:**
- Campos obrigatórios preenchidos
- Nome com pelo menos 2 caracteres
- Posição com pelo menos 2 caracteres
- Nome único (não duplicado)

### `removerJogadora(id)`
Remove uma jogadora do sistema.

**Funcionalidades:**
- Confirmação antes da remoção
- Atualização automática da lista
- Feedback visual para o usuário

### `mostrar(secao)`
Navega entre diferentes seções da aplicação.

**Parâmetros:**
- `secao` (string): ID da seção a ser exibida

**Seções disponíveis:**
- `dashboard`: Painel principal com gráficos
- `jogadoras`: Lista e gerenciamento de jogadoras
- `configuracoes`: Configurações do sistema

## 🔄 Persistência de Dados

### LocalStorage
O sistema utiliza o localStorage do navegador para persistir dados:

**Chaves utilizadas:**
- `currentUser`: Dados do usuário logado
- `passaBolaData`: Dados das jogadoras e seguidores

### Estrutura de Dados
```javascript
{
  seguidores: [5000, 5600, 6200, 6900, 7600],
  jogadoras: [
    {
      id: 1234567890,
      nome: "Maria Silva",
      posicao: "Atacante",
      dataAdicao: "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

## 🎨 Interface do Usuário

### Componentes Principais

#### Sistema de Login
- Formulário de autenticação
- Validação de credenciais
- Feedback visual de erros

#### Dashboard
- Estatísticas de seguidores
- Gráfico interativo
- Botão de atualização de dados

#### Gerenciamento de Jogadoras
- Lista de jogadoras cadastradas
- Formulário de adição
- Botões de remoção

#### Configurações
- Informações do usuário
- Opções de exportação/importação
- Botão de logout

## 🚀 Funcionalidades Avançadas

### Validação de Dados
- Verificação de campos obrigatórios
- Validação de comprimento mínimo
- Prevenção de duplicatas

### Feedback Visual
- Alertas de sucesso/erro
- Animações de transição
- Confirmações de ação

### Responsividade
- Design adaptável para mobile
- Grid responsivo
- Navegação otimizada

## 🧪 Testes

### TestRunner
Sistema de testes unitários incluído no arquivo `tests.js`.

**Para executar os testes:**
```javascript
executarTestes();
```

**Testes incluídos:**
- Autenticação (login válido/inválido)
- Gerenciamento de dados
- Validações de formulário
- Persistência no localStorage
- Formatação de números

## 📱 Compatibilidade

### Navegadores Suportados
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Recursos Utilizados
- ES6+ (Classes, Arrow Functions, Async/Await)
- LocalStorage API
- Fetch API
- Chart.js 3.x
- CSS Grid e Flexbox

## 🔧 Configuração

### Dependências
- Chart.js (CDN)
- Google Fonts (Inter)

### Estrutura de Arquivos
```
passa-bola/
├── index.html          # Estrutura principal
├── style.css           # Estilos e tema
├── script.js           # Lógica da aplicação
├── tests.js            # Testes unitários
├── API_DOCS.md         # Esta documentação
└── dados.json          # Dados iniciais (opcional)
```

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique o console do navegador para erros
2. Execute os testes unitários
3. Verifique se o localStorage está habilitado
4. Confirme se as dependências estão carregando corretamente
