// Testes Unitários para Passa a Bola
// Para executar: abra o console do navegador e execute os testes

class TestSuite {
  constructor() {
    this.tests = [];
    this.passed = 0;
    this.failed = 0;
  }

  test(name, fn) {
    this.tests.push({ name, fn });
  }

  async run() {
    console.log('🧪 Iniciando Testes Unitários - Passa a Bola\n');
    
    for (const test of this.tests) {
      try {
        await test.fn();
        console.log(`✅ ${test.name}`);
        this.passed++;
      } catch (error) {
        console.log(`❌ ${test.name}: ${error.message}`);
        this.failed++;
      }
    }

    console.log(`\n📊 Resultados: ${this.passed} passou, ${this.failed} falhou`);
    return this.failed === 0;
  }
}

// Funções de teste (simulando as funções principais)
function validateJogadora(nome, posicao) {
  if (!nome || !posicao) {
    throw new Error('Nome e posição são obrigatórios');
  }
  if (nome.length < 2) {
    throw new Error('Nome deve ter pelo menos 2 caracteres');
  }
  return true;
}

function formatNumber(number) {
  return number.toLocaleString('pt-BR');
}

function generateId() {
  return Date.now();
}

function validateCredentials(username, password) {
  const validUsers = {
    'admin': '123456',
    'user': 'password',
    'teste': 'teste123'
  };
  return validUsers[username] === password;
}

// Executar testes
const suite = new TestSuite();

// Teste 1: Validação de jogadora
suite.test('Validação de jogadora - dados válidos', () => {
  const result = validateJogadora('Maria Silva', 'Atacante');
  if (!result) throw new Error('Deveria retornar true para dados válidos');
});

suite.test('Validação de jogadora - nome vazio', () => {
  try {
    validateJogadora('', 'Atacante');
    throw new Error('Deveria lançar erro para nome vazio');
  } catch (error) {
    if (!error.message.includes('obrigatórios')) {
      throw new Error('Mensagem de erro incorreta');
    }
  }
});

suite.test('Validação de jogadora - nome muito curto', () => {
  try {
    validateJogadora('A', 'Atacante');
    throw new Error('Deveria lançar erro para nome muito curto');
  } catch (error) {
    if (!error.message.includes('2 caracteres')) {
      throw new Error('Mensagem de erro incorreta');
    }
  }
});

// Teste 2: Formatação de números
suite.test('Formatação de números - número simples', () => {
  const result = formatNumber(1000);
  if (result !== '1.000') throw new Error('Formatação incorreta para 1000');
});

suite.test('Formatação de números - número grande', () => {
  const result = formatNumber(1234567);
  if (result !== '1.234.567') throw new Error('Formatação incorreta para 1234567');
});

// Teste 3: Geração de ID
suite.test('Geração de ID - deve retornar número', () => {
  const id = generateId();
  if (typeof id !== 'number') throw new Error('ID deve ser um número');
  if (id <= 0) throw new Error('ID deve ser positivo');
});

// Teste 4: Validação de credenciais
suite.test('Validação de credenciais - usuário válido', () => {
  const result = validateCredentials('admin', '123456');
  if (!result) throw new Error('Deveria validar credenciais corretas');
});

suite.test('Validação de credenciais - usuário inválido', () => {
  const result = validateCredentials('admin', 'senhaerrada');
  if (result) throw new Error('Deveria rejeitar credenciais incorretas');
});

suite.test('Validação de credenciais - usuário inexistente', () => {
  const result = validateCredentials('inexistente', '123456');
  if (result) throw new Error('Deveria rejeitar usuário inexistente');
});

// Teste 5: Operações com array de jogadoras
suite.test('Adicionar jogadora ao array', () => {
  const jogadoras = [];
  const novaJogadora = { id: 1, nome: 'Teste', posicao: 'Atacante' };
  jogadoras.push(novaJogadora);
  
  if (jogadoras.length !== 1) throw new Error('Array deveria ter 1 elemento');
  if (jogadoras[0].nome !== 'Teste') throw new Error('Nome da jogadora incorreto');
});

suite.test('Remover jogadora do array', () => {
  const jogadoras = [
    { id: 1, nome: 'Jogadora 1', posicao: 'Atacante' },
    { id: 2, nome: 'Jogadora 2', posicao: 'Meia' }
  ];
  
  const index = jogadoras.findIndex(j => j.id === 1);
  jogadoras.splice(index, 1);
  
  if (jogadoras.length !== 1) throw new Error('Array deveria ter 1 elemento após remoção');
  if (jogadoras[0].id !== 2) throw new Error('Jogadora errada foi removida');
});

// Teste 6: Validação de dados de seguidores
suite.test('Validação de dados de seguidores', () => {
  const seguidores = [5000, 5600, 6200, 6900, 7600];
  
  if (!Array.isArray(seguidores)) throw new Error('Seguidores deve ser um array');
  if (seguidores.length !== 5) throw new Error('Deve ter 5 valores de seguidores');
  
  seguidores.forEach((valor, index) => {
    if (typeof valor !== 'number') throw new Error(`Valor ${index} deve ser número`);
    if (valor < 0) throw new Error(`Valor ${index} não pode ser negativo`);
  });
});

// Teste 7: Verificação de duplicatas
suite.test('Verificação de jogadora duplicada', () => {
  const jogadoras = [
    { id: 1, nome: 'Maria Silva', posicao: 'Atacante' },
    { id: 2, nome: 'João Santos', posicao: 'Meia' }
  ];
  
  const jogadoraExistente = jogadoras.find(j => 
    j.nome.toLowerCase() === 'maria silva'
  );
  
  if (!jogadoraExistente) throw new Error('Deveria encontrar jogadora existente');
  
  const jogadoraNova = jogadoras.find(j => 
    j.nome.toLowerCase() === 'ana costa'
  );
  
  if (jogadoraNova) throw new Error('Não deveria encontrar jogadora inexistente');
});

// Executar todos os testes
suite.run().then(success => {
  if (success) {
    console.log('🎉 Todos os testes passaram!');
  } else {
    console.log('⚠️ Alguns testes falharam. Verifique as implementações.');
  }
});

// Exportar para uso global
window.TestSuite = TestSuite;
window.runTests = () => suite.run();
