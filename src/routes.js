import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionsController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import fileController from './app/controllers/FileController';
import providerController from './app/controllers/ProviderController';
import appointmentController from './app/controllers/AppointmentController';
import scheduleController from './app/controllers/ScheduleController';
import notificationController from './app/controllers/NotificationController';
import availableController from './app/controllers/AvailableController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update);

routes.post('/sessions', SessionsController.store);

routes.get('/providers', authMiddleware, providerController.index);
routes.get(
    '/providers/:providerId/available',
    authMiddleware,
    availableController.index
);

routes.post(
    '/files',
    authMiddleware,
    upload.single('file'),
    fileController.store
);

routes.get('/appointments', authMiddleware, appointmentController.index);
routes.post('/appointments', authMiddleware, appointmentController.store);
routes.delete(
    '/appointments/:id',
    authMiddleware,
    appointmentController.delete
);

routes.get('/schedule', authMiddleware, scheduleController.index);

routes.get('/notifications', authMiddleware, notificationController.index);
routes.put('/notifications/:id', authMiddleware, notificationController.update);

export default routes;
