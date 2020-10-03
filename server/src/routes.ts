import express from 'express';

import ClassesController from './controllers/ClassesController';
import ConnectionController from './controllers/ConnectionsController';
import AuthController from './controllers/AuthController';
import UserController from './controllers/UsersController';
import ScheduleController from './controllers/ScheduleController';

import AuthMiddleware from './middlewares/authMiddleware';

const routes = express.Router();
const classesController = new ClassesController();
const connectionsController = new ConnectionController();
const authController = new AuthController();
const userController = new UserController();
const scheduleController = new ScheduleController();

routes.post('/signup', authController.signin);
routes.post('/login', authController.login);

routes.post('/forget_password', authController.forgotPassword);
routes.post('/recovery_password', authController.recoveryPassword);

routes.get('/users/:id', userController.index);
routes.put('/users/:id', userController.update);

routes.get('/connections', connectionsController.index);

routes.use(AuthMiddleware);

routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);
routes.get('/classes/:id', classesController.index);
routes.put('/classes/:id', classesController.update);

routes.post('/schedule/:id', scheduleController.create);
routes.delete('/schedule/:class_id/:id', scheduleController.delete);

routes.post('/connections', connectionsController.create);

export default routes;
