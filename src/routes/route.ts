import {IRouter, Router} from 'express';

import * as userController from '../controllers/users'
import {validateLoginBody, validateRegBody} from '../middlewares/validation';

const router:IRouter = Router();
router
  .post('/registration', validateRegBody, userController.Register)
  .post('/login', validateLoginBody, userController.Login)
export default router;
