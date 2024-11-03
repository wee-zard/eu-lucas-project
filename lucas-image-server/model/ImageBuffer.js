class ImageBuffer {
    site;
    buffer;

    /**
     * @param {string} site 
     * @param {Buffer} buffer 
     */
    constructor(
        site,
        buffer,
    ){
        this.site = site;
        this.buffer = buffer;
    }
}

module.exports = {ImageBuffer};