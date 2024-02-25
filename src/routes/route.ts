import {IRouter, Router} from 'express';

import * as userController from '../controllers/users'
import * as transanctionController from '../controllers/transactions'
import * as creditController from '../controllers/credits'
import * as taxController from '../controllers/tax'
import {validateLoginBody, validateRegBody} from '../middlewares/validation';
import {Authorization} from '../middlewares/authorize';

const router:IRouter = Router();
router
  .get('/tax', taxController.fetchTaxValue)
  .get('/allUsers', userController.fetchAllUsers)

  .get('/transactions', Authorization, transanctionController.fetchAllTransanctions)
  .get('/balance', Authorization, creditController.getCreditAccountBalance)
  .post('/transfer', Authorization, creditController.transferCredits)

  .post('/update-tax', taxController.changeTaxConfig)
  .post('/registration', validateRegBody, userController.Register)
  .post('/login', validateLoginBody, userController.Login)
export default router;


/**
 * "id": "65da771a30f5cdc3997f539a",
 *     "email": "ogunwole888@gmail.com",
 *     "name": "Joshua Ogunwole",
 *     "mobile": "+2349031846448",
 *     "createdAt": "2024-02-24T23:09:12.956Z",
 *     "updatedAt": "2024-02-24T23:09:12.956Z",
 *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGE3NzFhMzBmNWNkYzM5OTdmNTM5YSIsImlhdCI6MTcwODgxNzk0OCwiZXhwIjoxNzA4OTkwNzQ4fQ.H-fJDVpmbKnitjgjSg5xp0-JDH8Ibl_HPMUbSj9xj0g",
 *     "walletId": "65da773130f5cdc3997f539c",
 *     "walletBalance": 1000,
 *     "lastUpdated": "2024-02-24T23:09:15.771Z"**/