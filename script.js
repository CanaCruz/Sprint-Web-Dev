let dados = {
  seguidores: [5000, 5600, 6200, 6900, 7600],
  jogadoras: [
    { nome: "Lia Santos", posicao: "Atacante" },
    { nome: "Marina Faria", posicao: "Meia" }
  ]
};

// Mostra total e gráfico
function carregarDashboard() {
  document.getElementById("total").textContent =
    dados.seguidores[dados.seguidores.length - 1];

  new Chart(document.getElementById("grafico"), {
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
}

// Lista jogadoras
function carregarJogadoras() {
  let lista = document.getElementById("lista");
  lista.innerHTML = "";
  dados.jogadoras.forEach(j => {
    let li = document.createElement("li");
    li.textContent = `${j.nome} - ${j.posicao}`;
    lista.appendChild(li);
  });
}

// Adicionar jogadora
function adicionarJogadora() {
  let nome = document.getElementById("nome").value;
  let pos = document.getElementById("posicao").value;
  if (nome && pos) {
    dados.jogadoras.push({ nome, posicao: pos });
    carregarJogadoras();
    document.getElementById("nome").value = "";
    document.getElementById("posicao").value = "";
  }
}

// Navegação simples
function mostrar(secao) {
  document.querySelectorAll("main section").forEach(s => s.classList.remove("ativo"));
  document.getElementById(secao).classList.add("ativo");
}

carregarDashboard();
carregarJogadoras();
