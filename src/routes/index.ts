import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { verifyToken } from '../ middleware/verifyToken';

const routes = Router();

routes.post('/users/listing', UserController.listing);
routes.get('/users', UserController.getAll);
routes.post('/users', UserController.create);
routes.post('/users/update', UserController.update);
routes.post('/users/delete', UserController.delete);
routes.post('/users/login', UserController.login);

export default routes;
