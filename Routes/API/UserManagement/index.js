const express = require('express');
const StudentC = require('../../../Apps/Services/Controllers/UserManagement/PeopleManagement/StudentManagement/StudentC');
const Route   = express.Router();

Route.get('/', (req,res) => {StudentC.index(req, res)});

module.exports = Route;