package com.lucas.spring.commons.utils;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import javax.imageio.ImageIO;
import lombok.experimental.UtilityClass;

/**
 * Utility for image manipulation and drawing.
 */
@UtilityClass
public class ImageManipulationUtil {
  /**
   * Scale down the provided image to a predefined size.
   *
   * @param imageUrl The url of the image to scale down.
   * @return Returns the base64string version of the scaled down image.
   */
  public String scaleDownImage(final String imageUrl) {
    if (imageUrl.isEmpty()) {
      return null;
    }

    final byte[] imageBinaries = ResourceUtil.getImageByUrl(imageUrl);
    final ByteArrayInputStream stream = new ByteArrayInputStream(imageBinaries);

    try {
      final BufferedImage originalImage = ImageIO.read(stream);
      final BufferedImage resizedImage = ImageManipulationUtil.resizeImage(originalImage);
      final byte[] resizedImageBinaries = ResourceUtil.toByteArray(resizedImage);
      return ResourceUtil.toBase64(resizedImageBinaries);
    } catch (IOException e) {
      // TODO: Throw a custom exception here.
      return null;
    }
  }

  /**
   * Resizes the provided image to a smaller one.
   *
   * @param originalImage The image to resize.
   * @return Returns the result Buffered image.
   */
  private BufferedImage resizeImage(final BufferedImage originalImage) {
    final int width = 200;
    final int height = 200;
    final BufferedImage resizedImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
    final Graphics2D graphics2D = resizedImage.createGraphics();
    graphics2D.drawImage(originalImage, 0, 0, width, height, null);
    graphics2D.dispose();
    return resizedImage;
  }
}
