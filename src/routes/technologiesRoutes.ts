import {
  type NextFunction,
  type Request,
  type Response,
  Router
} from 'express';
import { DatabaseInMemory } from '../database/databaseInMemory';
import { randomUUID } from 'node:crypto';

const router = Router();

const database = new DatabaseInMemory();

const checkExistsUserAccount = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { username } = req.headers;

  const user = database.UserExists(username as string);
  if (user === null) {
    res.status(404).json({
      error: 'User not found'
    });
  } else {
    req.user = user;
    next();
  }
};

router.get('/', checkExistsUserAccount, (req: Request, res: Response) => {
  const { user } = req;
  return res.status(200).json(user.technologies);
});

router.post('/', checkExistsUserAccount, (req: Request, res: Response) => {
  const { user } = req;
  const { title, deadline } = req.body;

  const technology = {
    id: randomUUID(),
    title,
    studied: false,
    deadline: new Date(deadline),
    created_at: new Date()
  };
  user.technologies.push(technology);
  return res.status(201).json(technology);
});

router.put('/:id', checkExistsUserAccount, (req: Request, res: Response) => {
  const { user } = req;
  const { id } = req.params;
  const { title, deadline } = req.body;

  const technology = user.technologies.find(
    (currentTech) => currentTech.id === id
  );
  if (technology !== undefined) {
    technology.title = title;
    technology.deadline = deadline;
    return res.status(201).json(technology);
  }
  return res.status(404).json({
    error: 'Tecnologia não encontrada'
  });
});

router.patch(
  '/:id/studied',
  checkExistsUserAccount,
  (req: Request, res: Response) => {
    const { user } = req;
    const { id } = req.params;
    if (user === undefined) {
      res.send(404).json({
        error: 'Usuário não encontrado'
      });
    }
    const technology = user.technologies.find(
      (currentTech) => currentTech.id === id
    );
    if (technology !== undefined) {
      technology.studied = true;
      return res.status(201).json(technology);
    }
    return res.status(404).json({
      error: 'Tecnologia não encontrada'
    });
  }
);

router.delete('/:id', checkExistsUserAccount, (req: Request, res: Response) => {
  const { user } = req;
  const { id } = req.params;
  if (user === undefined) {
    res.send(404).json({
      error: 'Usuário não encontrado'
    });
  }
  const technology = user.technologies.find(
    (currentTech) => currentTech.id === id
  );
  if (technology !== undefined) {
    const index = user.technologies.indexOf(technology);
    user.technologies.splice(index, 1);
    return res.status(201).json(technology);
  }
  return res.status(404).json({
    error: 'Tecnologia não encontrada'
  });
});

export default router;
