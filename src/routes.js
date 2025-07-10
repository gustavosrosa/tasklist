import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import TaskController from './app/controllers/TaskController';

const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

// Middleware para todas as rotas abaixo
routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/tasks', TaskController.index);
routes.post('/tasks', TaskController.store);
routes.put('/tasks/:task_id', TaskController.update);
routes.delete('/tasks/:task_id', TaskController.destroy);

export default routes;
