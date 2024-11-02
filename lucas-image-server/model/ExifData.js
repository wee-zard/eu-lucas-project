class ExifData {

    exifKey;
    exifValue;

    /**
     * @param {string} exifKey
     * @param {string} exifValue
     */
    constructor(
        exifKey,
        exifValue
    ){
        this.exifKey = exifKey;
        this.exifValue = exifValue;
    }
}

module.exports = {ExifData};