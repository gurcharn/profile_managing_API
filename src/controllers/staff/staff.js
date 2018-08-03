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

        sqlQueryCompany = 'INSERT INTO staff (companyId, name, email, address, phone, department, position, joiningDate)'+
                          'VALUES (\"' + req.body.companyId + '\",\"'+
                          req.body.name + '\",\"' + req.body.email + '\",\"' + 
                          req.body.address + '\",\"' + req.body.phone + '\",\"' + req.body.department + '\",\"' + 
                          req.body.position +'\",\"' + joiningDate.getTime() +'\")'
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
                const loginBody = {
                                    "companyId": req.body.companyId,
                                    "staffId": result.insertId,
                                    "userType": req.body.position,
                                    "email": req.body.email,
                                    "password": req.body.password
                                }
                request.post({url:'http://localhost:3000/login/createLogin', form: loginBody}, function(err,httpResponse,body) {
                    if(err) {
                        console.error(err);
                        res.status(500).json({
                            message: "Entry not created",
                            errors: err,
                            response: null
                        });
                    }
                    else{
                        res.status(200).json({
                            message: "Entry Created",
                            errors: null,
                            response: httpResponse
                        });
                    }
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
    if (!requestBody.name) { errors.push("Name missing"); }
    if (!requestBody.email) { errors.push("Email number missing"); }
    if (!requestBody.position) { errors.push("Position missing"); }
    if (!requestBody.password) { errors.push("Password missing"); }

    return errors;
}

module.exports = router;