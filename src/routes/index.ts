import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const routes = Router();

routes.post('/users/listing', UserController.listing);
routes.get('/users', UserController.getAll);
routes.post('/users', UserController.create);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);
routes.post('/users/login', UserController.login);

export default routes;
