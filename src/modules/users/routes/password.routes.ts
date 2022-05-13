import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ForgotPasswordController from '../controller/ForgotPasswordController';
import ResetPasswordController from '../controller/ResetPasswordController';

const passwordRoutes = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post(
    '/forgot',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
        },
    }),
    forgotPasswordController.create,
);

passwordRoutes.post(
    '/reset',
    celebrate({
        [Segments.BODY]: {
            password: Joi.string().required(),
            password_confimation: Joi.string()
                .required()
                .valid(Joi.ref('password')),
            token: Joi.string().uuid().required(),
        },
    }),
    resetPasswordController.create,
);

export default passwordRoutes;
