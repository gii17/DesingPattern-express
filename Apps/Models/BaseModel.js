const express = require('express');

class BaseModel {
    constructor() {
        this.getMorphClass();
    }

    getMorphClass() {
        return this.getMorphClass() ?? instance.constructor.name;
    }
}

module.exports = BaseModel;