document.addEventListener("DOMContentLoaded", () => {
  carregarVeiculos();

  const form = document.getElementById("formConsulta");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    carregarId();
  });
});

async function carregarVeiculos() {
  try {
    const response = await fetch("/veiculos");
    if (!response.ok) throw new Error("Erro ao carregar veículos.");

    const data = await response.json();

    const tabelaVeiculos = document.getElementById("tabelaVeiculos");
    const tbody = tabelaVeiculos.querySelector("tbody");
    if (!tbody) throw new Error("Elemento tbody não encontrado na tabela.");

    tbody.innerHTML = "";

    data.forEach((veiculo) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${veiculo.id}</td>
        <td>${veiculo.marca}</td>
        <td>${veiculo.modelo}</td>
        <td>${veiculo.ano}</td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Erro ao carregar veículos", error);
  }
}

async function carregarId() {
  try {
    const marca = document.getElementById("marca").value;
    const response = await fetch(`/veiculosBuscar?marca=${encodeURIComponent(marca)}`);
    if (!response.ok) throw new Error("Erro ao buscar veículos.");

    const data = await response.json();

    const tabelaVeiculos = document.getElementById("tabelaVeiculos");
    const tbody = tabelaVeiculos.querySelector("tbody");
    if (!tbody) throw new Error("Elemento tbody não encontrado na tabela.");

    const mensagemErro = document.getElementById("mensagemErro");
    if (data.length === 0) {
      mensagemErro.style.display = 'block';
      mensagemErro.textContent = 'Nenhum veículo encontrado.';
      tbody.innerHTML = '';
      return;
    } else {
      mensagemErro.style.display = 'none';
    }

    tbody.innerHTML = "";

    data.forEach((veiculo) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${veiculo.id}</td>
        <td>${veiculo.marca}</td>
        <td>${veiculo.modelo}</td>
        <td>${veiculo.ano}</td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    const mensagemErro = document.getElementById("mensagemErro");
    mensagemErro.style.display = 'block';
    mensagemErro.textContent = 'Erro ao buscar veículos: ' + error.message;
    console.error("Erro ao buscar veículos", error);
  }
}
