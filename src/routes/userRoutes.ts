import { type Request, type Response, Router } from 'express';
import { DatabaseInMemory } from '../database/databaseInMemory';
import { randomUUID } from 'node:crypto';

const router = Router();

const database = new DatabaseInMemory();

router.post('/', (req: Request, res: Response) => {
  const { name, username, technologies } = req.body;
  const user = {
    id: randomUUID(),
    name,
    username,
    technologies: technologies ?? []
  };
  const createdUser = database.createUser(user);
  if (!createdUser) {
    res.status(400).json({
      error: 'Mensagem do erro'
    });
  }
  return res.status(201).json(user);
});

export default router;
