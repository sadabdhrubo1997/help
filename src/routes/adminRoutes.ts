import { Router } from 'express';
import { adminLoginController } from '../controllers/admin/adminLoginController';
import { adminLogoutController } from '../controllers/admin/adminLogoutController';
import { adminIsLoggedInController } from './../controllers/admin/adminIsLoggedInController';

const router = Router();

router.post('/admin/login',  adminLoginController);

router.get(
  '/admin/isLoggedIn',
  adminIsLoggedInController
);

router.get('/admin/logout', adminLogoutController);

export default router;
