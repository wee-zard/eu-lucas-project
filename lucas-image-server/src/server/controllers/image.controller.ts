import { Request, Response } from 'express';
import ImageService from '../services/image.service';
import ImageServiceImpl from '../services/impl/imageImpl.service';
import ImageRequestModel from '../models/request/imageRequest.model';
import ImageResponse from '../models/response/ImageResponse.model';

export class ImageController {
  private static readonly imageService: ImageService = new ImageServiceImpl();

  /**
   * Get a specific image by their request params.
   */
  getImagesByRequestParams(req: Request, res: Response): void {
    const request: ImageRequestModel = req.body;

    if (!request.images || !Array.isArray(request.images) || request.images.length === 0) {
      res.status(401).send('Error');
      return;
    }

    const response: ImageResponse = {
      images: ImageController.imageService.getImagesByRequestParams(request.images),
    };
    res.status(200).send(response);
  }
}
