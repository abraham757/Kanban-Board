import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
const router = Router();
router.use('/auth', authRoutes);
// TODO: Add authentication to the API routes
router.use('/api', apiRoutes);
// Rutas protegidas (requieren autenticación con JWT)
export default router;
