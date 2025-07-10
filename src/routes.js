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

routes.post('/tasks', TaskController.store);

export default routes;
