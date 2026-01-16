import express from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../index.js';

const router = express.Router();

// Exemplo de usuário fixo (substitua por consulta ao banco em produção)
const user = { id: 1, username: 'admin', password: 'admin' };

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (username === user.username && password === user.password) {
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.json({ token });
  }
  res.status(401).json({ error: 'Credenciais inválidas' });
});

export default router;
