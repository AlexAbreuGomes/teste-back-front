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
      tabelaVeiculos.innerHTML = "";
  
      data.forEach((veiculo) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${veiculo.id}</td>
          <td>${veiculo.marca}</td>
          <td>${veiculo.modelo}</td>
          <td>${veiculo.ano}</td>
        `;
  
        tabelaVeiculos.appendChild(row);
      });
    } catch (error) {
      console.error("Erro ao carregar veículos", error);
    }
  }
  
  async function carregarId() {
    try {
      const marca = document.getElementById("marca").value;
      const response = await fetch(`/veiculosBuscar?marca=${marca}`);
      if (!response.ok) throw new Error("Erro ao buscar veículos.");
    
      const data = await response.json();
    
      const tabelaVeiculos = document.getElementById("tabelaVeiculos");
      tabelaVeiculos.innerHTML = "";
    
      data.forEach((veiculo) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${veiculo.id}</td>
          <td>${veiculo.marca}</td>
          <td>${veiculo.modelo}</td>
          <td>${veiculo.ano}</td>
        `;
    
        tabelaVeiculos.appendChild(row);
      });
    } catch (error) {
      console.error("Erro ao buscar veículos", error);
    }
  }
  
  

