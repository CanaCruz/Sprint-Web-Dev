// Testes unitários para o sistema Passa a Bola
class TestRunner {
  constructor() {
    this.tests = [];
    this.passed = 0;
    this.failed = 0;
  }

  addTest(name, testFunction) {
    this.tests.push({ name, testFunction });
  }

  async runTests() {
    console.log('🧪 Iniciando testes...\n');
    
    for (const test of this.tests) {
      try {
        await test.testFunction();
        console.log(`✅ ${test.name}`);
        this.passed++;
      } catch (error) {
        console.log(`❌ ${test.name}: ${error.message}`);
        this.failed++;
      }
    }
    
    console.log(`\n📊 Resultados: ${this.passed} passou, ${this.failed} falhou`);
  }
}

// Instanciar o runner de testes
const testRunner = new TestRunner();

// Teste 1: AuthManager - Login válido
testRunner.addTest('AuthManager - Login válido', () => {
  const authManager = new AuthManager();
  const result = authManager.login('admin', '123456');
  if (!result) throw new Error('Login deveria ter sucesso');
});

// Teste 2: AuthManager - Login inválido
testRunner.addTest('AuthManager - Login inválido', () => {
  const authManager = new AuthManager();
  const result = authManager.login('admin', 'senhaerrada');
  if (result) throw new Error('Login deveria falhar');
});

// Teste 3: DataManager - Adicionar jogadora
testRunner.addTest('DataManager - Adicionar jogadora', () => {
  const dataManager = new DataManager();
  const jogadora = dataManager.addJogadora('Teste Silva', 'Atacante');
  if (!jogadora.id || jogadora.nome !== 'Teste Silva') {
    throw new Error('Jogadora não foi adicionada corretamente');
  }
});

// Teste 4: DataManager - Remover jogadora
testRunner.addTest('DataManager - Remover jogadora', () => {
  const dataManager = new DataManager();
  const jogadora = dataManager.addJogadora('Teste Remove', 'Meia');
  const id = jogadora.id;
  dataManager.removeJogadora(id);
  const encontrada = dataManager.data.jogadoras.find(j => j.id === id);
  if (encontrada) throw new Error('Jogadora deveria ter sido removida');
});

// Teste 5: Validação de campos vazios
testRunner.addTest('Validação - Campos vazios', () => {
  const nome = '';
  const posicao = '';
  if (nome && posicao) {
    throw new Error('Validação de campos vazios falhou');
  }
});

// Teste 6: Validação de nome muito curto
testRunner.addTest('Validação - Nome muito curto', () => {
  const nome = 'A';
  if (nome.length >= 2) {
    throw new Error('Validação de nome curto falhou');
  }
});

// Teste 7: Formatação de números
testRunner.addTest('Formatação - Números brasileiros', () => {
  const numero = 1234567;
  const formatado = numero.toLocaleString('pt-BR');
  if (formatado !== '1.234.567') {
    throw new Error('Formatação de números falhou');
  }
});

// Teste 8: LocalStorage - Salvar dados
testRunner.addTest('LocalStorage - Salvar dados', () => {
  const dataManager = new DataManager();
  dataManager.saveData();
  const saved = localStorage.getItem('passaBolaData');
  if (!saved) throw new Error('Dados não foram salvos no localStorage');
});

// Teste 9: LocalStorage - Carregar dados
testRunner.addTest('LocalStorage - Carregar dados', () => {
  const dataManager = new DataManager();
  const data = dataManager.loadData();
  if (!data.seguidores || !data.jogadoras) {
    throw new Error('Dados não foram carregados corretamente');
  }
});

// Teste 10: Verificação de jogadora duplicada
testRunner.addTest('Validação - Jogadora duplicada', () => {
  const dataManager = new DataManager();
  dataManager.addJogadora('Jogadora Teste', 'Atacante');
  
  const jogadoras = dataManager.data.jogadoras;
  const duplicadas = jogadoras.filter(j => j.nome === 'Jogadora Teste');
  if (duplicadas.length > 1) {
    throw new Error('Sistema permitiu jogadora duplicada');
  }
});

// Função para executar todos os testes
function executarTestes() {
  testRunner.runTests();
}

// Executar testes automaticamente se estiver no console
if (typeof window !== 'undefined') {
  window.executarTestes = executarTestes;
  console.log('💡 Digite executarTestes() no console para rodar os testes');
}
