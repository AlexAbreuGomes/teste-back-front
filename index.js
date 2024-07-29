// const express = require('express');
// const { Pool } = require('pg'); //gerencia as conexoes postgrees sql

// const path = require('path');

// const app = express(); // cria uma aplicaçao  express

// const port = 3000;

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'banco',
//   password: 'BemVindo!',
//   port: 5432,
// });

// app.use(express.static(path.join(__dirname, 'bd')));

// app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'bd', 'index.html'));
// });

// app.post('/veiculos', async (req, res) => {
//   const { marca, modelo, ano } = req.body;

//   const queryText = 'INSERT INTO veiculos (marca, modelo, ano) VALUES ($1, $2, $3) RETUNING *'

//   const values = [marca,modelo,ano];

//   try {
//     const result = await pool.query(queryText, values);
//     res.status(201).json(result.rows[0]);

//   } catch (error) {
//     res.status(500).send ('Erro interno ao processar a solicitação')

//   }

// });
// //rotas para consultar veiculos

// app.get('/veiculos', async (req,res) => {
//     try {
//         const result = await pool.query('SELECT * FROM veiculos');
//         res.json(result.rows);
//     } catch (error) {
//         res.status(400).send (err)
//     }
// })

// app.listen(port, () => {
//     console.log(`Servidor rodando em http://localhost:${port}`)
// });

// importa o pg e o express
const express = require("express");
const { Pool } = require("pg");

// importa o path
const path = require("path");

// cria uma aplicação express
const app = express();

// define a porta
const port = 3000;

// informa o acesso ao pg
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "banco",
  password: "BemVindo!",
  port: 5432,
});

app.use(express.static(path.join(__dirname, "bd")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rota para html principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "bd", "index.html"));
});

//rota para cadastrar um veículo
app.post("/veiculos", async (req, res) => {
  const { marca, modelo, ano } = req.body;

  const queryText =
    "INSERT INTO veiculos (marca, modelo, ano) VALUES ($1, $2, $3) RETURNING *";
  const values = [marca, modelo, ano];

  try {
    const result = await pool.query(queryText, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send("Erro ao cadastrar o veículo");
  }
});

// rota para consultar os veículos
app.get("/veiculos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM veiculos");
    res.json(result.rows);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Correção do endpoint para buscar veículos por marca
// O endpoint deve receber uma query parameter chamada marca
// Retorna o veículo encontrado ou 404 caso não encontre

app.get("/veiculosBuscar", async (req, res) => {
    const { marca } = req.params;
  
    try {
      const resultado = await pool.query("SELECT * FROM veiculos WHERE marca = $1", [marca]);
  
      if (resultado.rows.length === 0) {
        return res.status(404).json({ mensagem: "Nenhum veículo encontrado." });
      }
  
      return res.status(200).json(resultado.rows);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar veículos." });
    }
  });
  


app.delete("/veiculos/:id", async (req, res) => {
  const id = req.params.id;
  const queryText = "DELETE FROM veiculos WHERE id = $1";
  try {
    const result = await pool.query(queryText, [id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta http://localhost:${port}`);
});
