import { Router } from 'express';
import { ImageController } from '../../../server/controllers/image.controller';

export default class ImageRoutes {
  constructor(
    private router: Router = Router(),
    private controller: ImageController = new ImageController()
  ) {}

  /**
   * Get all the routes in the current route.
   *
   * @returns Returns a {@link Router}.
   */
  getRoutes(): Router {
    this.router.post('/', this.controller.getImagesByRequestParams);

    return this.router;
  }
}
