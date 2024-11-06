const path = require("path");

/**
 * Determines whether to use the remote root directory of the Lucas Image Database,
 * or use a pre-specified directory in the image database.
 */
const IsUseRemoteLucasImageRootDirectory = false;

const localLucasDirectory = [
  ...__dirname
    .split("\\")
    .filter((_, index) => __dirname.split("\\").length - 1 !== index),"resources","lucas",
];

const UrlHelper = {
  MaximumNumberOfProcessableRequests: 10,

  JobTimeout: 50,

  /**
   * The live url where we connect to the Lucas Image Database. This is a directory url, where
   * the system will start to search after the images to fetch them.
   * @type {string}
   */
  LucasRemoteRootImageDirectoryPath: IsUseRemoteLucasImageRootDirectory
    ? path.join("https://gisco-services.ec.europa.eu/lucas/photos/", "")
    : path.join("https://gisco-services.ec.europa.eu/lucas/photos/2006/DE/", ""),

  /**
   * The path to the local directory that is containing the images from the
   * Remote Lucas Image database.
   */
  LucasLocalRootImageDirectoryPath: IsUseRemoteLucasImageRootDirectory
    ? [...localLucasDirectory, ""].join("\\")
    : [...localLucasDirectory, "2006", "DE", ""].join("\\"),

  /**
   * TODO: Finish the javadoc later.
   * @param {string} site - The site that needs to be replaced with the local directory site.
   */
  ConvertRemoteUrlToLocalUrl: (site) => 
    site.replace(
      UrlHelper.LucasRemoteRootImageDirectoryPath,
      UrlHelper.LucasLocalRootImageDirectoryPath
    )
};

module.exports = { ...UrlHelper };
