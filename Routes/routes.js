const express = require('express');
const Route   = express.Router();


Route.use('/userManagement', require("./API/UserManagement/index"));

module.exports = Route;