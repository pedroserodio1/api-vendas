import { Router } from 'express';
import UsersController from '../controller/UsersController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticate from '@shared/http/middlewares/isAuthenticate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UserAvatarController from '../controller/UserAvatarController';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.get('/', isAuthenticate, usersController.index);

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    usersController.create,
);

usersRouter.patch(
    '/avatar',
    isAuthenticate,
    upload.single('avatar'),
    userAvatarController.update,
);

export default usersRouter;
