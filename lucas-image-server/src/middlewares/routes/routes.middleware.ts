import { Router } from 'express';
import ImageRoutes from './routes/image.route';

export const configureRoutesMiddleware = (): Router => {
  const router = Router();

  router.use('/image', new ImageRoutes().getRoutes());

  return router;
};
