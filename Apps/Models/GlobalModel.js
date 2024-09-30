const express   = require('express');
const Joi       = require('joi');
const BaseModel = require('./BaseModel');

class GlobalModel extends BaseModel {
    constructor() {
        super();
    }

    // POSITIF VALIDATOR
    static STATUS_ACTIVE   = 1;
    static STATUS_PROGRESS = 0;
    static STATUS_START    = 0;
    static STATUS_INCOMING = 0;

    // NEGATIF VALIDATOR
    static STATUS_DELETED  = 2;
    static STATUS_REJECT   = 2;


}

module.exports = GlobalModel;