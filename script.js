// Sistema de Autenticação e Gerenciamento de Estado
class AuthManager {
  constructor() {
    this.currentUser = null;
    this.isAuthenticated = false;
    this.init();
  }

  init() {
    // Verificar se há usuário logado no localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
      this.isAuthenticated = true;
      this.showMainContent();
    } else {
      this.showLogin();
    }
  }

  showLogin() {
    document.getElementById('login-container').style.display = 'flex';
    document.getElementById('main-content').style.display = 'none';
  }

  showMainContent() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    document.getElementById('current-user').textContent = this.currentUser?.username || 'Usuário';
  }

  async login(username, password) {
    try {
      // Simular validação de credenciais
      const validUsers = {
        'admin': '123456',
        'user': 'password',
        'teste': 'teste123'
      };

      if (validUsers[username] && validUsers[username] === password) {
        this.currentUser = { username, loginTime: new Date().toISOString() };
        this.isAuthenticated = true;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this.showMainContent();
        this.showAlert('Login realizado com sucesso!', 'success');
        return true;
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      this.showLoginError(error.message);
      return false;
    }
  }

  logout() {
    this.currentUser = null;
    this.isAuthenticated = false;
    localStorage.removeItem('currentUser');
    this.showLogin();
    this.showAlert('Logout realizado com sucesso!', 'success');
  }

  showLoginError(message) {
    const errorElement = document.getElementById('login-error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
    setTimeout(() => errorElement.classList.remove('show'), 3000);
  }

  showAlert(message, type = 'info') {
    // Criar elemento de alerta se não existir
    let alertContainer = document.getElementById('alert-container');
    if (!alertContainer) {
      alertContainer = document.createElement('div');
      alertContainer.id = 'alert-container';
      alertContainer.style.position = 'fixed';
      alertContainer.style.top = '20px';
      alertContainer.style.right = '20px';
      alertContainer.style.zIndex = '9999';
      document.body.appendChild(alertContainer);
    }

    const alert = document.createElement('div');
    alert.className = `alert ${type} show`;
    alert.textContent = message;
    alertContainer.appendChild(alert);

    setTimeout(() => {
      alert.classList.remove('show');
      setTimeout(() => alert.remove(), 300);
    }, 3000);
  }
}

// Gerenciador de Dados com Persistência
class DataManager {
  constructor() {
    this.data = this.loadData();
  }

  loadData() {
    const defaultData = {
      seguidores: [5000, 5600, 6200, 6900, 7600],
      jogadoras: [
        { id: 1, nome: "Lia Santos", posicao: "Atacante" },
        { id: 2, nome: "Marina Faria", posicao: "Meia" }
      ]
    };

    try {
      const saved = localStorage.getItem('passaBolaData');
      return saved ? JSON.parse(saved) : defaultData;
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      return defaultData;
    }
  }

  saveData() {
    try {
      localStorage.setItem('passaBolaData', JSON.stringify(this.data));
      return true;
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      return false;
    }
  }

  async fetchExternalData() {
    try {
      // Simular chamada para API externa
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const users = await response.json();
      
      // Simular dados de seguidores baseados na API
      const newSeguidores = users.slice(0, 5).map((_, index) => 5000 + (index * 1000) + Math.floor(Math.random() * 500));
      this.data.seguidores = newSeguidores;
      this.saveData();
      
      return true;
    } catch (error) {
      console.error('Erro ao buscar dados externos:', error);
      return false;
    }
  }
}

// Inicializar gerenciadores
const authManager = new AuthManager();
const dataManager = new DataManager();

// Funções de Dashboard com Tratamento de Erros
async function carregarDashboard() {
  try {
    // Tentar buscar dados externos primeiro
    const externalDataLoaded = await dataManager.fetchExternalData();
    if (externalDataLoaded) {
      authManager.showAlert('Dados atualizados com sucesso!', 'success');
    }

    const dados = dataManager.data;
    document.getElementById("total").textContent = 
      dados.seguidores[dados.seguidores.length - 1].toLocaleString('pt-BR');

    // Destruir gráfico existente se houver
    const canvas = document.getElementById("grafico");
    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
      existingChart.destroy();
    }

    new Chart(canvas, {
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
  } catch (error) {
    console.error('Erro ao carregar dashboard:', error);
    authManager.showAlert('Erro ao carregar dados do dashboard', 'error');
  }
}

// Lista jogadoras com tratamento de erros
function carregarJogadoras() {
  try {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";
    
    const dados = dataManager.data;
    if (!dados.jogadoras || dados.jogadoras.length === 0) {
      lista.innerHTML = '<li>Nenhuma jogadora cadastrada</li>';
      return;
    }

    dados.jogadoras.forEach(j => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="jogadora-item">
          <span class="jogadora-nome">${j.nome}</span>
          <span class="jogadora-posicao">${j.posicao}</span>
          <button onclick="removerJogadora(${j.id})" class="btn-remover">🗑️</button>
        </div>
      `;
      lista.appendChild(li);
    });
  } catch (error) {
    console.error('Erro ao carregar jogadoras:', error);
    authManager.showAlert('Erro ao carregar lista de jogadoras', 'error');
  }
}

// Adicionar jogadora com validação
function adicionarJogadora() {
  try {
    const nome = document.getElementById("nome").value.trim();
    const posicao = document.getElementById("posicao").value.trim();

    // Validações
    if (!nome) {
      authManager.showAlert('Nome é obrigatório', 'warning');
      return;
    }

    if (!posicao) {
      authManager.showAlert('Posição é obrigatória', 'warning');
      return;
    }

    if (nome.length < 2) {
      authManager.showAlert('Nome deve ter pelo menos 2 caracteres', 'warning');
      return;
    }

    // Verificar se já existe
    const dados = dataManager.data;
    const jogadoraExistente = dados.jogadoras.find(j => 
      j.nome.toLowerCase() === nome.toLowerCase()
    );

    if (jogadoraExistente) {
      authManager.showAlert('Jogadora já cadastrada', 'warning');
      return;
    }

    // Adicionar nova jogadora
    const novaJogadora = {
      id: Date.now(),
      nome: nome,
      posicao: posicao
    };

    dados.jogadoras.push(novaJogadora);
    
    if (dataManager.saveData()) {
      carregarJogadoras();
      document.getElementById("nome").value = "";
      document.getElementById("posicao").value = "";
      authManager.showAlert('Jogadora adicionada com sucesso!', 'success');
    } else {
      throw new Error('Erro ao salvar dados');
    }
  } catch (error) {
    console.error('Erro ao adicionar jogadora:', error);
    authManager.showAlert('Erro ao adicionar jogadora', 'error');
  }
}

// Remover jogadora
function removerJogadora(id) {
  try {
    if (!confirm('Tem certeza que deseja remover esta jogadora?')) {
      return;
    }

    const dados = dataManager.data;
    const index = dados.jogadoras.findIndex(j => j.id === id);
    
    if (index === -1) {
      authManager.showAlert('Jogadora não encontrada', 'error');
      return;
    }

    dados.jogadoras.splice(index, 1);
    
    if (dataManager.saveData()) {
      carregarJogadoras();
      authManager.showAlert('Jogadora removida com sucesso!', 'success');
    } else {
      throw new Error('Erro ao salvar dados');
    }
  } catch (error) {
    console.error('Erro ao remover jogadora:', error);
    authManager.showAlert('Erro ao remover jogadora', 'error');
  }
}

// Navegação com validação de autenticação
function mostrar(secao) {
  if (!authManager.isAuthenticated) {
    authManager.showAlert('Você precisa estar logado para acessar esta seção', 'warning');
    return;
  }

  try {
    document.querySelectorAll("main section").forEach(s => s.classList.remove("ativo"));
    const secaoElement = document.getElementById(secao);
    
    if (!secaoElement) {
      throw new Error('Seção não encontrada');
    }
    
    secaoElement.classList.add("ativo");
  } catch (error) {
    console.error('Erro na navegação:', error);
    authManager.showAlert('Erro ao navegar', 'error');
  }
}

// Função de logout
function logout() {
  authManager.logout();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  // Event listener para formulário de login
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      
      if (await authManager.login(username, password)) {
        carregarDashboard();
        carregarJogadoras();
      }
    });
  }

  // Event listener para tecla Enter nos inputs
  document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      const target = e.target;
      if (target.id === 'nome' || target.id === 'posicao') {
        adicionarJogadora();
      }
    }
  });
});

// Inicializar aplicação quando autenticado
if (authManager.isAuthenticated) {
  carregarDashboard();
  carregarJogadoras();
}
