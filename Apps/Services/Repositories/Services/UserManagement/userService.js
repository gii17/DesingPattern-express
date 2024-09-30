const { extend } = require("joi");

class UserService extends GlobalRepo {
    index(req) {
        var data = {
            "name" : "alghi",
        };

        if(data.name == "Riva Almero") {
            return this.sendResponse(req, data);
        }else {
            return this.sendError(req, "error", 400);
        }
    }
}