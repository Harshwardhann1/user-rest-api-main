import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const routes = Router();

routes.get('/users', UserController.getAll);
routes.post('/users', UserController.create);
routes.get('/users/:id', UserController.getById);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

export default routes;
