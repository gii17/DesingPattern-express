const { Module }      = require('module');
const ResponseHelpers = require("../../Helpers/ResponseHelpers");

class BaseGlobalC {
    ResponseHelpers;
    
   constructor() {
    this.ResponseHelpers = new ResponseHelpers();
   }
}

module.exports = BaseGlobalC