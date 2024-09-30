const BaseGlobalC = require('./BaseGlobalC');
const sequelize   = require('../../../Databases/Connection/sequalize');
class GlobalC extends BaseGlobalC{

    constructor() {
        super();
        this.err_validating_param = "null";
        this.tempData             = {};
    }

    validateInput(req, except = []) {
        this.tempData = {};
        for (const key in req.body) {
            if (except.includes(key)) continue;

            const value = req.body[key];
            if (Array.isArray(value)) {
                this.tempData[key] = [];
                if (value.length > 0) {
                    this.tempData[key] = this.recursiveValidate(value, this.tempData[key]);
                }
            } else {
                this.tempData[key] = this.sanitizeInput(value);
                if (this.tempData[key] === '') this.tempData[key] = null;
            }
        }
        return this.tempData;
    }

    sanitizeInput(input) {
        if (typeof input !== 'string') return input;

        // Sanitasi input
        return input
            .replace(/--/g, "\\-\\-")
            .replace(/<\/?script.*?>/g, '')
            .trim()
            .replace(/ {2,}/g, ' ')
            .replace(/\\/g, '\\\\')
            .replace(/'/g, '\\\'')
            .replace(/"/g, '\\"');
    }

    recursiveValidate(value, data) {
        data = [];
        
        if (Array.isArray(value)) {
            for (let i = 0; i < value.length; i++) {
                if (Array.isArray(value[i])) {
                    data[i] = [];
                    if (value[i].length > 0) {
                        data[i] = this.recursiveValidate(value[i], data[i]);
                    }
                } else {
                    data[i] = this.sanitizeInput(value[i]);
                }
            }
        } else {
            const keys = Object.keys(value);
            for (const key of keys) {
                const reqValue = value[key];
                if (Array.isArray(reqValue)) {
                    data[key] = [];
                    data[key] = this.recursiveValidate(reqValue, data[key]);
                } else {
                    data[key] = this.sanitizeInput(reqValue);
                }
            }
        }
        return data;
    }

    validatingParam(req, schema, sendDetailError = false) {
        const { error } = schema.validate(req.body);
        if (error) {
            console.error(error.details);
            if (sendDetailError) {
                this.flash({ error: error.details.map(err => err.message).join(', ') });
            } else {
                this.flash({ err: 'err-param' });
            }
            this.err_validating_param = error.details;
            return 0;
        }

        return 1;
    }


    queryBuilder(action = "store", callback = null) {
        const t =  sequelize.transaction();
        try {
            const val =  callback(t);
    
             t.commit(); 
            if (processType && !session.message) {
                return this.sendError("error pada saat service di jalankan",400);
            }
            return val;
        } catch (e) {
             t.rollback();
            logError(e);
    
            if (processType && session.message === null) {
                return this.sendError("erro pada saat process data",400);
            }
            if (catchCallback) return catchCallback(e);
        }
    }
}


module.exports = GlobalC