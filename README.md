# ⚽ Passa a Bola - Sistema de Gerenciamento de Jogadoras

Um sistema web moderno e responsivo para gerenciamento de jogadoras de futebol, com dashboard interativo, autenticação de usuários e persistência de dados.

## ✨ Funcionalidades Implementadas

### 🔐 Sistema de Autenticação
- **Login seguro** com validação de credenciais
- **Sessão persistente** no localStorage
- **Logout** com limpeza de dados
- **Múltiplos usuários** de teste

### 📊 Dashboard Interativo
- **Gráfico de seguidores** com Chart.js
- **Estatísticas em tempo real**
- **Atualização de dados externos** (simulada)
- **Design responsivo** para todos os dispositivos

### 👥 Gerenciamento de Jogadoras
- **Lista de jogadoras** com design moderno
- **Adicionar novas jogadoras** com validação
- **Remover jogadoras** com confirmação
- **Validação de dados** (campos obrigatórios, duplicatas)

### 💾 Persistência de Dados
- **Salvamento automático** no localStorage
- **Carregamento de dados** ao iniciar
- **Sincronização** entre sessões

### 🎨 Interface Moderna
- **Design glassmorphism** com efeitos visuais
- **Animações suaves** e transições
- **Tema responsivo** para mobile e desktop
- **Alertas visuais** para feedback do usuário

### 🧪 Sistema de Testes
- **Testes unitários** automatizados
- **Validação de funcionalidades**
- **Cobertura de casos de uso**

## 🚀 Como Usar

### 1. Acesse o Sistema
Abra o arquivo `index.html` no seu navegador.

### 2. Faça Login
Use uma das credenciais de teste:
- **Usuário:** `admin` | **Senha:** `123456`
- **Usuário:** `user` | **Senha:** `password`
- **Usuário:** `teste` | **Senha:** `teste123`

### 3. Navegue pelas Seções
- **📊 Dashboard:** Visualize estatísticas e gráficos
- **👥 Jogadoras:** Gerencie a lista de jogadoras
- **⚙️ Configurações:** Acesse opções do sistema

### 4. Gerencie Jogadoras
- **Adicionar:** Preencha nome e posição
- **Remover:** Clique no ícone de lixeira
- **Visualizar:** Veja todas as jogadoras cadastradas

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modernos e responsivos
- **JavaScript ES6+** - Lógica da aplicação
- **Chart.js** - Gráficos interativos

### Recursos
- **LocalStorage** - Persistência de dados
- **Fetch API** - Simulação de dados externos
- **CSS Grid/Flexbox** - Layout responsivo
- **Google Fonts** - Tipografia moderna

## 📁 Estrutura do Projeto

```
passa-bola/
├── index.html          # Página principal
├── style.css           # Estilos e tema
├── script.js           # Lógica da aplicação
├── tests.js            # Testes unitários
├── API_DOCS.md         # Documentação da API
├── README.md           # Este arquivo
└── dados.json          # Dados iniciais (opcional)
```

## 🧪 Executando os Testes

Para validar todas as funcionalidades:

1. Abra o console do navegador (F12)
2. Digite: `executarTestes()`
3. Veja os resultados dos testes

## 🎯 Funcionalidades Técnicas

### Validações Implementadas
- ✅ Campos obrigatórios
- ✅ Comprimento mínimo de caracteres
- ✅ Prevenção de duplicatas
- ✅ Formatação de números brasileiros

### Recursos de UX
- ✅ Feedback visual imediato
- ✅ Confirmações de ação
- ✅ Animações suaves
- ✅ Design responsivo

### Segurança
- ✅ Validação de credenciais
- ✅ Sanitização de inputs
- ✅ Sessões seguras

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (até 767px)

## 🔧 Personalização

### Cores e Tema
As cores podem ser facilmente alteradas no arquivo `style.css` através das variáveis CSS:

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #ec4899;
  --success-color: #10b981;
  --error-color: #ef4444;
}
```

### Dados Iniciais
Os dados padrão podem ser modificados no arquivo `script.js` na classe `DataManager`.

## 📊 Estatísticas do Projeto

- **Linhas de código:** ~800+
- **Funcionalidades:** 15+
- **Testes:** 10+
- **Responsividade:** 100%
- **Acessibilidade:** Implementada

## 🚀 Próximos Passos

### Melhorias Futuras
- [ ] Integração com API real
- [ ] Sistema de backup automático
- [ ] Relatórios em PDF
- [ ] Notificações push
- [ ] Modo offline

### Funcionalidades Avançadas
- [ ] Filtros e busca
- [ ] Ordenação de dados
- [ ] Exportação de dados
- [ ] Importação em lote
- [ ] Histórico de alterações

## 📞 Suporte

Para dúvidas ou problemas:

1. **Verifique o console** do navegador para erros
2. **Execute os testes** para validar funcionalidades
3. **Confirme o localStorage** está habilitado
4. **Verifique as dependências** estão carregando

## 👥 Desenvolvedores

- **Arthur Canaverde** - RM: 563029
- **Lucas Zago** - RM: 562028

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e de demonstração.

---

**Desenvolvido com ❤️ para o projeto Passa a Bola**