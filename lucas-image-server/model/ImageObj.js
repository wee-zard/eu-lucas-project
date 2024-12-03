const {ExifData} = require('./ExifData');

class ImageObj {
    year;
    countryCode;
    countryName;
    coordinateX;
    coordinateY;
    imageName;
    directionName;

    /**
     * @param {number} year 
     * @param {string} countryCode 
     * @param {string} countryName 
     * @param {number} coordinateX 
     * @param {number} coordinateY 
     * @param {string} imageName 
     * @param {string} directionName 
     */
    constructor(
        year,
        countryCode,
        countryName,
        coordinateX,
        coordinateY,
        imageName,
        directionName,
    ){
        this.year = year;
        this.countryCode = countryCode;
        this.countryName = countryName;
        this.coordinateX = coordinateX;
        this.coordinateY = coordinateY;
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
            imageObj.coordinateX, 
            imageObj.coordinateY, 
            imageObj.imageName, 
            imageObj.directionName
        );
        this.exifData = exifData;
    }
}

module.exports = {ImageObj, ImageObjWithExifData};