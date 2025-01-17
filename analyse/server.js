// Importer les modules nécessaires
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config(); // Charger les variables d'environnement

// Initialiser l'application Express
const app = express();

// Configuration de la base de données PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  connectionTimeoutMillis: 5000, // Temps d'attente pour la connexion
});

pool.on('error', (err) => {
  console.error('Erreur inattendue avec le pool:', err);
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Route d'accueil
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint pour soumettre le formulaire
app.post('/submit', async (req, res) => {
  const {
    employee_name,
    department,
    id,
    position,
    evaluator_name,
    evaluation_date,
    work_quality,
    performance_quality,
    work_consistency,
    communication,
  } = req.body;

  try {
    // Insérer les données dans la base de données PostgreSQL
    const query = `
      INSERT INTO performance_analysis (
        employee_name,
        department,
        id,
        position,
        evaluator_name,
        evaluation_date,
        work_quality,
        performance_quality,
        work_consistency,
        communication
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `;
    
    await pool.query(query, [
      employee_name,
      department,
      id,
      position,
      evaluator_name,
      evaluation_date,
      work_quality,
      performance_quality,
      work_consistency,
      communication,
    ]);

    // Réponse après succès
    res.status(200).json({ message: 'Les données ont été enregistrées avec succès.' });
  } catch (error) {
    console.error(error);
    // Réponse après échec
    res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'enregistrement des données.' });
  }
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
