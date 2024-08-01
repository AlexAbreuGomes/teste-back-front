// index.js

// importa o pg e o express
const express = require("express");
const { Pool } = require("pg");
const path = require("path");

const app = express();
const port = 3000;

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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "bd", "index.html"));
});

app.post("/cadastraVeiculos", async (req, res) => {
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

app.get("/veiculos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM veiculos");
    res.json(result.rows);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Corrigir o endpoint para buscar veículos por marca
app.get("/veiculosBuscar", async (req, res) => {
  const { marca } = req.query;

  try {
    const resultado = await pool.query(
      "SELECT * FROM veiculos WHERE marca = $1",
      [marca]
    );

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
    await pool.query(queryText, [id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta http://localhost:${port}`);
});
