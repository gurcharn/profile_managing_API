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
        var renewalDate = new Date();
        renewalDate.setDate(joiningDate.getDate()-1);
        renewalDate.setFullYear(joiningDate.getFullYear()+1);

        sqlQueryCompany = 'INSERT INTO company (companyName, email, phone, owner, address, typeOfWork, joiningDate, renewalDate)' +
                          'VALUES (\"' + req.body.companyName + '\",\"'+ req.body.email + '\",\"' +
                           req.body.phone + '\",\"' + req.body.owner +'\",\"' +
                           req.body.address + '\",\"' + req.body.typeOfWork +'\",\"' +
                           joiningDate.getTime() +'\",\"' + renewalDate.getTime() +'\")'
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
                const staffBody = {
                                "companyId": result.insertId,
                                "email": req.body.email,
                                "name": req.body.owner,
                                "position": "owner",
                                "password": req.body.password
                            }
                request.post({url:'http://localhost:4000/pms/staff/signup', form: staffBody}, function(err,httpResponse,body) {
                    if(err) {
                        console.error(err);
                        res.status(500).json({
                            message: "Entry not created in staff",
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

    if (!requestBody.companyName) { errors.push("Company Name missing"); }
    if (!requestBody.email) { errors.push("Email missing"); }
    if (!requestBody.phone) { errors.push("Phone number missing"); }
    if (!requestBody.owner) { errors.push("Owner's name missing"); }
    if (!requestBody.password) { errors.push("Password missing"); }

    return errors;
}

module.exports = router;