import express from 'express'
import ClassesController from './controllers/ClassesController'
import ConnectionController from './controllers/ConnectionsController'
import AuthController from './controllers/AuthController'

const routes = express.Router()
const classesController = new ClassesController()
const connectionsController = new ConnectionController()
const authController = new AuthController()

routes.post('/sign', authController.signin)
routes.post('/login', authController.login)

routes.get('/classes', classesController.index)
routes.post('/classes', classesController.create)

routes.get('/connections', connectionsController.index)
routes.post('/connections', connectionsController.create)

export default routes