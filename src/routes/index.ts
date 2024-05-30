import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { verifyToken } from '../ middleware/verifyToken';

const routes = Router();

routes.post('/users/listing',verifyToken, UserController.listing);
routes.get('/users', UserController.getAll);
routes.post('/users', UserController.create);
routes.post('/users/update',verifyToken, UserController.update);
routes.post('/users/delete',verifyToken, UserController.delete);
routes.post('/users/login', UserController.login);

export default routes;
