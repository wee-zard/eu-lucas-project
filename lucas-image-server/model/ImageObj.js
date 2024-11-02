const {ExifData} = require('./ExifData');

class ImageObj {
    year;
    countryCode;
    countryName;
    latitude;
    longitude;
    imageName;
    directionName;

    /**
     * @param {number} year 
     * @param {string} countryCode 
     * @param {string} countryName 
     * @param {number} latitude 
     * @param {number} longitude 
     * @param {string} imageName 
     * @param {string} directionName 
     */
    constructor(
        year,
        countryCode,
        countryName,
        latitude,
        longitude,
        imageName,
        directionName,
    ){
        this.year = year;
        this.countryCode = countryCode;
        this.countryName = countryName;
        this.latitude = latitude;
        this.longitude = longitude;
        this.imageName = imageName;
        this.directionName = directionName;
    }
}

class ImageObjWithExifData extends ImageObj {
    exifData;

    /**
     * @param {ImageObj} imageObj 
     * @param {ExifData[]} exifData 
     */
    constructor(        
        imageObj,
        exifData
    ){
        super(
            imageObj.year, 
            imageObj.countryCode, 
            imageObj.countryName, 
            imageObj.latitude, 
            imageObj.longitude, 
            imageObj.imageName, 
            imageObj.directionName
        );
        this.exifData = exifData;
    }
}

module.exports = {ImageObj, ImageObjWithExifData};