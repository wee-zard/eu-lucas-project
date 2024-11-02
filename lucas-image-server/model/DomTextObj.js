class DomTextObj {
    site;
    domTextArray;

    /**
     * @param {string} site 
     * @param {string[]} domTextArray 
     */
    constructor(
        site,
        domTextArray
    ){
        this.site = site;
        this.domTextArray = domTextArray;
    }
}

module.exports = {DomTextObj};