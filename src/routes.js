import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionsController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import fileController from './app/controllers/FileController';
import providerController from './app/controllers/ProviderController';
import appointmentController from './app/controllers/AppointmentController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update);

routes.post('/sessions', SessionsController.store);

routes.get('/providers', authMiddleware, providerController.index);

routes.post(
    '/files',
    authMiddleware,
    upload.single('file'),
    fileController.store
);

routes.post('/appointments', authMiddleware, appointmentController.store);

export default routes;
