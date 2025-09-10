// Sistema de autenticação simplificado e funcional
class AuthManager {
  constructor() {
    this.currentUser = null;
    this.init();
  }

  init() {
    console.log('AuthManager inicializado');
    // Verificar se há usuário logado no localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
      this.showMainContent();
    } else {
      this.showLogin();
    }
  }

  login(username, password) {
    console.log('Tentativa de login:', username);
    
    // Credenciais válidas
    const validUsers = {
      'admin': '123456',
      'user': 'password',
      'teste': 'teste123'
    };

    if (validUsers[username] && validUsers[username] === password) {
      this.currentUser = { username, role: username === 'admin' ? 'admin' : 'user' };
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      this.showMainContent();
      this.showAlert('Login realizado com sucesso!', 'success');
      console.log('Login bem-sucedido:', username);
      return true;
    } else {
      this.showAlert('Usuário ou senha inválidos!', 'error');
      console.log('Login falhou:', username);
      return false;
    }
  }

  logout() {
    console.log('Logout realizado');
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.showLogin();
    this.showAlert('Logout realizado com sucesso!', 'success');
  }

  showLogin() {
    console.log('Mostrando tela de login');
    const loginContainer = document.getElementById('login-container');
    const mainContent = document.getElementById('main-content');
    
    if (loginContainer) loginContainer.style.display = 'flex';
    if (mainContent) mainContent.style.display = 'none';
  }

  showMainContent() {
    console.log('Mostrando conteúdo principal');
    const loginContainer = document.getElementById('login-container');
    const mainContent = document.getElementById('main-content');
    
    if (loginContainer) loginContainer.style.display = 'none';
    if (mainContent) mainContent.style.display = 'block';
    
    // Atualizar nome do usuário
    const currentUserElement = document.getElementById('current-user');
    if (currentUserElement && this.currentUser) {
      currentUserElement.textContent = this.currentUser.username;
    }
    
    // Carregar dados
    carregarDashboard();
    carregarJogadoras();
  }

  showAlert(message, type = 'info') {
    console.log('Alert:', type, message);
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${type} show`;
    alertDiv.textContent = message;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.remove();
      }
    }, 3000);
  }
}

// Gerenciador de dados
class DataManager {
  constructor() {
    this.data = this.loadData();
    console.log('DataManager inicializado');
  }

  loadData() {
    const savedData = localStorage.getItem('passaBolaData');
    if (savedData) {
      return JSON.parse(savedData);
    }
    
    // Dados padrão
    return {
      seguidores: [5000, 5600, 6200, 6900, 7600],
      jogadoras: [
        { id: 1, nome: "Lia Santos", posicao: "Atacante", dataAdicao: new Date().toISOString() },
        { id: 2, nome: "Marina Faria", posicao: "Meia", dataAdicao: new Date().toISOString() }
      ]
    };
  }

  saveData() {
    localStorage.setItem('passaBolaData', JSON.stringify(this.data));
    console.log('Dados salvos no localStorage');
  }

  addJogadora(nome, posicao) {
    const novaJogadora = {
      id: Date.now(),
      nome: nome.trim(),
      posicao: posicao.trim(),
      dataAdicao: new Date().toISOString()
    };
    
    this.data.jogadoras.push(novaJogadora);
    this.saveData();
    console.log('Jogadora adicionada:', novaJogadora);
    return novaJogadora;
  }

  removeJogadora(id) {
    this.data.jogadoras = this.data.jogadoras.filter(j => j.id !== id);
    this.saveData();
    console.log('Jogadora removida:', id);
  }

  updateSeguidores(novosSeguidores) {
    this.data.seguidores = novosSeguidores;
    this.saveData();
    console.log('Seguidores atualizados:', novosSeguidores);
  }

  // Simular busca de dados externos
  async fetchExternalData() {
    try {
      console.log('Buscando dados externos...');
      // Simular API call
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await response.json();
      
      // Simular dados de seguidores baseados na API
      const novosSeguidores = this.data.seguidores.map((valor, index) => 
        valor + Math.floor(Math.random() * 1000) + (index * 200)
      );
      
      this.updateSeguidores(novosSeguidores);
      console.log('Dados externos carregados');
      return novosSeguidores;
    } catch (error) {
      console.error('Erro ao buscar dados externos:', error);
      return this.data.seguidores;
    }
  }
}

// Inicializar gerenciadores
let authManager;
let dataManager;
let dados;

// Função para inicializar o sistema
function inicializarSistema() {
  console.log('Inicializando sistema...');
  
  try {
    authManager = new AuthManager();
    dataManager = new DataManager();
    dados = dataManager.data;
    
    console.log('Sistema inicializado com sucesso!');
  } catch (error) {
    console.error('Erro ao inicializar sistema:', error);
  }
}

// Mostra total e gráfico
function carregarDashboard() {
  console.log('Carregando dashboard...');
  
  const totalElement = document.getElementById("total");
  if (totalElement) {
    totalElement.textContent = dados.seguidores[dados.seguidores.length - 1].toLocaleString('pt-BR');
  }

  const totalJogadorasElement = document.getElementById("total-jogadoras");
  if (totalJogadorasElement) {
    totalJogadorasElement.textContent = dados.jogadoras.length;
  }

  const canvas = document.getElementById("grafico");
  if (canvas) {
    // Destruir gráfico existente se houver
    if (window.chartInstance) {
      window.chartInstance.destroy();
    }

    try {
      window.chartInstance = new Chart(canvas, {
        type: "line",
        data: {
          labels: ["Jan", "Fev", "Mar", "Abr", "Mai"],
          datasets: [{
            label: "Seguidores",
            data: dados.seguidores,
            borderColor: "#6366f1",
            backgroundColor: "rgba(99, 102, 241, 0.1)",
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: "#6366f1",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "#4f46e5",
            pointHoverBorderColor: "#ffffff",
            pointHoverBorderWidth: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                usePointStyle: true,
                padding: 20,
                font: {
                  size: 14,
                  weight: '600'
                },
                color: '#374151'
              }
            },
            tooltip: {
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              titleColor: '#1f2937',
              bodyColor: '#374151',
              borderColor: '#e5e7eb',
              borderWidth: 1,
              cornerRadius: 8,
              displayColors: true,
              callbacks: {
                label: function(context) {
                  return 'Seguidores: ' + context.parsed.y.toLocaleString('pt-BR');
                }
              }
            }
          },
          scales: {
            x: {
              grid: {
                color: 'rgba(229, 231, 235, 0.5)',
                drawBorder: false
              },
              ticks: {
                color: '#6b7280',
                font: {
                  size: 12,
                  weight: '500'
                }
              }
            },
            y: {
              grid: {
                color: 'rgba(229, 231, 235, 0.5)',
                drawBorder: false
              },
              ticks: {
                color: '#6b7280',
                font: {
                  size: 12,
                  weight: '500'
                },
                callback: function(value) {
                  return value.toLocaleString('pt-BR');
                }
              }
            }
          },
          interaction: {
            intersect: false,
            mode: 'index'
          },
          animation: {
            duration: 2000,
            easing: 'easeInOutQuart'
          }
        }
      });
      console.log('Gráfico criado com sucesso');
    } catch (error) {
      console.error('Erro ao criar gráfico:', error);
    }
  }
}

// Lista jogadoras
function carregarJogadoras() {
  console.log('Carregando jogadoras...');
  
  const lista = document.getElementById("lista");
  if (!lista) return;
  
  lista.innerHTML = "";
  
  if (dados.jogadoras.length === 0) {
    lista.innerHTML = '<li style="text-align: center; color: #6b7280; padding: 2rem;">Nenhuma jogadora cadastrada</li>';
    return;
  }

  dados.jogadoras.forEach(jogadora => {
    const li = document.createElement("li");
    li.className = "jogadora-item";
    
    li.innerHTML = `
      <div class="jogadora-info">
        <div class="jogadora-nome">${jogadora.nome}</div>
        <div class="jogadora-posicao">${jogadora.posicao}</div>
      </div>
      <button class="btn-remover" onclick="removerJogadora(${jogadora.id})" title="Remover jogadora">
        🗑️
      </button>
    `;
    
    lista.appendChild(li);
  });
  
  console.log('Jogadoras carregadas:', dados.jogadoras.length);
}

// Adicionar jogadora
function adicionarJogadora() {
  console.log('Tentando adicionar jogadora...');
  
  const nome = document.getElementById("nome").value.trim();
  const posicao = document.getElementById("posicao").value.trim();
  
  // Validações
  if (!nome || !posicao) {
    authManager.showAlert('Por favor, preencha todos os campos!', 'error');
    return;
  }
  
  if (nome.length < 2) {
    authManager.showAlert('Nome deve ter pelo menos 2 caracteres!', 'error');
    return;
  }
  
  if (posicao.length < 2) {
    authManager.showAlert('Posição deve ter pelo menos 2 caracteres!', 'error');
    return;
  }
  
  // Verificar se já existe jogadora com o mesmo nome
  const jogadoraExistente = dados.jogadoras.find(j => 
    j.nome.toLowerCase() === nome.toLowerCase()
  );
  
  if (jogadoraExistente) {
    authManager.showAlert('Já existe uma jogadora com este nome!', 'error');
    return;
  }
  
  try {
    dataManager.addJogadora(nome, posicao);
    dados = dataManager.data; // Atualizar dados globais
    carregarJogadoras();
    
    // Limpar campos
    document.getElementById("nome").value = "";
    document.getElementById("posicao").value = "";
    
    authManager.showAlert('Jogadora adicionada com sucesso!', 'success');
    console.log('Jogadora adicionada com sucesso');
  } catch (error) {
    authManager.showAlert('Erro ao adicionar jogadora!', 'error');
    console.error('Erro ao adicionar jogadora:', error);
  }
}

// Remover jogadora
function removerJogadora(id) {
  console.log('Tentando remover jogadora:', id);
  
  if (confirm('Tem certeza que deseja remover esta jogadora?')) {
    try {
      dataManager.removeJogadora(id);
      dados = dataManager.data; // Atualizar dados globais
      carregarJogadoras();
      authManager.showAlert('Jogadora removida com sucesso!', 'success');
      console.log('Jogadora removida com sucesso');
    } catch (error) {
      authManager.showAlert('Erro ao remover jogadora!', 'error');
      console.error('Erro ao remover jogadora:', error);
    }
  }
}

// Navegação simples
function mostrar(secao) {
  console.log('Navegando para seção:', secao);
  
  // Verificar se usuário está logado
  if (!authManager || !authManager.currentUser) {
    console.log('Usuário não logado, redirecionando para login');
    authManager.showLogin();
    return;
  }
  
  document.querySelectorAll("main section").forEach(s => s.classList.remove("ativo"));
  const secaoElement = document.getElementById(secao);
  if (secaoElement) {
    secaoElement.classList.add("ativo");
    console.log('Seção ativada:', secao);
  }
}

// Função para buscar dados externos
async function atualizarDadosExternos() {
  console.log('Atualizando dados externos...');
  
  try {
    authManager.showAlert('Atualizando dados...', 'info');
    const novosSeguidores = await dataManager.fetchExternalData();
    dados = dataManager.data;
    carregarDashboard();
    authManager.showAlert('Dados atualizados com sucesso!', 'success');
    console.log('Dados externos atualizados com sucesso');
  } catch (error) {
    authManager.showAlert('Erro ao atualizar dados!', 'error');
    console.error('Erro ao atualizar dados externos:', error);
  }
}

// Funções de exportação/importação
function exportarDados() {
  console.log('Exportando dados...');
  
  try {
    const dataStr = JSON.stringify(dados, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'passa-bola-dados.json';
    link.click();
    
    URL.revokeObjectURL(url);
    authManager.showAlert('Dados exportados com sucesso!', 'success');
  } catch (error) {
    authManager.showAlert('Erro ao exportar dados!', 'error');
    console.error('Erro ao exportar:', error);
  }
}

function importarDados() {
  console.log('Importando dados...');
  
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  
  input.onchange = function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        try {
          const importedData = JSON.parse(e.target.result);
          dataManager.data = importedData;
          dataManager.saveData();
          dados = dataManager.data;
          carregarDashboard();
          carregarJogadoras();
          authManager.showAlert('Dados importados com sucesso!', 'success');
        } catch (error) {
          authManager.showAlert('Erro ao importar dados!', 'error');
          console.error('Erro ao importar:', error);
        }
      };
      reader.readAsText(file);
    }
  };
  
  input.click();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM carregado, inicializando sistema...');
  
  // Inicializar sistema
  inicializarSistema();
  
  // Login form
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      authManager.login(username, password);
    });
  }
  
  // Enter key para inputs
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        if (input.id === 'nome' || input.id === 'posicao') {
          adicionarJogadora();
        }
      }
    });
  });
  
  // Botão de logout
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      authManager.logout();
    });
  }
  
  console.log('Event listeners configurados');
});

// Debug: verificar se o sistema está funcionando
console.log('Script carregado!');
console.log('AuthManager:', typeof AuthManager);
console.log('DataManager:', typeof DataManager);