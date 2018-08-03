const express = require('express');
const request = require('request');
const router = express.Router();
const db = require('../Database');

const search = require('./Search');
const update = require('./Update');
const remove = require('./Delete');

router.use('/search',search);
router.use('/update',update);
router.use('/delete',remove);

router.post('/signUp', (req, res, next) => {
    var errorList = validateRequestBody(req.body);

    if (errorList.length == 0) {
        var joiningDate = new Date();

        sqlQueryCompany = 'INSERT INTO customer (companyId, staffId, name, email, address, phone, source, status, comment, joiningDate)' + 
                          'VALUES (\"' + req.body.companyId + '\",\"'+ req.body.staffId + '\",\"' +
                           req.body.name + '\",\"' + req.body.email + '\",\"' +
                           req.body.address + '\",\"' + req.body.phone + '\",\"' +
                           req.body.source + '\",\"' + req.body.status + '\",\"' +
                           req.body.comment + '\",\"' +joiningDate.getTime()+'\")'
        db.query(sqlQueryCompany, function (err, result) {
            if (err) {
                console.log(err+"");
                res.status(500).json({
                    message: "Entry not created",
                    errors: err,
                    response: null
                });
            }
            else {
                res.status(500).json({
                    message: "Entry created",
                    errors: null,
                    response: result
                });
            }
         });
    }
    else {
        res.status(404).json({
            message: 'Information missing',
            errors: errorList,
            response: null
        });
    }
});

function validateRequestBody(requestBody) {
    var errors = [];

    if (!requestBody.companyId) { errors.push("Company ID missing"); }
    if (!requestBody.staffId) { errors.push("Staff ID missing"); }
    if (!requestBody.name) { errors.push("Customer Name missing"); }
    if (!requestBody.email) { errors.push("Email missing"); }

    return errors;
}

module.exports = router;