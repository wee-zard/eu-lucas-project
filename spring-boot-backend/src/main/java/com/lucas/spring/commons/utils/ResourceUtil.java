package com.lucas.spring.commons.utils;

import com.lucas.spring.commons.model.model.ResourceModel;
import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import javax.imageio.ImageIO;
import lombok.experimental.UtilityClass;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.util.StreamUtils;

/**
 * Utility class for handling files inside the resource folder.
 */
@UtilityClass
public class ResourceUtil {

  /**
   * List filenames from a resource directory.
   *
   * @param resourceFolderName The folder name that is inside the resources' directory.
   * @return Returns a list of filenames that are present inside the directory.
   */
  public List<Resource> getResourcesFromDirectory(
          final String resourceFolderName
  ) throws IOException {
    final PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
    final String classpath = String.format("classpath:%s/**/*", resourceFolderName);

    return Arrays.stream(resolver.getResources(classpath))
            .filter(ResourceUtil::isNotFolder)
            .toList();
  }

  /**
   * Retrieves the local image server files from the resources directory.
   *
   * @param directoryName the name of the directory in which the resources are present.
   * @return Returns a list of filenames and base64strings of the retrieved files.
   */
  public List<ResourceModel> getResourceModels(final String directoryName) {
    try {
      final List<Resource> resources = ResourceUtil.getResourcesFromDirectory(directoryName);
      return ResourceUtil.getResourceModels(resources);
    } catch (IOException e) {
      // TODO: Throw a better exception here.
      throw new RuntimeException(e.getMessage());
    }
  }

  /**
   * Retrieves the local image server files from the resources directory.
   *
   * @param resources The resources to process.
   * @return Returns a list of filenames and base64strings of the retrieved files.
   */
  public List<ResourceModel> getResourceModels(final List<Resource> resources) {
    return resources.stream()
            .map(resource -> {
              try {
                final byte[] byteArray = ResourceUtil.toByteArray(resource);

                return ResourceModel.builder()
                        .filename(resource.getFilename())
                        .base64(ResourceUtil.toBase64(byteArray))
                        .build();
              } catch (IOException e) {
                // TODO: Throw a better exception here.
                throw new RuntimeException(e.getMessage());
              }
            })
            .toList();
  }

  /**
   * Converts the provided param into a byte array.
   *
   * @param data The param to convert into a byte array.
   * @return Returns the byte array version of the resource.
   */
  public byte[] toByteArray(final Resource data) throws IOException {
    try (InputStream inputStream = data.getInputStream()) {
      return StreamUtils.copyToByteArray(inputStream);
    }
  }

  /**
   * Converts the provided param into a byte array.
   *
   * @param data The param to convert into a byte array.
   * @return Returns the byte array version of the resource.
   */
  public byte[] toByteArray(final BufferedImage data) throws IOException {
    final ByteArrayOutputStream baos = new ByteArrayOutputStream();
    ImageIO.write(data, "jpg", baos);
    return baos.toByteArray();
  }

  /**
   * Converts a binary to base64String.
   *
   * @param binary The binaries to convert into base64String
   * @return Returns a base64string.
   */
  public String toBase64(final byte[] binary) {
    return Base64.getEncoder().encodeToString(binary);
  }

  /**
   * Decodes a base64string and converts it into a binary array.
   *
   * @param base64String The base64 to decode.
   * @return Returns the byte array of the base64string param.
   */
  public byte[] base64ToByteArray(final String base64String) {
    return Base64.getDecoder().decode(base64String);
  }

  /**
   * Download a specific image from a url
   * and converts it into a binary array.
   *
   * @param urlPath The url of the image from which we
   *                want to download the resource.
   * @return Returns the binary array version of the fetched image.
   */
  public byte[] getImageByUrl(final String urlPath) {
    try (BufferedInputStream in = new BufferedInputStream(new URI(urlPath).toURL().openStream())) {
      return in.readAllBytes();
    } catch (IOException | URISyntaxException e) {
      // handle exception
      return new byte[0];
    }
  }

  /**
   * Download a specific image from a url and converts it into a base64String.
   *
   * @param urlPath The url of the image from which we want to download the resource.
   * @return Returns the base64String converted version of the image.
   */
  public String urlToBase64(final String urlPath) {
    return ResourceUtil.toBase64(ResourceUtil.getImageByUrl(urlPath));
  }

  /**
   * Checks whether the Resource is a directory or not.
   *
   * @return Returns true if the resource is a directory.
   */
  public boolean isFolder(final Resource resource) {
    try {
      return resource.exists() && resource.getFile().isDirectory();
    } catch (IOException e) {
      // TODO: Throw a better exception here.
      throw new RuntimeException(e.getMessage());
    }
  }

  /**
   * Checks whether the Resource is a directory or not.
   *
   * @return Returns true if the resource is a directory.
   */
  public boolean isNotFolder(final Resource resource) {
    return !ResourceUtil.isFolder(resource);
  }
}
