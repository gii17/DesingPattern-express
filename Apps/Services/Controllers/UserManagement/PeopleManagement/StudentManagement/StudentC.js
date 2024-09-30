const GlobalC = require("../../../GlobalC");

class StudentC extends GlobalC {
    constructor() {
        super();
    }

    index(req, res) {
        var data     = this.validateInput(req);
        return this.queryBuilder("store", () => {
            var data = {name : "alghi"};
            return this.ResponseHelpers.sendResponse(res,data,200,"succesfully");
        }, (e) => {
            return this.ResponseHelpers.sendError({ error: 'Internal Server Error' },412);
        });
    };

}

module.exports = new StudentC();