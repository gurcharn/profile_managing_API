const express = require('express');
const router = express.Router();
const db = require('../Database');


router.patch('/', (req, res, next) => {
    var errorList = validateRequestBody(req.body);

    if (errorList.length == 0) {
            sqlQuery = "UPDATE company SET email = \""+ req.body.email +"\"," +
                        "companyName = \""+ req.body.companyName +"\"," +
                        "address = \""+ req.body.address +"\"," +
                        "phone = \""+ req.body.phone +"\"," +
                        "owner = \""+ req.body.owner +"\"," +
                        "typeOfWork = \""+ req.body.typeOfWork +"\"" +
                        "WHERE companyId = " + req.params.companyId
            db.query(sqlQuery, function (err, result) {
                if (err) {
                    console.log(err+"");
                    res.status(500).json({
                        message: "No Response",
                        errors: err,
                        response: null
                    });
                }
                else {
                    res.status(200).json({
                        message: "Response Retrieved",
                        error: null,
                        response: result
                    });
                }
              });
        }
        else {
            res.status(404).json({
                message: 'Information missing',
                errors: "Provide email",
                response: null
            });
        }
});

function validateRequestBody(requestBody) {
    var errors = [];

    if (!requestBody.companyName) { errors.push("Company Name missing"); }
    if (!requestBody.email) { errors.push("Email missing"); }
    if (!requestBody.address) { errors.push("Email missing"); }
    if (!requestBody.phone) { errors.push("Phone number missing"); }
    if (!requestBody.owner) { errors.push("Owner's name missing"); }
    if (!requestBody.typeOfWork) { errors.push("Password missing"); }

    return errors;
}

module.exports = router;