import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionController from './controllers/ConnectionsController';
import AuthController from './controllers/AuthController';
import UserController from './controllers/UsersController';

const routes = express.Router();
const classesController = new ClassesController();
const connectionsController = new ConnectionController();
const authController = new AuthController();
const userController = new UserController();

routes.post('/signup', authController.signin);
routes.post('/login', authController.login);

routes.post('/forget_password', authController.forgotPassword);
routes.post('/recovery_password', authController.recoveryPassword);

routes.get('/users/:id', userController.index);
routes.put('/users/:id', userController.update);

routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);

routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);

export default routes;
